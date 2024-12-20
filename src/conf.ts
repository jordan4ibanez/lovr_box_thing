lovr.conf = (t: LovrConfig) => {
  t.modules.audio = false;
  t.audio.spatializer = "simple";
  t.window.resizable = true;

  conf = t.window;
};