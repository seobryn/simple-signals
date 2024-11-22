/**
 * Signal class
 * This class alows you to create sinals in javascript, so you can connect and disconnect callbacks from it
 *
 * Example:
 *
 * ```
 * signal.connect("test", (item: string) => console.log(item)); // Should print into console the text: `My Test argument` when the signal is emitted
 * const signal = new Signal();
 * signal.emit("test", "My Test argument");
 * ```
 */
export class Signal<T> {
  private signalMap: Map<string, Array<(args: T) => void>>;
  constructor() {
    this.signalMap = new Map();
  }

  /**
   * This function connect a callback to a signal
   *
   * @param key the key of the signal
   * @param callback fuction attached to the signal
   */
  connect(key: string, callback: (args: T) => void): void {
    if (!callback) {
      throw new Error("callback function is required to connect a signal");
    }

    if (!this.signalMap.has(key)) {
      this.signalMap.set(key, [callback]);
      return;
    }

    this.signalMap.get(key)?.push(callback);
  }

  /**
   * This function disconnects a callback from a signal
   *
   * @param key
   * @param callback
   * @returns
   */
  disconnect(key: string, callback: (args: T) => void): void {
    if (!this.signalMap.has(key)) {
      return;
    }

    const callbacks = this.signalMap.get(key);
    if (!callbacks || callbacks.length === 0) {
      return;
    }

    const index = callbacks.indexOf(callback);

    callbacks.splice(index, 1);
  }

  emit(key: string, args: T): void {
    if (!this.signalMap.has(key)) {
      return;
    }

    const callbacks = this.signalMap.get(key);
    if (!callbacks || callbacks.length === 0) {
      return;
    }

    callbacks.forEach((callback) => callback(args));
  }
}
