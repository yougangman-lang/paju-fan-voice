# PAJU FAN VOICE

파주 프런티어FC 팬 참여형 여론수렴 플랫폼 MVP.
팬이 짧은 설문에 참여하고, 의견을 제안하고, 서로 공감하면 구단이 이를
구조화된 데이터로 확인하고 실제 피드백을 남기는 흐름을 보여주는
Next.js 프로토타입입니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000

## 핵심 흐름

팬 참여 → 짧은 설문 → 의견 제안 → 공감 → HOT 의견 → 구단 확인 → 구단 피드백 → 팬이 반영 여부 확인

## 페이지

- `/` 홈 — 오늘의 팬 질문, HOT 팬 의견, 내 P:POINT, 최근 구단 피드백
- `/polls` 팬 설문 — 1~3문항 짧은 설문, 참여 시 +5 P:POINT, 참여 후 결과 비율 표시
- `/voices` 팬 의견 — 카테고리별 의견 작성(+10 P:POINT), 공감(+1 P:POINT), 공감 20+ HOT 표시, 최신순/인기순
- `/mypage` 마이페이지 — 보유 P:POINT, 참여한 설문/작성한 의견/공감 내역, 포인트 적립 내역
- `/admin` 관리자 콘솔 — KPI, TOP FAN NEEDS, 진행 중 설문, 카테고리·상태별 통계, Future Integration(FEVER × FAN VOICE) 개념도

## 데이터 구조

- `data/types.ts` — Poll / Voice / PointHistoryEntry 등 도메인 타입 (Supabase 테이블 스키마와 1:1 대응 가능하도록 설계)
- `data/mock.ts` — 초기 mock 데이터
- `lib/store.tsx` — 클라이언트 상태(React Context) + localStorage 영속화로 설문 투표/의견 작성/공감/포인트 적립을 화면 간에 공유

## 다음 단계

- Supabase 연결 (mock 배열 → 테이블 fetch/insert로 교체)
- 로그인/사용자 인증 (현재는 단일 mock 유저)
- 관리자 설문 생성 UI 실제 동작화, CSV Export 실제 다운로드
- FEVER 실제 API 연동 (현재는 개념 카드만 제공)
