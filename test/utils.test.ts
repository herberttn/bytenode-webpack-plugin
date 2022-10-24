import { ALL_PLATFORMS, mockPlatform } from './mocks/platform';

describe('utils', () => {

  for (const platform of ALL_PLATFORMS) {
    describe(`${platform}`, () => {

      beforeEach(() => {
        jest.resetModules();
      });

      test('fromCompiledToTargetExtension', async () => {
        await mockPlatform(platform);

        const { fromCompiledToTargetExtension } = await import('../src/utils');

        expect(fromCompiledToTargetExtension('index.js')).toBe('index.js');
        expect(fromCompiledToTargetExtension('index.jsc')).toBe('index.js');
        expect(fromCompiledToTargetExtension('index.json')).toBe('index.json');
      });

      test('fromTargetToCompiledExtension', async () => {
        await mockPlatform(platform);

        const { fromTargetToCompiledExtension } = await import('../src/utils');

        expect(fromTargetToCompiledExtension('index.js')).toBe('index.jsc');
        expect(fromTargetToCompiledExtension('index.jsc')).toBe('index.jsc');
        expect(fromTargetToCompiledExtension('index.json')).toBe('index.json');
      });

      test('isCompiledExtension', async () => {
        await mockPlatform(platform);

        const { isCompiledExtension } = await import('../src/utils');

        expect(isCompiledExtension('index.js')).toBe(false);
        expect(isCompiledExtension('index.jsc')).toBe(true);
        expect(isCompiledExtension('index.json')).toBe(false);
      });

      test('isCompiledExtension', async () => {
        await mockPlatform(platform);

        const { isTargetExtension } = await import('../src/utils');

        expect(isTargetExtension('index.js')).toBe(true);
        expect(isTargetExtension('index.jsc')).toBe(false);
        expect(isTargetExtension('index.json')).toBe(false);
      });

      test('toLoaderFileName', async () => {
        await mockPlatform(platform);

        const { toLoaderFileName } = await import('../src/utils');

        expect(toLoaderFileName('index.js')).toBe('index.loader.js');
        expect(toLoaderFileName('index.jsc')).toBe('index.loader.js');
        expect(toLoaderFileName('index.json')).toBe('index.loader.js');
      });

      test('toSiblingRelativeFileLocation', async () => {
        await mockPlatform(platform);

        const { toSiblingRelativeFileLocation } = await import('../src/utils');

        expect(toSiblingRelativeFileLocation('index.js')).toBe('./index.js');
        expect(toSiblingRelativeFileLocation('./a/b/c/index.jsc')).toBe('./index.jsc');
        expect(toSiblingRelativeFileLocation('/a/b/c/index.json')).toBe('./index.json');
      });

    });
  }

});
