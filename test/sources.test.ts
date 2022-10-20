import Module from 'module';

import { sources } from 'webpack';

import type { compileSource } from '../src/sources';

import { mockBytenode } from './mocks/bytenode';
import { ALL_PLATFORMS, mockPlatform } from './mocks/platform';

describe('sources', () => {

  for (const platform of ALL_PLATFORMS) {
    describe(`${platform}`, () => {

      beforeEach(() => {
        jest.resetModules();
      });

      test('compileSource', async () => {
        const source = new sources.RawSource('mock');

        const {
          compileCode,
          compileElectronCode,
        } = await testCompileSourceWith(platform, source, {
          compileAsModule: false,
          compileForElectron: false,
        });

        expect(compileCode).toHaveBeenCalledTimes(1);
        expect(compileCode).toHaveBeenCalledWith(source.buffer().toString());

        expect(compileElectronCode).toHaveBeenCalledTimes(0);
      });

      test('compileSource for electron', async () => {
        const source = new sources.RawSource('mock');

        const {
          compileCode,
          compileElectronCode,
        } = await testCompileSourceWith(platform, source, {
          compileAsModule: false,
          compileForElectron: true,
        });

        expect(compileCode).toHaveBeenCalledTimes(0);

        expect(compileElectronCode).toHaveBeenCalledTimes(1);
        expect(compileElectronCode).toHaveBeenCalledWith(source.buffer().toString());
      });

      test('compileSource as module', async () => {
        const source = new sources.RawSource('mock');

        const {
          compileCode,
          compileElectronCode,
        } = await testCompileSourceWith(platform, source, {
          compileAsModule: true,
          compileForElectron: false,
        });

        expect(compileCode).toHaveBeenCalledTimes(1);
        expect(compileCode).toHaveBeenCalledWith(Module.wrap(source.buffer().toString()));

        expect(compileElectronCode).toHaveBeenCalledTimes(0);
      });

      test('replaceSource', async () => {
        await mockPlatform(platform);

        const { replaceSource } = await import('../src/sources');

        const mock = new sources.RawSource('mock');
        const muck = await replaceSource(mock, raw => {
          return raw.replace('o', 'u');
        });

        expect(muck.buffer().toString()).toBe('muck');
      });

    });
  }

});

interface CompileSourceTester {
  compileCode: jest.Mock;
  compileElectronCode: jest.Mock;
}

async function testCompileSourceWith(platform: NodeJS.Platform, ...args: Parameters<typeof compileSource>): Promise<CompileSourceTester> {
  const compileCode = jest.fn().mockImplementation(value => value);
  const compileElectronCode = jest.fn().mockImplementation(value => value);

  await mockPlatform(platform);
  await mockBytenode({
    compileCode,
    compileElectronCode,
  });

  const { compileSource } = await import('../src/sources');
  await compileSource(...args);

  return {
    compileCode,
    compileElectronCode,
  };
}
