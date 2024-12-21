import * as window from "./lovr-window";
import * as mouse from "./lovr-mouse";

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
  // window.setFullscreen(true, "desktop", 1);
  // window.setFullscreen(false, "desktop", 1);
  // print("STARTING");
  window.setIcon("textures/club_zero.png");
  // window.setMode(1024, 768);
  // window.setOpacity(0.5)
  // window.setPosition(100, 100);
  // window.setTitle("cool");

  // const cursor = mouse.newCursor("textures/club_zero.png", 0, 0);
  mouse.setCursor("hi");

  // lovr.event.quit();
};


lovr.mousepressed = (x: number, y: number, button: number) => {
  print('press', x, y, button);
};

lovr.mousereleased = (x: number, y: number, button: number) => {
  print('release', x, y, button);
};

lovr.mousemoved = (x: number, y: number, dx: number, dy: number) => {
  if (mouse.isDown(1, 2, 3)) {
    print("move", x, y, dx, dy);
  }
};

lovr.wheelmoved = (dx: number, dy: number) => {
  print("wheel", dx, dy);
};

// lovr.draw = (pass: Pass) => {
//   pass.text("hello!", 0, 1.7, -3, 0.5);
// };

lovr.update = (delta: number) => {

  timer = timer + delta;

  // print(timer);

  // print(mouse.isDown(2));



  // if (timer > 0.3) {
  //   if (smolify) {
  //     // window.minimize();
  //     window.maximize();
  //   } else {
  //     // window.focus();
  //     // window.maximize();
  //     window.restore();
  //   }
  //   smolify = !smolify;
  //   timer = 0;
  // }
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