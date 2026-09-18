"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppState } from "@/lib/store";
import TierIcon from "./TierIcon";

const links = [
  { href: "/", label: "홈" },
  { href: "/fanzone", label: "응원존" },
  { href: "/suggestions", label: "팬 제안" },
  { href: "/point-shop", label: "P:POINT SHOP" },
  { href: "/mypage", label: "마이페이지" },
];

export default function Nav() {
  const pathname = usePathname();
  const { isLoggedIn, pointBalance, tier } = useAppState();

  return (
    <header className="topbar">
      <Link href="/" className="brand">
        <Image
          src="/branding/paju-fan-voice-logo.png"
          alt="PAJU FAN VOICE"
          width={183}
          height={89}
          priority
          className="brandLogo"
        />
        <span className="brandSub">파주 프런티어FC 팬 참여 플랫폼</span>
      </Link>
      <nav>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={pathname === l.href ? "navActive" : ""}>
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="navRight">
        {isLoggedIn ? (
          <Link href="/mypage" className="ypBadge">
            <TierIcon tier={tier} size={14} />
            <b>{pointBalance.toLocaleString()} P:POINT</b>
          </Link>
        ) : (
          <Link href="/login" className="loginLink">
            로그인
          </Link>
        )}
        <Link href="/admin" className="adminLink">
          관리자
        </Link>
      </div>
    </header>
  );
}
