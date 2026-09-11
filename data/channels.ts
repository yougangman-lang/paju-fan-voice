import type { OfficialChannel } from "./types";

// 실제 채널 URL이 준비되기 전까지는 자리표시자 값을 쓴다.
// 실제 URL이 확정되면 이 배열만 교체하면 된다.
export const officialChannels: OfficialChannel[] = [
  { id: "ch-instagram", label: "Instagram", url: "#" },
  { id: "ch-facebook", label: "Facebook", url: "#" },
  { id: "ch-youtube", label: "YouTube", url: "#" },
  { id: "ch-tiktok", label: "TikTok", url: "#" },
  { id: "ch-shop", label: "Online Shop", url: "#" },
  { id: "ch-kakao", label: "Kakao Channel", url: "#" },
];
