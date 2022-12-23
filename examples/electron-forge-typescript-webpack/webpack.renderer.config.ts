import rules from "./webpack.rules";
import plugins from "./webpack.plugins";
import { Configuration } from "webpack";

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  output: {
    filename: '[name].js',
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
  target: 'electron-renderer',
};
