import type { Match, MatchPreview } from "./types";

// isToday는 실제 달력이 아니라 "지금이 매치데이인 상태"를 보여주기 위한
// mock 플래그다. 데모에서 직관 인증·오늘의 설문(HOME) 흐름을 바로
// 확인할 수 있도록 다음 경기를 매치데이로 표시해 둔다.
export const nextMatch: Match = {
  id: "m-2026-10-10",
  competition: "K리그2",
  opponent: "부산 아이파크",
  opponentCrest: "/teams/busan-ipark.png",
  homeAway: "HOME",
  venue: "파주 스타디움",
  date: "2026-10-10",
  time: "14:00",
  status: "upcoming",
  isToday: true,
};

// NEXT MATCH "경기 정보" 모달에 표시되는 다음 경기 전력 비교 데이터.
export const nextMatchPreview: MatchPreview = {
  home: {
    name: "파주 프런티어FC",
    crest: "/branding/paju-frontier-crest.png",
    rank: 13,
    points: 26,
    record: "7승 5무 12패",
    avgGoalsFor: 0.91,
    avgGoalsAgainst: 1.16,
  },
  away: {
    name: "부산 아이파크",
    crest: "/teams/busan-ipark.png",
    rank: 6,
    points: 38,
    record: "11승 5무 8패",
    avgGoalsFor: 1.62,
    avgGoalsAgainst: 1.37,
  },
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
