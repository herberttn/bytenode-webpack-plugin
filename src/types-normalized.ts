// partial support for webpack@5 types

import type { Configuration, Entry, EntryFunc, Output, Compiler as WebpackCompiler } from 'webpack';

interface Compiler extends WebpackCompiler {
  options: WebpackOptionsNormalized;
}

interface EntryPoint {
  getFiles(): string[];
}

interface WebpackOptionsNormalized extends Configuration {
  entry: EntryNormalized;
  output: OutputNormalized;
}

type EntryNormalized = string | string[] | Entry | EntryFunc;

interface OutputNormalized extends Output {
  filename: string;
  path: string;
}

export type {
  Compiler,
  EntryPoint,
  WebpackOptionsNormalized,
};
