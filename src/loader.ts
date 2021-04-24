import { platform } from 'os';
import { win32 } from 'path';

import slash from 'slash';

function createLoaderCode(relativePath: string): string {
  if (/win32/.test(platform()) && win32.isAbsolute(relativePath)) {
    relativePath = win32.normalize(relativePath);
    relativePath = relativePath.replace(/\\/g, '\\\\');
  } else {
    relativePath = slash(relativePath);
  }

  return `
    require('bytenode');
    require('${relativePath}');
  `;
}

export {
  createLoaderCode,
};
