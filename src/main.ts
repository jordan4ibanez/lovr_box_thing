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

};


lovr.errhand = (message: string): (() => string | null) => {
  return () => {
    print(message);
    return "";
  };
};