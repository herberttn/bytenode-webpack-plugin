import type { ValuesType } from 'utility-types';
import type { EntryNormalized, sources } from 'webpack';

interface Options {
  compileAsModule: boolean;
  compileForElectron: boolean;
  debugLifecycle: boolean;
  keepSource: boolean;
  preventSourceMaps: boolean;
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
  PreparedEntries,
  PreparedEntry,
  PreparedEntryDescriptor,
  Source,
};
