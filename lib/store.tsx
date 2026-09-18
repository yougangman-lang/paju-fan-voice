"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { currentUser, initialPointHistory, VALID_REFERRAL_CODE } from "@/data/users";
import { surveys as initialSurveys } from "@/data/surveys";
import { initialSuggestions } from "@/data/suggestions";
import { initialCheerMessages } from "@/data/cheers";
import { rewardItems } from "@/data/rewards";
import { initialPopupCampaign } from "@/data/popup";
import { calcTier } from "@/data/tiers";
import { applyLike, SUGGESTION_STAKE } from "@/lib/suggestionRewards";
import type {
  Survey,
  FanSuggestion,
  SuggestionCategory,
  SuggestionStatus,
  CheerMessage,
  PlayerCheerMessage,
  PointTransaction,
  PointTransactionType,
  RewardRedemption,
  PopupCampaign,
  Tier,
} from "@/data/types";

// 팬 참여 상태를 화면 간에 공유하는 client 전역 스토어.
// localStorage에 저장해 새로고침에도 유지되는 "동작하는 목업"이며,
// 실제 백엔드 연결 시 각 액션의 setState 로직을 API 호출로 바꾸면 된다.

function today() {
  return new Date().toISOString().slice(0, 10);
}

type AppState = {
  // 인증(데모)
  isLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  adminLogin: () => boolean;
  adminLogout: () => void;

  // 유저 / 등급
  nickname: string;
  pointBalance: number;
  lifetimeEarnedPoints: number;
  tier: Tier;
  referralCode: string;
  referralApplied: boolean;
  attendanceCount: number;
  surveyCount: number;
  suggestionCount: number;
  cheerCount: number;
  applyReferralCode: (code: string) => "success" | "invalid" | "already_applied";

  // 프로필 커스터마이징 (P:POINT SHOP DIGITAL 카테고리로 획득)
  profileTitle: string | null;
  profileFrame: string | null;
  cardBackground: string | null;

  // 포인트 내역
  pointHistory: PointTransaction[];

  // 출석 / 응원
  hasCheckedInToday: boolean;
  hasCheeredToday: boolean;
  hasSentCheerMessageToday: boolean;
  checkIn: () => boolean;
  cheer: () => boolean;
  cheerMessages: CheerMessage[];
  postCheerMessage: (content: string) => void;
  playerCheerMessages: PlayerCheerMessage[];
  postPlayerCheerMessage: (playerId: string, playerName: string, content: string) => void;

  // 설문
  surveys: Survey[];
  completedSurveyIds: string[];
  isSurveyCompleted: (surveyId: string) => boolean;
  submitSurveyResponse: (surveyId: string, answers: Record<string, string>) => void;

  // 직관 인증
  verifiedMatchIds: string[];
  isMatchVerified: (matchId: string) => boolean;
  verifyAttendance: (matchId: string) => void;

  // 팬 제안
  suggestions: FanSuggestion[];
  submitSuggestion: (input: { category: SuggestionCategory; title: string; content: string }) => "success" | "insufficient";
  likeSuggestion: (id: string) => void;
  // 관리자 전용: 상태 변경 + 구단 답변 등록(둘 다 선택적으로 함께 처리 가능)
  updateSuggestionStatus: (id: string, status: SuggestionStatus, response?: string) => void;

  // P:POINT SHOP
  redemptions: RewardRedemption[];
  redeemReward: (rewardId: string) => "success" | "insufficient" | "out_of_stock";
  redeemOnlineReward: (rewardId: string, value: string) => "success" | "insufficient" | "out_of_stock";

  // 팬 참여 팝업
  popupCampaign: PopupCampaign;
  popupDismissedToday: boolean;
  dismissPopup: () => void;
  updatePopupCampaign: (patch: Partial<PopupCampaign>) => void;
};

const STORAGE_KEY = "paju-fan-voice-state-v2";

const AppStateContext = createContext<AppState | null>(null);

