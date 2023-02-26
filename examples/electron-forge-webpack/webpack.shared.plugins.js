const { BytenodeWebpackPlugin } = require('@herberttn/bytenode-webpack-plugin');

const plugins = [
  new BytenodeWebpackPlugin({
    compileForElectron: true,
  }),
];

module.exports = {
  plugins,
};
