
//* Version: 0.17.0.
//* If something is marked as deprecated I'm skipping it.
// todo: 1: anything that says LuaTable needs to be revisited.
// todo: 2: anything that says any needs to be revisited.

declare type TimeUnit = "seconds" | "frames";

declare type Effect = "absorption" | "attenuation" | "occlusion" | "reverb" | "spatialization" | "transmission";

declare interface Source {
  getDuration(unit: TimeUnit): number;
  getPitch(): number;
  getVolume(unit: VolumeUnit): void;
  isLooping(): boolean;
  isPlaying(): boolean;
  pause(): void;
  play(): boolean;
  seek(position: number, unit: TimeUnit): void;
  setLooping(loop: boolean): void;
  setPitch(pitch: number): void;
  setVolume(volume: number, unit: VolumeUnit): void;
  stop(): void;
  tell(unit: TimeUnit): number;
  getDirectivity(): LuaMultiReturn<[weight: number, power: number]>;
  getOrientation(): LuaMultiReturn<[angle: number, ax: number, ay: number, az: number]>;
  getPose(): LuaMultiReturn<[x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number]>;
  getPosition(): LuaMultiReturn<[x: number, y: number, z: number]>;
  getRadius(): number;
  isEffectEnabled(effect: Effect): boolean;
  isSpatial(): boolean;
  setDirectivity(weight: number, power: number): void;
  setEffectEnabled(effect: Effect, enabled: boolean): void;
  setOrientation(angle: number, ax: number, ay: number, az: number): void;
  setPose(x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number): void;
  setPose(position: Vec3, orientation: Quat): void;
  setPosition(x: number, y: number, z: number): void;
  setPosition(position: Vec3): void;
  setRadius(radius: number): void;
  clone(): Source;
  getSound(): Sound;
}

declare type ChannelLayout = "mono" | "stereo" | "ambisonic";

declare type SampleFormat = "f32" | "i16";

declare interface Sound {
  getBlob(): Blob;
  getCapacity(): number;
  getChannelCount(): number;
  getChannelLayout(): ChannelLayout;
  getDuration(): number;
  getFormat(): SampleFormat;
  getFrameCount(): number;
  getFrames(count: number | null, srcOffset: number): LuaMultiReturn<[t: LuaTable, count: number]>;
  getFrames(t: LuaTable, count: number | null, srcOffset: number, dstOffset: number): LuaMultiReturn<[t: LuaTable, count: number]>;
  getFrames(blob: Blob, count: number | null, srcOffset: number, dstOffset: number): LuaMultiReturn<[t: LuaTable, count: number]>;
  getFrames(sound: Sound, count: number | null, srcOffset: number, dstOffset: number): LuaMultiReturn<[t: LuaTable, count: number]>;
  getSampleCount(): number;
  getSampleRate(): number;
  isCompressed(): boolean;
  isStream(): boolean;
  setFrames(t: LuaTable, count: number | null, dstOffset: number, srcOffset: number): number;
  setFrames(blob: Blob, count: number | null, dstOffset: number, srcOffset: number): number;
  setFrames(sound: Sound, count: number | null, dstOffset: number, srcOffset: number): number;
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

declare type OriginType = "root" | "parent";

declare interface Model {
  animate(name: string, time: number, blend: number): void;
  animate(index: number, time: number, blend: number): void;
  clone(): Model;
  getAnimationCount(): number;
  getAnimationDuration(index: number): number;
  getAnimationDuration(name: string): number;
  getAnimationName(index: number): string;
  getBlendShapeCount(): number;
  getBlendShapeName(index: number): string;
  getBlendShapeWeight(index: number): number;
  getBlendShapeWeight(name: string): number;
  getBoundingBox(): LuaMultiReturn<[minx: number, miny: number, minz: number, maxx: number, maxy: number, maxz: number]>;
  getBoundingSphere(): LuaMultiReturn<[x: number, y: number, z: number, radius: number]>;
  getCenter(): LuaMultiReturn<[x: number, y: number, z: number]>;
  getData(): ModelData;
  getDepth(): number;
  getDimensions(): LuaMultiReturn<[width: number, height: number, depth: number]>;
  getHeight(): number;
  getIndexBuffer(): Buffer;
  getMaterial(name: string): Material;
  getMaterial(index: number): Material;
  getMaterialCount(): number;
  getMaterialName(index: number): string;
  getMetadata(): string;
  getNodeChildren(index: number): LuaTable;
  getNodeChildren(name: string): LuaTable;
  getNodeCount(): number;
  getNodeName(index: number): string;
  getNodeOrientation(index: number, origin: OriginType): LuaMultiReturn<[angle: number, ax: number, ay: number, az: number]>;
  getNodeOrientation(name: string, origin: OriginType): LuaMultiReturn<[angle: number, ax: number, ay: number, az: number]>;
  getNodeParent(index: number): number;
  getNodeParent(name: string): number;
  getNodePose(index: number, origin: OriginType): LuaMultiReturn<[x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number]>;
  getNodePose(name: string, origin: OriginType): LuaMultiReturn<[x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number]>;
  getNodePosition(index: number, space: OriginType): LuaMultiReturn<[x: number, y: number, z: number]>;
  getNodePosition(name: string, space: OriginType): LuaMultiReturn<[x: number, y: number, z: number]>;
  getNodeScale(index: number, origin: OriginType): LuaMultiReturn<[x: number, y: number, z: number]>;
  getNodeScale(name: string, origin: OriginType): LuaMultiReturn<[x: number, y: number, z: number]>;
  getNodeTransform(index: number, origin: OriginType): LuaMultiReturn<[x: number, y: number, z: number, sx: number, sy: number, sz: number, angle: number, ax: number, ay: number, az: number]>;
  getNodeTransform(name: string, origin: OriginType): LuaMultiReturn<[x: number, y: number, z: number, sx: number, sy: number, sz: number, angle: number, ax: number, ay: number, az: number]>;
  getRootNode(): number;
  getTexture(index: number): Texture;
  getTextureCount(): number;
  getTriangleCount(): number;
  getTriangles(): LuaMultiReturn<[vertices: Array<number>, indices: Array<number>]>;
  getVertexBuffer(): Buffer;
  getVertexCount(): number;
  getWidth(): number;
  hasJoints(): boolean;
  resetNodeTransforms(): void;
  setBlendShapeWeight(index: number, weight: number): void;
  setBlendShapeWeight(name: string, weight: number): void;
  setNodeOrientation(index: number, angle: number, ax: number, ay: number, az: number, blend: number): void;
  setNodeOrientation(name: string, angle: number, ax: number, ay: number, az: number, blend: number): void;
  setNodeOrientation(index: number, orientation: Quat, blend: number): void;
  setNodeOrientation(name: string, orientation: Quat, blend: number): void;
  setNodePose(index: number, x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number, blend: number): void;
  setNodePose(name: string, x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number, blend: number): void;
  setNodePose(index: number, position: Vec3, orientation: Quat, blend: number): void;
  setNodePose(name: string, position: Vec3, orientation: Quat, blend: number): void;
  setNodePosition(index: number, x: number, y: number, z: number, blen: number): void;
  setNodePosition(name: string, x: number, y: number, z: number, blen: number): void;
  setNodePosition(index: number, position: Vec3, blend: number): void;
  setNodePosition(name: string, position: Vec3, blend: number): void;
  setNodeScale(index: number, sx: number, sy: number, sz: number, blend: number): void;
  setNodeScale(name: string, sx: number, sy: number, sz: number, blend: number): void;
  setNodeScale(index: number, scale: Vec3, blend: number): void;
  setNodeScale(name: string, scale: Vec3, blend: number): void;
  setNodeTransform(index: number, x: number, y: number, z: number, sx: number, sy: number, sz: number, angle: number, ax: number, ay: number, az: number, blend: number): void;
  setNodeTransform(name: string, x: number, y: number, z: number, sx: number, sy: number, sz: number, angle: number, ax: number, ay: number, az: number, blend: number): void;
  setNodeTransform(index: number, position: Vec3, scale: Vec3, orientation: Quat, blend: number): void;
  setNodeTransform(name: string, position: Vec3, scale: Vec3, orientation: Quat, blend: number): void;
  setNodeTransform(index: number, transform: Mat4, blend: number): void;
  setNodeTransform(name: string, transform: Mat4, blend: number): void;
}

declare interface Object {
  release(): void;
  type(): string;
}

//* Swizzling has been implemented by hand.

declare const addVec2: LuaAddition<Vec2, Vec2 | number, Vec2> & ((x: number, y: number) => Vec2);
declare const subVec2: LuaSubtraction<Vec2, Vec2 | number, Vec2> & ((x: number, y: number) => Vec2);
declare const mulVec2: LuaMultiplication<Vec2, Vec2 | number, Vec2> & ((x: number, y: number) => Vec2);
declare const divVec2: LuaDivision<Vec2, Vec2 | number, Vec2> & ((x: number, y: number) => Vec2);
declare interface Vec2 extends Object {
  x: number;
  y: number;

