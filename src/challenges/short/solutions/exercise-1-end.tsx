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

export function wrap(n: number, m: number): number {
  return ((n % m) + m) % m;
}

const LEFT: Record<Facing, Facing> = { N: "W", W: "S", S: "E", E: "N" };
const RIGHT: Record<Facing, Facing> = { N: "E", E: "S", S: "W", W: "N" };

export function applyCommand(
  state: ExplorerState,
  command: Command,
): ExplorerState {
  if (command === "l") return { ...state, facing: LEFT[state.facing] };
  if (command === "r") return { ...state, facing: RIGHT[state.facing] };
  const forward = command === "f";
  const sign = forward ? 1 : -1;
  let dx = 0;
  let dy = 0;
  if (state.facing === "N") dy = sign;
  if (state.facing === "S") dy = -sign;
  if (state.facing === "E") dx = sign;
  if (state.facing === "W") dx = -sign;
  return {
    ...state,
    x: wrap(state.x + dx, state.mapX),
    y: wrap(state.y + dy, state.mapY),
  };
}

export default function Exercise1End() {
  const [state, setState] = useState(() => createInitialState());
  const label = useMemo(
    () => `(${state.x}, ${state.y}, ${state.facing})`,
    [state],
  );
  return (
    <div className="space-y-2 text-sm">
      <p className="font-medium">Short / exercise-1 solution</p>
      <p>Pose: {label}</p>
      <div className="flex gap-2">
        {(["f", "b", "l", "r"] as Command[]).map((c) => (
          <button
            key={c}
            type="button"
            className="rounded border border-[var(--border)] px-2 py-1"
            onClick={() => setState((s) => applyCommand(s, c))}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
