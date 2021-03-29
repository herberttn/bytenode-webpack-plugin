import { runWebpack } from './runner';

describe('entry as a string', () => {

  test('should be supported', async () => {
    const assets = await runWebpack({
      entry: './input/first.js',
    });

    expect(assets).toStrictEqual(['main.js']);
  });

});
