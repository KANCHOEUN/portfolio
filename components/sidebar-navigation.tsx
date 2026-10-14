"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  User,
  FileText,
  Info,
  GitBranch,
  BookOpen,
  Github,
  Linkedin,
  Newspaper,
  Dog,
} from "lucide-react";
import { projects, getProjectPage } from "@/data/projects";
import ResizeHandle from "./resize-handle";
import ProjectIcon from "./editor/project-icon";
const socialLinks = [
  { name: "GitHub", url: "https://github.com/KANCHOEUN", icon: Github },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/hyeeun-cho-307554211",
    icon: Linkedin,
  },
  { name: "블로그", url: "https://blog.kancho.co/", icon: Newspaper },
  {
    name: "반려견 Instagram",
    url: "https://www.instagram.com/ddo_noniii/",
    icon: Dog,
  },
];
const pageIcons = { intro: Info, diagram: GitBranch, related: BookOpen };
export default function SidebarNavigation({
  isMobile = false,
  onItemClick,
}: {
  isMobile?: boolean;
  onItemClick?: () => void;
}) {
  const pathname = usePathname();
  const fileId = useSearchParams().get("file");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    portfolio: true,
  });
  const [restored, setRestored] = useState(false);
  const [width, setWidth] = useState(260);
  useEffect(() => {
    let saved: Record<string, boolean> = { portfolio: true };
    try {
      const value: unknown = JSON.parse(
        localStorage.getItem("sidebarExpandedState") || "null",
      );
      if (value && typeof value === "object" && !Array.isArray(value))
        saved = Object.fromEntries(
          Object.entries(value).filter(([, v]) => typeof v === "boolean"),
        );
    } catch {
      /* Storage is optional. */
    }
    setExpanded(saved);
    setRestored(true);
  }, []);
  useEffect(() => {
    if (!restored) return;
    const project = fileId ? getProjectPage(fileId)?.project : undefined;
    if (project)
      setExpanded((previous) =>
        previous.portfolio && previous[project.id]
          ? previous
          : { ...previous, portfolio: true, [project.id]: true },
      );
  }, [fileId, restored]);
  useEffect(() => {
    if (restored) {
      try {
        localStorage.setItem("sidebarExpandedState", JSON.stringify(expanded));
      } catch {
        /* Storage is optional. */
      }
    }
  }, [expanded, restored]);
  const toggle = (id: string) =>
    setExpanded((previous) => ({ ...previous, [id]: !previous[id] }));
  return (
    <div className="flex h-full">
      <nav
        aria-label="사이트 탐색"
        className="sidebar"
        style={
          isMobile ? { width: "100%" } : { width, minWidth: 160, maxWidth: 500 }
        }
      >
        <div className="viewer-header mt-12 md:mt-0">탐색기</div>
        <div className="p-2 overflow-auto flex-1">
          {[
            { path: "/about", name: "소개", icon: User },
            { path: "/resume", name: "이력서", icon: FileText },
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={onItemClick}
              aria-current={
                pathname.replace(/\/$/, "") === item.path ? "page" : undefined
              }
              className="file"
            >
              <item.icon size={16} />
              {item.name}
            </Link>
          ))}
          <button
            className="folder w-full"
            aria-expanded={Boolean(expanded.portfolio)}
            aria-controls="portfolio-tree"
            onClick={() => toggle("portfolio")}
          >
            {expanded.portfolio ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
            <Folder size={16} />
            포트폴리오
          </button>
          {expanded.portfolio && (
            <div id="portfolio-tree" className="files-container">
              {projects.map((project) => (
                <div key={project.id}>
                  <button
                    className="folder w-full"
                    aria-expanded={Boolean(expanded[project.id])}
                    aria-controls={`tree-${project.id}`}
                    onClick={() => toggle(project.id)}
                  >
                    {expanded[project.id] ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                    <ProjectIcon icon={project.icon} />
                    {project.name}
                  </button>
                  {expanded[project.id] && (
                    <div id={`tree-${project.id}`} className="files-container">
                      {project.pages.map((page) => {
                        const Icon = pageIcons[page.type];
                        const active =
                          pathname.replace(/\/$/, "") === "/portfolio" &&
                          fileId === page.id;
                        return (
                          <Link
                            key={page.id}
                            href={`/portfolio?file=${page.id}`}
                            onClick={onItemClick}
                            aria-current={active ? "page" : undefined}
                            className={`file ${active ? "active-file" : ""}`}
                          >
                            <Icon size={16} />
                            {page.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center gap-4 p-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              title={link.name}
              className="hover:text-[var(--blue)]"
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>
      </nav>
      {!isMobile && (
        <ResizeHandle sidebarWidth={width} setSidebarWidth={setWidth} />
      )}
    </div>
  );
}