  // r: number;
  // g: number;

  // s: number;
  // t: number;

  add: LuaAdditionMethod<Vec2 | number, Vec2> & ((x: number, y: number) => Vec2);
  sub: LuaSubtractionMethod<Vec2 | number, Vec2> & ((x: number, y: number) => Vec2);
  mul: LuaMultiplicationMethod<Vec2 | number, Vec2> & ((x: number, y: number) => Vec2);
  div: LuaDivisionMethod<Vec2 | number, Vec2> & ((x: number, y: number) => Vec2);

  angle(u: Vec2): number;
  angle(x: number, y: number): number;
  distance(u: Vec2): number;
  distance(x: number, y: number): number;
  dot(u: Vec2): number;
  dot(x: number, y: number): number;
  equals(u: Vec2): boolean;
  equals(x: number, y: number): boolean;
  length(): number;
  lerp(u: Vec2, t: number): Vec2;
  normalize(): Vec2;
  set(x: number, y?: number): Vec2;
  set(u: Vec2): Vec2;
  unpack(): LuaMultiReturn<[x: number, y: number]>;

  // Swizzling.
  xx: Vec2;
  xy: Vec2;
  yx: Vec2;
  yy: Vec2;
}

declare const addVec3: LuaAddition<Vec3, Vec3 | number, Vec3> & ((x: number, y: number, z?: number) => Vec3);
declare const subVec3: LuaSubtraction<Vec3, Vec3 | number, Vec3> & ((x: number, y: number, z?: number) => Vec3);
declare const mulVec3: LuaMultiplication<Vec3, Vec3 | number, Vec3> & ((x: number, y: number, z?: number) => Vec3);
declare const divVec3: LuaDivision<Vec3, Vec3 | number, Vec3> & ((x: number, y: number, z?: number) => Vec3);
declare interface Vec3 extends Object {

  x: number;
  y: number;
  z: number;

  // r: number;
  // g: number;
  // b: number

  // s: number;
  // t: number;
  // p: number

  add: LuaAdditionMethod<Vec3 | number, Vec3> & ((x: number, y: number, z?: number) => Vec3);
  sub: LuaSubtractionMethod<Vec3 | number, Vec3> & ((x: number, y: number, z?: number) => Vec3);
  mul: LuaMultiplicationMethod<Vec3 | number, Vec3> & ((x: number, y: number, z?: number) => Vec3);
  div: LuaDivisionMethod<Vec3 | number, Vec3> & ((x: number, y: number, z?: number) => Vec3);

  angle(u: Vec3): number;
  angle(x: number, y: number, z: number): number;
  cross(u: Vec3): Vec3;
  cross(x: number, y: number, z: number): Vec3;
  distance(u: Vec3): number;
  distance(x: number, y: number, z: number): number;
  dot(u: Vec3): number;
  dot(x: number, y: number, z: number): number;
  equals(u: Vec3): boolean;
  equals(x: number, y: number, z: number): boolean;
  length(): number;
  lerp(u: Vec3, t: number): Vec3;
  lerp(x: number, y: number, z: number, t: number): Vec3;
  normalize(): Vec3;
  rotate(q: Quat): Vec3;
  rotate(angle: number, ax: number, ay: number, az: number): Vec3;
  set(x: number, y: number, z: number): Vec3;
  set(u: Vec3): Vec3;
  set(q: Quat): Vec3;
  set(m: Mat4): Vec3;
  transform(m: Mat4): Vec3;
  transform(x: number, y: number, z: number, scale: number, angle: number, ax: number, ay: number, az: number): Vec3;
  transform(translation: Vec3, scale: number, rotation: Quat): Vec3;
  unpack(): LuaMultiReturn<[x: number, y: number, z: number]>;

  // Swizzling.
  xx: Vec2;
  xy: Vec2;
  xz: Vec2;
  yx: Vec2;
  yy: Vec2;
  yz: Vec2;
  zx: Vec2;
  zy: Vec2;
  zz: Vec2;
  xxx: Vec3;
  xxy: Vec3;
  xxz: Vec3;
  xyx: Vec3;
  xyy: Vec3;
  xyz: Vec3;
  xzx: Vec3;
  xzy: Vec3;
  xzz: Vec3;
  yxx: Vec3;
  yxy: Vec3;
  yxz: Vec3;
  yyx: Vec3;
  yyy: Vec3;
  yyz: Vec3;
  yzx: Vec3;
  yzy: Vec3;
  yzz: Vec3;
  zxx: Vec3;
  zxy: Vec3;
  zxz: Vec3;
  zyx: Vec3;
  zyy: Vec3;
  zyz: Vec3;
  zzx: Vec3;
  zzy: Vec3;
  zzz: Vec3;
}

declare const addVec4: LuaAddition<Vec4, Vec4 | number, Vec4> & ((x: number, y: number, z?: number, w?: number) => Vec4);
declare const subVec4: LuaSubtraction<Vec4, Vec4 | number, Vec4> & ((x: number, y: number, z?: number, w?: number) => Vec4);
declare const mulVec4: LuaMultiplication<Vec4, Vec4 | number, Vec4> & ((x: number, y: number, z?: number, w?: number) => Vec4);
declare const divVec4: LuaDivision<Vec4, Vec4 | number, Vec4> & ((x: number, y: number, z?: number, w?: number) => Vec4);
declare interface Vec4 extends Object {

  x: number;
  y: number;
  z: number;
  w: number;

  // r: number;
  // g: number;
  // b: number
  // a: number

  // s: number;
  // t: number;
  // p: number
  // q: number;

  add: LuaAdditionMethod<Vec4 | number, Vec4> & ((x: number, y: number, z?: number, w?: number) => Vec4);
  sub: LuaSubtractionMethod<Vec4 | number, Vec4> & ((x: number, y: number, z?: number, w?: number) => Vec4);
  mul: LuaMultiplicationMethod<Vec4 | number, Vec4> & ((x: number, y: number, z?: number, w?: number) => Vec4);
  div: LuaDivisionMethod<Vec4 | number, Vec4> & ((x: number, y: number, z?: number, w?: number) => Vec4);

  angle(u: Vec4): number;
  angle(x: number, y: number, z: number, w: number): number;
  distance(u: Vec4): number;
  distance(x: number, y: number, z: number, w: number): number;
  dot(u: Vec4): number;
  dot(x: number, y: number, z: number, w: number): number;
  equals(u: Vec4): boolean;
  equals(x: number, y: number, z: number, w: number): boolean;
  length(): number;
  lerp(u: Vec4, t: number): Vec4;
  lerp(x: number, y: number, z: number, w: number, t: number): Vec4;
  normalize(): Vec4;
  set(x: number, y?: number, z?: number, w?: number): Vec4;
  set(u: Vec4): Vec4;
  transform(m: Mat4): Vec4;
  transform(x: number, y: number, z: number, scale: number, angle: number, ax: number, ay: number, az: number): Vec4;
  transform(translation: Vec3, scale: number, rotation: Quat): Vec4;
  unpack(): LuaMultiReturn<[x: number, y: number, z: number, w: number]>;

