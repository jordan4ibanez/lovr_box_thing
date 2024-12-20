lovr.draw = (pass: Pass) => {

};

lovr.keypressed = (key: KeyCode) => {
  if (key == "escape") {
    lovr.event.quit();
  }
};