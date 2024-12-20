lovr.load = () => {
  print("hi");
};

lovr.draw = (pass: Pass) => {
  pass.text("hello!", 0, 1.7, -3, 0.5);
};

lovr.keypressed = (key: KeyCode) => {
  if (key == "escape") {
    lovr.event.quit();
  }
};