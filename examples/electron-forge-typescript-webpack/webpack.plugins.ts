import type { WebpackPluginInstance } from "webpack";
import { BytenodeWebpackPlugin } from "@herberttn/bytenode-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const plugins: WebpackPluginInstance[] = [
  new BytenodeWebpackPlugin({
    compileForElectron: true,
  }),
  new ForkTsCheckerWebpackPlugin(),
];

export default plugins;
