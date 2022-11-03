import { runWebpack } from './runner';

describe('plugin option: include', () => {

  const webpackOptions = {
    entry: {
      firstNamed: './fixtures/first.js',
      secondNamed: './fixtures/second.js',
      thirdNamed: './fixtures/third.js',
    },
  };

  test('empty means all', async () => {
    const assets = await runWebpack(webpackOptions);

    expect(assets?.sort()).toStrictEqual([
      'firstNamed.compiled.jsc',
      'firstNamed.js',
      'secondNamed.compiled.jsc',
      'secondNamed.js',
      'thirdNamed.compiled.jsc',
      'thirdNamed.js',
    ]);
  });

  test('accepts regex', async () => {
    const assets = await runWebpack(webpackOptions, {
      include: [
        /first/,
      ],
    });

    expect(assets?.sort()).toStrictEqual([
      'firstNamed.compiled.jsc',
      'firstNamed.js',
      'secondNamed.compiled.js',
      'secondNamed.js',
      'thirdNamed.compiled.js',
      'thirdNamed.js',
    ]);
  });

  test('accepts pattern', async () => {
    const assets = await runWebpack(webpackOptions, {
      include: [
        'first*',
      ],
    });

    expect(assets?.sort()).toStrictEqual([
      'firstNamed.compiled.jsc',
      'firstNamed.js',
      'secondNamed.compiled.js',
      'secondNamed.js',
      'thirdNamed.compiled.js',
      'thirdNamed.js',
    ]);
  });

});