  // Swizzling.
  xx: Vec2;
  xy: Vec2;
  xz: Vec2;
  xw: Vec2;
  yx: Vec2;
  yy: Vec2;
  yz: Vec2;
  yw: Vec2;
  zx: Vec2;
  zy: Vec2;
  zz: Vec2;
  zw: Vec2;
  wx: Vec2;
  wy: Vec2;
  wz: Vec2;
  ww: Vec2;
  xxx: Vec3;
  xxy: Vec3;
  xxz: Vec3;
  xxw: Vec3;
  xyx: Vec3;
  xyy: Vec3;
  xyz: Vec3;
  xyw: Vec3;
  xzx: Vec3;
  xzy: Vec3;
  xzz: Vec3;
  xzw: Vec3;
  xwx: Vec3;
  xwy: Vec3;
  xwz: Vec3;
  xww: Vec3;
  yxx: Vec3;
  yxy: Vec3;
  yxz: Vec3;
  yxw: Vec3;
  yyx: Vec3;
  yyy: Vec3;
  yyz: Vec3;
  yyw: Vec3;
  yzx: Vec3;
  yzy: Vec3;
  yzz: Vec3;
  yzw: Vec3;
  ywx: Vec3;
  ywy: Vec3;
  ywz: Vec3;
  yww: Vec3;
  zxx: Vec3;
  zxy: Vec3;
  zxz: Vec3;
  zxw: Vec3;
  zyx: Vec3;
  zyy: Vec3;
  zyz: Vec3;
  zyw: Vec3;
  zzx: Vec3;
  zzy: Vec3;
  zzz: Vec3;
  zzw: Vec3;
  zwx: Vec3;
  zwy: Vec3;
  zwz: Vec3;
  zww: Vec3;
  wxx: Vec3;
  wxy: Vec3;
  wxz: Vec3;
  wxw: Vec3;
  wyx: Vec3;
  wyy: Vec3;
  wyz: Vec3;
  wyw: Vec3;
  wzx: Vec3;
  wzy: Vec3;
  wzz: Vec3;
  wzw: Vec3;
  wwx: Vec3;
  wwy: Vec3;
  wwz: Vec3;
  www: Vec3;
  xxxx: Vec4;
  xxxy: Vec4;
  xxxz: Vec4;
  xxxw: Vec4;
  xxyx: Vec4;
  xxyy: Vec4;
  xxyz: Vec4;
  xxyw: Vec4;
  xxzx: Vec4;
  xxzy: Vec4;
  xxzz: Vec4;
  xxzw: Vec4;
  xxwx: Vec4;
  xxwy: Vec4;
  xxwz: Vec4;
  xxww: Vec4;
  xyxx: Vec4;
  xyxy: Vec4;
  xyxz: Vec4;
  xyxw: Vec4;
  xyyx: Vec4;
  xyyy: Vec4;
  xyyz: Vec4;
  xyyw: Vec4;
  xyzx: Vec4;
  xyzy: Vec4;
  xyzz: Vec4;
  xyzw: Vec4;
  xywx: Vec4;
  xywy: Vec4;
  xywz: Vec4;
  xyww: Vec4;
  xzxx: Vec4;
  xzxy: Vec4;
  xzxz: Vec4;
  xzxw: Vec4;
  xzyx: Vec4;
  xzyy: Vec4;
  xzyz: Vec4;
  xzyw: Vec4;
  xzzx: Vec4;
  xzzy: Vec4;
  xzzz: Vec4;
  xzzw: Vec4;
  xzwx: Vec4;
  xzwy: Vec4;
  xzwz: Vec4;
  xzww: Vec4;
  xwxx: Vec4;
  xwxy: Vec4;
  xwxz: Vec4;
  xwxw: Vec4;
  xwyx: Vec4;
  xwyy: Vec4;
  xwyz: Vec4;
  xwyw: Vec4;
  xwzx: Vec4;
  xwzy: Vec4;
  xwzz: Vec4;
  xwzw: Vec4;
  xwwx: Vec4;
  xwwy: Vec4;
  xwwz: Vec4;
  xwww: Vec4;
  yxxx: Vec4;
  yxxy: Vec4;
  yxxz: Vec4;
  yxxw: Vec4;
  yxyx: Vec4;
  yxyy: Vec4;
  yxyz: Vec4;
  yxyw: Vec4;
  yxzx: Vec4;
  yxzy: Vec4;
  yxzz: Vec4;
  yxzw: Vec4;
  yxwx: Vec4;
  yxwy: Vec4;
  yxwz: Vec4;
  yxww: Vec4;
  yyxx: Vec4;
  yyxy: Vec4;
  yyxz: Vec4;
  yyxw: Vec4;
  yyyx: Vec4;
  yyyy: Vec4;
  yyyz: Vec4;
  yyyw: Vec4;
  yyzx: Vec4;
  yyzy: Vec4;
  yyzz: Vec4;
  yyzw: Vec4;
  yywx: Vec4;
  yywy: Vec4;
  yywz: Vec4;
  yyww: Vec4;
  yzxx: Vec4;
  yzxy: Vec4;
  yzxz: Vec4;
  yzxw: Vec4;
  yzyx: Vec4;
  yzyy: Vec4;
  yzyz: Vec4;
  yzyw: Vec4;
  yzzx: Vec4;
  yzzy: Vec4;
  yzzz: Vec4;
  yzzw: Vec4;
  yzwx: Vec4;
  yzwy: Vec4;
  yzwz: Vec4;
  yzww: Vec4;
  ywxx: Vec4;
  ywxy: Vec4;
  ywxz: Vec4;
  ywxw: Vec4;
  ywyx: Vec4;
  ywyy: Vec4;
  ywyz: Vec4;
  ywyw: Vec4;
  ywzx: Vec4;
  ywzy: Vec4;
  ywzz: Vec4;
  ywzw: Vec4;
  ywwx: Vec4;
  ywwy: Vec4;
  ywwz: Vec4;
  ywww: Vec4;
  zxxx: Vec4;
  zxxy: Vec4;
  zxxz: Vec4;
  zxxw: Vec4;
  zxyx: Vec4;
  zxyy: Vec4;
  zxyz: Vec4;
  zxyw: Vec4;
  zxzx: Vec4;
  zxzy: Vec4;
  zxzz: Vec4;
  zxzw: Vec4;
  zxwx: Vec4;
  zxwy: Vec4;
  zxwz: Vec4;
  zxww: Vec4;
  zyxx: Vec4;
  zyxy: Vec4;
  zyxz: Vec4;
  zyxw: Vec4;
  zyyx: Vec4;
  zyyy: Vec4;
  zyyz: Vec4;
  zyyw: Vec4;
  zyzx: Vec4;
  zyzy: Vec4;
  zyzz: Vec4;
  zyzw: Vec4;
  zywx: Vec4;
  zywy: Vec4;
  zywz: Vec4;
  zyww: Vec4;
  zzxx: Vec4;
  zzxy: Vec4;
  zzxz: Vec4;
  zzxw: Vec4;
  zzyx: Vec4;
  zzyy: Vec4;
  zzyz: Vec4;
  zzyw: Vec4;
  zzzx: Vec4;
  zzzy: Vec4;
  zzzz: Vec4;
  zzzw: Vec4;
  zzwx: Vec4;
  zzwy: Vec4;
  zzwz: Vec4;
  zzww: Vec4;
  zwxx: Vec4;
  zwxy: Vec4;
  zwxz: Vec4;
  zwxw: Vec4;
  zwyx: Vec4;
  zwyy: Vec4;
  zwyz: Vec4;
  zwyw: Vec4;
  zwzx: Vec4;
  zwzy: Vec4;
  zwzz: Vec4;
  zwzw: Vec4;
  zwwx: Vec4;
  zwwy: Vec4;
  zwwz: Vec4;
  zwww: Vec4;
  wxxx: Vec4;
  wxxy: Vec4;
  wxxz: Vec4;
  wxxw: Vec4;
  wxyx: Vec4;
  wxyy: Vec4;
  wxyz: Vec4;
  wxyw: Vec4;
  wxzx: Vec4;
  wxzy: Vec4;
  wxzz: Vec4;
  wxzw: Vec4;
  wxwx: Vec4;
  wxwy: Vec4;
  wxwz: Vec4;
  wxww: Vec4;
  wyxx: Vec4;
  wyxy: Vec4;
  wyxz: Vec4;
  wyxw: Vec4;
  wyyx: Vec4;
  wyyy: Vec4;
  wyyz: Vec4;
  wyyw: Vec4;
  wyzx: Vec4;
  wyzy: Vec4;
  wyzz: Vec4;
  wyzw: Vec4;
  wywx: Vec4;
  wywy: Vec4;
  wywz: Vec4;
  wyww: Vec4;
  wzxx: Vec4;
  wzxy: Vec4;
  wzxz: Vec4;
  wzxw: Vec4;
  wzyx: Vec4;
  wzyy: Vec4;
  wzyz: Vec4;
  wzyw: Vec4;
  wzzx: Vec4;
  wzzy: Vec4;
  wzzz: Vec4;
  wzzw: Vec4;
  wzwx: Vec4;
  wzwy: Vec4;
  wzwz: Vec4;
  wzww: Vec4;
  wwxx: Vec4;
  wwxy: Vec4;
  wwxz: Vec4;
  wwxw: Vec4;
  wwyx: Vec4;
  wwyy: Vec4;
  wwyz: Vec4;
  wwyw: Vec4;
  wwzx: Vec4;
  wwzy: Vec4;
  wwzz: Vec4;
  wwzw: Vec4;
  wwwx: Vec4;
  wwwy: Vec4;
  wwwz: Vec4;
  wwww: Vec4;
}

declare const addQuat: LuaAddition<Quat, Quat | number, Quat>;
declare const subQuat: LuaSubtraction<Quat, Quat | number, Quat>;
declare const mulQuat: LuaMultiplication<Quat, Quat | number, Quat>;
declare const divQuat: LuaDivision<Quat, Quat | number, Quat>;
declare interface Quat extends Object {

  x: number;
  y: number;
  z: number;
  w: number;

  1: number;
  2: number;
  3: number;
  4: number;

  add: LuaAdditionMethod<Quat | number, Quat>;
  sub: LuaSubtractionMethod<Quat | number, Quat>;
  mul: LuaMultiplicationMethod<Quat | number, Quat>;
  div: LuaDivisionMethod<Quat | number, Quat>;

