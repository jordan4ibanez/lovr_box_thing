import * as window from "./lovr-window";
import * as keyboard from "./keyboard";

let world: World;

keyboard.setKeyPressedCallback("escape", () => {
  lovr.event.quit();
});

lovr.load = () => {
  world = lovr.physics.newWorld();
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