import { existsSync } from "node:fs";
import { defineConfig } from "@playwright/test";

const channel = process.env.PLAYWRIGHT_CHANNEL;
if (channel !== undefined && channel !== "chrome" && channel !== "chromium") {
  throw new Error("PLAYWRIGHT_CHANNEL must be chrome or chromium");
}
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const executablePath =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
  (!channel && existsSync(chrome) ? chrome : undefined);
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: [["list"]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000",
    browserName: "chromium",
    channel,
    launchOptions: { executablePath },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    reducedMotion: "reduce",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    {
      name: "mobile",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
});
