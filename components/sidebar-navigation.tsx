"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  ChevronDown,
  ChevronRight,
  Dog,
  Folder,
  FileText,
  User,
  Info,
  GitBranch,
  BookOpen,
  Github,
  Linkedin,
  Newspaper,
  PiggyBankIcon as Pig,
  Fish,
  Leaf,
  Bot,
} from "lucide-react"
import ResizeHandle from "./resize-handle"
import { useLanguage } from "@/contexts/language-context"

// Main navigation structure
const mainNavigation = [
  { id: "about", name: "About", path: "/about", icon: User },
  { id: "resume", name: "Resume", path: "/resume" },
  {
    id: "portfolio",
    name: "Portfolio",
    path: "/portfolio",
    isFolder: true,
    children: [
      {
        id: "project4",
        name: "Mockly",
        isFolder: true,
        children: [
          { id: "intro4", name: "소개", path: "/portfolio?file=intro4" },
          { id: "diagram4", name: "설계 및 구현", path: "/portfolio?file=diagram4" },
          { id: "related4", name: "관련 글", path: "/portfolio?file=related4" },
        ],
      },
      {
        id: "project1",
        name: "Pigrest",
        isFolder: true,
        children: [
          { id: "intro1", name: "소개", path: "/portfolio?file=intro1" },
          { id: "diagram1", name: "설계 및 구현", path: "/portfolio?file=diagram1" },
          { id: "related1", name: "관련 글", path: "/portfolio?file=related1" },
        ],
      },
      {
        id: "project2",
        name: "RE-VERSE",
        isFolder: true,
        children: [
          { id: "intro2", name: "소개", path: "/portfolio?file=intro2" },
          { id: "diagram2", name: "설계 및 구현", path: "/portfolio?file=diagram2" },
          { id: "related2", name: "관련 글", path: "/portfolio?file=related2" },
        ],
      },
      {
        id: "project3",
        name: "PARSLEY",
        isFolder: true,
        children: [
          { id: "intro3", name: "소개", path: "/portfolio?file=intro3" },
          { id: "diagram3", name: "설계 및 구현", path: "/portfolio?file=diagram3" },
          { id: "related3", name: "관련 글", path: "/portfolio?file=related3" },
        ],
      },
    ],
  },
]

// Contact information
const contactInfo = {
  email: "kancho1216@naver.com",
  // phone: "+82 10-1234-5678",
}

