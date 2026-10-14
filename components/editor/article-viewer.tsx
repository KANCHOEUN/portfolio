"use client";
import dynamic from "next/dynamic";
import { X, ExternalLink } from "lucide-react";
import IframeViewer from "../iframe-viewer";
const NotionViewer = dynamic(() => import("../notion-viewer"), {
  loading: () => (
    <p className="p-6" role="status">
      글을 불러오는 중입니다…
    </p>
  ),
});
export interface SelectedArticle {
  url: string;
  title: string;
}
export default function ArticleViewer({
  article,
  onClose,
}: {
  article: SelectedArticle;
  onClose: () => void;
}) {
  const parsed = new URL(article.url);
  const isNotion =
    parsed.hostname === "notion.so" ||
    parsed.hostname.endsWith(".notion.so") ||
    parsed.hostname.endsWith(".notion.site");
  const pageId = parsed.pathname.match(
    /([a-f\d]{32}|[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12})\/?$/i,
  )?.[1];
  return (
    <aside className="article-viewer" aria-label={article.title}>
      <div className="viewer-header">
        <span className="flex items-center gap-2 min-w-0">
          <ExternalLink size={16} className="shrink-0" />
          <span className="truncate">{article.title}</span>
        </span>
        <button aria-label="글 뷰어 닫기" onClick={onClose} className="p-1">
          <X size={16} />
        </button>
      </div>
      <div className="min-h-0 flex-1">
        {isNotion && pageId ? (
          <NotionViewer
            notionPageId={pageId}
            notionUrl={article.url}
            onClose={onClose}
          />
        ) : (
          <IframeViewer
            url={article.url}
            title={article.title}
            onClose={onClose}
          />
        )}
      </div>
    </aside>
  );
}
