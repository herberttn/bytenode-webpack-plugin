import { runWebpack } from './runner';

describe('entry as an object', () => {

  test('should support one named entry', async () => {
    const assets = await runWebpack({
      entry: {
        named: './fixtures/first.js',
      },
    });

    expect(assets).toStrictEqual([
      'named.compiled.jsc',
      'named.js',
    ]);
  });

  test('should support one named entry while naming the output', async () => {
    const assets = await runWebpack({
      entry: {
        named: './fixtures/first.js',
      },
      output: {
        filename: 'index.js',
      },
    });

    expect(assets).toStrictEqual([
      'index.js',
      'named.compiled.jsc',
    ]);
  });

  test('should support more than one named entry', async () => {
    const assets = await runWebpack({
      entry: {
        firstNamed: './fixtures/first.js',
        secondNamed: './fixtures/second.js',
        thirdNamed: './fixtures/third.js',
      },
    });

    expect(assets).toStrictEqual([
      'firstNamed.compiled.jsc',
      'firstNamed.js',
      'secondNamed.compiled.jsc',
      'secondNamed.js',
      'thirdNamed.compiled.jsc',
      'thirdNamed.js',
    ]);
  });

  test('should support more than one named entry while naming the output', async () => {
    const assets = await runWebpack({
      entry: {
        firstNamed: './fixtures/first.js',
        secondNamed: './fixtures/second.js',
        thirdNamed: './fixtures/third.js',
      },
      output: {
        filename: 'index.js',
      },
    });

    expect(assets).toStrictEqual([
      'firstNamed.compiled.jsc',
      'index.js',
      'secondNamed.compiled.jsc',
      'thirdNamed.compiled.jsc',
    ]);
  });

});
