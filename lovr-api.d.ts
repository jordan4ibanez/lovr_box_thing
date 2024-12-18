
//* Version: 0.17.1.
//* If something is marked as deprecated I'm skipping it.
// todo: anything that says LuaTable needs to be revisited.

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
  window: lovrConfigWindow | null;
}

declare interface Source {
  // todo
}

declare interface Sound {
  // todo
}

declare interface Blob {
  getSize(): number;
  getName(): string;
  getPointer(): LuaUserdata;
  getString(offset: number, size: number | null): string;
  getI8(offset: number, count: number): Array<number>;
  getU8(offset: number, count: number): Array<number>;
  getI16(offset: number, count: number): Array<number>;
  getU16(offset: number, count: number): Array<number>;
  getI32(offset: number, count: number): Array<number>;
  getU32(offset: number, count: number): Array<number>;
  getF32(offset: number, count: number): Array<number>;
  getF64(offset: number, count: number): Array<number>;
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

declare interface Mat4 {
  // todo
}

declare interface Quat {
  // todo
}

declare interface ShaderStage {
  // todo
}

declare interface HorizontalAlign {
  // todo
}

declare interface VerticalAlign {
  // todo
}

declare interface Font {
  getAscent(): number;
  getDescent(): number;
  getHeight(): number;
  getKerning(first: string, second: string): number;
  getKerning(firstCodepoint: number, second: string): number;
  getKerning(first: string, secondCodepoint: number): number;
  getKerning(firstCodepoint: number, secondCodepoint: number): number;
  getLineSpacing(): number;
  getLines(str: string, wrap: number): LuaTable;
  getLines(strs: LuaTable, wrap: number): LuaTable;
  getPixelDensity(): number;
  getRasterizer(): Rasterizer;
  getVertices(str: string, wrap: number, halign: HorizontalAlign, valign: VerticalAlign): LuaMultiReturn<[vertices: LuaTable, material: Material]>;
  getVertices(strs: LuaTable, wrap: number, halign: HorizontalAlign, valign: VerticalAlign): LuaMultiReturn<[vertices: LuaTable, material: Material]>;
  getWidth(str: string): number;
  getWidth(strs: LuaTable): number;
  setLineSpacing(spacing: number): void;
  setPixelDensity(density: number): void;
  setPixelDensity(): void;
}

declare interface Pass {
  // todo
}

declare interface Readback {
  // todo
}

declare interface BufferFormatElement {
  name: string;
  type: DataType;
  offset: number;
  length: number;
  stride: number;
}

declare interface Buffer {
  getFormat(): Array<BufferFormatElement>;
  getLength(): number;
  getSize(): number;
  getStride(): number;
  clear(offset: number, extent: number | null, value: number): void;
  getData(index: number, count: number | null): LuaTable;
  // I have no idea what lightuserdata is.
  mapData(offset: number, extent: number | null): LuaUserdata;
  newReadback(offset: number, extent: number | null): Readback;
  setData(table: LuaTable, destinationIndex: number, sourceIndex: number, count: number | null): void;
  setData(...numbers: [number]): void;
  setData(vector: Vec2 | Vec3 | Vec4): void;
  setData(blob: Blob, destinationIndex: number, sourceIndex: number, count: number | null): void;
  setData(buffer: Buffer, destinationIndex: number, sourceIndex: number, count: number | null): void;
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

declare interface TextureFeature {
  // todo
}

declare interface DeviceAxis {
  // todo
}

declare interface DeviceButton {
  // todo
}

declare interface PassthroughMode {
  // todo
}

declare interface HeadsetDriver {
  // todo
}

declare interface RandomGenerator {
  // todo
}

declare interface Curve {
  slice(t1: number, t2: number): Curve;
  addPoint(x: number, y: number, z: number, index: number | null): void;
  evaluate(t: number): LuaMultiReturn<[x: number, y: number, z: number]>;
  getPoint(index: number): LuaMultiReturn<[x: number, y: number, z: number]>;
  getPointCount(): number;
  getTangent(t: number): LuaMultiReturn<[x: number, y: number, z: number]>;
  removePoint(index: number): void;
  render(n: number, t1: number, t2: number): Array<number>;
  setPoint(index: number, x: number, y: number, z: number): void;
}

declare interface Shape {
  // todo
}

declare interface Collider {
  addShape(shape: Shape): void;
  applyForce(x: number, y: number, z: number): void;
  applyForce(x: number, y: number, z: number, px: number, py: number, pz: number): void;
  applyForce(force: Vec3): void;
  applyForce(force: Vec3, position: Vec3): void;
  applyTorque(x: number, y: number, z: number): void;
  applyTorque(torque: Vec3): void;
  destroy(): void;
  getAABB(): LuaMultiReturn<[minx: number, miny: number, minz: number, maxx: number, maxy: number, maxz: number]>;
  getAngularDamping(): LuaMultiReturn<[damping: number, theshold: number]>;
  getAngularVelocity(): LuaMultiReturn<[vx: number, vy: number, vz: number]>;
  getFriction(): number;
  getJoints(): LuaTable;
  getLinearDamping(): LuaMultiReturn<[damping: number, threshold: number]>;
  getLinearVelocity(): LuaMultiReturn<[vx: number, vy: number, vz: number]>;
  getLinearVelocityFromLocalPoint(x: number, y: number, z: number): LuaMultiReturn<[vx: number, vy: number, vz: number]>;
  getLinearVelocityFromLocalPoint(point: Vec3): LuaMultiReturn<[vx: number, vy: number, vz: number]>;
  getLinearVelocityFromWorldPoint(x: number, y: number, z: number): LuaMultiReturn<[vx: number, vy: number, vz: number]>;
  getLinearVelocityFromWorldPoint(point: Vec3): LuaMultiReturn<[vx: number, vy: number, vz: number]>;
  getLocalCenter(): LuaMultiReturn<[cx: number, cy: number, cz: number]>;
  getLocalPoint(wx: number, wy: number, wz: number): LuaMultiReturn<[x: number, y: number, z: number]>;
  getLocalPoint(point: Vec3): LuaMultiReturn<[x: number, y: number, z: number]>;
  getLocalVector(wx: number, wy: number, wz: number): LuaMultiReturn<[x: number, y: number, z: number]>;
  getLocalVector(point: Vec3): LuaMultiReturn<[x: number, y: number, z: number]>;
  getMass(): number;
  getMassData(): LuaMultiReturn<[cx: number, cy: number, cz: number, mass: number, inerta: LuaTable]>;
  getOrientation(): LuaMultiReturn<[angle: number, ax: number, ay: number, az: number]>;
  getPose(): LuaMultiReturn<[x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number]>;
  getPosition(): LuaMultiReturn<[x: number, y: number, z: number]>;
  getRestitution(): number;
  getShapes(): LuaTable;
  getTag(): string;
  getUserData(): LuaUserdata;
  getWorld(): World;
  getWorldPoint(x: number, y: number, z: number): LuaMultiReturn<[wx: number, wy: number, wz: number]>;
  getWorldPoint(point: Vec3): LuaMultiReturn<[wx: number, wy: number, wz: number]>;
  getWorldVector(x: number, y: number, z: number): LuaMultiReturn<[wx: number, wy: number, wz: number]>;
  getWorldVector(point: Vec3): LuaMultiReturn<[wx: number, wy: number, wz: number]>;
  isAwake(): boolean;
  isDestroyed(): boolean;
  isGravityIgnored(): boolean;
  isKinematic(): boolean;
  isSleepingAllowed(): boolean;
  removeShape(shape: Shape): void;
  setAngularDamping(damping: number, threshold: number): void;
  setAngularVelocity(vx: number, vy: number, vz: number): void;
  setAngularVelocity(velocity: Vec3): void;
  setAwake(awake: boolean): void;
  setFriction(friction: number): void;
  setGravityIgnored(ignored: boolean): void;
  setKinematic(kinematic: boolean): void;
  setLinearDamping(damping: number, theshold: number): void;
  setLinearVelocity(vx: number, vy: number, vz: number): void;
  setLinearVelocity(velocity: Vec3): void;
  setMass(mass: number): void;
  setMassData(cx: number, cy: number, cz: number, mass: number, interia: LuaTable): void;
  setOrientation(angle: number, ax: number, ay: number, az: number): void;
  setOrientation(orientation: Quat): void;
  setPose(x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number): void;
  setPose(position: Vec3, orientation: Quat): void;
  setPosition(x: number, y: number, z: number): void;
  setPosition(position: Vec3): void;
  setRestitution(restitution: number): void;
  setSleepingAllowed(allowed: boolean): void;
  setTag(tag: string): void;
  setTag(): void;
  setUserData(data: LuaUserdata): void;
}

declare interface Image {
  // todo
}

declare interface BoxShape {
  // todo
}

declare interface CapsuleShape {
  // todo
}

declare interface CylinderShape {
  // todo
}

declare interface MeshShape {
  // todo
}

declare interface SphereShape {
  // todo
}

declare interface TerrainShape {
  // todo
}

declare interface BallJoint {
  // todo
}

declare interface DistanceJoint {
  // todo
}

declare interface HingeJoint {
  // todo
}

declare interface SliderJoint {
  // todo
}

declare interface Permission {
  // todo
}

declare interface KeyCode {
  // todo
}

declare interface Channel {
  clear(): void;
  hasRead(id: number): boolean;
  peek(): LuaMultiReturn<[message: any, present: boolean]>;
  pop(wait: number | boolean): any;
  push(message: any, wait: number | boolean): LuaMultiReturn<[id: number, read: boolean]>;
}

declare interface Thread {
  // todo
}

declare interface WindowOpenOptions {
  width: number;
  height: number;
  fullscreen: boolean;
  resizable: boolean;
  title: string;
  icon: string;
}

declare interface World {
  getColliders(): LuaTable;
  getColliders(t: LuaTable): LuaTable;
  newBoxCollider(x: number, y: number, z: number, width: number, height: number, depth: number): Collider;
  newBoxCollider(position: Vec3, size: Vec3): Collider;
  newCapsuleCollider(x: number, y: number, z: number, radius: number, length: number): Collider;
  newCapsuleCollider(position: Vec3, radius: number, length: number): Collider;
  newCollider(x: number, y: number, z: number): Collider;
  newCollider(position: Vec3): Collider;
  newCylinderCollider(x: number, y: number, z: number, radius: number, length: number): Collider;
  newCylinderCollider(position: Vec3, radius: number, length: number): Collider;
  newMeshCollider(vertices: LuaTable, indices: LuaTable): Collider;
  newMeshCollider(model: Model): Collider;
  newSphereCollider(x: number, y: number, z: number, radius: number): Collider;
  newSphereCollider(position: Vec3, radius: number): Collider;
  newTerrainCollider(scale: number): Collider;
  newTerrainCollider(scale: number, heightmap: Image, stretch: number): Collider;
  newTerrainCollider(scale: number, callback: (x: number, z: number) => number, samples: number): Collider;
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

declare interface BufferFormatOptions {
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

declare interface Device {
  id: number;
  vendor: number;
  name: string;
  renderer: string;
  subgroupSize: number;
  discrete: boolean;
}

declare interface DeviceFeatures {
  textureBC: boolean;
  textureASTC: boolean;
  wireframe: boolean;
  depthClamp: boolean;
  depthResolve: boolean;
  indirectDrawFirstInstance: boolean;
  float64: boolean;
  int64: boolean;
  int16: boolean;
}

declare interface DeviceLimits {
  textureSize2D: number;
  textureSize3D: number;
  textureSizeCube: number;
  textureLayers: number;
  renderSize: LuaTable;
  uniformBuffersPerStage: number;
  storageBuffersPerStage: number;
  sampledTexturesPerStage: number;
  storageTexturesPerStage: number;
  samplersPerStage: number;
  resourcesPerShader: number;
  uniformBufferRange: number;
  storageBufferRange: number;
  uniformBufferAlign: number;
  storageBufferAlign: number;
  vertexAttributes: number;
  vertexBufferStride: number;
  vertexShaderOutputs: number;
  clipDistances: number;
  cullDistances: number;
  clipAndCullDistances: number;
  workgroupCount: LuaTable;
  workgroupSize: LuaTable;
  totalWorkgroupSize: number;
  computeSharedMemory: number;
  shaderConstantSize: number;
  indirectDrawCount: number;
  instances: number;
  anisotropy: number;
  pointSize: number;
}


declare interface DeviceModelOptions {
  animated: boolean;
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
    function newBuffer(format: BufferFormatOptions, length: number): Buffer;
    function newBuffer(format: BufferFormatOptions, data: LuaTable): Buffer;
    function newBuffer(format: BufferFormatOptions, blob: Blob): Buffer;
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
    function getBackgroundColor(): LuaMultiReturn<[r: number, g: number, b: number, a: number]>;
    function isTimingEnabled(): boolean;
    function setBackgroundColor(r: number, g: number, b: number, a: number): void;
    function setBackgroundColor(hex: number, a: number): void;
    function setBackgroundColor(table: LuaTable): void;
    function setTimingEnabled(): boolean;
    function present(): void;
    function submit(any: [...any]): boolean;
    function submit(t: LuaTable): boolean;
    function wait(): void;
    function getDevice(): Device;
    function getFeatures(): DeviceFeatures;
    function getLimits(): DeviceLimits;
    function isFormatSupported(format: TextureFormat, ...features: [TextureFeature]): LuaMultiReturn<[linear: boolean, srgb: boolean]>;
  }

