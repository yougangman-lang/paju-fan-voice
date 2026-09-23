import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import { footballLevelLabels, getGroup, groups } from "@/data/groups";
import { moodTagLabels } from "@/data/moods";
import { sixLineStops } from "@/data/journeys";
import Container from "@/components/Container";
import { LineJourney } from "@/components/JourneyTimeline";
import JoinButton from "@/components/JoinButton";
import MatchResultCard from "@/components/MatchResultCard";
import { matchScore } from "@/lib/match";

export const dynamicParams = false;

export function generateStaticParams() {
  return groups.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: PageProps<"/crew/[id]">): Promise<Metadata> {
  const { id } = await params;
  const group = getGroup(id);
  return { title: group ? `${group.title} — MATCHMATE SEOUL` : "CREW — MATCHMATE SEOUL" };
}

const stationKey: Record<string, string> = {
  ANAM: "anam",
  ITAEWON: "itaewon",
  HAPJEONG: "hapjeong",
  MANGWON: "mangwon",
  SANGAM: "sangam",
};

export default async function CrewPage({ params }: PageProps<"/crew/[id]">) {
  const { id } = await params;
  const group = getGroup(id);
  if (!group) notFound();

  const left = group.maxMembers - group.currentMembers;
  const stops = sixLineStops.filter((s) => group.route.some((r) => stationKey[r] === s.id));
  const similar = groups
    .filter((g) => g.id !== group.id)
    .map((g) => ({ g, score: matchScore(g, { tags: group.activities }) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <>
      <Container className="pt-8 md:pt-14">
        <Link href="/#mood-match" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-mute hover:text-ink">
          <ArrowLeft size={16} /> MOOD MATCH
        </Link>

        <div className="mt-6 grid gap-10 border-t border-ink pt-8 md:grid-cols-12 md:pt-12">
          <div className="md:col-span-7">
            <p className="text-xs font-bold tracking-[0.2em] text-brand">MOOD MATCH CREW</p>
            <h1 className="mt-4 font-display text-6xl leading-[0.9] tracking-wide md:text-8xl">{group.title}</h1>
            <p className="mt-6 whitespace-pre-line text-2xl font-black leading-snug tracking-[-0.03em] md:text-4xl">
              “{group.description}”
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-base font-bold">
              {group.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <aside className="md:col-span-5">
            <div className="bg-ink p-6 text-paper md:p-8">
              <p className="font-display text-7xl tabular-nums">
                {group.currentMembers}
                <span className="text-paper/30">/{group.maxMembers}</span>
              </p>
              <div className="mt-3 flex gap-1" aria-hidden>
                {Array.from({ length: group.maxMembers }).map((_, i) => (
                  <span key={i} className={`h-2 flex-1 ${i < group.currentMembers ? "bg-brand" : "bg-paper/20"}`} />
                ))}
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-y-4 text-sm">
                <dt className="text-paper/60">First Match</dt>
                <dd className="text-right font-bold">{group.firstMatchCount}명</dd>
                <dt className="text-paper/60">Existing Fan</dt>
                <dd className="text-right font-bold">{group.existingFanCount}명</dd>
                <dt className="text-paper/60">축구 레벨</dt>
                <dd className="text-right font-bold">
                  {group.footballLevel === "mixed" ? "섞여 있어요" : footballLevelLabels[group.footballLevel]}
                </dd>
                <dt className="text-paper/60">학교</dt>
                <dd className="text-right font-bold">{group.schools.join(" · ")}</dd>
                <dt className="text-paper/60">외국인 학생</dt>
                <dd className="text-right font-bold">{group.foreignFriendly ? "함께해요" : "—"}</dd>
              </dl>
              <div className="mt-6 space-y-2 border-t border-paper/20 pt-5 text-base font-bold">
                <p className="flex items-center gap-2"><Clock size={16} className="text-brand" /> {group.meet.day} · {group.meet.time}</p>
                <p className="flex items-center gap-2"><MapPin size={16} className="text-brand" /> {group.meet.place}</p>
              </div>
              <div className="mt-8">
                <JoinButton id={`crew:${group.id}`} label="이 크루랑 갈래?" full={left <= 0} />
              </div>
            </div>
          </aside>
        </div>
      </Container>

      <Container className="mt-20 md:mt-28">
        <p className="border-t border-ink pt-4 text-xs font-bold tracking-[0.18em]">오늘 우리가 할 것</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {group.activities.map((a) => (
            <li key={a} className="border border-ink px-4 py-2.5 text-base font-bold">
              {moodTagLabels[a]}
            </li>
          ))}
        </ul>
        {stops.length > 1 && (
          <div className="mt-14">
            <p className="mb-8 text-xs font-bold tracking-[0.18em] text-mute">6 LINE ROUTE</p>
            <div style={{ maxWidth: stops.length * 280 }}>
              <LineJourney stops={stops} />
            </div>
          </div>
        )}
      </Container>

      <Container className="mt-20 md:mt-28">
        <p className="border-t border-ink pt-4 text-xs font-bold tracking-[0.18em]">비슷한 크루</p>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {similar.map(({ g, score }) => (
            <MatchResultCard key={g.id} group={g} score={score} />
          ))}
        </div>
      </Container>
    </>
  );
}
