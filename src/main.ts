import * as window from "./lovr-window";
import * as mouse from "./lovr-mouse";
import * as keyboard from "./lovr-keyboard";

lovr.load = () => {
  mouse.getPosition();

};

lovr.update = (delta: number) => {
  // print(keyboard.isDown("a", "s"));
  if (keyboard.isDown("a", "b")) {
    print("hi");
  }
};

lovr.keypressed = (key: KeyCode) => {
  if (key == "escape") {
    lovr.event.quit();
  }
  // print(keyboard.isDown("a", "b"));
};

lovr.errhand = (message: string): (() => string | null) => {
  return () => {
    // print("error test:");
    print(message);
    return "";
  };
};