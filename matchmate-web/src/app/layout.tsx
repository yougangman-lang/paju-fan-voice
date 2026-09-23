import type { Metadata, Viewport } from "next";
import { Anton, Noto_Sans_KR } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const notoKr = Noto_Sans_KR({
  variable: "--font-noto-kr",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "MATCHMATE SEOUL — 이번 주말, 같이 상암 갈래?",
  description:
    "FC서울 경기를 매개로 새 친구를 만나고, 카페와 맛집을 거쳐 함께 직관까지. 대학생을 위한 Social Matchday Experience. (Student project prototype)",
};

export const viewport: Viewport = {
  themeColor: "#F5F2EA",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${anton.variable} ${notoKr.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
