import { platform } from 'os';
import { win32 } from 'path';

import slash from 'slash';

function createLoaderCode(relativePath: string): string {
  if (/win32/.test(platform()) && win32.isAbsolute(relativePath)) {
    relativePath = exhaustiveReplace(relativePath, /\/\//g, '/');
    relativePath = exhaustiveReplace(relativePath, /\//g, '\\');
    relativePath = exhaustiveReplace(relativePath, /\\\\/g, '\\');
    relativePath = relativePath.replace(/\\/g, '\\\\');
  } else {
    relativePath = slash(relativePath);
  }

  return `
    require('bytenode');
    require('${relativePath}');
  `;
}

function exhaustiveReplace(source: string, regex: RegExp, target: string): string {
  if (regex.test(source)) {
    return exhaustiveReplace(source.replace(regex, target), regex, target);
  }
  return source;
}

export {
  createLoaderCode,
};
