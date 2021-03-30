import { rm } from 'fs/promises';
import { resolve } from 'path';

import webpack from 'webpack';
import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';

import { BytenodeWebpackPlugin } from '../src';

const defaultOptions: Configuration = {
  context: __dirname,
  mode: 'development',
  output: {
    path: resolve(__dirname, './output'),
  },
  plugins: [
    new BytenodeWebpackPlugin({
      silent: true,
    }),
  ],
  target: 'node',
};

async function runWebpack(options: Configuration): Promise<string[] | undefined> {
  options = merge(defaultOptions, options);

  if (typeof options.output?.path !== 'string') {
    throw new Error('output.path should be defined');
  }

  await rm(options.output.path, {
    force: true,
    recursive: true,
  });

  return new Promise((resolve, reject) => {
    webpack(options, (error, stats) => {
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
