# Independent release review — 2026-10-15

Read-only source review of HEAD `323448cf` plus the current tracked/untracked refactor and follow-up files. Reviewed the plan, editor/layout/media lifecycle, real Notion renderer and fixtures, dependency reports, font preservation report, performance runner and CI. No installations, builds, server starts, commits or publication were performed by this reviewer. Only this requested report was written. Runtime results remain coordinator-owned.

## Finding

- **P2 — stale-result regression test unmounts the instance it needs to exercise.** `tests/e2e/notion.spec.ts:161` closes the first viewer before opening the second. This destroys the original NotionViewer, so React ignores its late state update even if cancellation is removed. The test therefore does not protect the mounted page-ID transition, and the mutation-sensitivity claim in `docs/followup/notion-validation.md` is unsupported. Add a desktop test that clicks the second article while the first viewer remains open, then releases the held first response and checks that the second title remains. Keep the existing mobile close/reopen case. The actual production effect has cancellation and looks correct.

## Spec and release gates

- Real Code syntax tokens, KaTeX output and Collection table cells are asserted using typed HTTP fixtures; there are no renderer stubs. Pending-request sharing, retry, successful cache reuse and unit-level cache expiry have meaningful assertions.
- The CSS `hidden md:block` sidebar fix addresses the delayed mobile detection demonstrated by the new regression. Coordinator must complete its rebuilt GREEN run and final performance comparison before claiming verification.
- The font report preserves all 14,716 glyphs per retained weight with decoded cmap/metrics/CFF/name comparisons. CSS references match the four new WOFF2 assets; no text subsetting is introduced.
- Browser configuration does not own a server. CI builds then starts one production server on port 3100, uses two isolated browser workers, and cleans up on step exit. Performance runner uses sequential fresh Chrome runs. Keep performance runs exclusive of builds/browser tests to avoid CPU contention. The preserved public integration test starts `next dev` and shares `.next`; run it before the final build or rebuild afterward, never alongside production validation.
- README currently still says Node 22+, React peer warnings remain, and no commit/deployment is in scope. Update it to Node 24 and the final follow-up status. Treat the historical refactor report as historical, and link the current dependency audit results (zero production findings; nine development findings).
- Production and candidate performance/reporting plus final release status are still in progress at this review snapshot. Publish the measured source identity, public versus local distinction, three-run medians and network limitations in the final performance report. No deployment success is inferred here.

No additional concrete production correctness defect was found in the inspected paths. Release approval remains conditional on the test gap and final coordinator verification/documentation gates above.

## Scoped re-review — P2 addressed

Inspected the revised `tests/e2e/notion.spec.ts` mounted-switch case and corrected Notion validation report. The desktop case now opens the second article without closing the first viewer, checks a persistent DOM marker, waits for the held old response, and asserts that the current title remains. The component tree does not key NotionViewer by page. The report distinguishes unmount isolation from mounted effect cancellation and records a controlled mutation producing the expected old-title overwrite. Current source again contains `if (!cancelled) setRecordMap(data)` and cleanup cancellation. **The P2 finding is addressed.** This scoped source re-review did not run builds or tests; final restored-build GREEN remains the coordinator's release gate.
