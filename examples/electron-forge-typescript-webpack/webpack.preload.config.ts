import { Configuration } from "webpack";
import rules from "./webpack.rules";
import plugins from "./webpack.plugins";

export const preloadConfig: Configuration = {
  entry: {
    preload: "./src/preload.ts",
  },
  module: {
    rules,
  },
  output: {
    filename: "[name].js",
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
  target: "electron-preload",
};
