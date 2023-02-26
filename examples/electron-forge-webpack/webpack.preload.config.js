const { rules } = require('./webpack.shared.rules');
const { plugins } = require('./webpack.shared.plugins');

const preloadConfig = {
  entry: {
    preload: './src/preload.js',
  },
  module: {
    rules,
  },
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    filename: '[name].js',
  },
  plugins,
  target: 'electron-preload',
};

module.exports = {
  preloadConfig,
};