  conjugate(): Quat;
  direction(): Vec3;
  equals(r: Quat): boolean;
  length(): number;
  normalize(): Quat;
  set(angle: number, ax: number, ay: number, az: number, raw: boolean): Quat;
  set(r: Quat): Quat;
  set(v: Vec3): Quat;
  set(v: Vec3, u: Vec3): Quat;
  set(m: Mat4): Quat;
  set(): Quat;
  slerp(r: Quat, t: number): Quat;
  unpack(raw: boolean): LuaMultiReturn<[a: number, b: number, c: number, d: number]>;
}

declare const addMat4: LuaAddition<Mat4, Mat4 | number, Mat4>;
declare const subMat4: LuaSubtraction<Mat4, Mat4 | number, Mat4>;
declare const mulMat4: LuaMultiplication<Mat4, Mat4 | number, Mat4>;
declare const divMat4: LuaDivision<Mat4, Mat4 | number, Mat4>;
declare interface Mat4 extends Object {

  // note: this is a flat array.  
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
  11: number;
  12: number;
  13: number;
  14: number;
  15: number;
  16: number;

  add: LuaAdditionMethod<Mat4 | Vec3 | Vec4, Mat4>;
  sub: LuaSubtractionMethod<Mat4 | Vec3 | Vec4, Mat4>;
  mul: LuaMultiplicationMethod<Mat4 | Vec3 | Vec4, Mat4>;
  div: LuaDivisionMethod<Mat4 | Vec3 | Vec4, Mat4>;

