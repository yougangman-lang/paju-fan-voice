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
            오늘의 질문에 답하고, 하고 싶은 이야기를 남겨보세요. 여러분의 목소리가 모여
            다음 홈경기를 바꿉니다.
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
          <span>내 P:POINT</span>
          <strong>{points.toLocaleString()} P:POINT</strong>
          <small>설문 참여 +5P · 의견 작성 +10P · 공감 +1P</small>
        </div>
      </section>

      <section>
        <div className="sectionHead">
          <h2>오늘의 질문</h2>
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
                참여 완료{isPollCompleted(todayPoll.id) ? ` · +${todayPoll.pointReward} P:POINT 적립` : ""}
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
          <h2>많이 공감한 팬 의견</h2>
          <Link href="/voices">전체 의견 보기 →</Link>
        </div>
        <div className="panel board">
          {hotVoices.map((v) => (
            <div className="boardRow" key={v.id}>
              <div className="boardMeta">
                <span className="catLabel">{v.category}</span>
                {v.likes >= 20 && <span className="hotLabel">HOT</span>}
              </div>
              <p className="boardTitle">{v.title}</p>
              <p className="boardExcerpt">{v.content}</p>
              <div className="boardFoot">
                <span>공감 {v.likes}</span>
                <span className="statusChip" data-status={v.status}>
                  {v.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="sectionHead">
          <h2>구단 답변</h2>
        </div>
        <p className="muted">팬 의견에 대한 구단의 검토 결과를 안내합니다.</p>
        <div className="panel board">
          {recentFeedback.map((v) => (
            <div className="boardRow" key={v.id}>
              <div className="boardMeta">
                <span className="catLabel">{v.category}</span>
                <span className="statusChip" data-status={v.status}>
                  {v.status}
                </span>
              </div>
              <p className="boardTitle">{v.title}</p>
              <div className="clubReply">
                <b>구단 답변 · {v.clubFeedback.date}</b>
                {v.clubFeedback.comment}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
