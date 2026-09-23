import { fansPhotos } from "@/data/photos";
import SmartImage from "./SmartImage";
import Container from "./Container";

/* Each shot keeps a crop close to the photo's own ratio so faces stay in frame. */
const shots = [
  {
    ...fansPhotos.fans02,
    copy: "같이 응원하면 더 재밌으니까.",
    figure: "md:col-span-7",
    frame: "aspect-[16/10]",
    position: "object-[25%_40%]",
    sizes: "(min-width: 768px) 55vw, 100vw",
  },
  {
    ...fansPhotos.fans03,
    copy: "축구보다 먼저, 사람.",
    figure: "w-2/3 md:col-span-2 md:mt-28 md:w-auto",
    frame: "aspect-[9/16]",
    position: "object-[50%_30%]",
    sizes: "(min-width: 768px) 17vw, 66vw",
  },
  {
    ...fansPhotos.fans01,
    copy: "직관이 친목이 되는 순간.",
    figure: "md:col-span-3 md:mt-12",
    frame: "aspect-[3/2] md:aspect-square",
    position: "object-center",
    sizes: "(min-width: 768px) 25vw, 100vw",
  },
];

export default function CommunitySection({ index = "05 / 06" }: { index?: string }) {
  return (
    <section className="bg-ink py-20 text-paper md:py-28">
      <Container>
        <div className="flex items-baseline justify-between border-t border-paper/25 pt-4 text-xs font-bold tracking-[0.18em]">
          <span>COMMUNITY</span>
          <span className="text-paper/60">{index}</span>
        </div>
        <h2 className="mt-8 text-[2.4rem] font-black leading-[1.1] tracking-[-0.045em] md:mt-12 md:text-7xl">
          혼자보다,
          <br />
          <span className="text-brand">같이 가는</span> 직관.
        </h2>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-3">
          {shots.map((shot, i) => (
            <figure key={shot.src} className={shot.figure}>
              <div className={`relative overflow-hidden bg-paper/10 ${shot.frame}`}>
                <SmartImage
                  src={shot.src}
                  alt={shot.alt}
                  sizes={shot.sizes}
                  className={`object-cover contrast-[1.04] ${shot.position}`}
                />
              </div>
              <figcaption className="mt-4 flex gap-3 text-lg font-bold leading-snug md:text-xl">
                <span className="font-display text-brand">0{i + 1}</span>
                {shot.copy}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
