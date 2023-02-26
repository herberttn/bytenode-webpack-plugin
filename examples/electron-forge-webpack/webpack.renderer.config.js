const { rules } = require('./webpack.shared.rules');
const { plugins } = require('./webpack.shared.plugins');

const rendererConfig = {
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
  target: 'electron-renderer',
};

module.exports = {
  rendererConfig,
};
