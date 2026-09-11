import type { FanSuggestion, SuggestionCategory } from "./types";

export const suggestionCategories: SuggestionCategory[] = [
  "경기장 운영",
  "팬서비스",
  "응원문화",
  "MD",
  "콘텐츠",
  "기타",
];

export const initialSuggestions: FanSuggestion[] = [
  {
    id: "sg1",
    category: "경기장 운영",
    title: "경기 종료 후 금촌역 셔틀 시간을 늘려주세요",
    content:
      "평일 경기 종료 후 셔틀 시간이 빠듯합니다. 종료 20~30분 뒤에도 한 차례 더 운행되면 좋겠습니다.",
    author: "프런티어러버",
    authorTier: "COSMOS",
    likes: 173,
    clubStatus: "반영예정",
    clubResponse: {
      comment: "다음 홈경기부터 경기 종료 후 셔틀 1회 추가 운행을 시범 적용합니다.",
      date: "2026-09-06",
    },
    createdAt: "2026-08-28",
  },
  {
    id: "sg2",
    category: "팬서비스",
    title: "가족 관람객을 위한 키즈 이벤트를 확대해주세요",
    content:
      "아이들과 함께 온 가족이 경기 전에도 즐길 수 있는 프로그램이 더 많았으면 좋겠습니다.",
    author: "축구소년단맘",
    authorTier: "FRONTIER",
    likes: 119,
    clubStatus: "반영완료",
    clubResponse: {
      comment: "이번 시즌부터 홈경기 2시간 전 키즈존을 상시 운영합니다.",
      date: "2026-09-01",
    },
    createdAt: "2026-08-20",
  },
  {
    id: "sg3",
    category: "MD",
    title: "원정 기념품 소량 판매를 제안합니다",
    content:
      "원정 온 타팀 팬들도 파주 기념품을 구매할 수 있게 머플러나 마그넷을 판매하면 좋겠습니다.",
    author: "파주토박이",
    authorTier: "FRONTIER",
    likes: 86,
    clubStatus: "검토중",
    createdAt: "2026-08-30",
  },
  {
    id: "sg4",
    category: "응원문화",
    title: "서포터즈석 응원 구호를 전광판에 함께 띄워주세요",
    content:
      "처음 오는 팬들도 쉽게 따라할 수 있게 응원 구호를 전광판 자막으로 보여주면 좋겠습니다.",
    author: "골대옆자리",
    authorTier: "ROOKIE",
    likes: 37,
    clubStatus: "검토중",
    createdAt: "2026-09-03",
  },
  {
    id: "sg5",
    category: "콘텐츠",
    title: "선수단 훈련 비하인드 콘텐츠를 더 자주 올려주세요",
    content:
      "경기 외 시간에도 선수들의 모습을 볼 수 있는 콘텐츠가 있으면 팬심이 더 커질 것 같아요.",
    author: "직관4년차",
    authorTier: "ROOKIE",
    likes: 21,
    clubStatus: "검토중",
    createdAt: "2026-09-04",
  },
  {
    id: "sg6",
    category: "기타",
    title: "우천 시 입장 전 대기 공간이 부족합니다",
    content: "비 오는 날 입장 전 대기할 수 있는 공간이 있었으면 합니다.",
    author: "비오는날축구",
    authorTier: "ROOKIE",
    likes: 11,
    clubStatus: "반영어려움",
    clubResponse: {
      comment:
        "현 경기장 구조상 즉시 반영은 어려우나, 우천 시 입장 동선을 조정해 대기 시간을 줄이는 방안을 검토 중입니다.",
      date: "2026-08-29",
    },
    createdAt: "2026-08-18",
  },
  {
    id: "sg7",
    category: "경기장 운영",
    title: "매표소 앞 대기 줄 안내선을 정리해주세요",
    content: "매표소 앞에 줄이 여러 갈래로 생겨서 혼잡합니다. 안내선만 정리돼도 훨씬 편할 것 같아요.",
    author: "홈경기개근",
    authorTier: "FRONTIER",
    likes: 31,
    clubStatus: "검토중",
    createdAt: "2026-08-25",
  },
  {
    id: "sg8",
    category: "팬서비스",
    title: "선수 입장 시 어린이 하이파이브존을 만들어주세요",
    content: "선수단이 입장할 때 어린이 팬들과 하이파이브할 수 있는 구간이 있으면 좋겠습니다.",
    author: "파주키즈",
    authorTier: "ROOKIE",
    likes: 17,
    clubStatus: "검토중",
    createdAt: "2026-08-22",
  },
];
