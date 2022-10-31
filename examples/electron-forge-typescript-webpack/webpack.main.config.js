const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  module: {
    rules,
  },
  output: {
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    filename: '[name].js',
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
  target: 'electron-main',
};
