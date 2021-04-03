import { runWebpack } from './runner';

describe('runner', () => {

  test('should reject an invalid entry', async () => {
    const runner = runWebpack({
      entry: './fixtures/invalid.js',
    });

    await expect(runner).rejects.toContain('not found');
  });

  test('should throw on an invalid output path', async () => {
    const runner = runWebpack({
      entry: './fixtures/first.js',
      output: {
        // @ts-expect-error
        path: null,
      },
    });

    await expect(runner).rejects.toThrow();
  });

});
