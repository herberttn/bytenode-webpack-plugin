import { createLoaderCode, createLoaderRequest } from '../src/loaders';
import type { LoaderOptions } from '../src/loaders';

import { mockPlatform, UNIX_PLATFORMS } from './mocks/platform';

describe('loaders', () => {

  describe('createLoaderRequest', () => {
    const loaderLocation = require.resolve('../src/loaders');

    test('with options and string imports', () => {
      expect(createLoaderRequest({ imports: ['mock1', 'mock2'] }))
        .toBe(`${loaderLocation}?{"imports":["mock1","mock2"]}!`);
    });

    testLoaderOptions(createLoaderRequest);
  });

  for (const platform of UNIX_PLATFORMS) {
    describe(`${platform}`, () => {

      beforeAll(async () => {
        jest.resetModules();
        await mockPlatform(platform);
      });

      describe('createLoaderRequest', () => {
        test('with options and string imports', () => {
          expect(createLoaderCode({ imports: ['mock1', 'mock2'] }))
            .toBe([
              `require('bytenode');`,
              `require('mock1');`,
              `require('mock2');`,
            ].join('\n'));
        });

        testLoaderOptions(createLoaderCode);
      });

      describe('normalizeRelativePath', () => {
        const matrix: Array<[string, string, string]> = [
          ['absolute backwards', '\\a\\b\\c', '/a/b/c'],
          ['absolute forwards', '/a/b/c', '/a/b/c'],
          ['relative backwards', '.\\a\\b\\c', './a/b/c'],
          ['relative forwards', './a/b/c', './a/b/c'],
        ];

        test.each(matrix)('%s', async (_, from, to) => {
          const { normalizeRelativePath } = await import('../src/loaders');
          return expect(normalizeRelativePath(from)).toBe(to);
        });
      });

    });
  }

  describe('win32', () => {

    beforeAll(async () => {
      jest.resetModules();
      await mockPlatform('win32');
    });

    describe('normalizeRelativePath', () => {
      const matrix: Array<[string, string, string]> = [
        ['absolute backwards', 'A:\\b\\c', 'A:\\\\b\\\\c'],
        ['absolute forwards', 'A:/b/c', 'A:\\\\b\\\\c'],
        ['relative backwards', '.\\a\\b\\c', './a/b/c'],
        ['relative forwards', './a/b/c', './a/b/c'],
      ];

      test.each(matrix)('%s', async (_, from, to) => {
        const { normalizeRelativePath } = await import('../src/loaders');
        return expect(normalizeRelativePath(from)).toBe(to);
      });
    });

  });

});

function testLoaderOptions(fn: (options: LoaderOptions) => any): void {
  const matrix: Array<[string, LoaderOptions, string]> = [
    // @ts-expect-error
    ['with empty options', {}, 'loader options.imports should be an array'],

    // @ts-expect-error
    ['with null options', null, 'loader options should be an object'],

    // @ts-expect-error
    ['with undefined options', undefined, 'loader options should be an object'],

    ['with options and empty imports', { imports: [] }, 'loader options.imports cannot be empty'],

    // @ts-expect-error
    ['with options and non-string imports', { imports: [2] }, 'loader options.imports can only have strings'],
  ];

  test.each(matrix)('%s', (_, options, error) => {
    expect(() => fn(options)).toThrow(error);
  });
}
