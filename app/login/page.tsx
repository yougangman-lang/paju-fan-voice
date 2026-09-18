"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppState } from "@/lib/store";

const providers = [
  { key: "kakao", label: "카카오로 시작하기" },
  { key: "naver", label: "네이버로 시작하기" },
  { key: "google", label: "Google로 시작하기" },
  { key: "email", label: "이메일로 가입하기" },
];

export default function LoginPage() {
  const router = useRouter();
  const { login, applyReferralCode } = useAppState();
  const [step, setStep] = useState<"choose" | "referral">("choose");
  const [code, setCode] = useState("");
  const [codeResult, setCodeResult] = useState<string | null>(null);

  const handleChoose = () => {
    // 실제 OAuth/이메일 가입 API는 연동하지 않은 데모 로그인입니다.
    login();
    setStep("referral");
  };

  const handleApplyCode = () => {
    if (!code.trim()) return;
    const result = applyReferralCode(code);
    setCodeResult(
      result === "success"
        ? "추천인 코드가 적용되어 +50 P:POINT가 지급되었습니다."
        : result === "already_applied"
        ? "이미 추천인 코드를 사용했어요."
        : "유효하지 않은 코드예요."
    );
    if (result === "success") setTimeout(() => router.push("/"), 1200);
  };

  return (
    <div className="authCard">
      <Link
        href="/"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 22 }}
      >
        <Image
          src="/branding/paju-fan-voice-logo.png"
          alt="PAJU FAN VOICE"
          width={264}
          height={128}
          priority
          className="loginLogo"
        />
      </Link>

      {step === "choose" ? (
        <>
          <p className="muted" style={{ textAlign: "center", marginBottom: 18 }}>
            간편하게 시작하고 팬 활동을 P:POINT로 쌓아보세요.
          </p>
          <div className="stack" style={{ gap: 10 }}>
            {providers.map((p) => (
              <button key={p.key} className="oauthBtn" onClick={handleChoose}>
                {p.label}
              </button>
            ))}
          </div>
          <p className="simNotice" style={{ textAlign: "center", marginTop: 16 }}>
            현재 프로토타입에서는 실제 소셜 로그인 없이 데모 계정으로 연결됩니다.
          </p>
        </>
      ) : (
        <>
          <p style={{ textAlign: "center", fontWeight: 700, marginBottom: 6 }}>
            추천인 코드가 있으신가요?
          </p>
          <p className="muted" style={{ textAlign: "center", marginBottom: 16 }}>
            등록하면 나와 추천인 모두에게 +50 P:POINT가 지급돼요.
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="추천인 코드 입력"
              style={{ flex: 1, padding: "11px 12px", border: "1px solid var(--line)", borderRadius: 8 }}
            />
            <button className="primaryBtn" style={{ border: "none" }} onClick={handleApplyCode}>
              등록
            </button>
          </div>
          {codeResult && <p className="muted" style={{ marginTop: 10 }}>{codeResult}</p>}
          <button
            className="quickLink"
            style={{ display: "block", margin: "18px auto 0" }}
            onClick={() => router.push("/")}
          >
            건너뛰고 시작하기 →
          </button>
        </>
      )}
    </div>
  );
}