  equals(n: Mat4): boolean;
  fov(left: number, right: number, up: number, down: number, near: number, far: number): Mat4;
  getOrientation(): LuaMultiReturn<[angle: number, ax: number, ay: number, az: number]>;
  getPose(): LuaMultiReturn<[x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number]>;
  getPosition(): LuaMultiReturn<[x: number, y: number, z: number]>;
  getScale(): LuaMultiReturn<[sx: number, sy: number, sz: number]>;
  identity(): Mat4;
  invert(): Mat4;
  lookAt(from: Vec3, to: Vec3, up: Vec3): Mat4;
  orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4;
  orthographic(width: number, height: number, near: number, far: number): Mat4;
  perspective(fov: number, aspect: number, near: number, far: number): Mat4;
  reflect(position: Vec3, normal: Vec3): Mat4;
  rotate(q: Quat): Mat4;
  rotate(angle: number, ax: number, ay: number, az: number): Mat4;
  scale(scale: Vec3): Mat4;
  scale(sx: number, sy?: number, sz?: number): Mat4;
  set(): Mat4;
  set(n: Mat4): Mat4;
  set(x: number, y: number, z: number, sx: number, sy: number, sz: number, angle: number, ax: number, ay: number, az: number): Mat4;
  set(x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number): Mat4;
  set(position: Vec3, scale: Vec3, rotation: Quat): Mat4;
  set(position: Vec3, rotation: Quat): Mat4;
  set(...values: [number]): Mat4;
  set(d: number): Mat4;
  target(from: Vec3, to: Vec3, up: Vec3): Mat4;
  translate(v: Vec3): Mat4;
  translate(x: number, y: number, z: number): Mat4;
  transpose(): Mat4;
  unpack(raw: boolean): LuaMultiReturn<[
    x1: number, y1: number, z1: number, w1: number,
    x2: number, y2: number, z2: number, w2: number,
    x3: number, y3: number, z3: number, w3: number,
    x4: number, y4: number, z4: number, w4: number,
  ]> | LuaMultiReturn<[
    x: number, y: number, z: number,
    sx: number, sy: number, sz: number,
    rx: number, ry: number, rz: number, rw: number
  ]>;
}

declare type ShaderStage = "vertex" | "fragment" | "compute";

declare type HorizontalAlign = "left" | "center" | "right";

declare type VerticalAlign = "top" | "middle" | "bottom";

declare interface Font extends Object {
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

declare type DrawStyle = "fill" | "line";

declare type StackType = "transform" | "state";

declare type BlendMode = "alpha" | "add" | "subtract" | "multiply" | "lighten" | "darken" | "screen";

declare type BlendAlphaMode = "alphamultiply" | "premultiplied";

declare type CullMode = "none" | "back" | "front";

declare type StencilAction = "keep" | "zero" | "replace" | "increment" | "decrement" | "incrementwrap" | "decrementwrap" | "invert";

declare type Winding = "clockwise" | "counterclockwise";

declare interface CanvasData {
  depth: Texture | TextureFormat;
  samples: number;
}

declare interface PassStats {
  draws: number;
  computes: number;
  drawsCulled: number;
  cpuMemoryReserved: number;
  cpuMemoryUsed: number;
  submitTime: number;
  gpuTime: number;
}

declare interface Pass extends Object {
  box(x: number, y: number, z: number, width: number, height: number, depth: number, angle: number, ax: number, ay: number, az: number, style: DrawStyle): void;
  box(position: Vec3, size: Vec3, orientation: Quat, style: DrawStyle): void;
  box(transform: Mat4, style: DrawStyle): void;
  capsule(x: number, y: number, z: number, radius: number, length: number, angle: number, ax: number, ay: number, az: number, segments: number): void;
  capsule(position: Vec3, radius: number, length: number, orientation: Quat, segments: number): void;
  capsule(transform: Mat4, segments: number): void;
  capsule(p1: Vec3, p2: Vec3, radius: number, segments: number): void;
  circle(x: number, y: number, z: number, radius: number, angle: number, ax: number, ay: number, az: number, style: DrawStyle, angle1: number, angle2: number, segments: number): void;
  circle(position: Vec3, radius: number, orientation: Quat, style: DrawStyle, angle1: number, angle2: number, segments: number): void;
  circle(transform: Mat4, style: DrawStyle, angle1: number, angle2: number, segments: number): void;
  cone(x: number, y: number, z: number, radius: number, length: number, angle: number, ax: number, ay: number, az: number, segments: number): void;
  cone(position: Vec3, radius: number, length: number, orientation: Quat, segments: number): void;
  cone(transform: Mat4, segments: number): void;
  cone(p1: Vec3, p2: Vec3, radius: number, segments: number): void;
  cube(x: number, y: number, z: number, size: number, angle: number, ax: number, ay: number, az: number, style: DrawStyle): void;
  cube(position: Vec3, size: number, orientation: Quat, style: DrawStyle): void;
  cube(transform: Mat4, style: DrawStyle): void;
  cylinder(x: number, y: number, z: number, radius: number, length: number, angle: number, ax: number, ay: number, az: number, capped: boolean, angle1: number, angle2: number, segments: number): void;
  cylinder(position: Vec3, radius: number, length: number, orientation: Quat, capped: boolean, angle1: number, angle2: number, segments: number): void;
  cylinder(transform: Mat4, capped: boolean, angle1: number, angle2: number, segments: number): void;
  cylinder(p1: Vec3, p2: Vec3, radius: number, capped: boolean, angle1: number, angle2: number, segments: number): void;
  draw(object: Model | Mesh | Texture, x: number, y: number, z: number, scale: number, angle: number, ax: number, ay: number, az: number, instances: number): void;
  draw(object: Model | Mesh | Texture, position: Vec3, scale: number, orientation: Quat, instance: number): void;
  draw(object: Model | Mesh | Texture, transform: Mat4, instances: number): void;
  fill(texture: Texture): void;
  fill(): void;
  line(...points: [number]): void;
  line(t: LuaTable): void;
  line(...points: [Vec3]): void;
  mesh(vertices: Buffer, x: number, y: number, z: number, scale: number, angle: number, ax: number, ay: number, az: number, start: number, count: number, instances: number): void;
  mesh(vertices: Buffer, position: Vec3, scales: Vec3, orientation: Quat, start: number, count: number, instances: number): void;
  mesh(vertices: Buffer, transform: Mat4, start: number, count: number, instances: number): void;
  mesh(vertices: Buffer, indices: Buffer, x: number, y: number, z: number, scale: number, angle: number, ax: number, ay: number, az: number, start: number, count: number, instances: number, base: number): void;
  mesh(vertices: Buffer, indices: Buffer, positions: Vec3, scales: Vec3, orientation: Quat, start: number, count: number, instances: number, base: number): void;
  mesh(vertices: Buffer, indices: Buffer, transform: Mat4, start: number, count: number, instances: number, base: number): void;
  mesh(vertices: Buffer, indices: Buffer, draws: Buffer, drawcount: number, offset: number, strider: number): void;
  plane(x: number, y: number, z: number, width: number, height: number, angle: number, ax: number, ay: number, az: number, style: DrawStyle, columns: number, rows: number): void;
  plane(position: Vec3, size: Vec2, orientation: Quat, style: DrawStyle, columns: number, rows: number): void;
  plane(transform: Mat4, style: DrawStyle, columns: number, rows: number): void;
  points(...points: [number]): void;
  points(points: LuaTable): void;
  points(...points: [Vec3]): void;
  roundrect(x: number, y: number, z: number, width: number, height: number, thickness: number, angle: number, ax: number, ay: number, az: number, radius: number, segments: number): void;
  roundrect(position: Vec3, size: Vec3, orientation: Quat, radius: number, segments: number): void;
  roundrect(transform: Mat4, radius: number, segments: number): void;
  skybox(skybox: Texture): void;
  skybox(): void;
  sphere(x: number, y: number, z: number, radius: number, angle: number, ax: number, ay: number, az: number, longitudes: number, latitudes: number): void;
  sphere(position: Vec3, radius: number, orientation: Quat, longitudes: number, latitudes: number): void;
  sphere(transform: Mat4, longitudes: number, latitudes: number): void;
  text(text: string, x: number, y: number, z: number, scale?: number, angle?: number, ax?: number, ay?: number, az?: number, wrap?: number, halign?: HorizontalAlign, valign?: VerticalAlign): void;
  text(text: string, position: Vec3, scale: number, orientation?: Quat, wrap?: number, halign?: HorizontalAlign, valign?: VerticalAlign): void;
  text(text: string, transform: Mat4, wrap?: number, halign?: HorizontalAlign, valign?: VerticalAlign): void;
  text(colortext: LuaTable, x: number, y: number, z: number, scale: number, angle: number, ax: number, ay: number, az: number, wrap: number, halign: HorizontalAlign, valign: VerticalAlign): void;
  text(colortext: LuaTable, position: Vec3, scale: number, orientation: Quat, wrap: number, halign: HorizontalAlign, valign: VerticalAlign): void;
  text(colortext: LuaTable, transform: Mat4, wrap: number, halign: HorizontalAlign, valign: VerticalAlign): void;
  torus(x: number, y: number, z: number, radius: number, thickness: number, angle: number, ax: number, ay: number, az: number, tsegments: number, psegments: number): void;
  torus(position: Vec3, scale: Vec3, orientation: Quat, tsegments: number, psegments: number): void;
  torus(transform: Mat4, tsegments: number, psegments: number): void;
  origin(): void;
  pop(stack: StackType): void;
  push(stack: StackType): void;
  rotate(angle: number, ax: number, ay: number, az: number): void;
  rotate(rotation: Quat): void;
  scale(sx: number, sy: number, sz: number): void;
  scale(scale: Vec3): void;
  transform(x: number, y: number, z: number, sx: number, sy: number, sz: number, angle: number, ax: number, ay: number, az: number): void;
  transform(translation: Vec3, scale: Vec3, rotation: Quat): void;
  transform(transform: Mat4): void;
  translate(x: number, y: number, z: number): void;
  translate(translation: Vec3): void;
  setAlphaToCoverage(enable: boolean): void;
  setBlendMode(blend: BlendMode, alphaBlend: BlendAlphaMode): void;
  setBlendMode(): void;
  setBlendMode(index: number, blend: BlendMode, alphaBlend: BlendAlphaMode): void;
  setBlendMode(index: number): void;
  setColor(r: number, g: number, b: number, a: number): void;
  setColor(t: LuaTable): void;
  setColor(hex: number, a: number): void;
  setColorWrite(enable: boolean): void;
  setColorWrite(r: boolean, g: boolean, b: boolean, a: boolean): void;
  setColorWrite(index: number, enable: boolean): void;
  setColorWrite(index: number, r: boolean, g: boolean, b: boolean, a: boolean): void;
  setCullMode(mode: CullMode): void;
  setCullMode(): void;
  setDepthClamp(enable: boolean): void;
  setDepthOffset(offset: number, sloped: number): void;
  setDepthTest(test: CompareMode): void;
  setDepthTest(): void;
  setDepthWrite(write: boolean): void;
  setFont(font: Font): void;
  setMaterial(material: Material): void;
  setMaterial(texture: Texture): void;
  setMaterial(): void;
  setMeshMode(mode: DrawMode): void;
  setSampler(filter: FilterMode): void;
  setSampler(sampler: Sampler): void;
  setStencilTest(test: CompareMode, value: number, mask: number): void;
  setStencilTest(): void;
  setStencilWrite(action: StencilAction, value: number, mask: number): void;
  setStencilWrite(actions: Array<StencilAction>, value: number, mask: number): void;
  setStencilWrite(): void;
  setViewCull(enable: boolean): void;
  setWinding(winding: Winding): void;
  setWireframe(enabled: boolean): void;
  send(name: string, buffer: Buffer, offset: number, extent: number): void;
  send(name: string, texture: Texture): void;
  send(name: string, sampler: Sampler): void;
  // I literally have no idea lol.
  send(name: string, constant: any): void;
  send(binding: number, buffer: Buffer, offset: number, extent: number): void;
  send(binding: number, texture: Texture): void;
  send(binding: number, sampler: Sampler): void;
  setShader(shader: Shader): void;
  setShader(defaul: DefaultShader): void;
  setShader(): void;
  barrier(): void;
  compute(x: number, y: number, z: number): void;
  compute(buffer: Buffer, offset: number): void;
  beginTally(): number;
  finishTally(): number;
  getTallyBuffer(): LuaMultiReturn<[buffer: Buffer, offset: number]>;
  setTallyBuffer(buffer: Buffer, offset: number): void;
  getProjection(view: number): LuaMultiReturn<[left: number, right: number, up: number, down: number]>;
  getScissor(): LuaMultiReturn<[x: number, y: number, w: number, h: number]>;
  getViewCount(): number;
  getViewPose(view: number): LuaMultiReturn<[x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number]>;
  getViewPose(view: number, matrix: Mat4, invert: boolean): Mat4;
  getViewport(): LuaMultiReturn<[x: number, y: number, w: number, h: number, dmin: number, dmax: number]>;
  setProjection(view: number, left: number, right: number, up: number, down: number, near: number, far: number): void;
  setProjection(view: number, matrix: Mat4): void;
  setScissor(x: number, y: number, w: number, h: number): void;
  setScissor(): void;
  setViewPose(view: number, x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number): void;
  setViewPose(view: number, position: Vec3, orientation: Quat): void;
  setViewPose(view: number, matrix: Mat4, inverted: boolean): void;
  setViewport(x: number, y: number, w: number, h: number, dmin: number, dmax: number): void;
  setViewport(): void;
  getCanvas(): CanvasData | null;
  getClear(): LuaTable;
  getDimensions(): LuaMultiReturn<[width: number, height: number]>;
  getHeight(): number;
  getWidth(): number;
  setCanvas(...textures: [Texture]): void;
  setCanvas(canvas: CanvasData): void;
  setCanvas(): void;
  setClear(hex: number): void;
  setClear(r: number, g: number, b: number, a: number): void;
  setClear(clear: boolean): void;
  setClear(t: LuaTable): void;
  getStats(): PassStats;
  reset(): void;
}

declare interface Readback extends Object {
  getBlob(): Blob;
  getData(): LuaTable;
  getImage(): Image;
  isComplete(): boolean;
  wait(): boolean;
}

declare interface BufferFormatElement {
  name: string;
  type: DataType;
  offset: number;
  length: number;
  stride: number;
}

declare interface Buffer extends Object {
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

declare interface Rasterizer extends Object {
  getAdvance(character: string): number;
  getAdvance(codepoint: number): number;
  getAscent(): number;
  getBearing(character: string): number;
  getBearing(codepoint: number): number;
  getBoundingBox(character: string): LuaMultiReturn<[x1: number, y1: number, x2: number, y2: number]>;
  getBoundingBox(codepoint: number): LuaMultiReturn<[x1: number, y1: number, x2: number, y2: number]>;
  getBoundingBox(): LuaMultiReturn<[x1: number, y1: number, x2: number, y2: number]>;
  getCurves(character: string, three: boolean): LuaTable;
  getCurves(codepoint: number, three: boolean): LuaTable;
  getDescent(): number;
  getDimensions(character: string): LuaMultiReturn<[width: number, height: number]>;
  getDimensions(codepoint: number): LuaMultiReturn<[width: number, height: number]>;
  getDimensions(): LuaMultiReturn<[width: number, height: number]>;
  getFontSize(): number;
  getGlyphCount(): number;
  getHeight(character: string): number;
  getHeight(codepoint: number): number;
  getHeight(): number;
  getKerning(first: string, second: string): number;
  getKerning(firstCodepoint: number, second: string): number;
  getKerning(first: string, secondCodepoint: number): number;
  getKerning(firstCodepoint: number, secondCodepoint: number): number;
  getLeading(): number;
  getWidth(character: string): number;
  getWidth(codepoint: number): number;
  getWidth(): number;
  hasGlyphs(...glyphs: [string | number]): boolean;
  newImage(character: string, spread: number, padding: number): Image;
  newImage(codepoint: number, spread: number, padding: number): Image;
}

declare type TextureUsage = "sample" | "render" | "storage" | "transfer";

declare interface Texture extends Object {
  getDimensions(): LuaMultiReturn<[width: number, height: number, layers: number]>;
  getFormat(): TextureFormat;
  getHeight(): number;
  getLayerCount(): number;
  getMipmapCount(): number;
  getSampleCount(): number;
  getType(): TextureType;
  getWidth(): number;
  hasUsage(...usage: [TextureUsage]): boolean;
  clear(): void;
  clear(hex: number, layer: number, layerCount: number | null, mipmap: number, mipmapCount: number | null): void;
  clear(r: number, g: number, b: number, a: number, layer: number, layerCount: number | null, mipmap: number, mipmapCount: number | null): void;
  clear(t: LuaTable, layer: number, layerCount: number | null, mipmap: number, mipmapCount: number | null): void;
  clear(v3: Vec3, layer: number, layerCount: number | null, mipmap: number, mipmapCount: number | null): void;
  clear(v4: Vec4, layer: number, layerCount: number | null, mipmap: number, mipmapCount: number | null): void;
  generateMipmaps(base: number, count: number | null): void;
  getPixels(x: number, y: number, layer: number, mipmap: number, width: number | null, height: number | null): Image;
  newReadback(x: number, y: number, layer: number, mipmap: number, width: number | null, height: number | null): Readback;
  setPixels(image: Image, dstx: number, dsty: number, dstlayer: number, dstmipmap: number, srcx: number, srcy: number, srclayer: number, srcmipmap: number, width: number | null, height: number | null, layers: number | null): void;
  setPixels(texture: Texture, dstx: number, dsty: number, dstlayer: number, dstmipmap: number, srcx: number, srcy: number, srcmipmap: number, width: number, height: number, layers: number, srcwidth: number, srcheight: number, srcdepth: number, filter: FilterMode): void;
  getParent(): Texture | null;
  isView(): boolean;
  newView(layer: number, mipmap: number): Texture;
  newView(type: TextureType, layer: number, layerCount: number | null, mipmap: number, mipmapCount: number | null): Texture;
}

declare interface Material extends Object {
  getProperties(): LuaTable;
}

declare type DrawMode = "points" | "lines" | "triangles";

declare interface Mesh extends Object {
  computeBoundingBox(): boolean;
  getBoundingBox(): LuaMultiReturn<[minx: number, miny: number, minz: number, maxx: number, maxy: number, maxz: number]>;
  getDrawMode(): DrawMode;
  getIndexBuffer(): Buffer;
  getIndices(): Array<number>;
  getMaterial(): Material;
  getVertexBuffer(): Buffer;
  getVertexCount(): number;
  getVertexFormat(): LuaTable;
  getVertexStride(): number;
  getVertices(index: number, count: number | null): LuaTable;
  setBoundingBox(minx: number, miny: number, minz: number, maxx: number, maxy: number, maxz: number): void;
  setBoundingBox(): void;
  setDrawMode(mode: DrawMode): void;
  // I think the documentation on this one is wrong.
  setIndexBuffer(buffer: Buffer): void;
  setIndices(t: Array<number>): void;
  setIndices(blob: Blob, type: DataType): void;
  setIndices(): void;
  setMaterial(material: Material): void;
  setVertices(vertices: Array<number>, index: number, count: number | null): void;
  setVertices(blob: Blob, index: number, count: number | null): void;
}

declare type MeshStorage = "cpu" | "gpu";

declare type AnimationProperty = "translation" | "rotation" | "scale" | "weights";

declare type SmoothMode = "step" | "linear" | "cubic";

declare type ModelDrawMode = "points" | "lines" | "linestrip" | "lineloop" | "strip" | "triangles" | "fan";

declare type AttributeType = "i8" | "u8" | "i16" | "u16" | "i32" | "u32" | "f32";

declare interface ModelData extends Object {
  getAnimationChannelCount(index: number): number;
  getAnimationChannelCount(name: string): number;
  getAnimationCount(): number;
  getAnimationDuration(index: number): number;
  getAnimationDuration(name: string): number;
  // I have no idea if this is correct.
  getAnimationKeyframe(index: number, channel: number, keyframe: number): LuaMultiReturn<[time: number, ...data: [number]]>;
  getAnimationKeyframe(name: string, channel: number, keyframe: number): LuaMultiReturn<[time: number, ...data: [number]]>;
  getAnimationKeyframeCount(index: number, channel: number): number;
  getAnimationKeyframeCount(name: string, channel: number): number;
  getAnimationName(index: number): string;
  getAnimationNode(index: number, channel: number): number;
  getAnimationNode(name: string, channel: number): number;
  getAnimationProperty(index: number, channel: number): AnimationProperty;
  getAnimationProperty(name: string, channel: number): AnimationProperty;
  getAnimationSmoothMode(index: number, channel: number): SmoothMode;
  getAnimationSmoothMode(name: string, channel: number): SmoothMode;
  getBlendShapeCount(): number;
  getBlendShapeName(index: number): string;
  getBlob(index: number): Blob;
  getBlobCount(): number;
  getBoundingBox(): LuaMultiReturn<[minx: number, miny: number, minz: number, maxx: number, maxy: number, maxz: number]>;
  getBoundingSphere(): LuaMultiReturn<[x: number, y: number, z: number, radius: number]>;
  getCenter(): LuaMultiReturn<[x: number, y: number, z: number]>;
  getDepth(): number;
  getDimensions(): LuaMultiReturn<[width: number, height: number, depth: number]>;
  getHeight(): number;
  getImage(index: number): Image;
  getImageCount(): number;
  getMaterial(index: number): MaterialProperties;
  getMaterial(name: string): MaterialProperties;
  getMaterialCount(): number;
  getMaterialName(index: number): string;
  getMeshCount(): number;
  getMeshDrawMode(mesh: number): ModelDrawMode;
  getMeshIndex(mesh: number, index: number): number;
  getMeshIndexCount(mesh: number): number;
  getMeshIndexFormat(mesh: number): LuaMultiReturn<[type: AttributeType, blob: number, offset: number, stride: number]>;
  getMeshMaterial(mesh: number): number;
  getMeshVertex(mesh: number, vertex: number): Array<number>;
  getMeshVertexCount(mesh: number): number;
  getMeshVertexFormat(mesh: number): LuaTable;
  getMetadata(): string;
  getNodeChildren(index: number): LuaTable;
  getNodeChildren(name: string): LuaTable;
  getNodeCount(): number;
  getNodeMeshes(index: number): LuaTable;
  getNodeMeshes(name: string): LuaTable;
  getNodeName(index: number): string;
  getNodeOrientation(index: number): LuaMultiReturn<[angle: number, ax: number, ay: number, az: number]>;
  getNodeOrientation(name: string): LuaMultiReturn<[angle: number, ax: number, ay: number, az: number]>;
  getNodeParent(index: number): number;
  getNodeParent(name: string): number;
  getNodePose(index: number): LuaMultiReturn<[x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number]>;
  getNodePose(name: string): LuaMultiReturn<[x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number]>;
  getNodePosition(index: number): LuaMultiReturn<[x: number, y: number, z: number]>;
  getNodePosition(name: string): LuaMultiReturn<[x: number, y: number, z: number]>;
  getNodeScale(index: number): LuaMultiReturn<[sx: number, sy: number, sz: number]>;
  getNodeScale(name: string): LuaMultiReturn<[sx: number, sy: number, sz: number]>;
  getNodeSkin(index: number): number;
  getNodeSkin(name: string): number;
  getNodeTransform(index: number): LuaMultiReturn<[x: number, y: number, z: number, sx: number, sy: number, sz: number, angle: number, ax: number, ay: number, az: number]>;
  getNodeTransform(name: string): LuaMultiReturn<[x: number, y: number, z: number, sx: number, sy: number, sz: number, angle: number, ax: number, ay: number, az: number]>;
  getRootNode(): number;
  getSkinCount(): number;
  // I think this is right?
  getSkinInverseBindMatrix(skin: number, joint: number): Array<number>;
  getSkinJoints(skin: number): LuaTable;
  getTriangleCount(): number;
  getTriangles(): LuaMultiReturn<[vertices: Array<number>, indices: Array<number>]>;
  getVertexCount(): number;
  getWidth(): number;
}

declare type TextureFormat = "r8" | "rg8" | "rgba8" | "r16" | "rg16" | "rgba16" | "r16f" | "rg16f" | "rgba16f" | "r32f" | "rg32f" | "rgba32f" |
  "rgb565" | "rgb5a1" | "rgb10a2" | "rg11b10f" | "d16" | "d24s8" | "d32f" | "d32fs8" | "bc1" | "bc2" | "bc3" | "bc4u" | "bc4s" | "bc5u" |
  "bc5s" | "bc6uf" | "bc6sf" | "bc7" | "astc4x4" | "astc5x4" | "astc5x5" | "astc6x5" | "astc6x6" | "astc8x5" | "astc8x6" | "astc8x8" | "astc10x5" |
  "astc10x6" | "astc10x8" | "astc10x10" | "astc12x10" | "astc12x12";

declare interface Sampler extends Object {
  getAnisotropy(): number;
  getCompareMode(): CompareMode;
  getFilter(): LuaMultiReturn<[min: FilterMode, mag: FilterMode, mip: FilterMode]>;
  getMipmapRange(): LuaMultiReturn<[min: number, max: number]>;
  getWrap(): LuaMultiReturn<[x: WrapMode, y: WrapMode, z: WrapMode]>;
}

declare type FilterMode = "nearest" | "linear";

declare type WrapMode = "clamp" | "repeat";

declare type CompareMode = "none" | "equal" | "notequal" | "less" | "lequal" | "greater" | "gequal";

declare type ShaderType = "graphics" | "compute";

declare interface Shader extends Object {
  clone(source: Shader, flags: LuaTable): Shader;
  getBufferFormat(name: string): LuaMultiReturn<[format: AnyTable, length: number]>;
  getType(): ShaderType;
  getWorkgroupSize(): LuaMultiReturn<[x: number, y: number, z: number]>;
  hasAttribute(name: string): boolean;
  hasAttribute(location: number): boolean;
  hasStage(stage: ShaderStage): boolean;
}

declare type DefaultShader = "unlit" | "normal" | "font" | "cubemap" | "equirect" | "fill";

declare type TextureType = "2d" | "3d" | "cube" | "array";

declare type TextureFeature = "sample" | "filter" | "render" | "blend" | "storage" | "atomic" | "blitsrc" | "blitdst";

declare type DeviceAxis = "trigger" | "thumbstick" | "touchpad" | "grip";

declare type DeviceButton = "trigger" | "thumbstick" | "touchpad" | "grip" | "menu" | "a" | "b" | "x" | "y" | "proximity";

declare type PassthroughMode = "opaque" | "blend" | "add";

declare type HeadsetDriver = "desktop" | "openxr";

declare interface RandomGenerator extends Object {
  getSeed(): LuaMultiReturn<[low: number, high: number]>;
  getState(): string;
  random(): number;
  random(high: number): number;
  random(low: number, high: number): number;
  randomNormal(sigma: number, mu: number): number;
  setSeed(seed: number): void;
  setSeed(low: number, high: number): void;
  setState(state: string): number;
}

declare interface Curve extends Object {
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

declare type ShapeType = "box" | "capsule" | "cylinder" | "sphere";


declare interface Collider extends Object {
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

declare interface Image extends Object {
  encode(): Blob;
  getBlob(): Blob;
  getDimensions(): LuaMultiReturn<[width: number, height: number]>;
  getFormat(): TextureFormat;
  getHeight(): number;
  getPixel(x: number, y: number): LuaMultiReturn<[r: number, g: number, b: number, a: number]>;
  getWidth(): number;
  mapPixel(callback: (x: number, y: number, r: number, g: number, b: number, a: number) => LuaMultiReturn<[r: number, g: number, b: number, a: number]>, x: number, y: number, w: number, h: number): void;
  paste(source: Image, x: number, y: number, fromX: number, fromY: number, width: number, height: number): void;
  setPixel(x: number, y: number, r: number, g: number, b: number, a: number): void;
  getPointer(): LuaUserdata;
}

declare interface Shape extends Object {
  destroy(): void;
  getAABB(): LuaMultiReturn<[minx: number, miny: number, minz: number, maxx: number, maxy: number, maxz: number]>;
  getCollider(): Collider;
  getMass(density: number): LuaMultiReturn<[cx: number, cy: number, cz: number, mass: number, inertia: LuaTable]>;
  getOrientation(): LuaMultiReturn<[angle: number, ax: number, ay: number, az: number]>;
  getPose(): LuaMultiReturn<[x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number]>;
  getPosition(): LuaMultiReturn<[x: number, y: number, z: number]>;
  getType(): ShapeType;
  getUserData(): LuaUserdata;
  isEnabled(): boolean;
  isSensor(): boolean;
  setEnabled(enabled: boolean): void;
  setOrientation(angle: number, ax: number, ay: number, az: number): void;
  setOrientation(orientation: Quat): void;
  setPose(x: number, y: number, z: number, angle: number, ax: number, ay: number, az: number): void;
  setPose(position: Vec3, orientation: Quat): void;
  setPosition(x: number, y: number, z: number): void;
  setPosition(position: Vec3): void;
  setSensor(sensor: boolean): void;
  setUserData(data: LuaUserdata): void;
}

declare interface BoxShape extends Shape {
  getDimensions(): LuaMultiReturn<[width: number, height: number, depth: number]>;
  setDimensions(width: number, height: number, depth: number): void;
}

declare interface CapsuleShape extends Shape {
  getLength(): number;
  getRadius(): number;
  setLength(length: number): void;
  setRadius(radius: number): void;
}

declare interface CylinderShape extends Shape {
  getLength(): number;
  getRadius(): number;
  setLength(length: number): void;
  setRadius(radius: number): void;
}

declare interface MeshShape extends Shape { }

declare interface SphereShape extends Shape {
  getRadius(): number;
  setRadius(radius: number): void;
}

declare interface TerrainShape extends Shape { }

declare type JointType = "ball" | "distance" | "hinge" | "slider";

declare interface Joint extends Object {
  destroy(): void;
  getColliders(): LuaMultiReturn<[colliderA: Collider, colliderB: Collider]>;
  getType(): JointType;
  getUserData(): LuaUserdata;
  isEnabled(): boolean;
  setEnabled(enabled: boolean): void;
  setUserData(data: LuaUserdata): void;
}

declare interface BallJoint extends Joint {
  getAnchors(): LuaMultiReturn<[x1: number, y1: number, z1: number, x2: number, y2: number, z2: number]>;
  getResponseTime(): number;
  getTightness(): number;
  setAnchor(x: number, y: number, z: number): void;
  setAnchor(anchor: Vec3): void;
  setResponseTime(responseTime: number): void;
  setTightness(tightness: number): void;
}

declare interface DistanceJoint extends Joint {
  getAnchors(): LuaMultiReturn<[x1: number, y1: number, z1: number, x2: number, y2: number, z2: number]>;
  getDistance(): number;
  getResponseTime(): number;
  getTightness(): number;
  setAnchors(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): void;
  setAnchors(first: Vec3, second: Vec3): void;
  setDistance(distance: number): void;
  setResponseTime(responseTime: number): void;
  setTightness(tightness: number): void;
}

declare interface HingeJoint extends Joint {
  getAnchors(): LuaMultiReturn<[x1: number, y1: number, z1: number, x2: number, y2: number, z2: number]>;
  getAngle(): number;
  getAxis(): LuaMultiReturn<[x: number, y: number, z: number]>;
  getLimits(): LuaMultiReturn<[lower: number, upper: number]>;
  getLowerLimit(): number;
  getUpperLimit(): number;
  setAnchor(x: number, y: number, z: number): void;
  setAnchor(anchor: Vec3): void;
  setAxis(x: number, y: number, z: number): void;
  setAxis(axis: Vec3): void;
  setLimits(lower: number, upper: number): void;
  setLowerLimit(limit: number): void;
  setUpperLimit(limit: number): void;
}

declare interface SliderJoint extends Joint {
  getAxis(): LuaMultiReturn<[x: number, y: number, z: number]>;
  getLimits(): LuaMultiReturn<[lower: number, upper: number]>;
  getLowerLimit(): number;
  getPosition(): number;
  getUpperLimit(): number;
  setAxis(x: number, y: number, z: number): void;
  setAxis(axis: Vec3): void;
  setLimits(lower: number, upper: number): void;
  setLowerLimit(limit: number): void;
  setUpperLimit(limit: number): void;
}

declare type Permission = "audiocapture";

//* Doc Note: numpad keys are missing right now.
declare type KeyCode = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "0" |
  "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "space" | "return" | "tab" | "escape" | "backspace" | "up" | "down" | "left" | "right" | "home" | "end" | "pageup" | "pagedown" |
  "insert" | "delete" | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "f9" | "f10" | "f11" | "f12" | "`" | "-" | "=" | "[" | "]" | "\\" | ";" | "'" | "," | "." | "/" | "lctrl" |
  "lshift" | "lalt" | "lgui" | "rctrl" | "rshift" | "ralt" | "rgui" | "capslock" | "scrolllock" | "numlock";

declare interface Channel extends Object {
  clear(): void;
  hasRead(id: number): boolean;
  peek(): LuaMultiReturn<[message: any, present: boolean]>;
  pop(wait: number | boolean): any;
  push(message: any, wait: number | boolean): LuaMultiReturn<[id: number, read: boolean]>;
}

declare interface Thread extends Object {
  getError(): string | null;
  isRunning(): boolean;
  start(...args: [any]): void;
  wait(): void;
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