type Persisted = {
  isLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  pointBalance: number;
  lifetimeEarnedPoints: number;
  referralApplied: boolean;
  attendanceCount: number;
  surveyCount: number;
  suggestionCount: number;
  cheerCount: number;
  pointHistory: PointTransaction[];
  lastCheckInDate: string | null;
  lastCheerDate: string | null;
  lastCheerMessageDate: string | null;
  cheerMessages: CheerMessage[];
  playerCheerMessages: PlayerCheerMessage[];
  surveys: Survey[];
  completedSurveyIds: string[];
  verifiedMatchIds: string[];
  suggestions: FanSuggestion[];
  redemptions: RewardRedemption[];
  popupCampaign: PopupCampaign;
  popupLastDismissedDate: string | null;
  nicknameOverride: string | null;
  profileTitle: string | null;
  profileFrame: string | null;
  cardBackground: string | null;
};

function loadPersisted(): Partial<Persisted> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// 설문 문항/선택지 "정의"는 언제나 최신 코드(data/surveys.ts)를 기준으로 삼는다.
// localStorage에는 과거에 저장된 설문 구조가 그대로 남아있을 수 있어, 문항 텍스트나
// 선택지 목록이 바뀌어도 사용자 브라우저에는 예전 버전이 영구히 고정되는 문제가
// 있었다. votes(응답 집계)만 question/option id를 기준으로 이어받고, 문항 텍스트·
// 선택지 구성·개수는 항상 코드 쪽 정의를 사용한다.
function mergeSurveys(base: Survey[], saved?: Survey[]): Survey[] {
  if (!saved) return base;
  const savedSurveyById = new Map(saved.map((s) => [s.id, s]));
  return base.map((survey) => {
    const savedSurvey = savedSurveyById.get(survey.id);
    if (!savedSurvey) return survey;
    const savedVotesByKey = new Map<string, number>();
    savedSurvey.questions.forEach((q) => {
      q.options.forEach((o) => savedVotesByKey.set(`${q.id}:${o.id}`, o.votes));
    });
    return {
      ...survey,
      questions: survey.questions.map((q) => ({
        ...q,
        options: q.options.map((o) => {
          const savedVotes = savedVotesByKey.get(`${q.id}:${o.id}`);
          return savedVotes !== undefined ? { ...o, votes: savedVotes } : o;
        }),
      })),
    };
  });
}

