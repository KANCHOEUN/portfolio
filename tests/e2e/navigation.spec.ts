import { test, expect } from "@playwright/test";
import { mockExternalContent, navigateFile, openMenu } from "./helpers";

test.beforeEach(async ({ page }) => {
  await mockExternalContent(page);
});
for (const theme of ["light", "dark"]) {
  test(`Korean survives old English storage and URL in ${theme} theme`, async ({
    page,
  }) => {
    await page.addInitScript((theme) => {
      localStorage.setItem("language", "en");
      localStorage.setItem("theme", theme);
      localStorage.setItem("sidebarExpandedState", "broken old storage");
    }, theme);
    await page.goto("/about?language=en");
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
    await expect(page.locator("html")).toHaveClass(new RegExp(theme));
    await openMenu(page);
    await expect(
      page
        .getByRole("navigation")
        .getByRole("link", { name: "소개", exact: true }),
    ).toBeVisible();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "이력서", exact: true })
      .click();
    await expect(page).toHaveURL(/\/resume\/$/);
    await expect(
      page.getByRole("heading", { name: "경력", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "교육", exact: true }),
    ).toBeVisible();
    const toggle = page.getByRole("button", {
      name: theme === "dark" ? "밝은 테마로 변경" : "어두운 테마로 변경",
    });
    await toggle.click();
    await expect(page.locator("html")).toHaveClass(
      new RegExp(theme === "dark" ? "light" : "dark"),
    );
  });
}
test("mobile menu closes after article-to-file navigation", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile",
    "Mobile viewer state regression",
  );
  await page.goto("/portfolio?file=related4");
  await page
    .getByRole("link", { name: /Transactional Outbox 패턴 도입기/ })
    .click();
  await expect(
    page.getByRole("complementary", {
      name: /Transactional Outbox 패턴 도입기/,
    }),
  ).toBeVisible();
  await navigateFile(page, "intro1", "Pigrest");
  await expect(
    page.getByRole("complementary", {
      name: /Transactional Outbox 패턴 도입기/,
    }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "탐색 메뉴 열기" }),
  ).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#tab-intro1")).toHaveAttribute(
    "aria-selected",
    "true",
  );
});
test("responsive sidebar is correct while mobile detection is delayed", async ({
  page,
}, testInfo) => {
  await page.addInitScript(() => {
    const original = window.matchMedia.bind(window);
    window.matchMedia = (query) => {
      const media = original(query);
      if (query !== "(max-width: 767px)") return media;
      // Keep the initial desktop state until the test releases mobile detection.
      Object.defineProperty(media, "matches", {
        configurable: true,
        get: () => false,
      });
      (
        window as unknown as { releaseMobileDetection: () => void }
      ).releaseMobileDetection = () => {
        Object.defineProperty(media, "matches", {
          configurable: true,
          get: () => original(query).matches,
        });
        media.dispatchEvent(new Event("change"));
      };
      return media;
    };
  });
  let releaseScripts!: () => void;
  const scriptsGate = new Promise<void>((resolve) => {
    releaseScripts = resolve;
  });
  await page.route("**/_next/**/*.js*", async (route) => {
    await scriptsGate;
    await route.continue();
  });
  await page.goto("/about", { waitUntil: "commit" });
  // /about uses a client-rendered Suspense fallback, so the layout does not
  // exist in static HTML. Release scripts but keep viewport detection gated.
  releaseScripts();
  const sidebar = page.locator("#site-sidebar");
  await expect(sidebar).toHaveCount(1);
  if (testInfo.project.name === "mobile") {
    await expect(sidebar).toBeHidden();
    await expect
      .poll(() =>
        page
          .locator(".workspace-main")
          .evaluate((element) => element.getBoundingClientRect().width),
      )
      .toBe(390);
  } else {
    await expect(sidebar).toBeVisible();
    await expect
      .poll(() =>
        sidebar
          .getByRole("navigation")
          .evaluate((element) => element.getBoundingClientRect().width),
      )
      .toBe(260);
  }
  await page.evaluate(() =>
    (
      window as unknown as { releaseMobileDetection: () => void }
    ).releaseMobileDetection(),
  );
  if (testInfo.project.name === "mobile")
    await expect(
      page.getByRole("button", { name: "탐색 메뉴 열기" }),
    ).toBeVisible();
});
