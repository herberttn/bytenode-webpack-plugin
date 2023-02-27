import { platform } from 'os';
import { basename, extname, win32 } from 'path';

import picomatch from 'picomatch';
import slash from 'slash';

import type { FileMatcher, FileMatcherIntent, FileMatcherIntentMatcher } from './types';

const COMPILED_EXTENSION = '.jsc';
const COMPILED_EXTENSION_REGEX = new RegExp('\\' + COMPILED_EXTENSION +'$', 'i');
const LOADER_EXTENSION = '.js';
const LOADER_SUFFIX = '.loader';
const TARGET_EXTENSION = '.js';
const TARGET_EXTENSION_REGEX = new RegExp('\\' + TARGET_EXTENSION +'$', 'i');

function createFileMatcher(includes: FileMatcherIntent[] = [], excludes: FileMatcherIntent[] = []): FileMatcher {
  if (includes.length <= 0 && excludes.length <= 0) {
    return function bypass(): boolean {
      return true;
    };
  }

  const includeMatchers = includes.map(createIntentMatcher);
  const excludeMatchers = excludes.map(createIntentMatcher);

  return function matches(file: string): boolean {
    file = slash(file);

    for (const matcher of excludeMatchers) {
      if (matcher.test(file)) {
        return false;
      }
    }

    for (const matcher of includeMatchers) {
      if (matcher.test(file)) {
        return true;
      }
    }

    return includeMatchers.length <= 0;
  };

  function createIntentMatcher(intent: FileMatcherIntent): FileMatcherIntentMatcher {
    if (intent instanceof RegExp) {
      return intent;
    }

    return {
      test(file: string): boolean {
        const pattern = slash(intent);
        const matches = picomatch(pattern, { dot: true });

        return matches(file);
      },
    };
  }
}

function fromCompiledToTargetExtension(file: string): string {
  return file.replace(COMPILED_EXTENSION_REGEX, TARGET_EXTENSION);
}

function fromTargetToCompiledExtension(file: string): string {
  return file.replace(TARGET_EXTENSION_REGEX, COMPILED_EXTENSION);
}

function isCompiledExtension(file: string): boolean {
  return COMPILED_EXTENSION_REGEX.test(file);
}

function isTargetExtension(file: string): boolean {
  return TARGET_EXTENSION_REGEX.test(file);
}

function normalizeCodePath(path: string): string {
  if (/win32/.test(platform()) && win32.isAbsolute(path)) {
    return normalizeCodePathForWindows(path);
  }

  return normalizeCodePathForUnix(path);
}

function normalizeCodePathForUnix(path: string): string {
  return slash(path);
}

function normalizeCodePathForWindows(path: string): string {
  path = win32.normalize(path);
  path = path.replace(/\\/g, '\\\\');

  return path;
}

function toLoaderFileName(file: string): string {
  const name = basename(file);
  const pure = basename(name, extname(file));

  return file.replace(name, pure + LOADER_SUFFIX + LOADER_EXTENSION);
}

function toSiblingRelativeFileLocation(file: string): string {
  return `./${basename(file)}`;
}

export {
  createFileMatcher,
  fromCompiledToTargetExtension,
  fromTargetToCompiledExtension,
  isCompiledExtension,
  isTargetExtension,
  normalizeCodePath,
  normalizeCodePathForUnix,
  normalizeCodePathForWindows,
  toLoaderFileName,
  toSiblingRelativeFileLocation,
};
