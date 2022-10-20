import { runWebpack } from './runner';

describe('with-dependency', () => {

  test('should just work', async () => {
    const assets = await runWebpack({
      entry: './fixtures/dependency.js',
    });

    expect(assets?.sort()).toStrictEqual([
      'main.compiled.jsc',
      'main.js',
    ]);
  });

});