  destroy(): void;
  queryBox(x: number, y: number, z: number, w: number, h: number, d: number, callback: (shape: Shape) => boolean | void): boolean;
  queryBox(position: Vec3, size: Vec3, callback: (shape: Shape) => boolean | void): boolean;
  querySphere(x: number, y: number, z: number, radius: number, callback: (shape: Shape) => boolean | void): boolean;
  querySphere(position: Vec3, radius: number, callback: (shape: Shape) => boolean | void): boolean;
  raycast(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, callback: (shape: Shape, x: number, y: number, z: number, nx: number, ny: number, nz: number) => boolean | null): void;
  raycast(start: Vec3, end: Vec3, callback: (shape: Shape, x: number, y: number, z: number, nx: number, ny: number, nz: number) => boolean | null): void;
  update(dt: number, resolver?: (world: World) => void): void;
  getColliders(): LuaTable;
  getColliders(t: LuaTable): LuaTable;
  getAngularDamping(): LuaMultiReturn<[damping: number, threshold: number]>;
  getGravity(): LuaMultiReturn<[xg: number, yg: number, zg: number]>;
  getLinearDamping(): LuaMultiReturn<[damping: number, threshold: number]>;
  getResponseTime(): number;
  getStepCount(): number;
  getTightness(): number;
  isSleepingAllowed(): boolean;
  setAngularDamping(damping: number, threshold?: number): void;
  setGravity(xg: number, yg: number, zg: number): void;
  setGravity(gravity: Vec3): void;
  setLinearDamping(damping: number, threshold?: number): void;
  setResponseTime(responseTime: number): void;
  setSleepingAllowed(allowed: boolean): void;
  setStepCount(steps: number): void;
  setTightness(tightness: number): void;
  collide(shapeA: Shape, shapeB: Shape, friction: number | null, restitution: number | null): boolean;
  computeOverlaps(): void;
  disableCollisionBetween(tag1: string, tag2: string): void;
  enableCollisionBetween(tag1: string, tag2: string): void;
  getContacts(shapeA: Shape, shapeB: Shape): LuaTable;
  getTags(): Array<string>;
  isCollisionEnabledBetween(tag1: string, tag2: string): boolean;
  overlaps(): LuaIterator<Shape, Shape>;
}

declare interface NewSourceOptions {
  decode: boolean;
  pitchable: boolean;
  spatial: boolean;
  // note: I did not think it was a very productive idea to mix the two.
  // If you think this is a bad idea, let me know.
  effects: Map<string, boolean> | Array<number | string>;
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

declare interface LovrConfigModules {
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

declare interface LovrConfigAudio {
  spatializer?: lovrConfigSpatializer;
  samplerate: number;
  start: boolean;
}

declare interface LovrConfigGraphics {
  debug: boolean;
  vsync: boolean;
  stencil: boolean;
  antialias: boolean;
  shadercache: boolean;
}

declare interface LovrConfigHeadset {
  drivers: Array<string>;
  supersample: number;
  seated: boolean;
  antialias: boolean;
  stencil: boolean;
  submitdepth: boolean;
  overlay: boolean;
}

declare interface LovrConfigMath {
  globals: boolean;
}

declare type FullScreenType = "desktop" | "exclusive";

declare interface LovrConfigWindow {
  width: number;
  height: number;
  fullscreen: boolean;
  resizable: boolean;
  title: string;
  icon: string;
  // lovr-window variables
  fullscreentype: FullScreenType;
  x: number;
  y: number;
  minwidth: number;
  minheight: number;
  display: number;
  centered: boolean;
  topmost: boolean;
  borderless: boolean;
  opacity: number;
}

declare interface LovrConfig {
  version: string;
  identity: string;
  saveprecedence: boolean;
  modules: LovrConfigModules;
  audio: LovrConfigAudio;
  graphics: LovrConfigGraphics;
  headset: LovrConfigHeadset;
  math: LovrConfigMath;
  // I didn't make this nullable because of ease of use.
  window: LovrConfigWindow;
}

// Sneak this ambient variable in.
declare let conf: LovrConfigWindow | null;

declare type LogLevel = "debug" | "info" | "warn" | "error";

/** @noSelf **/
declare namespace lovr {

