import { runWebpack } from './runner';

describe('entry as a string', () => {

  test('should be supported', async () => {
    const assets = await runWebpack({
      entry: './fixtures/first.js',
    }, {
      keepSource: true,
    });

    expect(assets?.sort()).toStrictEqual([
      'main.compiled.js',
      'main.compiled.jsc',
      'main.js',
    ]);
  });

});
