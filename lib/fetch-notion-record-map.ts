import type { ExtendedRecordMap } from "notion-types";

type FetchImplementation = typeof fetch;

interface NotionApiResponse {
  recordMap?: ExtendedRecordMap;
  error?: string;
}

async function requestNotionRecordMap(
  pageId: string,
  fetchImpl: FetchImplementation = fetch,
): Promise<ExtendedRecordMap> {
  const response = await fetchImpl(
    `/api/notion?pageId=${encodeURIComponent(pageId)}`,
    { signal: AbortSignal.timeout(20_000) },
  );
  let data: NotionApiResponse = {};

  try {
    data = (await response.json()) as NotionApiResponse;
  } catch {
    throw new Error("Failed to load Notion content");
  }

  if (!response.ok || !data.recordMap) {
    throw new Error(data.error || "Failed to load Notion content");
  }

  return data.recordMap;
}

export function createNotionRecordMapLoader(
  fetchImpl: FetchImplementation = fetch,
  now = Date.now,
) {
  const cache = new Map<
    string,
    { data: ExtendedRecordMap; expiresAt: number }
  >();
  const pending = new Map<string, Promise<ExtendedRecordMap>>();
  return function load(pageId: string): Promise<ExtendedRecordMap> {
    const cached = cache.get(pageId);
    if (cached && cached.expiresAt > now()) return Promise.resolve(cached.data);
    cache.delete(pageId);
    const existing = pending.get(pageId);
    if (existing) return existing;
    const request = requestNotionRecordMap(pageId, fetchImpl)
      .then((data) => {
        cache.set(pageId, { data, expiresAt: now() + 300_000 });
        return data;
      })
      .finally(() => pending.delete(pageId));
    pending.set(pageId, request);
    return request;
  };
}

const loadNotionRecordMap = createNotionRecordMapLoader();
export function fetchNotionRecordMap(
  pageId: string,
  fetchImpl?: FetchImplementation,
) {
  return fetchImpl
    ? requestNotionRecordMap(pageId, fetchImpl)
    : loadNotionRecordMap(pageId);
}
