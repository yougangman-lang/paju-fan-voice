import type { Coach } from "./types";

// 파주 프런티어FC 코칭스태프. 아직 공식 사진이 없어 PlayerCard가 자동으로
// neutral silhouette placeholder를 보여준다. 사진이 준비되면 image 필드에
// 실제 경로를 지정하면 된다(예: "/staff/{id}.png").
export const coaches: Coach[] = [
  { id: "coach-gerard-nus-casanova", name: "제라드 누스 카사노바", role: "감독" },
  { id: "coach-ramon-ferrer", name: "라몬 페레르", role: "수석코치" },
  { id: "coach-sergio-quirlos", name: "세르지오 끼를로스", role: "피지컬 코치" },
  { id: "coach-jason-field", name: "제이슨 필드", role: "코치" },
  { id: "coach-kim-beom-su", name: "김범수", role: "GK 코치" },
];
