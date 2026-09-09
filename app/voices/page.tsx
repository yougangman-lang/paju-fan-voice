"use client";

import { useMemo, useState } from "react";
import { useAppState } from "@/lib/store";
import { voiceCategories } from "@/data/mock";
import type { VoiceCategory } from "@/data/types";

type SortMode = "latest" | "popular";

export default function VoicesPage() {
  const { voices, likedVoiceIds, submitVoice, likeVoice } = useAppState();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<VoiceCategory>(voiceCategories[0]);
  const [categoryFilter, setCategoryFilter] = useState<VoiceCategory | "전체">("전체");
  const [sortMode, setSortMode] = useState<SortMode>("latest");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    submitVoice({ category, title: title.trim(), content: content.trim() });
    setTitle("");
    setContent("");
  };

  const visibleVoices = useMemo(() => {
    const filtered =
      categoryFilter === "전체" ? voices : voices.filter((v) => v.category === categoryFilter);
    const sorted = [...filtered].sort((a, b) =>
      sortMode === "popular" ? b.likes - a.likes : (a.createdAt < b.createdAt ? 1 : -1)
    );
    return sorted;
  }, [voices, categoryFilter, sortMode]);

  return (
    <div className="stack">
      <div className="pageTitle">
        <h1>팬이 제안하고, 팬이 공감합니다.</h1>
        <p>
          많은 팬이 공감하는 의견을 구단이 직접 확인하고 답합니다. 공감 20 이상이면
          HOT 의견으로 표시돼요.
        </p>
      </div>

      <div className="voiceLayout">
        <form className="panel compose" onSubmit={submit}>
          <h2>의견 남기기</h2>
          <label>카테고리</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as VoiceCategory)}>
            {voiceCategories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <label>제목</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="어떤 의견인가요?"
          />
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="구단이 이해하기 쉽게 구체적으로 적어주세요."
            rows={6}
          />
          <button className="primaryBtn" type="submit">
            의견 등록 +10 P:POINT
          </button>
        </form>

        <div className="stack" style={{ gap: 18 }}>
          <div className="voiceToolbar">
            <div className="filterChips">
              <button
                className={categoryFilter === "전체" ? "isActive" : ""}
                onClick={() => setCategoryFilter("전체")}
              >
                전체
              </button>
              {voiceCategories.map((c) => (
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

          {visibleVoices.length === 0 ? (
            <div className="emptyState">아직 이 카테고리의 의견이 없어요. 첫 의견을 남겨보세요.</div>
          ) : (
            <div className="panel board">
              {visibleVoices.map((v) => {
                const liked = likedVoiceIds.includes(v.id);
                return (
                  <div className="boardRow" key={v.id}>
                    <div className="boardMeta">
                      <span className="catLabel">{v.category}</span>
                      {v.likes >= 20 && <span className="hotLabel">HOT</span>}
                      <span style={{ color: "var(--muted)" }}>
                        · {v.author} · {v.createdAt}
                      </span>
                    </div>
                    <p className="boardTitle">{v.title}</p>
                    <p className="boardExcerpt">{v.content}</p>
                    {v.clubFeedback && (
                      <div className="clubReply">
                        <b>구단 답변 · {v.clubFeedback.date}</b>
                        {v.clubFeedback.comment}
                      </div>
                    )}
                    <div className="boardFoot">
                      <button
                        className={`likeBtn ${liked ? "isLiked" : ""}`}
                        onClick={() => likeVoice(v.id)}
                        disabled={liked}
                      >
                        공감 {v.likes}
                        {liked ? " · 공감완료" : ""}
                      </button>
                      <span className="statusChip" data-status={v.status}>
                        {v.status}
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
