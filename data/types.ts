// 데이터 모델. 지금은 mock 배열(data/mock.ts)로 채워지지만,
// 필드 구조를 Supabase 테이블 스키마와 1:1로 맞춰 두어 이후
// mock -> fetch 전환 시 이 타입들을 그대로 재사용할 수 있게 한다.

export type VoiceCategory =
  | "경기장 운영"
  | "팬서비스"
  | "응원문화"
  | "MD"
  | "콘텐츠"
  | "기타";

export type VoiceStatus = "검토중" | "반영예정" | "반영완료" | "반영어려움";

export type PollOption = {
  id: string;
  label: string;
  votes: number;
};

export type PollQuestion = {
  id: string;
  text: string;
  options: PollOption[];
};

export type Poll = {
  id: string;
  title: string;
  description: string;
  status: "active" | "closed";
  pointReward: number;
  createdAt: string;
  questions: PollQuestion[];
};

export type ClubFeedback = {
  comment: string;
  date: string;
};

export type Voice = {
  id: string;
  category: VoiceCategory;
  title: string;
  content: string;
  author: string;
  likes: number;
  status: VoiceStatus;
  clubFeedback?: ClubFeedback;
  createdAt: string;
};

export type PointHistoryEntry = {
  id: string;
  label: string;
  amount: number;
  date: string;
};

export type FanUser = {
  id: string;
  nickname: string;
  points: number;
};
