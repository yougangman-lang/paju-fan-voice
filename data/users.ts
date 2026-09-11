import type { FanUser, PointTransaction } from "./types";

export const currentUser: FanUser = {
  id: "u1",
  nickname: "파주프런티어 팬",
  pointBalance: 108,
  lifetimeEarnedPoints: 108,
  referralCode: "PAJU-8421",
  attendanceCount: 1,
  surveyCount: 1,
  suggestionCount: 1,
  cheerCount: 1,
};

// 데모용 유효 추천인 코드. 실서비스에서는 본인 인증 완료 후
// 서버에서 지급 처리해야 어뷰징(중복 가입 등)을 막을 수 있다.
export const VALID_REFERRAL_CODE = "FRONTIER2026";

export const initialPointHistory: PointTransaction[] = [
  { id: "h1", type: "attendance", amount: 50, description: "직관 인증", createdAt: "2026-08-28" },
  { id: "h2", type: "suggestion", amount: 30, description: "팬 제안 작성 · 셔틀 이용 개선 제안", createdAt: "2026-08-20" },
  { id: "h3", type: "survey", amount: 20, description: "MD 신상품 설문 참여", createdAt: "2026-09-02" },
  { id: "h4", type: "checkin", amount: 3, description: "출석 체크", createdAt: "2026-09-10" },
  { id: "h5", type: "cheer", amount: 5, description: "파주를 응원해요", createdAt: "2026-09-10" },
];
