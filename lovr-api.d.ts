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

interface lovrConfigHeadset {
  drivers: Array<string>;
  supersample: number;
  seated: boolean;
  antialias: boolean;
  stencil: boolean;
  submitdepth: boolean;
  overlay: boolean;
}

interface lovrConfigMath {
  globals: boolean;
}

interface lovrConfigWindow {
  width: number;
  height: number;
  fullscreen: boolean;
  resizable: boolean;
  title: string;
  icon: string;
}

interface lovrConfig {
  version: string;
  identity: string;
  saveprecedence: boolean;
  modules: lovrConfigModules;
  audio: lovrConfigAudio;
  graphics: lovrConfigGraphics;
  headset: lovrConfigHeadset;
  math: lovrConfigMath;
  window: lovrConfigWindow;
}



/** @noSelf **/
declare namespace lovr {
  function conf(t: lovrConfig): void;
}