"use client";

import Link from "next/link";
import { useAppState } from "@/lib/store";

export default function AdminHeader() {
  const { isAdminLoggedIn, adminLogout } = useAppState();

  return (
    <header className="adminTopbar">
      <Link href="/admin" className="adminBrand">
        <div className="adminBrandMark">PF</div>
        <div>
          <strong>PAJU FAN VOICE</strong>
          <span>CLUB ADMIN CONSOLE</span>
        </div>
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {isAdminLoggedIn && (
          <button className="backToFan" onClick={adminLogout} style={{ background: "none" }}>
            로그아웃
          </button>
        )}
        <Link href="/" className="backToFan">
          팬 화면으로 →
        </Link>
      </div>
    </header>
  );
}
