import type { Match } from "./types";

// isToday는 실제 달력이 아니라 "지금이 매치데이인 상태"를 보여주기 위한
// mock 플래그다. 데모에서 직관 인증·오늘의 설문(HOME) 흐름을 바로
// 확인할 수 있도록 다음 경기를 매치데이로 표시해 둔다.
export const nextMatch: Match = {
  id: "m-2026-09-15",
  competition: "K LEAGUE 2",
  opponent: "상대팀 FC",
  homeAway: "HOME",
  venue: "파주스타디움",
  date: "2026-09-15",
  time: "19:00",
  status: "upcoming",
  isToday: true,
};

export const upcomingMatches: Match[] = [
  nextMatch,
  {
    id: "m-2026-09-21",
    competition: "K LEAGUE 2",
    opponent: "원정지 유나이티드",
    homeAway: "AWAY",
    venue: "원정지 종합운동장",
    date: "2026-09-21",
    time: "18:00",
    status: "upcoming",
    isToday: false,
  },
];
