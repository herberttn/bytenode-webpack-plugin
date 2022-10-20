import { runWebpack } from './runner';

describe('output filename', () => {

  test('should not support static filename', async () => {
    const assets = runWebpack({
      entry: './fixtures/first.js',
      output: {
        filename: 'static.js',
      },
    });

    await expect(assets).rejects.toThrow('webpack.options.filename cannot be static');
  });

  test('should support dynamic filename', async () => {
    const assets = await runWebpack({
      entry: './fixtures/first.js',
      output: {
        filename: '[name].js',
      },
    });

    expect(assets?.sort()).toStrictEqual([
      'main.compiled.jsc',
      'main.js',
    ]);
  });

});
