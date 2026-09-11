"use client";

import Link from "next/link";
import { useAppState } from "@/lib/store";
import { nextMatch } from "@/data/matches";
import { cosmosContent } from "@/data/content";
import { officialChannels } from "@/data/channels";
import { sponsors } from "@/data/sponsors";
import type { SponsorCategory } from "@/data/types";

const sponsorGroups: { category: SponsorCategory; label: string }[] = [
  { category: "MAIN", label: "MAIN" },
  { category: "KIT", label: "KIT" },
  { category: "MEDICAL", label: "MEDICAL" },
  { category: "OFFICIAL", label: "OFFICIAL" },
];

function formatMatchDate(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} (${days[d.getDay()]})`;
}

export default function Home() {
  const { isLoggedIn, surveys, isSurveyCompleted, cheer, hasCheeredToday } = useAppState();

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
          <span className="matchTeam">파주 프런티어FC</span>
          <span className="matchVs">VS</span>
          <span className="matchTeam">{nextMatch.opponent}</span>
        </div>
        <div className="matchMeta">
          {formatMatchDate(nextMatch.date)} {nextMatch.time} · {nextMatch.venue}
          {nextMatch.homeAway === "HOME" ? " · HOME" : " · AWAY"}
        </div>
        <div className="matchActions">
          <Link className="ghostBtnNavy" href="/fanzone">
            경기 정보
          </Link>
          <a className="ghostBtnNavy" href="#" onClick={(e) => e.preventDefault()}>
            티켓 예매
          </a>
          {nextMatch.isToday && (
            <Link className="primaryBtn" href="/fanzone">
              직관 인증
            </Link>
          )}
        </div>
      </section>

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
            <p className="quickTitle">바꾸고 싶은 부분이 있나요?</p>
            <p className="muted">제안 작성 시 +30 P:POINT, 구단이 직접 검토하고 답합니다.</p>
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
        <p className="muted">파주 프런티어FC의 최신 소식</p>
        <div className="contentGrid">
          {cosmosContent.map((c) => (
            <div className="panel contentCard" key={c.id}>
              <span className="catLabel">{c.platform}</span>
              <p className="boardTitle">{c.title}</p>
              <p className="muted" style={{ marginTop: 4 }}>
                {c.publishedAt}
              </p>
            </div>
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
        <div className="sectionHead">
          <h2>SPONSORS</h2>
        </div>
        <div className="sponsorGrid">
          {sponsorGroups.map((g) => (
            <div key={g.category} className="sponsorGroup">
              <span className="sponsorGroupLabel">{g.label}</span>
              <div className="sponsorTiles">
                {sponsors
                  .filter((s) => s.category === g.category)
                  .map((s) => (
                    <div className="sponsorTile" key={s.id}>
                      {s.name}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
