# Dependency compatibility follow-up

Verified 2026-10-15 using Node 24.10.0 and npm, in the approved shared checkout.

## Change

- `react-notion-x` and root `notion-types`: 7.3.0 → 7.12.1, within the existing major version.
- `katex`: 0.16.22 → 0.18.4 to match the renderer's exact dependency and share one runtime/CSS version.
- Preserve Next 15.5.27, React/React DOM 19.2.1, and `notion-client` 7.3.0. The newer client changes `kyOptions` to an ofetch interface; keeping the original client preserves the existing public-client implementation. The two Notion type versions remain structurally compatible under the project's typecheck.
- Add explicit dev dependencies `@playwright/test` 1.64.1 and `lighthouse` 13.5.0, and scripts `test:e2e` / `test:e2e:ui`.
- No forced installations, legacy peer flags, warning suppression, local package patches, or renderer stubs.

The old conflict was real: renderer 7.3.0 depended on `react-lazy-images` 1.1.0, which pulled an obsolete intersection-observer React peer range. Published renderer 7.12.1 replaces this with `react-intersection-observer` ^11.0.0; installed 11.0.1 explicitly accepts React 19. Code, Equation, Collection and stylesheet exports retain their existing paths. No compatibility adapter is needed. Actual block rendering and theme behavior are covered by the separate Notion browser validation track.

## Evidence

- Final `npm ci`: exit 0, 573 packages installed; no React peer conflict warnings. npm reports the existing ESLint 9.39.5 support deprecation openly.
- `npm ls react react-dom react-notion-x react-lazy-images react-intersection-observer katex notion-client notion-types --all`: exit 0; every React/React DOM consumer dedupes to root 19.2.1; old lazy-images package absent.
- `npm run typecheck`: exit 0 after preserving client 7.3.0.
- `npm audit --omit=dev --json`: exit 0, zero production findings.
- Full `npm audit --json`: exit 1, nine development-tool findings (seven high, two moderate). `npm audit fix` makes no compatible repair and does not clear these findings.

## Remaining risk

The full audit findings are in existing Tailwind 3 / Next ESLint development paths: braces → chokidar/micromatch/fast-glob → Tailwind and Next ESLint, plus postcss-selector-parser → postcss-nested/Tailwind. The braces registry latest is 3.0.3, itself affected; npm proposes a breaking Tailwind 4 migration or Next ESLint downgrade, neither suitable for this compatibility task. Selector-parser has fixed 7.1.6, but consumers request its older major. A cross-major override without consumer validation would not be a demonstrated safe fix. Build inputs are repository-controlled; this does not remove the audit risk. A dedicated tooling migration is appropriate if these findings must reach zero.

Playwright requires Node >=20; Lighthouse 13.5.0 requires Node >=22.19. Current Node 24.10.0 meets both. CI should use a supported Node 24 runtime. This report verifies installation and type compatibility; coordinator owns final production build and runtime regression results.

## Primary sources

- [Upstream 7.12.1 release](https://github.com/NotionX/react-notion-x/releases/tag/v7.12.1) and published manifests queried with `npm view react-notion-x@7.12.1 dependencies peerDependencies exports --json`.
- [Upstream renderer repository](https://github.com/NotionX/react-notion-x), including supported blocks and optional component contracts.
- [Intersection observer upstream](https://github.com/thebuilder/react-intersection-observer), and published 11.0.x React peer declarations.
- [Playwright upstream](https://github.com/microsoft/playwright) and [Lighthouse upstream](https://github.com/GoogleChrome/lighthouse); versions/engine requirements verified from their npm manifests.
- [Braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) and [PostCSS selector parser advisory](https://github.com/advisories/GHSA-rj75-hqrm-r3gf), as returned by the current npm audit endpoint.

Release metadata also pins `engines.node` to `24.x` for the verified Vercel destination and exposes `perf:audit` as `node scripts/performance-audit.mjs`. `npm install --package-lock-only --ignore-scripts` synchronized lockfile root metadata without mutating installed dependencies. The manifest and lockfile Node engine values were checked directly. [Vercel's supported Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) confirms Node 24 support and package engine selection.
