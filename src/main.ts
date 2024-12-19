function main(): void {
  print("hi");

  let thing: Vec2 = lovr.math.vec2(0);
  print(addVec2(thing, thing));

  print(thing.add(thing));
  print(thing.pow(thing));


}

