import type { RouteStop } from "@/data/hosts";
import type { JourneyStop } from "@/data/journeys";
import SmartImage from "./SmartImage";

function LifestylePlaceholder({ label, sub, tone, final = false }: { label: string; sub: string; tone: string; final?: boolean }) {
  return (
    <div
      aria-hidden
      className={`placeholder-stripes absolute inset-0 flex flex-col justify-between p-4 ${final ? "text-paper" : "text-ink"}`}
      style={{ backgroundColor: final ? "#D71920" : tone }}
    >
      <span className="text-[11px] font-bold tracking-[0.18em] opacity-60">{sub}</span>
      <span className="break-all text-3xl font-black leading-tight tracking-[-0.05em] opacity-80 lg:text-[2.1rem]">{label}</span>
    </div>
  );
}

function StopPhoto({ stop, final, sizes }: { stop: JourneyStop; final: boolean; sizes: string }) {
  return (
    <SmartImage
      src={stop.image}
      alt={`${stop.stationKo} — ${stop.activityKo}`}
      sizes={sizes}
      className="object-cover"
      fallback={<LifestylePlaceholder label={stop.stationKo} sub={stop.activity.toUpperCase()} tone={stop.tone} final={final} />}
    />
  );
}

/** Home / discover — 6호선 route as big dots and a line. */
export function LineJourney({ stops }: { stops: JourneyStop[] }) {
  const last = stops.length - 1;
  return (
    <>
      {/* Desktop: horizontal */}
      <ol className="hidden md:grid" style={{ gridTemplateColumns: `repeat(${stops.length}, minmax(0, 1fr))` }}>
        {stops.map((stop, i) => (
          <li key={stop.id} className="flex flex-col">
            <div className="relative mr-3 aspect-[3/4] overflow-hidden">
              <StopPhoto stop={stop} final={i === last} sizes="20vw" />
            </div>
            <div className="relative mt-8 flex h-8 items-center">
              {i !== last && <span className="absolute left-3 right-0 top-1/2 h-[3px] -translate-y-1/2 bg-line6" />}
              <span
                className={`relative z-10 block rounded-full border-[3px] ${
                  i === last ? "h-8 w-8 border-brand bg-brand" : "h-6 w-6 border-line6 bg-paper"
                }`}
              />
            </div>
            <p className="mt-5 text-xs font-bold tracking-[0.18em] text-mute">{stop.stationKo}</p>
            <p className={`mt-1 pr-3 font-display text-3xl leading-none tracking-wide lg:text-4xl ${i === last ? "text-brand" : ""}`}>
              {stop.station}
            </p>
            <p className="mt-3 text-lg font-black">{stop.activity}</p>
            <p className="mt-1 pr-4 text-sm leading-relaxed text-mute">{stop.copy}</p>
          </li>
        ))}
      </ol>

      {/* Mobile: vertical */}
      <ol className="md:hidden">
        {stops.map((stop, i) => (
          <li key={stop.id} className="relative grid grid-cols-[2.25rem_1fr] gap-x-3">
            <div className="relative flex justify-center">
              {i !== last && <span className="absolute bottom-0 top-3 w-[3px] bg-line6" />}
              <span
                className={`relative z-10 mt-1 block rounded-full border-[3px] ${
                  i === last ? "h-8 w-8 border-brand bg-brand" : "h-6 w-6 border-line6 bg-paper"
                }`}
              />
            </div>
            <div className="pb-10">
              <div className="flex items-baseline justify-between">
                <p className={`font-display text-[2rem] leading-none tracking-wide ${i === last ? "text-brand" : ""}`}>
                  {stop.station}
                </p>
                <p className="text-base font-black">{stop.activity}</p>
              </div>
              <p className="mt-1 text-sm text-mute">
                {stop.stationKo} · {stop.copy}
              </p>
              <div className="relative mt-4 aspect-[16/10] overflow-hidden">
                <StopPhoto stop={stop} final={i === last} sizes="85vw" />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

/** Host / crew detail — the day as a timed schedule. */
export function ScheduleJourney({ route }: { route: RouteStop[] }) {
  const last = route.length - 1;
  return (
    <ol>
      {route.map((stop, i) => {
        const isMatch = stop.place === "FC SEOUL MATCH";
        return (
          <li key={`${stop.time}-${stop.place}`} className="relative grid grid-cols-[4.5rem_2rem_1fr] gap-x-2 md:grid-cols-[8rem_3rem_1fr]">
            <p className={`pt-0.5 font-display text-2xl tabular-nums md:text-4xl ${isMatch ? "text-brand" : ""}`}>{stop.time}</p>
            <div className="relative flex justify-center">
              {i !== last && <span className="absolute bottom-0 top-3 w-[3px] bg-line6" />}
              <span
                className={`relative z-10 mt-2 block rounded-full border-[3px] ${
                  isMatch ? "h-7 w-7 border-brand bg-brand" : "h-5 w-5 border-line6 bg-paper"
                }`}
              />
            </div>
            <div className="flex gap-4 border-b border-ink/10 pb-8 pt-0.5 md:pb-10">
              <div className="flex-1">
                <p className={`font-display text-[1.75rem] leading-none tracking-wide md:text-4xl ${isMatch ? "text-brand" : ""}`}>
                  {stop.place}
                </p>
                <p className="mt-2 text-lg font-black">{stop.activity}</p>
                {stop.note && <p className="mt-1 text-[15px] text-mute">{stop.note}</p>}
              </div>
              {stop.image && (
                <div className="relative hidden aspect-[4/3] w-44 shrink-0 overflow-hidden sm:block">
                  <SmartImage
                    src={stop.image}
                    alt={`${stop.place} ${stop.activity}`}
                    sizes="176px"
                    className="object-cover"
                    fallback={<LifestylePlaceholder label={stop.activity} sub={stop.place} tone="#E4DDCB" />}
                  />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default LineJourney;
