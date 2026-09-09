"use client";

import { useAppState } from "@/lib/store";

export default function PollsPage() {
  const { polls, answers, answerQuestion, isPollCompleted } = useAppState();

  return (
    <div className="stack">
      <div className="pageTitle">
        <span className="eyebrow">QUICK POLL</span>
        <h1>짧게 답하고, 구단 운영에 참여하세요.</h1>
        <p>
          상황별 1~3문항 설문으로 팬의 니즈를 자주, 가볍게 수집합니다. 설문을 모두 완료하면
          Y포인트가 적립돼요.
        </p>
      </div>

      <div className="grid2">
        {polls.map((poll) => {
          const completed = isPollCompleted(poll.id);
          return (
            <article className="panel" key={poll.id}>
              <div className="pollHead">
                <span className="tag">{poll.status === "active" ? "진행중" : "종료"}</span>
                <span className="muted" style={{ fontSize: 12.5 }}>
                  {poll.questions.length}문항
                </span>
              </div>
              <h2 style={{ marginTop: 4 }}>{poll.title}</h2>
              <p className="pollDesc">{poll.description}</p>

              {completed && (
                <div className="success">참여 완료 · +{poll.pointReward} YP 적립</div>
              )}

              {poll.questions.map((q, i) => {
                const myPick = answers[q.id];
                const total = q.options.reduce((sum, o) => sum + o.votes, 0);
                return (
                  <div className="questionBlock" key={q.id}>
                    <h3 style={{ fontSize: 15.5 }}>
                      Q{i + 1}. {q.text}
                    </h3>
                    {!myPick ? (
                      <div className="optionList">
                        {q.options.map((o) => (
                          <button key={o.id} onClick={() => answerQuestion(poll.id, q.id, o.id)}>
                            {o.label}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="resultList" style={{ marginTop: 14 }}>
                        {q.options.map((o) => {
                          const pct = total ? Math.round((o.votes / total) * 100) : 0;
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
                    )}
                  </div>
                );
              })}
            </article>
          );
        })}
      </div>
    </div>
  );
}
