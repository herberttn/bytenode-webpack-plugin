import { runWebpack } from './runner';

describe('entry as an array of strings', () => {

  test('should support 1 entry', async () => {
    const assets = await runWebpack({
      entry: ['./fixtures/first.js'],
    });

    expect(assets).toStrictEqual([
      'first.compiled.jsc',
      'first.js',
    ]);
  });

  test('should support 1 entry while naming the output', async () => {
    const assets = await runWebpack({
      entry: ['./fixtures/first.js'],
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
      entry: ['./fixtures/first.js', './fixtures/second.js', './fixtures/third.js'],
    });

    expect(assets).toStrictEqual([
      'main.compiled.jsc',
      'main.js',
    ]);
  });

  test('should support N entries while naming the output', async () => {
    const assets = await runWebpack({
      entry: ['./fixtures/first.js', './fixtures/second.js', './fixtures/third.js'],
      output: {
        filename: 'named.js',
      },
    });

    expect(assets).toStrictEqual([
      'main.compiled.jsc',
      'named.js',
    ]);
  });

});

describe('entry as an object of arrays', () => {

  test('should support 1 array of 1 entry', async () => {
    const assets = await runWebpack({
      entry: {
        first: ['./fixtures/first.js'],
      },
    });

    expect(assets).toStrictEqual([
      'first.compiled.jsc',
      'first.js',
    ]);
  });

  test('should support 1 array of 1 entry while naming the output', async () => {
    const assets = await runWebpack({
      entry: ['./fixtures/first.js'],
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
        named: ['./fixtures/first.js', './fixtures/second.js', './fixtures/third.js'],
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
        named: ['./fixtures/first.js', './fixtures/second.js', './fixtures/third.js'],
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
        firstNamed: ['./fixtures/first.js'],
        secondNamed: ['./fixtures/second.js'],
        thirdNamed: ['./fixtures/third.js'],
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
        firstNamed: ['./fixtures/first.js'],
        secondNamed: ['./fixtures/second.js'],
        thirdNamed: ['./fixtures/third.js'],
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
        firstNamed: ['./fixtures/first.js'],
        mixNamed: ['./fixtures/second.js', './fixtures/third.js'],
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
        firstNamed: ['./fixtures/first.js'],
        mixNamed: ['./fixtures/second.js', './fixtures/third.js'],
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
