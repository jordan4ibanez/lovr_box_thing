
//* Version: 0.17.1

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

declare class Source {
  // todo
}

declare class Sound {
  // todo
}

declare class Blob {
  // todo
}

declare class Model {
  // todo
}

declare class Quat {
  // todo
}

declare class Vec3 {
  // todo
}

interface newSourceOptions {
  decode: boolean;
  pitchable: boolean;
  spatial: boolean;
  // todo: touch this up
  effects: LuaTable;
}

declare type VolumeUnit = "linear" | "db";

declare type AudioMaterial = "generic" | "brick" | "carpet" | "ceramic" | "concrete" | "glass" | "gravel" | "metal" | "plaster" | "rock" | "wood";

declare type AudioType = "playback" | "capture";

declare type AudioShareMode = "shared" | "exclusive";

interface AudioDeviceType {
  id: LuaUserdata;
  name: string;
  default: boolean;
}

/** @noSelf **/
declare namespace lovr {
  function conf(t: lovrConfig): void;

  namespace audio {
    function newSource(data: string | Blob | Sound, options: newSourceOptions): Source;
    function getOrientation(): LuaMultiReturn<[angle: number, ax: number, ay: number, az: number]>;
    function getPose(): LuaMultiReturn<[x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number]>;
    function getPosition(): LuaMultiReturn<[x: number, y: number, z: number]>;
    function getSpatializer(): string;
    function getVolume(units: VolumeUnit): number;
    function setGeometry(vertices: Array<number>, indices: Array<number>, material: AudioMaterial): boolean;
    function setGeometry(model: Model, material: AudioMaterial): boolean;
    function setOrientation(angle: number, ax: number, ay: number, az: number): void;
    function setOrientation(orientation: Quat): void;
    function setPose(x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number): void;
    function setPose(position: Vec3, orientation: Quat): void;
    function setPosition(x: number, y: number, z: number): void;
    function setPosition(position: Vec3): void;
    function setVolume(volume: number, units: VolumeUnit): void;
    function getDevice(type: AudioType): LuaMultiReturn<[name: string, id: LuaUserdata]>;
    function getDevices(type: AudioType): Array<AudioDeviceType>;
    function getSampleRate(): number;
    function isStarted(type: AudioType): boolean;
    function setDevice(type: AudioType, id: LuaUserdata, sink: Sound, mode: AudioShareMode): boolean;
    function start(type: AudioType): boolean;
    function stop(type: AudioType): boolean;
  }

  namespace event {
    function clear(): void;
    function poll(): LuaIterator<string, [...any]>;
    function push(name: string, ...anything: any): void;
    function quit(code: number): void;
    function restart(): void;
  }

  namespace filesystem {
    function append(filename: string, contents: string): number;
    function append(filename: string, blob: Blob): number;
    function createDirectory(path: string): boolean;
    function getDirectoryItems(path: string): Array<string>;
    function getLastModified(path: string): number | null;
    function getSize(file: string): number;
    function isDirectory(path: string): boolean;
    function isFile(path: string): boolean;
    function newBlob(filename: string): Blob;
    function read(filename: string, bytes: number): LuaMultiReturn<[contents: string, bytes: number]>;
    function remove(path: string): boolean;
    function write(filename: string, content: string): boolean;
    function write(filename: string, blob: Blob): boolean;
    function getIdentity(): string | null;
    function getRealDirectory(path: string): string;
    function isFused(): boolean;
    function mount(path: string, mountpoint: string, append: boolean, root: string): boolean;
    function setIdentity(identity: string): void;
    function unmount(path: string): boolean;
    function getAppdataDirectory(): string;
    function getExecutablePath(): string | null;
    function getSaveDirectory(): string;
    function getSource(): string | null;
    function getUserDirectory(): string;
    function getWorkingDirectory(): string | null;
    function getRequirePath(): string;
    function load(filename: string, mode: string): (...any: any) => LuaMultiReturn<[...any]>;
    function setRequirePath(path: string): void;
  }
}