"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { FileCode, X, PiggyBankIcon as Pig, Fish, Leaf, ExternalLink } from "lucide-react"
import BlogCard from "./blog-card"
import IframeViewer from "./iframe-viewer"
import { useLanguage } from "@/contexts/language-context"
import { useSearchParams, useRouter } from "next/navigation"

// Add fallback translations
const fallbackTranslations = {
  en: {
    portfolio: {
      explorer: "EXPLORER",
      noFile: "No file is open",
      fileNotFound: "File not found",
    },
  },
  kr: {
    portfolio: {
      explorer: "탐색기",
      noFile: "열린 파일이 없습니다",
      fileNotFound: "파일을 찾을 수 없습니다",
    },
  },
}

interface EditorContentProps {
  activeFile: string | null
  setActiveFile: (fileId: string | null) => void
}

interface OpenTab {
  id: string
  title: string
  type: "file" | "blog"
  url?: string
  projectIcon?: React.ReactNode
}

// Sample blog posts data with real URLs
const blogPosts = [
  {
    id: "how-we-built-project-one",
    title: "How We Built Project One",
    description:
      "A deep dive into the development process of Project One, including the challenges we faced and how we overcame them.",
    image: "/placeholder.svg?height=200&width=300",
    url: "https://kanchoeun.github.io/posts/UUID-%EC%A0%81%EC%9A%A9%EA%B8%B0/",
  },
  {
    id: "lessons-learned",
    title: "Lessons Learned from Project One",
    description: "Key insights and takeaways from developing and launching Project One, with tips for future projects.",
    image: "/placeholder.svg?height=200&width=300",
    url: "https://kanchoeun.github.io/posts/%EA%B3%B5%ED%86%B5-%EC%9D%91%EB%8B%B5-%ED%98%95%EC%8B%9D-%EC%A0%81%EC%9A%A9%EA%B8%B0/",
  },
  {
    id: "case-study",
    title: "Project One: A Case Study",
    description:
      "An in-depth analysis of Project One's architecture, performance optimizations, and user experience design.",
    image: "/placeholder.svg?height=200&width=300",
    url: "https://vercel.com",
  },
  {
    id: "future-roadmap",
    title: "The Future of Project One",
    description: "Upcoming features, improvements, and the roadmap for Project One's continued development and growth.",
    image: "/placeholder.svg?height=200&width=300",
    url: "https://nextjs.org",
  },
  {
    id: "user-engagement",
    title: "User Engagement Analysis",
    description:
      "A detailed analysis of user engagement metrics for Project Two, with insights on improving retention.",
    image: "/placeholder.svg?height=200&width=300",
    url: "https://tailwindcss.com",
  },
  {
    id: "performance-optimization",
    title: "Performance Optimization",
    description: "How we optimized Project Two for better performance on mobile devices with limited resources.",
    image: "/placeholder.svg?height=200&width=300",
    url: "https://react.dev",
  },
  {
    id: "health-api-documentation",
    title: "Health API Documentation",
    description: "Comprehensive documentation for the Health API used in Project Two, with examples and use cases.",
    image: "/placeholder.svg?height=200&width=300",
    url: "https://developer.mozilla.org",
  },
  {
    id: "scalable-data-processing",
    title: "Scalable Data Processing",
    description:
      "Learn about the scalable data processing techniques used in Project Three for handling large datasets efficiently.",
    image: "/placeholder.svg?height=200&width=300",
    url: "https://aws.amazon.com",
  },
  {
    id: "machine-learning-models",
    title: "Machine Learning Models",
    description: "An overview of the machine learning models implemented in Project Three for predictive analytics.",
    image: "/placeholder.svg?height=200&width=300",
    url: "https://tensorflow.org",
  },
  {
    id: "data-visualization-techniques",
    title: "Data Visualization Techniques",
    description: "How we created intuitive data visualizations to help users understand complex datasets at a glance.",
    image: "/placeholder.svg?height=200&width=300",
    url: "https://d3js.org",
  },
  {
    id: "team-structure",
    title: "Team Structure and Collaboration",
    description:
      "How our cross-functional team of data scientists, engineers, and designers collaborated to build Project Three.",
    image: "/placeholder.svg?height=200&width=300",
    url: "https://github.com/features/issues",
  },
]

// 파일 타입에 따른 페이지 이름 매핑
const filePageNames: Record<string, string> = {
  intro1: "소개",
  diagram1: "다이어그램",
  related1: "관련 글",
  intro2: "소개",
  diagram2: "다이어그램",
  related2: "관련 글",
  intro3: "소개",
  diagram3: "다이어그램",
  related3: "관련 글",
}

