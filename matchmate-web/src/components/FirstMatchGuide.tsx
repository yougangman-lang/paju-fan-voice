import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { guidePoints } from "@/data/guide";
import Container from "./Container";
import SectionHeader from "./SectionHeader";

export default function FirstMatchGuide({ index = "06 / 06" }: { index?: string }) {
  return (
    <section className="pt-20 md:pt-28">
      <Container>
        <SectionHeader
          index={index}
          kicker="FIRST MATCH GUIDE"
          title={"처음 직관해도\n괜찮아요."}
          sub={"축구보다 사람이 먼저인 하루.\n처음이라면 이것만 알고 오세요."}
        />
        <ol className="mt-10 md:mt-14">
          {guidePoints.map((p, i) => (
            <li key={p.title} className="grid gap-2 border-b border-ink/15 py-6 md:grid-cols-12 md:items-baseline md:gap-6 md:py-8">
              <span className="font-display text-2xl text-brand md:col-span-1 md:text-3xl">0{i + 1}</span>
              <p className="text-xl font-black tracking-[-0.03em] md:col-span-5 md:text-3xl">{p.title}</p>
              <p className="text-base leading-relaxed text-mute md:col-span-6">{p.copy}</p>
            </li>
          ))}
        </ol>
        <Link
          href="/guide"
          className="group mt-10 inline-flex min-h-14 items-center gap-6 bg-ink px-6 text-base font-bold text-paper transition-colors hover:bg-brand"
        >
          첫 직관 가이드 전체 보기
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Container>
    </section>
  );
}
