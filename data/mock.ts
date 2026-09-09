import type {
  Poll,
  Voice,
  PointHistoryEntry,
  FanUser,
  VoiceCategory,
} from "./types";

// 이 파일의 모든 배열은 이후 Supabase 테이블(polls, poll_questions,
// poll_options, voices, point_history, users)에서 그대로 select 해온
// row 목록으로 교체될 수 있도록 필드명을 맞춰 두었다.

export const currentUser: FanUser = {
  id: "u1",
  nickname: "파주프런티어 팬",
  points: 125,
};

export const voiceCategories: VoiceCategory[] = [
  "경기장 운영",
  "팬서비스",
  "응원문화",
  "MD",
  "콘텐츠",
  "기타",
];

export const initialPolls: Poll[] = [
  {
    id: "p1",
    title: "오늘 홈경기, 어떠셨나요?",
    description: "1분이면 충분해요. 팬들의 선택은 다음 홈경기 개선안의 근거가 됩니다.",
    status: "active",
    pointReward: 5,
    createdAt: "2026-09-07",
    questions: [
      {
        id: "p1q1",
        text: "오늘 홈경기에서 가장 개선이 필요했던 부분은?",
        options: [
          { id: "p1q1o1", label: "주차", votes: 145 },
          { id: "p1q1o2", label: "셔틀", votes: 118 },
          { id: "p1q1o3", label: "입장", votes: 55 },
          { id: "p1q1o4", label: "좌석", votes: 68 },
          { id: "p1q1o5", label: "먹거리", votes: 42 },
        ],
      },
    ],
  },
  {
    id: "p2",
    title: "다음 홈경기 이벤트 투표",
    description: "가장 기대되는 이벤트에 투표하고 P:POINT를 받아가세요.",
    status: "active",
    pointReward: 5,
    createdAt: "2026-09-05",
    questions: [
      {
        id: "p2q1",
        text: "다음 홈경기에서 가장 원하는 이벤트는?",
        options: [
          { id: "p2q1o1", label: "선수 팬사인회", votes: 132 },
          { id: "p2q1o2", label: "가족·키즈 프로그램", votes: 124 },
          { id: "p2q1o3", label: "MD 할인", votes: 102 },
          { id: "p2q1o4", label: "지역상권 연계 이벤트", votes: 68 },
        ],
      },
    ],
  },
  {
    id: "p3",
    title: "굿즈 & 콘텐츠 미니 설문",
    description: "짧은 2문항으로 팬 취향을 알려주세요.",
    status: "active",
    pointReward: 5,
    createdAt: "2026-09-02",
    questions: [
      {
        id: "p3q1",
        text: "가장 갖고 싶은 MD 상품은?",
        options: [
          { id: "p3q1o1", label: "유니폼", votes: 210 },
          { id: "p3q1o2", label: "머플러", votes: 96 },
          { id: "p3q1o3", label: "키링·뱃지", votes: 74 },
        ],
      },
      {
        id: "p3q2",
        text: "선호하는 구단 콘텐츠는?",
        options: [
          { id: "p3q2o1", label: "선수 브이로그", votes: 150 },
          { id: "p3q2o2", label: "경기 하이라이트", votes: 188 },
          { id: "p3q2o3", label: "팬 인터뷰", votes: 60 },
        ],
      },
    ],
  },
];

