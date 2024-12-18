interface LOVRConfigModules {
  audio: boolean;
  data: boolean;
  event: boolean;
  graphics: boolean;
  headset: boolean;
  math: boolean;
  physics: boolean;
  system: boolean;
  thread: boolean;
  timer: boolean;
}

declare type LOVRConfigSpatializer = "simple" | "oculus" | "phonon";

interface LOVRConfigAudio {
  spatializer?: LOVRConfigSpatializer;
  samplerate: number;
  start: boolean;
}

interface LOVRConfigGraphics {
  debug: boolean;
  vsync: boolean;
  stencil: boolean;
  antialias: boolean;
  shadercache: boolean;
}

interface LOVRConfig {
  version: string;
  identity: string;
  saveprecedence: boolean;
  modules: LOVRConfigModules;
  audio: LOVRConfigAudio;
  graphics: LOVRConfigGraphics;
}



/** @noSelf **/
declare namespace lovr {
  function conf(t: LOVRConfig): void;
}