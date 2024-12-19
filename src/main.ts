function main(): void {
  print("hi");

  let thing: Vec4 = lovr.math.vec4(0);
  print(addVec4(thing, thing));

  print(thing.add(thing));
  print(thing.pow(thing));
  thing.add(1.9);


}

