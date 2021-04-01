import Module from 'module';
import path from 'path';
import v8 from 'v8';

import { compileCode, compileElectronCode } from 'bytenode';
import type { Hook } from 'tapable';
import { ExternalsPlugin } from 'webpack';
import type { WebpackPluginInstance } from 'webpack';
import type { Source } from 'webpack-sources';
import WebpackVirtualModules from 'webpack-virtual-modules';

import type { Compiler, EntryPoint, WebpackOptionsNormalized } from './normalized';
import type { Options, Prepared, PreprocessedEntry, PreprocessedOutput, ProcessedOptions } from './types';

v8.setFlagsFromString('--no-lazy');

class BytenodeWebpackPlugin implements WebpackPluginInstance {

  private readonly name = 'BytenodeWebpackPlugin';
  private options: Options;

  constructor(options: Partial<Options> = {}) {
    this.options = {
      compileAsModule: true,
      compileForElectron: false,
      debugLifecycle: false,
      debugLogs: false,
      keepSource: false,
      preventSourceMaps: true,
      silent: false,
      ...options,
    };
  }

  apply(compiler: Compiler): void {
    this.setupLifecycleLogging(compiler);

    this.debug('original options', {
      context: compiler.options.context,
      devtool: compiler.options.devtool,
      entry: compiler.options.entry,
      output: compiler.options.output,
    });

    const { entry, entryLoaders, externals, output, virtualModules } = this.processOptions(compiler.options);

    this.debug('processed options', {
      entry,
      entryLoaders,
      output,
      virtualModules,
    });

    compiler.options.entry = entry;
    compiler.options.output.filename = output.filename;

    if (this.options.preventSourceMaps) {
      this.log('Preventing source maps from being generated by changing "devtool" to false.');
      compiler.options.devtool = false;
    }

    // @ts-ignore: The plugin supports string[] but the type doesn't
    new ExternalsPlugin('commonjs', externals)
      .apply(compiler);

    new WebpackVirtualModules(virtualModules)
      .apply(compiler);

    this.debug('modified options', {
      devtool: compiler.options.devtool,
      entry: compiler.options.entry,
      output: compiler.options.output,
    });

    compiler.hooks.emit.tapPromise(this.name, async (compilation) => {
      const entryLoaderFiles: string[] = [];

      for (const entryLoader of entryLoaders) {
        const entryPoints = compilation.entrypoints as Map<string, EntryPoint>;
        const entryPoint = entryPoints.get(entryLoader);
        const files = entryPoint?.getFiles() ?? [];

        entryLoaderFiles.push(...files);
      }

      const outputExtensionRegex = new RegExp('\\' + output.extension + '$', 'i');
      const shouldCompile = (name: string): boolean => {
        return outputExtensionRegex.test(name) && !entryLoaderFiles.includes(name);
      };

      for (const [name, asset] of Object.entries(compilation.assets as Record<string, Source>)) {
        this.debug('emitting', name);

        if (!shouldCompile(name)) {
          continue;
        }

        let source = asset.source();

        if (this.options.compileAsModule) {
          source = Module.wrap(source as string);
        }

        const compiledAssetName = name.replace(outputExtensionRegex, '.jsc');
        this.debug('compiling to', compiledAssetName);

        const compiledAssetSource = this.options.compileForElectron
          ? await compileElectronCode(source)
          : await compileCode(source);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        compilation.assets[compiledAssetName] = {
          size: () => compiledAssetSource.length,
          source: () => compiledAssetSource,
        };

        if (!this.options.keepSource) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          delete compilation.assets[name];
        }
      }
    });
  }

  processOptions(options: WebpackOptionsNormalized): ProcessedOptions {
    const output = this.preprocessOutput(options);

    const entries: [string, string | string[]][] = [];
    const entryLoaders: string[] = [];
    const externals: string[] = [];
    const virtualModules: [string, string][] = [];

    for (const { entry, compiled, loader, middlewares } of this.preprocessEntry(options)) {
      const entryName = output.name ?? entry.name;

      const addMiddlewares = (location: string): string | string[] => {
        if (Array.isArray(middlewares) && middlewares.length > 0) {
          return [location, ...middlewares];
        }
        return location;
      };

      entries.push([entryName, addMiddlewares(loader.location)]);
      entryLoaders.push(entryName);

      const { name } = compiled;

      const from = output.of(entryName);
      const to = output.of(name);

      let relativeImportPath = this.toRelativeImportPath(options.output.path, from, to);

      // Use absolute path to load the compiled file in dev mode due to how electron-forge handles
      // the renderer process code loading (by using a server and not directly from the file system).
      // This should be safe exactly because it will only be used in dev mode, so the app code will
      // never be relocated after compiling with webpack and before starting electron.
      if (options.target === 'electron-renderer' && options.mode === 'development') {
        relativeImportPath = path.resolve(options.output.path, 'renderer', relativeImportPath);
      }

      entries.push([name, addMiddlewares(entry.location)]);
      externals.push(relativeImportPath);
      virtualModules.push([loader.location, createLoaderCode(relativeImportPath)]);
    }

    return {
      entry: Object.fromEntries(entries),
      entryLoaders,
      externals,
      output,
      virtualModules: Object.fromEntries(virtualModules),
    };
  }

  toRelativeImportPath(directory: string, from: string, to: string): string {
    from = this.removeExtension(from);
    to = this.removeExtension(to);

    const fromLocation = path.join(directory, from);
    const toLocation = path.join(directory, to);

    const relativePath = path.relative(path.dirname(fromLocation), toLocation);

    if (relativePath === to) {
      return `./${relativePath}`;
    }

    return relativePath;
  }

  removeExtension(location: string): string {
    return location.substr(0, location.length - path.extname(location).length);
  }

  preprocessOutput({ output }: WebpackOptionsNormalized): PreprocessedOutput {
    let filename: string = output?.filename ?? '[name].js';

    const { directory, extension, name } = prepare(filename);
    const dynamic = /.*[[\]]+.*/.test(filename);

    filename = dynamic ? filename : '[name]' + extension;

    return {
      directory,
      dynamic,
      extension,
      filename,
      name: dynamic ? undefined : name,
      of: name => filename.replace('[name]', name),
    };
  }

  preprocessEntry({ context, entry }: WebpackOptionsNormalized): PreprocessedEntry[] {
    let entries: [string | undefined, string | string[]][];

    if (typeof entry === 'function') {
      throw new Error('Entry as a function is not supported as of yet.');
    }

    if (typeof entry === 'string') {
      entries = [[undefined, entry]];
    } else if (Array.isArray(entry)) {
      entries = entry.map(entry => [undefined, entry]);
    } else {
      entries = Object.entries(entry);
    }

    return entries.map(([name, location]) => {
      const middlewares: string[] = [];

      if (Array.isArray(location)) {
        const [entry, ...rest] = location;

        location = entry;
        middlewares.push(...rest);
      }

      if (context && !path.isAbsolute(location)) {
        location = path.resolve(context, location);
      }

      const entry = prepare(location, name);
      const compiled = prepare(location, name, '.compiled');
      const loader = prepare(location, name, '.loader');

      return {
        compiled, entry, loader, middlewares,
      };
    });
  }

  debug(title: unknown, data: unknown, ...rest: unknown[]): void {
    const { debugLogs, silent } = this.options;

    if (!debugLogs || silent) {
      return;
    }

    if (typeof data === 'object') {
      console.debug('');

      if (typeof title === 'string') {
        title = title.endsWith(':') ? title : `${title}:`;
      }
    }

    this.log(title, data, ...rest);
  }

  log(...messages: unknown[]): void {
    if (this.options.silent) {
      return;
    }
    console.debug(`[${this.name}]:`, ...messages);
  }

  setupLifecycleLogging(compiler: Compiler): void {
    const { debugLifecycle, silent } = this.options;

    if (!debugLifecycle || silent) {
      return;
    }

    this.setupHooksLogging('compiler', compiler.hooks as unknown as Record<string, Hook>);

    compiler.hooks.normalModuleFactory.tap(this.name, normalModuleFactory => {
      this.setupHooksLogging('normalModuleFactory', normalModuleFactory.hooks as unknown as Record<string, Hook>);
    });

    compiler.hooks.compilation.tap(this.name, compilation => {
      this.setupHooksLogging('compilation', compilation.hooks as unknown as Record<string, Hook>);
    });
  }

  setupHooksLogging(type: string, hooks: Record<string, Hook>): void {
    const pluginName = this.name;
    const { debugLifecycle, silent } = this.options;

    if (!debugLifecycle || silent) {
      return;
    }

    for (const [name, hook] of Object.entries(hooks)) {
      try {
        hook.tap(pluginName, function () {
          console.debug(`[${pluginName}]: ${type} hook: ${name} (${arguments.length} arguments)`);
        });
      } catch (_) {
        // ignore when unable to tap
      }
    }
  }
}

function createLoaderCode(relativePath: string): string {
  return `
    require('bytenode');
    require('${relativePath}');
  `;
}

function prepare(location: string, name?: string, suffix = ''): Prepared {
  const directory = path.dirname(location);
  const extension = path.extname(location);
  const basename = path.basename(location, extension) + suffix;
  const filename = basename + extension;

  name = name ? name + suffix : basename;
  location = path.join(directory, filename);

  return {
    basename, directory, extension, filename, location, name, suffix,
  };
}

export {
  BytenodeWebpackPlugin,
};
