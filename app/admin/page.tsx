"use client";

import { useMemo, useState } from "react";
import { useAppState } from "@/lib/store";
import { suggestionCategories } from "@/data/suggestions";
import { rewardItems } from "@/data/rewards";
import { fanDirectory } from "@/data/fans";
import { categoryAnalysis, aiFanInsight } from "@/data/insight";
import { nextMatch } from "@/data/matches";
import { futureFeatures } from "@/data/future";
import type { SuggestionStatus } from "@/data/types";

const statusOrder: SuggestionStatus[] = ["검토중", "반영예정", "반영완료", "반영어려움"];

type Period = "week" | "month" | "season";

const periodKpis: Record<
  Period,
  {
    newSignups: number;
    activeUsers: number;
    surveyParticipants: number;
    newSuggestions: number;
    attendanceVerifications: number;
    pointsIssued: number;
    pointsUsed: number;
    redemptions: number;
  }
> = {
  week: {
    newSignups: 24,
    activeUsers: 432,
    surveyParticipants: 298,
    newSuggestions: 8,
    attendanceVerifications: 612,
    pointsIssued: 18400,
    pointsUsed: 9200,
    redemptions: 64,
  },
  month: {
    newSignups: 96,
    activeUsers: 1580,
    surveyParticipants: 1120,
    newSuggestions: 31,
    attendanceVerifications: 2380,
    pointsIssued: 71200,
    pointsUsed: 34600,
    redemptions: 245,
  },
  season: {
    newSignups: 512,
    activeUsers: 6040,
    surveyParticipants: 4210,
    newSuggestions: 187,
    attendanceVerifications: 9870,
    pointsIssued: 298500,
    pointsUsed: 142300,
    redemptions: 980,
  },
};

const periodLabels: Record<Period, string> = {
  week: "이번 주",
  month: "이번 달",
  season: "2026 시즌",
};

