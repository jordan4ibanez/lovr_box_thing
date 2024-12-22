export type KeyActionType = "press" | "release" | "hold";
export type KeyAction = (key: KeyCode, action: KeyActionType) => void;

let holdContainer = new Map<KeyCode, boolean>;

lovr.keypressed = (key: KeyCode) => {
  holdContainer.set(key, true);
  // todo: the keypressed callbacks.
};

lovr.keyreleased = (key: KeyCode) => {
  holdContainer.delete(key);
  // todo: the keyreleased callbacks.
};


export function blah(): void {
  holdContainer.forEach((value: boolean, key: KeyCode) => {
    print(key);
  });
}