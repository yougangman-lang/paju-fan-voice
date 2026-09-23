/**
 * Real community photos (public/images/community). Only cropping via
 * object-fit / object-position is applied — the photos are never altered.
 */
export const fansPhotos = {
  // 640×426 landscape — group of fans cheering, faces across the upper half
  fans01: {
    src: "/images/community/fans-01.png",
    alt: "FC서울 유니폼을 입고 함께 응원하는 팬들",
  },
  // 1280×720 landscape — two fans in front, faces on the left third
  fans02: {
    src: "/images/community/fans-02.png",
    alt: "서울월드컵경기장 응원석에서 경기를 지켜보는 팬들",
  },
  // 335×597 portrait — player in front of the stands, face in the upper third
  fans03: {
    src: "/images/community/fans-03.png",
    alt: "응원석 앞에서 팬들과 함께한 FC서울 선수",
  },
} as const;
