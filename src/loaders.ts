import { platform } from 'os';
import { resolve, win32 } from 'path';

import slash from 'slash';
import type { LoaderContext } from 'webpack';

interface LoaderOptions {
  imports: string[];
}

function checkLoaderOptions(options: LoaderOptions): void {
  if (!options || typeof options !== 'object') {
    throw new Error('loader options should be an object');
  }

  if (!Array.isArray(options.imports)) {
    throw new Error('loader options.imports should be an array');
  }

  if (options.imports.length <= 0) {
    throw new Error('loader options.imports cannot be empty');
  }

  if (options.imports.some(i => typeof i !== 'string')) {
    throw new Error('loader options.imports can only have strings');
  }
}

function createLoaderCode(options: LoaderOptions): string {
  checkLoaderOptions(options);

  let { imports } = options;

  // normalize relative paths
  imports = imports.map(path => normalizeRelativePath(path));

  // bytenode should be imported before any compiled file
  imports.unshift('bytenode');

  return imports
    .map(path => `require('${path}');`)
    .join('\n');
}

function createLoaderRequest(options: LoaderOptions): string {
  checkLoaderOptions(options);

  const loader = resolve(__filename);
  const query = JSON.stringify(options);

  return `${loader}?${query}!`;
}

function executeLoader(this: LoaderContext<LoaderOptions>): string {
  return createLoaderCode(this.getOptions({
    properties: {
      imports: {
        items: {
          type: 'string',
        },
        type: 'array',
      },
    },
    required: [
      'imports',
    ],
    type: 'object',
  }));
}

function normalizeRelativePath(relativePath: string): string {
  if (/win32/.test(platform()) && win32.isAbsolute(relativePath)) {
    relativePath = win32.normalize(relativePath);
    relativePath = relativePath.replace(/\\/g, '\\\\');
  } else {
    relativePath = slash(relativePath);
  }

  return relativePath;
}

export default executeLoader;
export {
  createLoaderCode,
  createLoaderRequest,
  normalizeRelativePath,
};

export type {
  LoaderOptions,
};
