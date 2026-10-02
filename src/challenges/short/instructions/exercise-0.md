# Exercise 0 — Read & scope the brief

You are building a **warehouse explorer**: an AGV that moves on a rectangular floor.

## Published rules

- State type: `ExplorerState` with `mapX`, `mapY`, `x`, `y`, `facing`
- Default map: **10 × 10** cells; coordinates in `[0, mapX)` / `[0, mapY)`
- Start pose: **`(0, 0, N)`**
- Commands (one letter): `f` forward, `b` backward, `l` turn left (CCW, no move), `r` turn right (CW, no move)
- Wrap with `((n % m) + m) % m` — the explorer never "leaves" the map
- Movement: N+f → y+1, E+f → x+1, S+f → y-1, W+f → x-1; `b` is inverse
- Turns: N+l→W, N+r→E, W+l→S, W+r→N, S+l→E, S+r→W, E+l→N, E+r→S
- Updates are **immutable** (always return a new object)
- Invalid commands are **out of scope for short**

## Your job this step

1. List what is **in** / **out** for a ~45 minute interview slice.
2. Write 3 questions you would ask the interviewer before coding.
3. Do **not** open `src/domain` or `/` yet (see AGENTS.md).

Mark complete when you have answers written somewhere (notes file is fine).
