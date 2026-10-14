import { NotionAPI } from "notion-client"

const RECORD_MAP_TABLES = [
  "block",
  "collection",
  "collection_view",
  "notion_user",
  "space",
  "team",
] as const

type NotionFetchArgs = Parameters<NotionAPI["fetch"]>[0]

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

export function normalizeNotionApiResponse<T>(response: T): T {
  if (!isRecord(response) || !isRecord(response.recordMap)) return response

  for (const tableName of RECORD_MAP_TABLES) {
    const table = response.recordMap[tableName]
    if (!isRecord(table)) continue

    for (const [id, record] of Object.entries(table)) {
      if (
        isRecord(record) &&
        isRecord(record.value) &&
        typeof record.value.role === "string" &&
        Object.prototype.hasOwnProperty.call(record.value, "value")
      ) {
        table[id] = record.value
      }
    }
  }

  return response
}

class NormalizingNotionAPI extends NotionAPI {
  override async fetch<T>({ endpoint, body, kyOptions, headers }: NotionFetchArgs): Promise<T> {
    const response = await super.fetch<T>({ endpoint, body, kyOptions, headers })
    return normalizeNotionApiResponse(response)
  }
}

export function createPublicNotionClient() {
  return new NormalizingNotionAPI({
    kyOptions: {
      headers: {
        // Notion's Cloudflare layer rejects Node's default User-Agent.
        "user-agent": "Mozilla/5.0",
      },
    },
  })
}
