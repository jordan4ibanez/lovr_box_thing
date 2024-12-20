
declare type OSType = "Windows" | "Linux" | "OSX" | "BSD" | "POSIX" | "Other";
declare type SystemArch = "x86" | "x64" | "arm" | "arm64" | "arm64be" | "ppc" | "mips" | "mipsel" | "mips64" | "mips64el" | "mips64r6" | "mips64r6el";

/** 
 * @noResolution
 * @noSelf
 */
declare module "ffi" {

  function cdef(input: string): void;
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
  function version(): string;
  function os(): OSType;
  function arch(): SystemArch;
  namespace opt {
    function start(level: number): void;
    function start(...input: [string]): void;
  }
  // util isn't really documented so I can't add it.
}