  namespace headset {
    function getAngularVelocity(): LuaMultiReturn<[x: number, y: number, z: number]>;
    function getAxis(device: Device, axis: DeviceAxis): number;
    function getDirection(device: Device): LuaMultiReturn<[x: number, y: number, z: number]>;
    function getHands(): LuaTable;
    function getOrientation(device: Device): LuaMultiReturn<[angle: number, ax: number, ay: number, az: number]>;
    function getPose(device: Device): LuaMultiReturn<[x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number]>;
    function getPosition(device: Device): LuaMultiReturn<[x: number, y: number, z: number]>;
    function getSkeleton(device: Device): LuaTable;
    function getSkeleton(device: Device, t: LuaTable): LuaTable;
    function getVelocity(device: Device): LuaMultiReturn<[vx: number, vy: number, vz: number]>;
    function isDown(device: Device, button: DeviceButton): boolean;
    function isTouched(device: Device, button: DeviceButton): boolean;
    function isTracked(device: Device): boolean;
    function stopVibration(device: Device): void;
    function vibrate(device: Device, strength: number, duration: number, frequency: number): boolean;
    function wasPressed(device: Device, button: DeviceButton): boolean;
    function wasReleased(device: Device, button: DeviceButton): boolean;
    function animate(model: Model): boolean;
    function animate(device: Device, model: Model): boolean;
    function newModel(device: Device, options: DeviceModelOptions): Model;
    function getClipDistance(): LuaMultiReturn<[near: number, far: number]>;
    function getDisplayDimensions(): LuaMultiReturn<[width: number, height: number]>;
    function getDisplayHeight(): number;
    function getDisplayWidth(): number;
    function getPassthrough(): PassthroughMode;
    function getPassthroughModes(): LuaTable;
    function getRefreshRate(): number | null;
    function getRefreshRates(): Array<number> | null;
    function getViewAngles(view: number): LuaMultiReturn<[left: number, right: number, top: number, bottom: number]>;
    function getViewCount(): number;
    function getViewPose(view: number): LuaMultiReturn<[x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number]>;
    function setClipDistance(near: number, far: number): void;
    function setPassthrough(mode: PassthroughMode): boolean;
    function setPassthrough(transparent: boolean): boolean;
    function setPassthrough(): boolean;
    function setRefreshRate(rate: number): boolean;
    function getBoundsDepth(): number;
    function getBoundsDimensions(): LuaMultiReturn<[width: number, depth: number]>;
    function getBoundsGeometry(t: LuaTable): LuaTable;
    function getBoundsWidth(): number;
    function isSeated(): boolean;
    function getDeltaTime(): number;
    function getDriver(): LuaMultiReturn<[driver: HeadsetDriver, runtime: string]>;
    function getName(): string;
    function getPass(): Pass;
    function getTexture(): Texture;
    function getTime(): number;
    function isFocused(): boolean;
    function isVisible(): boolean;
    function submit(): void;
  }

