"use client";
import { createContext, useContext, type ReactNode } from "react";
const ArticleViewerContext = createContext<((id: string) => void) | null>(null);
export function ArticleViewerProvider({
  children,
  onOpen,
}: {
  children: ReactNode;
  onOpen: (id: string) => void;
}) {
  return (
    <ArticleViewerContext.Provider value={onOpen}>
      {children}
    </ArticleViewerContext.Provider>
  );
}
export function useOpenArticle() {
  const open = useContext(ArticleViewerContext);
  if (!open) throw new Error("ArticleViewerProvider is required");
  return open;
}
