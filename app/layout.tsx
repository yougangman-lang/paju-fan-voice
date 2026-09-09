import "./globals.css";
import type { Metadata } from "next";
import { AppStateProvider } from "@/lib/store";
import Chrome from "@/components/Chrome";

export const metadata: Metadata = {
  title: "PAJU FAN VOICE",
  description: "파주 프런티어FC 팬 참여형 여론수렴 플랫폼",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <AppStateProvider>
          <Chrome>{children}</Chrome>
        </AppStateProvider>
      </body>
    </html>
  );
}
