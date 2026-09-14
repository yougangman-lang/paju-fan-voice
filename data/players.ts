import type { Player } from "./types";

// 파주 프런티어FC 2026 선수단(+감독). 아직 선수 사진은 없어 PlayerCard가
// 자동으로 neutral silhouette placeholder를 보여준다. 사진이 준비되면
// /public/players/{id}.png 파일만 추가하면 자동으로 교체된다.
export const players: Player[] = [
  // 감독 — 등번호가 없어 number 없이 등록한다.
  { id: "manager-gerard-nuss", name: "제라드 누스", position: "감독", shortInfo: "스페인 출신" },

  // GK
  { id: "p-1", number: 1, name: "류원우", position: "GK", shortInfo: "" },
  { id: "p-13", number: 13, name: "김민승", position: "GK", shortInfo: "" },
  { id: "p-21", number: 21, name: "황준모", position: "GK", shortInfo: "" },
  { id: "p-91", number: 91, name: "염경민", position: "GK", shortInfo: "" },

  // DF
  { id: "p-2", number: 2, name: "김민성", position: "DF", shortInfo: "" },
  { id: "p-4", number: 4, name: "김현태", position: "DF", shortInfo: "" },
  { id: "p-5", number: 5, name: "심민용", position: "DF", shortInfo: "" },
  { id: "p-6", number: 6, name: "전현병", position: "DF", shortInfo: "" },
  { id: "p-20", number: 20, name: "홍정운", position: "DF", shortInfo: "주장 (C)" },
  { id: "p-22", number: 22, name: "이민기", position: "DF", shortInfo: "" },
  { id: "p-26", number: 26, name: "이연규", position: "DF", shortInfo: "" },
  { id: "p-33", number: 33, name: "보닐라", position: "DF", shortInfo: "Julián Bonilla" },
  { id: "p-34", number: 34, name: "노승익", position: "DF", shortInfo: "" },
  { id: "p-45", number: 45, name: "서정현", position: "DF", shortInfo: "" },
  { id: "p-55", number: 55, name: "장하윤", position: "DF", shortInfo: "" },
  { id: "p-81", number: 81, name: "김민호", position: "DF", shortInfo: "" },
  { id: "p-88", number: 88, name: "이택근", position: "DF", shortInfo: "" },

  // MF
  { id: "p-8", number: 8, name: "최범경", position: "MF", shortInfo: "" },
  { id: "p-14", number: 14, name: "서동한", position: "MF", shortInfo: "" },
  { id: "p-18", number: 18, name: "이제호", position: "MF", shortInfo: "" },
  { id: "p-19", number: 19, name: "유재준", position: "MF", shortInfo: "" },
  { id: "p-27", number: 27, name: "바에즈", position: "MF", shortInfo: "Julio Báez" },
  { id: "p-40", number: 40, name: "루크", position: "MF", shortInfo: "Luke Amos" },
  { id: "p-77", number: 77, name: "이찬호", position: "MF", shortInfo: "" },

  // FW
  { id: "p-7", number: 7, name: "바우텔손", position: "FW", shortInfo: "Walterson Silva" },
  { id: "p-9", number: 9, name: "아리아스", position: "FW", shortInfo: "Jafar Arias" },
  { id: "p-10", number: 10, name: "이준석", position: "FW", shortInfo: "" },
  { id: "p-11", number: 11, name: "최원록", position: "FW", shortInfo: "" },
  { id: "p-16", number: 16, name: "이대광", position: "FW", shortInfo: "" },
  { id: "p-17", number: 17, name: "박수빈", position: "FW", shortInfo: "" },
  { id: "p-23", number: 23, name: "성진영", position: "FW", shortInfo: "" },
  { id: "p-47", number: 47, name: "최상윤", position: "FW", shortInfo: "" },
  { id: "p-70", number: 70, name: "안준혁", position: "FW", shortInfo: "" },
  { id: "p-92", number: 92, name: "보르하 바스톤", position: "FW", shortInfo: "Borja Bastón" },
  { id: "p-95", number: 95, name: "시암", position: "FW", shortInfo: "Thailand" },
  { id: "p-97", number: 97, name: "전유상", position: "FW", shortInfo: "" },
  { id: "p-99", number: 99, name: "이동열", position: "FW", shortInfo: "" },
];
