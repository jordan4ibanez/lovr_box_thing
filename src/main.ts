import * as window from "./lovr-window";
import * as keyboard from "./keyboard";

lovr.errhand = (message: string): (() => string | null) => {
  return () => {
    print(message);
    return "";
  };
};

lovr.load = () => {
  keyboard.setKeyPressedCallback("escape", () => {
    lovr.event.quit();
  });

};

lovr.update = (delta: number) => {
  keyboard._internalKeyboardUpdateDoNotUse();
};

