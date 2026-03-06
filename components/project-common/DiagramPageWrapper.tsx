"use client";

import { useLanguage } from "@/contexts/language-context";
import { List } from "lucide-react";
import { useState, useEffect, useRef } from "react";

type TocItem = { id: string; label: string; depth: number };

export default function DiagramPageWrapper({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const { language } = useLanguage();
  const contentRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    if (!contentRef.current) return;
    const sections = contentRef.current.querySelectorAll("section[id]");
    setToc(
      Array.from(sections).map((section) => {
        const heading = section.querySelector("h2, h3");
        return {
          id: section.id,
          label: heading?.textContent?.trim() || section.id,
          depth: heading?.tagName === "H3" ? 2 : 1,
        };
      })
    );
  }, [children, language]);

  const handleTocClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="p-6 max-w-5xl w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="mb-4">{description}</p>
      <div className="mb-6 p-4 bg-[#2c313a] dark:bg-[#2c313a] light:bg-[#eaeaeb] rounded">
        <div className="flex items-center mb-3">
          <List size={16} className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] mr-2" />
          <h3 className="text-lg font-semibold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42]">목차</h3>
        </div>
        <ul className="space-y-2">
          {toc.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleTocClick(item.id)}
                className={`text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] hover:text-[#56b6c2] dark:hover:text-[#56b6c2] light:hover:text-[#0184bc] transition-colors text-left${item.depth === 2 ? " pl-4 text-sm opacity-80" : ""}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
