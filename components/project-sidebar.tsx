"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Folder, FileText } from "lucide-react"

// Sample project data
const projects = [
  {
    id: "project1",
    name: "Project One",
    pages: [
      { id: "intro1", name: "소개", type: "file" },
      { id: "diagram1", name: "다이어그램", type: "file" },
      { id: "related1", name: "관련 글", type: "file" },
    ],
  },
  {
    id: "project2",
    name: "Project Two",
    pages: [
      { id: "intro2", name: "소개", type: "file" },
      { id: "diagram2", name: "다이어그램", type: "file" },
      { id: "related2", name: "관련 글", type: "file" },
    ],
  },
  {
    id: "project3",
    name: "Project Three",
    pages: [
      { id: "intro3", name: "소개", type: "file" },
      { id: "diagram3", name: "다이어그램", type: "file" },
      { id: "related3", name: "관련 글", type: "file" },
    ],
  },
]

interface ProjectSidebarProps {
  setActiveFile: (fileId: string) => void
  activeFile: string | null
}

export default function ProjectSidebar({ setActiveFile, activeFile }: ProjectSidebarProps) {
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({})

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }))
  }

  const handleFileClick = (fileId: string) => {
    setActiveFile(fileId)
  }

  // Function to check if a file is active
  const isFileActive = (fileId: string) => {
    return activeFile === fileId
  }

  return (
    <div className="h-full bg-[#21252b] dark:bg-[#21252b] light:bg-gray-100 border-r border-[#181a1f] dark:border-[#181a1f] light:border-gray-200 overflow-y-auto">
      <div className="px-4 py-2 text-sm text-[#abb2bf] dark:text-[#abb2bf] light:text-gray-800 font-medium border-b border-[#181a1f] dark:border-[#181a1f] light:border-gray-200 h-[38px] flex items-center">
        EXPLORER
      </div>
      <div className="p-2">
        {projects.map((project) => (
          <div key={project.id} className="project-container mb-2">
            <div className="folder dark:text-[#abb2bf] light:text-gray-800" onClick={() => toggleProject(project.id)}>
              {expandedProjects[project.id] ? (
                <ChevronDown size={16} className="text-[#6b717d] dark:text-[#6b717d] light:text-gray-500" />
              ) : (
                <ChevronRight size={16} className="text-[#6b717d] dark:text-[#6b717d] light:text-gray-500" />
              )}
              <Folder size={16} className="text-[#e5c07b] dark:text-[#e5c07b] light:text-yellow-600" />
              <span>{project.name}</span>
            </div>

            {expandedProjects[project.id] && (
              <div className="files-container dark:border-[#3e4451] light:border-gray-300">
                {project.pages.map((page) => (
                  <div
                    key={page.id}
                    className={`file dark:text-[#abb2bf] light:text-gray-800 ${isFileActive(page.id) ? "active-file dark:bg-[#2c313a] light:bg-gray-200" : ""}`}
                    onClick={() => handleFileClick(page.id)}
                  >
                    <FileText size={16} className="text-[#61afef] dark:text-[#61afef] light:text-blue-600" />
                    <span>{page.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
