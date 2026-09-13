import type { OfficialChannel } from "./types";

// 실제 채널 URL이 준비되기 전까지는 "#"를 자리표시자로 쓴다("#"인 채널은
// 화면에서 클릭 불가 상태로 표시된다). 실제 URL이 확정되면 이 배열의 url만
// 채우면 바로 연결된다. id는 components/SocialIcons.tsx의 아이콘 매핑과
// 1:1로 대응한다.
export const officialChannels: OfficialChannel[] = [
  { id: "ch-facebook", label: "Facebook", url: "#" },
  { id: "ch-instagram", label: "Instagram", url: "#" },
  { id: "ch-youtube", label: "YouTube", url: "#" },
  { id: "ch-tiktok", label: "TikTok", url: "#" },
  { id: "ch-kakao", label: "Kakao Channel", url: "#" },
];
