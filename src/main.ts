import * as window from "./lovr-window";
import * as keyboard from "./keyboard";

let world: World;
let boxes: Array<Collider> = [];

keyboard.setKeyPressedCallback("escape", () => {
  lovr.event.quit();
});

lovr.load = () => {
  world = lovr.physics.newWorld();
  let ground = world.newBoxCollider(0, 1, 0, 1, 1, 1);
  ground.setKinematic(true);
  boxes.push(ground);
};

lovr.update = (delta: number) => {
  keyboard._internalKeyboardUpdateDoNotUse();

};

lovr.draw = (pass: Pass) => {

  for (const box of Object.values(boxes)) {
    let [x, y, z] = box.getPosition();
    let shape: Shape = box.getShapes()[0];

    switch (shape.getType()) {
      case "box":

        const [sizeX, sizeY, sizeZ] = (shape as BoxShape).getDimensions();

        print("size:", sizeX, sizeY, sizeZ);

        break;
      case "capsule":
        print("capsule");
        break;
      case "cylinder":
        print("cylinder");
        break;
      case "sphere":
        print("sphere");
        break;
    }
    print(x, y, z);
  }
};


lovr.errhand = (message: string): (() => string | null) => {
  return () => {
    print(message);
    return "";
  };
};