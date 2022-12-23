import { Configuration } from "webpack";
import rules from "./webpack.rules";
import plugins from "./webpack.plugins";

const config: Configuration = {
  entry: {
    preload: "./src/preload.ts",
  },
  module: {
    rules,
  },
  output: {
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    filename: "[name].js",
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
  target: "electron-preload",
};