  namespace math {
    function getRandomSeed(): number;
    function newRandomGenerator(): RandomGenerator;
    function newRandomGenerator(seed: number): RandomGenerator;
    function newRandomGenerator(low: number, high: number): RandomGenerator;
    function noise(x: number): number;
    function noise(x: number, y: number): number;
    function noise(x: number, y: number, z: number): number;
    function noise(x: number, y: number, z: number, w: number): number;
    function random(): number;
    function random(high: number): number;
    function random(low: number, high: number): number;
    function randomNormal(sigma: number, mu: number): number;
    function setRandomSeed(seed: number): void;
    function drain(): void;
    function mat4(): Mat4;
    function mat4(n: Mat4): Mat4;
    function mat4(position: Vec3, scale: Vec3, rotation: Quat): Mat4;
    function mat4(position: Vec3, rotation: Quat): Mat4;
    function mat4(x1: number, y1: number, z1: number, w1: number, x2: number, y2: number, z2: number, w2: number, x3: number, y3: number, z3: number, w3: number, x4: number, y4: number, z4: number, w4: number): Mat4;
    function mat4(d: number): Mat4;
    function newMat4(): Mat4;
    function newMat4(n: Mat4): Mat4;
    function newMat4(position: Vec3, scale: Vec3, rotation: Quat): Mat4;
    function newMat4(position: Vec3, rotation: Quat): Mat4;
    function newMat4(x1: number, y1: number, z1: number, w1: number, x2: number, y2: number, z2: number, w2: number, x3: number, y3: number, z3: number, w3: number, x4: number, y4: number, z4: number, w4: number): Mat4;
    function newMat4(d: number): Mat4;
    function newQuat(angle: number, ax: number, ay: number, az: number, raw: boolean): Quat;
    function newQuat(r: Quat): Quat;
    function newQuat(v: Vec3): Quat;
    function newQuat(v: Vec3, u: Vec3): Quat;
    function newQuat(m: Mat4): Quat;
    function newQuat(): Quat;
    function newVec2(x: number, y: number): Vec2;
    function newVec2(u: Vec2): Vec2;
    function newVec3(x: number, y: number, z: number): Vec3;
    function newVec3(u: Vec3): Vec3;
    function newVec3(m: Mat4): Vec3;
    function newVec3(q: Quat): Vec3;
    function newVec4(x: number, y: number, z: number, w: number): Vec4;
    function newVec4(u: Vec4): Vec4;
    function quat(angle: number, ax: number, ay: number, az: number, raw: boolean): Quat;
    function quat(r: Quat): Quat;
    function quat(v: Vec3): Quat;
    function quat(v: Vec3, u: Vec3): Quat;
    function quat(m: Mat4): Quat;
    function quat(): Quat;
    function vec2(x: number, y: number): Vec2;
    function vec2(u: Vec2): Vec2;
    function vec3(x: number, y: number, z: number): Vec3;
    function vec3(u: Vec3): Vec3;
    function vec3(m: Mat4): Vec3;
    function vec3(q: Quat): Vec3;
    function vec4(x: number, y: number, z: number, w: number): Vec4;
    function vec4(u: Vec4): Vec4;
    function gammaToLinear(gr: number, gg: number, gb: number): LuaMultiReturn<[lr: number, lg: number, lb: number]>;
    function gammaToLinear(color: LuaTable): LuaMultiReturn<[lr: number, lg: number, lb: number]>;
    function gammaToLinear(x: number): number;
    function linearToGamma(gr: number, gg: number, gb: number): LuaMultiReturn<[lr: number, lg: number, lb: number]>;
    function linearToGamma(color: LuaTable): LuaMultiReturn<[lr: number, lg: number, lb: number]>;
    function linearToGamma(x: number): number;
    function newCurve(...points: [number]): Curve;
    function newCurve(...points: [Vec3]): Curve;
    function newCurve(points: LuaTable): Curve;
    function newCurve(n: number): Curve;
  }

