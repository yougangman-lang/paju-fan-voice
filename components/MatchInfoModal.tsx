"use client";

import { useEffect } from "react";
import type { Match, MatchPreview } from "@/data/types";

function formatMatchDate(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} (${days[d.getDay()]})`;
}

export default function MatchInfoModal({
  match,
  preview,
  onClose,
}: {
  match: Match;
  preview: MatchPreview;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const rows: { label: string; home: string; away: string }[] = [
    { label: "순위", home: `${preview.home.rank}위`, away: `${preview.away.rank}위` },
    { label: "승점", home: `${preview.home.points}`, away: `${preview.away.points}` },
    { label: "성적", home: preview.home.record, away: preview.away.record },
    { label: "평균 득점", home: `${preview.home.avgGoalsFor}`, away: `${preview.away.avgGoalsFor}` },
    { label: "평균 실점", home: `${preview.home.avgGoalsAgainst}`, away: `${preview.away.avgGoalsAgainst}` },
  ];

  return (
    <div className="popupOverlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="matchInfoModal" onClick={(e) => e.stopPropagation()}>
        <button className="popupClose" onClick={onClose} aria-label="닫기">
          ×
        </button>

        <div className="matchInfoHeader">
          <div className="matchInfoTeam">
            <img src={preview.home.crest} alt={`${preview.home.name} 엠블럼`} className="matchInfoCrest" />
            <span>{preview.home.name}</span>
          </div>
          <span className="matchInfoVs">VS</span>
          <div className="matchInfoTeam">
            <img src={preview.away.crest} alt={`${preview.away.name} 엠블럼`} className="matchInfoCrest" />
            <span>{preview.away.name}</span>
          </div>
        </div>

        <p className="matchInfoMeta">
          {match.competition} · {formatMatchDate(match.date)} {match.time} · {match.venue}
        </p>

        <div className="matchInfoCompareWrap">
          <table className="matchInfoCompare">
            <thead>
              <tr>
                <th>{preview.home.name}</th>
                <th></th>
                <th>{preview.away.name}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <td>{r.home}</td>
                  <td className="matchInfoMetric">{r.label}</td>
                  <td>{r.away}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="matchInfoFootnote">순위와 기록은 해당 시점 기준입니다.</p>
      </div>
    </div>
  );
}