// Social media links
const socialLinks = [
  { id: "github", name: "GitHub", url: "https://github.com/KANCHOEUN", icon: Github },
  { id: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/in/hyeeun-cho-307554211", icon: Linkedin },
  { id: "blog", name: "Blog", url: "https://kanchoeun.github.io/", icon: Newspaper },
  { id: "ddo_nonii", name: "Dog", url: "https://www.instagram.com/ddo_noniii/", icon: Dog },
]

interface SidebarNavigationProps {
  setActiveFile?: (fileId: string | null) => void
  activeFile?: string | null
  isMobile?: boolean
  onItemClick?: () => void
}

// Helper function to find a file path in the navigation structure
const findFileInNavigation = (fileId: string, items: any[]): string | null => {
  for (const item of items) {
    if (item.isFolder && item.children) {
      const foundPath = findFileInNavigation(fileId, item.children)
      if (foundPath) return foundPath
    } else if (item.path && item.path.includes(`file=${fileId}`)) {
      return item.path
    }
  }
  return null
}

// Helper function to get parent folders of a file
const getParentFolders = (fileId: string, items: any[], parents: string[] = []): string[] => {
  for (const item of items) {
    if (item.isFolder && item.children) {
      const newParents = [...parents, item.id]
      const foundParents = getParentFolders(fileId, item.children, newParents)
      if (foundParents.length > 0) return foundParents
    } else if (item.path && item.path.includes(`file=${fileId}`)) {
      return parents
    }
  }
  return []
}

export default function SidebarNavigation({
  setActiveFile,
  activeFile,
  isMobile = false,
  onItemClick,
}: SidebarNavigationProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const fileParam = searchParams.get("file")

  // useLanguage 훅을 직접 사용하고 language 의존성 추가
  const { t, language } = useLanguage()

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    portfolio: true, // Portfolio is expanded by default
  })
  const [sidebarWidth, setSidebarWidth] = useState(260) // Default width
  const [forceUpdate, setForceUpdate] = useState(0) // 강제 리렌더링용

  // Load expanded state from localStorage on mount
  useEffect(() => {
    const savedExpandedState = localStorage.getItem("sidebarExpandedState")
    if (savedExpandedState) {
      try {
        const parsedState = JSON.parse(savedExpandedState)
        setExpandedItems(parsedState)
      } catch (e) {
        console.error("Failed to parse saved sidebar state", e)
      }
    }
  }, [])

  // Save expanded state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sidebarExpandedState", JSON.stringify(expandedItems))
  }, [expandedItems])

  // Auto-expand parent folders when a file is active, but preserve other expanded folders
  useEffect(() => {
    if (fileParam) {
      const parentFolders = getParentFolders(fileParam, mainNavigation)
      if (parentFolders.length > 0) {
        // Only add new folders to expanded state, don't reset existing ones
        setExpandedItems((prev) => {
          const newExpandedItems = { ...prev }
          parentFolders.forEach((folder) => {
            newExpandedItems[folder] = true
          })
          return newExpandedItems
        })
      }
    }
  }, [fileParam])

  // 언어 변경 이벤트 리스너 추가
  useEffect(() => {
    const handleLanguageChange = () => {
      setForceUpdate((prev) => prev + 1)
    }

    window.addEventListener("languageChange", handleLanguageChange)
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange)
    }
  }, [])

  const toggleItem = (itemId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  const handleItemClick = (item: any) => {
    if (item.path) {
      router.push(item.path)
      if (item.path.includes("?file=") && setActiveFile) {
        const fileId = item.path.split("=")[1]
        setActiveFile(fileId)
      }
      if (onItemClick) {
        onItemClick()
      }
    }
  }

  const isItemActive = (item: any) => {
    if (item.path && !item.path.includes("?file=")) {
      return pathname === item.path
    }
    if (item.path && item.path.includes("?file=") && fileParam) {
      const fileId = item.path.split("=")[1]
      return fileId === fileParam
    }
    return false
  }

  const getFileIcon = (fileName: string, item: any) => {
    if (fileName.includes("소개")) {
      return <Info size={16} className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] flex-shrink-0" />
    } else if (fileName.includes("설계 및 구현")) {
      return <GitBranch size={16} className="text-[#c678dd] dark:text-[#c678dd] light:text-[#a626a4] flex-shrink-0" />
    } else if (fileName.includes("관련 글")) {
      return <BookOpen size={16} className="text-[#98c379] dark:text-[#98c379] light:text-[#50a14f] flex-shrink-0" />
    } else if (item.icon) {
      return <item.icon size={16} className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] flex-shrink-0" />
    } else {
      return <FileText size={16} className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] flex-shrink-0" />
    }
  }

  // 번역된 이름을 가져오는 함수를 useCallback으로 감싸서 language 변경 시 재계산
  const getTranslatedName = useCallback(
    (id: string, name: string) => {
      try {
        if (id === "about") return t("header.about")
        if (id === "resume") return t("header.resume")
        if (id === "portfolio") return t("header.portfolio")
      } catch (error) {
        console.warn("Translation error for key:", id, error)
      }
      return name
    },
    [t],
  )

  // 프로젝트 파일 이름도 번역 적용
  const getTranslatedFileName = useCallback(
    (fileName: string) => {
      try {
        if (fileName === "소개") return t("project.intro")
        if (fileName === "다이어그램") return t("project.diagram")
        if (fileName === "관련 글") return t("project.related")
      } catch (error) {
        console.warn("Translation error for file name:", fileName, error)
      }
      return fileName
    },
    [t],
  )

  // renderItems 함수에서 번역된 파일 이름 사용
  const renderItems = useCallback(
    (items: any[], level = 0) => {
      const handleClick = (item: any) => {
        if (item.path) {
          router.push(item.path)
          if (item.path.includes("?file=") && setActiveFile) {
            const fileId = item.path.split("=")[1]
            setActiveFile(fileId)
          }
          if (onItemClick) {
            onItemClick()
          }
        }
      }

      const toggle = (itemId: string, event: React.MouseEvent) => {
        event.stopPropagation()
        setExpandedItems((prev) => ({
          ...prev,
          [itemId]: !prev[itemId],
        }))
      }

      const isActive = (item: any) => {
        if (item.path && !item.path.includes("?file=")) {
          return pathname === item.path
        }
        if (item.path && item.path.includes("?file=") && fileParam) {
          const fileId = item.path.split("=")[1]
          return fileId === fileParam
        }
        return false
      }

      return items.map((item) => (
        <div key={item.id} className="project-container">
          {item.isFolder ? (
            <>
              <div
                className={`folder ${level > 0 ? "pl-" + level * 4 : ""}`}
                onClick={(e) => {
                  if (item.path && !item.children) {
                    handleClick(item)
                  } else {
                    toggle(item.id, e)
                  }
                }}
              >
                {item.children && (
                  <>
                    {expandedItems[item.id] ? (
                      <ChevronDown
                        size={16}
                        className="text-[#6b717d] dark:text-[#6b717d] light:text-gray-500 flex-shrink-0"
                      />
                    ) : (
                      <ChevronRight
                        size={16}
                        className="text-[#6b717d] dark:text-[#6b717d] light:text-gray-500 flex-shrink-0"
                      />
                    )}
                  </>
                )}
                {item.id === "project1" ? (
                  <Pig size={16} className="text-[#e06c75] dark:text-[#e06c75] light:text-[#e45649] flex-shrink-0" />
                ) : item.id === "project2" ? (
                  <Fish size={16} className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] flex-shrink-0" />
                ) : item.id === "project3" ? (
                  <Leaf size={16} className="text-[#98c379] dark:text-[#98c379] light:text-[#50a14f] flex-shrink-0" />
                ) : item.id === "project4" ? (
                  <Bot size={16} className="text-[#c678dd] dark:text-[#c678dd] light:text-[#a626a4] flex-shrink-0" />
                ) : (
                  <Folder size={16} className="text-[#e5c07b] dark:text-[#e5c07b] light:text-[#c18401] flex-shrink-0" />
                )}
                <span className="truncate">{getTranslatedName(item.id, item.name)}</span>
              </div>
              {item.children && expandedItems[item.id] && (
                <div className="files-container dark:border-[#3e4451] light:border-[#d4d4d4]">
                  {renderItems(item.children, level + 1)}
                </div>
              )}
            </>
          ) : (
            <div
              className={`file ${level > 0 ? "pl-" + level * 4 : ""} ${
                isActive(item) ? "active-file dark:bg-[#2c313a] light:bg-[#eaeaeb]" : ""
              }`}
              onClick={() => handleClick(item)}
            >
              {getFileIcon(item.name, item)}
              <span className="truncate">{getTranslatedFileName(item.name)}</span>
            </div>
          )}
        </div>
      ))
    },
    [expandedItems, getTranslatedName, getTranslatedFileName, pathname, fileParam, router, setActiveFile, onItemClick],
  )

  return (
    <div key={forceUpdate} className="flex h-full">
      <div
        className="h-full bg-[#21252b] dark:bg-[#21252b] light:bg-[#f0f0f0] border-r border-[#343a47] dark:border-[#343a47] light:border-[#d4d4d4] overflow-hidden flex flex-col"
        style={isMobile ? { width: "100%" } : { width: `${sidebarWidth}px`, minWidth: "160px", maxWidth: "500px" }}
      >
        <div className="px-4 py-2 text-sm text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] font-medium border-b border-[#343a47] dark:border-[#343a47] light:border-[#d4d4d4] h-[38px] flex items-center z-40 mt-12 md:mt-0">
          {t("portfolio.explorer")}
        </div>

        {/* Main navigation */}
        <div className="p-2 overflow-y-auto overflow-x-hidden flex-grow">{renderItems(mainNavigation)}</div>

        {/* Social links */}
        <div className="p-6">
          <div className="flex justify-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] hover:text-[#61afef] dark:hover:text-[#61afef] light:hover:text-[#4078f2] transition-colors"
                title={link.name}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
      {!isMobile && <ResizeHandle sidebarWidth={sidebarWidth} setSidebarWidth={setSidebarWidth} />}
    </div>
  )
}
