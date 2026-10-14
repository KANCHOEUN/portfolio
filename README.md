# HYEEUN 포트폴리오

Next.js App Router와 React로 만든 한국어 개발자 포트폴리오입니다. 편집기 탭과 프로젝트 탐색 UI를 제공합니다.

## 실행과 검증

Node.js 24와 npm을 사용합니다. 패키지 설치 기준은 `package-lock.json`입니다.

```sh
npm ci
npm run dev
npm test
npm run typecheck
npm run lint
npm run build
npm start
```

`npm run format`으로 소스 포맷을 정리할 수 있습니다.

`npm run test:notion:integration`은 실제 공개 Notion 페이지를 조회하므로 인터넷과 로컬 포트 3107이 필요합니다. 서비스 응답 변화에 영향을 받는 통합 검증이며, 기본 단위 테스트와 분리합니다.

## 프로젝트 추가

1. `data/projects.ts`에 메타데이터와 고유 페이지 ID를 등록합니다. 기존 `intro1` 등의 ID는 공유 링크 호환성을 위해 유지합니다.
2. `components/project-content/<slug>/`에 소개·설계 콘텐츠를 작성하고 `components/project-content/index.ts`의 slug별 매핑에 등록합니다.
3. 관련 글은 프로젝트의 `relatedPosts`에 추가합니다. 콘텐츠 내부에서 글을 열 때는 `useOpenArticle()`에 글 ID를 전달합니다.
4. 이미지 추가 후 `npm run assets:metadata`로 실제 이미지 크기를 갱신합니다. 함수형 UI와 스타일만 변경한 경우에는 생성할 필요가 없습니다.

사이드바와 이력서 프로젝트 목록은 동일한 메타데이터를 사용합니다. 상태는 `ongoing`, `paused`, `completed`입니다. 프로필 소개 문구는 `data/profile.ts`에서 관리합니다.

## 미디어와 테마

데모는 H.264 MP4와 WebP 포스터를 사용합니다. 영상은 자동 재생하지 않으며 `preload="none"`으로 재생 전 다운로드를 제한합니다. 새 데모도 최대 너비 1280px·최대 15fps·CRF 28을 시작점으로 인코딩하고 글자 가독성·길이를 확인합니다. 원본과 변환 결과 비교는 `docs/media-optimization.json`에 있습니다.

로컬 정적 이미지는 Next Image로 최적화하고 확대 시에는 원본을 표시합니다. 외부 블로그 이미지는 원래 URL을 사용합니다. 테마는 `next-themes`와 `app/globals.css`의 의미별 CSS 변수로 관리합니다.

## Notion과 외부 글

`/api/notion?pageId=…`은 공개 페이지를 조회합니다. 서버의 공개 Notion 응답 정규화는 `lib/public-notion-client.ts`에서 처리합니다. 클라이언트는 페이지별 진행 중 요청을 공유하고 성공 결과를 5분간 캐시하며 오류는 캐시하지 않습니다. Notion 코드·수식·컬렉션 렌더러는 필요할 때 로드합니다.

iframe에 표시할 수 없는 외부 사이트는 원문 링크로 열 수 있습니다. Notion 공개 권한과 외부 서비스 상태에 따라 글이 불러와지지 않을 수 있습니다.

`react-notion-x`/`notion-types`는 React 19와 호환되는 7.12.1을 사용합니다. 공개 Notion 클라이언트는 기존 응답 정규화와 요청 옵션을 유지하기 위해 7.3.0을 유지합니다. Next.js 내부 PostCSS는 `overrides`로 직접 사용하는 수정 버전과 일치시킵니다.

## 브라우저 회귀 테스트

프로덕션 빌드와 서버를 실행한 뒤 별도 터미널에서 검증합니다. 설치된 macOS Chrome은 자동으로 사용하며, 다른 환경은 Chrome 채널을 설치합니다. H.264 영상 재생을 검증하므로 Chrome을 기준으로 합니다.

```sh
npm run build
npm start
# 별도 터미널
npm run test:e2e
# Chrome이 없는 환경
npx playwright install chrome
PLAYWRIGHT_CHANNEL=chrome npm run test:e2e
```

서버 주소는 `PLAYWRIGHT_BASE_URL`, 브라우저 실행 파일은 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`로 지정합니다. `npm run test:e2e:ui`는 테스트 UI를 실행합니다. 실패 시 `test-results/`에 스크린샷·trace를 저장합니다.

`.github/workflows/verify.yml`은 Node 24에서 설치·단위 테스트·타입 검사·린트·빌드·데스크톱/390px 브라우저 검증을 수행합니다. 외부 콘텐츠는 HTTP 응답만 고정하며 실제 Notion 렌더러를 실행합니다. 공개 Notion 통합 검증은 별도 명령으로 유지합니다.

## 성능 측정과 배포

`npm run perf:audit -- https://about.kancho.co/ production`은 About·Mockly 소개를 데스크톱/390px 모바일에서 각각 3회 측정하고 중앙값을 `artifacts/performance/`에 저장합니다. `CHROME_PATH`로 Chrome 실행 파일을 지정하거나 `PERF_AUDIT_RUNS`로 반복 횟수를 조정할 수 있습니다. 자동 테스트·빌드와 동시에 측정하지 않습니다. 로컬 실험값과 운영 사이트 결과를 구분합니다.

운영 주소는 https://about.kancho.co/이며 기존 Vercel `portfolio` 프로젝트를 사용합니다. main 반영 후 GitHub의 Vercel 상태, 공개 페이지·원문 링크·미디어 동작을 확인합니다. [릴리스 검증 기록](docs/followup/release.md)과 [성능 보고서](docs/followup/performance.md)에 실제 변경·측정·검증 결과를 기록했습니다. `PERF_AUDIT_THROTTLING=devtools`를 설정하면 추정 대신 실제 네트워크 제한을 적용합니다. 폰트의 완료 시점에 따라 추정 그래프가 달라질 수 있으므로 동일한 방식의 결과끼리 비교합니다.

폰트는 원본과 동일한 글리프·문자 매핑·메트릭·CFF 윤곽·이름/라이선스 메타데이터를 유지하는 WOFF2를 사용합니다. 변환 결과는 `docs/followup/font-optimization.json`에 기록했습니다. 앱 설치와 CI에는 별도 폰트 변환 도구가 필요하지 않습니다.

운영 의존성 감사와 전체 개발 도구 감사를 구분합니다. 현재 Tailwind 3/ESLint 개발 경로에 남은 감사 항목과 설치 경고는 `docs/followup/dependencies.md`를 참고합니다.
