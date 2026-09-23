import { sixLineStops } from "@/data/journeys";
import Container from "./Container";
import SectionHeader from "./SectionHeader";
import { LineJourney } from "./JourneyTimeline";

export default function SixLineSection({ index = "04 / 06" }: { index?: string }) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader
          index={index}
          kicker="6 LINE JOURNEY"
          title={"6호선을 타고,\nMatchday 완성."}
          sub={
            <>
              <span className="block text-2xl font-black tracking-[-0.03em] text-ink">먹고, 만나고, 놀다가 상암으로.</span>
              <span className="mt-3 block">지하철 한 줄이 하루를 이어줘요. 역마다 할 일이 하나씩.</span>
            </>
          }
        />
        <div className="mt-12 md:mt-16">
          <LineJourney stops={sixLineStops} />
        </div>
      </Container>
    </section>
  );
}
