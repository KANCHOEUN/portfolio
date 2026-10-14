# 릴리스 검증 — 2026-10-15

코드 커밋은 `caf0d54acb005b041969fb7aa744e92630124fcd`이며 기존 `KANCHOEUN/portfolio` main에 정상 반영했다. 기존 Vercel `portfolio` 프로젝트와 운영 주소 [about.kancho.co](https://about.kancho.co/)를 유지했다. 배포는 [Vercel 릴리스](https://vercel.com/kanchoeuns-projects/portfolio/Ev7sK4yaT2sgkZfL4rQy6As5p83q)의 성공 상태로 확인했다.

[GitHub Actions 검증](https://github.com/KANCHOEUN/portfolio/actions/runs/38625713932)도 성공했다. Node 24에서 npm 설치·단위 테스트·타입 검사·린트·프로덕션 빌드와 Linux Chrome의 브라우저 회귀 검증을 실행했다. 로컬 결과와 독립 리뷰는 [통합 검증 기록](verification.md), 측정값은 [성능 보고서](performance.md)에 있다.

## 공개 사이트 검증

외부 응답을 고정하지 않고 로컬 Chrome으로 실제 운영 사이트를 확인했다. 데스크톱 1440×900과 모바일 390×844 각각 다음 검증을 통과했다.

- `/about/`·`/resume/`·기존 프로젝트 ID 주소와 한국어 문서, 이전 `language=en` 저장값에 영향받지 않는 UI.
- 이력서 프로젝트 기간, Mockly 진행 중 표시, 모바일 메뉴 이동, 활성 탭과 마지막 탭 닫기.
- 양쪽 테마에서 보이는 최적화 이미지의 정상 로딩과 실제 화면 확인.
- 이미지 확대의 닫기 버튼 포커스, Escape 닫기와 포커스 복귀.
- 재생 전 GIF/MP4 요청 없음, 사용자가 선택한 `enter-studyroom.mp4` 실제 재생.
- iframe과 원문 링크의 동일한 인코딩 URL 보존.
- 공개 Notion API의 정상 리다이렉트 이후 HTTP 200, 실제 INDEX 글과 코드 블록 **5개** 표시, 원문 링크.
- 잡히지 않은 브라우저 예외 **0개**.

생성 결과는 커밋에서 제외한 `artifacts/release/public-smoke.json` 및 `public-{desktop,mobile}-{dark,light}.png`에 저장했다. 이미지 처리의 첫 다운로드가 끝나기 전 빈 칸을 최종 화면으로 판단하지 않도록, 화면에 보이는 이미지의 `complete`와 `naturalWidth`도 확인했다.

## 남은 제약

운영 의존성 감사는 0건이다. Tailwind 3/ESLint 개발 도구 경로의 감사 항목 9건은 호환 가능한 수정이 없어 [의존성 보고서](dependencies.md)에 남겼다. 폰트는 모든 글리프를 보존했으므로 첫 방문 전송 비용이 있다. 글자별 서브셋 또는 가변 폰트는 별도 최적화 후보이며 현재 전송량을 성능 보고서에 공개한다.

공개 Notion의 권한·응답 변경이나 iframe 원문 사이트의 임베딩 차단은 외부 서비스 제약이다. 이때 앱은 오류·재시도와 항상 사용할 수 있는 원문 링크를 제공한다. 공개 원문의 계속된 가용성까지 보장한 검증은 아니다.

원격 URL에 남아 있던 만료된 인증은 HTTP 401이었으며, 실제 push는 기존 자격증명 도우미로 성공했다. 원격은 같은 저장소의 토큰 없는 URL로 정리했다. 자격증명이나 생성된 브라우저/성능 원본은 커밋하지 않았다. Mockly 서버는 변경·커밋·배포하지 않았다.
