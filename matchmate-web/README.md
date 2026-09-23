# MATCHMATE SEOUL

FC서울 경기를 매개로 대학생들이 새 친구를 만나고, 카페·맛집·산책을 거쳐
마지막에 함께 직관하는 **Social Matchday Experience Platform** 웹 MVP.

> Student project prototype. Not an official FC Seoul service.

## 실행

```bash
cd matchmate-web
npm install
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드
npm run start    # 빌드 결과 실행
```

Vercel 배포 시 프로젝트 **Root Directory를 `matchmate-web`** 으로 지정하세요.

## 페이지

| 경로 | 내용 |
| --- | --- |
| `/` | Hero → Today's Mood → Mood Match → HOST Pick → 6 Line Journey → Community → First Match Guide |
| `/match` | 4단계 질문(사람 · 활동 · 축구 레벨 · 분위기) → 추천 크루 3개 |
| `/discover` | Trending Experiences · Mood Match · HOST Pick · This Weekend · 6 Line Picks |
| `/host` | HOST 목록 |
| `/host/[id]` | HOST 상세 (사진 → 이름 → Headline → What we're doing → Journey → 사람들 → 경기 → CTA) |
| `/crew/[id]` | Mood Match 크루 상세 |
| `/guide` | 첫 직관 가이드 |

## 이미지

실제 사진은 아래 경로에 **파일명 그대로** 넣으면 됩니다.

```
public/images/hosts/host-seongbuk.png   # 성북부대공
public/images/hosts/host-durimi.png     # 50만 유튜버 DURIMI
public/images/hosts/host-byeon.png      # BYEON HOLLAND
public/images/community/fans-01.png
public/images/community/fans-02.png
public/images/community/fans-03.png
public/images/lifestyle/anam.png        # (선택) 6호선 Journey
public/images/lifestyle/itaewon.png
public/images/lifestyle/hapjeong.png
public/images/lifestyle/mangwon.png
public/images/lifestyle/sangam.png
```

`SmartImage` 컴포넌트가 빌드 시 파일 존재 여부를 확인해서, 파일이 있으면
`next/image`로 렌더링하고 없으면 CSS placeholder를 보여줍니다. 모든 페이지가
정적 생성이므로 **이미지를 추가한 뒤 다시 빌드(또는 dev 서버 재시작)** 하면 반영됩니다.
파일이 없어도 빌드는 깨지지 않습니다.

## 데이터

- `src/data/hosts.ts` — HOST (id, name, image, headline, description, tags, route, participants …)
- `src/data/groups.ts` — Mood Match 크루 8개 (id, title, description, footballLevel, socialStyle, activities, currentMembers, maxMembers, schools, tags, route …)
- `src/data/journeys.ts` — 6호선 정거장, 6 Line Picks, This Weekend
- `src/data/moods.ts` — 취향 태그, Today's Mood
- `src/lib/match.ts` — 태그 일치도 기반 Match % 계산 (AI 아님) + localStorage 헬퍼

선택한 취향(`matchmate:prefs`)과 참가 신청(`matchmate:joined`)은 브라우저 localStorage에만 저장됩니다.
