import * as ffi from "ffi";
import * as jit from "jit";

lovr.load = () => {

  jit.on();
  jit.off();

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