import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hosts } from "@/data/hosts";
import Container from "./Container";
import SectionHeader from "./SectionHeader";
import HostCard from "./HostCard";

export default function HostPickSection({ index = "03 / 06" }: { index?: string }) {
  const [feature, second, third] = hosts;
  return (
    <section id="host-pick" className="scroll-mt-20 py-20 md:py-28">
      <Container>
        <SectionHeader
          index={index}
          kicker="HOST PICK"
          title={"HOST랑\n뭐 하지?"}
          sub={"사람을 고르면,\n하루가 따라옵니다."}
        />

        {/* Desktop: asymmetric editorial grid */}
        <div className="mt-14 hidden gap-3 md:grid md:grid-cols-12">
          <div className="md:col-span-7">
            <HostCard host={feature} variant="feature" index={1} />
          </div>
          <div className="flex flex-col gap-3 md:col-span-5">
            <div className="flex-1">
              <HostCard host={second} variant="wide" index={2} />
            </div>
            <div className="flex-1">
              <HostCard host={third} variant="overlay" index={3} />
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile: horizontal swipe */}
      <div className="swipe-row mt-10 flex gap-3 overflow-x-auto px-5 pb-2 md:hidden">
        {hosts.map((host, i) => (
          <div key={host.id} className="w-[85%] shrink-0">
            <HostCard host={host} variant="swipe" index={i + 1} />
          </div>
        ))}
      </div>

      <Container>
        <Link
          href="/host"
          className="group mt-8 inline-flex min-h-12 items-center gap-2 border-b-2 border-ink text-base font-bold hover:border-brand hover:text-brand"
        >
          모든 HOST의 하루 보기
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Container>
    </section>
  );
}
