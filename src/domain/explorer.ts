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

export const DEFAULT_MAP_X = 10;
export const DEFAULT_MAP_Y = 10;

export function createInitialState(
  mapX = DEFAULT_MAP_X,
  mapY = DEFAULT_MAP_Y,
): ExplorerState {
  if (mapX <= 0 || mapY <= 0) {
    throw new Error("mapX and mapY must both be > 0");
  }
  return { mapX, mapY, x: 0, y: 0, facing: "N" };
}

/** Positive modulo for wrap: ((n % m) + m) % m */
export function wrap(n: number, m: number): number {
  return ((n % m) + m) % m;
}

const LEFT: Record<Facing, Facing> = {
  N: "W",
  W: "S",
  S: "E",
  E: "N",
};

const RIGHT: Record<Facing, Facing> = {
  N: "E",
  E: "S",
  S: "W",
  W: "N",
};

export function turnLeft(facing: Facing): Facing {
  return LEFT[facing];
}

export function turnRight(facing: Facing): Facing {
  return RIGHT[facing];
}

function delta(facing: Facing, forward: boolean): { dx: number; dy: number } {
  const sign = forward ? 1 : -1;
  switch (facing) {
    case "N":
      return { dx: 0, dy: sign };
    case "E":
      return { dx: sign, dy: 0 };
    case "S":
      return { dx: 0, dy: -sign };
    case "W":
      return { dx: -sign, dy: 0 };
  }
}

export function move(
  state: ExplorerState,
  forward: boolean,
): ExplorerState {
  const { dx, dy } = delta(state.facing, forward);
  return {
    ...state,
    x: wrap(state.x + dx, state.mapX),
    y: wrap(state.y + dy, state.mapY),
  };
}

export function applyCommand(
  state: ExplorerState,
  command: Command,
): ExplorerState {
  switch (command) {
    case "f":
      return move(state, true);
    case "b":
      return move(state, false);
    case "l":
      return { ...state, facing: turnLeft(state.facing) };
    case "r":
      return { ...state, facing: turnRight(state.facing) };
  }
}

export function parseCommand(raw: string): Result<Command> {
  if (raw === "f" || raw === "b" || raw === "l" || raw === "r") {
    return { ok: true, value: raw };
  }
  return { ok: false, error: "invalid_command" };
}

/** Apply a raw letter; used after full/ex2 Result pattern. */
export function applyRawCommand(
  state: ExplorerState,
  raw: string,
): Result<ExplorerState> {
  const parsed = parseCommand(raw);
  if (!parsed.ok) return { ok: false, error: parsed.error };
  return { ok: true, value: applyCommand(state, parsed.value) };
}

/** Homework: run a sequence of letters (f/b/l/r only). Stops on first invalid. */
export function run(
  state: ExplorerState,
  sequence: string,
): Result<ExplorerState> {
  let current = state;
  for (const ch of sequence) {
    const next = applyRawCommand(current, ch);
    if (!next.ok) return next;
    current = next.value;
  }
  return { ok: true, value: current };
}
