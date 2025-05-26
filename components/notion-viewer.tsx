"use client"

import { useState } from "react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface NotionViewerProps {
    notionPageId: string
    onClose: () => void
}

export default function NotionViewer({ notionPageId, onClose }: NotionViewerProps) {
    const [markdown, setMarkdown] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMarkdown() {
            const res = await fetch(`/api/notion?pageId=${notionPageId}`);
            const data = await res.json();
            setMarkdown(data.markdown);
        }
        fetchMarkdown();
    }, [notionPageId]);

    if (!markdown) return <p>Loading...</p>;

    return (
        <div className="h-full flex flex-col bg-[#282c34] dark:bg-[#282c34] light:bg-[#fafafa]">
            <div className="flex-1 overflow-hidden h-full">
                {/* <iframe
          src={url}
          className="w-full h-full border-0"
          title={title}
          sandbox="allow-scripts allow-same-origin allow-forms"
          loading="lazy"
        /> */}
                <div w-full h-full border-0>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
                </div>
            </div>
        </div>
    )
}
