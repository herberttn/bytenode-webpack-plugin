import Module from 'module';
import v8 from 'v8';

import { compileCode, compileElectronCode } from 'bytenode';
import { sources } from 'webpack';

import type { Options, Source } from './types';

v8.setFlagsFromString('--no-lazy');

async function compileSource(source: Source, options: Pick<Options, 'compileAsModule' | 'compileForElectron'>): Promise<Source> {
  return await replaceSource(source, async raw => {
    if (options.compileAsModule) {
      raw = Module.wrap(raw);
    }

    return options.compileForElectron
      ? await compileElectronCode(raw)
      : compileCode(raw);
  });
}

async function replaceSource(source: Source, replacer: (raw: string) => string | Buffer | Promise<string | Buffer>): Promise<Source> {
  return new sources.RawSource(await replacer(source.buffer().toString()));
}

export {
  compileSource,
  replaceSource,
};
