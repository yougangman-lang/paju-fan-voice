import type { SuggestionCategory } from "./types";

// 관리자 대시보드의 카테고리별 분석 · AI FAN INSIGHT는 실제 NLP 분석이
// 아니라, 향후 텍스트 분석을 붙였을 때 어떤 화면이 되는지 보여주는 mock
// 데이터다. 누적 기간 기준의 예시 통계이며 현재 팬 제안 게시판의 소규모
// mock 목록과 1:1로 합산되지는 않는다.

export type CategoryAnalysis = {
  category: SuggestionCategory;
  count: number;
  keywords: { label: string; count: number }[];
};

export const categoryAnalysis: CategoryAnalysis[] = [
  {
    category: "경기장 운영",
    count: 38,
    keywords: [
      { label: "셔틀", count: 17 },
      { label: "주차", count: 13 },
      { label: "흡연구역", count: 7 },
      { label: "좌석/시야", count: 6 },
    ],
  },
  {
    category: "팬서비스",
    count: 27,
    keywords: [
      { label: "키즈존", count: 9 },
      { label: "안내데스크", count: 7 },
      { label: "직원 응대", count: 6 },
      { label: "대기시간", count: 5 },
    ],
  },
  {
    category: "응원문화",
    count: 16,
    keywords: [
      { label: "전광판", count: 6 },
      { label: "응원구호", count: 5 },
      { label: "서포터즈석", count: 3 },
      { label: "응원가", count: 2 },
    ],
  },
  {
    category: "MD",
    count: 14,
    keywords: [
      { label: "사이즈", count: 5 },
      { label: "가격", count: 4 },
      { label: "품절", count: 3 },
      { label: "디자인", count: 2 },
    ],
  },
  {
    category: "콘텐츠",
    count: 11,
    keywords: [
      { label: "브이로그", count: 4 },
      { label: "하이라이트", count: 4 },
      { label: "선수 인터뷰", count: 3 },
    ],
  },
  {
    category: "기타",
    count: 4,
    keywords: [
      { label: "우천 대비", count: 2 },
      { label: "흡연", count: 1 },
      { label: "기타", count: 1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// AI FAN INSIGHT: "AI는 분류·정리, 사람은 검토·판단·대응"을 화면 구조로
// 보여주기 위한 mock 데이터. 실제 NLP 분석과 연동되어 있지 않으며, 각 카드는
// (1) AI가 묶어 준 관련 의견 수/추세, (2) 그 근거가 된 원문 예시,
// (3) 관리자가 상태를 바꾸고 답변을 남길 대상 제안(linkedSuggestionId)으로
// 구성된다. linkedSuggestionId가 있는 카드는 실제 팬 제안 목록의 항목과
// 연결되어, "AI 인사이트 → 원문 확인 → 관리자 판단 → 상태/답변 반영" 흐름을
// 그대로 시연할 수 있다.
export type FanInsightCard = {
  id: string;
  topic: string;
  subtopic: string;
  relatedCount: number;
  trendTags: string[];
  rawQuotes: string[];
  linkedSuggestionId?: string;
};

export const weeklyFanInsights: FanInsightCard[] = [
  {
    id: "insight-safety",
    topic: "경기장 운영",
    subtopic: "안전·동선",
    relatedCount: 18,
    trendTags: ["최근 증가", "반복도 높음"],
    rawQuotes: [
      "푸드트럭 앞에 차가 계속 들어와서 아이들이랑 지나가기 조금 위험했어요.",
      "흡연구역이 대기줄이랑 너무 가까운 것 같습니다.",
      "차량 동선과 관람객 줄을 분리하면 좋을 것 같아요.",
      "매표소 앞에 줄이 여러 갈래라 혼잡해요.",
    ],
    linkedSuggestionId: "sg-demo-foodtruck",
  },
  {
    id: "insight-shuttle",
    topic: "셔틀/접근성",
    subtopic: "경기 후 이동",
    relatedCount: 14,
    trendTags: ["공감도 높음"],
    rawQuotes: [
      "경기 끝나고 셔틀 배차 간격이 너무 길어요.",
      "막차 시간이 너무 빨라서 못 탈 때가 있어요.",
      "금촌역 방면 셔틀이 한 대만 더 있어도 훨씬 편할 것 같아요.",
    ],
    linkedSuggestionId: "sg1",
  },
  {
    id: "insight-md",
    topic: "MD/굿즈",
    subtopic: "상품 구성",
    relatedCount: 9,
    trendTags: ["유사 의견"],
    rawQuotes: [
      "원정 팬들도 살 수 있는 소량 굿즈가 있으면 좋겠어요.",
      "인기 사이즈가 빨리 품절돼요.",
      "머플러 디자인 종류가 조금 더 다양했으면 합니다.",
    ],
    linkedSuggestionId: "sg3",
  },
];
