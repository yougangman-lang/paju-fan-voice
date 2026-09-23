import type { Metadata } from "next";
import { Suspense } from "react";
import MatchFlow from "./MatchFlow";

export const metadata: Metadata = { title: "FIND MY CREW — MATCHMATE SEOUL" };

export default function MatchPage() {
  return (
    <Suspense>
      <MatchFlow />
    </Suspense>
  );
}
