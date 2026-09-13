"use client";

import { useEffect, useState } from "react";
import type { RewardItem } from "@/data/types";

export default function OnlineRewardModal({
  item,
  onClose,
  onConfirm,
}: {
  item: RewardItem;
  onClose: () => void;
  onConfirm: (value: string) => void;
}) {
  const [nicknameInput, setNicknameInput] = useState("");
  const [selectedChoice, setSelectedChoice] = useState(item.onlineChoices?.[0]?.id ?? "");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const isNickname = item.onlineAction === "nickname";
  const canConfirm = isNickname ? nicknameInput.trim().length > 0 : !!selectedChoice;

  const handleConfirm = () => {
    if (!canConfirm) return;
    onConfirm(isNickname ? nicknameInput.trim() : selectedChoice);
  };

  return (
    <div className="popupOverlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="onlineRewardModal" onClick={(e) => e.stopPropagation()}>
        <button className="popupClose" onClick={onClose} aria-label="닫기">
          ×
        </button>
        <h3>{item.title}</h3>
        <p className="muted" style={{ marginTop: 6 }}>
          {item.description}
        </p>

        {isNickname ? (
          <input
            value={nicknameInput}
            onChange={(e) => setNicknameInput(e.target.value)}
            placeholder="새 닉네임을 입력하세요"
            maxLength={16}
            className="onlineRewardInput"
            autoFocus
          />
        ) : (
          <div className="onlineChoiceList">
            {item.onlineChoices?.map((c) => (
              <button
                key={c.id}
                type="button"
                className={selectedChoice === c.id ? "isActive" : ""}
                onClick={() => setSelectedChoice(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}

        <button className="primaryBtn" style={{ marginTop: 16, width: "100%", border: "none" }} disabled={!canConfirm} onClick={handleConfirm}>
          {item.pointCost} P:POINT로 적용하기
        </button>
      </div>
    </div>
  );
}
