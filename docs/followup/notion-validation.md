# Notion renderer validation — 2026-10-15

## Scope and fixtures

Added `tests/e2e/notion.spec.ts` and `tests/fixtures/notion/record-map.ts`. The fixture returns a typed `ExtendedRecordMap` with a public root page, JavaScript code, a block equation, a collection-view block, collection schema, table view, query results and a page row with title/number properties. It uses role-bearing records and stable UUIDs, including public page permissions. External API content is mocked at the HTTP route only; the production `NotionRenderer` and actual third-party Code, Equation and Collection components run unchanged.

The original four cases run against the coordinator's production server on desktop (1440×900) and mobile (390×844):

- Syntax-highlighted `.token.keyword` output, KaTeX DOM and TeX annotation, collection column header/row/property output, dark→light→dark renderer classes, and missing-renderer warnings.
- A controlled pending request, original source URL during loading and failure, visible Korean failure, retry and actual successful code rendering.
- Close/reopen while pending shares one request; close/reopen after success renders the real collection from cache without another request.
- A held first-page response cannot replace the second-page title after the viewer closes and another article opens. This verifies unmount isolation, not the effect cancellation guard.
- An additional desktop case switches article links with the viewer still mounted; a DOM marker confirms the same viewer survives the switch. The mobile equivalent skips because the article overlay hides editor links. The held old response then finishes and two animation frames settle before the second-page title assertion.

Existing unit tests continue to cover the precise five-minute expiry boundary. Browser cache assertions observe route request counts alongside rendered results, rather than asserting mocked component calls. Removing a renderer registration loses syntax tokens/KaTeX/table output; removing request sharing or caching increases observed requests; The desktop mounted-switch case detects removal of stale-result cancellation, confirmed by the controlled mutation described below. The close/reopen case alone cannot prove that guard because React ignores updates to an unmounted instance.

## Commands and results

- `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100 npm run test:e2e -- notion.spec.ts --output=/private/tmp/portfolio-notion-green`: **9 passed, 1 skipped**, 19.1 seconds (normal production build before the mutation check), Chrome, production build with react-notion-x/notion-types 7.12.1 and notion-client 7.3.0.
- `npm test`: **10 passed**, including unchanged original Notion API/viewer tests and loader sharing/expiry/failure tests.
- `npm run typecheck`: passed, including the typed fixture.
- `./node_modules/.bin/eslint tests/e2e/notion.spec.ts tests/fixtures/notion/record-map.ts`: passed.

The initial restricted browser launch exited with SIGABRT before any test body; rerunning with authorized sandbox escalation launched Chrome normally. The first actual browser run passed six cases and failed two because the new test used an incorrect table-header selector. Inspection of real upstream DOM corrected the test to `.notion-table-header`; the complete rerun passed. This was a test-authoring issue, not a production regression. The runner emitted only the existing NO_COLOR/FORCE_COLOR environment warning.

## Controlled mutation check

The initial close/reopen test could pass without the cancellation guard because its first viewer unmounts. A fresh review identified that limitation; the report now describes it accurately and the new desktop case keeps the same viewer mounted while changing articles. Neither ArticleViewer nor NotionViewer has a page key forcing remount.

With the coordinator stopping the shared server first, the exact viewer source was backed up under `/private/tmp/portfolio-notion-viewer-pre-mutation.tsx`. Only the success condition `if (!cancelled) setRecordMap(data);` was temporarily changed to `setRecordMap(data);`. The coordinator built and started that version.

`PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100 npm run test:e2e -- notion.spec.ts --grep "switching articles in the mounted viewer" --project=desktop --output=/private/tmp/portfolio-notion-mutation-red` produced **1 expected failure**: expected `현재 두 번째 글`, received `늦은 첫 번째 글`. The log is `/private/tmp/portfolio-notion-mutation-red.log`; screenshot/trace are in its output directory. The viewer was then immediately restored from the exact backup and byte equality asserted. Final restored-build verification passed in the coordinator's complete suite: 27 passed, 3 viewport-specific skips, zero failures; both desktop mounted-switch and mobile unmount cases passed. Exact restored viewer bytes were compared against the mutation backup again. No mutation is retained in the release source.

## Findings and preserved work

No reproduced production gap required changing `components/notion-viewer.tsx` or `lib/fetch-notion-record-map.ts`. This track did not modify the original API route, public client, existing tests, package manifests or server lifecycle. The dependency track preserved notion-client 7.3.0 after its newer API exposed incompatibility with the original client's kyOptions contract.

These deterministic tests verify renderer and client behavior against realistic fixtures; they do not claim current public Notion content or external service availability. The coordinator retains the separate public Notion integration check and final integration/build/release ownership. No commits, deployment or Mockly server changes were performed by this track.
