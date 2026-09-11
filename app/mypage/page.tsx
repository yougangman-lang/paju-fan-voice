"use client";

import Link from "next/link";
import { useAppState } from "@/lib/store";
import { TIER_LABELS, TIER_DESCRIPTIONS, tierProgress } from "@/data/tiers";
import TierIcon from "@/components/TierIcon";

const TX_LABELS: Record<string, string> = {
  checkin: "출석 체크",
  cheer: "응원하기",
  cheer_message: "응원 메시지",
  survey: "설문 참여",
  suggestion: "팬 제안 작성",
  attendance: "직관 인증",
  referral: "추천인 코드",
  redeem: "포인트 사용",
};

export default function MyPage() {
  const {
    isLoggedIn,
    nickname,
    pointBalance,
    lifetimeEarnedPoints,
    tier,
    pointHistory,
    attendanceCount,
    surveyCount,
    suggestionCount,
    cheerCount,
    suggestions,
    redemptions,
    referralCode,
  } = useAppState();

  if (!isLoggedIn) {
    return (
      <div className="stack">
        <div className="pageTitle">
          <h1>마이페이지</h1>
          <p>로그인 후 나의 팬 활동과 P:POINT 내역을 확인할 수 있어요.</p>
        </div>
        <Link className="primaryBtn" href="/login" style={{ width: "fit-content" }}>
          로그인하기
        </Link>
      </div>
    );
  }

  const myVoices = suggestions.filter((v) => v.author === nickname);
  const progress = tierProgress(lifetimeEarnedPoints);

  return (
    <div className="stack">
      <div className="pageTitle">
        <h1>마이페이지</h1>
        <p>{nickname}님의 팬 등급과 P:POINT 활동 내역을 한눈에 확인하세요.</p>
      </div>

      <div className="profileGrid">
        <div className="pointCard big">
          <div className="tierRow">
            <TierIcon tier={tier} size={22} />
            <span className="tierName">{TIER_LABELS[tier]}</span>
          </div>
          <p className="muted" style={{ marginTop: 2 }}>
            {TIER_DESCRIPTIONS[tier]}
          </p>

          <span style={{ marginTop: 18 }}>사용 가능 P:POINT</span>
          <strong>{pointBalance.toLocaleString()} P:POINT</strong>
          <small>Paju Participation Point · 누적 활동 {lifetimeEarnedPoints.toLocaleString()}P</small>

          <div className="tierProgress">
            <div className="bar">
              <i style={{ width: `${progress.percent}%` }} />
            </div>
            <span className="muted" style={{ fontSize: 12 }}>
              {progress.next
                ? `다음 등급(${TIER_LABELS[progress.next]})까지 ${progress.remaining}P`
                : "최상위 등급이에요"}
            </span>
          </div>

          <p className="muted" style={{ marginTop: 12, fontSize: 12 }}>내 추천인 코드 · {referralCode}</p>
        </div>

        <div className="panel">
          <h2>이번 시즌 활동</h2>
          <div className="stats">
            <div>
              <b>{attendanceCount}</b>
              <span>직관 인증</span>
            </div>
            <div>
              <b>{surveyCount}</b>
              <span>설문 참여</span>
            </div>
            <div>
              <b>{suggestionCount}</b>
              <span>팬 제안</span>
            </div>
            <div>
              <b>{cheerCount}</b>
              <span>응원 참여</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid2">
        <div className="panel">
          <h2>내가 작성한 팬 제안</h2>
          {myVoices.length === 0 ? (
            <p className="muted" style={{ marginTop: 14 }}>
              아직 작성한 제안이 없어요. 팬 제안에서 첫 의견을 남겨보세요.
            </p>
          ) : (
            <div className="miniList" style={{ marginTop: 14 }}>
              {myVoices.map((v) => (
                <div key={v.id}>
                  <span>{v.title}</span>
                  <span>
                    공감 {v.likes} · {v.clubStatus}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="panel">
          <h2>상품 교환 내역</h2>
          {redemptions.length === 0 ? (
            <p className="muted" style={{ marginTop: 14 }}>
              아직 교환한 상품이 없어요. P:POINT SHOP을 둘러보세요.
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
        </div>
      </div>

      <div className="panel">
        <h2>P:POINT 적립/사용 내역</h2>
        <div className="history" style={{ marginTop: 14 }}>
          {pointHistory.map((h) => (
            <div key={h.id}>
              <span>
                {TX_LABELS[h.type] ?? h.type} · {h.description} · {h.createdAt}
              </span>
              <b className="amount" style={h.amount < 0 ? { color: "var(--bad)" } : undefined}>
                {h.amount > 0 ? "+" : ""}
                {h.amount}P
              </b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
