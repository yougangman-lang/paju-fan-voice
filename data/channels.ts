import type { OfficialChannel } from "./types";

// id는 components/SocialIcons.tsx의 아이콘 매핑과 1:1로 대응한다.
// 아직 실제 URL이 없는 채널이 생기면 url을 "#"로 두면 되고, 그 경우
// SocialIcons가 클릭 불가한 비활성 버튼으로 렌더링한다.
export const officialChannels: OfficialChannel[] = [
  {
    id: "ch-facebook",
    label: "Facebook",
    url: "https://www.facebook.com/p/%ED%8C%8C%EC%A3%BC%ED%94%84%EB%9F%B0%ED%8B%B0%EC%96%B4fc-61585251167473/?locale=ko_KR",
  },
  { id: "ch-instagram", label: "Instagram", url: "https://www.instagram.com/pajufrontierfc/" },
  { id: "ch-youtube", label: "YouTube", url: "https://www.youtube.com/channel/UC0566Roaeo_JTwf5GFv_Q8Q" },
  { id: "ch-tiktok", label: "TikTok", url: "https://www.tiktok.com/@frontier_fc" },
  { id: "ch-kakao", label: "Kakao Channel", url: "https://pf.kakao.com/_xhKxahX" },
];

// SNS 아이콘 row와는 별도 영역(작은 링크)으로 노출되는 공식 온라인샵.
export const officialShopUrl = "https://pajufrontiershop.com/";
