"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { groups, type FootballLevel } from "@/data/groups";
import { moodTagLabels, schools, type MoodTag } from "@/data/moods";
import { PREFS_KEY, rankGroups, writeJSON, type MatchPrefs } from "@/lib/match";
import Container from "@/components/Container";
import MatchResultCard from "@/components/MatchResultCard";

type Vibe = "chill" | "loud" | "both";
type Answers = {
  people: ("newFriends" | "sameSchool" | "global" | "small" | "big")[];
  school?: string;
  activities: MoodTag[];
  level?: FootballLevel;
  vibe?: Vibe;
};

const peopleOptions: { id: Answers["people"][number]; label: string; sub: string }[] = [
  { id: "newFriends", label: "새로운 친구", sub: "처음 보는 사람들과 친해지고 싶어요" },
  { id: "sameSchool", label: "같은 학교 사람", sub: "우리 학교 사람이면 더 편해요" },
  { id: "global", label: "외국인 학생도 좋아요", sub: "교환학생과 함께해도 괜찮아요" },
  { id: "small", label: "소규모 3~4명", sub: "조용히 깊게 얘기하고 싶어요" },
  { id: "big", label: "여럿이 5~6명", sub: "시끌벅적한 게 좋아요" },
];

const activityOptions: MoodTag[] = ["cafe", "food", "walk", "drinks", "preMatch", "afterParty"];

const levelOptions: { id: FootballLevel; label: string; sub: string }[] = [
  { id: "first", label: "처음 봐요", sub: "룰은 몰라도 분위기는 궁금해요" },
  { id: "light", label: "가끔 봐요", sub: "큰 경기는 챙겨 봐요" },
  { id: "fan", label: "FC서울 팬이에요", sub: "응원가도 알고 선수도 알아요" },
];

const vibeOptions: { id: Vibe; label: string; sub: string }[] = [
  { id: "chill", label: "편하게 응원", sub: "앉아서 보고, 골 들어가면 소리 질러요" },
  { id: "loud", label: "열응원", sub: "90분 내내 서서 응원가 부르기" },
  { id: "both", label: "둘 다 좋아요", sub: "분위기 따라 갈게요" },
];

const questions = [
  "오늘 어떤 사람들과\n놀고 싶나요?",
  "뭐 하고\n싶나요?",
  "축구는 얼마나\n좋아하나요?",
  "어떤 분위기가\n좋아요?",
];

function toPrefs(a: Answers): MatchPrefs {
  const tags = new Set<MoodTag>(a.activities);
  if (a.people.includes("newFriends")) tags.add("newFriends");
  if (a.level === "first") tags.add("firstMatch");
  if (a.vibe === "chill") tags.add("chill");
  if (a.vibe === "loud") tags.add("loud");
  return {
    tags: [...tags],
    level: a.level,
    school: a.people.includes("sameSchool") ? a.school : undefined,
    size: a.people.includes("small") ? "small" : a.people.includes("big") ? "big" : undefined,
    global: a.people.includes("global"),
  };
}

function Option({ on, label, sub, onClick }: { on: boolean; label: string; sub?: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`flex min-h-[4.5rem] w-full items-center justify-between gap-4 border px-5 py-4 text-left transition-colors ${
        on ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"
      }`}
    >
      <span>
        <span className="block text-lg font-black tracking-[-0.02em]">{label}</span>
        {sub && <span className={`mt-0.5 block text-sm ${on ? "text-paper/60" : "text-mute"}`}>{sub}</span>}
      </span>
      <span className={`flex h-7 w-7 shrink-0 items-center justify-center border ${on ? "border-brand bg-brand" : "border-ink/30"}`}>
        {on && <Check size={16} strokeWidth={3} />}
      </span>
    </button>
  );
}

