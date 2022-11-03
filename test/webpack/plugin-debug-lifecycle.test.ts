import { runWebpack } from './runner';
import type { Configuration } from './runner';

console.log = jest.fn();
console.debug = jest.fn();

const webpackOptions: Configuration = {
  entry: './fixtures/first.js',
  infrastructureLogging: {
    console,
    debug: true,
    level: 'verbose',
  },
  stats: {
    logging: 'verbose',
    loggingDebug: true,
  },
};

describe('plugin option: debugLifecycle', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should not suppress logs when true', async () => {
    await runWebpack(webpackOptions, {
      debugLifecycle: true,
    });

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.debug).toHaveBeenCalledWith(expect.stringContaining('[BytenodeWebpackPlugin/lifecycle]'));
  });

  test('should suppress logs when false', async () => {
    await runWebpack(webpackOptions, {
      debugLifecycle: false,
    });

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.debug).not.toHaveBeenCalledWith(expect.stringContaining('[BytenodeWebpackPlugin/lifecycle]'));
  });

});
