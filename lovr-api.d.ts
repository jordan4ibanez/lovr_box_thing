
//* Version: 0.17.1.
//* If something is marked as deprecated I'm skipping it.

declare interface lovrConfigModules {
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

declare interface lovrConfigAudio {
  spatializer?: lovrConfigSpatializer;
  samplerate: number;
  start: boolean;
}

declare interface lovrConfigGraphics {
  debug: boolean;
  vsync: boolean;
  stencil: boolean;
  antialias: boolean;
  shadercache: boolean;
}

declare interface lovrConfigHeadset {
  drivers: Array<string>;
  supersample: number;
  seated: boolean;
  antialias: boolean;
  stencil: boolean;
  submitdepth: boolean;
  overlay: boolean;
}

declare interface lovrConfigMath {
  globals: boolean;
}

declare interface lovrConfigWindow {
  width: number;
  height: number;
  fullscreen: boolean;
  resizable: boolean;
  title: string;
  icon: string;
}

declare interface lovrConfig {
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

declare interface Source {
  // todo
}

declare interface Sound {
  // todo
}

declare interface Blob {
  // todo
}

declare interface Model {
  // todo
}

declare interface Vec2 {

}

declare interface Vec3 {
  // todo
}

declare interface Vec4 {
  // todo
}

declare interface Quat {
  // todo
}

declare interface ShaderStage {
  // todo
}

declare interface Font {
  // todo
}

declare interface Pass {
  // todo
}

declare interface Buffer {
  // todo
}

declare interface Rasterizer {
  // todo
}

declare interface Texture {
  // todo
}

declare interface Material {
  // todo
}

declare interface Mesh {
  // todo
}

declare interface MeshStorage {
  // todo
}

declare interface ModelData {
  // todo
}

declare interface TextureFormat {
  // todo
}

declare interface Sampler {
  // todo
}

declare interface FilterMode {
  // todo
}

declare interface WrapMode {
  // todo
}

declare interface CompareMode {
  // todo
}

declare interface Shader {
  // todo
}

declare interface DefaultShader {
  // todo
}

declare interface TextureType {
  // todo
}

declare interface newSourceOptions {
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

declare interface AudioDeviceType {
  id: LuaUserdata;
  name: string;
  default: boolean;
}

declare type DataLayout = "packed" | "std140" | "std430";

declare interface BufferFormat {
  layout: DataLayout;
  stride: number;
}

declare type DataType = "i8x4" | "u8x4" | "sn8x4" | "un8x4" | "un10x3" | "i16" | "i16x2" | "i16x4" | "u16" | "u16x2" | "u16x4" | "sn16x2" | "sn16x4" | "un16x2" | "un16x4" | "i32" | "i32x2" | "i32x2" | "i32x3" | "i32x4" | "u32" | "u32x2" | "u32x3" | "u32x4" | "f16x2" | "f16x4" | "f32" | "f32x2" | "f32x3" | "f32x4" | "mat2" | "mat3" | "mat4" | "index16" | "index32";

declare interface MaterialProperties {
  color?: Vec4;
  glow?: Vec4;
  uvShift?: Vec2;
  uvScale?: Vec2;
  metalness?: number;
  roughness?: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  occlusionStrength?: number;
  normalScale?: number;
  alphaCutoff?: number;
  texture?: Texture;
  glowTexture?: Texture;
  metalnessTexture?: Texture;
  roughnessTexture?: Texture;
  clearcoatTexture?: Texture;
  occlusionTexture?: Texture;
  normalTexture?: Texture;
}

declare interface ModelOptions {
  mipmaps: boolean;
  materials: boolean;
}

declare interface CanvasDepth {
  format?: TextureFormat;
  texture?: Texture;
}

declare interface Canvas {
  depth: CanvasDepth;
  samples: number;
}

declare interface SamplerParameters {
  filter: Array<FilterMode>;
  wrap: Array<WrapMode>;
  compare: CompareMode;
  anisotropy: number;
  mipmaprange: LuaTable;
}

declare interface ShaderOptions {
  flags: LuaTable;
  label: string;
}

declare interface TextureOptions {
  type: TextureType;
  format: TextureFormat;
  linear: boolean;
  samples: number;
  mipmaps: boolean | number;
  usage: LuaTable;
  label: string;
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

  namespace graphics {
    function compileShader(stage: ShaderStage, source: string): Blob;
    function compileShader(stage: ShaderStage, blob: Blob): Blob;
    function getDefaultFont(): Font;
    function getWindowPass(): Pass;
    function newBuffer(size: number): Buffer;
    function newBuffer(blob: Blob): Buffer;
    function newBuffer(format: BufferFormat, length: number): Buffer;
    function newBuffer(format: BufferFormat, data: LuaTable): Buffer;
    function newBuffer(format: BufferFormat, blob: Blob): Buffer;
    function newBuffer(type: DataType, length: number): Buffer;
    function newBuffer(type: DataType, data: LuaTable): Buffer;
    function newBuffer(type: DataType, blob: Blob): Buffer;
    function newFont(filename: string, size: number, spread: number): Font;
    function newFont(blob: Blob, size: number, spread: number): Font;
    function newFont(size: number, spread: number): Font;
    function newFont(rasterizer: Rasterizer, spread: number): Font;
    function newMaterial(properties: MaterialProperties): Material;
    function newMesh(count: number, storage: MeshStorage): Mesh;
    function newMesh(vertices: LuaTable, storage: MeshStorage): Mesh;
    function newMesh(blob: Blob, storage: MeshStorage): Mesh;
    function newMesh(format: LuaTable, count: number, storage: MeshStorage): Mesh;
    function newMesh(format: LuaTable, vertices: LuaTable, storage: MeshStorage): Mesh;
    function newMesh(format: LuaTable, blob: Blob, storage: MeshStorage): Mesh;
    function newMesh(buffer: Buffer): Mesh;
    function newModel(filename: string, options: ModelOptions): Model;
    function newModel(blob: Blob, options: ModelOptions): Model;
    function newModel(modelData: ModelData, options: ModelOptions): Model;
    function newPass(...textures: Texture[]): Pass;
    function newPass(canvas: Canvas): Pass;
    function newPass(): Pass;
    function newSampler(parameters: SamplerParameters): Sampler;
    function newShader(vertex: string, fragment: string, options: ShaderOptions): Shader;
    function newShader(compute: string, options: ShaderOptions): Shader;
    function newShader(default1: DefaultShader, options: ShaderOptions): Shader;
    function newTexture(filename: string, options: TextureOptions): Texture;
    function newTexture(width: number, height: number, options: TextureOptions): Texture;
    function newTexture(width: number, height: number, layers: number, options: TextureOptions): Texture;
    function newTexture(image: string, options: TextureOptions): Texture;
    function newTexture(images: Array<string>, options: TextureOptions): Texture;
    function newTexture(blob: Blob, options: TextureOptions): Texture;
  }
}