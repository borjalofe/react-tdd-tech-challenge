import { describe, expect, it } from "vitest";
import {
  applyCommand,
  createInitialState,
  wrap,
} from "./exercise-1";

describe("short/exercise-1 starter", () => {
  it("wrap uses positive modulo", () => {
    expect(wrap(-1, 10)).toBe(9);
  });

  it("f from (0,0,N) goes to (0,1,N)", () => {
    const next = applyCommand(createInitialState(10, 10), "f");
    expect(next).toEqual({ mapX: 10, mapY: 10, x: 0, y: 1, facing: "N" });
  });

  it("walking off the north edge wraps", () => {
    let s = createInitialState(10, 10);
    for (let i = 0; i < 10; i++) s = applyCommand(s, "f");
    expect(s.y).toBe(0);
  });
});
