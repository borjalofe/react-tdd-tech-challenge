# Workshop schedule

## Short (~45 minutes) — talk path

| Block | Minutes | Activity |
|-------|---------|----------|
| Setup | 5 | `pnpm install` / `pnpm dev` / open `/bootcamp?instructor=1` |
| Ex0 | 10 | Read brief, scope, interviewer questions |
| Ex1 | 25 | TDD `applyCommand` + wrap (`pnpm test:starters`) |
| Buffer | 5 | Mark complete / recap seniority signals |

Homework for short is **outside** this 45-minute block.

## Full — continue as far as you can

Requires short done. Starters continue from short solutions.

| Exercise | Focus |
|----------|--------|
| 0 | Extract pure domain (pose display only) |
| 1 | API design: turn/move (no Result) |
| 2 | Result + invalid command |
| 3 | UI: one command per click/key + grid |
| 4 | Trade-offs / TODOs |

Homework: `run(seq)` + obstacles prose + your own tests.

## Quality bar

- Immutable updates
- Wrap with `((n % m) + m) % m`
- Talk trade-offs out loud
- No peeking at `src/domain` / `/` until the track is done
