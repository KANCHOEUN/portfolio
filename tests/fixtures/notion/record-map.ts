import type { Block, ExtendedRecordMap } from "notion-types";

export const firstArticle = {
  id: "1ff9d8968ca3801d82acf4679a919f8f",
  title: "INDEX를 적용하여 성능 개선하기",
  url: "https://www.notion.so/choeun/INDEX-1ff9d8968ca3801d82acf4679a919f8f",
};
export const secondArticle = {
  id: "1ff9d8968ca380169aa2d223996b4f6d",
  title: "GitLab CI 파이프라인 구축하기",
};

// Same shape as a public Notion page chunk, including collection query results.
// Typed values make missing renderer contracts fail at typecheck time.
export function rendererRecordMap(
  pageId = firstArticle.id,
  title = "Notion 렌더러 검증",
): ExtendedRecordMap {
  const root = pageId.replace(
    /(.{8})(.{4})(.{4})(.{4})(.{12})/,
    "$1-$2-$3-$4-$5",
  );
  const code = "10000000-0000-4000-8000-000000000001";
  const equation = "10000000-0000-4000-8000-000000000002";
  const database = "10000000-0000-4000-8000-000000000003";
  const collection = "10000000-0000-4000-8000-000000000004";
  const view = "10000000-0000-4000-8000-000000000005";
  const row = "10000000-0000-4000-8000-000000000006";
  const base = (id: string, parent_id = root) => ({
    id,
    parent_id,
    parent_table: "block",
    version: 1,
    alive: true,
    created_time: 1700000000000,
    last_edited_time: 1700000000000,
    created_by_table: "notion_user",
    created_by_id: "fixture-author",
    last_edited_by_table: "notion_user",
    last_edited_by_id: "fixture-author",
  });
  const values: Block[] = [
    {
      ...base(root, "fixture-space"),
      type: "page",
      parent_table: "space",
      properties: { title: [[title]] },
      format: {},
      permissions: [{ role: "reader", type: "public_permission" }],
      content: [code, equation, database],
    },
    {
      ...base(code),
      type: "code",
      properties: {
        title: [["const answer = 42;\nconsole.log(answer);"]],
        language: [["JavaScript"]],
        caption: [],
      },
    },
    {
      ...base(equation),
      type: "equation",
      properties: { title: [["E = mc^2"]] },
    },
    {
      ...base(database),
      type: "collection_view",
      collection_id: collection,
      view_ids: [view],
      properties: { source: [] },
    },
    {
      ...base(row, collection),
      parent_table: "collection",
      type: "page",
      format: {},
      permissions: [{ role: "reader", type: "public_permission" }],
      properties: Object.assign(
        { title: [["인덱스 실험"]] as [string][] },
        { score: [["42"]] },
      ),
    },
  ];
  return {
    block: Object.fromEntries(
      values.map((value) => [value.id, { role: "reader" as const, value }]),
    ),
    collection: {
      [collection]: {
        role: "reader",
        value: {
          id: collection,
          version: 1,
          name: [["성능 실험 결과"]],
          schema: {
            title: { name: "실험", type: "title" },
            score: { name: "개선율", type: "number" },
          },
          icon: "",
          parent_id: database,
          parent_table: "block",
          alive: true,
          copied_from: "",
        },
      },
    },
    collection_view: {
      [view]: {
        role: "reader",
        value: {
          id: view,
          type: "table",
          name: "실험 표",
          version: 1,
          alive: true,
          parent_id: database,
          parent_table: "block",
          query2: { group_by: "" },
          page_sort: [row],
          format: {
            table_wrap: true,
            table_properties: [
              { property: "title", visible: true, width: 240 },
              { property: "score", visible: true, width: 120 },
            ],
          },
        },
      },
    },
    collection_query: {
      [collection]: {
        [view]: {
          type: "table",
          total: 1,
          blockIds: [row],
          aggregationResults: [],
          collection_group_results: {
            type: "results",
            blockIds: [row],
            hasMore: false,
          },
        },
      },
    },
    notion_user: {},
    signed_urls: {},
  };
}
