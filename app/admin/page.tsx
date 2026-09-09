"use client";

import { useMemo } from "react";
import { useAppState } from "@/lib/store";
import { voiceCategories, futureFeatures } from "@/data/mock";
import type { VoiceStatus } from "@/data/types";

const statusOrder: VoiceStatus[] = ["검토중", "반영예정", "반영완료", "반영어려움"];

export default function AdminPage() {
  const { voices, polls } = useAppState();

  const topFanNeeds = useMemo(() => [...voices].sort((a, b) => b.likes - a.likes).slice(0, 5), [voices]);
  const recentVoices = useMemo(
    () => [...voices].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 5),
    [voices]
  );
  const hotCount = voices.filter((v) => v.likes >= 20).length;
  const totalPollResponses = polls.reduce(
    (sum, p) => sum + p.questions.reduce((s, q) => s + q.options.reduce((a, o) => a + o.votes, 0), 0),
    0
  );

  const categoryCounts = voiceCategories.map((c) => ({
    category: c,
    count: voices.filter((v) => v.category === c).length,
  }));
  const maxCategoryCount = Math.max(1, ...categoryCounts.map((c) => c.count));

  const statusCounts = statusOrder.map((s) => ({
    status: s,
    count: voices.filter((v) => v.status === s).length,
  }));

  return (
    <div className="stack">
      <div className="pageTitle">
        <span className="eyebrow">CLUB ADMIN</span>
        <h1>팬의 목소리를 의사결정 데이터로.</h1>
        <p>
          지금 팬들이 무엇을 원하는지 5초 안에 확인하고, 설문을 설계하고, 피드백을 남기는
          관리자 콘솔입니다.
        </p>
      </div>

      <div className="metrics">
        <div>
          <span>이번 주 참여자</span>
          <b>432</b>
          <small>▲ 18% (mock)</small>
        </div>
        <div>
          <span>설문 응답 수</span>
          <b>{totalPollResponses.toLocaleString()}</b>
          <small>진행 중 설문 {polls.length}건</small>
        </div>
        <div>
          <span>신규 팬 의견 수</span>
          <b>{voices.length}</b>
          <small>검토 필요 {voices.filter((v) => v.status === "검토중").length}건</small>
        </div>
        <div>
          <span>HOT 의견 수</span>
          <b>{hotCount}</b>
          <small>공감 20+</small>
        </div>
      </div>

      <div className="grid2">
        <section className="panel">
          <div className="sectionHead">
            <h2>TOP FAN NEEDS</h2>
            <button className="smallBtn">CSV Export</button>
          </div>
          <div className="rankList" style={{ marginTop: 10 }}>
            {topFanNeeds.map((v, i) => (
              <div key={v.id}>
                <b>{i + 1}</b>
                <span>{v.title}</span>
                <strong>♥ {v.likes}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="sectionHead">
            <h2>진행 중 설문</h2>
            <button className="smallBtn">+ 새 설문 생성</button>
          </div>
          <div style={{ marginTop: 10 }}>
            {polls.map((p) => {
              const total = p.questions.reduce(
                (s, q) => s + q.options.reduce((a, o) => a + o.votes, 0),
                0
              );
              return (
                <div className="adminPoll" key={p.id}>
                  <strong>{p.title}</strong>
                  <span>
                    {p.questions.length}문항 · 응답 {total.toLocaleString()}건
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="grid2">
        <section className="panel">
          <div className="sectionHead">
            <h2>최근 팬 의견</h2>
          </div>
          <div className="miniList" style={{ marginTop: 14 }}>
            {recentVoices.map((v) => (
              <div key={v.id}>
                <span>
                  [{v.category}] {v.title}
                </span>
                <span className="statusChip" data-status={v.status}>
                  {v.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="sectionHead">
            <h2>카테고리별 의견</h2>
          </div>
          <div className="barChart" style={{ marginTop: 14 }}>
            {categoryCounts.map((c) => (
              <div key={c.category}>
                <span>{c.category}</span>
                <div className="bar">
                  <i style={{ width: `${(c.count / maxCategoryCount) * 100}%` }} />
                </div>
                <span>{c.count}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="sectionHead">
          <h2>구단 답변 상태</h2>
        </div>
        <div className="grid2" style={{ marginTop: 14, gridTemplateColumns: "repeat(4, 1fr)" }}>
          {statusCounts.map((s) => (
            <div key={s.status} className="pointCard" style={{ padding: 18, textAlign: "center" }}>
              <span className="statusChip" data-status={s.status}>
                {s.status}
              </span>
              <strong style={{ fontSize: 28, marginTop: 8 }}>{s.count}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Future Integration</h2>
        <p className="muted" style={{ marginTop: 10 }}>
          현재 프로토타입의 핵심은 팬 직접 의견 수렴입니다. 향후 FEVER의 행동 데이터와 결합해
          더 깊은 팬 인사이트로 확장할 수 있습니다. (실제 API 연동 없이 개념만 표시합니다.)
        </p>
        <div className="integration">
          <div>
            <b>FEVER</b>
            <span>티켓 구매 · 관람 행동 데이터</span>
          </div>
          <div className="plus">+</div>
          <div>
            <b>PAJU FAN VOICE</b>
            <span>팬 의견 · 니즈 · 경험 데이터</span>
          </div>
          <div className="arrow">→</div>
          <div>
            <b>FAN INSIGHT</b>
            <span>무엇을 했는가 + 왜 그렇게 행동했는가</span>
          </div>
        </div>
        <h2 style={{ marginTop: 26, fontSize: 16 }}>Future Feature</h2>
        <div className="futureRow">
          {futureFeatures.map((f) => (
            <span className="futureChip" key={f}>
              {f}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