export default function MatchFlow() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ people: [], activities: [] });

  // Pre-fill from a Today's Mood link, e.g. /match?mood=cafe,walk
  useEffect(() => {
    const mood = params.get("mood");
    if (!mood) return;
    const picked = mood.split(",").filter((m): m is MoodTag => m in moodTagLabels);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnswers((a) => ({
      ...a,
      people: picked.includes("newFriends") ? ["newFriends"] : a.people,
      activities: picked.filter((m) => activityOptions.includes(m)),
      level: picked.includes("firstMatch") ? "first" : a.level,
      vibe: picked.includes("chill") ? "chill" : a.vibe,
    }));
  }, [params]);

  const prefs = useMemo(() => toPrefs(answers), [answers]);
  const results = useMemo(() => rankGroups(groups, prefs).slice(0, 3), [prefs]);
  const isResult = step === questions.length;

  useEffect(() => {
    if (isResult) writeJSON(PREFS_KEY, prefs);
  }, [isResult, prefs]);

  const togglePeople = (id: Answers["people"][number]) =>
    setAnswers((a) => {
      let people = a.people.includes(id) ? a.people.filter((p) => p !== id) : [...a.people, id];
      if (id === "small" && people.includes("small")) people = people.filter((p) => p !== "big");
      if (id === "big" && people.includes("big")) people = people.filter((p) => p !== "small");
      return { ...a, people };
    });

  const toggleActivity = (tag: MoodTag) =>
    setAnswers((a) => ({
      ...a,
      activities: a.activities.includes(tag) ? a.activities.filter((t) => t !== tag) : [...a.activities, tag],
    }));

  const canNext =
    (step === 0 && answers.people.length > 0) ||
    (step === 1 && answers.activities.length > 0) ||
    (step === 2 && !!answers.level) ||
    (step === 3 && !!answers.vibe);

  const go = (n: number) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container className="pb-8 pt-8 md:pt-14">
      {/* Progress */}
      <div className="flex gap-1.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`h-1 flex-1 ${i <= step ? "bg-brand" : "bg-ink/15"}`} />
        ))}
      </div>
      <div className="mt-4 flex items-baseline justify-between text-xs font-bold tracking-[0.18em]">
        <span className={isResult ? "text-brand" : ""}>STEP 0{step + 1}</span>
        <span className="text-mute">FIND MY CREW</span>
      </div>

      {!isResult ? (
        <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-12">
          <h1 className="whitespace-pre-line text-[2.4rem] font-black leading-[1.12] tracking-[-0.05em] md:col-span-5 md:text-6xl">
            {questions[step]}
          </h1>

          <div className="md:col-span-7">
            {step === 0 && (
              <div className="space-y-2">
                {peopleOptions.map((o) => (
                  <Option key={o.id} on={answers.people.includes(o.id)} label={o.label} sub={o.sub} onClick={() => togglePeople(o.id)} />
                ))}
                {answers.people.includes("sameSchool") && (
                  <div className="pt-4">
                    <p className="text-sm font-bold tracking-[0.14em] text-mute">학교</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {schools.map((s) => (
                        <button
                          key={s}
                          type="button"
                          aria-pressed={answers.school === s}
                          onClick={() => setAnswers((a) => ({ ...a, school: s }))}
                          className={`min-h-11 border px-4 text-[15px] font-bold ${
                            answers.school === s ? "border-brand bg-brand text-paper" : "border-ink/25 hover:border-ink"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-2 sm:grid-cols-2">
                {activityOptions.map((t) => (
                  <Option key={t} on={answers.activities.includes(t)} label={moodTagLabels[t]} onClick={() => toggleActivity(t)} />
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-2">
                {levelOptions.map((o) => (
                  <Option key={o.id} on={answers.level === o.id} label={o.label} sub={o.sub} onClick={() => setAnswers((a) => ({ ...a, level: o.id }))} />
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-2">
                {vibeOptions.map((o) => (
                  <Option key={o.id} on={answers.vibe === o.id} label={o.label} sub={o.sub} onClick={() => setAnswers((a) => ({ ...a, vibe: o.id }))} />
                ))}
              </div>
            )}

            <div className="sticky bottom-0 -mx-5 mt-8 flex gap-2 bg-paper px-5 py-4 md:static md:mx-0 md:px-0">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => go(step - 1)}
                  className="inline-flex min-h-14 items-center gap-2 border border-ink px-5 font-bold"
                  aria-label="이전"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <button
                type="button"
                disabled={!canNext}
                onClick={() => go(step + 1)}
                className="inline-flex min-h-14 flex-1 items-center justify-between bg-brand px-6 text-lg font-bold text-paper transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:bg-ink/15 disabled:text-ink/40"
              >
                {step === questions.length - 1 ? "크루 찾기" : "다음"}
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10 md:mt-16">
          <h1 className="text-[2.4rem] font-black leading-[1.12] tracking-[-0.05em] md:text-7xl">
            당신과 잘 맞는
            <br />
            <span className="text-brand">크루</span>를 찾았어요.
          </h1>
          <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-base font-bold text-mute">
            {prefs.tags.map((t) => (
              <li key={t}>#{moodTagLabels[t]}</li>
            ))}
            {prefs.school && <li>#{prefs.school}</li>}
            {prefs.global && <li>#외국인친구OK</li>}
          </ul>

          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {results.map(({ group, score }, i) => (
              <MatchResultCard key={group.id} group={group} score={score} highlight={i === 0} />
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => go(0)}
              className="inline-flex min-h-14 items-center justify-center gap-2 border border-ink px-6 font-bold"
            >
              <RotateCcw size={18} /> 다시 고르기
            </button>
            <Link
              href="/host"
              className="inline-flex min-h-14 items-center justify-between gap-6 bg-ink px-6 font-bold text-paper hover:bg-brand"
            >
              HOST랑 하루 고르기 <ArrowRight size={20} />
            </Link>
          </div>
          <p className="mt-6 text-sm text-mute">
            * Match %는 선택한 취향 태그와 크루 태그의 일치 정도로 계산한 프로토타입 점수예요.
          </p>
        </div>
      )}
    </Container>
  );
}
