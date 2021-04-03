import { runWebpack } from './runner';

describe('entry middlewares', () => {

  test('should be supported on entry arrays (middleware first)', async () => {
    const assets = await runWebpack({
      entry: ['webpack-hot-middleware/client', './fixtures/first.js'],
    });

    expect(assets).toStrictEqual([
      'main.compiled.jsc',
      'main.js',
    ]);
  });

  test('should be supported on entry arrays (middleware last)', async () => {
    const assets = await runWebpack({
      entry: ['./fixtures/first.js', 'webpack-hot-middleware/client'],
    });

    expect(assets).toStrictEqual([
      'main.compiled.jsc',
      'main.js',
    ]);
  });

  test('should be supported on entry arrays while naming the output (middleware first)', async () => {
    const assets = await runWebpack({
      entry: ['webpack-hot-middleware/client', './fixtures/first.js'],
      output: {
        filename: 'named.js',
      },
    });

    expect(assets).toStrictEqual([
      'main.compiled.jsc',
      'named.js',
    ]);
  });

  test('should be supported on entry arrays while naming the output (middleware last)', async () => {
    const assets = await runWebpack({
      entry: ['./fixtures/first.js', 'webpack-hot-middleware/client'],
      output: {
        filename: 'named.js',
      },
    });

    expect(assets).toStrictEqual([
      'main.compiled.jsc',
      'named.js',
    ]);
  });

  test('should be supported on entry object of arrays (middleware first)', async () => {
    const assets = await runWebpack({
      entry: {
        firstNamed: ['webpack-hot-middleware/client', './fixtures/first.js'],
      },
    });

    expect(assets).toStrictEqual([
      'firstNamed.compiled.jsc',
      'firstNamed.js',
    ]);
  });

  test('should be supported on entry object of arrays (middleware last)', async () => {
    const assets = await runWebpack({
      entry: {
        firstNamed: ['./fixtures/first.js', 'webpack-hot-middleware/client'],
      },
    });

    expect(assets).toStrictEqual([
      'firstNamed.compiled.jsc',
      'firstNamed.js',
    ]);
  });

  test('should be supported on entry object of arrays while naming the output (middleware first)', async () => {
    const assets = await runWebpack({
      entry: {
        firstNamed: ['webpack-hot-middleware/client', './fixtures/first.js'],
      },
      output: {
        filename: 'named.js',
      },
    });

    expect(assets).toStrictEqual([
      'firstNamed.compiled.jsc',
      'named.js',
    ]);
  });

  test('should be supported on entry object of arrays while naming the output (middleware last)', async () => {
    const assets = await runWebpack({
      entry: {
        firstNamed: ['./fixtures/first.js', 'webpack-hot-middleware/client'],
      },
      output: {
        filename: 'named.js',
      },
    });

    expect(assets).toStrictEqual([
      'firstNamed.compiled.jsc',
      'named.js',
    ]);
  });

});