export const initialVoices: Voice[] = [
  {
    id: "v1",
    category: "경기장 운영",
    title: "경기 종료 후 금촌역 셔틀 시간을 늘려주세요",
    content:
      "평일 경기 종료 후 셔틀 시간이 빠듯합니다. 종료 20~30분 뒤에도 한 차례 더 운행되면 좋겠습니다.",
    author: "프런티어러버",
    likes: 187,
    status: "반영예정",
    clubFeedback: {
      comment: "다음 홈경기부터 경기 종료 후 셔틀 1회 추가 운행을 시범 적용합니다.",
      date: "2026-09-06",
    },
    createdAt: "2026-08-28",
  },
  {
    id: "v2",
    category: "팬서비스",
    title: "가족 관람객을 위한 키즈 이벤트를 확대해주세요",
    content:
      "아이들과 함께 온 가족이 경기 전에도 즐길 수 있는 프로그램이 더 많았으면 좋겠습니다.",
    author: "축구소년단맘",
    likes: 126,
    status: "반영완료",
    clubFeedback: {
      comment: "이번 시즌부터 홈경기 2시간 전 키즈존을 상시 운영합니다.",
      date: "2026-09-01",
    },
    createdAt: "2026-08-20",
  },
  {
    id: "v3",
    category: "MD",
    title: "원정 기념품 소량 판매를 제안합니다",
    content:
      "원정 온 타팀 팬들도 파주 기념품을 구매할 수 있게 머플러나 마그넷을 판매하면 좋겠습니다.",
    author: "파주토박이",
    likes: 92,
    status: "검토중",
    createdAt: "2026-08-30",
  },
  {
    id: "v4",
    category: "응원문화",
    title: "서포터즈석 응원 구호를 전광판에 함께 띄워주세요",
    content:
      "처음 오는 팬들도 쉽게 따라할 수 있게 응원 구호를 전광판 자막으로 보여주면 좋겠습니다.",
    author: "골대옆자리",
    likes: 41,
    status: "검토중",
    createdAt: "2026-09-03",
  },
  {
    id: "v5",
    category: "콘텐츠",
    title: "선수단 훈련 비하인드 콘텐츠를 더 자주 올려주세요",
    content:
      "경기 외 시간에도 선수들의 모습을 볼 수 있는 콘텐츠가 있으면 팬심이 더 커질 것 같아요.",
    author: "직관4년차",
    likes: 23,
    status: "검토중",
    createdAt: "2026-09-04",
  },
  {
    id: "v6",
    category: "기타",
    title: "우천 시 입장 전 대기 공간이 부족합니다",
    content: "비 오는 날 입장 전 대기할 수 있는 공간이 있었으면 합니다.",
    author: "비오는날축구",
    likes: 12,
    status: "반영어려움",
    clubFeedback: {
      comment:
        "현 경기장 구조상 즉시 반영은 어려우나, 우천 시 입장 동선을 조정해 대기 시간을 줄이는 방안을 검토 중입니다.",
      date: "2026-08-29",
    },
    createdAt: "2026-08-18",
  },
  {
    id: "v7",
    category: "경기장 운영",
    title: "매표소 앞 대기 줄 안내선을 정리해주세요",
    content: "매표소 앞에 줄이 여러 갈래로 생겨서 혼잡합니다. 안내선만 정리돼도 훨씬 편할 것 같아요.",
    author: "홈경기개근",
    likes: 34,
    status: "검토중",
    createdAt: "2026-08-25",
  },
  {
    id: "v8",
    category: "팬서비스",
    title: "선수 입장 시 어린이 하이파이브존을 만들어주세요",
    content: "선수단이 입장할 때 어린이 팬들과 하이파이브할 수 있는 구간이 있으면 좋겠습니다.",
    author: "파주키즈",
    likes: 19,
    status: "검토중",
    createdAt: "2026-08-22",
  },
];

export const initialPointHistory: PointHistoryEntry[] = [
  { id: "h1", label: "오늘의 팬 질문 참여", amount: 5, date: "2026-09-07" },
  { id: "h2", label: "셔틀 개선 의견 작성", amount: 10, date: "2026-08-28" },
  { id: "h3", label: "가족 이벤트 의견 공감", amount: 1, date: "2026-08-21" },
];

export const futureFeatures = [
  "CRM 연계",
  "구단 홈페이지 연계",
  "MD 구매 데이터 결합",
  "SNS·커뮤니티 분석",
];
