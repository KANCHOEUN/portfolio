// app/notion/MarkdownRenderer.tsx
'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownRenderer({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, ...props }) => <a {...props} className="text-blue-500 underline" />,
        // 필요한 경우 다른 컴포넌트 커스터마이징 가능
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
