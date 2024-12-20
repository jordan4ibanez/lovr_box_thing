import * as window from "./lovr-window";

let timer = 0;
let smolify = true;

lovr.load = () => {

  // jit.on();
  // jit.off();

  // print(window.focus());
  // print(window.getDisplayCount());
  // print(window.getDisplayDimensions(1)[0]);
  // print(window.getDisplayName(1));
  // print(window.getIcon());
  // print(window.getMode()[0]);
  // print(window.getOpacity());
  // print(window.getPosition()[0]);
  // print(window.getTitle());
  window.setFullscreen(true, "desktop", 1);
  window.setFullscreen(false, "desktop", 1);
  print("STARTING");
  window.setIcon("textures/club_zero.png");
  window.setMode(1024, 768);
  // window.setOpacity(0.5)
  // window.setPosition(100, 100);
  window.setTitle("cool");



  // lovr.event.quit();
};

// lovr.draw = (pass: Pass) => {
//   pass.text("hello!", 0, 1.7, -3, 0.5);
// };

lovr.update = (delta: number) => {

  timer = timer + delta;

  print(timer);

  if (timer > 0.3) {
    if (smolify) {
      // window.minimize();
      window.maximize();
    } else {
      // window.focus();
      // window.maximize();
      window.restore();
    }
    smolify = !smolify;
    timer = 0;
  }
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