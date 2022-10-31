const { BytenodeWebpackPlugin } = require('@herberttn/bytenode-webpack-plugin');

module.exports = [
  new BytenodeWebpackPlugin({
    compileForElectron: true,
  }),
];
