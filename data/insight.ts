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

export const aiFanInsight = {
  headline: "셔틀 관련 의견이 최근 증가하고 있습니다.",
  body:
    "최근 팬 제안에서 경기 종료 후 금촌역 방면 이동과 관련된 의견이 반복적으로 확인되었습니다.",
  keywords: [
    { label: "배차간격", count: 12 },
    { label: "막차시간", count: 8 },
    { label: "금촌역", count: 7 },
  ],
  trend: "최근 2경기 연속 증가",
};
