interface Options {
  compileAsModule: boolean;
  compileForElectron: boolean;
  debugLifecycle: boolean;
  debugLogs: boolean;
  keepSource: boolean;
  preventSourceMaps: boolean;
  silent: boolean;
}

interface Prepared {
  basename: string;
  extension: string;
  location: string;
  name: string;
  suffix: string;
}

interface PreprocessedEntry {
  entry: Prepared;
  compiled: Prepared;
  loader: Prepared;
  middlewares: string[];
}

interface PreprocessedOutput {
  dynamic: boolean;
  extension: string;
  filename: string;
  name?: string;

  of(name: string): string;
}

interface ProcessedOptions {
  entry: Record<string, any>;
  entryLoaders: string[];
  externals: string[];
  output: PreprocessedOutput;
  virtualModules: Record<string, string>;
}

export type {
  Options,
  Prepared,
  PreprocessedEntry,
  PreprocessedOutput,
  ProcessedOptions,
};
