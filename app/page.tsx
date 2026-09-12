"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAppState } from "@/lib/store";
import { nextMatch, nextMatchPreview } from "@/data/matches";
import { cosmosContent } from "@/data/content";
import { officialChannels } from "@/data/channels";
import YouTubeIcon from "@/components/YouTubeIcon";
import MatchInfoModal from "@/components/MatchInfoModal";
import Toast from "@/components/Toast";

function formatMatchDate(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} (${days[d.getDay()]})`;
}

export default function Home() {
  const { isLoggedIn, surveys, isSurveyCompleted, cheer, hasCheeredToday } = useAppState();
  const [showMatchInfo, setShowMatchInfo] = useState(false);
  const [showTicketToast, setShowTicketToast] = useState(false);
  const ticketToastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (ticketToastTimer.current) clearTimeout(ticketToastTimer.current);
    };
  }, []);

  const handleTicketClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowTicketToast(true);
    if (ticketToastTimer.current) clearTimeout(ticketToastTimer.current);
    ticketToastTimer.current = setTimeout(() => setShowTicketToast(false), 2400);
  };

  const surveyContext = nextMatch.isToday ? nextMatch.homeAway : "NON_MATCHDAY";
  const todaySurvey =
    surveys.find((s) => s.status === "active" && s.context === surveyContext) ??
    surveys.find((s) => s.status === "active");

  return (
    <div className="stack">
      {/* NEXT MATCH */}
      <section className="matchCard">
        <div className="matchTop">
          <span className="matchComp">{nextMatch.competition}</span>
          <span className="matchLabel">NEXT MATCH</span>
        </div>
        <div className="matchTeams">
          <span className="matchTeamHome">
            <img src="/branding/paju-frontier-crest.png" alt="파주 프런티어FC 엠블럼" className="matchCrest" />
            파주 프런티어FC
          </span>
          <div className="matchCenter">
            <span className="matchVs">VS</span>
            <p className="matchMeta">
              {formatMatchDate(nextMatch.date)} {nextMatch.time} · {nextMatch.venue}
              {nextMatch.homeAway === "HOME" ? " · HOME" : " · AWAY"}
            </p>
          </div>
          <span className="matchTeam matchTeamAway">
            {nextMatch.opponent}
            {nextMatch.opponentCrest && (
              <img src={nextMatch.opponentCrest} alt={`${nextMatch.opponent} 엠블럼`} className="matchCrest" />
            )}
          </span>
        </div>
        <div className="matchActions">
          <button className="ghostBtnNavy" onClick={() => setShowMatchInfo(true)}>
            경기 정보
          </button>
          <a className="ghostBtnNavy" href="#" onClick={handleTicketClick}>
            티켓 예매
          </a>
          {nextMatch.isToday && (
            <Link className="primaryBtn" href="/fanzone">
              직관 인증
            </Link>
          )}
        </div>
      </section>

      {showMatchInfo && (
        <MatchInfoModal
          match={nextMatch}
          preview={nextMatchPreview}
          onClose={() => setShowMatchInfo(false)}
        />
      )}

      {/* 오늘의 설문 */}
      {todaySurvey && (
        <section>
          <div className="sectionHead">
            <h2>오늘의 설문</h2>
          </div>
          <div className="panel surveyTeaser">
            <div>
              <p className="surveyTeaserTitle">{todaySurvey.title}</p>
              <p className="muted">
                {todaySurvey.questions.length}문항 · 참여 완료 시 +{todaySurvey.pointReward} P:POINT
              </p>
            </div>
            {isSurveyCompleted(todaySurvey.id) ? (
              <span className="success" style={{ margin: 0 }}>
                참여 완료
              </span>
            ) : (
              <Link className="primaryBtn" href={`/survey/${todaySurvey.id}`}>
                설문 참여하기
              </Link>
            )}
          </div>
        </section>
      )}

      {/* FAN ZONE / 팬 제안 빠른 참여 */}
      <section>
        <div className="sectionHead">
          <h2>지금 참여할 수 있어요</h2>
        </div>
        <div className="quickGrid">
          <div className="panel quickCard">
            <span className="eyebrowSmall">FAN ZONE</span>
            <p className="quickTitle">오늘도 파주와 함께해 주세요.</p>
            <p className="muted">응원 한 번으로 +5 P:POINT를 받아보세요.</p>
            <div className="quickActions">
              {isLoggedIn ? (
                <button className="primaryBtn" onClick={cheer} disabled={hasCheeredToday}>
                  {hasCheeredToday ? "오늘 응원 완료" : "파주를 응원해요"}
                </button>
              ) : (
                <Link className="primaryBtn" href="/login">
                  로그인하고 응원하기
                </Link>
              )}
              <Link href="/fanzone" className="quickLink">
                FAN ZONE 더 보기 →
              </Link>
            </div>
          </div>
          <div className="panel quickCard">
            <span className="eyebrowSmall">팬 제안</span>
            <p className="quickTitle">파주에서의 경험을 들려주세요.</p>
            <p className="muted">경기장 운영부터 팬서비스까지, 팬의 생각을 함께 모아 더 나은 경험을 만들어갑니다.</p>
            <div className="quickActions">
              <Link href="/suggestions" className="primaryBtn">
                팬 제안 남기기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COSMOS CONTENT */}
      <section>
        <div className="sectionHead">
          <h2>COSMOS CONTENT</h2>
        </div>
        <div className="contentGrid">
          {cosmosContent.map((c) => (
            <a
              className="contentCard"
              key={c.id}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={c.thumbnail} alt={c.title} className="contentThumb" />
              <div className="contentCardBody">
                <YouTubeIcon size={16} />
                <p className="contentCardTitle">{c.title}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* OFFICIAL CHANNELS */}
      <section>
        <div className="sectionHead">
          <h2>OFFICIAL CHANNELS</h2>
        </div>
        <div className="channelRow">
          {officialChannels.map((ch) => (
            <a key={ch.id} href={ch.url} className="channelPill">
              {ch.label}
            </a>
          ))}
        </div>
      </section>

      {/* SPONSORS */}
      <section>
        <img
          src="/sponsors/paju-sponsors-official.png"
          alt="파주 프런티어FC 공식 스폰서"
          className="sponsorsImage"
        />
      </section>

      {showTicketToast && <Toast message="티켓 예매 기능은 준비 중입니다." />}
    </div>
  );
}
