import type { Configuration } from 'webpack';

import { rules } from './webpack.shared.rules';
import { plugins } from './webpack.shared.plugins';

const preloadConfig: Configuration = {
  entry: {
    preload: './src/preload.ts',
  },
  module: {
    rules,
  },
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    filename: '[name].js',
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
  target: 'electron-preload',
};

export {
  preloadConfig,
};
