import assert from "node:assert/strict"
import { createRequire } from "node:module"
import test from "node:test"

const require = createRequire(import.meta.url)

async function loadSubject() {
  try {
    return require("../lib/fetch-notion-record-map.ts")
  } catch {
    return {}
  }
}

test("loads the record map from a successful response", async () => {
  const { fetchNotionRecordMap } = await loadSubject()
  assert.equal(typeof fetchNotionRecordMap, "function", "fetchNotionRecordMap must exist")

  const recordMap = { block: { page: {} } }
  const fetchImpl = async () => Response.json({ recordMap })

  assert.deepEqual(await fetchNotionRecordMap("page-id", fetchImpl), recordMap)
})

test("surfaces the API error when loading fails", async () => {
  const { fetchNotionRecordMap } = await loadSubject()
  assert.equal(typeof fetchNotionRecordMap, "function", "fetchNotionRecordMap must exist")

  const fetchImpl = async () => Response.json(
    { error: "Failed to fetch Notion content" },
    { status: 500 },
  )

  await assert.rejects(
    () => fetchNotionRecordMap("page-id", fetchImpl),
    /Failed to fetch Notion content/,
  )
})

test("uses a stable error when the failed response is not JSON", async () => {
  const { fetchNotionRecordMap } = await loadSubject()
  assert.equal(typeof fetchNotionRecordMap, "function", "fetchNotionRecordMap must exist")

  const fetchImpl = async () => new Response("Service unavailable", { status: 503 })

  await assert.rejects(
    () => fetchNotionRecordMap("page-id", fetchImpl),
    { message: "Failed to load Notion content" },
  )
})
