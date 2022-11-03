import { runWebpack } from './runner';

describe('entry as a function', () => {

  test('should not be supported', async () => {
    const assets = runWebpack({
      entry: () => './fixtures/first.js',
    });

    await expect(assets).rejects.toThrow('webpack.options.entry cannot be a function');
  });

});
