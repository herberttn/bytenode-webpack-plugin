const { BytenodeWebpackPlugin } = require('@herberttn/bytenode-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = [
  new BytenodeWebpackPlugin({
    compileForElectron: true,
  }),
  new ForkTsCheckerWebpackPlugin(),
];
