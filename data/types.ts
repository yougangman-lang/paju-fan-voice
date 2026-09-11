// 데이터 모델. 지금은 도메인별 mock 배열(data/*.ts)로 채워지지만,
// 필드 구조를 이후 실제 DB 테이블과 1:1로 맞춰 두어 mock -> fetch 전환 시
// 이 타입들을 그대로 재사용할 수 있게 한다.

export type Tier = "ROOKIE" | "FRONTIER" | "COSMOS";

export type FanUser = {
  id: string;
  nickname: string;
  pointBalance: number;
  lifetimeEarnedPoints: number;
  referralCode: string;
  referredBy?: string;
  attendanceCount: number;
  surveyCount: number;
  suggestionCount: number;
  cheerCount: number;
};

export type PointTransactionType =
  | "checkin"
  | "cheer"
  | "cheer_message"
  | "survey"
  | "suggestion"
  | "attendance"
  | "referral"
  | "redeem";

export type PointTransaction = {
  id: string;
  type: PointTransactionType;
  amount: number; // 양수: 적립, 음수: 사용
  description: string;
  createdAt: string;
};

export type HomeAway = "HOME" | "AWAY";

export type Match = {
  id: string;
  competition: string;
  opponent: string;
  homeAway: HomeAway;
  venue: string;
  date: string; // ISO date
  time: string;
  status: "upcoming" | "live" | "finished";
  isToday: boolean;
};

export type SurveyContext = "HOME" | "AWAY" | "NON_MATCHDAY";

export type SurveyOption = {
  id: string;
  label: string;
  votes: number;
};

export type SurveyQuestion = {
  id: string;
  text: string;
  options: SurveyOption[];
};

export type Survey = {
  id: string;
  title: string;
  context: SurveyContext;
  status: "active" | "closed";
  pointReward: number;
  createdAt: string;
  questions: SurveyQuestion[];
};

export type CheerMessage = {
  id: string;
  author: string;
  authorTier: Tier;
  content: string;
  createdAt: string;
};

export type SuggestionCategory =
  | "경기장 운영"
  | "팬서비스"
  | "응원문화"
  | "MD"
  | "콘텐츠"
  | "기타";

export type SuggestionStatus = "검토중" | "반영예정" | "반영완료" | "반영어려움";

export type ClubResponse = {
  comment: string;
  date: string;
};

export type FanSuggestion = {
  id: string;
  category: SuggestionCategory;
  title: string;
  content: string;
  author: string;
  authorTier: Tier;
  likes: number;
  clubStatus: SuggestionStatus;
  clubResponse?: ClubResponse;
  createdAt: string;
};

export type AttendanceVerification = {
  id: string;
  matchId: string;
  method: "ticket_number" | "mobile_ticket";
  verifiedAt: string;
};

export type RewardCategory = "MATCHDAY" | "FAMILY" | "EXPERIENCE" | "GOODS";

export type RewardItem = {
  id: string;
  category: RewardCategory;
  title: string;
  description: string;
  pointCost: number;
  stock: number; // -1 = 무제한
  isRaffle: boolean; // true면 "응모권" 구조(즉시 구매 아님)
};

export type RewardRedemption = {
  id: string;
  rewardId: string;
  rewardTitle: string;
  pointCost: number;
  redeemedAt: string;
};

export type PopupCampaign = {
  id: string;
  enabled: boolean;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export type SponsorCategory = "MAIN" | "KIT" | "MEDICAL" | "OFFICIAL";

export type Sponsor = {
  id: string;
  category: SponsorCategory;
  name: string;
};

export type ContentPlatform = "YouTube";

export type ContentItem = {
  id: string;
  platform: ContentPlatform;
  title: string;
  thumbnail: string;
  url: string;
};

export type OfficialChannel = {
  id: string;
  label: string;
  url: string;
};
