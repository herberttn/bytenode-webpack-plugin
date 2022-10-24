import type { ValuesType } from 'utility-types';
import type { EntryNormalized, sources } from 'webpack';

interface Options {
  compileAsModule: boolean;
  compileForElectron: boolean;
  debugLifecycle: boolean;
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
  Options,
  Prepared,
  PreparedEntries,
  PreparedEntry,
  PreparedEntryDescriptor,
  Source,
};
