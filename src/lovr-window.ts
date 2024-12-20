import * as ffi from "ffi";
import * as jit from "jit";

let C: AnyTable;

if (ffi.os == "Windows") {
  C = ffi.load("glfw3");
} else {
  C = ffi.C;
}

ffi.cdef(`
	enum {
		GLFW_RESIZABLE = 0x00020003,
		GLFW_VISIBLE = 0x00020004,
		GLFW_DECORATED = 0x00020005,
		GLFW_FLOATING = 0x00020007
	};
	typedef struct {
		int width;
		int height;
		unsigned char* pixels;
	} GLFWimage;
	typedef struct GLFWvidmode {
		int width;
		int height;
		int refreshRate;
	} GLFWvidmode;

	typedef struct GLFWwindow GLFWwindow;
	GLFWwindow* os_get_glfw_window(void);
	
	typedef struct GLFWmonitor GLFWmonitor;
	GLFWmonitor** glfwGetMonitors(int *count);
	GLFWmonitor* glfwGetWindowMonitor(GLFWwindow* window);
	GLFWmonitor* glfwGetPrimaryMonitor(void);

	void glfwGetMonitorPos(GLFWmonitor* monitor, int *xpos, int *ypos);
	const char* glfwGetMonitorName(GLFWmonitor* monitor);
	const GLFWvidmode* glfwGetVideoMode(GLFWmonitor* monitor);
	void glfwSetWindowMonitor(GLFWwindow* window, GLFWmonitor* monitor, int xpos, int ypos, int width, int height, int refreshRate);
	void glfwGetMonitorWorkarea(GLFWmonitor *monitor, int *xpos, int *ypos, int *width, int *height);
	
	// icon
	void glfwSetWindowIcon(GLFWwindow* window, int count, const GLFWimage *images);
	
	// attributes
	void glfwSetWindowAttrib(GLFWwindow* window, int attrib, int value); //+
	int glfwGetWindowAttrib(GLFWwindow* window, int attrib); //+
	
	// size & limits
	void glfwSetWindowSize(GLFWwindow* window, int width, int height); //-
	void glfwGetWindowSize(GLFWwindow* window, int *width, int *height); //-
	void glfwSetWindowSizeLimits(GLFWwindow* window, int minwidth, int minheight, int maxwidth, int maxheight); //-
	
	// position
	void glfwSetWindowPos(GLFWwindow* window, int xpos, int ypos);
	void glfwGetWindowPos(GLFWwindow* window, int *xpos, int *ypos);
	
	// minimize maximize restore
	void glfwMaximizeWindow(GLFWwindow* window);
	void glfwIconifyWindow(GLFWwindow *window);
	void glfwRestoreWindow(GLFWwindow *window);
	
	// title
	void glfwSetWindowTitle(GLFWwindow* window, const char* title);
	
	// visible
	void glfwShowWindow(GLFWwindow* window);
	void glfwHideWindow(GLFWwindow* window);
	
	// focus
	void glfwFocusWindow(GLFWwindow* window);
	
	// attention
	void glfwRequestWindowAttention(GLFWwindow* window);
	
	// opacity
	void glfwSetWindowOpacity(GLFWwindow* window, float opacity);
	float glfwGetWindowOpacity(GLFWwindow* window);

	// callbacks
	typedef void(*GLFWwindowsizefun) (GLFWwindow*, int, int); // size changed
	GLFWwindowsizefun glfwSetWindowSizeCallback(GLFWwindow* window, GLFWwindowsizefun callback );

	typedef void(*GLFWwindowmaximizefun) (GLFWwindow*, int); // maximize
	GLFWwindowmaximizefun glfwSetWindowMaximizeCallback(GLFWwindow* window, GLFWwindowmaximizefun callback);

	typedef void(*GLFWwindowposfun) (GLFWwindow*, int, int); // position changed
	GLFWwindowposfun glfwSetWindowPosCallback(GLFWwindow* window, GLFWwindowposfun callback);

	typedef void(* GLFWdropfun) (GLFWwindow*, int, const char *[]);
	GLFWdropfun glfwSetDropCallback(GLFWwindow* window, GLFWdropfun callback);	
	
`);

const W = ffi.C.os_get_glfw_window();
let window: LuaTable;
let __monitors;

let __params = { // default parameters list;
  title: 'LÖVR',
  icon: null,
  fullscreen: false,
  fullscreentype: "desktop",
  width: 1080,
  height: 600,
  minwidth: 320,
  minheight: 240,
  x: null,
  y: null,
  display: 1,
  centered: false,
  topmost: false,
  borderless: false,
  resizable: false,
  opacity: 1,
  vsync: 1,
  msaa: 0
};