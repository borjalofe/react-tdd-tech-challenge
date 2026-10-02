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
export type Result<T, E = "invalid_command"> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export function createInitialState(mapX = 10, mapY = 10): ExplorerState {
  return { mapX, mapY, x: 0, y: 0, facing: "N" };
}

export function wrap(n: number, m: number): number {
  return ((n % m) + m) % m;
}

const LEFT: Record<Facing, Facing> = { N: "W", W: "S", S: "E", E: "N" };
const RIGHT: Record<Facing, Facing> = { N: "E", E: "S", S: "W", W: "N" };

export function turnLeft(facing: Facing): Facing {
  return LEFT[facing];
}
export function turnRight(facing: Facing): Facing {
  return RIGHT[facing];
}

export function applyCommand(
  state: ExplorerState,
  command: Command,
): ExplorerState {
  if (command === "l") return { ...state, facing: turnLeft(state.facing) };
  if (command === "r") return { ...state, facing: turnRight(state.facing) };
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

export function parseCommand(raw: string): Result<Command> {
  if (raw === "f" || raw === "b" || raw === "l" || raw === "r") {
    return { ok: true, value: raw };
  }
  return { ok: false, error: "invalid_command" };
}

export function applyRawCommand(
  state: ExplorerState,
  raw: string,
): Result<ExplorerState> {
  const parsed = parseCommand(raw);
  if (!parsed.ok) return { ok: false, error: parsed.error };
  return { ok: true, value: applyCommand(state, parsed.value) };
}

export default function Exercise2End() {
  const [state] = useState(() => createInitialState());
  const [lastError, setLastError] = useState<string | null>(null);
  const label = useMemo(
    () => `(${state.x}, ${state.y}, ${state.facing})`,
    [state],
  );
  return (
    <div className="space-y-2 text-sm">
      <p className="font-medium">Full / exercise-2 solution (Result)</p>
      <p>Pose: {label}</p>
      <p className="text-[var(--muted)]">
        Wire parseCommand / applyRawCommand; show errors without throw.
      </p>
      {lastError ? <p className="text-red-400">{lastError}</p> : null}
      <button
        type="button"
        className="rounded border border-[var(--border)] px-2 py-1"
        onClick={() => {
          const r = applyRawCommand(state, "x");
          setLastError(r.ok ? null : r.error);
        }}
      >
        Try invalid "x"
      </button>
    </div>
  );
}
