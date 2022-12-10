import { runWebpack } from './runner';

describe('entry as an object', () => {

  test('should support one named entry', async () => {
    const { names } = await runWebpack({
      entry: {
        named: './fixtures/first.js',
      },
    });

    expect(names).toStrictEqual([
      'named.compiled.jsc',
      'named.js',
    ]);
  });

  test('should support more than one named entry', async () => {
    const { names } = await runWebpack({
      entry: {
        firstNamed: './fixtures/first.js',
        secondNamed: './fixtures/second.js',
        thirdNamed: './fixtures/third.js',
      },
    });

    expect(names).toStrictEqual([
      'firstNamed.compiled.jsc',
      'firstNamed.js',
      'secondNamed.compiled.jsc',
      'secondNamed.js',
      'thirdNamed.compiled.jsc',
      'thirdNamed.js',
    ]);
  });

});
