// Only run if we have LuaJIT and GLFW.
assert(type(jit) == 'table' && lovr.system.getOS() != 'Android' && lovr.system.getOS() != 'Web', "lovr-keyboard cannot run on this platform");
import * as ffi from "ffi";
const C: AnyTable = ffi.os == 'Windows' && ffi.load('glfw3') || ffi.C;

ffi.cdef(`
  typedef struct GLFWwindow GLFWwindow;
  typedef void(*GLFWkeyfun)(GLFWwindow*, int, int, int, int);
  typedef void(*GLFWcharfun)(GLFWwindow*, unsigned int);

  GLFWwindow* os_get_glfw_window(void);
  int glfwGetKey(GLFWwindow* window, int key);
  GLFWkeyfun glfwSetKeyCallback(GLFWwindow* window, GLFWkeyfun callback);
  GLFWcharfun glfwSetCharCallback(GLFWwindow* window, GLFWcharfun callback);
`);

const window = C.os_get_glfw_window();

type KeyboardKey = "space" | "'" | "," | "-" | "." | "/" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | ";" | "=" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r"
  | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "[" | "\\" | "]" | "`" | "escape" | "return" | "enter" | "tab" | "backspace" | "insert" | "delete" | "right" | "left" | "down" | "up" | "pageup" | "pagedown" | "home" | "end" |
  "capslock" | "scrolllock" | "numlock" | "printscreen" | "pause" | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "f9" | "f10" | "f11" | "f12" | "kp0" | "kp1" | "kp2" | "kp3" | "kp4" | "kp5" | "kp6" | "kp7" | "kp8" |
  "kp9" | "kp." | "kp/" | "kp*" | "kp-" | "kp+" | "kpenter" | "kp=" | "lshift" | "lctrl" | "lalt" | "lgui" | "rshift" | "rctrl" | "ralt" | "rgui" | "menu";

const keymap: AnyTable = {
  ['space']: [32, 0, 0],
  ['\'']: [39, 0, 0],
  [',']: [44, 0, 0],
  ['-']: [45, 0, 0],
  ['.']: [46, 0, 0],
  ['/']: [47, 0, 0],

  ['0']: [48, 0, 0],
  ['1']: [49, 0, 0],
  ['2']: [50, 0, 0],
  ['3']: [51, 0, 0],
  ['4']: [52, 0, 0],
  ['5']: [53, 0, 0],
  ['6']: [54, 0, 0],
  ['7']: [55, 0, 0],
  ['8']: [56, 0, 0],
  ['9']: [57, 0, 0],

  [';']: [59, 0, 0],
  ['=']: [61, 0, 0],

  ['a']: [65, 0, 0],
  ['b']: [66, 0, 0],
  ['c']: [67, 0, 0],
  ['d']: [68, 0, 0],
  ['e']: [69, 0, 0],
  ['f']: [70, 0, 0],
  ['g']: [71, 0, 0],
  ['h']: [72, 0, 0],
  ['i']: [73, 0, 0],
  ['j']: [74, 0, 0],
  ['k']: [75, 0, 0],
  ['l']: [76, 0, 0],
  ['m']: [77, 0, 0],
  ['n']: [78, 0, 0],
  ['o']: [79, 0, 0],
  ['p']: [80, 0, 0],
  ['q']: [81, 0, 0],
  ['r']: [82, 0, 0],
  ['s']: [83, 0, 0],
  ['t']: [84, 0, 0],
  ['u']: [85, 0, 0],
  ['v']: [86, 0, 0],
  ['w']: [87, 0, 0],
  ['x']: [88, 0, 0],
  ['y']: [89, 0, 0],
  ['z']: [90, 0, 0],

  ['[']: [91, 0, 0],
  ['\\']: [92, 0, 0],
  [']']: [93, 0, 0],
  ['`']: [96, 0, 0],

  ['escape']: [256, 0, 0],
  ['return']: [257, 0, 0],
  ['enter']: [257, 0, 0],
  ['tab']: [258, 0, 0],
  ['backspace']: [259, 0, 0],
  ['insert']: [260, 0, 0],
  ['delete']: [261, 0, 0],
  ['right']: [262, 0, 0],
  ['left']: [263, 0, 0],
  ['down']: [264, 0, 0],
  ['up']: [265, 0, 0],
  ['pageup']: [266, 0, 0],
  ['pagedown']: [267, 0, 0],
  ['home']: [268, 0, 0],
  ['end']: [269, 0, 0],
  ['capslock']: [280, 0, 0],
  ['scrolllock']: [281, 0, 0],
  ['numlock']: [282, 0, 0],
  ['printscreen']: [283, 0, 0],
  ['pause']: [284, 0, 0],

  ['f1']: [290, 0, 0],
  ['f2']: [291, 0, 0],
  ['f3']: [292, 0, 0],
  ['f4']: [293, 0, 0],
  ['f5']: [294, 0, 0],
  ['f6']: [295, 0, 0],
  ['f7']: [296, 0, 0],
  ['f8']: [297, 0, 0],
  ['f9']: [298, 0, 0],
  ['f10']: [299, 0, 0],
  ['f11']: [300, 0, 0],
  ['f12']: [301, 0, 0],

  ['kp0']: [320, 0, 0],
  ['kp1']: [321, 0, 0],
  ['kp2']: [322, 0, 0],
  ['kp3']: [323, 0, 0],
  ['kp4']: [324, 0, 0],
  ['kp5']: [325, 0, 0],
  ['kp6']: [326, 0, 0],
  ['kp7']: [327, 0, 0],
  ['kp8']: [328, 0, 0],
  ['kp9']: [329, 0, 0],
  ['kp.']: [330, 0, 0],
  ['kp/']: [331, 0, 0],
  ['kp*']: [332, 0, 0],
  ['kp-']: [333, 0, 0],
  ['kp+']: [334, 0, 0],
  ['kpenter']: [335, 0, 0],
  ['kp=']: [336, 0, 0],

  ['lshift']: [340, 0, 0],
  ['lctrl']: [341, 0, 0],
  ['lalt']: [342, 0, 0],
  ['lgui']: [343, 0, 0],
  ['rshift']: [344, 0, 0],
  ['rctrl']: [345, 0, 0],
  ['ralt']: [346, 0, 0],
  ['rgui']: [347, 0, 0],
  ['menu']: [348, 0, 0]
};

