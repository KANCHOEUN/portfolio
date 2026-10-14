# Browser regression automation

Date: 2026-10-15. Tests run against a coordinator-managed local production server, with external article/content requests intercepted. No shared build or server starts inside Playwright configuration.

## Files and coverage

- `playwright.config.ts`: Chromium, desktop 1440×900 and mobile 390×844; reduced motion; two isolated-context workers; failure traces/screenshots.
- `tests/e2e/helpers.ts`: external network fixtures, accessible mobile menu and sidebar file navigation.
- `tests/e2e/editor.spec.ts`: tab arrows/Home/End, active/inactive/final close and focus, desktop final-close article dismissal, sidebar push/back, reload, invalid file.
- `tests/e2e/navigation.spec.ts`: Korean with legacy English language storage/query, malformed sidebar storage, both themes and theme switching, /about and /resume navigation, mobile article-to-file transition.
- `tests/e2e/media.spec.ts`: native image dialog, keyboard Escape/Enter, named close and focus restoration; no GIF or video-body requests before play, actual MP4 playback and unplayed sibling isolation; all nine RE-VERSE demos remain unloaded after expanding their feature sections.
- Task2 separately owns `tests/e2e/notion.spec.ts` and typed Notion fixtures.

## Run

Start the production server separately, then:

```sh
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100 npm run test:e2e
```

The configuration uses local Google Chrome when present on macOS. CI installs Chrome with `npx playwright install --with-deps chrome` and sets `PLAYWRIGHT_CHANNEL=chrome` so the H.264 playback tests use a browser with proprietary media codecs. `PLAYWRIGHT_CHANNEL` accepts `chrome` or `chromium`; when unset, the existing macOS Chrome fallback remains. An explicit channel bypasses that automatic executable fallback. See [Playwright media codec guidance](https://playwright.dev/docs/browsers#media-codecs). To use an existing browser explicitly, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable path. Base URL defaults to `http://127.0.0.1:3000`; set it to the server you started. No arbitrary sleeps or live external content are used.

## Verification status

- CLI discovery: 30 project/test combinations including Task2 after adding the layout regression; Task1 contributes 20.
- Final command: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100 npm run test:e2e -- editor.spec.ts navigation.spec.ts media.spec.ts --output=/private/tmp/portfolio-editor-green` — **18 passed, 2 intentionally skipped, 0 failed**, in 28.3 seconds against the rebuilt local production build (fonts and responsive sidebar fix). The initial baseline run had 16 passed and 2 skipped.
- Skips are viewport-specific: mobile article-to-file transition on desktop, and simultaneous article/final-tab closure on mobile (mobile article view replaces the editor; normal final-tab closure and article-to-file navigation are tested there).
- Initial sandbox launch failed before app execution with EPERM. Authorized escalation allowed local Chrome launch. The first executable run exposed test fixture assumptions about Next trailing-slash normalization and mobile panel visibility; corrected those assertions to existing behavior. No application fix was needed during that initial run; the subsequent measured layout-shift regression and its fix are recorded below.
- Local browser verification uses installed Chrome; CI uses `PLAYWRIGHT_CHANNEL=chrome`. Actual public Notion behavior belongs to the separate integration test, and external iframe content is deterministic here.

## Measured mobile layout-shift regression

The performance track observed a mobile `/about` sidebar-to-main layout shift. A new navigation regression deliberately gates Next client scripts, then retains the initial desktop `matchMedia` result until the test releases mobile detection. `/about` static HTML contains its Suspense fallback rather than the layout, so a test that blocks all scripts indefinitely cannot assert a static sidebar. Delaying mobile detection after scripts release exercises the actual initial client layout deterministically.

RED against the pre-fix production build: desktop control passed (visible navigation width 260px); mobile failed because `#site-sidebar` was visible with `relative shrink-0`, before detecting the mobile viewport. The minimal fix adds `hidden md:block` to the desktop sidebar wrapper in `components/layout-wrapper.tsx`, so CSS chooses the correct width before React media detection. The mobile overlay remains controlled by the existing menu state. GREEN after the coordinator rebuild: both new layout checks passed, and all three browser suites passed (18 passed, 2 intentional skips). Mobile sidebar is hidden and main width remains exactly 390px before viewport detection is released; desktop navigation remains visible at 260px. Scoped ESLint passed for the test and layout file.

## Sidebar fixture readiness correction

A later full-suite run exposed a helper race: the mobile menu was already open, but the helper read Mockly's expansion state before sidebar storage restoration/active-file expansion effects settled. Its click could then collapse the folder that the effect had just opened, leaving the target link absent. Targeted repetition reproduced two actual timeouts with the same absent `diagram4` navigation link; remaining repetitions were stopped after obtaining evidence.

`openMenu` now waits for the mobile opener according to the configured viewport and for visible navigation. `navigateFile` waits for the currently selected sidebar link to be visible with `aria-current="page"` before reading/toggling the target folder. This waits on the UI's readiness rather than increasing timeouts. No application code changed for this correction.

Targeted GREEN: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100 npm run test:e2e -- editor.spec.ts --project=mobile --grep 'tabs select' --repeat-each=10 --output=/private/tmp/portfolio-helper-green` — **10 passed in 9.0 seconds**. The coordinator runs the fresh complete suite after this correction.
