import { createLoaderCode } from '../src/loaders';
import type { LoaderOptions } from '../src/loaders';

import { mockPlatform, UNIX_PLATFORMS } from './mocks/platform';

describe('loaders', () => {

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

    });
  }

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
