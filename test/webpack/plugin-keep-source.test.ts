import { runWebpack } from './runner';

describe('plugin option: keepSource', () => {

  test('should keep source when true', async () => {
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

  test('should delete source when false', async () => {
    const assets = await runWebpack({
      entry: './fixtures/first.js',
    }, {
      keepSource: false,
    });

    expect(assets?.sort()).toStrictEqual([
      'main.compiled.jsc',
      'main.js',
    ]);
  });

});
