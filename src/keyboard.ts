export type KeyCallback = () => void;

let holdContainer = new Map<KeyCode, boolean>;
let keyPressedCallbacks = new Map<KeyCode, Array<KeyCallback>>;
let keyDownCallbacks = new Map<KeyCode, Array<KeyCallback>>;
let keyReleasedCallbacks = new Map<KeyCode, Array<KeyCallback>>;

lovr.keypressed = (key: KeyCode) => {
  holdContainer.set(key, true);
  keyPressedCallbacks.get(key)?.forEach((callback: KeyCallback) => {
    callback();
  });
};

lovr.keyreleased = (key: KeyCode) => {
  holdContainer.delete(key);
  keyReleasedCallbacks.get(key)?.forEach((callback: KeyCallback) => {
    callback();
  });
};

export function _internalKeyboardUpdateDoNotUse(): void {
  holdContainer.forEach((value: boolean, key: KeyCode) => {
    keyDownCallbacks.get(key)?.forEach((callback: KeyCallback) => {
      callback();
    });
  });
}

/**
 * This will add another key down callback into the main update loop.
 * @param key The keyboard key is.
 * @param callback What this key will do when held down.
 */
export function setKeyDownCallback(key: KeyCode, callback: KeyCallback): void {
  let i = keyDownCallbacks.get(key) || [];
  i.push(callback);
  keyDownCallbacks.set(key, i);
}


/**
 * This will add another key pressed callback.
 * @param key The keyboard key.
 * @param callback What this key will do when pressed.
 */
export function setKeyPressedCallback(key: KeyCode, callback: KeyCallback): void {
  let i = keyPressedCallbacks.get(key) || [];
  i.push(callback);
  keyPressedCallbacks.set(key, i);
  print(i.length);
}

/**
 * This will add another key released callback.
 * @param key The keyboard key.
 * @param callback What this key will do when released.
 */
export function setKeyReleasedCallback(key: KeyCode, callback: KeyCallback): void {
  let i = keyReleasedCallbacks.get(key) || [];
  i.push(callback);
  keyReleasedCallbacks.set(key, i);
  print(i.length);
}