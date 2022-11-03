import type { ValuesType } from 'utility-types';
import type { EntryNormalized, sources } from 'webpack';

type FilesMatcher = string | RegExp;

interface Options {
  compileAsModule: boolean;
  compileForElectron: boolean;
  debugLifecycle: boolean;
  exclude?: FilesMatcher[];
  include?: FilesMatcher[];
  keepSource: boolean;
  preventSourceMaps: boolean;
}

interface Prepared {
  entries: PreparedEntries;
  modules: Map<string, string>;
}

interface PreparedEntries {
  ignored: PreparedEntry;
  loaders: PreparedEntry;
  targets: PreparedEntry;
}

interface PreparedEntryDescriptor extends ValuesType<Exclude<EntryNormalized, () => Promise<any>>> {
  import: string[];
}

type PreparedEntry = Map<string, PreparedEntryDescriptor>;
type Source = sources.Source;

export type {
  FilesMatcher,
  Options,
  Prepared,
  PreparedEntries,
  PreparedEntry,
  PreparedEntryDescriptor,
  Source,
};
