"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/lib/store";

export default function AdminLoginPage() {
  const router = useRouter();
  const { adminLogin } = useAppState();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim() || !pw.trim()) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    // 실제 관리자 인증 API는 연동하지 않은 데모 로그인입니다.
    adminLogin();
    router.push("/admin");
  };

  return (
    <div className="authCard adminLoginCard">
      <strong style={{ display: "block", textAlign: "center", fontSize: 15, color: "#fff" }}>
        PAJU FAN VOICE
      </strong>
      <p style={{ textAlign: "center", color: "#8ea3cc", fontSize: 12, letterSpacing: "0.08em", marginTop: 4 }}>
        CLUB ADMIN CONSOLE
      </p>
      <form onSubmit={submit} className="stack" style={{ gap: 10, marginTop: 22 }}>
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="관리자 아이디"
          className="adminLoginInput"
        />
        <input
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          type="password"
          placeholder="비밀번호"
          className="adminLoginInput"
        />
        {error && <p style={{ color: "#ff9db4", fontSize: 13 }}>{error}</p>}
        <button className="primaryBtn" type="submit" style={{ border: "none" }}>
          로그인
        </button>
      </form>
      <p className="simNotice" style={{ textAlign: "center", marginTop: 16, color: "#8ea3cc" }}>
        데모 환경입니다. 아무 아이디/비밀번호로 로그인할 수 있습니다.
      </p>
    </div>
  );
}
