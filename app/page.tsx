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
import { CheerFlagIcon, SuggestionBubbleIcon } from "@/components/HomeActionIcons";
import SocialIcons from "@/components/SocialIcons";

function formatMatchDate(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} (${days[d.getDay()]})`;
}

export default function Home() {
  const { surveys, isSurveyCompleted } = useAppState();
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
    <div className="homeStack">
      {/* NEXT MATCH — Priority 1 */}
      <section className="matchCard matchCardHero">
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

      {/* 오늘의 설문 — Priority 2 */}
      {todaySurvey && (
        <section className="pollSection">
          <div className="pollCard">
            <div className="pollAccentBar" aria-hidden="true" />
            <div className="pollBody">
              <span className="pollEyebrow">TODAY&apos;S POLL · 오늘의 설문</span>
              <p className="pollTitle">{todaySurvey.title}</p>
              <p className="pollDesc">구단이 지금 알고 싶은 질문에 20초로 답해보세요.</p>
              <p className="pollMeta">
                {todaySurvey.questions.length}문항 · 참여 완료 시{" "}
                <b className="pollReward">+{todaySurvey.pointReward} P:POINT</b>
              </p>
            </div>
            <div className="pollCta">
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
          </div>
        </section>
      )}

      {/* FAN ZONE / 팬 제안 — Priority 3, secondary actions */}
      <section className="actionSection">
        <div className="actionGrid">
          <div className="actionPanel actionPanelBlue">
            <div className="actionIcon actionIconBlue">
              <CheerFlagIcon size={20} />
            </div>
            <div className="actionBody">
              <p className="actionTitle">FAN ZONE</p>
              <p className="actionDesc">팀과 선수를 응원하고, 경기장에서의 참여를 기록해보세요.</p>
            </div>
            <div className="actionCtaRow">
              <Link href="/fanzone" className="smallBtn actionCta">
                FAN ZONE 들어가기
              </Link>
            </div>
          </div>
          <div className="actionPanel actionPanelPink">
            <div className="actionIcon actionIconPink">
              <SuggestionBubbleIcon size={20} />
            </div>
            <div className="actionBody">
              <p className="actionTitle">팬 제안</p>
              <p className="actionDesc">아이디어를 제안하고, 팬들의 공감으로 함께 우선순위를 만들어보세요.</p>
            </div>
            <div className="actionCtaRow">
              <Link href="/suggestions" className="smallBtn actionCta">
                팬 제안 남기기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COSMOS CONTENT — Priority 4, 정보성 콘텐츠 */}
      <section className="cosmosSection">
        <div className="sectionHead cosmosSectionHead">
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

      {/* OFFICIAL CHANNELS / SPONSORS — Priority 5, footer utility */}
      <section className="footerUtility">
        <div className="footerBlock">
          <span className="footerLabel">OFFICIAL CHANNELS</span>
          <p className="footerSocialCopy">파주 프런티어FC의 더 많은 소식을 만나보세요.</p>
          <SocialIcons channels={officialChannels} />
        </div>
        <div className="footerBlock">
          <span className="footerLabel">SPONSORS</span>
          <img
            src="/sponsors/paju-sponsors-official.png"
            alt="파주 프런티어FC 공식 스폰서"
            className="sponsorsImage"
          />
        </div>
      </section>

      {showTicketToast && <Toast message="티켓 예매 기능은 준비 중입니다." />}
    </div>
  );
}
