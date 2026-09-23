import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { guidePoints } from "@/data/guide";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import SmartImage from "@/components/SmartImage";
import { fansPhotos } from "@/data/photos";

export const metadata: Metadata = { title: "GUIDE — MATCHMATE SEOUL" };

const stadiumTips = [
  { k: "가는 길", v: "6호선 월드컵경기장역에서 내리면 바로 경기장이에요. 크루는 보통 역 근처에서 집결해요." },
  { k: "도착 시간", v: "킥오프 40분~1시간 전 도착을 추천해요. 입장 줄과 매점 줄이 생각보다 길어요." },
  { k: "좌석 고르기", v: "N석 쪽은 서서 응원하는 분위기, E·W석은 비교적 앉아서 편하게 보는 분위기예요." },
  { k: "옷차림", v: "빨강·검정이면 충분해요. 저녁 경기는 쌀쌀하니 겉옷 하나 챙기기." },
  { k: "먹을 것", v: "경기장 주변과 내부 매점 이용 가능. 반입 규정은 경기마다 다를 수 있어요." },
  { k: "티켓", v: "티켓은 구단 공식 예매 채널에서 각자 예매해요. MATCHMATE는 예매를 대행하지 않아요." },
];

const flow = [
  { t: "신청", c: "Mood Match 또는 HOST Pick으로 하루를 골라요." },
  { t: "만남", c: "경기 전 카페·맛집에서 먼저 만나 인사해요." },
  { t: "직관", c: "같은 구역에서 같이 응원해요." },
  { t: "2차", c: "원하는 사람만 경기 후 한 잔 더." },
];

export default function GuidePage() {
  return (
    <>
      <div className="mx-auto grid w-full max-w-[1280px] md:grid-cols-12 md:gap-10 md:px-10 md:pt-14">
        <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep md:order-2 md:col-span-6 md:aspect-[4/5]">
          <SmartImage
            src={fansPhotos.fans02.src}
            alt="서울월드컵경기장 응원석에서 경기를 지켜보는 팬들"
            preload
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-[22%_50%] contrast-[1.04]"
          />
        </div>
        <div className="relative z-10 -mt-20 mr-6 bg-paper px-5 pt-6 md:order-1 md:col-span-6 md:mr-0 md:mt-0 md:flex md:flex-col md:justify-end md:px-0 md:pb-4">
          <p className="text-xs font-bold tracking-[0.2em] text-brand">FIRST MATCH GUIDE</p>
          <h1 className="mt-4 text-[2.8rem] font-black leading-[1.08] tracking-[-0.05em] md:text-7xl">
            처음 직관해도
            <br />
            괜찮아요.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/75">
            축구를 몰라도, 혼자여도 괜찮아요.
            <br />
            사람이 먼저고, 축구는 마지막 코스예요.
          </p>
        </div>
      </div>

      <Container className="mt-20 space-y-20 md:mt-28 md:space-y-28">
        <section>
          <SectionHeader index="01" kicker="YOU CAN" title={"이런 거\n다 괜찮아요."} />
          <ol className="mt-10 md:mt-14">
            {guidePoints.map((p, i) => (
              <li key={p.title} className="grid gap-2 border-b border-ink/15 py-6 md:grid-cols-12 md:items-baseline md:gap-6 md:py-8">
                <span className="font-display text-3xl text-brand md:col-span-1">0{i + 1}</span>
                <p className="text-2xl font-black tracking-[-0.03em] md:col-span-5 md:text-3xl">{p.title}</p>
                <p className="text-base leading-relaxed text-mute md:col-span-6 md:text-lg">{p.copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <SectionHeader index="02" kicker="HOW IT WORKS" title={"하루는 이렇게\n흘러가요."} />
          <ol className="mt-10 grid gap-px bg-ink md:mt-14 md:grid-cols-4">
            {flow.map((f, i) => (
              <li key={f.t} className={`p-6 md:min-h-[240px] md:p-8 ${i === flow.length - 1 ? "bg-brand text-paper" : "bg-paper"}`}>
                <p className="font-display text-5xl">0{i + 1}</p>
                <p className="mt-8 text-2xl font-black">{f.t}</p>
                <p className="mt-2 text-base leading-relaxed opacity-75">{f.c}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <SectionHeader
            index="03"
            kicker="SANGAM BASICS"
            title={"상암 기본\n이용 안내"}
            sub="서울월드컵경기장 첫 방문이라면. 세부 규정은 경기별 공식 안내를 꼭 확인하세요."
          />
          <dl className="mt-10 grid gap-x-10 md:mt-14 md:grid-cols-2">
            {stadiumTips.map((tip) => (
              <div key={tip.k} className="border-b border-ink/15 py-6">
                <dt className="text-sm font-bold tracking-[0.14em] text-brand">{tip.k}</dt>
                <dd className="mt-2 text-lg leading-relaxed">{tip.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="bg-ink px-6 py-12 text-paper md:px-14 md:py-16">
          <h2 className="text-4xl font-black leading-[1.1] tracking-[-0.05em] md:text-6xl">
            준비 끝.
            <br />
            <span className="text-brand">같이 갈 사람</span>만 찾으면 돼요.
          </h2>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/match" className="inline-flex min-h-14 items-center justify-between gap-6 bg-brand px-6 font-bold hover:bg-paper hover:text-ink">
              같이 갈 사람 찾기 <ArrowRight size={20} />
            </Link>
            <Link href="/host" className="inline-flex min-h-14 items-center justify-between gap-6 border border-paper/40 px-6 font-bold hover:bg-paper hover:text-ink">
              HOST랑 하루 고르기 <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
