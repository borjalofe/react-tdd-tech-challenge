import { Suspense, lazy, type ComponentType } from "react";

const modules = import.meta.glob([
  "../../challenges/*/exercises/exercise-*.tsx",
  "../../challenges/*/solutions/exercise-*-end.tsx",
]);


function resolvePath(day: string, exercise: string, solution: boolean) {
  const base = solution
    ? `../../challenges/${day}/solutions/${exercise}-end.tsx`
    : `../../challenges/${day}/exercises/${exercise}.tsx`;
  return base;
}

export function ChallengeLoader({
  day,
  exercise,
  showSolution,
}: {
  day: string;
  exercise: string;
  showSolution: boolean;
}) {
  const path = resolvePath(day, exercise, showSolution);
  const loader = modules[path] as
    | (() => Promise<{ default: ComponentType }>)
    | undefined;

  if (!loader) {
    return (
      <p className="text-sm text-[var(--muted)]">
        No live component for <code>{path}</code>
      </p>
    );
  }

  const Lazy = lazy(loader);
  return (
    <Suspense fallback={<p className="text-sm">Loading challenge…</p>}>
      <Lazy />
    </Suspense>
  );
}
