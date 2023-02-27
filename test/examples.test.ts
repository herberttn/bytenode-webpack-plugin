import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

import { isCI } from 'ci-info';
import { $, cd, nothrow, sleep } from 'zx';

import { normalizeCodePath } from '../src/utils';

enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

const conditionalDescribe = isCI
  ? describe.skip
  : describe;

const conditionalTest = isCI
  ? test.skip
  : test;

const examples: string[] = [
  'examples/electron-forge-typescript-webpack',
  'examples/electron-forge-webpack',
];

const timeout = 5 * 60_000;

conditionalDescribe.each(examples)('%s', example => {
  conditionalTest.each(Object.values(Environment))('%s', async environment => {
    const location = resolve(__dirname, '..', example);

    cd(location);

    if (!existsSync(resolve(location, 'node_modules'))) {
      await $`npm ci`;
    }

    const produce = environment === Environment.PRODUCTION
      ? make
      : start;

    await produce();

    expectFile(location, { path: '.webpack/main/index.compiled.jsc' });
    expectFile(location, { path: '.webpack/renderer/main_window.compiled/index.jsc' });
    expectFile(location, { path: '.webpack/renderer/main_window/preload.compiled.jsc' });

    expectFile(location, {
      path: '.webpack/main/index.js',
      toContainRequireOf: './index.compiled.jsc',
    });

    expectFile(location, {
      path: '.webpack/renderer/main_window/index.js',
      toContainRequireOf: environment === Environment.PRODUCTION
        ? '../main_window.compiled/index.jsc'
        : resolve(location, '.webpack/renderer/main_window.compiled/index.jsc'),
    });

    expectFile(location, {
      path: '.webpack/renderer/main_window/preload.js',
      toContainRequireOf: './preload.compiled.jsc',
    });
  }, timeout);
});

function expectFile(base: string, options: { path: string; toContainRequireOf?: string }): void {
  const location = resolve(base, options.path);

  // so it shows the path if it fails
  const exists = existsSync(location) ? location : '';
  expect(exists).toBe(location);

  if (options.toContainRequireOf) {
    const content = readFileSync(location, 'utf8');
    const path = normalizeCodePath(options.toContainRequireOf);

    expect(content).toContain(`require("${path}")`);
  }
}

async function make(): Promise<void> {
  await $`npm run make`;
}

async function start(): Promise<void> {
  const process = $`npm run start`;
  await sleep(timeout / 0.8);
  await process.kill('SIGKILL');
  await nothrow(process);
}