const tabs = [
  { key: "dashboard", label: "Dashboard" },
  { key: "fans", label: "Fans" },
  { key: "surveys", label: "Surveys" },
  { key: "suggestions", label: "Suggestions" },
  { key: "point", label: "P:POINT" },
  { key: "rewards", label: "Rewards" },
  { key: "popup", label: "Popup" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const TX_LABELS: Record<string, string> = {
  checkin: "출석 체크",
  cheer: "응원하기",
  cheer_message: "응원 메시지",
  survey: "설문 참여",
  suggestion_stake: "팬 제안 등록",
  suggestion_stake_refund: "공감 보상 환급",
  suggestion_like_reward: "공감 보상",
  attendance: "직관 인증",
  referral: "추천인 코드",
  redeem: "포인트 사용",
};

export default function AdminPage() {
  const { suggestions, surveys, pointHistory, redemptions, popupCampaign, updatePopupCampaign } =
    useAppState();

  const [period, setPeriod] = useState<Period>("week");
  const [tab, setTab] = useState<TabKey>("dashboard");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [suggestionSort, setSuggestionSort] = useState<"popular" | "latest">("popular");

  const kpi = periodKpis[period];

  const surveyContext = nextMatch.isToday ? nextMatch.homeAway : "NON_MATCHDAY";
  const todaySurvey =
    surveys.find((s) => s.status === "active" && s.context === surveyContext) ?? surveys[0];

  const statusCounts = statusOrder.map((s) => ({
    status: s,
    count: suggestions.filter((v) => v.clubStatus === s).length,
  }));

  const sortedSuggestions = useMemo(
    () =>
      [...suggestions].sort((a, b) =>
        suggestionSort === "popular" ? b.likes - a.likes : a.createdAt < b.createdAt ? 1 : -1
      ),
    [suggestions, suggestionSort]
  );

  const topSuggestions = useMemo(
    () => [...suggestions].sort((a, b) => b.likes - a.likes).slice(0, 3),
    [suggestions]
  );

  return (
    <div className="stack">
      <div className="pageTitle">
        <h1>팬의 목소리를 의사결정 데이터로.</h1>
        <p>지금 팬들이 무엇을 원하는지 한눈에 확인하고, 설문을 설계하고, 피드백을 남기는 관리자 콘솔입니다.</p>
      </div>

      <div className="adminTabs">
        {tabs.map((t) => (
          <button key={t.key} className={tab === t.key ? "isActive" : ""} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "dashboard" && (
        <div className="stack">
          <div className="filterChips">
            {(["week", "month", "season"] as Period[]).map((p) => (
              <button key={p} className={period === p ? "isActive" : ""} onClick={() => setPeriod(p)}>
                {periodLabels[p]}
              </button>
            ))}
          </div>

          <div className="metrics">
            <div>
              <span>신규 가입자</span>
              <b>{kpi.newSignups.toLocaleString()}</b>
            </div>
            <div>
              <span>활성 이용자</span>
              <b>{kpi.activeUsers.toLocaleString()}</b>
            </div>
            <div>
              <span>설문 참여자</span>
              <b>{kpi.surveyParticipants.toLocaleString()}</b>
            </div>
            <div>
              <span>신규 팬 제안</span>
              <b>{kpi.newSuggestions.toLocaleString()}</b>
            </div>
            <div>
              <span>직관 인증</span>
              <b>{kpi.attendanceVerifications.toLocaleString()}</b>
            </div>
            <div>
              <span>P:POINT 지급</span>
              <b>{kpi.pointsIssued.toLocaleString()}</b>
            </div>
            <div>
              <span>P:POINT 사용</span>
              <b>{kpi.pointsUsed.toLocaleString()}</b>
            </div>
            <div>
              <span>상품 교환 수</span>
              <b>{kpi.redemptions.toLocaleString()}</b>
            </div>
          </div>

          <section className="panel">
            <div className="sectionHead">
              <h2>이번 주 가장 많이 공감받은 제안</h2>
            </div>
            <div className="rankList" style={{ marginTop: 10 }}>
              {topSuggestions.map((v, i) => (
                <div key={v.id}>
                  <b>{i + 1}</b>
                  <span>{v.title}</span>
                  <strong>공감 {v.likes}</strong>
                </div>
              ))}
            </div>
          </section>

          {todaySurvey && (
            <section className="panel">
              <div className="sectionHead">
                <h2>오늘의 설문 결과</h2>
              </div>
              <p className="muted" style={{ marginTop: 4 }}>
                {todaySurvey.title} · 팬 화면에는 결과가 공개되지 않습니다.
              </p>
              <div className="stack" style={{ gap: 18, marginTop: 14 }}>
                {todaySurvey.questions.map((q) => {
                  const total = q.options.reduce((s, o) => s + o.votes, 0);
                  return (
                    <div key={q.id}>
                      <p style={{ fontWeight: 700, fontSize: 14 }}>{q.text}</p>
                      <div className="resultList" style={{ marginTop: 8 }}>
                        {q.options.map((o) => {
                          const pct = total ? Math.round((o.votes / total) * 100) : 0;
                          return (
                            <div key={o.id}>
                              <div className="resultHead">
                                <span>{o.label}</span>
                                <b>
                                  {o.votes}건 · {pct}%
                                </b>
                              </div>
                              <div className="bar">
                                <i style={{ width: `${pct}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <div className="grid2">
            <section className="panel">
              <div className="sectionHead">
                <h2>팬 제안 카테고리 분석</h2>
              </div>
              <div className="barChart" style={{ marginTop: 14 }}>
                {categoryAnalysis.map((c) => {
                  const max = Math.max(...categoryAnalysis.map((x) => x.count));
                  return (
                    <button
                      key={c.category}
                      className="categoryAnalysisRow"
                      onClick={() => setExpandedCategory(expandedCategory === c.category ? null : c.category)}
                    >
                      <span>{c.category}</span>
                      <div className="bar">
                        <i style={{ width: `${(c.count / max) * 100}%` }} />
                      </div>
                      <span>{c.count}</span>
                    </button>
                  );
                })}
              </div>
              {expandedCategory && (
                <div className="keywordTags">
                  {categoryAnalysis
                    .find((c) => c.category === expandedCategory)
                    ?.keywords.map((k) => (
                      <span className="keywordTag" key={k.label}>
                        {k.label} {k.count}
                      </span>
                    ))}
                </div>
              )}
            </section>

            <section className="panel">
              <div className="sectionHead">
                <h2>구단 답변 상태</h2>
              </div>
              <div className="grid2" style={{ marginTop: 14, gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                {statusCounts.map((s) => (
                  <div key={s.status} className="pointCard" style={{ padding: 16, textAlign: "center" }}>
                    <span className="statusChip" data-status={s.status}>
                      {s.status}
                    </span>
                    <strong style={{ fontSize: 24, marginTop: 8, display: "block" }}>{s.count}</strong>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="panel insightCard">
            <span className="eyebrowSmall">AI FAN INSIGHT</span>
            <p className="boardTitle" style={{ marginTop: 8 }}>
              {aiFanInsight.headline}
            </p>
            <p className="boardExcerpt">{aiFanInsight.body}</p>
            <div className="keywordTags" style={{ marginTop: 10 }}>
              {aiFanInsight.keywords.map((k) => (
                <span className="keywordTag" key={k.label}>
                  {k.label} {k.count}
                </span>
              ))}
            </div>
            <p className="muted" style={{ marginTop: 10, fontSize: 12.5 }}>{aiFanInsight.trend}</p>
            <p className="simNotice" style={{ marginTop: 12 }}>
              AI는 팬 제안 텍스트의 분류·키워드 군집·빈도 분석을 지원할 뿐, 반영 여부를 자동으로
              결정하지 않습니다. 실제 AI 모델과는 연동되어 있지 않은 개념 화면입니다.
            </p>
          </section>

          <section className="panel">
            <h2>향후 확장 개념</h2>
            <p className="muted" style={{ marginTop: 10 }}>
              현재 버전의 핵심은 팬 직접 참여 데이터 수집입니다. 향후 FEVER의 행동 데이터와 결합해
              더 깊은 팬 인사이트로 확장할 수 있습니다. (실제 연동 없이 개념만 표시합니다.)
            </p>
            <div className="integration">
              <div>
                <b>FEVER</b>
                <span>티켓 구매 · 관람 행동 데이터</span>
              </div>
              <div className="plus">+</div>
              <div>
                <b>PAJU FAN VOICE</b>
                <span>팬 참여 · 니즈 · 경험 데이터</span>
              </div>
              <div className="arrow">→</div>
              <div>
                <b>FAN INSIGHT</b>
                <span>무엇을 했는가 + 왜 그렇게 행동했는가</span>
              </div>
            </div>
            <h2 style={{ marginTop: 26, fontSize: 16 }}>향후 확장 기능</h2>
            <div className="futureRow">
              {futureFeatures.map((f) => (
                <span className="futureChip" key={f}>
                  {f}
                </span>
              ))}
            </div>
          </section>
        </div>
      )}

      {tab === "fans" && (
        <section className="panel">
          <div className="sectionHead">
            <h2>회원 목록</h2>
          </div>
          <div className="tableWrap">
            <table className="adminTable">
              <thead>
                <tr>
                  <th>닉네임</th>
                  <th>팬 등급</th>
                  <th>가입일</th>
                  <th>누적 포인트</th>
                  <th>마지막 로그인</th>
                </tr>
              </thead>
              <tbody>
                {fanDirectory.map((f) => (
                  <tr key={f.id}>
                    <td>{f.nickname}</td>
                    <td>{f.tier}</td>
                    <td>{f.joinedAt}</td>
                    <td>{f.lifetimePoints.toLocaleString()}P</td>
                    <td>{f.lastLoginAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tab === "surveys" && (
        <div className="stack">
          {surveys.map((s) => (
            <section className="panel" key={s.id}>
              <div className="sectionHead">
                <h2 style={{ fontSize: 17 }}>{s.title}</h2>
                <span className="tag">{s.context}</span>
              </div>
              <div className="stack" style={{ gap: 16, marginTop: 12 }}>
                {s.questions.map((q) => {
                  const total = q.options.reduce((sum, o) => sum + o.votes, 0);
                  return (
                    <div key={q.id}>
                      <p style={{ fontWeight: 700, fontSize: 13.5 }}>{q.text}</p>
                      <div className="resultList" style={{ marginTop: 8 }}>
                        {q.options.map((o) => {
                          const pct = total ? Math.round((o.votes / total) * 100) : 0;
                          return (
                            <div key={o.id}>
                              <div className="resultHead">
                                <span>{o.label}</span>
                                <b>
                                  {o.votes}건 · {pct}%
                                </b>
                              </div>
                              <div className="bar">
                                <i style={{ width: `${pct}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      {tab === "suggestions" && (
        <section className="panel">
          <div className="sectionHead">
            <h2>전체 팬 제안</h2>
            <div className="sortToggle">
              <button
                className={suggestionSort === "popular" ? "isActive" : ""}
                onClick={() => setSuggestionSort("popular")}
              >
                공감 많은순
              </button>
              <button
                className={suggestionSort === "latest" ? "isActive" : ""}
                onClick={() => setSuggestionSort("latest")}
              >
                최신순
              </button>
            </div>
          </div>
          <div className="tableWrap">
            <table className="adminTable">
              <thead>
                <tr>
                  <th>카테고리</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>공감</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {sortedSuggestions.map((v) => (
                  <tr key={v.id}>
                    <td>{v.category}</td>
                    <td>{v.title}</td>
                    <td>{v.author}</td>
                    <td>{v.likes}</td>
                    <td>
                      <span className="statusChip" data-status={v.clubStatus}>
                        {v.clubStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted" style={{ marginTop: 14, fontSize: 12.5 }}>
            카테고리 {suggestionCategories.length}종 · 총 {suggestions.length}건
          </p>
        </section>
      )}

      {tab === "point" && (
        <section className="panel">
          <div className="sectionHead">
            <h2>P:POINT Transaction</h2>
          </div>
          <p className="muted" style={{ marginTop: 4 }}>
            데모 계정 기준 적립/사용 내역입니다. 실서비스에서는 전체 회원의 트랜잭션 로그가 됩니다.
          </p>
          <div className="tableWrap">
            <table className="adminTable">
              <thead>
                <tr>
                  <th>유형</th>
                  <th>내용</th>
                  <th>포인트</th>
                  <th>일자</th>
                </tr>
              </thead>
              <tbody>
                {pointHistory.map((h) => (
                  <tr key={h.id}>
                    <td>{TX_LABELS[h.type] ?? h.type}</td>
                    <td>{h.description}</td>
                    <td style={h.amount < 0 ? { color: "var(--bad)" } : undefined}>
                      {h.amount > 0 ? "+" : ""}
                      {h.amount}P
                    </td>
                    <td>{h.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tab === "rewards" && (
        <div className="stack">
          <section className="panel">
            <div className="sectionHead">
              <h2>상품 카탈로그</h2>
            </div>
            <div className="tableWrap">
              <table className="adminTable">
                <thead>
                  <tr>
                    <th>카테고리</th>
                    <th>상품명</th>
                    <th>필요 포인트</th>
                    <th>온라인샵 실제가</th>
                    <th>재고</th>
                    <th>구조</th>
                  </tr>
                </thead>
                <tbody>
                  {rewardItems.map((r) => (
                    <tr key={r.id}>
                      <td>{r.category}</td>
                      <td>{r.title}</td>
                      <td>{r.pointCost}P</td>
                      <td>{r.onlineShopPrice ? `${r.onlineShopPrice.toLocaleString()}원` : "-"}</td>
                      <td>{r.stock === -1 ? "무제한" : r.stock}</td>
                      <td>{r.isRaffle ? "응모권" : "즉시 교환"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="panel">
            <div className="sectionHead">
              <h2>교환 내역</h2>
            </div>
            {redemptions.length === 0 ? (
              <p className="muted" style={{ marginTop: 14 }}>
                아직 교환 내역이 없습니다.
              </p>
            ) : (
              <div className="miniList" style={{ marginTop: 14 }}>
                {redemptions.map((r) => (
                  <div key={r.id}>
                    <span>{r.rewardTitle}</span>
                    <span>
                      -{r.pointCost}P · {r.redeemedAt}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {tab === "popup" && (
        <section className="panel">
          <div className="sectionHead">
            <h2>팬 참여 Popup</h2>
            <button
              className="smallBtn"
              onClick={() => updatePopupCampaign({ enabled: !popupCampaign.enabled })}
            >
              {popupCampaign.enabled ? "ON → OFF로 전환" : "OFF → ON으로 전환"}
            </button>
          </div>
          <p className="muted" style={{ marginTop: 4 }}>
            현재 상태:{" "}
            <span className="statusChip" data-status={popupCampaign.enabled ? "반영완료" : "검토중"}>
              {popupCampaign.enabled ? "ON" : "OFF"}
            </span>
          </p>
          <div className="stack" style={{ gap: 10, marginTop: 16, maxWidth: 520 }}>
            <label className="popupFieldLabel">제목</label>
            <input
              value={popupCampaign.title}
              onChange={(e) => updatePopupCampaign({ title: e.target.value })}
              style={{ padding: "10px 12px", border: "1px solid var(--line)", borderRadius: 8 }}
            />
            <label className="popupFieldLabel">설명</label>
            <textarea
              value={popupCampaign.description}
              onChange={(e) => updatePopupCampaign({ description: e.target.value })}
              rows={3}
              style={{ padding: "10px 12px", border: "1px solid var(--line)", borderRadius: 8 }}
            />
            <label className="popupFieldLabel">버튼 문구</label>
            <input
              value={popupCampaign.ctaLabel}
              onChange={(e) => updatePopupCampaign({ ctaLabel: e.target.value })}
              style={{ padding: "10px 12px", border: "1px solid var(--line)", borderRadius: 8 }}
            />
          </div>
          <p className="muted" style={{ marginTop: 14, fontSize: 12.5 }}>
            팬 화면에서 팝업을 닫으면 당일에는 다시 노출되지 않습니다.
          </p>
        </section>
      )}
    </div>
  );
}