// 프로젝트 아이콘 매핑
const getProjectIcon = (fileId: string) => {
  if (fileId.includes("1")) {
    return <Pig size={16} className="text-[#e06c75] dark:text-[#e06c75] light:text-[#e45649] flex-shrink-0" />
  } else if (fileId.includes("2")) {
    return <Fish size={16} className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] flex-shrink-0" />
  } else if (fileId.includes("3")) {
    return <Leaf size={16} className="text-[#98c379] dark:text-[#98c379] light:text-[#50a14f] flex-shrink-0" />
  }
  return <FileCode size={16} className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] flex-shrink-0" />
}

// Sample content for files - now with custom HTML content instead of markdown
const fileContents: Record<string, { project: string; content: React.ReactNode }> = {
  intro1: {
    project: "Project One",
    content: (
      <div className="p-6 content-padding">
        <h1 className="text-2xl font-bold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-8 py-4">
          Project One Introduction
        </h1>
        <p className="mb-4 dark:text-[#abb2bf] light:text-[#383a42]">
          This is the introduction to Project One. It includes the project overview, goals, and key features.
        </p>
        <h2 className="text-xl font-semibold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-2">Overview</h2>
        <p className="dark:text-[#abb2bf] light:text-[#383a42]">
          Project One is a web application that helps users manage their tasks efficiently.
        </p>
      </div>
    ),
  },
  diagram1: {
    project: "Project One",
    content: (
      <div className="p-6 content-padding">
        <h1 className="text-2xl font-bold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-8 py-4">
          Project One Diagram
        </h1>
        <p className="mb-4 dark:text-[#abb2bf] light:text-[#383a42]">
          This page contains the architecture diagram and flow charts for Project One.
        </p>
        <h2 className="text-xl font-semibold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-2">
          Architecture
        </h2>
        <p className="mb-4 dark:text-[#abb2bf] light:text-[#383a42]">
          The application follows a microservices architecture with the following components:
        </p>
        <ul className="list-disc pl-6 mb-4 dark:text-[#abb2bf] light:text-[#383a42]">
          <li className="mb-1">Frontend (React)</li>
          <li className="mb-1">Backend API (Node.js)</li>
          <li className="mb-1">Database (MongoDB)</li>
        </ul>
      </div>
    ),
  },
  related1: {
    project: "Project One",
    content: (
      <div className="p-6 content-padding">
        <h1 className="text-2xl font-bold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-8 py-4">
          Related Articles
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {blogPosts.slice(0, 4).map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              description={post.description}
              image={post.image}
              url={post.url}
            />
          ))}
        </div>
      </div>
    ),
  },
  // Add more content for other files as needed
  intro2: {
    project: "Project Two",
    content: (
      <div className="p-6 content-padding">
        <h1 className="text-2xl font-bold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-8 py-4">
          Project Two Introduction
        </h1>
        <p className="mb-4 dark:text-[#abb2bf] light:text-[#383a42]">
          Project Two is a mobile application built with React Native. It focuses on health tracking and wellness.
        </p>
        <h2 className="text-xl font-semibold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-2">
          Key Features
        </h2>
        <ul className="list-disc pl-6 dark:text-[#abb2bf] light:text-[#383a42]">
          <li className="mb-1">Activity tracking</li>
          <li className="mb-1">Meal planning</li>
          <li className="mb-1">Sleep analysis</li>
        </ul>
      </div>
    ),
  },
  diagram2: {
    project: "Project Two",
    content: (
      <div className="p-6 content-padding">
        <h1 className="text-2xl font-bold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-8 py-4">
          Project Two Architecture
        </h1>
        <h2 className="text-xl font-semibold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-2">
          System Design
        </h2>
        <div className="bg-[#2c313a] dark:bg-[#2c313a] light:bg-[#eaeaeb] p-4 rounded font-mono mb-4 dark:text-[#abb2bf] light:text-[#383a42]">
          Mobile App → API Gateway → Microservices → Database
        </div>
        <h2 className="text-xl font-semibold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-2">
          Technology Stack
        </h2>
        <ul className="list-disc pl-6 dark:text-[#abb2bf] light:text-[#383a42]">
          <li className="mb-1">React Native</li>
          <li className="mb-1">Node.js</li>
          <li className="mb-1">MongoDB</li>
          <li className="mb-1">AWS</li>
        </ul>
      </div>
    ),
  },
  related2: {
    project: "Project Two",
    content: (
      <div className="p-6 content-padding">
        <h1 className="text-2xl font-bold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-8 py-4">
          Project Two Resources
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {blogPosts.slice(4, 7).map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              description={post.description}
              image={post.image}
              url={post.url}
            />
          ))}
        </div>
      </div>
    ),
  },
  intro3: {
    project: "Project Three",
    content: (
      <div className="p-6 content-padding">
        <h1 className="text-2xl font-bold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-8 py-4">
          Project Three Overview
        </h1>
        <p className="mb-4 dark:text-[#abb2bf] light:text-[#383a42]">
          Project Three is an AI-powered data analysis platform for business intelligence.
        </p>
        <h2 className="text-xl font-semibold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-2">
          Problem Statement
        </h2>
        <p className="dark:text-[#abb2bf] light:text-[#383a42]">
          Businesses struggle to extract meaningful insights from large datasets efficiently.
        </p>
      </div>
    ),
  },
  diagram3: {
    project: "Project Three",
    content: (
      <div className="p-6 content-padding">
        <h1 className="text-2xl font-bold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-8 py-4">
          Project Three System Architecture
        </h1>
        <h2 className="text-xl font-semibold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-2">
          High-Level Design
        </h2>
        <ul className="list-disc pl-6 mb-4 dark:text-[#abb2bf] light:text-[#383a42]">
          <li className="mb-1">Data Collection Layer</li>
          <li className="mb-1">Processing Engine</li>
          <li className="mb-1">Analysis Framework</li>
          <li className="mb-1">Visualization Dashboard</li>
        </ul>
        <h2 className="text-xl font-semibold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-2">
          Data Flow
        </h2>
        <div className="bg-[#2c313a] dark:bg-[#2c313a] light:bg-[#eaeaeb] p-4 rounded font-mono dark:text-[#abb2bf] light:text-[#383a42]">
          Raw Data → ETL Pipeline → Data Lake → Analysis → Visualization
        </div>
      </div>
    ),
  },
  related3: {
    project: "Project Three",
    content: (
      <div className="p-6 content-padding">
        <h1 className="text-2xl font-bold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-8 py-4">
          Project Three Documentation
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {blogPosts.slice(7).map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              description={post.description}
              image={post.image}
              url={post.url}
            />
          ))}
        </div>
      </div>
    ),
  },
}

