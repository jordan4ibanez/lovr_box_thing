import * as window from "./lovr-window";

lovr.load = () => {

};

lovr.keypressed = (key: KeyCode) => {

};

lovr.update = (delta: number) => {
  // print(keyboard.isDown("a", "s"));
};

lovr.errhand = (message: string): (() => string | null) => {
  return () => {
    // print("error test:");
    print(message);
    return "";
  };
};