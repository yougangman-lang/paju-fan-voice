export type RouteStop = {
  time: string;
  place: string;
  activity: string;
  note?: string;
  /** Optional lifestyle photo, e.g. /images/lifestyle/mangwon.png */
  image?: string;
};

export type Host = {
  id: string;
  name: string;
  image: string;
  /** CSS object-position used for editorial crops */
  imagePosition?: string;
  role: string;
  headline: string;
  description: string;
  tags: string[];
  route: RouteStop[];
  participants: {
    current: number;
    max: number;
    firstMatch: number;
  };
  whatWeDo: { title: string; copy: string }[];
  people: { label: string; note: string }[];
  match: {
    title: string;
    date: string;
    kickoff: string;
    venue: string;
    seat: string;
  };
};

const matchday = {
  title: "FC SEOUL HOME MATCH",
  date: "SAT 10.03",
  kickoff: "19:00",
  venue: "서울월드컵경기장",
};

export const hosts: Host[] = [
  {
    id: "seongbuk",
    name: "성북부대공",
    image: "/images/hosts/host-seongbuk.png",
    imagePosition: "center 30%",
    role: "Campus Host",
    headline: "성북부대공과\n안암에서 상암까지.",
    description: "먹고, 놀고, 마지막은 FC서울.",
    tags: ["#고대생", "#첫직관환영", "#카페", "#FC서울"],
    route: [
      { time: "14:00", place: "ANAM", activity: "Meet", note: "안암역 앞에서 첫 인사", image: "/images/lifestyle/anam.png" },
      { time: "15:30", place: "MANGWON", activity: "Cafe", note: "망원동 골목 카페", image: "/images/lifestyle/mangwon.png" },
      { time: "17:00", place: "MANGWON", activity: "Dinner", note: "망원시장에서 든든하게" },
      { time: "18:20", place: "SANGAM", activity: "Arrive", note: "월드컵경기장역 집결", image: "/images/lifestyle/sangam.png" },
      { time: "19:00", place: "FC SEOUL MATCH", activity: "Football", note: "다 같이 응원" },
    ],
    participants: { current: 5, max: 8, firstMatch: 3 },
    whatWeDo: [
      { title: "학교 앞에서 시작", copy: "안암에서 모여 6호선을 타고 서쪽으로. 혼자 와도 바로 섞일 수 있게 가볍게 시작해요." },
      { title: "망원에서 커피와 저녁", copy: "경기 전엔 카페에서 수다, 망원시장에서 저녁. 축구 얘기 몰라도 괜찮아요." },
      { title: "마지막은 FC서울", copy: "처음 직관하는 사람 옆엔 기존 팬이 앉아요. 응원가는 현장에서 같이 배워요." },
    ],
    people: [
      { label: "고려대 22", note: "첫 직관 · 카페파" },
      { label: "고려대 24", note: "라이트팬 · 사진 담당" },
      { label: "성신여대 23", note: "첫 직관 · 새 친구" },
      { label: "고려대 21", note: "FC서울 3년차" },
      { label: "교환학생", note: "첫 직관 · Hello!" },
    ],
    match: { ...matchday, seat: "E석 · 편하게 응원" },
  },
  {
    id: "durimi",
    name: "50만 유튜버 DURIMI",
    image: "/images/hosts/host-durimi.png",
    imagePosition: "center 25%",
    role: "Creator Host",
    headline: "DURIMI와\n새 친구 만나러 가자.",
    description: "처음 만난 사람들과\n먹고, 놀고, 같이 응원하기.",
    tags: ["#NewFriends", "#첫직관", "#6호선", "#Matchday"],
    route: [
      { time: "13:30", place: "HAPJEONG", activity: "Meet", note: "합정역에서 아이스브레이킹", image: "/images/lifestyle/hapjeong.png" },
      { time: "15:00", place: "HAPJEONG", activity: "Cafe", note: "팀 나눠서 카페 미션" },
      { time: "16:30", place: "MANGWON", activity: "Walk", note: "망원 한강공원 산책", image: "/images/lifestyle/mangwon.png" },
      { time: "17:40", place: "SANGAM", activity: "Dinner", note: "경기장 앞 저녁", image: "/images/lifestyle/sangam.png" },
      { time: "19:00", place: "FC SEOUL MATCH", activity: "Football", note: "같이 응원하기" },
    ],
    participants: { current: 9, max: 12, firstMatch: 6 },
    whatWeDo: [
      { title: "처음 만난 사람들과", copy: "모르는 사람끼리 팀을 나눠 작은 미션을 해요. 30분이면 이름을 다 외워요." },
      { title: "6호선 따라 놀기", copy: "합정에서 망원, 그리고 상암까지. 걷고 먹고 사진 찍는 하루." },
      { title: "같이 응원하기", copy: "경기 규칙을 몰라도 괜찮아요. 골 들어가면 같이 소리 지르면 돼요." },
    ],
    people: [
      { label: "연세대 23", note: "첫 직관 · 구독자" },
      { label: "홍익대 22", note: "새 친구 · 산책파" },
      { label: "서강대 24", note: "첫 직관" },
      { label: "한양대 21", note: "라이트팬" },
      { label: "숙명여대 23", note: "첫 직관 · 맛집파" },
      { label: "건국대 22", note: "FC서울 팬" },
    ],
    match: { ...matchday, seat: "W석 · 함께 응원" },
  },
  {
    id: "byeon",
    name: "BYEON HOLLAND",
    image: "/images/hosts/host-byeon.png",
    imagePosition: "center 30%",
    role: "Social Host",
    headline: "BYEON HOLLAND와\n상암을 접수하자.",
    description: "평범한 토요일 말고,\n조금 이상하고 재밌는 Matchday.",
    tags: ["#친목", "#맛집", "#상암", "#FC서울"],
    route: [
      { time: "14:30", place: "ITAEWON", activity: "Food", note: "이태원 브런치로 시작", image: "/images/lifestyle/itaewon.png" },
      { time: "16:00", place: "HAPJEONG", activity: "Play", note: "합정 레트로 오락실", image: "/images/lifestyle/hapjeong.png" },
      { time: "17:30", place: "SANGAM", activity: "Food", note: "경기장 앞 맛집 투어", image: "/images/lifestyle/sangam.png" },
      { time: "19:00", place: "FC SEOUL MATCH", activity: "Football", note: "N석 근처에서 열응원" },
      { time: "21:30", place: "SANGAM", activity: "2nd Round", note: "경기 후 뒤풀이" },
    ],
    participants: { current: 6, max: 10, firstMatch: 2 },
    whatWeDo: [
      { title: "이태원에서 브런치", copy: "낮부터 천천히. 먹는 게 절반인 Matchday." },
      { title: "조금 이상한 미션", copy: "오락실 대결, 응원 슬로건 만들기. 이긴 팀이 경기 후 메뉴를 골라요." },
      { title: "경기 후 2차까지", copy: "이기면 축하, 지면 위로. 어느 쪽이든 끝까지 같이." },
    ],
    people: [
      { label: "연세대 21", note: "FC서울 팬 · 열응원" },
      { label: "고려대 22", note: "맛집 헌터" },
      { label: "홍익대 23", note: "첫 직관 · 오락실 고수" },
      { label: "성균관대 22", note: "라이트팬" },
      { label: "교환학생", note: "첫 직관 · Foodie" },
    ],
    match: { ...matchday, seat: "N석 인근 · 열응원" },
  },
];

export function getHost(id: string) {
  return hosts.find((h) => h.id === id);
}

export function routeSummary(route: RouteStop[]) {
  const places: string[] = [];
  for (const stop of route) {
    const place = stop.place === "FC SEOUL MATCH" ? "SANGAM" : stop.place;
    if (places[places.length - 1] !== place) places.push(place);
  }
  return places.join(" → ");
}