let reverse: AnyTable = {};

for (const [k, v] of Object.entries(keymap)) {
  let keycode = v[1];
  reverse[keycode] = k;
}

for (const [k, v] of Object.entries(reverse)) {
  keymap[k] = v;
}

export function isDown(...key: KeyboardKey[]): boolean {
  for (const k of Object.values(key)) {
    const keycode = keymap[k][1];
    assert(keycode && type(keycode) == 'number', 'Unknown key: ' + key);
    if (C.glfwGetKey(window, keycode) == 1) {
      return true;
    }
  }
  return false;
}

export function wasPressed(...key: KeyboardKey[]): boolean {
  let pressed = false;
  for (const k of Object.values(key)) {
    const keycode = keymap[k][1];
    assert(keycode && type(keycode) == 'number', 'Unknown key: ' + key);
    keymap[k][3] = C.glfwGetKey(window, keycode);
    if (keymap[k][2] == 0 && keymap[k][3] == 1) {
      pressed = true;
    }
    keymap[k][2] = keymap[k][3];
  }
  return pressed;
}

export function wasReleased(...key: KeyboardKey[]): boolean {
  let released = false;
  for (const k of Object.values(key)) {
    const keycode = keymap[k][1];
    assert(keycode && type(keycode) == 'number', 'Unknown key: ' + key);
    keymap[k][3] = C.glfwGetKey(window, keycode);
    if (keymap[k][2] == 1 && keymap[k][3] == 0) {
      released = true;
    }
    keymap[k][2] = keymap[k][3];
  }
  return released;
}

C.glfwSetKeyCallback(window, (window: any, key: KeyboardKey, scancode: any, action: number, mods: any) => {
  if (action != 2 && keymap[key]) {
    lovr.event.push(action > 0 && 'keypressed' || 'keyreleased', keymap[key]);
  }
});

C.glfwSetCharCallback(window, (window: any, char: number) => {
  lovr.event.push('textinput', string.char(char));
});