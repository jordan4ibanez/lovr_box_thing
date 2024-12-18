interface lovrConfigModules {
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

declare type lovrConfigSpatializer = "simple" | "oculus" | "phonon";

interface lovrConfigAudio {
  spatializer?: lovrConfigSpatializer;
  samplerate: number;
  start: boolean;
}

interface lovrConfigGraphics {
  debug: boolean;
  vsync: boolean;
  stencil: boolean;
  antialias: boolean;
  shadercache: boolean;
}

interface lovrConfig {
  version: string;
  identity: string;
  saveprecedence: boolean;
  modules: lovrConfigModules;
  audio: lovrConfigAudio;
  graphics: lovrConfigGraphics;
}



/** @noSelf **/
declare namespace lovr {
  function conf(t: lovrConfig): void;
}