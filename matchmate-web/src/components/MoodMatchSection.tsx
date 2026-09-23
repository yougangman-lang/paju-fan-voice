"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { groups } from "@/data/groups";
import { homeMoodTags, type MoodTag } from "@/data/moods";
import { PREFS_KEY, rankGroups, readJSON, writeJSON, type MatchPrefs } from "@/lib/match";
import Container from "./Container";
import SectionHeader from "./SectionHeader";
import MoodSelector from "./MoodSelector";
import MatchResultCard from "./MatchResultCard";

type Props = {
  index?: string;
  limit?: number;
};

export default function MoodMatchSection({ index = "02 / 06", limit = 6 }: Props) {
  const [prefs, setPrefs] = useState<MatchPrefs>({ tags: [] });

  // Restore saved preferences after hydration (shared with /match).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefs(readJSON<MatchPrefs>(PREFS_KEY, { tags: [] }));
  }, []);

  const update = (next: MatchPrefs) => {
    setPrefs(next);
    writeJSON(PREFS_KEY, next);
  };

  const toggle = (tag: MoodTag) =>
    update({
      ...prefs,
      tags: prefs.tags.includes(tag) ? prefs.tags.filter((t) => t !== tag) : [...prefs.tags, tag],
    });

  const ranked = useMemo(() => rankGroups(groups, prefs).slice(0, limit), [prefs, limit]);

  return (
    <section id="mood-match" className="scroll-mt-20 py-20 md:py-28">
      <Container>
        <SectionHeader
          index={index}
          kicker="MOOD MATCH"
          title={"나랑 잘 맞는\n사람 찾기"}
          sub={"축구보다 취향부터.\n비슷한 사람들과 하루를 만들어보세요."}
        />

        <div className="mt-10 md:mt-14">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-bold tracking-[0.14em] text-mute">
              끌리는 걸 모두 골라보세요 {prefs.tags.length > 0 && <span className="text-brand">· {prefs.tags.length}개 선택</span>}
            </p>
            {prefs.tags.length > 0 && (
              <button
                type="button"
                onClick={() => update({ ...prefs, tags: [] })}
                className="inline-flex min-h-10 items-center gap-1.5 text-sm font-bold text-mute hover:text-ink"
              >
                <RotateCcw size={14} /> 초기화
              </button>
            )}
          </div>
          <div className="mt-4">
            <MoodSelector options={homeMoodTags} selected={prefs.tags} onToggle={toggle} />
          </div>
        </div>
      </Container>

      <div className="mx-auto mt-10 w-full max-w-[1280px] md:px-10">
        <div className="swipe-row flex gap-3 overflow-x-auto px-5 pb-2 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {ranked.map(({ group, score }, i) => (
            <div key={group.id} className="w-[84%] shrink-0 sm:w-[55%] md:w-auto">
              <MatchResultCard group={group} score={score} highlight={i === 0 && prefs.tags.length > 0} />
            </div>
          ))}
        </div>
      </div>

      <Container>
        <Link
          href="/match"
          className="group mt-8 inline-flex min-h-12 items-center gap-2 border-b-2 border-ink text-base font-bold hover:border-brand hover:text-brand"
        >
          학교·응원 스타일까지 넣어서 더 정확하게 찾기
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Container>
    </section>
  );
}
