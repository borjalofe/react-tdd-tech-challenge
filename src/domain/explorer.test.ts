import { describe, expect, it } from "vitest";
import {
  applyCommand,
  createInitialState,
  parseCommand,
  turnLeft,
  turnRight,
  wrap,
} from "./explorer";

describe("wrap", () => {
  it("uses ((n % m) + m) % m", () => {
    expect(wrap(-1, 10)).toBe(9);
    expect(wrap(10, 10)).toBe(0);
    expect(wrap(5, 10)).toBe(5);
  });
});

describe("applyCommand", () => {
  it("starts at (0,0,N) and f increments y", () => {
    const s0 = createInitialState(10, 10);
    expect(s0).toEqual({ mapX: 10, mapY: 10, x: 0, y: 0, facing: "N" });
    const s1 = applyCommand(s0, "f");
    expect(s1).toEqual({ mapX: 10, mapY: 10, x: 0, y: 1, facing: "N" });
  });

  it("wraps when leaving the north edge", () => {
    let s = createInitialState(10, 10);
    for (let i = 0; i < 10; i++) s = applyCommand(s, "f");
    expect(s.y).toBe(0);
  });

  it("turns: N+l→W, N+r→E", () => {
    expect(turnLeft("N")).toBe("W");
    expect(turnRight("N")).toBe("E");
  });

  it("b is inverse of f", () => {
    const s0 = createInitialState(10, 10);
    const forward = applyCommand(s0, "f");
    const back = applyCommand(forward, "b");
    expect(back).toEqual(s0);
  });

  it("returns a new object (immutable)", () => {
    const s0 = createInitialState();
    const s1 = applyCommand(s0, "f");
    expect(s1).not.toBe(s0);
  });
});

describe("parseCommand", () => {
  it("accepts f/b/l/r", () => {
    expect(parseCommand("f")).toEqual({ ok: true, value: "f" });
  });

  it("rejects other letters", () => {
    expect(parseCommand("x")).toEqual({ ok: false, error: "invalid_command" });
  });
});
