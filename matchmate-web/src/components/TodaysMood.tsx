import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { todaysMoods } from "@/data/moods";
import Container from "./Container";
import SectionHeader from "./SectionHeader";

const styles = [
  { box: "bg-ink text-paper md:col-span-7 md:min-h-[400px]", word: "text-paper/10", no: "text-brand" },
  { box: "bg-brand text-paper md:col-span-5 md:min-h-[400px]", word: "text-paper/15", no: "text-paper" },
  { box: "border border-ink md:col-span-5 md:min-h-[340px]", word: "text-ink/[0.06]", no: "text-brand" },
  { box: "bg-paper-deep md:col-span-7 md:min-h-[340px]", word: "text-ink/[0.07]", no: "text-brand" },
];

export default function TodaysMood() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader index="01 / 06" kicker="TODAY'S MOOD" title={"오늘 뭐\n하고 싶나요?"} sub={"경기보다 먼저, 오늘의 기분부터.\n고르면 맞는 크루를 보여줄게요."} />
        <div className="mt-10 grid gap-2 md:mt-14 md:grid-cols-12 md:gap-3">
          {todaysMoods.map((mood, i) => (
            <Link
              key={mood.no}
              href={`/match?mood=${mood.tags.join(",")}`}
              className={`group relative flex min-h-[260px] flex-col justify-between overflow-hidden p-6 md:p-9 ${styles[i].box}`}
            >
              <span
                aria-hidden
                className={`pointer-events-none absolute -bottom-5 -right-2 select-none font-display text-[7.5rem] leading-none md:text-[11rem] ${styles[i].word}`}
              >
                {mood.word}
              </span>
              <div className="relative flex items-start justify-between">
                <span className={`font-display text-5xl md:text-6xl ${styles[i].no}`}>{mood.no}</span>
                <ArrowUpRight size={28} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
              <div className="relative mt-12">
                <p className="text-sm font-bold tracking-[0.12em] opacity-70">{mood.title}</p>
                <p className="mt-3 max-w-md text-2xl font-black leading-snug tracking-[-0.03em] md:text-[2rem]">
                  “{mood.copy}”
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
