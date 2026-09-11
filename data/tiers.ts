import type { Tier } from "./types";

// 등급은 "현재 보유 포인트"가 아니라 "누적 획득 포인트"로만 계산한다.
// 포인트샵에서 사용해도 등급은 내려가지 않는다.
export const TIER_THRESHOLDS: { tier: Tier; min: number; max: number | null }[] = [
  { tier: "ROOKIE", min: 0, max: 199 },
  { tier: "FRONTIER", min: 200, max: 599 },
  { tier: "COSMOS", min: 600, max: null },
];

export const TIER_LABELS: Record<Tier, string> = {
  ROOKIE: "ROOKIE",
  FRONTIER: "FRONTIER",
  COSMOS: "COSMOS",
};

export const TIER_DESCRIPTIONS: Record<Tier, string> = {
  ROOKIE: "새롭게 활동을 시작한 팬",
  FRONTIER: "적극적으로 참여하는 개척자",
  COSMOS: "최상위 활동 팬",
};

export function calcTier(lifetimeEarnedPoints: number): Tier {
  if (lifetimeEarnedPoints >= 600) return "COSMOS";
  if (lifetimeEarnedPoints >= 200) return "FRONTIER";
  return "ROOKIE";
}

// 다음 등급까지 진행률(0~100). 최상위 등급이면 100을 반환한다.
export function tierProgress(lifetimeEarnedPoints: number) {
  const current = TIER_THRESHOLDS.find((t) => t.tier === calcTier(lifetimeEarnedPoints))!;
  if (current.max === null) {
    return { percent: 100, next: null as Tier | null, remaining: 0 };
  }
  const span = current.max + 1 - current.min;
  const done = lifetimeEarnedPoints - current.min;
  const nextTier = TIER_THRESHOLDS[TIER_THRESHOLDS.findIndex((t) => t.tier === current.tier) + 1];
  return {
    percent: Math.min(100, Math.round((done / span) * 100)),
    next: nextTier ? nextTier.tier : null,
    remaining: current.max + 1 - lifetimeEarnedPoints,
  };
}
