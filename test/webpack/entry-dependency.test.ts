import { runWebpack } from './runner';

describe('entry dependency', () => {

  test('should just work', async () => {
    const { names } = await runWebpack({
      entry: './fixtures/dependency.js',
    });

    expect(names).toStrictEqual([
      'main.compiled.jsc',
      'main.js',
    ]);
  });

});
