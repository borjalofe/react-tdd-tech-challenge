# Full / exercise 2 — Result + invalid command

Introduce:

```ts
type Result<T, E = "invalid_command"> =
  | { ok: true; value: T }
  | { ok: false; error: E };
```

Parse raw strings with `parseCommand` / `applyRawCommand`. Valid path still uses `Command`. Invalid input returns `{ ok: false, error: "invalid_command" }` — no `throw`.
