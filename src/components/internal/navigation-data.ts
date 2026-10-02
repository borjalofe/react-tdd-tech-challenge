import type { Day } from "@/types/challenge";

export const navigationData: Day[] = [
  {
    id: "short",
    title: "Short (~45 min)",
    exercises: [
      { id: "exercise-0", title: "0 · Read & scope the brief", type: "reading" },
      { id: "exercise-1", title: "1 · applyCommand + wrap", type: "exercise" },
      { id: "homework", title: "Homework (outside talk)", type: "homework" },
    ],
  },
  {
    id: "full",
    title: "Full (continue)",
    exercises: [
      { id: "exercise-0", title: "0 · Extract pure domain", type: "exercise" },
      { id: "exercise-1", title: "1 · API design (turn/move)", type: "exercise" },
      { id: "exercise-2", title: "2 · Result + invalid command", type: "exercise" },
      { id: "exercise-3", title: "3 · UI: map / keys / grid", type: "exercise" },
      { id: "exercise-4", title: "4 · Trade-offs + TODOs", type: "exercise" },
      { id: "homework", title: "Homework (run + obstacles)", type: "homework" },
    ],
  },
];
