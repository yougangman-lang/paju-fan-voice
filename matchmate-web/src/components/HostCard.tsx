import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { routeSummary, type Host } from "@/data/hosts";
import SmartImage from "./SmartImage";

type Variant = "feature" | "wide" | "overlay" | "swipe";

type Props = {
  host: Host;
  variant?: Variant;
  index?: number;
};

function Meta({ host, big = false, compact = false }: { host: Host; big?: boolean; compact?: boolean }) {
  return (
    <>
      <p className="text-xs font-bold tracking-[0.18em] text-brand">
        HOST · {host.name.toUpperCase()}
      </p>
      <h3
        className={`mt-3 whitespace-pre-line font-black leading-[1.15] tracking-[-0.04em] ${
          big ? "text-3xl md:text-[2.75rem]" : compact ? "text-2xl md:text-[1.45rem]" : "text-2xl md:text-[1.7rem]"
        }`}
      >
        {host.headline}
      </h3>
      <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm font-bold opacity-80">
        {host.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="mt-5 flex items-end justify-between gap-4 border-t border-current/20 pt-3 text-sm">
        <p className="font-bold tracking-[0.06em]">{routeSummary(host.route)}</p>
        <p className="shrink-0 font-display text-xl tabular-nums">
          {host.participants.current}
          <span className="opacity-50">/{host.participants.max}</span>
        </p>
      </div>
    </>
  );
}

/**
 * Editorial host card — the real host photo always takes the majority
 * of the card area. Variants give the asymmetric grid its rhythm.
 */
export default function HostCard({ host, variant = "feature", index = 1 }: Props) {
  const photo = (sizes: string) => (
    <SmartImage
      src={host.image}
      alt={`HOST ${host.name}`}
      sizes={sizes}
      style={{ objectPosition: host.imagePosition ?? "center" }}
      className="object-cover contrast-[1.03] transition-transform duration-700 group-hover:scale-[1.03]"
    />
  );
  const no = <span className="font-display text-lg tracking-wide">0{index}</span>;

  if (variant === "feature") {
    return (
      <Link href={`/host/${host.id}`} className="group flex h-full flex-col bg-ink text-paper">
        <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:flex-1 md:min-h-[560px]">
          {photo("(min-width: 768px) 58vw, 100vw")}
          <div className="absolute left-0 top-0 flex items-center gap-3 bg-brand px-4 py-2 text-paper">
            {no}
            <span className="text-xs font-bold tracking-[0.18em]">{host.role.toUpperCase()}</span>
          </div>
          <ArrowUpRight className="absolute right-4 top-4 text-paper drop-shadow" size={30} />
        </div>
        <div className="p-6 md:p-8">
          <Meta host={host} big />
        </div>
      </Link>
    );
  }

  if (variant === "wide") {
    return (
      <Link href={`/host/${host.id}`} className="group flex h-full flex-col border border-ink">
        <div className="relative aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-[260px] md:flex-1">
          {photo("(min-width: 768px) 40vw, 100vw")}
          <div className="absolute left-0 top-0 bg-paper px-3 py-1.5">{no}</div>
        </div>
        <div className="p-5">
          <Meta host={host} compact />
        </div>
      </Link>
    );
  }

  if (variant === "overlay") {
    return (
      <Link href={`/host/${host.id}`} className="group flex h-full flex-col bg-brand text-paper">
        <div className="relative min-h-[280px] flex-1 overflow-hidden">
          {photo("(min-width: 768px) 40vw, 100vw")}
          <div className="absolute left-0 top-0 bg-brand px-3 py-1.5">{no}</div>
          <ArrowUpRight size={26} className="absolute right-4 top-4 text-paper drop-shadow" />
        </div>
        <div className="p-5">
          <Meta host={host} compact />
        </div>
      </Link>
    );
  }

  // swipe — mobile carousel card
  return (
    <Link href={`/host/${host.id}`} className="group flex h-full flex-col bg-ink text-paper">
      <div className="relative aspect-[4/5] overflow-hidden">
        {photo("85vw")}
        <div className="absolute left-0 top-0 bg-brand px-3 py-1.5">{no}</div>
      </div>
      <div className="flex-1 p-5">
        <Meta host={host} />
      </div>
    </Link>
  );
}
