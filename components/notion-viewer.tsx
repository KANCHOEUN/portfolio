"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { NotionRenderer } from "react-notion-x";
import type { ExtendedRecordMap } from "notion-types";
import { fetchNotionRecordMap } from "@/lib/fetch-notion-record-map";
const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((module) => module.Code),
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then(
    (module) => module.Equation,
  ),
);
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (module) => module.Collection,
  ),
);
const components = { Code, Equation, Collection };
interface NotionViewerProps {
  notionPageId: string;
  notionUrl: string;
  onClose: () => void;
}
export default function NotionViewer({
  notionPageId,
  notionUrl,
}: NotionViewerProps) {
  const { resolvedTheme } = useTheme();
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let cancelled = false;
    setRecordMap(null);
    setError(null);
    fetchNotionRecordMap(notionPageId)
      .then((data) => {
        if (!cancelled) setRecordMap(data);
      })
      .catch(() => {
        if (!cancelled)
          setError(
            "글을 불러오지 못했습니다. 다시 시도하거나 Notion에서 열어 주세요.",
          );
      });
    return () => {
      cancelled = true;
    };
  }, [notionPageId, attempt]);
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-2 text-sm border-b border-[var(--border)]">
        <a
          href={notionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--blue)] underline"
        >
          Notion에서 원문 열기 ↗
        </a>
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        {error ? (
          <div className="p-6 text-center" role="alert">
            <p>{error}</p>
            <button
              className="mt-4 text-[var(--blue)] underline"
              onClick={() => setAttempt((value) => value + 1)}
            >
              다시 시도
            </button>
          </div>
        ) : recordMap ? (
          <NotionRenderer
            recordMap={recordMap}
            components={components}
            fullPage
            darkMode={resolvedTheme !== "light"}
          />
        ) : (
          <p role="status" className="p-6">
            Notion 글을 불러오는 중입니다…
          </p>
        )}
      </div>
    </div>
  );
}
