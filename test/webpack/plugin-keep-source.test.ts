import { runWebpack } from './runner';

describe('plugin option: keepSource', () => {

  test('should keep source when true', async () => {
    const { names } = await runWebpack({
      entry: './fixtures/first.js',
    }, {
      keepSource: true,
    });

    expect(names).toStrictEqual([
      'main.compiled.js',
      'main.compiled.jsc',
      'main.js',
    ]);
  });

  test('should delete source when false', async () => {
    const { names } = await runWebpack({
      entry: './fixtures/first.js',
    }, {
      keepSource: false,
    });

    expect(names).toStrictEqual([
      'main.compiled.jsc',
      'main.js',
    ]);
  });

});
