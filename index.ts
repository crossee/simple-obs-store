import SafeEventEmitter from "@metamask/safe-event-emitter";

export default class ObservableStore extends SafeEventEmitter {
  private _state: any;
  constructor(initState = {}) {
    super();
    this._state = initState;
  }

  getState() {
    return this._getState();
  }

  putState(newState: any) {
    this._putState(newState);
    this.emit("update", newState);
  }

  updateState(partialState: any) {
    if (partialState && typeof partialState === "object") {
      const state = this.getState();
      const newState = Object.assign({}, state, partialState);
      this.putState(newState);
    } else {
      this.putState(partialState);
    }
  }

  subscribe(handler: any) {
    this.on("update", handler);
  }

  unsubscribe(handler: any) {
    this.removeListener("update", handler);
  }

  _getState() {
    return this._state;
  }

  _putState(newState: any) {
    this._state = newState;
  }
}
