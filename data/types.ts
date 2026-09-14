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
  | "suggestion_stake"
  | "suggestion_stake_refund"
  | "suggestion_like_reward"
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
  opponentCrest?: string;
  homeAway: HomeAway;
  venue: string;
  date: string; // ISO date
  time: string;
  status: "upcoming" | "live" | "finished";
  isToday: boolean;
};

export type TeamMatchStats = {
  name: string;
  crest: string;
  rank: number;
  points: number;
  record: string; // 예: "7승 5무 12패"
  avgGoalsFor: number;
  avgGoalsAgainst: number;
};

export type MatchPreview = {
  home: TeamMatchStats;
  away: TeamMatchStats;
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

export type PlayerCheerMessage = CheerMessage & {
  playerId: string;
  playerName: string;
};

export type Player = {
  id: string;
  // 감독 등 등번호가 없는 코칭스태프 항목을 위해 선택 필드로 둔다.
  number?: number;
  name: string;
  position: string;
  shortInfo: string;
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
  authorId: string;
  authorTier: Tier;
  likes: number;
  likedByUserIds: string[];
  stakeRefunded: boolean;
  rewardedLikeCount: number;
  likeRewardEarned: number;
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

export type RewardCategory = "MATCHDAY" | "FAMILY" | "EXPERIENCE" | "GOODS" | "ONLINE";

// ONLINE 카테고리 상품에서만 사용. 교환 시 어떤 cosmetic 효과를 적용할지 지정한다.
export type OnlineRewardAction = "nickname" | "title" | "frame" | "background";

export type RewardItem = {
  id: string;
  category: RewardCategory;
  title: string;
  description: string;
  image?: string;
  onlineShopPrice?: number; // 실제 온라인샵 판매가(원). 있으면 상품 카드에 보조 정보로 표시.
  pointCost: number;
  stock: number; // -1 = 무제한
  isRaffle: boolean; // true면 "응모권" 구조(즉시 구매 아님)
  onlineAction?: OnlineRewardAction;
  onlineChoices?: { id: string; label: string }[]; // frame/title/background 선택형 상품의 옵션 목록
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
