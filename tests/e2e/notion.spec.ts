import { expect, test, type Page } from "@playwright/test";
import {
  firstArticle,
  secondArticle,
  rendererRecordMap,
} from "../fixtures/notion/record-map";

async function openArticle(page: Page, title = firstArticle.title) {
  await page.getByRole("link", { name: title, exact: false }).click();
  return page.getByRole("complementary", { name: title, exact: true });
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("theme", "dark"));
  // Article thumbnails do not affect these tests and must not access public Notion.
  await page.route(/https:\/\/.*notion\.(so|site)\/image\//, (route) =>
    route.abort(),
  );
});

test("real Code, Equation and Collection render and follow both themes", async ({
  page,
}) => {
  const warnings: string[] = [];
  page.on("console", (message) => {
    if (
      /skipping missing collection|unsupported block|katex/i.test(
        message.text(),
      )
    )
      warnings.push(message.text());
  });
  await page.route("**/api/notion?*", (route) =>
    route.fulfill({ json: { recordMap: rendererRecordMap() } }),
  );
  await page.goto("/portfolio?file=related2");
  const viewer = await openArticle(page);
  await expect(viewer.locator(".notion-code code")).toContainText(
    "const answer = 42;",
  );
  await expect(
    viewer.locator(".notion-code .token.keyword").first(),
  ).toHaveText("const");
  await expect(viewer.locator(".notion-equation .katex")).toBeVisible();
  await expect(
    viewer.locator('annotation[encoding="application/x-tex"]'),
  ).toHaveText("E = mc^2");
  await expect(viewer.locator(".notion-table-header")).toContainText("개선율");
  await expect(viewer.locator(".notion-table-row")).toContainText(
    "인덱스 실험",
  );
  await expect(viewer.locator(".notion-table-row")).toContainText("42");
  await expect(viewer.locator(".notion-app")).toHaveClass(/dark-mode/);
  await page.getByRole("button", { name: "밝은 테마로 변경" }).click();
  await expect(viewer.locator(".notion-app")).not.toHaveClass(/dark-mode/);
  await page.getByRole("button", { name: "어두운 테마로 변경" }).click();
  await expect(viewer.locator(".notion-app")).toHaveClass(/dark-mode/);
  expect(warnings).toEqual([]);
});

test("loading and failure retain original source; retry renders successfully", async ({
  page,
}) => {
  let requests = 0;
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/api/notion?*", async (route) => {
    requests++;
    if (requests === 1) {
      await gate;
      await route.fulfill({
        status: 503,
        json: { error: "temporary failure" },
      });
    } else await route.fulfill({ json: { recordMap: rendererRecordMap() } });
  });
  await page.goto("/portfolio?file=related2");
  const viewer = await openArticle(page);
  await expect(viewer.getByRole("status")).toContainText("불러오는 중");
  await expect(
    viewer.getByRole("link", { name: "Notion에서 원문 열기 ↗" }),
  ).toHaveAttribute("href", firstArticle.url);
  release();
  await expect(viewer.getByRole("alert")).toContainText(
    "글을 불러오지 못했습니다",
  );
  await expect(
    viewer.getByRole("link", { name: "Notion에서 원문 열기 ↗" }),
  ).toHaveAttribute("href", firstArticle.url);
  await expect(
    viewer.getByRole("link", { name: "Notion에서 원문 열기 ↗" }),
  ).toHaveAttribute("target", "_blank");
  await viewer.getByRole("button", { name: "다시 시도" }).click();
  await expect(viewer.locator(".notion-code code")).toContainText(
    "answer = 42",
  );
  expect(requests).toBe(2);
});

test("reopening a pending page shares its request and reopening success uses cache", async ({
  page,
}) => {
  let requests = 0;
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/api/notion?*", async (route) => {
    requests++;
    await gate;
    await route.fulfill({ json: { recordMap: rendererRecordMap() } });
  });
  await page.goto("/portfolio?file=related2");
  let viewer = await openArticle(page);
  await expect(viewer.getByRole("status")).toBeVisible();
  await expect.poll(() => requests).toBe(1);
  await page.getByRole("button", { name: "글 뷰어 닫기" }).click();
  viewer = await openArticle(page);
  await expect(viewer.getByRole("status")).toBeVisible();
  release();
  await expect(viewer.locator(".notion-code code")).toContainText(
    "answer = 42",
  );
  expect(requests).toBe(1);
  await page.getByRole("button", { name: "글 뷰어 닫기" }).click();
  viewer = await openArticle(page);
  await expect(viewer.locator(".notion-table-row")).toContainText(
    "인덱스 실험",
  );
  expect(requests).toBe(1);
});

for (const keepMounted of [false, true]) {
  test(
    keepMounted
      ? "switching articles in the mounted viewer ignores a late response"
      : "late results from a closed page cannot replace a newer article",
    async ({ page, isMobile }) => {
      test.skip(
        keepMounted && isMobile,
        "Mobile article overlay hides the editor links; close/reopen is covered separately.",
      );
      let release!: () => void;
      const gate = new Promise<void>((resolve) => {
        release = resolve;
      });
      let firstRequested = false;
      await page.route("**/api/notion?*", async (route) => {
        const id = new URL(route.request().url()).searchParams.get("pageId")!;
        if (id === firstArticle.id) {
          firstRequested = true;
          await gate;
        }
        await route.fulfill({
          json: {
            recordMap: rendererRecordMap(
              id,
              id === firstArticle.id ? "늦은 첫 번째 글" : "현재 두 번째 글",
            ),
          },
        });
      });
      await page.goto("/portfolio?file=related2");
      await openArticle(page);
      await expect.poll(() => firstRequested).toBe(true);
      const initialViewer = page.getByRole("complementary", {
        name: firstArticle.title,
        exact: true,
      });
      if (keepMounted)
        await initialViewer.evaluate((element) =>
          element.setAttribute("data-mount-probe", "same-viewer"),
        );
      else await page.getByRole("button", { name: "글 뷰어 닫기" }).click();
      const viewer = await openArticle(page, secondArticle.title);
      if (keepMounted)
        await expect(viewer).toHaveAttribute("data-mount-probe", "same-viewer");
      await expect(viewer.locator(".notion-title")).toHaveText(
        "현재 두 번째 글",
      );
      const firstResponse = page.waitForResponse((response) =>
        response.url().includes(firstArticle.id),
      );
      release();
      await (await firstResponse).finished();
      await page.evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          ),
      );
      await expect(viewer.locator(".notion-title")).toHaveText(
        "현재 두 번째 글",
      );
      await expect(viewer.getByText("늦은 첫 번째 글")).toHaveCount(0);
    },
  );
}
