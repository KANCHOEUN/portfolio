"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
} from "lucide-react"
import ResizeHandle from "./resize-handle"
import { useLanguage } from "@/contexts/language-context"

// Add this near the top of the file, after imports
const fallbackTranslations = {
  en: {
    header: {
      about: "About",
      resume: "Resume",
      portfolio: "Portfolio",
    },
    portfolio: {
      explorer: "EXPLORER",
      noFile: "No file is open",
      fileNotFound: "File not found",
    },
  },
  kr: {
    header: {
      about: "소개",
      resume: "이력서",
      portfolio: "포트폴리오",
    },
    portfolio: {
      explorer: "탐색기",
      noFile: "열린 파일이 없습니다",
      fileNotFound: "파일을 찾을 수 없습니다",
    },
  },
}

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
        id: "project1",
        name: "Project One",
        isFolder: true,
        children: [
          { id: "intro1", name: "소개", path: "/portfolio?file=intro1" },
          { id: "diagram1", name: "다이어그램", path: "/portfolio?file=diagram1" },
          { id: "related1", name: "관련 글", path: "/portfolio?file=related1" },
        ],
      },
      {
        id: "project2",
        name: "Project Two",
        isFolder: true,
        children: [
          { id: "intro2", name: "소개", path: "/portfolio?file=intro2" },
          { id: "diagram2", name: "다이어그램", path: "/portfolio?file=diagram2" },
          { id: "related2", name: "관련 글", path: "/portfolio?file=related2" },
        ],
      },
      {
        id: "project3",
        name: "Project Three",
        isFolder: true,
        children: [
          { id: "intro3", name: "소개", path: "/portfolio?file=intro3" },
          { id: "diagram3", name: "다이어그램", path: "/portfolio?file=diagram3" },
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
  { id: "github", name: "GitHub", url: "https://github.com/username", icon: Github },
  { id: "linkedin", name: "LinkedIn", url: "https://linkedin.com/in/username", icon: Linkedin },
  { id: "blog", name: "Blog", url: "https://blog.example.com", icon: Newspaper },
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

// Then modify the SidebarNavigation function to handle potential context errors
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

  // Add a try/catch for the language context
  // let languageContext
  const [language, setLanguage] = useState<"en" | "kr">("en")
  const [translations, setTranslations] = useState(fallbackTranslations)
  const [toggleLanguageFunction, setToggleLanguage] = useState(() => {})

  const context = useLanguage()
  useEffect(() => {
    setLanguage(context.language)
    setTranslations(context.translations)
    setToggleLanguage(() => context.toggleLanguage)
  }, [context.language, context.translations, context.toggleLanguage])

  // const { language, translations } = languageContext;

  // Rest of the component remains the same...
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    portfolio: true, // Portfolio is expanded by default
  })
  const [sidebarWidth, setSidebarWidth] = useState(260) // Default width

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
    } else if (fileName.includes("다이어그램")) {
      return <GitBranch size={16} className="text-[#c678dd] dark:text-[#c678dd] light:text-[#a626a4] flex-shrink-0" />
    } else if (fileName.includes("관련 글")) {
      return <BookOpen size={16} className="text-[#98c379] dark:text-[#98c379] light:text-[#50a14f] flex-shrink-0" />
    } else if (item.icon) {
      return <item.icon size={16} className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] flex-shrink-0" />
    } else {
      return <FileText size={16} className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] flex-shrink-0" />
    }
  }

  // Translate navigation items
  const getTranslatedName = (id: string, name: string) => {
    if (language === "kr") {
      if (id === "about") return translations.kr.header.about
      if (id === "resume") return translations.kr.header.resume
      if (id === "portfolio") return translations.kr.header.portfolio
    }
    return name
  }

  const renderItems = (items: any[], level = 0) => {
    return items.map((item) => (
      <div key={item.id} className="project-container">
        {item.isFolder ? (
          <>
            <div
              className={`folder ${level > 0 ? "pl-" + level * 4 : ""}`}
              onClick={(e) => {
                if (item.path && !item.children) {
                  handleItemClick(item)
                } else {
                  toggleItem(item.id, e)
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
              isItemActive(item) ? "active-file dark:bg-[#2c313a] light:bg-[#eaeaeb]" : ""
            }`}
            onClick={() => handleItemClick(item)}
          >
            {getFileIcon(item.name, item)}
            <span className="truncate">{item.name}</span>
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="flex h-full">
      <div
        className="h-full bg-[#21252b] dark:bg-[#21252b] light:bg-[#f0f0f0] border-r border-[#343a47] dark:border-[#343a47] light:border-[#d4d4d4] overflow-hidden flex flex-col"
        style={isMobile ? { width: "100%" } : { width: `${sidebarWidth}px`, minWidth: "160px", maxWidth: "500px" }}
      >
        <div className="px-4 py-2 text-sm text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] font-medium border-b border-[#343a47] dark:border-[#343a47] light:border-[#d4d4d4] h-[38px] flex items-center z-40 mt-12 md:mt-0">
          {translations[language].portfolio.explorer}
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

          {/* Contact information */}
          {/*
          <div className="text-xs text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42]">
            <div className="flex items-center mb-1">
              <Mail size={14} className="mr-1 text-[#e5c07b] dark:text-[#e5c07b] light:text-[#c18401]" />
              <a
                href={`mailto:${contactInfo.email}`}
                className="hover:text-[#61afef] dark:hover:text-[#61afef] light:hover:text-[#4078f2] transition-colors truncate"
              >
                {contactInfo.email}
              </a>
            </div>
            <div className="flex items-center">
              <Phone size={14} className="mr-1 text-[#e5c07b] dark:text-[#e5c07b] light:text-[#c18401]" />
              <a
                href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
                className="hover:text-[#61afef] dark:hover:text-[#61afef] light:hover:text-[#4078f2] transition-colors"
              >
                {contactInfo.phone}
              </a>
            </div>
          </div>
          */}
        </div>
      </div>
      {!isMobile && <ResizeHandle sidebarWidth={sidebarWidth} setSidebarWidth={setSidebarWidth} />}
    </div>
  )
}
