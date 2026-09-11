"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppState } from "@/lib/store";
import { nextMatch } from "@/data/matches";
import TierIcon from "@/components/TierIcon";

export default function FanZonePage() {
  const {
    isLoggedIn,
    cheer,
    hasCheeredToday,
    postCheerMessage,
    hasSentCheerMessageToday,
    cheerMessages,
    isMatchVerified,
    verifyAttendance,
  } = useAppState();

  const [message, setMessage] = useState("");
  const [verifyMethod, setVerifyMethod] = useState<"ticket_number" | "mobile_ticket">("ticket_number");
  const [ticketInput, setTicketInput] = useState("");
  const [showVerify, setShowVerify] = useState(false);
  const [justVerified, setJustVerified] = useState(false);

  const submitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    postCheerMessage(message.trim());
    setMessage("");
  };

  const submitVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketInput.trim()) return;
    verifyAttendance(nextMatch.id);
    setJustVerified(true);
    setTicketInput("");
  };

  const verified = isMatchVerified(nextMatch.id);

  if (!isLoggedIn) {
    return (
      <div className="stack">
        <div className="pageTitle">
          <h1>FAN ZONE</h1>
          <p>로그인 후 응원하고 P:POINT를 쌓아보세요.</p>
        </div>
        <Link className="primaryBtn" href="/login" style={{ width: "fit-content" }}>
          로그인하기
        </Link>
      </div>
    );
  }

  return (
    <div className="stack">
      <div className="pageTitle">
        <h1>FAN ZONE</h1>
        <p>파주 프런티어FC를 향한 긍정적인 응원과 참여가 모이는 공간입니다.</p>
      </div>

      <section className="panel">
        <p className="quickTitle">오늘도 파주와 함께해 주세요.</p>
        <p className="muted" style={{ marginTop: 4 }}>
          응원 버튼은 하루 한 번, +5 P:POINT가 적립돼요.
        </p>
        <button className="primaryBtn" style={{ marginTop: 14 }} onClick={cheer} disabled={hasCheeredToday}>
          {hasCheeredToday ? "오늘 응원 완료" : "파주를 응원해요"}
        </button>
      </section>

      <section className="panel">
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>응원의 한마디를 전해주세요!</h2>
        <p className="muted" style={{ marginTop: 4 }}>
          선수단과 구단에게 짧은 응원 메시지를 남겨보세요. 작성 시 +10 P:POINT(하루 최초 1회).
        </p>
        <form onSubmit={submitMessage} style={{ marginTop: 14, display: "flex", gap: 8 }}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="선수단에게 힘이 되는 한마디를 남겨주세요."
            style={{ flex: 1, padding: "11px 12px", border: "1px solid var(--line)", borderRadius: 8 }}
            maxLength={80}
          />
          <button className="primaryBtn" type="submit" style={{ border: "none", whiteSpace: "nowrap" }}>
            {hasSentCheerMessageToday ? "메시지 남기기" : "메시지 남기기 +10P"}
          </button>
        </form>

        <div className="board" style={{ marginTop: 18 }}>
          {cheerMessages.map((m) => (
            <div className="boardRow" key={m.id}>
              <div className="boardMeta">
                <span style={{ fontWeight: 700 }}>{m.author}</span>
                <TierIcon tier={m.authorTier} />
                <span style={{ color: "var(--muted)" }}>· {m.createdAt}</span>
              </div>
              <p className="boardExcerpt" style={{ marginTop: 4 }}>
                {m.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {nextMatch.isToday && (
        <section className="panel">
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>오늘 경기장에서 함께하시나요?</h2>
          <p className="muted" style={{ marginTop: 4 }}>
            직관 인증을 완료하면 +50 P:POINT가 적립돼요. (경기당 1회)
          </p>

          {verified || justVerified ? (
            <div className="success" style={{ marginTop: 14 }}>
              티켓 인증이 완료되었습니다. {justVerified && "· +50 P:POINT"}
            </div>
          ) : !showVerify ? (
            <button className="primaryBtn" style={{ marginTop: 14 }} onClick={() => setShowVerify(true)}>
              직관 인증
            </button>
          ) : (
            <form onSubmit={submitVerify} className="verifyForm">
              <div className="sortToggle" style={{ marginTop: 14, width: "fit-content" }}>
                <button
                  type="button"
                  className={verifyMethod === "ticket_number" ? "isActive" : ""}
                  onClick={() => setVerifyMethod("ticket_number")}
                >
                  예매번호 입력
                </button>
                <button
                  type="button"
                  className={verifyMethod === "mobile_ticket" ? "isActive" : ""}
                  onClick={() => setVerifyMethod("mobile_ticket")}
                >
                  모바일 티켓
                </button>
              </div>
              <input
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
                placeholder={verifyMethod === "ticket_number" ? "예매번호를 입력하세요" : "모바일 티켓 QR 코드를 스캔했다고 가정합니다"}
                style={{
                  marginTop: 10,
                  width: "100%",
                  padding: "11px 12px",
                  border: "1px solid var(--line)",
                  borderRadius: 8,
                }}
              />
              <button className="primaryBtn" type="submit" style={{ marginTop: 10, border: "none" }}>
                인증 완료
              </button>
              <p className="simNotice">
                현재 프로토타입에서는 인증 과정을 시뮬레이션합니다. 실서비스에서는 티켓 시스템의
                실제 입장 기록과 연동할 수 있습니다.
              </p>
            </form>
          )}
        </section>
      )}
    </div>
  );
}
