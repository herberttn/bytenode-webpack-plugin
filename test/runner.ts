import { rm } from 'fs/promises';
import { resolve } from 'path';

import webpack from 'webpack';
import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';

// import { BytenodeWebpackPlugin } from '../src';

const defaultOptions: Configuration = {
  context: __dirname,
  mode: 'development',
  output: {
    path: resolve(__dirname, './output'),
  },
  plugins: [
    // new BytenodeWebpackPlugin(),
  ],
  target: 'node',
};

async function runWebpack(options: Configuration): Promise<string[]> {
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
      if (error) {
        reject(error);
      } else if (stats.hasErrors()) {
        reject(stats.toString());
      }

      const assets = stats
        ?.toJson()
        ?.assets
        ?.map(asset => asset.name)
        ?? [];

      resolve(assets);
    });
  });
}

export {
  runWebpack,
};
