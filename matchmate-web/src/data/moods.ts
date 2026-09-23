export type MoodTag =
  | "newFriends"
  | "cafe"
  | "food"
  | "firstMatch"
  | "chill"
  | "loud"
  | "afterParty"
  | "walk"
  | "drinks"
  | "preMatch";

export const moodTagLabels: Record<MoodTag, string> = {
  newFriends: "새 친구",
  cafe: "카페",
  food: "맛집",
  firstMatch: "첫 직관",
  chill: "편하게 응원",
  loud: "열응원",
  afterParty: "경기 후 2차",
  walk: "산책",
  drinks: "술",
  preMatch: "경기 전 활동",
};

/** Chips shown in the home Mood Match selector. */
export const homeMoodTags: MoodTag[] = [
  "newFriends",
  "cafe",
  "food",
  "firstMatch",
  "chill",
  "loud",
  "afterParty",
  "walk",
];

export type TodaysMood = {
  no: string;
  title: string;
  copy: string;
  word: string;
  tags: MoodTag[];
};

export const todaysMoods: TodaysMood[] = [
  {
    no: "01",
    title: "카페 + 직관",
    copy: "망원에서 커피 한 잔하고 상암으로",
    word: "CAFE",
    tags: ["cafe", "walk"],
  },
  {
    no: "02",
    title: "맛집 + 직관",
    copy: "6호선 맛집부터 경기까지",
    word: "FOOD",
    tags: ["food", "afterParty"],
  },
  {
    no: "03",
    title: "첫 직관",
    copy: "축구 몰라도 함께라면 괜찮아",
    word: "FIRST",
    tags: ["firstMatch", "chill"],
  },
  {
    no: "04",
    title: "새로운 친구",
    copy: "취향 맞는 사람들과 보내는 Matchday",
    word: "FRIENDS",
    tags: ["newFriends"],
  },
];

export const schools = [
  "고려대",
  "연세대",
  "서강대",
  "홍익대",
  "성균관대",
  "한양대",
  "숙명여대",
  "건국대",
  "기타",
] as const;
