"use client";

import { Check } from "lucide-react";
import { moodTagLabels, type MoodTag } from "@/data/moods";

type Props = {
  options: MoodTag[];
  selected: MoodTag[];
  onToggle: (tag: MoodTag) => void;
  dark?: boolean;
};

export default function MoodSelector({ options, selected, onToggle, dark = false }: Props) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="취향 선택">
      {options.map((tag) => {
        const on = selected.includes(tag);
        const base = dark
          ? on
            ? "border-brand bg-brand text-paper"
            : "border-paper/30 text-paper hover:border-paper"
          : on
            ? "border-ink bg-ink text-paper"
            : "border-ink/25 hover:border-ink";
        return (
          <button
            key={tag}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(tag)}
            className={`inline-flex min-h-12 items-center gap-2 border px-4 text-[15px] font-bold transition-colors ${base}`}
          >
            {on && <Check size={16} strokeWidth={3} />}
            {moodTagLabels[tag]}
          </button>
        );
      })}
    </div>
  );
}