// 팬 제안 mock 목록도 surveys와 같은 이유로 병합이 필요하다: data/suggestions.ts에
// 새로 추가한 항목(예: 발표용 DEMO 제안)이, 예전 버전을 저장해 둔 사용자의
// localStorage에는 없어 화면에 영원히 나타나지 않는 문제를 막는다. 이미 알고
// 있는 id는 저장된 값(공감수·상태·구단 답변 등 실제로 바뀔 수 있는 값)을 그대로
// 쓰고, 코드에만 있는 새 항목만 추가하며, 사용자가 직접 작성해 저장된(코드에는
// 없는) 제안은 그대로 유지한다.
function mergeSuggestions(base: FanSuggestion[], saved?: FanSuggestion[]): FanSuggestion[] {
  if (!saved) return base;
  const savedById = new Map(saved.map((s) => [s.id, s]));
  const baseIds = new Set(base.map((s) => s.id));
  const merged = base.map((s) => savedById.get(s.id) ?? s);
  const userSubmitted = saved.filter((s) => !baseIds.has(s.id));
  return [...userSubmitted, ...merged];
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const [pointBalance, setPointBalance] = useState(currentUser.pointBalance);
  const [lifetimeEarnedPoints, setLifetimeEarnedPoints] = useState(currentUser.lifetimeEarnedPoints);
  const [referralApplied, setReferralApplied] = useState(false);
  const [attendanceCount, setAttendanceCount] = useState(currentUser.attendanceCount);
  const [surveyCount, setSurveyCount] = useState(currentUser.surveyCount);
  const [suggestionCount, setSuggestionCount] = useState(currentUser.suggestionCount);
  const [cheerCount, setCheerCount] = useState(currentUser.cheerCount);

  const [pointHistory, setPointHistory] = useState<PointTransaction[]>(initialPointHistory);

  const [lastCheckInDate, setLastCheckInDate] = useState<string | null>(null);
  const [lastCheerDate, setLastCheerDate] = useState<string | null>(null);
  const [lastCheerMessageDate, setLastCheerMessageDate] = useState<string | null>(null);
  const [cheerMessages, setCheerMessages] = useState<CheerMessage[]>(initialCheerMessages);
  const [playerCheerMessages, setPlayerCheerMessages] = useState<PlayerCheerMessage[]>([]);

  const [nicknameOverride, setNicknameOverride] = useState<string | null>(null);
  const [profileTitle, setProfileTitle] = useState<string | null>(null);
  const [profileFrame, setProfileFrame] = useState<string | null>(null);
  const [cardBackground, setCardBackground] = useState<string | null>(null);

  const [surveys, setSurveys] = useState<Survey[]>(initialSurveys);
  const [completedSurveyIds, setCompletedSurveyIds] = useState<string[]>([]);

  const [verifiedMatchIds, setVerifiedMatchIds] = useState<string[]>([]);

  const [suggestions, setSuggestions] = useState<FanSuggestion[]>(initialSuggestions);

  const [redemptions, setRedemptions] = useState<RewardRedemption[]>([]);

  const [popupCampaign, setPopupCampaign] = useState<PopupCampaign>(initialPopupCampaign);
  const [popupLastDismissedDate, setPopupLastDismissedDate] = useState<string | null>(null);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadPersisted();
    if (saved) {
      if (saved.isLoggedIn !== undefined) setIsLoggedIn(saved.isLoggedIn);
      if (saved.isAdminLoggedIn !== undefined) setIsAdminLoggedIn(saved.isAdminLoggedIn);
      if (saved.pointBalance !== undefined) setPointBalance(saved.pointBalance);
      if (saved.lifetimeEarnedPoints !== undefined) setLifetimeEarnedPoints(saved.lifetimeEarnedPoints);
      if (saved.referralApplied !== undefined) setReferralApplied(saved.referralApplied);
      if (saved.attendanceCount !== undefined) setAttendanceCount(saved.attendanceCount);
      if (saved.surveyCount !== undefined) setSurveyCount(saved.surveyCount);
      if (saved.suggestionCount !== undefined) setSuggestionCount(saved.suggestionCount);
      if (saved.cheerCount !== undefined) setCheerCount(saved.cheerCount);
      if (saved.pointHistory) setPointHistory(saved.pointHistory);
      if (saved.lastCheckInDate !== undefined) setLastCheckInDate(saved.lastCheckInDate);
      if (saved.lastCheerDate !== undefined) setLastCheerDate(saved.lastCheerDate);
      if (saved.lastCheerMessageDate !== undefined) setLastCheerMessageDate(saved.lastCheerMessageDate);
      if (saved.cheerMessages) setCheerMessages(saved.cheerMessages);
      if (saved.playerCheerMessages) setPlayerCheerMessages(saved.playerCheerMessages);
      setSurveys(mergeSurveys(initialSurveys, saved.surveys));
      if (saved.completedSurveyIds) setCompletedSurveyIds(saved.completedSurveyIds);
      if (saved.verifiedMatchIds) setVerifiedMatchIds(saved.verifiedMatchIds);
      setSuggestions(mergeSuggestions(initialSuggestions, saved.suggestions));
      if (saved.redemptions) setRedemptions(saved.redemptions);
      if (saved.popupCampaign) setPopupCampaign(saved.popupCampaign);
      if (saved.popupLastDismissedDate !== undefined) setPopupLastDismissedDate(saved.popupLastDismissedDate);
      if (saved.nicknameOverride !== undefined) setNicknameOverride(saved.nicknameOverride);
      if (saved.profileTitle !== undefined) setProfileTitle(saved.profileTitle);
      if (saved.profileFrame !== undefined) setProfileFrame(saved.profileFrame);
      if (saved.cardBackground !== undefined) setCardBackground(saved.cardBackground);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload: Persisted = {
      isLoggedIn,
      isAdminLoggedIn,
      pointBalance,
      lifetimeEarnedPoints,
      referralApplied,
      attendanceCount,
      surveyCount,
      suggestionCount,
      cheerCount,
      pointHistory,
      lastCheckInDate,
      lastCheerDate,
      lastCheerMessageDate,
      cheerMessages,
      playerCheerMessages,
      surveys,
      completedSurveyIds,
      verifiedMatchIds,
      suggestions,
      redemptions,
      popupCampaign,
      popupLastDismissedDate,
      nicknameOverride,
      profileTitle,
      profileFrame,
      cardBackground,
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // localStorage 사용 불가 환경(프라이빗 모드 등)은 조용히 무시한다.
    }
  }, [
    hydrated,
    isLoggedIn,
    isAdminLoggedIn,
    pointBalance,
    lifetimeEarnedPoints,
    referralApplied,
    attendanceCount,
    surveyCount,
    suggestionCount,
    cheerCount,
    pointHistory,
    lastCheckInDate,
    lastCheerDate,
    lastCheerMessageDate,
    cheerMessages,
    playerCheerMessages,
    surveys,
    completedSurveyIds,
    verifiedMatchIds,
    suggestions,
    redemptions,
    popupCampaign,
    popupLastDismissedDate,
    nicknameOverride,
    profileTitle,
    profileFrame,
    cardBackground,
  ]);

  const nickname = nicknameOverride ?? currentUser.nickname;

  const addPoints = (
    amount: number,
    type: PointTransactionType,
    description: string,
    affectsLifetime: boolean = amount > 0
  ) => {
    setPointBalance((p) => p + amount);
    if (affectsLifetime) setLifetimeEarnedPoints((p) => p + amount);
    setPointHistory((h) => [
      { id: `h-${Date.now()}`, type, amount, description, createdAt: today() },
      ...h,
    ]);
  };

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  const adminLogin = () => {
    setIsAdminLoggedIn(true);
    return true;
  };
  const adminLogout = () => setIsAdminLoggedIn(false);

  const applyReferralCode: AppState["applyReferralCode"] = (code) => {
    if (referralApplied) return "already_applied";
    if (code.trim().toUpperCase() !== VALID_REFERRAL_CODE) return "invalid";
    setReferralApplied(true);
    addPoints(50, "referral", "추천인 코드 등록 보너스");
    return "success";
  };

  const checkIn = () => {
    if (lastCheckInDate === today()) return false;
    setLastCheckInDate(today());
    addPoints(3, "checkin", "출석 체크");
    return true;
  };

  const cheer = () => {
    if (lastCheerDate === today()) return false;
    setLastCheerDate(today());
    setCheerCount((c) => c + 1);
    addPoints(5, "cheer", "파주를 응원해요");
    return true;
  };

  const postCheerMessage = (content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;
    const message: CheerMessage = {
      id: `cm-${Date.now()}`,
      author: nickname,
      authorTier: calcTier(lifetimeEarnedPoints),
      content: trimmed,
      createdAt: today(),
    };
    setCheerMessages((m) => [message, ...m]);
    if (lastCheerMessageDate !== today()) {
      setLastCheerMessageDate(today());
      addPoints(10, "cheer_message", "응원 메시지 작성");
    }
  };

  // 구단 응원과 선수 응원은 같은 "FAN ZONE 응원 메시지" 하루 1회 +10P 한도를 공유한다.
  // 이미 오늘 보상을 받았다면 메시지는 계속 남길 수 있지만 추가 포인트는 지급하지 않는다.
  const postPlayerCheerMessage = (playerId: string, playerName: string, content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;
    const message: PlayerCheerMessage = {
      id: `pcm-${Date.now()}`,
      playerId,
      playerName,
      author: nickname,
      authorTier: calcTier(lifetimeEarnedPoints),
      content: trimmed,
      createdAt: today(),
    };
    setPlayerCheerMessages((m) => [message, ...m]);
    if (lastCheerMessageDate !== today()) {
      setLastCheerMessageDate(today());
      addPoints(10, "cheer_message", `응원 메시지 작성 · ${playerName} 선수`);
    }
  };

  const isSurveyCompleted = (surveyId: string) => completedSurveyIds.includes(surveyId);

  const submitSurveyResponse: AppState["submitSurveyResponse"] = (surveyId, answers) => {
    if (isSurveyCompleted(surveyId)) return;
    setSurveys((prev) =>
      prev.map((s) =>
        s.id !== surveyId
          ? s
          : {
              ...s,
              questions: s.questions.map((q) => {
                const pickedOptionId = answers[q.id];
                if (!pickedOptionId) return q;
                return {
                  ...q,
                  options: q.options.map((o) =>
                    o.id === pickedOptionId ? { ...o, votes: o.votes + 1 } : o
                  ),
                };
              }),
            }
      )
    );
    setCompletedSurveyIds((ids) => [...ids, surveyId]);
    setSurveyCount((c) => c + 1);
    const survey = surveys.find((s) => s.id === surveyId);
    addPoints(survey?.pointReward ?? 20, "survey", `${survey?.title ?? "설문"} 참여`);
  };

  const isMatchVerified = (matchId: string) => verifiedMatchIds.includes(matchId);

  const verifyAttendance = (matchId: string) => {
    if (isMatchVerified(matchId)) return;
    setVerifiedMatchIds((ids) => [...ids, matchId]);
    setAttendanceCount((c) => c + 1);
    addPoints(50, "attendance", "직관 인증");
  };

  const submitSuggestion: AppState["submitSuggestion"] = ({ category, title, content }) => {
    if (pointBalance < SUGGESTION_STAKE) return "insufficient";
    const suggestion: FanSuggestion = {
      id: `sg-${Date.now()}`,
      category,
      title,
      content,
      author: nickname,
      authorId: currentUser.id,
      authorTier: calcTier(lifetimeEarnedPoints),
      likes: 0,
      likedByUserIds: [],
      stakeRefunded: false,
      rewardedLikeCount: 0,
      likeRewardEarned: 0,
      clubStatus: "접수",
      createdAt: today(),
    };
    setSuggestions((s) => [suggestion, ...s]);
    setSuggestionCount((c) => c + 1);
    addPoints(-SUGGESTION_STAKE, "suggestion_stake", `팬 제안 등록 · ${title}`);
    return "success";
  };

  const likeSuggestion = (id: string) => {
    const target = suggestions.find((s) => s.id === id);
    if (!target) return;
    if (target.likedByUserIds.includes(currentUser.id)) return;
    if (target.authorId === currentUser.id) return;

    const result = applyLike(target, currentUser.id);
    setSuggestions((prev) =>
      prev.map((s) =>
        s.id !== id
          ? s
          : {
              ...s,
              likes: result.likes,
              likedByUserIds: result.likedByUserIds,
              stakeRefunded: result.stakeRefunded,
              rewardedLikeCount: result.rewardedLikeCount,
              likeRewardEarned: result.likeRewardEarned,
            }
      )
    );

    // 실제 서비스에서는 이 보상이 target.authorId 계정에 적립된다.
    // 이 데모는 단일 로그인 계정만 시뮬레이션하므로, 지금 로그인한
    // 사용자가 곧 작성자인 경우에만 내 지갑(P:POINT)에 반영한다.
    if (target.authorId === currentUser.id) {
      if (result.stakeRefundAmount > 0) {
        addPoints(
          result.stakeRefundAmount,
          "suggestion_stake_refund",
          `팬 제안 공감 5개 달성 · 등록 포인트 환급 · ${target.title}`,
          false
        );
      }
      if (result.bonusAmount > 0) {
        addPoints(result.bonusAmount, "suggestion_like_reward", `팬 제안 공감 보상 · ${target.title}`);
      }
    }
  };

  // 관리자 전용 액션. 상태만 바꿀 수도, 구단 답변과 함께 바꿀 수도 있다.
  // 답변을 등록하면 항상 오늘 날짜로 기록한다(실서비스라면 서버 타임스탬프).
  const updateSuggestionStatus: AppState["updateSuggestionStatus"] = (id, status, response) => {
    setSuggestions((prev) =>
      prev.map((s) =>
        s.id !== id
          ? s
          : {
              ...s,
              clubStatus: status,
              clubResponse: response?.trim() ? { comment: response.trim(), date: today() } : s.clubResponse,
            }
      )
    );
  };

  const redeemReward: AppState["redeemReward"] = (rewardId) => {
    const item = rewardItems.find((r) => r.id === rewardId);
    if (!item) return "insufficient";
    if (item.stock === 0) return "out_of_stock";
    if (pointBalance < item.pointCost) return "insufficient";
    setPointBalance((p) => p - item.pointCost);
    setPointHistory((h) => [
      {
        id: `h-${Date.now()}`,
        type: "redeem",
        amount: -item.pointCost,
        description: `상품 교환 · ${item.title}`,
        createdAt: today(),
      },
      ...h,
    ]);
    setRedemptions((r) => [
      { id: `rd-${Date.now()}`, rewardId: item.id, rewardTitle: item.title, pointCost: item.pointCost, redeemedAt: today() },
      ...r,
    ]);
    return "success";
  };

  // DIGITAL 카테고리 전용: 포인트 차감 + 교환 내역 기록에 더해 실제 cosmetic 효과
  // (닉네임/칭호/프레임/배경)를 적용한다. pointBalance만 감소하며
  // lifetimeEarnedPoints(등급 산정 기준)는 변하지 않는다.
  const redeemOnlineReward: AppState["redeemOnlineReward"] = (rewardId, value) => {
    const item = rewardItems.find((r) => r.id === rewardId);
    if (!item || item.category !== "DIGITAL" || !item.onlineAction) return "insufficient";
    if (item.stock === 0) return "out_of_stock";
    if (pointBalance < item.pointCost) return "insufficient";

    addPoints(-item.pointCost, "redeem", `${item.title} · ${value}`, false);
    setRedemptions((r) => [
      { id: `rd-${Date.now()}`, rewardId: item.id, rewardTitle: item.title, pointCost: item.pointCost, redeemedAt: today() },
      ...r,
    ]);

    if (item.onlineAction === "nickname") setNicknameOverride(value);
    if (item.onlineAction === "title") setProfileTitle(value);
    if (item.onlineAction === "frame") setProfileFrame(value);
    if (item.onlineAction === "background") setCardBackground(value);

    return "success";
  };

  const dismissPopup = () => setPopupLastDismissedDate(today());
  const updatePopupCampaign = (patch: Partial<PopupCampaign>) =>
    setPopupCampaign((p) => ({ ...p, ...patch }));

  const value = useMemo<AppState>(
    () => ({
      isLoggedIn,
      isAdminLoggedIn,
      login,
      logout,
      adminLogin,
      adminLogout,

      nickname,
      pointBalance,
      lifetimeEarnedPoints,
      tier: calcTier(lifetimeEarnedPoints),
      referralCode: currentUser.referralCode,
      referralApplied,
      attendanceCount,
      surveyCount,
      suggestionCount,
      cheerCount,
      applyReferralCode,

      profileTitle,
      profileFrame,
      cardBackground,

      pointHistory,

      hasCheckedInToday: lastCheckInDate === today(),
      hasCheeredToday: lastCheerDate === today(),
      hasSentCheerMessageToday: lastCheerMessageDate === today(),
      checkIn,
      cheer,
      cheerMessages,
      postCheerMessage,
      playerCheerMessages,
      postPlayerCheerMessage,

      surveys,
      completedSurveyIds,
      isSurveyCompleted,
      submitSurveyResponse,

      verifiedMatchIds,
      isMatchVerified,
      verifyAttendance,

      suggestions,
      submitSuggestion,
      likeSuggestion,
      updateSuggestionStatus,

      redemptions,
      redeemReward,
      redeemOnlineReward,

      popupCampaign,
      popupDismissedToday: popupLastDismissedDate === today(),
      dismissPopup,
      updatePopupCampaign,
    }),
    [
      isLoggedIn,
      isAdminLoggedIn,
      nickname,
      pointBalance,
      lifetimeEarnedPoints,
      referralApplied,
      attendanceCount,
      surveyCount,
      suggestionCount,
      cheerCount,
      profileTitle,
      profileFrame,
      cardBackground,
      pointHistory,
      lastCheckInDate,
      lastCheerDate,
      lastCheerMessageDate,
      cheerMessages,
      playerCheerMessages,
      surveys,
      completedSurveyIds,
      verifiedMatchIds,
      suggestions,
      redemptions,
      popupCampaign,
      popupLastDismissedDate,
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState는 AppStateProvider 내부에서만 사용할 수 있습니다.");
  return ctx;
}
