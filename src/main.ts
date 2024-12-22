import * as window from "./lovr-window";
import * as keyboard from "./keyboard";

lovr.load = () => {

};

lovr.update = (delta: number) => {
  keyboard._internalKeyboardUpdateDoNotUse();
};

lovr.errhand = (message: string): (() => string | null) => {
  return () => {
    // print("error test:");
    print(message);
    return "";
  };
};