import type { Configuration } from 'webpack';

import { rules } from './webpack.shared.rules';
import { plugins } from './webpack.shared.plugins';

const rendererConfig: Configuration = {
  module: {
    rules: [
      ...rules,
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  },
  target: 'electron-renderer',
};

export {
  rendererConfig,
};
