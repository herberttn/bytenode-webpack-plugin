import { BytenodeWebpackPlugin } from '@herberttn/bytenode-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import type { WebpackPluginInstance } from 'webpack';

const plugins: WebpackPluginInstance[] = [
  new BytenodeWebpackPlugin({
    compileForElectron: true,
  }),
  new ForkTsCheckerWebpackPlugin(),
];

export {
  plugins,
};
