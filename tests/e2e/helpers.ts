import { expect, type Page } from "@playwright/test";

export async function mockExternalContent(page: Page) {
  await page.route(
    /^https?:\/\/(?!127\.0\.0\.1(?::|\/)|localhost(?::|\/))/,
    (route) => {
      if (route.request().resourceType() === "document")
        return route.fulfill({
          contentType: "text/html",
          body: '<html lang="ko"><body>테스트 글 본문</body></html>',
        });
      return route.fulfill({ status: 204, body: "" });
    },
  );
}
export async function openMenu(page: Page) {
  const opener = page.getByRole("button", { name: "탐색 메뉴 열기" });
  if ((page.viewportSize()?.width ?? 1440) <= 767) {
    const closer = page.getByRole("button", { name: "탐색 메뉴 닫기" });
    if (!(await closer.isVisible())) {
      await expect(opener).toBeVisible();
      await opener.click();
    }
  }
  await expect(
    page.getByRole("navigation", { name: "사이트 탐색" }),
  ).toBeVisible();
}
export async function navigateFile(page: Page, id: string, project = "Mockly") {
  await openMenu(page);
  const nav = page.getByRole("navigation", { name: "사이트 탐색" });
  const currentFile = new URL(page.url()).searchParams.get("file");
  if (currentFile) {
    // Restoration and active-file expansion run in effects. Wait for their
    // visible result before reading expansion state or a click can collapse
    // the folder that an in-flight effect has just opened.
    const selected = nav.locator(`a[href="/portfolio/?file=${currentFile}"]`);
    await expect(selected).toBeVisible();
    await expect(selected).toHaveAttribute("aria-current", "page");
  }
  const folder = nav.getByRole("button", { name: project, exact: true });
  if ((await folder.getAttribute("aria-expanded")) !== "true")
    await folder.click();
  await nav.locator(`a[href="/portfolio/?file=${id}"]`).click();
  await expect(page).toHaveURL(new RegExp(`/portfolio/\\?file=${id}$`));
  await expect(page.getByRole("tabpanel")).toBeVisible();
}
