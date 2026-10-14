import assert from "node:assert/strict"
import { createRequire } from "node:module"
import test from "node:test"

const require = createRequire(import.meta.url)

test("the Notion proxy identifies itself as a browser-compatible client", async () => {
  let createPublicNotionClient
  try {
    ({ createPublicNotionClient } = require("../lib/public-notion-client.ts"))
  } catch {
    // The assertion below keeps the RED phase focused on the missing behavior.
  }

  assert.equal(typeof createPublicNotionClient, "function", "createPublicNotionClient must exist")
  const notion = createPublicNotionClient()

  assert.equal(notion._kyOptions.headers["user-agent"], "Mozilla/5.0")
  assert.equal(notion._authToken, undefined)
})

test("unwraps Notion record envelopes before consumers read block values", async () => {
  let normalizeNotionApiResponse
  try {
    ({ normalizeNotionApiResponse } = require("../lib/public-notion-client.ts"))
  } catch {
    // The assertion below keeps the RED phase focused on the missing behavior.
  }

  assert.equal(typeof normalizeNotionApiResponse, "function", "normalizeNotionApiResponse must exist")

  const block = { id: "page-id", type: "page" }
  const response = {
    recordMap: {
      block: {
        "page-id": {
          spaceId: "space-id",
          value: { role: "reader", value: block },
        },
      },
    },
  }

  normalizeNotionApiResponse(response)

  assert.deepEqual(response.recordMap.block["page-id"], {
    role: "reader",
    value: block,
  })
})

test("preserves role-bearing values that are not Notion record envelopes", () => {
  const { normalizeNotionApiResponse } = require("../lib/public-notion-client.ts")
  const ordinaryRecord = {
    value: {
      role: "reader",
      name: "ordinary payload",
    },
  }
  const response = {
    recordMap: {
      block: {
        "page-id": ordinaryRecord,
      },
    },
  }

  normalizeNotionApiResponse(response)

  assert.equal(response.recordMap.block["page-id"], ordinaryRecord)
})
