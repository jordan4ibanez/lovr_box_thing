lovr.conf = (t: LovrConfig) => {

  print(lovr.filesystem.getWorkingDirectory());

  t.version = "0.17.1";
  t.identity = "default";
  t.modules.audio = false;
  t.audio.spatializer = "simple";
  t.window.resizable = true;
  // let blah = lovr.filesystem.getWorkingDirectory() + "/textures/club_zero.png";
  t.window.icon = "/textures/club_zero.png";

  conf = t.window;
};