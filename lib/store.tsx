"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  currentUser,
  initialPolls,
  initialVoices,
  initialPointHistory,
} from "@/data/mock";
import type { Poll, Voice, PointHistoryEntry, VoiceCategory } from "@/data/types";

// 팬 참여 상태를 화면 간에 공유하기 위한 client 전역 스토어.
// 지금은 localStorage에 저장해 새로고침에도 유지되는 "동작하는 목업"을
// 만들지만, Supabase 연결 시에는 이 안의 setState 로직을 각각
// insert/update 호출로 바꾸고 초기값을 fetch 결과로 바꾸면 된다.

type AnsweredMap = Record<string, string>; // questionId -> optionId

type AppState = {
  points: number;
  pointHistory: PointHistoryEntry[];
  polls: Poll[];
  completedPollIds: string[];
  answers: AnsweredMap;
  voices: Voice[];
  likedVoiceIds: string[];
  answerQuestion: (pollId: string, questionId: string, optionId: string) => void;
  isPollCompleted: (pollId: string) => boolean;
  submitVoice: (input: { category: VoiceCategory; title: string; content: string }) => void;
  likeVoice: (voiceId: string) => void;
};

const STORAGE_KEY = "paju-fan-voice-state-v1";

const AppStateContext = createContext<AppState | null>(null);

function loadPersisted(): Partial<{
  points: number;
  pointHistory: PointHistoryEntry[];
  polls: Poll[];
  completedPollIds: string[];
  answers: AnsweredMap;
  voices: Voice[];
  likedVoiceIds: string[];
}> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(currentUser.points);
  const [pointHistory, setPointHistory] = useState<PointHistoryEntry[]>(initialPointHistory);
  const [polls, setPolls] = useState<Poll[]>(initialPolls);
  const [completedPollIds, setCompletedPollIds] = useState<string[]>([]);
  const [answers, setAnswers] = useState<AnsweredMap>({});
  const [voices, setVoices] = useState<Voice[]>(initialVoices);
  const [likedVoiceIds, setLikedVoiceIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadPersisted();
    if (saved) {
      if (saved.points !== undefined) setPoints(saved.points);
      if (saved.pointHistory) setPointHistory(saved.pointHistory);
      if (saved.polls) setPolls(saved.polls);
      if (saved.completedPollIds) setCompletedPollIds(saved.completedPollIds);
      if (saved.answers) setAnswers(saved.answers);
      if (saved.voices) setVoices(saved.voices);
      if (saved.likedVoiceIds) setLikedVoiceIds(saved.likedVoiceIds);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload = {
      points,
      pointHistory,
      polls,
      completedPollIds,
      answers,
      voices,
      likedVoiceIds,
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // localStorage 사용 불가 환경(프라이빗 모드 등)은 조용히 무시한다.
    }
  }, [hydrated, points, pointHistory, polls, completedPollIds, answers, voices, likedVoiceIds]);

  const addPoints = (amount: number, label: string) => {
    setPoints((p) => p + amount);
    setPointHistory((h) => [
      { id: `h-${Date.now()}`, label, amount, date: new Date().toISOString().slice(0, 10) },
      ...h,
    ]);
  };

  const answerQuestion = (pollId: string, questionId: string, optionId: string) => {
    if (answers[questionId]) return;

    setPolls((prev) =>
      prev.map((poll) =>
        poll.id !== pollId
          ? poll
          : {
              ...poll,
              questions: poll.questions.map((q) =>
                q.id !== questionId
                  ? q
                  : {
                      ...q,
                      options: q.options.map((o) =>
                        o.id === optionId ? { ...o, votes: o.votes + 1 } : o
                      ),
                    }
              ),
            }
      )
    );

    const nextAnswers = { ...answers, [questionId]: optionId };
    setAnswers(nextAnswers);

    const poll = polls.find((p) => p.id === pollId);
    if (poll) {
      const allAnswered = poll.questions.every((q) => nextAnswers[q.id]);
      if (allAnswered && !completedPollIds.includes(pollId)) {
        setCompletedPollIds((ids) => [...ids, pollId]);
        addPoints(poll.pointReward, `${poll.title} 참여`);
      }
    }
  };

  const isPollCompleted = (pollId: string) => completedPollIds.includes(pollId);

  const submitVoice: AppState["submitVoice"] = ({ category, title, content }) => {
    const voice: Voice = {
      id: `v-${Date.now()}`,
      category,
      title,
      content,
      author: currentUser.nickname,
      likes: 0,
      status: "검토중",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setVoices((v) => [voice, ...v]);
    addPoints(10, `의견 작성 · ${title}`);
  };

  const likeVoice = (voiceId: string) => {
    if (likedVoiceIds.includes(voiceId)) return;
    const target = voices.find((v) => v.id === voiceId);
    setVoices((v) => v.map((x) => (x.id === voiceId ? { ...x, likes: x.likes + 1 } : x)));
    setLikedVoiceIds((ids) => [...ids, voiceId]);
    addPoints(1, `공감 · ${target?.title ?? ""}`);
  };

  const value = useMemo<AppState>(
    () => ({
      points,
      pointHistory,
      polls,
      completedPollIds,
      answers,
      voices,
      likedVoiceIds,
      answerQuestion,
      isPollCompleted,
      submitVoice,
      likeVoice,
    }),
    [points, pointHistory, polls, completedPollIds, answers, voices, likedVoiceIds]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState는 AppStateProvider 내부에서만 사용할 수 있습니다.");
  return ctx;
}
