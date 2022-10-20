import { rm } from 'fs/promises';
import { resolve } from 'path';

import webpack from 'webpack';
import type { Configuration } from 'webpack';
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
  mode: 'development',
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

async function runWebpack(webpackOptions: Configuration, pluginOptions?: Partial<Options>): Promise<string[] | undefined> {
  webpackOptions = merge(defaultWebpackOptions, webpackOptions, {
    plugins: [
      new BytenodeWebpackPlugin(pluginOptions),
    ],
  });

  if (typeof webpackOptions.output?.path !== 'string') {
    throw new Error('output.path should be defined');
  }

  await rm(webpackOptions.output.path, {
    force: true,
    recursive: true,
  });

  return new Promise((resolve, reject) => {
    webpack(webpackOptions, (error, stats) => {
      if (error || stats?.hasErrors()) {
        reject(error ?? stats?.toString());
      }

      const { assets } = stats?.toJson() ?? {};
      const names = assets?.map(asset => asset.name);

      resolve(names);
    });
  });
}

export {
  runWebpack,
};

export type {
  Configuration,
};
