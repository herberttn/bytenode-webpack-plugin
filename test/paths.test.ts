import { ALL_PLATFORMS, mockPlatform } from './mocks/platform';

describe('paths', () => {

  for (const platform of ALL_PLATFORMS) {
    describe(`${platform}`, () => {

      test('removeExtension', async () => {
        await mockPlatform(platform);

        const { removeExtension } = await import('../src/paths');
        expect(removeExtension('index.js')).toBe('index');
      });

      test('toRelativeImportPath', async () => {
        await mockPlatform(platform);

        const { toRelativeImportPath } = await import('../src/paths');

        const t = (from: string, to: string, expected: string): void => {
          expect(toRelativeImportPath(__dirname, from, to)).toBe(expected);
        };

        // about the __dirname: doesn't matter where it is
        t('a.ts', 'b.ts', './b');
        t('a.ts', 'dir/c.ts', './dir/c');
        t('dir/c.ts', 'dir/c.ts', './c');
        t('dir/c.ts', 'a.ts', '../a');
      });

    });
  }

});
