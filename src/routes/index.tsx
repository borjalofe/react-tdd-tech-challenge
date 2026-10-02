import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  applyCommand,
  createInitialState,
  type Command,
  type ExplorerState,
} from "@/domain/explorer";

export const Route = createFileRoute("/")({
  component: PlaygroundPage,
});

function PlaygroundPage() {
  const [mapX, setMapX] = useState(10);
  const [mapY, setMapY] = useState(10);
  const [state, setState] = useState<ExplorerState>(() =>
    createInitialState(10, 10),
  );

  const cells = useMemo(() => {
    const rows: Array<Array<{ x: number; y: number }>> = [];
    for (let row = mapY - 1; row >= 0; row--) {
      const cols: Array<{ x: number; y: number }> = [];
      for (let col = 0; col < mapX; col++) cols.push({ x: col, y: row });
      rows.push(cols);
    }
    return rows;
  }, [mapX, mapY]);

  function resize(nextX: number, nextY: number) {
    const x = Math.max(1, nextX);
    const y = Math.max(1, nextY);
    setMapX(x);
    setMapY(y);
    setState(createInitialState(x, y));
  }

  function onCommand(cmd: Command) {
    setState((s) => applyCommand(s, cmd));
  }

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Warehouse explorer</h1>
          <p className="text-sm text-[var(--muted)]">
            Reference playground (`src/domain`). Do not peek during short/full
            until you finish the track — see AGENTS.md.
          </p>
        </div>
        <Link to="/bootcamp" className="text-sm">
          Open bootcamp →
        </Link>
      </header>

      <section className="rounded-lg border border-[var(--border)] bg-[var(--panel)] p-4 space-y-3">
        <div className="flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2">
            mapX
            <input
              type="number"
              min={1}
              className="w-20 rounded border border-[var(--border)] bg-transparent px-2 py-1"
              value={mapX}
              onChange={(e) => resize(Number(e.target.value), mapY)}
            />
          </label>
          <label className="flex items-center gap-2">
            mapY
            <input
              type="number"
              min={1}
              className="w-20 rounded border border-[var(--border)] bg-transparent px-2 py-1"
              value={mapY}
              onChange={(e) => resize(mapX, Number(e.target.value))}
            />
          </label>
          <p>
            Pose: ({state.x}, {state.y}, {state.facing})
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["f", "b", "l", "r"] as Command[]).map((c) => (
            <button
              key={c}
              type="button"
              className="rounded border border-[var(--border)] px-3 py-1.5 text-sm hover:bg-[var(--border)]/40"
              onClick={() => onCommand(c)}
            >
              {c}
            </button>
          ))}
          <button
            type="button"
            className="rounded border border-[var(--border)] px-3 py-1.5 text-sm"
            onClick={() => setState(createInitialState(mapX, mapY))}
          >
            Reset
          </button>
        </div>
        <div
          className="inline-grid gap-0.5 border border-[var(--border)] p-1"
          style={{ gridTemplateColumns: `repeat(${mapX}, 1.25rem)` }}
        >
          {cells.flat().map((cell) => {
            const here = cell.x === state.x && cell.y === state.y;
            return (
              <div
                key={`${cell.x}-${cell.y}`}
                className={`h-5 w-5 text-center text-[10px] leading-5 ${
                  here ? "bg-[var(--accent)] text-black" : "bg-black/10"
                }`}
                title={`${cell.x},${cell.y}`}
              >
                {here ? state.facing : ""}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
