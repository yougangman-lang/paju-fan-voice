import type { Sponsor } from "./types";

// 실제 스폰서 로고 asset이 없어 가상의 플레이스홀더 스폰서명을 사용한다.
// 실제 로고 이미지가 준비되면 이 배열만 교체하면 된다.
export const sponsors: Sponsor[] = [
  { id: "sp1", category: "MAIN", name: "코스모스모터스" },
  { id: "sp2", category: "MAIN", name: "파주퍼스트뱅크" },
  { id: "sp3", category: "KIT", name: "프런티어스포츠" },
  { id: "sp4", category: "MEDICAL", name: "리버사이드병원" },
  { id: "sp5", category: "OFFICIAL", name: "파주에너지" },
  { id: "sp6", category: "OFFICIAL", name: "금촌식품" },
];
