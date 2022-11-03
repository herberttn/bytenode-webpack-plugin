import type { Hook } from 'tapable';
import { Compilation, ExternalsPlugin } from 'webpack';
import type { Compiler, WebpackPluginInstance } from 'webpack';
import VirtualModulesPlugin from 'webpack-virtual-modules';

import { createLoaderCode } from './loaders';
import { compileSource, replaceSource } from './sources';
import type { Options, Prepared, PreparedEntries, PreparedEntry, Source } from './types';
import { createFileMatcher, fromTargetToCompiledExtension, isTargetExtension, toLoaderFileName, toSiblingRelativeFileLocation } from './utils';

class BytenodeWebpackPlugin implements WebpackPluginInstance {

  private readonly name = 'BytenodeWebpackPlugin';
  private readonly options: Options;

  constructor(options: Partial<Options> = {}) {
    this.options = {
      compileAsModule: true,
      compileForElectron: false,
      debugLifecycle: false,
      keepSource: false,
      preventSourceMaps: true,
      ...options,
    };
  }

  apply(compiler: Compiler): void {
    const logger = compiler.getInfrastructureLogger(this.name);
    setupLifecycleLogging(compiler, this.name, this.options);

    logger.debug('original webpack.options.entry', compiler.options.entry);

    const { entries: { ignored, loaders, targets }, modules } = prepare(compiler);

    compiler.options.entry = Object.fromEntries([
      ...ignored.entries(),
      ...loaders.entries(),
      ...targets.entries(),
    ]);

    if (this.options.preventSourceMaps) {
      logger.log('Preventing source maps from being generated by changing webpack.options.devtool to false.');
      compiler.options.devtool = false;
    }

    if (this.options.compileForElectron) {
      const target = compiler.options.target;

      if (target) {
        const targets = Array.isArray(target) ? target : [target];

        if (!targets.some(target => target.startsWith('electron-'))) {
          logger.warn(`Consider using an electron target instead of or in addition to [${targets.join(', ')}] when compiling for electron.`);
        }
      }
    }

    logger.debug('modified webpack.options.devtool', compiler.options.devtool);
    logger.debug('modified webpack.options.entry', compiler.options.entry);

    logger.debug('adding electron as external');
    new ExternalsPlugin('commonjs', ['electron'])
      .apply(compiler);

    new VirtualModulesPlugin(Object.fromEntries(modules.entries()))
      .apply(compiler);

    // ensure hooks run last by tapping after the other plugins
    compiler.hooks.afterPlugins.tap(this.name, () => {
      const matches = createFileMatcher(this.options.include, this.options.exclude);

      compiler.hooks.compilation.tap(this.name, compilation => {
        const logger = compilation.getLogger(this.name);
        const loaderEntryFiles: string[] = [];
        const targetEntryFiles: string[] = [];

        compilation.hooks.processAssets.tap({ name: this.name, stage: Compilation.PROCESS_ASSETS_STAGE_PRE_PROCESS }, (): void => {
          logger.time('collect asset names');

          loaderEntryFiles.push(...collectEntryFiles(compilation, loaders));
          targetEntryFiles.push(...collectEntryFiles(compilation, targets));

          logger.timeEnd('collect asset names');
        });

        compilation.hooks.processAssets.tapPromise({ name: this.name, stage: Compilation.PROCESS_ASSETS_STAGE_DERIVED }, async (assets): Promise<void> => {
          logger.time('process assets');

          for (const [name, asset] of Object.entries(assets)) {
            logger.group('asset', name);
            logger.time('took');

            if (loaderEntryFiles.includes(name)) {
              await updateLoaderToRequireCompiledAssets(compilation, name, asset, targetEntryFiles);
            } else if (isTargetExtension(name) && matches(name)) {
              await updateTargetWithCompiledCode(compilation, name, asset, this.options);
            }

            logger.timeEnd('took');
            logger.groupEnd('asset', name);
          }

          logger.timeEnd('process assets');
        });
      });
    });

    async function updateLoaderToRequireCompiledAssets(compilation: Compilation, name: string, asset: Source, files: string[]): Promise<void> {
      logger.debug('updating loader to require compiled assets');

      const source = await replaceSource(asset, raw => {
        for (const file of files) {
          raw = raw.replace(file, fromTargetToCompiledExtension(file));
        }
        return raw;
      });

      compilation.updateAsset(name, source);
    }

    async function updateTargetWithCompiledCode(compilation: Compilation, name: string, asset: Source, options: Options): Promise<void> {
      logger.debug('compiling asset source');
      const source = await compileSource(asset, options);

      logger.debug('updating asset source with the compiled content');
      compilation.updateAsset(name, source);

      const to = fromTargetToCompiledExtension(name);

      logger.debug(`renaming asset to ${to}`);
      compilation.renameAsset(name, to);

      if (options.keepSource) {
        logger.debug('re-emitting decompiled asset due to plugin.options.keepSource being true');
        compilation.emitAsset(name, asset);
      } else {
        logger.debug('NOT re-emitting decompiled asset due to plugin.options.keepSource being false');
      }
    }
  }
}

