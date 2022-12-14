import { runWebpack } from './runner';

describe('output', () => {

  test('should not support static filename', async () => {
    const assets = runWebpack({
      entry: './fixtures/first.js',
      output: {
        filename: 'static.js',
      },
    });

    await expect(assets).rejects.toThrow('webpack.options.output.filename cannot be static, use a dynamic one like [name].js');
  });

  test('should support dynamic filename', async () => {
    const { names } = await runWebpack({
      entry: './fixtures/first.js',
      output: {
        filename: '[name].js',
      },
    });

    expect(names).toStrictEqual([
      'main.compiled.jsc',
      'main.js',
    ]);
  });

});
