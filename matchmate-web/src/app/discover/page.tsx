import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { hosts } from "@/data/hosts";
import { groups } from "@/data/groups";
import { sixLinePicks, thisWeekend } from "@/data/journeys";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import HostCard from "@/components/HostCard";
import SmartImage from "@/components/SmartImage";
import MoodMatchSection from "@/components/MoodMatchSection";

export const metadata: Metadata = { title: "DISCOVER — MATCHMATE SEOUL" };

const trending = [
  { title: "DURIMI와 새 친구 만나러 가자", kind: "HOST PICK", meta: "합정 → 망원 → 상암", stat: "이번 주 저장 214", href: "/host/durimi" },
  { title: "SATURDAY CREW 03", kind: "MOOD MATCH", meta: "망원 카페 → 상암", stat: "첫 직관 3명", href: "/crew/saturday-crew-03" },
  { title: "BYEON HOLLAND와 상암을 접수하자", kind: "HOST PICK", meta: "이태원 → 합정 → 상암", stat: "이번 주 저장 168", href: "/host/byeon" },
  { title: "GLOBAL MATCHDAY", kind: "MOOD MATCH", meta: "이태원 → 상암", stat: "교환학생 2명", href: "/crew/global-matchday" },
  { title: "성북부대공과 안암에서 상암까지", kind: "HOST PICK", meta: "안암 → 망원 → 상암", stat: "이번 주 저장 121", href: "/host/seongbuk" },
];

export default function DiscoverPage() {
  const featured = hosts.find((h) => h.id === "durimi") ?? hosts[0];
  const openSpots = groups.reduce((n, g) => n + (g.maxMembers - g.currentMembers), 0);

  return (
    <>
      <Container className="pt-12 md:pt-20">
        <p className="text-xs font-bold tracking-[0.2em] text-brand">DISCOVER</p>
        <h1 className="mt-4 text-[2.6rem] font-black leading-[1.1] tracking-[-0.05em] md:text-7xl">
          사람들이 만들고 있는
          <br />
          이번 주 <span className="text-brand">Matchday.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">
          경기 목록이 아니라, 하루 목록. 지금 {openSpots}자리가 비어 있어요.
        </p>
      </Container>

      {/* Trending Experiences */}
      <section className="py-20 md:py-24">
        <Container>
          <SectionHeader index="01" kicker="TRENDING EXPERIENCES" title={"요즘 제일\n많이 저장된 하루"} />
          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-10">
            <Link href={trending[0].href} className="group relative block aspect-[4/5] overflow-hidden bg-paper-deep md:col-span-5">
              <SmartImage
                src={featured.image}
                alt={`HOST ${featured.name}`}
                sizes="(min-width: 768px) 40vw, 100vw"
                style={{ objectPosition: featured.imagePosition ?? "center" }}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute bottom-0 left-0 bg-brand px-4 py-3 text-paper">
                <p className="font-display text-4xl leading-none">#01</p>
              </div>
            </Link>
            <ol className="md:col-span-7">
              {trending.map((t, i) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="group grid grid-cols-[3rem_1fr_auto] items-center gap-3 border-b border-ink/15 py-5 md:grid-cols-[4rem_1fr_auto] md:py-6"
                  >
                    <span className={`font-display text-3xl ${i === 0 ? "text-brand" : "text-ink/30"}`}>0{i + 1}</span>
                    <span>
                      <span className="block text-[11px] font-bold tracking-[0.18em] text-mute">{t.kind}</span>
                      <span className="mt-1 block text-lg font-black leading-snug tracking-[-0.02em] group-hover:text-brand md:text-2xl">
                        {t.title}
                      </span>
                      <span className="mt-1 block text-sm text-mute">
                        {t.meta} · {t.stat}
                      </span>
                    </span>
                    <ArrowUpRight size={22} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Mood Match */}
      <MoodMatchSection index="02" limit={3} />

      {/* HOST Pick */}
      <section className="py-20 md:py-24">
        <Container>
          <SectionHeader index="03" kicker="HOST PICK" title={"사람을 고르면,\n하루가 따라와요."} />
        </Container>
        <div className="mx-auto mt-10 w-full max-w-[1280px] md:mt-14 md:px-10">
          <div className="swipe-row flex gap-3 overflow-x-auto px-5 pb-2 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {hosts.map((host, i) => (
              <div key={host.id} className="w-[85%] shrink-0 md:w-auto">
                <HostCard host={host} variant="swipe" index={i + 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* This Weekend */}
      <section className="bg-ink py-20 text-paper md:py-24">
        <Container>
          <SectionHeader dark index="04" kicker="THIS WEEKEND" title={"이번 주말,\n아직 자리 있어요."} />
          <ol className="mt-10 md:mt-14">
            {thisWeekend.map((w) => (
              <li key={w.href}>
                <Link
                  href={w.href}
                  className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 border-b border-paper/15 py-5 md:grid-cols-[8rem_10rem_1fr_10rem_auto] md:gap-6"
                >
                  <span className="font-display text-2xl tabular-nums md:text-3xl">
                    <span className="block text-xs tracking-[0.18em] text-paper/50">{w.day}</span>
                    {w.time}
                  </span>
                  <span className="hidden text-xs font-bold tracking-[0.18em] text-brand md:block">{w.kind}</span>
                  <span>
                    <span className="block text-[11px] font-bold tracking-[0.18em] text-brand md:hidden">{w.kind}</span>
                    <span className="block text-lg font-black leading-snug group-hover:text-brand md:text-xl">{w.title}</span>
                    <span className="mt-0.5 block text-sm text-paper/50 md:hidden">
                      {w.place} · {w.spots}
                    </span>
                  </span>
                  <span className="hidden text-sm text-paper/60 md:block">
                    {w.place}
                    <br />
                    <span className="text-paper">{w.spots}</span>
                  </span>
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 6 Line Picks */}
      <section className="pt-20 md:pt-24">
        <Container>
          <SectionHeader index="05" kicker="6 LINE PICKS" title={"6호선 따라\n고른 루트"} sub="역 이름만 봐도 하루가 그려지는 루트들." />
          <div className="mt-10 grid gap-3 md:mt-14 md:grid-cols-2">
            {sixLinePicks.map((pick, i) => (
              <Link
                key={pick.id}
                href={pick.href}
                className={`group flex min-h-[260px] flex-col justify-between p-6 md:p-8 ${
                  i === 0 ? "bg-brand text-paper" : i === 3 ? "bg-ink text-paper" : "border border-ink"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-2xl">{pick.duration}</span>
                  <ArrowUpRight size={26} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <div className="mt-10">
                  <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-xl tracking-wide md:text-2xl">
                    {pick.stops.map((s, j) => (
                      <li key={s} className="flex items-center gap-2">
                        {j > 0 && <span className="inline-block h-[3px] w-6 bg-line6" aria-hidden />}
                        {s}
                      </li>
                    ))}
                  </ol>
                  <p className="mt-5 text-2xl font-black tracking-[-0.03em] md:text-3xl">{pick.title}</p>
                  <p className="mt-2 text-base opacity-70">{pick.copy}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