  // These are secret variables and functions.
  /** @customName windowmoved */
  const windowmoved_: boolean;
  function windowmoved(x: number, y: number): void;
  /** @customName dragdrop */
  const dragdrop_: boolean;
  function dragdrop(any: any): void;


  function conf(t: LovrConfig): void;
  function draw(pass: Pass): boolean | void;
  function errhand(message: string): () => string | null;
  function focus(focused: boolean): void;
  function keypressed(key: KeyCode, scancode: number, repeating: boolean): void;
  function keyreleased(key: KeyCode, scancode: number): void;
  function load(arg: LuaTable): void;
  function log(message: string, level: LogLevel, tag: string): void;
  function mirror(pass: Pass): boolean;
  function mousemoved(x: number, y: number, dx: number, dy: number): void;
  function mousepressed(x: number, y: number, button: number): void;
  function mousereleased(x: number, y: number, button: number): void;
  function permission(permission: Permission, granted: boolean): void;
  function quit(): boolean;
  function recenter(): void;
  function resize(width: number, height: number): void;
  function restart(): void | boolean | number | string;
  function run(): void | string | number;
  function textinput(text: string, code: number): void;
  function threaderror(thread: Thread, message: string): void;
  function update(dt: number): void;
  function visible(visible: boolean): void;
  function wheelmoved(deltaX: number, deltaY: number): void;

