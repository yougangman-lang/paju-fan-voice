import type { Tier } from "@/data/types";
import { TIER_LABELS, TIER_DESCRIPTIONS } from "@/data/tiers";

const TIER_COLORS: Record<Tier, string> = {
  ROOKIE: "#4caf6e", // soft green
  FRONTIER: "var(--blue)", // paju blue
  COSMOS: "var(--cosmos-pink)", // 공식 Cosmos Pink
};

function IconPath({ tier }: { tier: Tier }) {
  if (tier === "ROOKIE") {
    // 새싹
    return (
      <path
        d="M12 21v-7m0 0c0-4 -3-6-7-6 0 4 2 7 7 7Zm0 0c0-5 3-8 8-8 0 5-3 8-8 8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  }
  if (tier === "FRONTIER") {
    // 나침반
    return (
      <>
        <circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M14.6 9.4 12.9 12.9 9.4 14.6 11.1 11.1 14.6 9.4Z" fill="currentColor" />
      </>
    );
  }
  // COSMOS: 코스모스 꽃
  return (
    <>
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="12"
          cy="6.6"
          rx="1.7"
          ry="3.1"
          fill="currentColor"
          opacity="0.85"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
    </>
  );
}

export default function TierIcon({
  tier,
  size = 16,
  className,
}: {
  tier: Tier;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label={`${TIER_LABELS[tier]} · ${TIER_DESCRIPTIONS[tier]}`}
      style={{ color: TIER_COLORS[tier], flex: "none" }}
    >
      <title>{`${TIER_LABELS[tier]} · ${TIER_DESCRIPTIONS[tier]}`}</title>
      <IconPath tier={tier} />
    </svg>
  );
}
