import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
const require = createRequire(import.meta.url);
function subject(path) { try { return require(path); } catch { return {}; } }

test("closing the active page selects the last remaining page and its URL", () => {
  const { closeEditorTab } = subject("../lib/editor-tabs.ts");
  assert.equal(typeof closeEditorTab, "function");
  assert.deepEqual(closeEditorTab(["intro4", "diagram4"], "diagram4", "diagram4"), { tabs: ["intro4"], activeId: "intro4" });
  assert.deepEqual(closeEditorTab(["intro4"], "intro4", "intro4"), { tabs: [], activeId: null });
  assert.deepEqual(closeEditorTab(["intro4", "diagram4"], "intro4", "diagram4"), { tabs: ["diagram4"], activeId: "diagram4" });
});

test("Notion loader shares in-flight work and expires successful results after five minutes", async () => {
  const { createNotionRecordMapLoader } = subject("../lib/fetch-notion-record-map.ts");
  assert.equal(typeof createNotionRecordMapLoader, "function");
  let now = 0, calls = 0, finish;
  const recordMap = { block: { page: {} } };
  const loader = createNotionRecordMapLoader(async () => { calls++; await new Promise(resolve => { finish = resolve; }); return Response.json({ recordMap }); }, () => now);
  const first = loader("page"), second = loader("page");
  assert.equal(calls, 1);
  finish();
  assert.deepEqual(await first, recordMap); assert.deepEqual(await second, recordMap);
  now = 299999; assert.deepEqual(await loader("page"), recordMap); assert.equal(calls, 1);
  now = 300000; const expired = loader("page"); assert.equal(calls, 2); finish(); await expired;
});

test("Notion loader never caches failures and allows retry", async () => {
  const { createNotionRecordMapLoader } = subject("../lib/fetch-notion-record-map.ts");
  assert.equal(typeof createNotionRecordMapLoader, "function");
  let fail = true;
  const loader = createNotionRecordMapLoader(async () => fail ? Response.json({error:"upstream failed"}, {status:500}) : Response.json({recordMap:{block:{}}}));
  await assert.rejects(() => loader("page"), /upstream failed/);
  fail = false; assert.deepEqual(await loader("page"), {block:{}});
});

test("project registry resolves only exact page IDs and supplies consistent dates and status", () => {
  const { projects, getProjectPage } = subject("../data/projects.ts");
  assert.equal(typeof getProjectPage, "function");
  assert.equal(getProjectPage("intro4").project.slug, "mockly");
  assert.equal(getProjectPage("related99"), undefined);
  assert.equal(getProjectPage("xintro4"), undefined);
  assert.equal(projects.find(p=>p.slug==="re-verse").period, "2022.10 ~ 2022.11");
  assert.equal(projects.find(p=>p.slug==="mockly").status, "ongoing");
  assert.equal(projects.find(p=>p.slug==="pigrest").status, "paused");
});
