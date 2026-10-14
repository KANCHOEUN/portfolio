"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getProjectPage } from "@/data/projects";
import { closeEditorTab } from "@/lib/editor-tabs";
export function useEditorTabs() {
  const router = useRouter();
  const fileId = useSearchParams().get("file");
  const activeId = fileId && getProjectPage(fileId) ? fileId : null;
  const [tabs, setTabs] = useState<string[]>([]);
  useEffect(() => {
    if (activeId)
      setTabs((previous) =>
        previous.includes(activeId) ? previous : [...previous, activeId],
      );
  }, [activeId]);
  const select = (id: string) =>
    router.replace(`/portfolio?file=${encodeURIComponent(id)}`, {
      scroll: false,
    });
  const close = (id: string) => {
    const next = closeEditorTab(tabs, id, activeId);
    setTabs(next.tabs);
    if (activeId === id)
      router.replace(
        next.activeId ? `/portfolio?file=${next.activeId}` : "/portfolio",
        { scroll: false },
      );
    return next.tabs.length === 0;
  };
  return {
    tabs,
    activeId,
    invalid: Boolean(fileId && !activeId),
    select,
    close,
  };
}
