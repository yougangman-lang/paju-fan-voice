"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAppState } from "@/lib/store";
import { suggestionCategories } from "@/data/suggestions";
import { currentUser } from "@/data/users";
import { SUGGESTION_STAKE } from "@/lib/suggestionRewards";
import type { SuggestionCategory } from "@/data/types";
import TierIcon from "@/components/TierIcon";

type SortMode = "latest" | "popular";

export default function SuggestionsPage() {
  const { isLoggedIn, pointBalance, suggestions, submitSuggestion, likeSuggestion } = useAppState();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<SuggestionCategory>(suggestionCategories[0]);
  const [categoryFilter, setCategoryFilter] = useState<SuggestionCategory | "전체">("전체");
  const [sortMode, setSortMode] = useState<SortMode>("latest");
  const [submitError, setSubmitError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const result = submitSuggestion({ category, title: title.trim(), content: content.trim() });
    if (result === "insufficient") {
      setSubmitError("P:POINT가 부족해 제안을 등록할 수 없어요.");
      return;
    }
    setSubmitError("");
    setTitle("");
    setContent("");
  };

  const visible = useMemo(() => {
    const filtered =
      categoryFilter === "전체" ? suggestions : suggestions.filter((v) => v.category === categoryFilter);
    return [...filtered].sort((a, b) =>
      sortMode === "popular" ? b.likes - a.likes : a.createdAt < b.createdAt ? 1 : -1
    );
  }, [suggestions, categoryFilter, sortMode]);

  return (
    <div className="stack">
      <div className="pageTitle">
        <h1>팬이 제안하고, 팬이 공감합니다.</h1>
        <p>
          많은 팬이 공감하는 제안을 구단이 직접 확인하고 답합니다. 공감 20 이상이면 HOT 제안으로
          표시돼요.
        </p>
      </div>

      <div className="voiceLayout">
        {isLoggedIn ? (
          <form className="panel compose" onSubmit={submit}>
            <h2>팬 제안 남기기</h2>
            <label>카테고리</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as SuggestionCategory)}>
              {suggestionCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <label>어떤 부분을 바꾸면 좋을까요?</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" />
            <label>조금 더 자세히 알려주세요.</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="구단이 이해하기 쉽게 구체적으로 적어주세요."
              rows={6}
            />
            <div className="simNotice">
              팬 제안 등록에는 10 P:POINT가 사용됩니다.
              <br />
              다른 팬들의 공감을 받으면 포인트를 돌려받고 추가 보상을 받을 수 있습니다.
            </div>
            {submitError && (
              <p className="errorText" style={{ marginTop: 8 }}>
                {submitError}
              </p>
            )}
            <button className="primaryBtn" type="submit" disabled={pointBalance < SUGGESTION_STAKE}>
              {pointBalance < SUGGESTION_STAKE ? "P:POINT 부족" : `제안 등록 -${SUGGESTION_STAKE} P:POINT`}
            </button>
          </form>
        ) : (
          <div className="panel compose">
            <h2>팬 제안 남기기</h2>
            <p className="muted" style={{ marginTop: 10 }}>
              로그인 후 10 P:POINT로 제안을 등록하고, 공감을 받아 포인트를 돌려받아 보세요.
            </p>
            <Link className="primaryBtn" href="/login" style={{ marginTop: 14, display: "block", textAlign: "center" }}>
              로그인하기
            </Link>
          </div>
        )}

        <div className="stack" style={{ gap: 18 }}>
          <div className="voiceToolbar">
            <div className="filterChips">
              <button
                className={categoryFilter === "전체" ? "isActive" : ""}
                onClick={() => setCategoryFilter("전체")}
              >
                전체
              </button>
              {suggestionCategories.map((c) => (
                <button
                  key={c}
                  className={categoryFilter === c ? "isActive" : ""}
                  onClick={() => setCategoryFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="sortToggle">
              <button
                className={sortMode === "latest" ? "isActive" : ""}
                onClick={() => setSortMode("latest")}
              >
                최신순
              </button>
              <button
                className={sortMode === "popular" ? "isActive" : ""}
                onClick={() => setSortMode("popular")}
              >
                인기순
              </button>
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="emptyState">아직 이 카테고리의 제안이 없어요. 첫 제안을 남겨보세요.</div>
          ) : (
            <div className="panel board">
              {visible.map((v) => {
                const isOwn = v.authorId === currentUser.id;
                const liked = v.likedByUserIds.includes(currentUser.id);
                return (
                  <div className="boardRow" key={v.id}>
                    <div className="boardMeta">
                      <span className="catLabel">{v.category}</span>
                      {v.likes >= 20 && <span className="hotLabel">HOT</span>}
                    </div>
                    <p className="boardTitle">{v.title}</p>
                    <div className="boardAuthorRow">
                      <span>{v.author}</span>
                      <TierIcon tier={v.authorTier} size={13} />
                      <span className="muted">· {v.createdAt}</span>
                    </div>
                    <p className="boardLikesCount">공감 {v.likes}</p>
                    {isOwn && v.likeRewardEarned > 0 && (
                      <p className="boardEarned">이 제안으로 +{v.likeRewardEarned} P:POINT를 받았어요.</p>
                    )}
                    <p className="boardExcerpt">{v.content}</p>
                    {v.clubResponse && (
                      <div className="clubReply">
                        <b>구단 답변 · {v.clubResponse.date}</b>
                        {v.clubResponse.comment}
                      </div>
                    )}
                    <div className="boardFoot">
                      <button
                        className={`likeBtn ${liked ? "isLiked" : ""}`}
                        onClick={() => likeSuggestion(v.id)}
                        disabled={liked || isOwn}
                      >
                        {isOwn ? "내가 쓴 제안" : liked ? "공감완료" : "공감하기"}
                      </button>
                      <span className="statusChip" data-status={v.clubStatus}>
                        {v.clubStatus}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
