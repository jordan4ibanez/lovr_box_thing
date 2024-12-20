import * as window from "./lovr-window";

lovr.load = () => {

  jit.on();
  jit.off();

  print(window.focus());
  print(window.getDisplayCount());
  print(window.getDisplayDimensions(1)[0]);
  print(window.getDisplayName(1));
  print(window.getIcon());
  print(window.getMode()[0]);


  // lovr.event.quit();
};

// lovr.draw = (pass: Pass) => {
//   pass.text("hello!", 0, 1.7, -3, 0.5);
// };

// lovr.update = () => {
//   lovr.event.quit();
// };

lovr.keypressed = (key: KeyCode) => {
  if (key == "escape") {
    lovr.event.quit();
  }
};

lovr.errhand = (message: string): (() => string | null) => {
  return () => {
    print("error test:");
    print(message);

    return "hi";
  };
};