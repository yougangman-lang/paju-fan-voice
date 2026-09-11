import type { Tier } from "./types";

// 관리자 "Fans" 탭에서 보여줄 회원 목록 mock. 현재 프로토타입은 단일
// 데모 계정(currentUser)만 실제로 동작하므로, 이 목록은 관리자 화면의
// 회원 관리 UI를 보여주기 위한 별도 mock 데이터다.
export type FanDirectoryEntry = {
  id: string;
  nickname: string;
  tier: Tier;
  joinedAt: string;
  lifetimePoints: number;
  lastLoginAt: string;
};

export const fanDirectory: FanDirectoryEntry[] = [
  { id: "f1", nickname: "프런티어러버", tier: "COSMOS", joinedAt: "2024-03-02", lifetimePoints: 812, lastLoginAt: "2026-09-10" },
  { id: "f2", nickname: "축구소년단맘", tier: "FRONTIER", joinedAt: "2025-01-15", lifetimePoints: 356, lastLoginAt: "2026-09-09" },
  { id: "f3", nickname: "파주토박이", tier: "FRONTIER", joinedAt: "2025-04-22", lifetimePoints: 244, lastLoginAt: "2026-09-08" },
  { id: "f4", nickname: "홈경기개근", tier: "FRONTIER", joinedAt: "2025-06-11", lifetimePoints: 228, lastLoginAt: "2026-09-07" },
  { id: "f5", nickname: "골대옆자리", tier: "ROOKIE", joinedAt: "2026-05-03", lifetimePoints: 96, lastLoginAt: "2026-09-05" },
  { id: "f6", nickname: "직관4년차", tier: "ROOKIE", joinedAt: "2026-06-18", lifetimePoints: 58, lastLoginAt: "2026-09-04" },
  { id: "f7", nickname: "파주키즈", tier: "ROOKIE", joinedAt: "2026-08-02", lifetimePoints: 21, lastLoginAt: "2026-08-30" },
];
