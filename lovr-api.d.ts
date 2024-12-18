interface LOVRConfigModules {
  audio: boolean
  data: boolean
  event: boolean
  graphics: boolean
  headset: boolean
  math: boolean
  physics: boolean
  system: boolean
  thread: boolean
  timer: boolean
}

interface LOVRConfig {
  version: string
  identity: string
  saveprecedence: boolean
  modules: LOVRConfigModules
}

/** @noSelf **/
declare namespace lovr {
  function conf(t: LOVRConfig): void;
}