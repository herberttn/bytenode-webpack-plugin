import { runWebpack } from './runner';
import type { Configuration } from './runner';

console.debug = jest.fn();
console.log = jest.fn();
console.warn = jest.fn();

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

describe('plugin option: compileForElectron', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should fail to find electron', async () => {
    const promise = runWebpack(webpackOptions, {
      compileForElectron: true,
    });

    await expect(promise).rejects.toThrow(`Cannot find module 'electron' from 'node_modules/bytenode/lib/index.js'`);
  });

  test('should warn when using non-electron string target', async () => {
    try {
      await runWebpack({
        ...webpackOptions,
        target: 'node',
      }, {
        compileForElectron: true,
      });
    } catch {
      // ignore, we're only interested on the warning
    }

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('Consider using an electron target instead of or in addition to [node] when compiling for electron.'));
  });

  test('should warn when using non-electron array of targets', async () => {
    try {
      await runWebpack({
        ...webpackOptions,
        target: ['node', 'async-node'],
      }, {
        compileForElectron: true,
      });
    } catch {
      // ignore, we're only interested on the warning
    }

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('Consider using an electron target instead of or in addition to [node, async-node] when compiling for electron.'));
  });

  test('should not warn when using electron string target', async () => {
    try {
      await runWebpack({
        ...webpackOptions,
        target: 'electron-main',
      }, {
        compileForElectron: true,
      });
    } catch {
      // ignore, we're only interested on the warning
    }

    expect(console.warn).toHaveBeenCalledTimes(0);
  });

  test('should not warn when using electron in array of targets', async () => {
    try {
      await runWebpack({
        ...webpackOptions,
        target: ['node', 'electron-main'],
      }, {
        compileForElectron: true,
      });
    } catch {
      // ignore, we're only interested on the warning
    }

    expect(console.warn).toHaveBeenCalledTimes(0);
  });

});
