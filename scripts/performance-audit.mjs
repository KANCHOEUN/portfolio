import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [base, label = "audit"] = process.argv.slice(2);
if (!base || !/^[a-z0-9-]+$/.test(label)) {
  throw new Error(
    "Usage: node scripts/performance-audit.mjs https://site.example/ label",
  );
}
const origin = new URL(base);
if (!/^https?:$/.test(origin.protocol) || origin.username || origin.password) {
  throw new Error("Audit URL must use HTTP(S) without embedded credentials");
}
const runs = Number(process.env.PERF_AUDIT_RUNS || 3);
if (!Number.isInteger(runs) || runs < 1 || runs > 5) {
  throw new Error("PERF_AUDIT_RUNS must be an integer from 1 to 5");
}
const throttling = process.env.PERF_AUDIT_THROTTLING || "simulate";
if (!["simulate", "devtools"].includes(throttling)) {
  throw new Error("PERF_AUDIT_THROTTLING must be simulate or devtools");
}
const output = resolve(root, "artifacts/performance", label);
mkdirSync(output, { recursive: true });
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const env = { ...process.env };
if (!env.CHROME_PATH && existsSync(chrome)) env.CHROME_PATH = chrome;
const command = resolve(root, "node_modules/lighthouse/cli/index.js");
const routes = [
  { name: "about", path: "/about/" },
  { name: "portfolio", path: "/portfolio/?file=intro4" },
];
const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
};
const samples = [];
async function execute(args) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(process.execPath, [command, ...args], {
      env,
      cwd: root,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    child.stdout.on("data", (chunk) => {
      output += chunk;
    });
    child.stderr.on("data", (chunk) => {
      output += chunk;
    });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolveRun() : reject(new Error(output.slice(-2500))),
    );
  });
}
for (const route of routes) {
  for (const device of ["desktop", "mobile"]) {
    for (let run = 1; run <= runs; run += 1) {
      const url = new URL(route.path, origin).href;
      const reportPath = resolve(output, `${route.name}-${device}-${run}.json`);
      const args = [
        url,
        "--only-categories=performance",
        `--throttling-method=${throttling}`,
        "--output=json",
        `--output-path=${reportPath}`,
        "--chrome-flags=--headless=new --disable-extensions",
        "--no-enable-error-reporting",
        "--quiet",
      ];
      if (device === "desktop") args.push("--preset=desktop");
      else
        args.push(
          "--screenEmulation.width=390",
          "--screenEmulation.height=844",
        );
      await execute(args);
      const report = JSON.parse(readFileSync(reportPath, "utf8"));
      if (report.runtimeError)
        throw new Error(JSON.stringify(report.runtimeError));
      const metric = (id) => report.audits[id]?.numericValue ?? null;
      const requests = report.audits["network-requests"]?.details?.items ?? [];
      const sizes = (predicate) =>
        requests
          .filter(predicate)
          .reduce((sum, item) => sum + (item.transferSize || 0), 0);
      const sample = {
        route: route.name,
        device,
        run,
        url: report.finalDisplayedUrl || report.finalUrl,
        fetchTime: report.fetchTime,
        lighthouseVersion: report.lighthouseVersion,
        throttling: report.configSettings.throttlingMethod,
        score: Math.round(report.categories.performance.score * 100),
        fcpMs: metric("first-contentful-paint"),
        lcpMs: metric("largest-contentful-paint"),
        cls: metric("cumulative-layout-shift"),
        tbtMs: metric("total-blocking-time"),
        speedIndexMs: metric("speed-index"),
        transferBytes: metric("total-byte-weight"),
        fontBytes: sizes((r) => r.resourceType === "Font"),
        imageBytes: sizes((r) => r.resourceType === "Image"),
        scriptBytes: sizes((r) => r.resourceType === "Script"),
        thirdPartyBytes: sizes(
          (r) => new URL(r.url).origin !== new URL(url).origin,
        ),
        fonts: requests
          .filter((r) => r.resourceType === "Font")
          .map((r) => ({ url: r.url, bytes: r.transferSize })),
        warnings: report.runWarnings,
        reportPath,
      };
      samples.push(sample);
      writeFileSync(
        resolve(output, "samples.json"),
        JSON.stringify(samples, null, 2) + "\n",
      );
      console.log(
        JSON.stringify({
          route: route.name,
          device,
          run,
          score: sample.score,
          lcpMs: sample.lcpMs,
          bytes: sample.transferBytes,
        }),
      );
    }
  }
}
const summaries = routes.flatMap((route) =>
  ["desktop", "mobile"].map((device) => {
    const group = samples.filter(
      (sample) => sample.route === route.name && sample.device === device,
    );
    const summary = { route: route.name, device, runs: group.length };
    for (const field of [
      "score",
      "fcpMs",
      "lcpMs",
      "cls",
      "tbtMs",
      "speedIndexMs",
      "transferBytes",
      "fontBytes",
      "imageBytes",
      "scriptBytes",
      "thirdPartyBytes",
    ]) {
      summary[field] = median(group.map((s) => s[field]));
    }
    return summary;
  }),
);
const result = {
  label,
  baseUrl: origin.href,
  measuredAt: new Date().toISOString(),
  method: `Lighthouse ${throttling} throttling, desktop preset or 390x844 mobile; fresh browser/cache each run; medians`,
  samples,
  summaries,
};
writeFileSync(
  resolve(output, "summary.json"),
  JSON.stringify(result, null, 2) + "\n",
);
console.log(`Summary: ${resolve(output, "summary.json")}`);
