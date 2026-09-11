"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Nav from "./Nav";
import AdminHeader from "./AdminHeader";
import FanPopup from "./FanPopup";
import { useAppState } from "@/lib/store";

// 팬 화면과 관리자 화면은 분위기가 완전히 달라야 하므로
// 경로에 따라 서로 다른 헤더 + 레이아웃 wrapper를 사용한다.
export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdminLoggedIn } = useAppState();

  const isAdmin = pathname?.startsWith("/admin");
  const isAdminLoginPage = pathname === "/admin/login";
  const isBarePage = pathname === "/login" || isAdminLoginPage;

  useEffect(() => {
    if (isAdmin && !isAdminLoginPage && !isAdminLoggedIn) {
      router.replace("/admin/login");
    }
  }, [isAdmin, isAdminLoginPage, isAdminLoggedIn, router]);

  if (isAdmin) {
    if (isAdminLoginPage) {
      return (
        <div className="adminTheme">
          <main className="adminShell">{children}</main>
        </div>
      );
    }
    if (!isAdminLoggedIn) {
      // redirect 처리 중 잠깐 표시되는 빈 화면
      return <div className="adminTheme" />;
    }
    return (
      <div className="adminTheme">
        <AdminHeader />
        <main className="adminShell">{children}</main>
      </div>
    );
  }

  if (isBarePage) {
    return <main className="authShell">{children}</main>;
  }

  return (
    <div className="fanTheme">
      <Nav />
      <main className="shell">{children}</main>
      <FanPopup />
    </div>
  );
}
