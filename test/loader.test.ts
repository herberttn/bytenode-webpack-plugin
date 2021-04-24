import { mockPlatform, UNIX_PLATFORMS } from './mocks/platform';

describe('createLoaderCode', () => {

  for (const platform of UNIX_PLATFORMS) {
    describe(`${platform}`, () => {

      describe('absolute', () => {
        test('backwards', async () => {
          await mockPlatform(platform);
          await testLoaderCode('\\a\\b\\c', '/a/b/c');
        });

        test('forwards', async () => {
          await mockPlatform(platform);
          await testLoaderCode('/a/b/c', '/a/b/c');
        });
      });

      describe('relative', () => {
        test('backwards', async () => {
          await mockPlatform(platform);
          await testLoaderCode('.\\a\\b\\c', './a/b/c');
        });

        test('forwards', async () => {
          await mockPlatform(platform);
          await testLoaderCode('./a/b/c', './a/b/c');
        });
      });

    });
  }

  describe('win32', () => {

    describe('absolute', () => {
      test('backwards', async () => {
        await mockPlatform('win32');
        await testLoaderCode('A:\\b\\c', 'A:\\\\b\\\\c');
      });

      test('forwards', async () => {
        await mockPlatform('win32');
        await testLoaderCode('A:/b/c', 'A:\\\\b\\\\c');
      });
    });

    describe('relative', () => {
      test('backwards', async () => {
        await mockPlatform('win32');
        await testLoaderCode('.\\a\\b\\c', './a/b/c');
      });

      test('forwards', async () => {
        await mockPlatform('win32');
        await testLoaderCode('./a/b/c', './a/b/c');
      });
    });

  });

});

async function testLoaderCode(from: string, to: string): Promise<void> {
  const { createLoaderCode } = await import('../src/loader');

  expect(createLoaderCode(from)).toBe(`
    require('bytenode');
    require('${to}');
  `);
}
