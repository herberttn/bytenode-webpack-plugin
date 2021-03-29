import { runWebpack } from './runner';

describe('entry as an object', () => {

  test('should support one main entry', async () => {
    const assets = await runWebpack({
      entry: {
        main: './input/first.js',
      },
    });

    expect(assets).toStrictEqual(['main.js']);
  });

});
