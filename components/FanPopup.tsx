"use client";

import Link from "next/link";
import { useAppState } from "@/lib/store";

export default function FanPopup() {
  const { popupCampaign, popupDismissedToday, dismissPopup } = useAppState();

  if (!popupCampaign.enabled || popupDismissedToday) return null;

  return (
    <div className="popupOverlay" role="dialog" aria-modal="true">
      <div className="popupCard">
        <button className="popupClose" onClick={dismissPopup} aria-label="닫기">
          ×
        </button>
        <strong className="popupTitle">{popupCampaign.title}</strong>
        <p className="popupDesc">{popupCampaign.description}</p>
        <div className="popupActions">
          <Link href={popupCampaign.ctaHref} className="primaryBtn" onClick={dismissPopup}>
            {popupCampaign.ctaLabel}
          </Link>
          <button className="popupDismiss" onClick={dismissPopup}>
            다음에 볼게요
          </button>
        </div>
      </div>
    </div>
  );
}
