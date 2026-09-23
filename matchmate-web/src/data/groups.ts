import type { MoodTag } from "./moods";

export type FootballLevel = "first" | "light" | "fan";
export type SocialStyle = "new-friends" | "chill" | "loud" | "foodie" | "after-party";

export type Group = {
  id: string;
  title: string;
  description: string;
  /** Main football level of the crew */
  footballLevel: FootballLevel | "mixed";
  socialStyle: SocialStyle;
  activities: MoodTag[];
  currentMembers: number;
  maxMembers: number;
  firstMatchCount: number;
  existingFanCount: number;
  schools: string[];
  tags: string[];
  route: string[];
  meet: { day: string; time: string; place: string };
  foreignFriendly: boolean;
};

export const footballLevelLabels: Record<FootballLevel, string> = {
  first: "처음 봐요",
  light: "가끔 봐요",
  fan: "FC서울 팬이에요",
};

export const groups: Group[] = [
  {
    id: "saturday-crew-03",
    title: "SATURDAY CREW 03",
    description: "망원에서 만나서\n커피 마시고 상암 갈 사람",
    footballLevel: "first",
    socialStyle: "new-friends",
    activities: ["cafe", "newFriends", "firstMatch", "chill", "walk", "preMatch"],
    currentMembers: 4,
    maxMembers: 6,
    firstMatchCount: 3,
    existingFanCount: 1,
    schools: ["고려대", "홍익대", "숙명여대"],
    tags: ["#Cafe", "#Mangwon", "#NewFriends", "#FCSeoul"],
    route: ["MANGWON", "SANGAM"],
    meet: { day: "SAT 10.03", time: "15:30", place: "망원역 2번 출구" },
    foreignFriendly: true,
  },
  {
    id: "mangwon-foodies",
    title: "MANGWON FOODIES",
    description: "망원시장 한 바퀴 돌고\n배불러서 상암 가기",
    footballLevel: "light",
    socialStyle: "foodie",
    activities: ["food", "walk", "newFriends", "chill", "preMatch"],
    currentMembers: 3,
    maxMembers: 5,
    firstMatchCount: 1,
    existingFanCount: 2,
    schools: ["연세대", "서강대"],
    tags: ["#Food", "#Mangwon", "#Market", "#Matchday"],
    route: ["MANGWON", "SANGAM"],
    meet: { day: "SAT 10.03", time: "16:00", place: "망원시장 입구" },
    foreignFriendly: false,
  },
  {
    id: "first-timers-club",
    title: "FIRST TIMERS CLUB",
    description: "축구 룰 몰라도 OK.\n처음 직관하는 사람들끼리",
    footballLevel: "first",
    socialStyle: "chill",
    activities: ["firstMatch", "chill", "newFriends", "cafe"],
    currentMembers: 5,
    maxMembers: 6,
    firstMatchCount: 5,
    existingFanCount: 0,
    schools: ["성균관대", "한양대", "건국대"],
    tags: ["#FirstMatch", "#Chill", "#NewFriends", "#Sangam"],
    route: ["HAPJEONG", "SANGAM"],
    meet: { day: "SAT 10.03", time: "17:00", place: "합정역 7번 출구" },
    foreignFriendly: true,
  },
  {
    id: "n-stand-rookies",
    title: "N-STAND ROOKIES",
    description: "응원가 외워서\n처음부터 끝까지 서서 응원",
    footballLevel: "fan",
    socialStyle: "loud",
    activities: ["loud", "afterParty", "drinks", "food"],
    currentMembers: 4,
    maxMembers: 6,
    firstMatchCount: 1,
    existingFanCount: 3,
    schools: ["고려대", "연세대", "한양대"],
    tags: ["#Loud", "#Chant", "#FCSeoul", "#2ndRound"],
    route: ["SANGAM"],
    meet: { day: "SAT 10.03", time: "17:30", place: "월드컵경기장역 광장" },
    foreignFriendly: false,
  },
  {
    id: "hapjeong-slow-walk",
    title: "HAPJEONG SLOW WALK",
    description: "합정에서 한강 따라 걷다가\n노을 보고 경기장으로",
    footballLevel: "light",
    socialStyle: "chill",
    activities: ["walk", "cafe", "chill", "preMatch"],
    currentMembers: 2,
    maxMembers: 4,
    firstMatchCount: 1,
    existingFanCount: 1,
    schools: ["홍익대", "서강대"],
    tags: ["#Walk", "#Hangang", "#Sunset", "#Chill"],
    route: ["HAPJEONG", "MANGWON", "SANGAM"],
    meet: { day: "SAT 10.03", time: "16:30", place: "합정역 8번 출구" },
    foreignFriendly: true,
  },
  {
    id: "global-matchday",
    title: "GLOBAL MATCHDAY",
    description: "교환학생이랑 같이.\n영어 반, 한국어 반 직관",
    footballLevel: "mixed",
    socialStyle: "new-friends",
    activities: ["newFriends", "food", "firstMatch", "afterParty"],
    currentMembers: 5,
    maxMembers: 6,
    firstMatchCount: 3,
    existingFanCount: 2,
    schools: ["연세대", "고려대", "서강대"],
    tags: ["#Global", "#NewFriends", "#Itaewon", "#FCSeoul"],
    route: ["ITAEWON", "SANGAM"],
    meet: { day: "SAT 10.03", time: "15:00", place: "이태원역 1번 출구" },
    foreignFriendly: true,
  },
  {
    id: "anam-to-sangam",
    title: "ANAM TO SANGAM",
    description: "수업 끝나고 학교 앞에서 만나\n6호선 끝까지 같이 타기",
    footballLevel: "mixed",
    socialStyle: "new-friends",
    activities: ["newFriends", "food", "loud", "preMatch"],
    currentMembers: 3,
    maxMembers: 6,
    firstMatchCount: 2,
    existingFanCount: 1,
    schools: ["고려대", "성신여대"],
    tags: ["#Anam", "#Line6", "#NewFriends", "#Food"],
    route: ["ANAM", "HAPJEONG", "SANGAM"],
    meet: { day: "SAT 10.03", time: "14:30", place: "안암역 2번 출구" },
    foreignFriendly: false,
  },
  {
    id: "after-2nd-round",
    title: "AFTER 2ND ROUND",
    description: "경기는 시작일 뿐.\n끝나고 한 잔 더 할 사람",
    footballLevel: "fan",
    socialStyle: "after-party",
    activities: ["afterParty", "drinks", "loud", "food"],
    currentMembers: 4,
    maxMembers: 6,
    firstMatchCount: 0,
    existingFanCount: 4,
    schools: ["건국대", "한양대", "성균관대"],
    tags: ["#AfterParty", "#Drinks", "#Sangam", "#FCSeoul"],
    route: ["SANGAM"],
    meet: { day: "SAT 10.03", time: "18:00", place: "경기장 북측 광장" },
    foreignFriendly: false,
  },
];

export function getGroup(id: string) {
  return groups.find((g) => g.id === id);
}
