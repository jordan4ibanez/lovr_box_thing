import * as window from "./lovr-window";
import * as mouse from "./lovr-mouse";

lovr.load = () => {

};

lovr.update = (delta: number) => {

};

lovr.keypressed = (key: KeyCode) => {
  if (key == "escape") {
    lovr.event.quit();
  }
};

lovr.errhand = (message: string): (() => string | null) => {
  return () => {
    // print("error test:");
    print(message);
    return "";
  };
};