  namespace physics {
    function newWorld(xg: number, yg: number, zg: number, allowSleep: boolean, tags: LuaTable): World;
    function newBoxShape(width: number, height: number, depth: number): BoxShape;
    function newCapsuleShape(radius: number, length: number): CapsuleShape;
    function newCylinderShape(radius: number, length: number): CylinderShape;
    function newMeshShape(vertices: LuaTable, indices: LuaTable): MeshShape;
    function newMeshShape(model: Model): MeshShape;
    function newSphereShape(radius: number): SphereShape;
    function newTerrainShape(scale: number): TerrainShape;
    function newTerrainShape(scale: number, heightmap: Image, stretch: number): TerrainShape;
    function newTerrainShape(scale: number, callback: (x: number, z: number) => number, samples: number): TerrainShape;
    function newBallJoint(colliderA: Collider, colliderB: Collider, x: number, y: number, z: number): BallJoint;
    function newBallJoint(colliderA: Collider, colliderB: Collider, anchor: Vec3): BallJoint;
    function newDistanceJoint(colliderA: Collider, colliderB: Collider, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): DistanceJoint;
    function newDistanceJoint(colliderA: Collider, colliderB: Collider, first: Vec3, second: Vec3): DistanceJoint;
    function newHingeJoint(colliderA: Collider, colliderB: Collider, x: number, y: number, z: number, ax: number, ay: number, az: number): HingeJoint;
    function newHingeJoint(colliderA: Collider, colliderB: Collider, anchor: Vec3, axis: Vec3): HingeJoint;
    function newSliderJoint(colliderA: Collider, colliderB: Collider, ax: number, ay: number, az: number): SliderJoint;
    function newSliderJoint(colliderA: Collider, colliderB: Collider, axis: Vec3): SliderJoint;
  }

