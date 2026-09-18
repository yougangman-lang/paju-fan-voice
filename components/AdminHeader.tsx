"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppState } from "@/lib/store";

export default function AdminHeader() {
  const { isAdminLoggedIn, adminLogout } = useAppState();

  return (
    <header className="adminTopbar">
      <Link href="/admin" className="adminBrand">
        <div className="adminBrandLogoWrap">
          <Image
            src="/branding/paju-fan-voice-logo.png"
            alt="PAJU FAN VOICE"
            width={183}
            height={89}
            className="adminBrandLogo"
          />
        </div>
        <span className="adminBrandSub">CLUB ADMIN CONSOLE</span>
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
