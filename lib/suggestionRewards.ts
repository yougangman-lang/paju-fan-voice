// 팬 제안 "스테이크 → 공감 보상" 정책의 순수 계산 로직.
// React 상태와 분리해 두어 단위 테스트로 독립 검증할 수 있게 한다.
//
// 정책:
// - 작성 시 10P를 건다(스테이크).
// - unique 공감이 처음 5개가 되는 순간 스테이크 10P를 환급한다(1회).
// - 5개 이후부터는 unique 공감 1개당 +1P, 게시글당 최대 +50P.

export const SUGGESTION_STAKE = 10;
export const STAKE_REFUND_THRESHOLD = 5;
export const MAX_LIKE_REWARD = 50;

export type LikeableSuggestion = {
  likes: number;
  likedByUserIds: string[];
  stakeRefunded: boolean;
  rewardedLikeCount: number;
};

export type ApplyLikeResult = {
  likes: number;
  likedByUserIds: string[];
  stakeRefunded: boolean;
  rewardedLikeCount: number;
  likeRewardEarned: number;
  /** 이번 공감으로 새로 발생한 스테이크 환급액(0 또는 SUGGESTION_STAKE) */
  stakeRefundAmount: number;
  /** 이번 공감으로 새로 발생한 보너스 지급액(0 또는 1) */
  bonusAmount: number;
};

// likerId가 이미 공감했거나 작성자 본인인지는 호출 측(store)에서
// likedByUserIds / authorId를 확인해 걸러낸 뒤 호출해야 한다.
export function applyLike(suggestion: LikeableSuggestion, likerId: string): ApplyLikeResult {
  const likes = suggestion.likes + 1;
  const likedByUserIds = [...suggestion.likedByUserIds, likerId];

  let stakeRefunded = suggestion.stakeRefunded;
  let stakeRefundAmount = 0;
  if (!stakeRefunded && likes >= STAKE_REFUND_THRESHOLD) {
    stakeRefunded = true;
    stakeRefundAmount = SUGGESTION_STAKE;
  }

  let rewardedLikeCount = suggestion.rewardedLikeCount;
  let bonusAmount = 0;
  if (likes > STAKE_REFUND_THRESHOLD && rewardedLikeCount < MAX_LIKE_REWARD) {
    rewardedLikeCount += 1;
    bonusAmount = 1;
  }

  return {
    likes,
    likedByUserIds,
    stakeRefunded,
    rewardedLikeCount,
    likeRewardEarned: rewardedLikeCount,
    stakeRefundAmount,
    bonusAmount,
  };
}
