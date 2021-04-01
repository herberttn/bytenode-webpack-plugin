import { rm } from 'fs/promises';
import { resolve } from 'path';

import webpack from 'webpack';
import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';

import { BytenodeWebpackPlugin } from '../../src';
import type { Options } from '../../src/types';

const defaultWebpackOptions: Configuration = {
  context: __dirname,
  mode: 'development',
  output: {
    path: resolve(__dirname, './output'),
  },
  plugins: [],
  target: 'node',
};

const defaultPluginOptions: Partial<Options> = {
  silent: true,
};

async function runWebpack(webpackOptions: Configuration, pluginOptions?: Partial<Options>): Promise<string[] | undefined> {
  pluginOptions = { ...defaultPluginOptions, ...pluginOptions };
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
      if (error || stats.hasErrors()) {
        reject(error ?? stats.toString());
      }

      const { assets } = stats.toJson();
      const names = assets?.map(asset => asset.name);

      resolve(names);
    });
  });
}

export {
  runWebpack,
};
