// modules that do not export type declarations yet

declare module 'bytenode' {
  function compileCode(code: string | ArrayBuffer): Promise<Buffer>;
  function compileElectronCode(code: string | ArrayBuffer): Promise<Buffer>;
}
