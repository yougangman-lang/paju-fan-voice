import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SmartImage from "./SmartImage";

const photos = {
  main: "/images/community/fans-01.png",
  second: "/images/community/fans-02.png",
  third: "/images/community/fans-03.png",
};

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="mx-auto grid w-full max-w-[1280px] md:grid-cols-12 md:gap-10 md:px-10 md:pt-12 lg:gap-14">
        {/* Photo collage — first on mobile, right column on desktop */}
        <div className="relative md:order-2 md:col-span-7">
          <div className="grid grid-cols-6 gap-2 md:gap-3">
            <div className="relative col-span-6 aspect-[4/5] overflow-hidden bg-paper-deep md:col-span-4 md:row-span-2 md:aspect-auto md:min-h-[620px]">
              <SmartImage
                src={photos.main}
                alt="FC서울 경기장에서 함께 응원하는 대학생들"
                preload
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover object-center contrast-[1.04]"
              />
              <div className="absolute left-0 top-0 bg-brand px-3 py-2 text-[11px] font-bold tracking-[0.18em] text-paper md:px-4 md:text-xs">
                SAT 10.03 · SANGAM
              </div>
            </div>
            <div className="relative hidden aspect-[3/4] overflow-hidden bg-paper-deep md:col-span-2 md:block">
              <SmartImage
                src={photos.second}
                alt="같이 직관 온 친구들"
                sizes="20vw"
                className="object-cover object-center contrast-[1.04]"
              />
            </div>
            <div className="relative hidden aspect-[3/4] overflow-hidden bg-paper-deep md:col-span-2 md:block">
              <SmartImage
                src={photos.third}
                alt="응원석의 대학생 팬들"
                sizes="20vw"
                className="object-cover object-center contrast-[1.04]"
              />
            </div>
          </div>
          <p className="absolute -bottom-7 right-0 hidden text-xs font-bold tracking-[0.18em] text-mute md:block">
            FOOD · CAFE · NEW FRIENDS · FOOTBALL
          </p>
        </div>

        {/* Typography — overlaps the photo on mobile */}
        <div className="relative z-10 -mt-24 mr-6 bg-paper px-5 pt-6 md:order-1 md:col-span-5 md:mr-0 md:mt-0 md:flex md:flex-col md:justify-end md:bg-transparent md:px-0 md:pb-4 md:pt-0">
          <p className="text-xs font-bold tracking-[0.2em] text-brand">SOCIAL MATCHDAY · SEOUL</p>
          <h1 className="mt-4 text-[2.9rem] font-black leading-[1.08] tracking-[-0.05em] sm:text-6xl lg:text-[5.4rem]">
            이번 주말,
            <br />
            같이 <span className="text-brand">상암</span>
            <br className="hidden md:block" /> 갈래?
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed text-ink/75 md:text-lg">
            FC서울 직관도 보고,
            <br />
            새 친구들이랑 먹고, 놀고, 같이 응원해요.
          </p>
        </div>

        <div className="px-5 md:order-3 md:col-span-5 md:-mt-6 md:px-0">
          <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-0">
            <Link
              href="/match"
              className="group inline-flex min-h-14 items-center justify-between gap-6 bg-brand px-6 text-base font-bold text-paper transition-colors hover:bg-ink"
            >
              같이 갈 사람 찾기
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#host-pick"
              className="group inline-flex min-h-14 items-center justify-between gap-6 border border-ink px-6 text-base font-bold transition-colors hover:bg-ink hover:text-paper"
            >
              HOST랑 하루 고르기
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="mt-6 text-xs font-bold tracking-[0.18em] text-mute md:hidden">
            FOOD · CAFE · NEW FRIENDS · FOOTBALL
          </p>
        </div>

        {/* Mobile photo strip */}
        <div className="swipe-row mt-8 flex gap-2 overflow-x-auto px-5 md:hidden">
          {[photos.second, photos.third].map((src, i) => (
            <div key={src} className="relative aspect-[4/5] w-[62%] shrink-0 overflow-hidden bg-paper-deep">
              <SmartImage
                src={src}
                alt={i === 0 ? "같이 직관 온 친구들" : "응원석의 대학생 팬들"}
                sizes="62vw"
                className="object-cover object-center contrast-[1.04]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
