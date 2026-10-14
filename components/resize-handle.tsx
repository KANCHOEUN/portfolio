"use client";
import { useState, useEffect } from "react";
interface ResizeHandleProps {
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
}
export default function ResizeHandle({
  sidebarWidth,
  setSidebarWidth,
}: ResizeHandleProps) {
  const [resizing, setResizing] = useState(false);
  useEffect(() => {
    if (!resizing) return;
    const previousCursor = document.body.style.cursor;
    const resize = (event: MouseEvent) =>
      setSidebarWidth(Math.min(500, Math.max(160, event.clientX)));
    const stop = () => setResizing(false);
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stop);
    document.body.style.cursor = "col-resize";
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stop);
      document.body.style.cursor = previousCursor;
    };
  }, [resizing, setSidebarWidth]);
  return (
    <div
      role="separator"
      aria-label="탐색 메뉴 너비"
      aria-orientation="vertical"
      aria-valuenow={sidebarWidth}
      aria-valuemin={160}
      aria-valuemax={500}
      tabIndex={0}
      className="w-[3px] bg-[var(--border)] cursor-col-resize"
      onMouseDown={(event) => {
        event.preventDefault();
        setResizing(true);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          setSidebarWidth(
            Math.min(
              500,
              Math.max(
                160,
                sidebarWidth + (event.key === "ArrowRight" ? 20 : -20),
              ),
            ),
          );
        }
      }}
    />
  );
}
