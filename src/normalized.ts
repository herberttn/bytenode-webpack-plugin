// partial support for webpack@5 types

import type { Configuration, Output, Compiler as WebpackCompiler } from 'webpack';

interface Compiler extends WebpackCompiler {
  options: WebpackOptionsNormalized;
}

interface EntryPoint {
  getFiles(): string[];
}

interface WebpackOptionsNormalized extends Configuration {
  output: OutputNormalized;
}

interface OutputNormalized extends Output {
  filename: string;
  path: string;
}

export type {
  Compiler,
  EntryPoint,
  WebpackOptionsNormalized,
};
