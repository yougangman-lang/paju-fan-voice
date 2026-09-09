"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppState } from "@/lib/store";

const links = [
  { href: "/", label: "홈" },
  { href: "/polls", label: "팬 설문" },
  { href: "/voices", label: "팬 의견" },
  { href: "/mypage", label: "마이페이지" },
];

export default function Nav() {
  const pathname = usePathname();
  const { points } = useAppState();

  return (
    <header className="topbar">
      <Link href="/" className="brand">
        <div className="brandMark">PF</div>
        <div>
          <strong>PAJU FAN VOICE</strong>
          <span>파주 프런티어FC 팬 참여 플랫폼</span>
        </div>
      </Link>
      <nav>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={pathname === l.href ? "navActive" : ""}>
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="navRight">
        <Link href="/mypage" className="ypBadge">
          <b>{points.toLocaleString()} P:POINT</b>
        </Link>
        <Link href="/admin" className="adminLink">
          관리자
        </Link>
      </div>
    </header>
  );
}
