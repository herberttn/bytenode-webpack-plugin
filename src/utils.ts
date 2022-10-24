import { basename, extname } from 'path';

const COMPILED_EXTENSION = '.jsc';
const COMPILED_EXTENSION_REGEX = new RegExp('\\' + COMPILED_EXTENSION +'$', 'i');
const LOADER_EXTENSION = '.js';
const LOADER_SUFFIX = '.loader';
const TARGET_EXTENSION = '.js';
const TARGET_EXTENSION_REGEX = new RegExp('\\' + TARGET_EXTENSION +'$', 'i');

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

function toLoaderFileName(file: string): string {
  const name = basename(file);
  const pure = basename(name, extname(file));

  return file.replace(name, pure + LOADER_SUFFIX + LOADER_EXTENSION);
}

function toSiblingRelativeFileLocation(file: string): string {
  return `./${basename(file)}`;
}

export {
  fromCompiledToTargetExtension,
  fromTargetToCompiledExtension,
  isCompiledExtension,
  isTargetExtension,
  toLoaderFileName,
  toSiblingRelativeFileLocation,
};
