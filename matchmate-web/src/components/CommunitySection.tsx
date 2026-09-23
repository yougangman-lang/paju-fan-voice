import SmartImage from "./SmartImage";
import Container from "./Container";

const shots = [
  { src: "/images/community/fans-01.png", copy: "같이 응원하면 더 재밌으니까.", alt: "함께 응원하는 대학생 팬들" },
  { src: "/images/community/fans-02.png", copy: "직관이 친목이 되는 순간.", alt: "직관에서 친해진 친구들" },
  { src: "/images/community/fans-03.png", copy: "축구보다 먼저, 사람.", alt: "경기장에서 함께한 사람들" },
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
            <figure
              key={shot.src}
              className={
                i === 0 ? "md:col-span-6" : i === 1 ? "md:col-span-3 md:mt-32" : "md:col-span-3 md:mt-12"
              }
            >
              <div className={`relative overflow-hidden ${i === 0 ? "aspect-[4/5]" : "aspect-[3/4]"}`}>
                <SmartImage
                  src={shot.src}
                  alt={shot.alt}
                  sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
                  className="object-cover contrast-[1.04]"
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
