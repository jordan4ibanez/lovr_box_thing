assert(type(jit) == 'table' && lovr.system.getOS() != 'Android', 'lovr-mouse cannot run on this platform');
import * as ffi from "ffi";
const C: AnyTable = ffi.os == 'Windows' && ffi.load('glfw3') || ffi.C;

/**
 * Note: This was half hazardly translated to make sure it compiles.
 * Things may look kind of weird in here.
 */

// A blank cursor type.
export type Cursor = LuaUserdata;

ffi.cdef(`
  enum {
    GLFW_CURSOR = 0x00033001,
    GLFW_CURSOR_NORMAL = 0x00034001,
    GLFW_CURSOR_HIDDEN = 0x00034002,
    GLFW_CURSOR_DISABLED = 0x00034003,
    GLFW_ARROW_CURSOR = 0x00036001,
    GLFW_IBEAM_CURSOR = 0x00036002,
    GLFW_CROSSHAIR_CURSOR = 0x00036003,
    GLFW_HAND_CURSOR = 0x00036004,
    GLFW_HRESIZE_CURSOR = 0x00036005,
    GLFW_VRESIZE_CURSOR = 0x00036006
  };

  typedef struct {
    int width;
    int height;
    unsigned char* pixels;
  } GLFWimage;

  typedef struct GLFWcursor GLFWcursor;
  typedef struct GLFWwindow GLFWwindow;
  typedef void(*GLFWmousebuttonfun)(GLFWwindow*, int, int, int);
  typedef void(*GLFWcursorposfun)(GLFWwindow*, double, double);
  typedef void(*GLFWscrollfun)(GLFWwindow*, double, double);

  GLFWwindow* os_get_glfw_window(void);
  void glfwGetInputMode(GLFWwindow* window, int mode);
  void glfwSetInputMode(GLFWwindow* window, int mode, int value);
  void glfwGetCursorPos(GLFWwindow* window, double* x, double* y);
  void glfwSetCursorPos(GLFWwindow* window, double x, double y);
  GLFWcursor* glfwCreateCursor(const GLFWimage* image, int xhot, int yhot);
  GLFWcursor* glfwCreateStandardCursor(int kind);
  void glfwSetCursor(GLFWwindow* window, GLFWcursor* cursor);
  int glfwGetMouseButton(GLFWwindow* window, int button);
  void glfwGetWindowSize(GLFWwindow* window, int* width, int* height);
  void glfwDestroyCursor(GLFWcursor* cursor);
  GLFWmousebuttonfun glfwSetMouseButtonCallback(GLFWwindow* window, GLFWmousebuttonfun callback);
  GLFWcursorposfun glfwSetCursorPosCallback(GLFWwindow* window, GLFWcursorposfun callback);
  GLFWcursorposfun glfwSetScrollCallback(GLFWwindow* window, GLFWscrollfun callback);
`);

const window = C.os_get_glfw_window();

// LÖVR uses framebuffer scale for everything, but glfw uses window scale for events.
// It is necessary to convert between the two at all boundaries.
export function getScale(): number {
  const x: AnyTable = ffi.new_('int[1]');
  const y: AnyTable = ffi.new_('int[1]');
  C.glfwGetWindowSize(window, x, y);
  return lovr.system.getWindowWidth() / x[0];
}

export function getX(): number {
  const x: AnyTable = ffi.new_('double[1]');
  C.glfwGetCursorPos(window, x, null);
  return x[0] * getScale();
}

export function getY(): number {
  const y: AnyTable = ffi.new_('double[1]');
  C.glfwGetCursorPos(window, null, y);
  return y[0] * getScale();
}

export function getPosition(): [number, number] {
  const x: AnyTable = ffi.new_('double[1]');
  const y: AnyTable = ffi.new_('double[1]');
  const scale = getScale();
  C.glfwGetCursorPos(window, x, y);
  return [x[0] * scale, y[0] * scale];
}

export function setX(x: number): void {
  const y = getY();
  const scale = getScale();
  C.glfwSetCursorPos(window, x / scale, y / scale);
}

export function setY(y: number): void {
  const x = getX();
  const scale = getScale();
  C.glfwSetCursorPos(window, x / scale, y / scale);
}

export function setPosition(x: number, y: number): void {
  const scale = getScale();
  C.glfwSetCursorPos(window, x / scale, y / scale);
}

export function isDown(...button: number[]): boolean {
  for (const k of Object.values(button)) {
    if (C.glfwGetMouseButton(window, k - 1) > 0) {
      return true;
    }
  }
  return false;
}

export function getRelativeMode(): boolean {
  return C.glfwGetInputMode(window, C.GLFW_CURSOR) == C.GLFW_CURSOR_DISABLED;
}

export function setRelativeMode(enable: boolean): void {
  C.glfwSetInputMode(window, C.GLFW_CURSOR, enable && C.GLFW_CURSOR_DISABLED || C.GLFW_CURSOR_NORMAL);
}

export function newCursor(source: string | Blob | Image, hotx: number, hoty: number): Cursor {
  if (type(source) == 'string') {
    source = lovr.data.newImage(source as string);
  } else if (tostring(source) == 'Blob') {
    source = lovr.data.newImage(source as Blob);
  } else {
    assert(tostring(source) == 'Image', 'Bad argument #1 to newCursor (Image expected)');
  }

  source = source as Image;

  const image = ffi.new_('GLFWimage', source.getWidth(), source.getHeight(), source.getPointer());
  return ffi.gc(C.glfwCreateCursor(image, hotx || 0, hoty || 0), C.glfwDestroyCursor) as Cursor;
}

declare type SystemCursorKind = "arrow" | "ibeam" | "crosshair" | "hand" | "sizewe" | "sizens";

export function getSystemCursor(kind: SystemCursorKind): Cursor {
  const kinds: AnyTable = {
    arrow: C.GLFW_ARROW_CURSOR,
    ibeam: C.GLFW_IBEAM_CURSOR,
    crosshair: C.GLFW_CROSSHAIR_CURSOR,
    hand: C.GLFW_HAND_CURSOR,
    sizewe: C.GLFW_HRESIZE_CURSOR,
    sizens: C.GLFW_VRESIZE_CURSOR
  };
  assert(kinds[kind], string.format('Unknown cursor %q', tostring(kind)));
  return ffi.gc(C.glfwCreateStandardCursor(kinds[kind]), C.glfwDestroyCursor) as Cursor;
}

export function setCursor(cursor: Cursor): void {
  C.glfwSetCursor(window, cursor);
}

C.glfwSetMouseButtonCallback(window, (target: any, button: number, action: number, mods: any) => {
  if (target == window) {
    const [x, y] = getPosition();
    lovr.event.push(action > 0 && 'mousepressed' || 'mousereleased', x, y, button + 1, false);
  }
});

let [px, py] = getPosition();
C.glfwSetCursorPosCallback(window, (target: any, x: number, y: number) => {
  if (target == window) {
    const scale = getScale();
    x = x * scale;
    y = y * scale;
    lovr.event.push('mousemoved', x, y, x - px, y - py, false);
    px = x;
    py = y;
  }
});

C.glfwSetScrollCallback(window, (target: any, x: number, y: number) => {
  if (target == window) {
    const scale = getScale();
    lovr.event.push('wheelmoved', x * scale, y * scale);
  }
});