import { useMemo, useState } from "react";

export type Facing = "N" | "E" | "S" | "W";
export type Command = "f" | "b" | "l" | "r";

export type ExplorerState = {
  mapX: number;
  mapY: number;
  x: number;
  y: number;
  facing: Facing;
};

export function createInitialState(mapX = 10, mapY = 10): ExplorerState {
  return { mapX, mapY, x: 0, y: 0, facing: "N" };
}

export function wrap(_n: number, _m: number): number {
  // TODO: ((n % m) + m) % m
  return _n;
}

export function applyCommand(
  state: ExplorerState,
  _command: Command,
): ExplorerState {
  // TODO: implement f/b/l/r immutably
  return state;
}

export default function Exercise1() {
  const [state] = useState(() => createInitialState());
  const label = useMemo(
    () => `(${state.x}, ${state.y}, ${state.facing})`,
    [state],
  );
  return (
    <div className="space-y-2 text-sm">
      <p className="font-medium">Short / exercise-1 starter</p>
      <p>Pose display: {label}</p>
      <p className="text-[var(--muted)]">
        Fill TODOs in this module until <code>pnpm test:starters</code> goes
        green for this file.
      </p>
    </div>
  );
}
