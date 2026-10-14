# Follow-up ledger — plan: docs/superpowers/plans/2026-10-15-portfolio-followup.md

- 2026-10-15: User approved executing follow-ups 1–5 with parallel agents.
- Pre-flight: file ownership and interface dependencies recorded in the plan; npm installations and builds must be serialized.
- Ruling: continue in the already-authorized existing checkout to preserve the uncommitted refactor — moving would omit user-approved work — cost if wrong: integration must be reviewed as one large diff.
- Tasks 1, 2, 4: ready for independent delegation. Tasks 3 and 5: coordinator owns measurement and release gates.

- Task 1: browser regression suites implemented; delayed initial mobile detection reproduced RED and sidebar CSS fix verified GREEN (18 pass, 2 viewport skips).
- Task 2: real Code/Equation/Collection fixtures and lifecycle/error/cache tests verified; review found unmount-only stale test weakness. Added mounted-switch case and success-cancellation mutation yielded expected RED first-title overwrite; original viewer bytes restored. Final suite pending coordinator gate.
- Task 4: renderer/types7.12.1, client7.3 preserved, React peer graph clean, Node24 metadata, Playwright/Lighthouse added; npm ci passes, production audit0, full dev audit9 documented.
- Task 3: production-before and candidate-before medians captured sequentially with no test/build CPU overlap. Measured mobile layout shift0.320 and candidate font transfer4.25MB. WOFF2 conversion preserves full glyph/cmap/hmtx/name/CFF bytes, source assets48.93% smaller. Final performance run pending.
- Ruling: retain all14,716 glyphs per font rather than subset website text — keeps arbitrary future Korean/Notion content working — cost: larger first-download than text-specific subsets; fonts are cacheable.
- Ruling: CI uses Chrome stable for H.264 playback instead of bundled Chromium — matches codec requirement and verified local browser — cost: browser installation in CI depends on Chrome distribution availability.
- Ruling: keep notion-client7.3 while renderer/types7.12 resolve React peers — preserves public-client kyOptions contract — cost: backend client upgrade remains a separate compatibility task.
- Final review: single P2 test coverage finding; mounted-switch regression and mutation RED address it. No other concrete production defect found.

- Final local verification: npm test10, typecheck, lint, restored production build and live Notion integration pass; combined browser suite27 pass/3 intentional skips after deterministic sidebar-helper readiness fix. Production audit0 confirmed again; tracked/new text has no credential signatures.
