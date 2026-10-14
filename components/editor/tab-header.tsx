"use client";
import { useEffect, useRef, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { getProjectPage } from "@/data/projects";
import ProjectIcon from "./project-icon";
export default function TabHeader({
  tabs,
  activeId,
  onSelect,
  onClose,
}: {
  tabs: string[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
}) {
  const header = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    if (pendingFocus.current === undefined) return;
    const targetId = pendingFocus.current;
    pendingFocus.current = undefined;
    document
      .getElementById(targetId ? `tab-${targetId}` : "project-panel")
      ?.focus();
  }, [tabs]);
  const closeTab = (id: string) => {
    pendingFocus.current =
      activeId === id
        ? (tabs.filter((tab) => tab !== id).at(-1) ?? null)
        : activeId;
    onClose(id);
  };
  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let target: number;
    if (event.key === "ArrowRight") target = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft")
      target = (index + tabs.length - 1) % tabs.length;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = tabs.length - 1;
    else return;
    event.preventDefault();
    onSelect(tabs[target]);
    header.current
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [target]?.focus();
  };
  return (
    <div
      ref={header}
      className="tabs-header"
      role="tablist"
      aria-label="열린 프로젝트 페이지"
    >
      {tabs.map((id, index) => {
        const entry = getProjectPage(id);
        if (!entry) return null;
        const label = `${entry.project.name} ${entry.page.name}`;
        return (
          <div
            key={id}
            className={`file-tab ${activeId === id ? "active-tab" : ""}`}
          >
            <button
              id={`tab-${id}`}
              role="tab"
              aria-selected={activeId === id}
              aria-controls="project-panel"
              tabIndex={activeId === id || (!activeId && index === 0) ? 0 : -1}
              onClick={() => onSelect(id)}
              onKeyDown={(event) => onKey(event, index)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <ProjectIcon icon={entry.project.icon} />
              <span>{entry.page.name}</span>
              <span className="sr-only"> — {entry.project.name}</span>
            </button>
            <button
              onClick={() => closeTab(id)}
              aria-label={`${label} 탭 닫기`}
              className="rounded p-1 hover:text-[var(--red)]"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
