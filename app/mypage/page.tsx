"use client";

import { useAppState } from "@/lib/store";
import { currentUser } from "@/data/mock";

export default function MyPage() {
  const { points, pointHistory, polls, completedPollIds, voices, likedVoiceIds } = useAppState();

  const myVoices = voices.filter((v) => v.author === currentUser.nickname);
  const participatedPolls = polls.filter((p) => completedPollIds.includes(p.id));
  const likedVoices = voices.filter((v) => likedVoiceIds.includes(v.id));

  return (
    <div className="stack">
      <div className="pageTitle">
        <span className="eyebrow">MY PAGE</span>
        <h1>내 참여가 쌓이는 공간</h1>
        <p>{currentUser.nickname}님이 참여한 설문, 작성한 의견, 공감 내역을 한눈에 확인하세요.</p>
      </div>

      <div className="profileGrid">
        <div className="pointCard big">
          <span>MY Y POINT</span>
          <strong>{points.toLocaleString()} P</strong>
          <small>파주 팬 참여 리워드</small>
          <div className="rewardHint">
            <span>MD 할인</span>
            <span>이벤트 응모</span>
            <span>사인상품 추첨</span>
            <span>티켓 혜택</span>
          </div>
        </div>
        <div className="panel">
          <h2>이번 시즌 참여</h2>
          <div className="stats">
            <div>
              <b>{participatedPolls.length}</b>
              <span>참여한 설문</span>
            </div>
            <div>
              <b>{myVoices.length}</b>
              <span>작성한 의견</span>
            </div>
            <div>
              <b>{likedVoices.length}</b>
              <span>공감한 의견</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid2">
        <div className="panel">
          <h2>참여한 설문</h2>
          {participatedPolls.length === 0 ? (
            <p className="muted" style={{ marginTop: 14 }}>
              아직 참여한 설문이 없어요. 팬 설문에서 오늘의 질문에 답해보세요.
            </p>
          ) : (
            <div className="miniList" style={{ marginTop: 14 }}>
              {participatedPolls.map((p) => (
                <div key={p.id}>
                  <span>{p.title}</span>
                  <span>+{p.pointReward}P</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="panel">
          <h2>작성한 의견</h2>
          {myVoices.length === 0 ? (
            <p className="muted" style={{ marginTop: 14 }}>
              아직 작성한 의견이 없어요. 팬 의견에 첫 제안을 남겨보세요.
            </p>
          ) : (
            <div className="miniList" style={{ marginTop: 14 }}>
              {myVoices.map((v) => (
                <div key={v.id}>
                  <span>{v.title}</span>
                  <span>
                    ♥ {v.likes} · {v.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="panel">
        <h2>공감 내역</h2>
        {likedVoices.length === 0 ? (
          <p className="muted" style={{ marginTop: 14 }}>
            아직 공감한 의견이 없어요.
          </p>
        ) : (
          <div className="miniList" style={{ marginTop: 14 }}>
            {likedVoices.map((v) => (
              <div key={v.id}>
                <span>{v.title}</span>
                <span>+1P</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="panel">
        <h2>포인트 적립 내역</h2>
        <div className="history" style={{ marginTop: 14 }}>
          {pointHistory.map((h) => (
            <div key={h.id}>
              <span>
                {h.label} · {h.date}
              </span>
              <b className="amount">+{h.amount}P</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
