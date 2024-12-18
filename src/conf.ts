lovr.conf = (t: LOVRConfig) => {
  print("hi");
  print(t.identity);
  t.modules.audio = false;
};