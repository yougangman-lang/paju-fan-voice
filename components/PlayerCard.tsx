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
  return (
    <div className="playerCard">
      <div className="playerPhoto">
        {player.image ? <img src={player.image} alt={player.name} /> : <SilhouettePlaceholder />}
      </div>
      <div className="playerInfo">
        <span className="playerNumber">{player.number}</span>
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
