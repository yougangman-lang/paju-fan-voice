import type { Survey } from "./types";

// 팬에게는 참여 화면에서 응답 비율을 보여주지 않는다(관리자 전용 데이터).
// 문항은 "오늘 홈경기 어떠셨나요?" 같은 포괄적 질문 대신 상황별로
// 구체적인 운영 이슈를 묻는다.
export const surveys: Survey[] = [
  {
    id: "s-home-1",
    title: "오늘 홈경기 운영 설문",
    context: "HOME",
    status: "active",
    pointReward: 20,
    createdAt: "2026-09-11",
    questions: [
      {
        id: "s-home-1-q1",
        text: "오늘 운영한 패밀리 이벤트 중 다음 경기에도 참여하고 싶은 프로그램은?",
        options: [
          { id: "o1", label: "키즈 하이파이브존", votes: 61 },
          { id: "o2", label: "가족 포토존", votes: 74 },
          { id: "o3", label: "선수 사인볼 이벤트", votes: 88 },
          { id: "o4", label: "참여하고 싶은 프로그램 없음", votes: 9 },
        ],
      },
      {
        id: "s-home-1-q2",
        text: "오늘 푸드트럭 이용에서 가장 개선이 필요하다고 느낀 부분은 무엇인가요?",
        options: [
          { id: "o1", label: "메뉴 다양성", votes: 42 },
          { id: "o2", label: "대기 시간", votes: 96 },
          { id: "o3", label: "가격", votes: 38 },
          { id: "o4", label: "위생·청결", votes: 15 },
          { id: "o5", label: "설치 위치 및 주변 안전(간접흡연·차량 통행)", votes: 27 },
        ],
      },
      {
        id: "s-home-1-q3",
        text: "경기 종료 후 셔틀 이용에서 가장 불편했던 부분은?",
        options: [
          { id: "o1", label: "배차 간격", votes: 77 },
          { id: "o2", label: "노선/정차 위치", votes: 24 },
          { id: "o3", label: "탑승 혼잡도", votes: 51 },
          { id: "o4", label: "운행 안내 부족", votes: 19 },
        ],
      },
    ],
  },
  {
    id: "s-away-1",
    title: "원정 응원 지원 설문",
    context: "AWAY",
    status: "active",
    pointReward: 20,
    createdAt: "2026-09-08",
    questions: [
      {
        id: "s-away-1-q1",
        text: "이번 원정버스에서 가장 개선되었으면 하는 부분은?",
        options: [
          { id: "o1", label: "좌석 간격", votes: 33 },
          { id: "o2", label: "화장실 정차 안내", votes: 21 },
          { id: "o3", label: "냉난방", votes: 18 },
          { id: "o4", label: "출발 시간", votes: 12 },
        ],
      },
      {
        id: "s-away-1-q2",
        text: "원정 응원을 위해 추가로 제공되었으면 하는 물품은?",
        options: [
          { id: "o1", label: "응원 타올", votes: 29 },
          { id: "o2", label: "우비", votes: 24 },
          { id: "o3", label: "핫팩", votes: 17 },
          { id: "o4", label: "부채", votes: 8 },
        ],
      },
    ],
  },
  {
    id: "s-nonmatch-1",
    title: "MD 신상품 설문",
    context: "NON_MATCHDAY",
    status: "active",
    pointReward: 20,
    createdAt: "2026-09-02",
    questions: [
      {
        id: "s-nonmatch-1-q1",
        text: "다음으로 출시되었으면 하는 MD는 무엇인가요?",
        options: [
          { id: "o1", label: "후드집업", votes: 112 },
          { id: "o2", label: "트레이닝복", votes: 58 },
          { id: "o3", label: "슬리퍼", votes: 26 },
          { id: "o4", label: "텀블러", votes: 41 },
        ],
      },
    ],
  },
];