function collectEntryFiles(compilation: Compilation, from: PreparedEntry): string[] {
  const files = [];

  for (const name of from.keys()) {
    const entrypoint = compilation.entrypoints.get(name);

    if (entrypoint) {
      files.push(...entrypoint.chunks.flatMap(chunk => Array.from(chunk.files.values())));
    }
  }

  return files;
}

function prepare(compiler: Compiler): Prepared {
  const { entry, output } = compiler.options;

  if (typeof entry === 'function') {
    throw new Error('webpack.options.entry cannot be a function, use strings or objects');
  }

  if (typeof output.filename === 'string' && !/.*[[\]]+.*/.test(output.filename)) {
    throw new Error('webpack.options.output.filename cannot be static, use a dynamic one like [name].js');
  }

  const entries: PreparedEntries = {
    ignored: new Map(),
    loaders: new Map(),
    targets: new Map(),
  };

  const modules = new Map();

  for (const [name, descriptor] of Object.entries(entry)) {
    if (descriptor.filename) {
      throw new Error('webpack.options.entry.filename is not supported, use webpack.options.output.filename');
    }

    const imports = descriptor.import as string[];

    // adds a new entry with a .compiled suffix, pointing to the original imports, which will be compiled
    entries.targets.set(name + '.compiled', { ...descriptor, import: imports });

    // changes the original entry to use loader files, which will load the decompiler and the new compiled entries
    entries.loaders.set(name, { import: imports.map(file => toLoaderFileName(file)) });

    // generates virtual modules with the code of the loader files
    for (const file of imports) {
      const code = createLoaderCode({ imports: [toSiblingRelativeFileLocation(file)] });
      const location = toLoaderFileName(file);

      modules.set(location, code);
    }
  }

  return {
    entries,
    modules,
  };
}

function setupLifecycleLogging(compiler: Compiler, name: string, options: Options): void {
  if (!options.debugLifecycle) {
    return;
  }

  const logger = compiler.getInfrastructureLogger(`${name}/lifecycle`);
  setupHooksLogging(name, 'compiler', compiler.hooks as unknown as Record<string, Hook<any, any>>);

  compiler.hooks.compilation.tap(name, compilation => {
    setupHooksLogging(name, 'compilation', compilation.hooks as unknown as Record<string, Hook<any, any>>);
  });

  compiler.hooks.normalModuleFactory.tap(name, normalModuleFactory => {
    setupHooksLogging(name, 'normalModuleFactory', normalModuleFactory.hooks as unknown as Record<string, Hook<any, any>>);
  });

  function setupHooksLogging(pluginName: string, type: string, hooks: Record<string, Hook<any, any>>): void {
    const deprecatedHooks = [
      'additionalChunkAssets',
      'afterOptimizeChunkAssets',
      'normalModuleLoader',
      'optimizeChunkAssets',
    ];

    // avoid maximum call stack size exceeded
    const recursiveHooks = ['infrastructureLog', 'log'];

    for (const [name, hook] of Object.entries(hooks)) {
      try {
        if (deprecatedHooks.includes(name) || recursiveHooks.includes(name)) {
          return;
        }

        hook.tap(pluginName, () => {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          logger.debug(`${type} hook ${name} (${arguments.length} arguments)`);
        });
      } catch (_) {
        // ignore when unable to tap
      }
    }
  }
}

export {
  BytenodeWebpackPlugin,
};
