import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Group } from "@/data/groups";

type Props = {
  group: Group;
  score: number;
  highlight?: boolean;
  dark?: boolean;
};

export default function MatchResultCard({ group, score, highlight = false, dark = false }: Props) {
  const border = dark ? "border-paper/25" : "border-ink";
  const muted = dark ? "text-paper/60" : "text-mute";
  return (
    <article
      className={`flex h-full flex-col border ${border} ${highlight ? (dark ? "bg-paper text-ink" : "bg-ink text-paper") : ""}`}
    >
      <div className="flex items-baseline justify-between px-5 pt-5">
        <p className="font-display text-5xl leading-none text-brand tabular-nums">
          {score}%<span className="ml-2 align-top text-sm tracking-[0.18em]">MATCH</span>
        </p>
        <p className={`text-xs font-bold tracking-[0.14em] ${highlight ? "opacity-60" : muted}`}>
          {group.meet.day} {group.meet.time}
        </p>
      </div>

      <div className="px-5 pt-6">
        <h3 className="font-display text-[1.7rem] leading-none tracking-wide">{group.title}</h3>
        <p className="mt-3 whitespace-pre-line text-lg font-bold leading-snug tracking-[-0.02em]">“{group.description}”</p>
      </div>

      <div className="mt-6 px-5">
        <div className="flex items-end justify-between">
          <p className="font-display text-3xl tabular-nums">
            {group.currentMembers} <span className="opacity-40">/ {group.maxMembers}</span>
          </p>
          <p className={`text-right text-xs font-bold leading-relaxed ${highlight ? "opacity-70" : muted}`}>
            First Match {group.firstMatchCount}
            <br />
            Existing Fan {group.existingFanCount}
          </p>
        </div>
        <div className="mt-2 flex gap-1" aria-hidden>
          {Array.from({ length: group.maxMembers }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 ${i < group.currentMembers ? "bg-brand" : highlight || dark ? "bg-current opacity-20" : "bg-ink/15"}`}
            />
          ))}
        </div>
      </div>

      <ul className="mb-6 mt-5 flex flex-wrap gap-x-3 gap-y-1 px-5 text-sm font-bold">
        {group.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <Link
        href={`/crew/${group.id}`}
        className={`group mt-auto flex min-h-14 items-center justify-between border-t px-5 text-[15px] font-bold transition-colors hover:text-brand ${
          highlight ? "border-current/20" : border
        }`}
      >
        이 크루 보기
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
