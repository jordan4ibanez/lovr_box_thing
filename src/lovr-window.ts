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

function check_monitor(index: number, throwerr?: boolean) {
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



window.setPosition = (x: number, y: number) => {
	C.glfwSetWindowPos(W, x || 0, y || 0);
};

window.getPosition = (): [any, any] => {
	const x: AnyTable = ffi.new_('int[1]');
	const y: AnyTable = ffi.new_('int[1]');
	C.glfwGetWindowPos(W, x, y);
	return [x[0], y[0]];
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.maximize = () => {
	C.glfwMaximizeWindow(W);
};

window.minimize = () => {
	C.glfwIconifyWindow(W);
};

window.restore = () => {
	C.glfwRestoreWindow(W);
};

window.focus = () => {
	C.glfwFocusWindow(W);
};

window.requestAttention = () => {
	C.glfwRequestWindowAttention(W);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.setTitle = (title: string) => {
	C.glfwSetWindowTitle(W, title);
	__params.title = title;
};

window.getTitle = () => {
	return __params.title;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.visible = (state: boolean) => {
	if (state) {
		C.glfwShowWindow(W);
	} else {
		C.glfwHideWindow(W);
	}
};

window.isVisible = (): boolean => {
	return C.glfwGetWindowAttrib(W, C.GLFW_VISIBLE) == 1;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.setFullscreen = (state: boolean, fstype: string, index: number) => {
	index = index || 1;
	index = check_monitor(index) && index - 1 || 0;
	const screenmode = C.glfwGetVideoMode(__monitors[index]);
	if (state) {
		assert(fstype == 'desktop' || fstype == 'exclusive', 'Invalid fullscreen type \'' + tostring(fstype) + '\', expected one of : \'exclusive\' or \'desktop\'');

		if (fstype == 'desktop') {
			C.glfwSetWindowAttrib(W, C.GLFW_DECORATED, 0);

			const mx: AnyTable = ffi.new_('int[1]');
			const my: AnyTable = ffi.new_('int[1]');
			C.glfwGetMonitorPos(__monitors[index], mx, my);

			C.glfwSetWindowMonitor(W, null, mx[0], my[0], screenmode.width, screenmode.height, 0);
		} else if (fstype == 'exclusive') {
			C.glfwSetWindowMonitor(W, __monitors[index], 0, 0, screenmode.width, screenmode.height, 0);
		}

		__params.fullscreentype = fstype;
		__params.fullscreen = true;
	} else {
		__params.fullscreen = false;
		__params.fullscreentype = null;

		if (__params.x == null || __params.y == null) { }
		__params.x = math.random(0, screenmode.width * 0.3);
		__params.y = math.random(0, screenmode.height * 0.3);
		// todo: figure out where this variable comes from.
		// centered = false;
	}

	C.glfwSetWindowAttrib(W, C.GLFW_DECORATED, __params.borderless && 0 || 1);
	C.glfwSetWindowMonitor(W, null, __params.x, __params.y, __params.width, __params.height, 0);
};


window.getFullscreen = (): [boolean, FullScreenType] => {
	__params.fullscreen = C.glfwGetWindowMonitor(W) != null;
	return [__params.fullscreen, __params.fullscreentype];
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.getMode = (): [number, number, AnyTable] => {
	let flags: AnyTable = {};

	flags.fullscreen = C.glfwGetWindowMonitor(W) != null;
	flags.fullscreentype = __params.fullscreentype;

	flags.x = ffi.new_('int[1]');
	flags.y = ffi.new_('int[1]');
	C.glfwGetWindowPos(W, flags.x, flags.y);
	flags.x, flags.y = flags.x[0], flags.y[0];

	let width: AnyTable = ffi.new_('int[1]');
	let height: AnyTable = ffi.new_('int[1]');
	C.glfwGetWindowSize(W, width, height);
	width = width[0];
	height = height[0];

	flags.msaa = __params.msaa;
	flags.vsync = __params.vsync;

	flags.topmost = C.glfwGetWindowAttrib(W, C.GLFW_FLOATING) == 1;
	flags.opacity = C.glfwGetWindowOpacity(W);

	flags.borderless = C.glfwGetWindowAttrib(W, C.GLFW_DECORATED) == 0;
	flags.resizable = C.glfwGetWindowAttrib(W, C.GLFW_RESIZABLE) == 1;
	flags.centered = __params.centered;

	flags.display = __params.display;

	flags.minwidth = __params.minwidth;
	flags.minheight = __params.minheight;

	return [width as unknown as number, height as unknown as number, flags];
};

window.setMode = (width: number, height: number, flags?: AnyTable) => {
	if (flags) {
		let _a, _b, mode = window.getMode();
		for (let [k, v] of Object.entries(mode)) {
			if (!flags[k as string] || flags[k as string] == null) {
				flags[k as string] = v;
			}
		}

		flags.display = check_monitor(flags.display) && flags.display || 1;

		if (flags.centered) {
			const screenmode = C.glfwGetVideoMode(__monitors[flags.display - 1]);
			const mx: AnyTable = ffi.new_('int[1]');
			const my: AnyTable = ffi.new_('int[1]');
			C.glfwGetMonitorPos(__monitors[flags.display - 1], mx, my);

			flags.x = mx[0] + screenmode.width * 0.5 - width * 0.5;
			flags.y = my[0] + screenmode.height * 0.5 - height * 0.5;
		}
		C.glfwSetWindowPos(W, flags.x, flags.y);

		C.glfwSetWindowSizeLimits(W, flags.minwidth, flags.minheight, -1, -1);

		C.glfwSetWindowAttrib(W, C.GLFW_DECORATED, flags.borderless && 0 || 1);
		C.glfwSetWindowAttrib(W, C.GLFW_FLOATING, flags.topmost && 1 || 0);
		C.glfwSetWindowAttrib(W, C.GLFW_RESIZABLE, flags.resizable && 1 || 0);

		flags.opacity = math.max(0, math.min(flags.opacity, 1));
		C.glfwSetWindowOpacity(W, flags.opacity);

		if (flags.fullscreen) {
			window.setFullscreen(flags.fullscreen, flags.fullscreentype, flags.display);
		} else {
			C.glfwSetWindowSize(W, width, height);
		}

		__params.width = width;
		__params.height = height;
		for (let [k, v] of Object.entries(flags)) {
			__params[k] = v;
		}
	} else {
		C.glfwSetWindowSize(W, width, height);
	}
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

