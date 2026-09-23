import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Ticket, Users } from "lucide-react";
import { getHost, hosts } from "@/data/hosts";
import Container from "@/components/Container";
import SmartImage from "@/components/SmartImage";
import { ScheduleJourney } from "@/components/JourneyTimeline";
import JoinButton from "@/components/JoinButton";
import HostCard from "@/components/HostCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return hosts.map((h) => ({ id: h.id }));
}

export async function generateMetadata({ params }: PageProps<"/host/[id]">): Promise<Metadata> {
  const { id } = await params;
  const host = getHost(id);
  return { title: host ? `${host.name} — MATCHMATE SEOUL` : "HOST — MATCHMATE SEOUL" };
}

function Block({ no, label, children }: { no: string; label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-ink pt-4">
      <div className="flex items-baseline justify-between text-xs font-bold tracking-[0.18em]">
        <span>{label}</span>
        <span className="text-mute">{no}</span>
      </div>
      <div className="mt-8 md:mt-10">{children}</div>
    </section>
  );
}

export default async function HostDetailPage({ params }: PageProps<"/host/[id]">) {
  const { id } = await params;
  const host = getHost(id);
  if (!host) notFound();

  const left = host.participants.max - host.participants.current;
  const others = hosts.filter((h) => h.id !== host.id);

  return (
    <>
      {/* 1–3. Photo, name, headline */}
      <div className="mx-auto grid w-full max-w-[1280px] md:grid-cols-12 md:gap-10 md:px-10 md:pt-10">
        <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep md:col-span-7 md:aspect-[5/6]">
          <SmartImage
            src={host.image}
            alt={`HOST ${host.name}`}
            preload
            sizes="(min-width: 768px) 58vw, 100vw"
            style={{ objectPosition: host.imagePosition ?? "center" }}
            className="object-cover contrast-[1.03]"
          />
          <Link
            href="/host"
            className="absolute left-4 top-4 inline-flex min-h-11 items-center gap-2 bg-paper px-4 text-sm font-bold"
          >
            <ArrowLeft size={16} /> HOST
          </Link>
        </div>
        <div className="relative z-10 -mt-20 mr-6 bg-paper px-5 pt-6 md:col-span-5 md:mr-0 md:mt-0 md:flex md:flex-col md:justify-end md:px-0 md:pb-2">
          <p className="text-xs font-bold tracking-[0.2em] text-brand">HOST · {host.role.toUpperCase()}</p>
          <p className="mt-3 text-xl font-black">{host.name}</p>
          <h1 className="mt-5 whitespace-pre-line text-[2.4rem] font-black leading-[1.1] tracking-[-0.05em] md:text-6xl">
            {host.headline}
          </h1>
          <p className="mt-5 whitespace-pre-line text-lg leading-relaxed text-ink/75">{host.description}</p>
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-[15px] font-bold">
            {host.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <Container className="mt-16 space-y-20 md:mt-24 md:space-y-28">
        {/* 4. What we're doing */}
        <Block no="01" label="WHAT WE'RE DOING">
          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {host.whatWeDo.map((w, i) => (
              <div key={w.title}>
                <p className="font-display text-4xl text-brand">0{i + 1}</p>
                <p className="mt-3 text-2xl font-black tracking-[-0.03em]">{w.title}</p>
                <p className="mt-3 text-base leading-relaxed text-mute">{w.copy}</p>
              </div>
            ))}
          </div>
        </Block>

        {/* 5. Matchday Journey */}
        <Block no="02" label="MATCHDAY JOURNEY">
          <ScheduleJourney route={host.route} />
        </Block>

        {/* 6. People */}
        <Block no="03" label="함께하는 사람들">
          <div className="flex items-end justify-between gap-6">
            <p className="font-display text-6xl tabular-nums md:text-8xl">
              {host.participants.current}
              <span className="text-ink/30">/{host.participants.max}</span>
            </p>
            <p className="text-right text-base font-bold">
              첫 직관 {host.participants.firstMatch}명
              <br />
              <span className="text-brand">{left > 0 ? `${left}자리 남음` : "마감"}</span>
            </p>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
            {host.people.map((p) => (
              <li key={p.label + p.note} className="border border-ink/15 p-4">
                <Users size={18} className="text-mute" />
                <p className="mt-6 font-bold">{p.label}</p>
                <p className="mt-1 text-sm text-mute">{p.note}</p>
              </li>
            ))}
            {Array.from({ length: Math.min(left, 2) }).map((_, i) => (
              <li key={`open-${i}`} className="placeholder-stripes border border-dashed border-brand/60 p-4">
                <p className="mt-10 font-bold text-brand">OPEN</p>
                <p className="mt-1 text-sm text-mute">당신 자리</p>
              </li>
            ))}
          </ul>
        </Block>

        {/* 7. Match */}
        <Block no="04" label="FC SEOUL MATCH">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="font-display text-5xl leading-none md:text-7xl">{host.match.title}</p>
              <p className="mt-4 font-display text-3xl text-brand md:text-4xl">
                {host.match.date} · {host.match.kickoff} KICK-OFF
              </p>
            </div>
            <ul className="space-y-3 text-base font-bold md:col-span-5">
              <li className="flex items-center gap-3"><MapPin size={18} className="text-brand" /> {host.match.venue}</li>
              <li className="flex items-center gap-3"><Ticket size={18} className="text-brand" /> {host.match.seat}</li>
              <li className="text-sm font-normal text-mute">* 예시 일정입니다. 티켓은 각자 공식 채널에서 예매해요.</li>
            </ul>
          </div>
        </Block>
      </Container>

      {/* 8. CTA */}
      <section className="mt-20 bg-ink py-16 text-paper md:mt-28 md:py-24">
        <Container className="grid gap-8 md:grid-cols-12 md:items-end">
          <h2 className="whitespace-pre-line text-4xl font-black leading-[1.1] tracking-[-0.05em] md:col-span-7 md:text-6xl">
            {host.name}의 토요일,
            <br />
            <span className="text-brand">같이 갈래?</span>
          </h2>
          <div className="md:col-span-5">
            <JoinButton id={`host:${host.id}`} full={left <= 0} />
          </div>
        </Container>
      </section>

      <Container className="mt-20 md:mt-28">
        <p className="border-t border-ink pt-4 text-xs font-bold tracking-[0.18em]">OTHER HOSTS</p>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {others.map((h) => (
            <HostCard key={h.id} host={h} variant="wide" index={hosts.indexOf(h) + 1} />
          ))}
        </div>
      </Container>
    </>
  );
}
