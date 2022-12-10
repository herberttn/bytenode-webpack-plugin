import { readFile } from 'fs/promises';
import { join, resolve } from 'path';

import { createFsFromVolume, Volume } from 'memfs';
import webpack from 'webpack';
import type { Configuration, StatsAsset } from 'webpack';
import { customizeObject, mergeWithCustomize } from 'webpack-merge';

import { BytenodeWebpackPlugin } from '../../src';
import type { Options } from '../../src/types';

const merge = mergeWithCustomize<Configuration>({
  customizeObject: customizeObject({
    'infrastructureLogging.console': 'replace',
  }),
});

const defaultWebpackOptions: Configuration = {
  context: __dirname,
  infrastructureLogging: {
    debug: false,
    level: 'none',
  },
  mode: 'production',
  output: {
    path: resolve(__dirname, './output'),
  },
  plugins: [],
  stats: {
    logging: 'none',
    loggingDebug: false,
    loggingTrace: false,
  },
  target: 'node',
};

interface WebpackRunAsset extends StatsAsset {
  content: string | null;
  path: string;
}

interface WebpackRunResult {
  assets: Record<string, WebpackRunAsset>;
  names: string[];
}

async function runWebpack(webpackOptions: Configuration, pluginOptions?: Partial<Options>): Promise<WebpackRunResult> {
  webpackOptions = merge(defaultWebpackOptions, webpackOptions, {
    plugins: [
      new BytenodeWebpackPlugin(pluginOptions),
    ],
  });

  if (typeof webpackOptions.output?.path !== 'string') {
    throw new Error('output.path should be defined');
  }

  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackOptions);
    const volume = new Volume();

    compiler.outputFileSystem = createFsFromVolume(volume);
    compiler.run((error, stats) => {
      if (error || stats?.hasErrors()) {
        reject(error ?? stats?.toString());
      }

      if (stats) {
        const { assets } = stats.toJson();

        const files = volume.toJSON();
        const result: WebpackRunResult = {
          assets: {},
          names: [],
        };

        if (assets) {
          result.names.push(...assets.map(asset => asset.name).sort());

          for (const asset of assets as WebpackRunAsset[]) {
            const path = join(compiler.outputPath, asset.name);

            asset.content = files[path];
            asset.path = path;

            result.assets[asset.name] = asset;
          }
        }

        resolve(result);
      }
    });
  });
}

async function readFixtureContent(location: string): Promise<string> {
  const buffer = await readFile(resolve(defaultWebpackOptions.context as string, location));
  const content = buffer.toString();

  return content
    .replaceAll('\n', '')
    .replaceAll('\'', '\"'); // eslint-disable-line no-useless-escape
}

export {
  readFixtureContent,
  runWebpack,
};

export type {
  Configuration,
};
