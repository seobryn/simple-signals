import { Signal } from "../src/signal";

describe("Signal Test Suite", () => {
  let signal: Signal<string>;

  beforeEach(() => {
    signal = new Signal();
  });

  it("should connect a callback to a signal and emit it", () => {
    const callback = jest.fn();
    signal.connect("test", callback);
    signal.emit("test", "test");
    expect(callback).toHaveBeenCalledWith("test");
  });

  it("should disconnect a callback from a signal", () => {
    const callback = jest.fn();
    signal.connect("test", callback);
    signal.disconnect("test", callback);
    signal.emit("test", "test");
    expect(callback).not.toHaveBeenCalled();
  });

  it("should connect signal without callback", () => {
    expect(() => {
      signal.connect("test", undefined as any);
    }).toThrow("callback function is required to connect a signal");
  });

  it("should call a signal without connected callbacks", () => {
    signal.emit("test", "test");
    expect(() => {
      signal.emit("test", "test");
    }).not.toThrow();
  });

  it("try to discconnect undefined signal", () => {
    expect(() => {
      signal.disconnect("test", () => {});
    }).not.toThrow();
  });

  it("should add multiple callbacks to the same key", () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    signal.connect("test", callback1);
    signal.connect("test", callback2);
    signal.emit("test", "test");
    expect(callback1).toHaveBeenCalledWith("test");
    expect(callback2).toHaveBeenCalledWith("test");
  });

  it("should remove multiple callbacks from the same key", () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    signal.connect("test", callback1);
    signal.connect("test", callback2);
    signal.disconnect("test", callback1);
    signal.disconnect("test", callback2);
    signal.disconnect("test", callback1);
    signal.emit("test", "test");
    expect(callback2).not.toHaveBeenCalled();
  });
});
