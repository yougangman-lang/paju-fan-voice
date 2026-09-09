"use client";

import { usePathname } from "next/navigation";
import Nav from "./Nav";
import AdminHeader from "./AdminHeader";

// 팬 화면과 관리자 화면은 분위기가 완전히 달라야 하므로
// 경로에 따라 서로 다른 헤더 + 레이아웃 wrapper를 사용한다.
export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <div className="adminTheme">
        <AdminHeader />
        <main className="adminShell">{children}</main>
      </div>
    );
  }

  return (
    <div className="fanTheme">
      <Nav />
      <main className="shell">{children}</main>
    </div>
  );
}
