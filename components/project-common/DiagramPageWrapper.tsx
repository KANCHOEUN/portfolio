"use client";

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
      }),
    );
  }, [children]);

  const handleTocClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="p-6 max-w-5xl w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="mb-4">{description}</p>
      <div className="mb-6 p-4 bg-[var(--elevated)] rounded">
        <div className="flex items-center mb-3">
          <List size={16} className="text-[var(--blue)] mr-2" />
          <h3 className="text-lg font-semibold text-[var(--foreground)]">
            목차
          </h3>
        </div>
        <ul className="space-y-2">
          {toc.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleTocClick(item.id)}
                className={`text-[var(--blue)]   hover:text-[var(--cyan)]   transition-colors text-left${item.depth === 2 ? " pl-4 text-sm opacity-80" : ""}`}
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
