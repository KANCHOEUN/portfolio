"use client";
import { useEffect, useState } from "react";
import { FileCode } from "lucide-react";
import { getBlogPostById } from "@/data/projects";
import { ArticleViewerProvider } from "@/contexts/article-viewer-context";
import { useEditorTabs } from "./editor/use-editor-tabs";
import TabHeader from "./editor/tab-header";
import ProjectRenderer from "./editor/project-renderer";
import ArticleViewer, { type SelectedArticle } from "./editor/article-viewer";
export default function EditorContent() {
  const { tabs, activeId, invalid, select, close } = useEditorTabs();
  const [article, setArticle] = useState<SelectedArticle | null>(null);
  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) setArticle(null);
  }, [activeId]);
  const open = (url: string, title: string) => setArticle({ url, title });
  const openById = (id: string) => {
    const post = getBlogPostById(id);
    if (post) open(post.url, post.title);
  };
  return (
    <ArticleViewerProvider onOpen={openById}>
      <div className={`editor-layout ${article ? "has-article" : ""}`}>
        <div className="editor-main">
          <TabHeader
            tabs={tabs}
            activeId={activeId}
            onSelect={select}
            onClose={(id) => {
              if (close(id)) setArticle(null);
            }}
          />
          <div
            id="project-panel"
            role={activeId ? "tabpanel" : undefined}
            aria-labelledby={activeId ? `tab-${activeId}` : undefined}
            className="editor-content"
            tabIndex={0}
          >
            {activeId ? (
              <ProjectRenderer
                key={activeId}
                pageId={activeId}
                onOpenArticle={open}
              />
            ) : (
              <div className="flex flex-col gap-4 items-center justify-center h-full p-6 text-[var(--muted)]">
                <FileCode size={48} />
                <h1 className="text-xl">
                  {invalid
                    ? "요청한 프로젝트 페이지를 찾을 수 없습니다."
                    : "열린 파일이 없습니다"}
                </h1>
              </div>
            )}
          </div>
        </div>
        {article && (
          <ArticleViewer article={article} onClose={() => setArticle(null)} />
        )}
      </div>
    </ArticleViewerProvider>
  );
}
