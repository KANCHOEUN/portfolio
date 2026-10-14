import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { once } from "node:events"
import test, { after, before } from "node:test"

const port = process.env.NOTION_TEST_PORT || "3107"
const baseUrl = `http://127.0.0.1:${port}`
const pageId = "1ff9d8968ca3801d82acf4679a919f8f"
let server

before(async () => {
  server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "dev", "--hostname", "127.0.0.1", "--port", port],
    { stdio: ["ignore", "pipe", "pipe"] },
  )

  let stderr = ""
  server.stderr.on("data", chunk => {
    stderr += chunk.toString()
  })

  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Next.js exited before becoming ready: ${stderr}`)
    }

    try {
      const response = await fetch(baseUrl)
      if (response.ok) return
    } catch {
      // The server is still starting.
    }

    await new Promise(resolve => setTimeout(resolve, 250))
  }

  throw new Error(`Next.js did not become ready: ${stderr}`)
})

after(async () => {
  if (!server || server.exitCode !== null) return

  server.kill("SIGTERM")
  await Promise.race([
    once(server, "exit"),
    new Promise(resolve => setTimeout(resolve, 5_000)),
  ])
})

test("public Notion pages are returned through the API route", async () => {
  const response = await fetch(`${baseUrl}/api/notion?pageId=${pageId}`)
  const body = await response.json()
  const rootBlockId = Object.keys(body.recordMap?.block || {})
    .find(id => id.replaceAll("-", "") === pageId)

  assert.equal(response.status, 200)
  assert.ok(rootBlockId)
  assert.equal(body.recordMap.block[rootBlockId].value.id, rootBlockId)
  assert.ok(Object.keys(body.recordMap.block).length > 63)
  assert.ok(Object.keys(body.recordMap.signed_urls || {}).length > 0)
})