// Map project files to their related blog posts
const fileToBlogPostsMap: Record<string, string[]> = {
  related1: ["how-we-built-project-one", "lessons-learned", "case-study", "future-roadmap"],
  related2: ["user-engagement", "performance-optimization", "health-api-documentation"],
  related3: ["scalable-data-processing", "machine-learning-models", "data-visualization-techniques", "team-structure"],
}

// Simplify the EditorContent component to use useLanguage directly
export default function EditorContent({ activeFile, setActiveFile }: EditorContentProps) {
  const { language, translations } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()
  const fileParam = searchParams.get("file")
  const [openTabs, setOpenTabs] = useState<OpenTab[]>([])
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [selectedBlog, setSelectedBlog] = useState<{ url: string; title: string } | null>(null)
  const [isMobileView, setIsMobileView] = useState(false)
  const [currentFile, setCurrentFile] = useState<string | null>(null)
  const tabsHeaderRef = useRef<HTMLDivElement>(null)

  // 화면 크기 감지
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    checkMobileView()
    window.addEventListener("resize", checkMobileView)

    return () => {
      window.removeEventListener("resize", checkMobileView)
    }
  }, [])

  // 파일 파라미터 변경 감지
  useEffect(() => {
    setCurrentFile(fileParam || activeFile)
  }, [fileParam, activeFile])

  // 파일이 변경될 때 탭 업데이트
  useEffect(() => {
    if (currentFile && fileContents[currentFile]) {
      // 이미 열려있는 탭인지 확인
      const existingTabIndex = openTabs.findIndex((tab) => tab.id === currentFile && tab.type === "file")

      if (existingTabIndex === -1) {
        // 새 탭 추가
        setOpenTabs((prev) => [
          ...prev,
          {
            id: currentFile,
            title: filePageNames[currentFile] || currentFile,
            type: "file",
            projectIcon: getProjectIcon(currentFile),
          },
        ])
      }

      // 활성 탭 설정
      setActiveTab(currentFile)
    }
  }, [currentFile, openTabs])

  // 탭 스크롤 이벤트 핸들러 추가
  useEffect(() => {
    const handleTabsScroll = (e: WheelEvent) => {
      const tabsHeader = tabsHeaderRef.current
      if (tabsHeader && tabsHeader.contains(e.target as Node)) {
        e.preventDefault()
        tabsHeader.scrollLeft += e.deltaY
      }
    }

    // 탭 헤더에 휠 이벤트 리스너 추가
    const tabsHeader = tabsHeaderRef.current
    if (tabsHeader) {
      tabsHeader.addEventListener("wheel", handleTabsScroll, { passive: false })
    }

    return () => {
      if (tabsHeader) {
        tabsHeader.removeEventListener("wheel", handleTabsScroll)
      }
    }
  }, [])

  // 블로그 카드 클릭 처리
  const handleBlogCardClick = (url: string, title: string) => {
    setSelectedBlog({ url, title })
  }

  // 블로그 뷰어 닫기
  const handleCloseBlogViewer = () => {
    setSelectedBlog(null)
  }

  // 탭 닫기
  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation()

    // 탭 제거
    setOpenTabs((prev) => prev.filter((tab) => tab.id !== tabId))

    // 닫은 탭이 활성 탭이었다면 다른 탭으로 전환
    if (activeTab === tabId) {
      if (openTabs.length > 1) {
        const tabIndex = openTabs.findIndex((tab) => tab.id === tabId)
        const newActiveTab = openTabs[tabIndex === 0 ? 1 : tabIndex - 1]
        setActiveTab(newActiveTab.id)

        // 파일 탭이면 URL 업데이트
        if (newActiveTab.type === "file") {
          setActiveFile(newActiveTab.id)
        }
      } else {
        // 마지막 탭을 닫는 경우
        setActiveTab(null)
        setActiveFile(null)
      }
    }

    // 파일 탭이면 activeFile 상태 업데이트
    if (openTabs.find((tab) => tab.id === tabId)?.type === "file") {
      if (tabId === currentFile) {
        setActiveFile(null)
      }
    }
  }

  // 탭 활성화
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)

    // 파일 탭이면 URL 업데이트
    const tab = openTabs.find((tab) => tab.id === tabId)
    if (tab?.type === "file") {
      setActiveFile(tabId)
    }
  }

  // 현재 활성 탭 가져오기
  const getActiveTabContent = () => {
    if (!activeTab) return null

    const tab = openTabs.find((tab) => tab.id === activeTab)
    if (!tab) return null

    if (tab.type === "file") {
      return fileContents[tab.id]?.content
    }

    return null
  }

  // 관련 글 목록 렌더링
  const renderRelatedArticles = (fileId: string) => {
    let filteredPosts: typeof blogPosts = []

    if (fileId === "related1") {
      filteredPosts = blogPosts.filter((post) =>
        ["how-we-built-project-one", "lessons-learned", "case-study", "future-roadmap"].includes(post.id),
      )
    } else if (fileId === "related2") {
      filteredPosts = blogPosts.filter((post) =>
        ["user-engagement", "performance-optimization", "health-api-documentation"].includes(post.id),
      )
    } else if (fileId === "related3") {
      filteredPosts = blogPosts.filter((post) =>
        [
          "scalable-data-processing",
          "machine-learning-models",
          "data-visualization-techniques",
          "team-structure",
        ].includes(post.id),
      )
    }

    return (
      <div className="p-6 content-padding">
        <h1 className="text-2xl font-bold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-8 py-4 sticky top-0 bg-[#282c34] dark:bg-[#282c34] light:bg-[#fafafa] z-10">
          {fileId.includes("1") ? "Project One" : fileId.includes("2") ? "Project Two" : "Project Three"} Related
          Articles
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPosts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              description={post.description}
              image={post.image}
              url={post.url}
              onClick={(url, title) => handleBlogCardClick(url, title)}
            />
          ))}
        </div>
      </div>
    )
  }

  // 탭이 없을 때 빈 화면 표시
  if (openTabs.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="text-center text-[#6b717d] dark:text-[#6b717d] light:text-gray-500">
          <FileCode size={48} className="mx-auto mb-4" />
          <h3 className="text-xl">{translations[language].portfolio.noFile}</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-[#282c34] dark:bg-[#282c34] light:bg-[#fafafa] flex flex-col h-full">
      {isMobileView ? (
        // 모바일 뷰에서 탭 방식으로 표시
        <div className="flex flex-col h-full">
          <div
            ref={tabsHeaderRef}
            className="tabs-header sticky top-0 z-10 bg-[#21252b] dark:bg-[#21252b] light:bg-[#f0f0f0] border-b border-[#343a47] dark:border-[#343a47] light:border-[#d4d4d4] flex overflow-x-auto"
          >
            {openTabs.map((tab) => (
              <div
                key={tab.id}
                className={`file-tab flex items-center cursor-pointer ${
                  activeTab === tab.id ? "border-b-2 border-[#61afef]" : ""
                }`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.projectIcon}
                <span className="text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] truncate max-w-[150px] ml-2">
                  {tab.title}
                </span>
                <button
                  className="ml-2 hover:text-[#e06c75] dark:hover:text-[#e06c75] light:hover:text-[#e45649]"
                  onClick={(e) => handleCloseTab(tab.id, e)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            {selectedBlog && (
              <div className="file-tab flex items-center cursor-pointer border-b-2 border-[#61afef]">
                <ExternalLink
                  size={16}
                  className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] flex-shrink-0"
                />
                <span className="text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] truncate max-w-[150px] ml-2">
                  {selectedBlog.title}
                </span>
                <button
                  className="ml-2 hover:text-[#e06c75] dark:hover:text-[#e06c75] light:hover:text-[#e45649]"
                  onClick={handleCloseBlogViewer}
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-auto">
            {selectedBlog ? (
              <IframeViewer url={selectedBlog.url} title={selectedBlog.title} onClose={handleCloseBlogViewer} />
            ) : (
              <div className="h-full">
                {activeTab &&
                openTabs.find((tab) => tab.id === activeTab)?.type === "file" &&
                currentFile &&
                currentFile.includes("related")
                  ? renderRelatedArticles(currentFile)
                  : getActiveTabContent()}
              </div>
            )}
          </div>
        </div>
      ) : (
        // 데스크톱 뷰에서 분할 화면으로 표시
        <div className="flex h-full">
          {/* 탭 헤더 */}
          <div
            className={`flex flex-col ${selectedBlog ? "w-1/2" : "w-full"}`}
            style={{ transition: "width 0.3s ease-in-out" }}
          >
            <div
              ref={tabsHeaderRef}
              className="tabs-header sticky top-0 z-10 bg-[#21252b] dark:bg-[#21252b] light:bg-[#f0f0f0] border-b border-[#343a47] dark:border-[#343a47] light:border-[#d4d4d4] flex overflow-x-auto"
            >
              {openTabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`file-tab flex items-center cursor-pointer ${
                    activeTab === tab.id ? "border-b-2 border-[#61afef]" : ""
                  }`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.projectIcon}
                  <span className="text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] truncate max-w-[150px] ml-2">
                    {tab.title}
                  </span>
                  <button
                    className="ml-2 hover:text-[#e06c75] dark:hover:text-[#e06c75] light:hover:text-[#e45649]"
                    onClick={(e) => handleCloseTab(tab.id, e)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* 콘텐츠 영역 */}
            <div className="flex-1 overflow-auto">
              {activeTab && (
                <div className="h-full">
                  {activeTab &&
                  openTabs.find((tab) => tab.id === activeTab)?.type === "file" &&
                  currentFile &&
                  currentFile.includes("related")
                    ? renderRelatedArticles(currentFile)
                    : getActiveTabContent()}
                </div>
              )}
            </div>
          </div>

          {/* 블로그 뷰어 */}
          {selectedBlog && (
            <div className="w-1/2 h-full border-l border-[#343a47] dark:border-[#343a47] light:border-[#d4d4d4]">
              <div className="file-tab flex justify-between bg-[#21252b] dark:bg-[#21252b] light:bg-[#f0f0f0] border-b border-[#343a47] dark:border-[#343a47] light:border-[#d4d4d4] sticky top-0 z-10">
                <div className="flex items-center overflow-hidden">
                  <ExternalLink
                    size={16}
                    className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] flex-shrink-0 mr-2"
                  />
                  <span className="text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] truncate">
                    {selectedBlog.title}
                  </span>
                </div>
                <button
                  onClick={handleCloseBlogViewer}
                  className="text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] hover:text-[#e06c75] dark:hover:text-[#e06c75] light:hover:text-[#e45649] transition-colors"
                  aria-label="Close viewer"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="h-[calc(100%-38px)]">
                <IframeViewer url={selectedBlog.url} title={selectedBlog.title} onClose={handleCloseBlogViewer} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
