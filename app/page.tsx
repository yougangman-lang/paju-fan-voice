"use client";

import Link from "next/link";
import { useAppState } from "@/lib/store";
import type { Voice } from "@/data/types";

export default function Home() {
  const { points, polls, answers, answerQuestion, isPollCompleted, voices } = useAppState();

  const todayPoll = polls[0];
  const todayQuestion = todayPoll.questions[0];
  const myPick = answers[todayQuestion.id];
  const totalVotes = todayQuestion.options.reduce((sum, o) => sum + o.votes, 0);

  const hotVoices = [...voices].sort((a, b) => b.likes - a.likes).slice(0, 3);

  const recentFeedback = voices
    .filter((v): v is Voice & { clubFeedback: NonNullable<Voice["clubFeedback"]> } => !!v.clubFeedback)
    .sort((a, b) => (a.clubFeedback.date < b.clubFeedback.date ? 1 : -1))
    .slice(0, 2);

  return (
    <div className="stack">
      <section className="hero">
        <div>
          <span className="eyebrow">PAJU FRONTIER FC</span>
          <h1>
            팬의 목소리가
            <br />
            구단의 다음 행동이 되도록.
          </h1>
          <p>
            짧은 설문, 팬 제안, 공감, 구단 피드백을 하나의 흐름으로 연결하는 파주 프런티어FC
            팬 참여 플랫폼입니다. 1분이면 참여할 수 있어요.
          </p>
          <div className="actions">
            <Link className="primaryBtn" href="/polls">
              오늘의 설문 참여
            </Link>
            <Link className="ghostBtn" href="/voices">
              팬 의견 보기
            </Link>
          </div>
        </div>
        <div className="pointCard">
          <span>MY Y POINT</span>
          <strong>{points.toLocaleString()} P</strong>
          <small>설문 참여 +5P · 의견 작성 +10P · 공감 +1P</small>
        </div>
      </section>

      <section>
        <div className="sectionHead">
          <div>
            <span className="eyebrow">TODAY&apos;S QUESTION</span>
            <h2>오늘의 팬 질문</h2>
          </div>
          <Link href="/polls">전체 설문 보기 →</Link>
        </div>
        <div className="questionCard">
          <h3>{todayQuestion.text}</h3>
          {!myPick ? (
            <div className="optionList">
              {todayQuestion.options.map((o) => (
                <button key={o.id} onClick={() => answerQuestion(todayPoll.id, todayQuestion.id, o.id)}>
                  {o.label}
                </button>
              ))}
            </div>
          ) : (
            <>
              <div className="success">
                참여 완료{isPollCompleted(todayPoll.id) ? ` · +${todayPoll.pointReward} YP 적립` : ""}
              </div>
              <div className="resultList">
                {todayQuestion.options.map((o) => {
                  const pct = totalVotes ? Math.round((o.votes / totalVotes) * 100) : 0;
                  return (
                    <div key={o.id}>
                      <div className="resultHead">
                        <span className={o.id === myPick ? "isMyPick" : ""}>
                          {o.label}
                          {o.id === myPick ? " · 내 선택" : ""}
                        </span>
                        <b>{pct}%</b>
                      </div>
                      <div className="bar">
                        <i style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          <p className="muted" style={{ marginTop: 18 }}>
            1분이면 충분해요. 팬들의 선택은 다음 홈경기 개선안의 근거가 됩니다.
          </p>
        </div>
      </section>

      <section>
        <div className="sectionHead">
          <div>
            <span className="eyebrow">HOT VOICES</span>
            <h2>지금 팬들이 공감하는 의견</h2>
          </div>
          <Link href="/voices">전체 의견 보기 →</Link>
        </div>
        <div className="grid3">
          {hotVoices.map((v) => (
            <article className="voiceCard" key={v.id}>
              <div className="tagRow">
                <span className="tag">{v.category}</span>
                {v.likes >= 20 && <span className="hot">HOT</span>}
              </div>
              <h3>{v.title}</h3>
              <p>{v.content}</p>
              <div className="meta">
                <span>♥ 공감 {v.likes}</span>
                <span className="statusChip" data-status={v.status}>
                  {v.status}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="feedback">
        <div>
          <span className="eyebrow">CLUB FEEDBACK</span>
          <h2>팬 의견이 실제 변화로 이어집니다</h2>
          <p className="muted" style={{ marginTop: 10 }}>
            의견 작성 → 다른 팬 공감 → HOT 의견 → 구단 확인 → 실제 피드백까지, 팬 목소리가
            움직이는 과정을 확인하세요.
          </p>
        </div>
        <div className="feedbackList">
          {recentFeedback.map((v) => (
            <div className="feedbackBox" key={v.id}>
              <div className="tagRow">
                <span className="tag">{v.category}</span>
                <span className="statusChip" data-status={v.status}>
                  {v.status}
                </span>
              </div>
              <strong style={{ marginTop: 10 }}>{v.title}</strong>
              <div className="clubReply">
                <b>구단 피드백 · {v.clubFeedback.date}</b>
                {v.clubFeedback.comment}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
