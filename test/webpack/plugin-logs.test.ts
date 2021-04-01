import { runWebpack } from './runner';

const webpackOptions = {
  entry: './fixtures/first.js',
};

describe('debugLifecycle', () => {

  test('should not suppress logs when true', async () => {
    console.log = jest.fn();
    console.debug = jest.fn();

    await runWebpack(webpackOptions, {
      debugLifecycle: true,
      silent: false,
    });

    expect(console.log).toHaveBeenCalledTimes(1); // notice of source maps suppression
    expect(console.debug).toHaveBeenCalled();
  });

  test('should suppress logs when false', async () => {
    console.log = jest.fn();
    console.debug = jest.fn();

    await runWebpack(webpackOptions, {
      debugLifecycle: false,
      silent: false,
    });

    expect(console.log).toHaveBeenCalledTimes(1); // notice of source maps suppression
    expect(console.debug).not.toHaveBeenCalled();
  });

});

describe('debugLogs', () => {

  test('should not suppress logs when true', async () => {
    console.log = jest.fn();
    console.debug = jest.fn();

    await runWebpack(webpackOptions, {
      debugLogs: true,
      silent: false,
    });

    expect(console.log).toHaveBeenCalledTimes(1); // notice of source maps suppression
    expect(console.debug).toHaveBeenCalled();
  });

  test('should suppress logs when false', async () => {
    console.log = jest.fn();
    console.debug = jest.fn();

    await runWebpack(webpackOptions, {
      debugLogs: false,
      silent: false,
    });

    expect(console.log).toHaveBeenCalledTimes(1); // notice of source maps suppression
    expect(console.debug).not.toHaveBeenCalled();
  });

});

describe('silent', () => {

  test('should suppress logs when true', async () => {
    console.log = jest.fn();
    console.debug = jest.fn();

    await runWebpack(webpackOptions, {
      debugLifecycle: true,
      debugLogs: true,
      silent: true,
    });

    expect(console.log).not.toHaveBeenCalled();
    expect(console.debug).not.toHaveBeenCalled();
  });

  test('should not suppress logs when false', async () => {
    console.log = jest.fn();
    console.debug = jest.fn();

    await runWebpack(webpackOptions, {
      debugLifecycle: true,
      debugLogs: true,
      silent: false,
    });

    expect(console.log).toHaveBeenCalledTimes(1); // notice of source maps suppression
    expect(console.debug).toHaveBeenCalled();
  });

});
