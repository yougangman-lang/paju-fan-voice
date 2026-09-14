"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppState } from "@/lib/store";
import { nextMatch } from "@/data/matches";
import { players } from "@/data/players";
import TierIcon from "@/components/TierIcon";
import PlayerCard from "@/components/PlayerCard";
import type { Player } from "@/data/types";

export default function FanZonePage() {
  const {
    isLoggedIn,
    cheer,
    hasCheeredToday,
    postCheerMessage,
    hasSentCheerMessageToday,
    cheerMessages,
    playerCheerMessages,
    postPlayerCheerMessage,
    isMatchVerified,
    verifyAttendance,
  } = useAppState();

  const [message, setMessage] = useState("");
  const [verifyMethod, setVerifyMethod] = useState<"ticket_number" | "mobile_ticket">("ticket_number");
  const [ticketInput, setTicketInput] = useState("");
  const [showVerify, setShowVerify] = useState(false);
  const [justVerified, setJustVerified] = useState(false);
  const [cheerTab, setCheerTab] = useState<"club" | "player">("club");
  const [cheerPlayer, setCheerPlayer] = useState<Player | null>(null);
  const [playerMessage, setPlayerMessage] = useState("");

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

  const submitPlayerMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cheerPlayer || !playerMessage.trim()) return;
    postPlayerCheerMessage(cheerPlayer.id, cheerPlayer.name, playerMessage.trim());
    setPlayerMessage("");
    setCheerPlayer(null);
  };

  const verified = isMatchVerified(nextMatch.id);
  const showAttendanceCard = nextMatch.isToday;

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

      <div className={`fanzoneTopGrid${showAttendanceCard ? "" : " single"}`}>
        <section className="panel fanzoneActionCard">
          <p className="quickTitle">오늘도 파주를 응원해 주세요.</p>
          <p className="muted" style={{ marginTop: 4 }}>
            하루 한 번 응원하고 +5 P:POINT
          </p>
          <button className="primaryBtn" style={{ marginTop: 14 }} onClick={cheer} disabled={hasCheeredToday}>
            {hasCheeredToday ? "오늘 응원 완료" : "파주 응원하기"}
          </button>
        </section>

        {showAttendanceCard && (
          <section className="panel fanzoneActionCard">
            <p className="quickTitle">오늘 경기장에서 함께하시나요?</p>
            <p className="muted" style={{ marginTop: 4 }}>
              직관을 인증하고 +50 P:POINT
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

      <section className="panel">
        <div className="sortToggle cheerNav">
          <button type="button" className={cheerTab === "club" ? "isActive" : ""} onClick={() => setCheerTab("club")}>
            구단 응원
          </button>
          <button type="button" className={cheerTab === "player" ? "isActive" : ""} onClick={() => setCheerTab("player")}>
            선수 응원
          </button>
        </div>

        {cheerTab === "club" ? (
          <div style={{ marginTop: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>파주에 응원의 한마디를 전해주세요.</h2>
            <p className="muted" style={{ marginTop: 4 }}>
              선수단과 구단에게 짧은 응원 메시지를 남겨보세요. 작성 시 +10 P:POINT(하루 최초 1회).
            </p>
            <form onSubmit={submitMessage} style={{ marginTop: 14, display: "flex", gap: 8 }}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="구단과 선수단에 힘이 되는 메시지를 남겨주세요."
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
          </div>
        ) : (
          <div style={{ marginTop: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>선수단에게 응원을 전해주세요.</h2>
            <p className="muted" style={{ marginTop: 4 }}>
              선수를 선택하고 응원 메시지를 남겨보세요. 구단 응원과 하루 +10 P:POINT 한도를 함께 사용합니다.
            </p>

            {players.length === 0 ? (
              <p className="muted" style={{ marginTop: 18 }}>
                선수단 명단이 곧 업데이트될 예정이에요. 조금만 기다려주세요.
              </p>
            ) : (
              <div className="playerGrid" style={{ marginTop: 16 }}>
                {players.map((p) => (
                  <PlayerCard key={p.id} player={p} onCheer={setCheerPlayer} />
                ))}
              </div>
            )}

            {playerCheerMessages.length > 0 && (
              <div className="board" style={{ marginTop: 18 }}>
                {playerCheerMessages.map((m) => {
                  const isManager = players.find((p) => p.id === m.playerId)?.position === "감독";
                  return (
                  <div className="boardRow" key={m.id}>
                    <div className="boardMeta">
                      <span style={{ fontWeight: 700 }}>{m.author}</span>
                      <TierIcon tier={m.authorTier} />
                      <span style={{ color: "var(--muted)" }}>
                        · {m.playerName} {isManager ? "감독님" : "선수"} · {m.createdAt}
                      </span>
                    </div>
                    <p className="boardExcerpt" style={{ marginTop: 4 }}>
                      {m.content}
                    </p>
                  </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </section>

      {cheerPlayer && (
        <div className="popupOverlay" role="dialog" aria-modal="true" onClick={() => setCheerPlayer(null)}>
          <div className="playerCheerModal" onClick={(e) => e.stopPropagation()}>
            <button className="popupClose" onClick={() => setCheerPlayer(null)} aria-label="닫기">
              ×
            </button>
            <h3>{cheerPlayer.name} {cheerPlayer.position === "감독" ? "감독님" : "선수"}에게 응원의 한마디</h3>
            <form onSubmit={submitPlayerMessage} style={{ marginTop: 14 }}>
              <input
                value={playerMessage}
                onChange={(e) => setPlayerMessage(e.target.value)}
                placeholder={`${cheerPlayer.name} ${cheerPlayer.position === "감독" ? "감독님" : "선수"}에게 힘이 되는 한마디를 남겨주세요.`}
                style={{ width: "100%", padding: "11px 12px", border: "1px solid var(--line)", borderRadius: 8 }}
                maxLength={80}
                autoFocus
              />
              <button className="primaryBtn" type="submit" style={{ marginTop: 12, width: "100%", border: "none" }}>
                응원 남기기
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
