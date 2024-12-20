import * as ffi from "ffi";
import * as jit from "jit";

let C: AnyTable;

if (ffi.os == "Windows") {
	C = ffi.load("glfw3");
} else {
	C = ffi.C;
}

const Cstr = ffi.string;

//!! remove me!!
export function blah(): void { print("blah"); }

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
let window: AnyTable = {};
let __monitors: AnyTable = {};

let __params: AnyTable = { // default parameters list;
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (conf != null) {
	for (const [k, v] of Object.entries(conf)) {
		__params[k] = v;
	}
	if (type(__params.icon) == "string") {
		__params.icon = lovr.data.newImage(__params.icon);
	}
	conf = null;
}

function check_monitor(index: number, throwerr: boolean) {
	if (type(index) != 'number') {
		if (throwerr) {
			error('Bad argument #1: number expected got ' + type(index), 3);
		} else {
			return false;
		}
	}

	const dcnt = window.getDisplayCount();
	if (index < 1 || index > dcnt) {
		if (throwerr) {
			error('Invalid display index: ' + tostring(index), 3);
		} else {
			return false;
		}
	}

	return true;
}


window.getDisplayName = (index: number): any => {
	check_monitor(index, true);
	return Cstr(C.glfwGetMonitorName(__monitors[index - 1]));
};

window.getDisplayDimensions = (index: number): any => {
	check_monitor(index, true);
	const screenmode = C.glfwGetVideoMode(__monitors[index - 1]);
	return screenmode.width, screenmode.height;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.setIcon = (source: any) => {
	if (!source) {
		C.glfwSetWindowIcon(W, 0, null);
		__params.icon = null;
		return;
	}

	if (type(source) == 'string') {
		source = lovr.data.newImage(source);
	} else if (tostring(source) != 'Image') {
		error('Bad argument #1 to setIcon (Image expected)', 2);
	}
	__params.icon = source;

	source = source as Texture;

	const icon = ffi.new_('GLFWimage', source.getWidth(), source.getHeight(), source.getBlob().getPointer());
	C.glfwSetWindowIcon(W, 1, icon);
};

window.getIcon = (): any => {
	return tostring(__params.icon) == 'Image' && __params.icon || null;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.setOpacity = (value: number) => {
	value = math.max(0, math.min(value, 1));
	C.glfwSetWindowOpacity(W, value);
};

window.getOpacity = (): number => {
	return C.glfwGetWindowOpacity(W);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////