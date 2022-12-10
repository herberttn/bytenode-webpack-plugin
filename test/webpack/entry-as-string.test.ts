import { runWebpack } from './runner';

describe('entry as a string', () => {

  test('should be supported', async () => {
    const { names } = await runWebpack({
      entry: './fixtures/first.js',
    });

    expect(names).toStrictEqual([
      'main.compiled.jsc',
      'main.js',
    ]);
  });

});
