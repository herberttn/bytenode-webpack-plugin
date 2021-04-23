describe('createLoaderCode', () => {

  for (const platform of ['darwin', 'linux'] as NodeJS.Platform[]) {
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

async function mockPlatform(platform: NodeJS.Platform): Promise<void> {
  jest.resetModules();
  jest.doMock('os', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const os = jest.requireActual('os');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return { ...os, platform: () => platform };
  });

  const os = await import('os');
  expect(os.platform()).toBe(platform);
}

async function testLoaderCode(from: string, to: string): Promise<void> {
  const { createLoaderCode } = await import('../src/loader');

  expect(createLoaderCode(from)).toBe(`
    require('bytenode');
    require('${to}');
  `);
}
