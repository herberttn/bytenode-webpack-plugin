import { runWebpack } from './runner';

describe('entry as an object', () => {

  test('should support one named entry', async () => {
    const assets = await runWebpack({
      entry: {
        named: './input/first.js',
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
        named: './input/first.js',
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
        firstNamed: './input/first.js',
        secondNamed: './input/second.js',
        thirdNamed: './input/third.js',
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
        firstNamed: './input/first.js',
        secondNamed: './input/second.js',
        thirdNamed: './input/third.js',
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
