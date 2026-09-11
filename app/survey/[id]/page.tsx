"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppState } from "@/lib/store";

export default function SurveyDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { isLoggedIn, surveys, isSurveyCompleted, submitSurveyResponse } = useAppState();

  const survey = surveys.find((s) => s.id === params.id);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [justCompleted, setJustCompleted] = useState(false);

  if (!survey) {
    return (
      <div className="stack">
        <div className="pageTitle">
          <h1>설문을 찾을 수 없어요</h1>
          <p>이미 종료되었거나 존재하지 않는 설문입니다.</p>
        </div>
        <Link className="primaryBtn" href="/" style={{ width: "fit-content" }}>
          홈으로
        </Link>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="stack">
        <div className="pageTitle">
          <h1>{survey.title}</h1>
          <p>로그인 후 설문에 참여하고 +{survey.pointReward} P:POINT를 받아보세요.</p>
        </div>
        <Link className="primaryBtn" href="/login" style={{ width: "fit-content" }}>
          로그인하기
        </Link>
      </div>
    );
  }

  const alreadyDone = isSurveyCompleted(survey.id);
  const allAnswered = survey.questions.every((q) => answers[q.id]);

  const handleSubmit = () => {
    if (!allAnswered) return;
    submitSurveyResponse(survey.id, answers);
    setJustCompleted(true);
    setTimeout(() => router.push("/"), 1400);
  };

  if (alreadyDone || justCompleted) {
    return (
      <div className="stack">
        <div className="panel completePanel">
          <strong className="completeTitle">설문 참여가 완료되었습니다.</strong>
          {justCompleted && <p className="completePoint">+{survey.pointReward} P:POINT</p>}
          <p className="muted">
            {justCompleted
              ? "잠시 후 홈으로 이동합니다."
              : "이미 참여한 설문이에요. 소중한 의견 감사합니다."}
          </p>
          <Link className="primaryBtn" href="/" style={{ width: "fit-content", marginTop: 10 }}>
            지금 홈으로
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="stack">
      <div className="pageTitle">
        <h1>{survey.title}</h1>
        <p>
          {survey.questions.length}문항 · 참여 완료 시 +{survey.pointReward} P:POINT가 적립돼요. 응답
          결과는 공개되지 않고 구단 운영에만 활용됩니다.
        </p>
      </div>

      <div className="panel">
        {survey.questions.map((q, i) => (
          <div className="questionBlock" key={q.id}>
            <h3 style={{ fontSize: 15.5, fontWeight: 700 }}>
              Q{i + 1}. {q.text}
            </h3>
            <div className="optionList">
              {q.options.map((o) => {
                const picked = answers[q.id] === o.id;
                return (
                  <button
                    key={o.id}
                    className={picked ? "isPicked" : ""}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <button
          className="primaryBtn"
          style={{ marginTop: 24, width: "100%", border: "none" }}
          disabled={!allAnswered}
          onClick={handleSubmit}
        >
          설문 제출하기
        </button>
      </div>
    </div>
  );
}
