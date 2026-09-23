import type { ReactNode } from "react";

type Props = {
  index?: string;
  kicker: string;
  title: string;
  sub?: ReactNode;
  dark?: boolean;
  aside?: ReactNode;
};

/** Editorial section opener: thin rule, kicker, big multi-line title. */
export default function SectionHeader({ index, kicker, title, sub, dark = false, aside }: Props) {
  const rule = dark ? "border-paper/25" : "border-ink";
  const muted = dark ? "text-paper/60" : "text-mute";
  return (
    <header className={`border-t ${rule} pt-4`}>
      <div className="flex items-baseline justify-between gap-4 text-xs font-bold tracking-[0.18em]">
        <span>{kicker}</span>
        {index && <span className={muted}>{index}</span>}
      </div>
      <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-12 md:items-end">
        <h2 className="whitespace-pre-line text-[2.15rem] font-black leading-[1.12] tracking-[-0.04em] md:col-span-7 md:text-6xl">
          {title}
        </h2>
        {(sub || aside) && (
          <div className="md:col-span-5 md:pb-2">
            {sub && <p className={`whitespace-pre-line text-base leading-relaxed md:text-lg ${muted}`}>{sub}</p>}
            {aside}
          </div>
        )}
      </div>
    </header>
  );
}
