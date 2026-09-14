import { useState } from "react";
import type { Player } from "@/data/types";

function SilhouettePlaceholder() {
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label="선수 사진 준비중" className="playerSilhouette">
      <circle cx="50" cy="38" r="18" fill="currentColor" />
      <path d="M18 92c2-20 16-34 32-34s30 14 32 34Z" fill="currentColor" />
    </svg>
  );
}

export default function PlayerCard({
  player,
  onCheer,
}: {
  player: Player;
  onCheer: (player: Player) => void;
}) {
  // /public/players/{id}.png 파일이 존재하면 자동으로 실제 사진이 보이고,
  // 아직 없으면(404) neutral silhouette placeholder로 폴백한다. 별도의 데이터
  // 입력 없이 파일만 추가하면 되도록 id 기반 경로 규칙을 사용한다(감독처럼
  // 등번호가 없는 항목도 같은 방식으로 다룰 수 있다).
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <div className="playerCard">
      <div className="playerPhoto">
        {photoFailed ? (
          <SilhouettePlaceholder />
        ) : (
          <img
            src={`/players/${player.id}.png`}
            alt={player.name}
            onError={() => setPhotoFailed(true)}
          />
        )}
      </div>
      <div className="playerInfo">
        {player.number !== undefined && <span className="playerNumber">{player.number}</span>}
        <p className="playerName">{player.name}</p>
        <p className="playerPosition">{player.position}</p>
        {player.shortInfo && <p className="playerShortInfo">{player.shortInfo}</p>}
      </div>
      <button className="smallBtn playerCheerBtn" onClick={() => onCheer(player)}>
        응원하기
      </button>
    </div>
  );
}
