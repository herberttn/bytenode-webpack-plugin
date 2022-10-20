const COMPILED_EXTENSION = '.jsc';
const COMPILED_EXTENSION_REGEX = new RegExp('\\' + COMPILED_EXTENSION +'$', 'i');
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

export {
  fromCompiledToTargetExtension,
  fromTargetToCompiledExtension,
  isCompiledExtension,
  isTargetExtension,
};
