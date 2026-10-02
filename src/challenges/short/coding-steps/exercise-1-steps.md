# Coding steps — short / exercise-1

1. Read the failing tests in `exercise-1.test.ts`.
2. Implement `wrap` with `((n % m) + m) % m`.
3. Implement `applyCommand` for `f` (N → y+1) until the first test passes.
4. Add `b`, then `l`/`r` using the turn table from the brief.
5. Confirm wrap when you walk off an edge.
6. Keep every update immutable (`{ ...state, ... }`).
