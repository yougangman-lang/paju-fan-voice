"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppState } from "@/lib/store";
import { rewardItems } from "@/data/rewards";
import type { RewardCategory, RewardItem } from "@/data/types";
import OnlineRewardModal from "@/components/OnlineRewardModal";

const categories: { key: RewardCategory; label: string }[] = [
  { key: "MATCHDAY", label: "MATCHDAY" },
  { key: "FAMILY", label: "FAMILY" },
  { key: "EXPERIENCE", label: "EXPERIENCE" },
  { key: "GOODS", label: "GOODS" },
  { key: "ONLINE", label: "ONLINE" },
];

export default function PointShopPage() {
  const { isLoggedIn, pointBalance, redeemReward, redeemOnlineReward } = useAppState();
  const [activeCategory, setActiveCategory] = useState<RewardCategory>("MATCHDAY");
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [onlineModalItem, setOnlineModalItem] = useState<RewardItem | null>(null);

  if (!isLoggedIn) {
    return (
      <div className="stack">
        <div className="pageTitle">
          <h1>P:POINT SHOP</h1>
          <p>로그인 후 내 P:POINT로 매치데이 혜택과 팬 경험을 교환할 수 있어요.</p>
        </div>
        <Link className="primaryBtn" href="/login" style={{ width: "fit-content" }}>
          로그인하기
        </Link>
      </div>
    );
  }

  const handleRedeem = (rewardId: string) => {
    const result = redeemReward(rewardId);
    const message =
      result === "success"
        ? "교환 완료"
        : result === "insufficient"
        ? "포인트가 부족해요"
        : "품절된 상품이에요";
    setFeedback((f) => ({ ...f, [rewardId]: message }));
  };

  const handleOnlineConfirm = (value: string) => {
    if (!onlineModalItem) return;
    const result = redeemOnlineReward(onlineModalItem.id, value);
    const message =
      result === "success"
        ? "적용 완료"
        : result === "insufficient"
        ? "포인트가 부족해요"
        : "품절된 상품이에요";
    setFeedback((f) => ({ ...f, [onlineModalItem.id]: message }));
    if (result === "success") setOnlineModalItem(null);
  };

  const items = rewardItems.filter((r) => r.category === activeCategory);

  return (
    <div className="stack">
      <div className="pageTitle">
        <h1>P:POINT SHOP</h1>
        <p>쌓아온 P:POINT로 매치데이 혜택부터 희소한 팬 경험까지 교환해보세요.</p>
      </div>

      <div className="shopBalance">
        <span>내 P:POINT</span>
        <b>{pointBalance.toLocaleString()} P</b>
      </div>

      <div className="filterChips">
        {categories.map((c) => (
          <button
            key={c.key}
            className={activeCategory === c.key ? "isActive" : ""}
            onClick={() => setActiveCategory(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="shopGrid">
        {items.map((item) => {
          const soldOut = item.stock === 0;
          const disabled = soldOut || pointBalance < item.pointCost;
          return (
            <div className="panel shopCard" key={item.id}>
              <div className="shopThumb">
                {item.image ? (
                  <img src={item.image} alt={item.title} />
                ) : (
                  <span className="shopThumbFallback" aria-hidden>
                    {item.title.slice(0, 1)}
                  </span>
                )}
              </div>
              {item.isRaffle && <span className="tag" style={{ width: "fit-content" }}>응모권</span>}
              <p className="boardTitle" style={{ marginTop: 8 }}>
                {item.title}
              </p>
              {item.onlineShopPrice ? (
                <p className="shopSalePrice">온라인샵 판매가 {item.onlineShopPrice.toLocaleString()}원</p>
              ) : (
                <p className="boardExcerpt">{item.description}</p>
              )}
              <div className="shopFoot">
                <b className="shopPrice">{item.pointCost} P:POINT</b>
                <button
                  className="smallBtn"
                  disabled={disabled}
                  onClick={() => (item.onlineAction ? setOnlineModalItem(item) : handleRedeem(item.id))}
                >
                  {item.isRaffle ? "응모하기" : item.onlineAction ? "적용하기" : "교환하기"}
                </button>
              </div>
              {feedback[item.id] && <p className="shopFeedback">{feedback[item.id]}</p>}
              {soldOut && <p className="shopFeedback">품절</p>}
            </div>
          );
        })}
      </div>

      {onlineModalItem && (
        <OnlineRewardModal
          item={onlineModalItem}
          onClose={() => setOnlineModalItem(null)}
          onConfirm={handleOnlineConfirm}
        />
      )}
    </div>
  );
}
