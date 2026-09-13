"use client";

import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiTiktok, SiKakaotalk } from "react-icons/si";
import type { IconType } from "react-icons";
import type { OfficialChannel } from "@/data/types";

type IconConfig = { Icon: IconType; bg: string; color: string };

// Instagram만 공식 gradient, 나머지는 공식 브랜드 단색을 사용한다.
const ICONS: Record<string, IconConfig> = {
  "ch-facebook": { Icon: FaFacebookF, bg: "#1877F2", color: "#fff" },
  "ch-instagram": {
    Icon: FaInstagram,
    bg: "linear-gradient(135deg, #833AB4, #E1306C, #FCAF45)",
    color: "#fff",
  },
  "ch-youtube": { Icon: FaYoutube, bg: "#FF0000", color: "#fff" },
  "ch-tiktok": { Icon: SiTiktok, bg: "#000000", color: "#fff" },
  "ch-kakao": { Icon: SiKakaotalk, bg: "#FEE500", color: "#191919" },
};

export default function SocialIcons({ channels }: { channels: OfficialChannel[] }) {
  return (
    <div className="socialRow">
      {channels.map((ch) => {
        const config = ICONS[ch.id];
        if (!config) return null;
        const { Icon } = config;
        const hasUrl = !!ch.url && ch.url !== "#";
        const iconEl = (
          <span
            className="socialIconCircle"
            style={{ background: config.bg, color: config.color }}
            aria-hidden="true"
          >
            <Icon size={22} />
          </span>
        );
        return hasUrl ? (
          <a
            key={ch.id}
            href={ch.url}
            target="_blank"
            rel="noopener noreferrer"
            className="socialIconLink"
            aria-label={ch.label}
          >
            {iconEl}
            <span className="socialIconLabel">{ch.label}</span>
          </a>
        ) : (
          <button
            key={ch.id}
            type="button"
            className="socialIconLink socialIconDisabled"
            aria-label={`${ch.label} (준비 중)`}
            aria-disabled="true"
            onClick={(e) => e.preventDefault()}
          >
            {iconEl}
            <span className="socialIconLabel">{ch.label}</span>
          </button>
        );
      })}
    </div>
  );
}
