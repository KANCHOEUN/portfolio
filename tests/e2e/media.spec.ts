import { test, expect } from "@playwright/test";
import { mockExternalContent } from "./helpers";

test.beforeEach(async ({ page }) => {
  await mockExternalContent(page);
});
test("image modal closes by Escape/button and returns keyboard focus", async ({
  page,
}) => {
  await page.goto("/portfolio?file=intro3");
  const trigger = page.getByRole("button", { name: "overview 이미지 확대" });
  await trigger.click();
  await expect(
    page.getByRole("dialog", { name: "overview 확대 이미지" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "확대 이미지 닫기" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "확대 이미지 닫기" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
test("demo requests no GIF or MP4 body before explicit play; only selected video loads", async ({
  page,
}) => {
  const mediaRequests: string[] = [];
  page.on("request", (request) => {
    if (/\.(gif|mp4)(?:\?|$)/i.test(request.url()))
      mediaRequests.push(new URL(request.url()).pathname);
  });
  await page.goto("/portfolio?file=intro3");
  await page
    .getByRole("button", {
      name: "실시간 화상 채팅 및 화면 동시 공유 가능",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", {
      name: "허브 키우기 및 도감 채우기 등과 같은 게임적인 요소",
      exact: true,
    })
    .click();
  const videos = page.locator("video");
  await expect(videos).toHaveCount(4);
  await expect
    .poll(() =>
      videos.evaluateAll((elements) =>
        elements.map((element) => (element as HTMLVideoElement).readyState),
      ),
    )
    .toEqual([0, 0, 0, 0]);
  expect(mediaRequests).toEqual([]);
  await videos.first().evaluate(async (element) => {
    await (element as HTMLVideoElement).play();
  });
  await expect
    .poll(() =>
      videos
        .first()
        .evaluate((element) => (element as HTMLVideoElement).readyState),
    )
    .toBeGreaterThanOrEqual(2);
  expect(mediaRequests.length).toBeGreaterThan(0);
  expect(
    mediaRequests.every((path) => path.endsWith("/enter-studyroom.mp4")),
  ).toBe(true);
  await expect
    .poll(() =>
      videos
        .nth(1)
        .evaluate((element) => (element as HTMLVideoElement).readyState),
    )
    .toBe(0);
});
test("every RE-VERSE demo remains unloaded when feature sections expand", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (/\.(gif|mp4)(?:\?|$)/i.test(request.url()))
      requests.push(new URL(request.url()).pathname);
  });
  await page.goto("/portfolio?file=intro2");
  for (const title of [
    "React Quill 텍스트 에디터를 활용하여 추억들을 다이어리처럼 작성 및 관리",
    "추억 저장소인 아카이브 별로 추억을 공유하고 싶은 친구들끼리 공유",
    "Three.js 기반 3D 공간에서 WebRTC로 P2P 연결을 통해 친구들과 함께 텍스트와 음성 채팅으로 상호 작용 가능",
    "그 외 다양한 인터랙션 요소들",
  ])
    await page.getByRole("button", { name: title, exact: true }).click();
  const videos = page.locator("video");
  await expect(videos).toHaveCount(9);
  expect(
    await videos.evaluateAll((elements) =>
      elements.every((element) => {
        const video = element as HTMLVideoElement;
        return (
          video.preload === "none" &&
          !video.autoplay &&
          video.paused &&
          video.readyState === 0
        );
      }),
    ),
  ).toBe(true);
  expect(requests).toEqual([]);
});