  namespace system {
    function getCoreCount(): number;
    function getOS(): string;
    function requestPermission(permission: Permission): void;
    function hasKeyRepeat(): boolean;
    function isKeyDown(...keys: [KeyCode]): boolean;
    function setKeyRepeat(enable: boolean): void;
    function wasKeyPressed(...keys: [KeyCode]): boolean;
    function wasKeyReleased(...keys: [KeyCode]): boolean;
    function getMousePosition(): LuaMultiReturn<[x: number, y: number]>;
    function getMouseX(): number;
    function getMouseY(): number;
    function isMouseDown(button: number): boolean;
    function getWindowDensity(): number;
    function getWindowDimensions(): LuaMultiReturn<[width: number, height: number]>;
    function getWindowHeight(): number;
    function getWindowWidth(): number;
    function isWindowOpen(): number;
    function openWindow(options: WindowOpenOptions): void;
    function pollEvents(): void;
  }

  namespace thread {
    function getChannel(name: string): Channel;
    function newThread(code: string): Thread;
    function newThread(filename: string): Thread;
    function newThread(blob: Blob): Thread;
  }

  namespace timer {
    function getAverageDelta(): number;
    function getDelta(): number;
    function getFPS(): number;
    function getTime(): number;
    function sleep(duration: number): void;
    function step(): number;
  }



}