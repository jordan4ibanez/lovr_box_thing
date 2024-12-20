
declare type OSType = "Windows" | "Linux" | "OSX" | "BSD" | "POSIX" | "Other";
declare type SystemArch = "x86" | "x64" | "arm" | "arm64" | "arm64be" | "ppc" | "mips" | "mipsel" | "mips64" | "mips64el" | "mips64r6" | "mips64r6el";

declare interface CTypeObject {
  free(): void;
  set(func: (...any: []) => any): void;
}

declare interface CStruct { }

declare interface CLib extends LuaTable { }

declare type cdecl = string;
declare type ctype = CTypeObject | AnyTable;
declare type cdata = CTypeObject | AnyTable;
declare type ct = cdecl | ctype | cdata;
declare type VLA = Array<any>;
declare type VLSL = CStruct;


/** 
 * This is the main LuaJIT FFI module.
 * @noResolution
 * @noSelf
 */
declare module "ffi" {
  function cdef(input: string): void;
  // I made C a generic table. Go nuts. :D
  const C: AnyTable;
  function load(name: string, global?: boolean): CLib;
  /** @customName new */
  function new_(data: ct, nelem?: number, ...init: any): cdata;
  function ctype(nelem: number, ...init: any): ctype;
  /** @customName typeof */
  function typeof_(data: ct): ctype;
  function cast(data: ct, ...init: any): cdata;
  function metatype(data: ct): ctype;
  function gc(data: cdata, finalizer: any): cdata;
  function sizeof(data: ct, nelem: number): number;
  function alignof(data: ct): number;
  function offsetof(data: ct, field: number): LuaMultiReturn<[number, number, number]>;
  function istype(data: ct, obj: any): boolean;
  function errno(newerr?: boolean): number;
  function string(ptr: any, len?: number): string;
  function copy(dst: any, src: any, len?: number): void;
  function fill(dst: any, len: number, c?: boolean): void;
  function abi(param: string): boolean;
  const os: OSType;
  const arch: SystemArch;
  function tonumber(data: cdata): number;
  function tostring(data: cdata): string;
  namespace string {
    // todo: If you could help me figure this out, I'd greatly appreciate it. :)
  }
}


/** 
 * This one is a special library in LuaJIT I brought in just for you to have fun. :)
 * @noResolution
 * @noSelf
 */
declare module "jit" {
  // I don' know what this means: func|true [,true|false]
  // If you do, open a PR. :)
  function on(): void;
  function off(): void;
  function flush(): void;
  function flush(trace: number): void;
  function status(): LuaMultiReturn<[status: boolean, ...anything: [string]]>;
  const version: string;
  const os: OSType;
  const arch: SystemArch;
  namespace opt {
    function start(level: number): void;
    function start(...input: [string]): void;
  }
  // util isn't really documented so I can't add it.
}