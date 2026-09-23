"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { JOINED_KEY, readJSON, writeJSON } from "@/lib/match";

type Props = {
  id: string;
  label?: string;
  full?: boolean;
};

/** Prototype join action — stored in localStorage only. */
export default function JoinButton({ id, label = "같이 갈래?", full = false }: Props) {
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setJoined(readJSON<string[]>(JOINED_KEY, []).includes(id));
  }, [id]);

  const toggle = () => {
    const list = readJSON<string[]>(JOINED_KEY, []);
    const next = joined ? list.filter((x) => x !== id) : [...list, id];
    writeJSON(JOINED_KEY, next);
    setJoined(!joined);
  };

  if (full && !joined) {
    return (
      <p className="inline-flex min-h-16 items-center border border-paper/30 px-8 text-lg font-bold opacity-70">
        마감됐어요 · 대기 신청은 준비 중
      </p>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        className={`group inline-flex min-h-16 w-full items-center justify-between gap-8 px-8 text-xl font-black transition-colors sm:w-auto ${
          joined ? "bg-paper text-ink" : "bg-brand text-paper hover:bg-paper hover:text-ink"
        }`}
      >
        {joined ? (
          <>
            신청 완료 <Check size={24} strokeWidth={3} />
          </>
        ) : (
          <>
            {label} <ArrowRight size={24} className="transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
      <p className="mt-3 text-sm opacity-60" aria-live="polite">
        {joined ? "신청 내역은 이 브라우저에만 저장돼요. 다시 누르면 취소돼요." : "프로토타입 — 실제 결제·예매는 진행되지 않아요."}
      </p>
    </div>
  );
}
