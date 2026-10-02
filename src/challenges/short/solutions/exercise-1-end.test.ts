import { describe, expect, it } from "vitest";
import { applyCommand, createInitialState, wrap } from "./exercise-1-end";

describe("short/exercise-1 solution", () => {
  it("wrap + f + edge", () => {
    expect(wrap(-1, 10)).toBe(9);
    expect(applyCommand(createInitialState(), "f").y).toBe(1);
    let s = createInitialState();
    for (let i = 0; i < 10; i++) s = applyCommand(s, "f");
    expect(s.y).toBe(0);
  });
});
