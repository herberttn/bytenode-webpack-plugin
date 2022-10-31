const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

module.exports = {
  entry: {
    index: './src/main.js',
  },
  module: {
    rules,
  },
  output: {
    filename: '[name].js',
  },
  plugins,
  target: 'electron-main',
};
