import { normalizeCodePath } from './utils';

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

  if (options.imports.some(file => typeof file !== 'string')) {
    throw new Error('loader options.imports can only have strings');
  }
}

function createLoaderCode(options: LoaderOptions): string {
  checkLoaderOptions(options);

  let { imports } = options;

  // normalize paths
  imports = imports.map(path => normalizeCodePath(path));

  // bytenode should be imported before any compiled file
  imports.unshift('bytenode');

  return imports
    .map(path => `require('${path}');`)
    .join('\n');
}

export {
  createLoaderCode,
};

export type {
  LoaderOptions,
};