  namespace audio {
    function newSource(data: string | Blob | Sound, options: NewSourceOptions): Source;
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

  namespace data {
    function newBlob(size: number, name: string): Blob;
    function newBlob(contents: string, name: string): Blob;
    function newBlob(source: Blob, name: string): Blob;
    function newImage(filename: string): Image;
    function newImage(width: number, height: number, format: TextureFormat, data: Blob): Image;
    function newImage(source: Image): Image;
    function newImage(blob: Blob): Image;
    function newModelData(filename: string): ModelData;
    function newModelData(blob: Blob): ModelData;
    function newRasterizer(size: number): Rasterizer;
    function newRasterizer(filename: string, size: number): Rasterizer;
    function newRasterizer(blob: Blob, size: number): Rasterizer;
    function newSound(frames: number, format: SampleFormat, channels: ChannelLayout, contents: Blob): Sound;
    function newSound(filename: string, decode: boolean): Sound;
    function newSound(blob: Blob, decode: boolean): Sound;
  }

  namespace event {
    function clear(): void;
    function poll(): LuaIterator<string, [...any]>;
    function push(name: string, ...anything: any): void;
    function quit(code?: number): void;
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
    function newShader(vertex: string, fragment: string, options?: ShaderOptions): Shader;
    function newShader(compute: string, options?: ShaderOptions): Shader;
    function newShader(default1: DefaultShader, options?: ShaderOptions): Shader;
    function newTexture(filename: string, options?: TextureOptions): Texture;
    function newTexture(width: number, height: number, options?: TextureOptions): Texture;
    function newTexture(width: number, height: number, layers: number, options?: TextureOptions): Texture;
    function newTexture(image: string, options?: TextureOptions): Texture;
    function newTexture(images: Array<string>, options?: TextureOptions): Texture;
    function newTexture(blob: Blob, options?: TextureOptions): Texture;
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
    function newVec2(scalar: number): Vec2;
    function newVec2(x: number, y: number): Vec2;
    function newVec2(u: Vec2): Vec2;
    function newVec3(scalar: number): Vec3;
    function newVec3(x: number, y: number, z: number): Vec3;
    function newVec3(u: Vec3): Vec3;
    function newVec3(m: Mat4): Vec3;
    function newVec3(q: Quat): Vec3;
    function newVec4(scalar: number): Vec4;
    function newVec4(x: number, y: number, z: number, w: number): Vec4;
    function newVec4(u: Vec4): Vec4;
    function quat(angle: number, ax: number, ay: number, az: number, raw: boolean): Quat;
    function quat(r: Quat): Quat;
    function quat(v: Vec3): Quat;
    function quat(v: Vec3, u: Vec3): Quat;
    function quat(m: Mat4): Quat;
    function quat(): Quat;
    function vec2(scalar: number): Vec2;
    function vec2(x: number, y: number): Vec2;
    function vec2(u: Vec2): Vec2;
    function vec3(scalar: number): Vec3;
    function vec3(x: number, y: number, z: number): Vec3;
    function vec3(u: Vec3): Vec3;
    function vec3(m: Mat4): Vec3;
    function vec3(q: Quat): Vec3;
    function vec4(scalar: number): Vec4;
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
    function newWorld(): World;
    function newWorld(xg?: number, yg?: number, zg?: number, allowSleep?: boolean, tags?: LuaTable): World;
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

  namespace vec2 {
    function zero(): Vec2;
    function one(): Vec2;
  }

  namespace vec3 {
    function zero(): Vec3;
    function one(): Vec3;
    function left(): Vec3;
    function right(): Vec3;
    function up(): Vec3;
    function down(): Vec3;
    function back(): Vec3;
    function forward(): Vec3;
  }

  namespace vec4 {
    function zero(): Vec4;
    function one(): Vec4;
    function identity(): Vec4;
  }

}