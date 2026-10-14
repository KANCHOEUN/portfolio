"use client";
import { useState } from "react";
interface IframeViewerProps {
  url: string;
  title: string;
  onClose: () => void;
}
export default function IframeViewer({ url, title }: IframeViewerProps) {
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-2 border-b border-[var(--border)] text-sm">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--blue)] underline"
        >
          원문 새 창에서 열기 ↗
        </a>
      </div>
      {loadedUrl !== url && (
        <p role="status" className="px-4 py-2 text-sm">
          글을 불러오는 중입니다. 표시되지 않으면 원문 링크를 이용해 주세요.
        </p>
      )}
      <iframe
        key={url}
        src={url}
        title={title}
        onLoad={() => setLoadedUrl(url)}
        className="w-full min-h-0 flex-1 border-0"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
}
