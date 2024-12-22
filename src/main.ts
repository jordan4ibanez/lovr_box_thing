import * as window from "./lovr-window";
import * as keyboard from "./keyboard";

let world: World;
let boxes: Array<Collider> = [];

keyboard.setKeyPressedCallback("escape", () => {
  lovr.event.quit();
});

lovr.load = () => {
  world = lovr.physics.newWorld();
  let ground = world.newBoxCollider(0, 0, 0, 10, 1, 10);
  ground.setKinematic(true);
  boxes.push(ground);
};

lovr.update = (delta: number) => {
  keyboard._internalKeyboardUpdateDoNotUse();

};

lovr.draw = (pass: Pass) => {

  for (const box of Object.values(boxes)) {

    let shape: Shape = box.getShapes()[0];

    let [x, y, z, angle, angleX, angleY, angleZ] = box.getPose();

    print(x, y, z, angle, angleX, angleY, angleZ);

    switch (shape.getType()) {
      case "box":

        const [sizeX, sizeY, sizeZ] = (shape as BoxShape).getDimensions();

        print("size:", sizeX, sizeY, sizeZ);

        pass.box(x, y, z, sizeX, sizeY, sizeZ, angle, angleX, angleY, angleZ, "line");

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
  }
};


lovr.errhand = (message: string): (() => string | null) => {
  return () => {
    print(message);
    return "";
  };
};