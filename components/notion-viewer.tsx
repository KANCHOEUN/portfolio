"use client"

import { useState } from "react";
import { useEffect } from "react";
import { NotionRenderer } from "react-notion-x";

interface NotionViewerProps {
    notionPageId: string
    onClose: () => void
}

export default function NotionViewer({ notionPageId, onClose }: NotionViewerProps) {
    const [markdown, setMarkdown] = useState<any | null>(null);

    useEffect(() => {
        fetch(`/api/notion?pageId=${notionPageId}`)
          .then(res => res.json())
          .then(data => setMarkdown(data.recordMap));
      }, [notionPageId]);
    
    if (!markdown) return <p>Loading Notion content...</p>;


    return (
        <div className="h-full flex flex-col bg-[#282c34] dark:bg-[#282c34] light:bg-[#fafafa]">
            <div className="flex-1 overflow-hidden h-full">
                <div className="w-full h-full border-0 overflow-y-auto">
                    <NotionRenderer recordMap={markdown} fullPage={true} darkMode={false} />
                </div>
            </div>
        </div>
    )
}
