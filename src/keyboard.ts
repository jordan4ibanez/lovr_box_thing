interface KeyStatus {
  down: boolean;
}

export type KeyActionType = "press" | "release" | "hold";

export type KeyAction = (key: KeyCode, action: KeyActionType) => {

};


let keyMap = new Map<string, KeyStatus>();

lovr.keypressed = (key: KeyCode) => {

};