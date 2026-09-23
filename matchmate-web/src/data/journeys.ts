/**
 * 6호선 Matchday Journey.
 *
 * Lifestyle photos are optional. Drop a file at the `image` path
 * (e.g. public/images/lifestyle/anam.png) and rebuild — the CSS placeholder
 * is replaced automatically. Missing files never break the build.
 */
export type JourneyStop = {
  id: string;
  station: string;
  stationKo: string;
  activity: string;
  activityKo: string;
  copy: string;
  image: string;
  /** Placeholder tone used until the real photo exists */
  tone: string;
};

export const sixLineStops: JourneyStop[] = [
  {
    id: "anam",
    station: "ANAM",
    stationKo: "안암",
    activity: "Meet",
    activityKo: "만나기",
    copy: "학교 앞에서 어색한 첫 인사.",
    image: "/images/lifestyle/anam.png",
    tone: "#E4DDCB",
  },
  {
    id: "itaewon",
    station: "ITAEWON",
    stationKo: "이태원",
    activity: "Food",
    activityKo: "먹기",
    copy: "낮부터 브런치, 세계 음식 한 바퀴.",
    image: "/images/lifestyle/itaewon.png",
    tone: "#E9D6C4",
  },
  {
    id: "hapjeong",
    station: "HAPJEONG",
    stationKo: "합정",
    activity: "Cafe",
    activityKo: "카페",
    copy: "커피 한 잔에 벌써 친구.",
    image: "/images/lifestyle/hapjeong.png",
    tone: "#DCD8CC",
  },
  {
    id: "mangwon",
    station: "MANGWON",
    stationKo: "망원",
    activity: "Walk",
    activityKo: "산책",
    copy: "한강 따라 노을 보면서 천천히.",
    image: "/images/lifestyle/mangwon.png",
    tone: "#D9DDD0",
  },
  {
    id: "sangam",
    station: "WORLD CUP STADIUM",
    stationKo: "월드컵경기장",
    activity: "Football",
    activityKo: "직관",
    copy: "그리고, 다 같이 FC서울.",
    image: "/images/lifestyle/sangam.png",
    tone: "#F1D3D0",
  },
];

export type SixLinePick = {
  id: string;
  title: string;
  copy: string;
  stops: string[];
  duration: string;
  href: string;
};

export const sixLinePicks: SixLinePick[] = [
  {
    id: "cafe-route",
    title: "망원 카페 루트",
    copy: "골목 카페 두 곳, 한강 10분, 그리고 킥오프.",
    stops: ["HAPJEONG", "MANGWON", "SANGAM"],
    duration: "4H",
    href: "/crew/saturday-crew-03",
  },
  {
    id: "food-route",
    title: "이태원 → 상암 먹방",
    copy: "브런치로 시작해서 경기장 앞 맛집으로 끝.",
    stops: ["ITAEWON", "HAPJEONG", "SANGAM"],
    duration: "5H",
    href: "/host/byeon",
  },
  {
    id: "campus-route",
    title: "안암발 6호선 완주",
    copy: "학교 앞에서 출발해 종점 감성까지.",
    stops: ["ANAM", "MANGWON", "SANGAM"],
    duration: "5H",
    href: "/host/seongbuk",
  },
  {
    id: "sunset-route",
    title: "노을 산책 루트",
    copy: "합정에서 걸어서 망원 한강, 해 질 때 경기장.",
    stops: ["HAPJEONG", "MANGWON", "SANGAM"],
    duration: "3H",
    href: "/crew/hapjeong-slow-walk",
  },
];

export type WeekendItem = {
  day: string;
  time: string;
  title: string;
  kind: "MOOD MATCH" | "HOST PICK";
  place: string;
  spots: string;
  href: string;
};

export const thisWeekend: WeekendItem[] = [
  { day: "SAT", time: "13:30", title: "DURIMI와 새 친구 만나러 가자", kind: "HOST PICK", place: "합정 → 상암", spots: "3자리 남음", href: "/host/durimi" },
  { day: "SAT", time: "14:00", title: "성북부대공과 안암에서 상암까지", kind: "HOST PICK", place: "안암 → 망원 → 상암", spots: "3자리 남음", href: "/host/seongbuk" },
  { day: "SAT", time: "14:30", title: "BYEON HOLLAND와 상암을 접수하자", kind: "HOST PICK", place: "이태원 → 상암", spots: "4자리 남음", href: "/host/byeon" },
  { day: "SAT", time: "15:30", title: "SATURDAY CREW 03", kind: "MOOD MATCH", place: "망원 → 상암", spots: "2자리 남음", href: "/crew/saturday-crew-03" },
  { day: "SAT", time: "17:00", title: "FIRST TIMERS CLUB", kind: "MOOD MATCH", place: "합정 → 상암", spots: "1자리 남음", href: "/crew/first-timers-club" },
  { day: "SAT", time: "18:00", title: "AFTER 2ND ROUND", kind: "MOOD MATCH", place: "상암", spots: "2자리 남음", href: "/crew/after-2nd-round" },
];
