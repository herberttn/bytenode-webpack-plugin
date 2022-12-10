import { runWebpack } from './runner';

describe('plugin option: exclude', () => {

  const webpackOptions = {
    entry: {
      firstNamed: './fixtures/first.js',
      secondNamed: './fixtures/second.js',
      thirdNamed: './fixtures/third.js',
    },
  };

  test('empty means all', async () => {
    const { names } = await runWebpack(webpackOptions);

    expect(names).toStrictEqual([
      'firstNamed.compiled.jsc',
      'firstNamed.js',
      'secondNamed.compiled.jsc',
      'secondNamed.js',
      'thirdNamed.compiled.jsc',
      'thirdNamed.js',
    ]);
  });

  test('accepts regex', async () => {
    const { names } = await runWebpack(webpackOptions, {
      exclude: [
        /first/,
      ],
    });

    expect(names).toStrictEqual([
      'firstNamed.compiled.js',
      'firstNamed.js',
      'secondNamed.compiled.jsc',
      'secondNamed.js',
      'thirdNamed.compiled.jsc',
      'thirdNamed.js',
    ]);
  });

  test('accepts pattern', async () => {
    const { names } = await runWebpack(webpackOptions, {
      exclude: [
        'first*',
      ],
    });

    expect(names).toStrictEqual([
      'firstNamed.compiled.js',
      'firstNamed.js',
      'secondNamed.compiled.jsc',
      'secondNamed.js',
      'thirdNamed.compiled.jsc',
      'thirdNamed.js',
    ]);
  });

  test('overrides include', async () => {
    const { names } = await runWebpack(webpackOptions, {
      exclude: [
        /first/,
      ],
      include: [
        /first/,
        /second/,
      ],
    });

    expect(names).toStrictEqual([
      'firstNamed.compiled.js',
      'firstNamed.js',
      'secondNamed.compiled.jsc',
      'secondNamed.js',
      'thirdNamed.compiled.js',
      'thirdNamed.js',
    ]);
  });

});
