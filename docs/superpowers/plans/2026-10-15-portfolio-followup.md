# Portfolio follow-up implementation plan

> **For agentic workers:** use dispatching-parallel-agents for the independent implementation tracks and verification-before-completion before integration.

**Goal:** Complete the five follow-ups approved in chat: automated browser regressions, extended Notion validation, production performance measurements, dependency warning resolution, then review/commit/deployment and public smoke tests.

**Architecture:** Shared checkout with exclusive file ownership. Browser suites share one Playwright configuration and deterministic request fixtures. Dependency installation and final build are serialized by the coordinator. Production site measurement is read-only; publication follows validated integration.

**Spec:** The user's 2026-10-15 instruction to execute prior items 1–5 with independent work delegated in parallel; existing refactor requirements in docs/refactor-progress.md remain binding.

## Global constraints

- npm only; preserve existing uncommitted Notion API/public-client/unit tests and refactor changes.
- Preserve Korean UI, editor appearance, /about, /resume, /portfolio?file=… and existing page IDs.
- Mockly server is read-only and out of scope for commit/deployment.
- Agents must not commit/push/deploy or edit another track's files.
- Only dependency track edits package.json/package-lock.json and runs npm installations.
- Only coordinator owns shared build/server lifecycle, CI/README and final release.
- Do not emit credentials from Git remotes, environment, deployment files or CLI output.

## Task 1 — browser regressions (agent)

Own playwright.config.ts, tests/e2e/editor.spec.ts, tests/e2e/navigation.spec.ts, tests/e2e/media.spec.ts and common browser helpers; editor/modal fixes only when covered by reproduced regressions. Cover desktop/390px, active/inactive/last tab close and focus, selection keys, reload/back/invalid file, mobile article-to-file navigation, menu, image Escape/focus, Korean despite language=en, both themes, no GIF requests or video body before play. Use stable roles/URLs, no arbitrary sleeps. External API content mocked. Produce request for dependency agent's @playwright/test version/scripts and a test/report manifest. Wait for coordinator before starting a shared Next build/server.

## Task 2 — Notion validation (agent)

Own tests/e2e/notion.spec.ts, tests/fixtures/notion/*, components/notion-viewer.tsx, lib/fetch-notion-record-map.ts and tests/notion-renderer.test.mjs if needed. Preserve existing original tests/API/client. Construct valid typed record maps containing Code, Equation, Collection and verify actual rendering and theme changes, then failure→retry UI/original links, request sharing and cache reuse. Fix only genuine reproduced gaps. Consume Task1 configuration testDir=tests/e2e; do not edit configuration or package manifest. Coordinate fixture/helper names. Produce concise verification report.

## Task 3 — production performance (coordinator)

Determine verified public URL and deployment platform using repository/configuration and read-only provider access. Measure existing production on desktop/mobile and local optimized production separately; document method, date, metrics, font/image/JS costs, external service effects. Never describe local lab data as deployed data. Apply safe measured improvements only with regression checks and coordinate owned files.

## Task 4 — dependency warnings (agent)

Own package.json/package-lock.json and necessary compatibility adapter files under components/notion-compat/ or lib/notion-compat/. Research official current packages/compatibility; remove React peer conflicts without hiding warnings or a forced installation. Keep root React 19 and Next15 where compatible; maintain actual Notion Code/Equation/Collection behavior. Add Task1's @playwright/test and scripts after coordination. Verify clean npm ci, npm ls relevant React dependency graph and audit. Avoid installing unrelated packages or major migration without demonstrated necessity. Report compatibility changes for Task2 tests.

## Task 5 — integration and delivery (coordinator, sequential)

Review agent diffs and run npm test, typecheck, lint, production build, deterministic browser suites, preserved public Notion integration, installation reproducibility. Add CI and operating docs. Perform independent review. Commit only reviewed task files (exclude DS_Store, credentials and generated artifacts). Use existing deployment destination and authenticated provider, verify public pages after publication. If destination or access is missing, finish concrete reviewable release first and report the precise blocker.

## Shared interfaces and ordering

| Tracks | Interface | Resolution |
|---|---|---|
|1 + 2|Playwright test discovery|Task1 owns config with testDir tests/e2e, Task2 owns only notion.spec.ts and its fixture directory.|
|1 + 4|@playwright/test and scripts|Task4 is sole manifest/installation owner; Task1 requests dependency/script requirements.|
|2 + 4|Notion renderer compatibility|Task4 avoids editing viewer/loader; report adapter/renderer contracts to Task2 before a changed dependency lands.|
|1/2/4 + 3/5|npm tree and .next output|Only coordinator triggers shared build/server after installation gate; agents may use an already-running server.|

## Review focus

- Browser tests must fail for an actual regression instead of only asserting fixture text.
- Cached and late async results must not leak between pages/test cases or overwrite a newer page.
- Collection/equation fixtures must exercise the real third-party component, not a stub.
- Production measurement must state which commit/content it measured and external-network limitations.
- Deployment must use the intended existing project/domain and never disclose credentials.
