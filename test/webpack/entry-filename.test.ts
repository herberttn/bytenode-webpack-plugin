import { runWebpack } from './runner';

describe('entry filename', () => {

  test('should not support entry filename', async () => {
    const promise = runWebpack({
      entry: {
        named: {
          filename: 'other.js',
          import: './fixtures/first.js',
        },
      },
    });

    await expect(promise).rejects.toThrow('webpack.options.entry.filename is not supported');
  });

});
