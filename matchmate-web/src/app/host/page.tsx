import type { Metadata } from "next";
import { hosts } from "@/data/hosts";
import Container from "@/components/Container";
import HostCard from "@/components/HostCard";

export const metadata: Metadata = { title: "HOST — MATCHMATE SEOUL" };

export default function HostIndexPage() {
  return (
    <Container className="pt-12 md:pt-20">
      <p className="text-xs font-bold tracking-[0.2em] text-brand">HOST PICK</p>
      <h1 className="mt-4 text-[2.6rem] font-black leading-[1.1] tracking-[-0.05em] md:text-7xl">
        사람을 고르면,
        <br />
        하루가 따라옵니다.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">
        HOST는 인플루언서일 수도, 같은 학교 선배나 동아리원일 수도 있어요. 각자 만든 하루에 그대로 참여하면 돼요.
      </p>

      <div className="mt-12 grid gap-3 md:mt-16 md:grid-cols-2">
        {hosts.map((host, i) => (
          <div key={host.id} className={i === 0 ? "md:col-span-2 md:grid md:grid-cols-12" : ""}>
            <div className={i === 0 ? "md:col-span-8" : ""}>
              <HostCard host={host} variant={i === 0 ? "feature" : "swipe"} index={i + 1} />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
