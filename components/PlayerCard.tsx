import { useState } from "react";
import type { Player, Coach } from "@/data/types";

export type CheerTarget = Player | Coach;

export function isCoach(target: CheerTarget): target is Coach {
  return "role" in target;
}

function SilhouettePlaceholder() {
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label="사진 준비중" className="playerSilhouette">
      <circle cx="50" cy="38" r="18" fill="currentColor" />
      <path d="M18 92c2-20 16-34 32-34s30 14 32 34Z" fill="currentColor" />
    </svg>
  );
}

export default function PlayerCard({
  target,
  onCheer,
}: {
  target: CheerTarget;
  onCheer: (target: CheerTarget) => void;
}) {
  // 공식 사진이 있으면 자동으로 보이고, 아직 없으면(404) neutral silhouette
  // placeholder로 폴백한다. 선수는 /public/players/{id}.png, 코치진은
  // image 필드(없으면 /public/staff/{id}.png)를 기준으로 경로를 찾는다.
  const [photoFailed, setPhotoFailed] = useState(false);
  const coach = isCoach(target);
  const photoSrc = coach ? target.image ?? `/staff/${target.id}.png` : `/players/${target.id}.png`;

  return (
    <div className="playerCard">
      <div className="playerPhoto">
        {photoFailed ? (
          <SilhouettePlaceholder />
        ) : (
          <img src={photoSrc} alt={target.name} onError={() => setPhotoFailed(true)} />
        )}
      </div>
      <div className="playerInfo">
        {!coach && target.number !== undefined && <span className="playerNumber">{target.number}</span>}
        <p className="playerName">{target.name}</p>
        {coach ? (
          <span className="roleBadge">{target.role}</span>
        ) : (
          <p className="playerPosition">{target.position}</p>
        )}
        {!coach && target.shortInfo && <p className="playerShortInfo">{target.shortInfo}</p>}
      </div>
      <button className="smallBtn playerCheerBtn" onClick={() => onCheer(target)}>
        응원하기
      </button>
    </div>
  );
}
