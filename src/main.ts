import * as window from "./lovr-window";

lovr.load = () => {

  jit.on();
  jit.off();

  window.blah();

  lovr.event.quit();
};

// lovr.draw = (pass: Pass) => {
//   pass.text("hello!", 0, 1.7, -3, 0.5);
// };

// lovr.update = () => {
//   lovr.event.quit();
// };

// lovr.keypressed = (key: KeyCode) => {
//   if (key == "escape") {
//     lovr.event.quit();
//   }
// };