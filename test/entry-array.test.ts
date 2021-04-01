import { runWebpack } from './runner';

describe('entry as an array of strings', () => {

  test('should support 1 entry', async () => {
    const assets = await runWebpack({
      entry: ['./input/first.js'],
    });

    expect(assets).toStrictEqual([
      'first.compiled.jsc',
      'first.js',
    ]);
  });

  test('should support 1 entry while naming the output', async () => {
    const assets = await runWebpack({
      entry: ['./input/first.js'],
      output: {
        filename: 'named.js',
      },
    });

    expect(assets).toStrictEqual([
      'first.compiled.jsc',
      'named.js',
    ]);
  });

  test('should support N entries', async () => {
    const assets = await runWebpack({
      entry: ['./input/first.js', './input/second.js', './input/third.js'],
    });

    expect(assets).toStrictEqual([
      'first.compiled.jsc',
      'first.js',
      'second.compiled.jsc',
      'second.js',
      'third.compiled.jsc',
      'third.js',
    ]);
  });

  test('should support N entries while naming the output', async () => {
    const assets = await runWebpack({
      entry: ['./input/first.js', './input/second.js', './input/third.js'],
      output: {
        filename: 'named.js',
      },
    });

    expect(assets).toStrictEqual([
      'first.compiled.jsc',
      'named.js',
      'second.compiled.jsc',
      'third.compiled.jsc',
    ]);
  });

});

describe('entry as an object of arrays', () => {

  test('should support 1 array of 1 entry', async () => {
    const assets = await runWebpack({
      entry: {
        first: ['./input/first.js'],
      },
    });

    expect(assets).toStrictEqual([
      'first.compiled.jsc',
      'first.js',
    ]);
  });

  test('should support 1 array of 1 entry while naming the output', async () => {
    const assets = await runWebpack({
      entry: ['./input/first.js'],
      output: {
        filename: 'named.js',
      },
    });

    expect(assets).toStrictEqual([
      'first.compiled.jsc',
      'named.js',
    ]);
  });

  test('should support 1 array of N entries', async () => {
    const assets = await runWebpack({
      entry: {
        named: ['./input/first.js', './input/second.js', './input/third.js'],
      },
    });

    expect(assets).toStrictEqual([
      'named.compiled.jsc',
      'named.js',
    ]);
  });

  test('should support 1 array of N entries while naming the output', async () => {
    const assets = await runWebpack({
      entry: {
        named: ['./input/first.js', './input/second.js', './input/third.js'],
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

  test('should support N arrays of 1 entry', async () => {
    const assets = await runWebpack({
      entry: {
        firstNamed: ['./input/first.js'],
        secondNamed: ['./input/second.js'],
        thirdNamed: ['./input/third.js'],
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

  test('should support N arrays of 1 entry while naming the output', async () => {
    const assets = await runWebpack({
      entry: {
        firstNamed: ['./input/first.js'],
        secondNamed: ['./input/second.js'],
        thirdNamed: ['./input/third.js'],
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

  test('should support N arrays of N entries', async () => {
    const assets = await runWebpack({
      entry: {
        firstNamed: ['./input/first.js'],
        mixNamed: ['./input/second.js', './input/third.js'],
      },
    });

    expect(assets).toStrictEqual([
      'firstNamed.compiled.jsc',
      'firstNamed.js',
      'mixNamed.compiled.jsc',
      'mixNamed.js',
    ]);
  });

  test('should support N arrays of N entries while naming the output', async () => {
    const assets = await runWebpack({
      entry: {
        firstNamed: ['./input/first.js'],
        mixNamed: ['./input/second.js', './input/third.js'],
      },
      output: {
        filename: 'index.js',
      },
    });

    expect(assets).toStrictEqual([
      'firstNamed.compiled.jsc',
      'index.js',
      'mixNamed.compiled.jsc',
    ]);
  });

});
