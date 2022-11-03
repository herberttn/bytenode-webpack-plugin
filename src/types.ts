import type { ValuesType } from 'utility-types';
import type { EntryNormalized, sources } from 'webpack';

type FileMatcher = (file: string) => boolean;
type FileMatcherIntent = string | RegExp;
type FileMatcherIntentMatcher = Pick<RegExp, 'test'>;

interface Options {
  compileAsModule: boolean;
  compileForElectron: boolean;
  debugLifecycle: boolean;
  exclude?: FileMatcherIntent[];
  include?: FileMatcherIntent[];
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
  FileMatcher,
  FileMatcherIntent,
  FileMatcherIntentMatcher,
  Options,
  Prepared,
  PreparedEntries,
  PreparedEntry,
  PreparedEntryDescriptor,
  Source,
};
