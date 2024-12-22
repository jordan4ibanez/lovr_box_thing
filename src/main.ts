import * as window from "./lovr-window";
import * as keyboard from "./keyboard";

let skybox: Texture;

lovr.errhand = (message: string): (() => string | null) => {
  return () => {
    print(message);
    return "";
  };

  skybox = lovr.graphics.newTexture("starynight.png");


};

lovr.load = () => {
  keyboard.setKeyPressedCallback("escape", () => {
    lovr.event.quit();
  });

};

lovr.update = (delta: number) => {
  keyboard._internalKeyboardUpdateDoNotUse();

};

lovr.draw = (pass: Pass) => {
  pass.text("hello world!", 0, 1.7, -5);

  pass.cube(0, 1.7, -1, 0.5, lovr.timer.getTime(), 0, 1, 0, "line");


}


