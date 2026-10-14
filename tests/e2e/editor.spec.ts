import { test, expect } from "@playwright/test";
import { mockExternalContent, navigateFile } from "./helpers";

test.beforeEach(async ({ page }) => {
  await mockExternalContent(page);
});
test("tabs select with arrow, Home and End; inactive, active and last close restore focus", async ({
  page,
}) => {
  await page.goto("/portfolio?file=intro4");
  await navigateFile(page, "diagram4");
  await navigateFile(page, "related4");
  const tabs = page.getByRole("tab");
  await expect(tabs).toHaveCount(3);
  await tabs.nth(2).focus();
  await page.keyboard.press("Home");
  await expect(page).toHaveURL(/file=intro4$/);
  await expect(tabs.nth(0)).toBeFocused();
  await page.keyboard.press("ArrowLeft");
  await expect(page).toHaveURL(/file=related4$/);
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/file=intro4$/);
  await page.keyboard.press("End");
  await expect(page).toHaveURL(/file=related4$/);
  await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
  await page
    .getByRole("button", { name: "Mockly 설계 및 구현 탭 닫기", exact: true })
    .click();
  await expect(tabs).toHaveCount(2);
  await expect(page).toHaveURL(/file=related4$/);
  await expect(page.locator("#tab-related4")).toBeFocused();
  await page
    .getByRole("button", { name: "Mockly 관련 글 탭 닫기", exact: true })
    .click();
  await expect(page).toHaveURL(/file=intro4$/);
  await expect(page.locator("#tab-intro4")).toBeFocused();
  await page
    .getByRole("button", { name: "Mockly 소개 탭 닫기", exact: true })
    .click();
  await expect(page).toHaveURL(/\/portfolio\/$/);
  await expect(
    page.getByRole("heading", { name: "열린 파일이 없습니다" }),
  ).toBeVisible();
  await expect(page.locator("#project-panel")).toBeFocused();
});
test("URL remains source of truth after sidebar push, back, reload and invalid ID", async ({
  page,
}) => {
  await page.goto("/portfolio?file=intro4");
  await navigateFile(page, "diagram4");
  await page.goBack();
  await expect(page).toHaveURL(/file=intro4$/);
  await expect(page.locator("#tab-intro4")).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page.reload();
  await expect(page.getByRole("tab")).toHaveCount(1);
  await expect(page.locator("#tab-intro4")).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page.goto("/portfolio?file=invalid");
  await expect(
    page.getByRole("heading", {
      name: "요청한 프로젝트 페이지를 찾을 수 없습니다.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("tab")).toHaveCount(0);
});
test("closing the final file also dismisses its open article", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name === "mobile",
    "Mobile article replaces the tab panel; mobile article-to-file navigation is covered separately",
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
  await page
    .getByRole("button", { name: "Mockly 관련 글 탭 닫기", exact: true })
    .click();
  await expect(page).toHaveURL(/\/portfolio\/$/);
  await expect(
    page.getByRole("complementary", {
      name: /Transactional Outbox 패턴 도입기/,
    }),
  ).toHaveCount(0);
  await expect(page.locator("#project-panel")).toBeFocused();
});
