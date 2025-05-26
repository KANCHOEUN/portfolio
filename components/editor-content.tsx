"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { FileCode, X, PiggyBankIcon as Pig, Fish, Leaf, ExternalLink, Calendar, Github, List } from "lucide-react"
import BlogCard from "./blog-card"
import IframeViewer from "./iframe-viewer"
import { useLanguage } from "@/contexts/language-context"
import { useSearchParams, useRouter } from "next/navigation"
import { projectContentData, projectInfo, relatedArticlesData } from "@/lib/project-content"

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
    url: "https://kanchoeun.github.io/posts/%EA%B3%B5%ED%86%B5-%EC%9D%91%EB%8B%55-%ED%98%95%EC%8B%9D-%EC%A0%81%EC%9A%A9%EA%B8%B0/",
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

// 기술 스택 뱃지 컴포넌트
const TechBadge = ({ tech }: { tech: string }) => (
  <span className="inline-block bg-[#2c313a] dark:bg-[#2c313a] light:bg-[#eaeaeb] text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] px-3 py-1 rounded-full text-sm mr-2 mb-2">
    {tech}
  </span>
)

export default function EditorContent({ activeFile, setActiveFile }: EditorContentProps) {
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()
  const fileParam = searchParams.get("file")
  const [openTabs, setOpenTabs] = useState<OpenTab[]>([])
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [selectedBlog, setSelectedBlog] = useState<{ url: string; title: string } | null>(null)
  const [isMobileView, setIsMobileView] = useState(false)
  const [currentFile, setCurrentFile] = useState<string | null>(null)
  const [forceRender, setForceRender] = useState(0)
  const tabsHeaderRef = useRef<HTMLDivElement>(null)
  const contentAreaRef = useRef<HTMLDivElement>(null)

  // 파일 타입에 따른 페이지 이름 매핑 - language를 의존성에 추가
  const getFilePageName = useCallback(
    (fileId: string) => {
      try {
        if (fileId.includes("intro")) return t("project.intro")
        if (fileId.includes("diagram")) return t("project.diagram")
        if (fileId.includes("related")) return t("project.related")
      } catch (error) {
        console.warn("Translation error for file page name:", fileId, error)
      }
      return fileId
    },
    [t, language], // language 의존성 추가
  )

  // 목차 클릭 핸들러
  const handleTocClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // 콘텐츠 렌더링 함수 - language를 의존성에 추가
  const renderContentSection = useCallback(
    (section: any) => {
      switch (section.type) {
        case "description":
          return (
            <p key={section.contentKey} className="mb-4 dark:text-[#abb2bf] light:text-[#383a42]">
              {t(section.contentKey)}
            </p>
          )
        case "section":
          return (
            <div key={section.titleKey} id={section.id}>
              <h2 className="text-xl font-semibold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-2">
                {t(section.titleKey)}
              </h2>
              {section.contentKey && (
                <p className="mb-4 dark:text-[#abb2bf] light:text-[#383a42]">{t(section.contentKey)}</p>
              )}
            </div>
          )
        case "list":
          return (
            <ul key="list" className="list-disc pl-6 mb-4 dark:text-[#abb2bf] light:text-[#383a42]">
              {section.items.map((item: string, index: number) => (
                <li key={index} className="mb-1">
                  {t(item)}
                </li>
              ))}
            </ul>
          )
        case "code":
          return (
            <div
              key="code"
              className="bg-[#2c313a] dark:bg-[#2c313a] light:bg-[#eaeaeb] p-4 rounded font-mono mb-4 dark:text-[#abb2bf] light:text-[#383a42]"
            >
              {section.content}
            </div>
          )
        case "toc":
          return (
            <div key="toc" className="mb-6 p-4 bg-[#2c313a] dark:bg-[#2c313a] light:bg-[#eaeaeb] rounded">
              <div className="flex items-center mb-3">
                <List size={16} className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] mr-2" />
                <h3 className="text-lg font-semibold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42]">목차</h3>
              </div>
              <ul className="space-y-2">
                {section.items.map((item: any, index: number) => (
                  <li key={index}>
                    <button
                      onClick={() => handleTocClick(item.id)}
                      className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] hover:text-[#56b6c2] dark:hover:text-[#56b6c2] light:hover:text-[#0184bc] transition-colors text-left"
                    >
                      {index + 1}. {t(item.titleKey)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )
        default:
          return null
      }
    },
    [t, language], // language 의존성 추가
  )

  // 파일 콘텐츠 생성 - language를 의존성에 추가
  const getFileContent = useCallback(
    (fileId: string): { project: string; content: React.ReactNode } | null => {
      try {
        // 관련 글 페이지 처리
        if (fileId.includes("related")) {
          const getProjectName = () => {
            if (fileId.includes("1")) return t("project.one")
            if (fileId.includes("2")) return t("project.two")
            if (fileId.includes("3")) return t("project.three")
            return "Project"
          }

          return {
            project: getProjectName(),
            content: renderRelatedArticles(fileId),
          }
        }

        // 일반 콘텐츠 페이지 처리
        const contentData = projectContentData[fileId as keyof typeof projectContentData]
        if (!contentData) return null

        const getProjectName = () => {
          if (fileId.includes("1")) return t("project.one")
          if (fileId.includes("2")) return t("project.two")
          if (fileId.includes("3")) return t("project.three")
          return "Project"
        }

        return {
          project: getProjectName(),
          content: (
            <div className="p-6">
              {/* 프로젝트 정보 (intro 페이지에만 표시) */}
              {contentData.projectKey && (
                <div className="mb-6">
                  {/* 제목과 GitHub 아이콘을 함께 배치 */}
                  <div className="flex items-center mb-4">
                    <h1 className="text-2xl font-bold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mr-3">
                      {t(contentData.titleKey)}
                    </h1>
                    <a
                      href={projectInfo[contentData.projectKey].githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] hover:text-[#61afef] dark:hover:text-[#61afef] light:hover:text-[#4078f2] transition-colors h-full"
                      title="GitHub Repository"
                    >
                      <Github size={20} className="bottom-0" />
                    </a>
                  </div>

                  <div className="flex items-center my-2 px-1">
                    <Calendar size={16} className="text-[#98c379] dark:text-[#98c379] light:text-[#50a14f] mr-2" />
                    <span className="text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] font-medium">
                      {projectInfo[contentData.projectKey].period}
                    </span>
                  </div>
                  <div className="mt-3">
                    {projectInfo[contentData.projectKey].techStack.map((tech) => (
                      <TechBadge key={tech} tech={tech} />
                    ))}
                  </div>
                </div>
              )}

              {/* intro 페이지가 아닌 경우 기본 제목 */}
              {!contentData.projectKey && (
                <h1 className="text-2xl font-bold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-4">
                  {t(contentData.titleKey)}
                </h1>
              )}

              {/* 콘텐츠 섹션들 */}
              {contentData.sections.map((section, index) => (
                <div key={index}>{renderContentSection(section)}</div>
              ))}
            </div>
          ),
        }
      } catch (error) {
        console.warn("Error getting file content for:", fileId, error)
        return null
      }
    },
    [t, language, renderContentSection], // language와 renderContentSection 의존성 추가
  )

  // 관련 글 목록 렌더링 - language를 의존성에 추가
  const renderRelatedArticles = useCallback(
    (fileId: string) => {
      const articleIds = relatedArticlesData[fileId as keyof typeof relatedArticlesData] || []
      const filteredPosts = blogPosts.filter((post) => articleIds.includes(post.id))

      const getProjectName = () => {
        try {
          if (fileId.includes("1")) return t("project.one")
          if (fileId.includes("2")) return t("project.two")
          if (fileId.includes("3")) return t("project.three")
        } catch (error) {
          console.warn("Translation error for project name:", fileId, error)
        }
        return "Project"
      }

      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-8">
            {getProjectName()} {t("project.related")}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
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
    },
    [t, language], // language 의존성 추가
  )

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
    if (currentFile && getFileContent(currentFile)) {
      const existingTabIndex = openTabs.findIndex((tab) => tab.id === currentFile && tab.type === "file")

      if (existingTabIndex === -1) {
        setOpenTabs((prev) => [
          ...prev,
          {
            id: currentFile,
            title: getFilePageName(currentFile),
            type: "file",
            projectIcon: getProjectIcon(currentFile),
          },
        ])
      } else {
        // 기존 탭의 제목 업데이트 (언어 변경 시)
        setOpenTabs((prev) =>
          prev.map((tab) =>
            tab.id === currentFile && tab.type === "file" ? { ...tab, title: getFilePageName(currentFile) } : tab,
          ),
        )
      }

      setActiveTab(currentFile)
    }
  }, [currentFile, getFileContent, getFilePageName])

  // 언어 변경 시 모든 탭 제목 업데이트 및 콘텐츠 강제 리렌더링
  useEffect(() => {
    setOpenTabs((prev) =>
      prev.map((tab) => ({
        ...tab,
        title: tab.type === "file" ? getFilePageName(tab.id) : tab.title,
      })),
    )

    // 강제 리렌더링
    setForceRender((prev) => prev + 1)
  }, [language, getFilePageName])

  // 탭 스크롤 관련 함수들
  const checkScrollable = useCallback(() => {
    const tabsHeader = tabsHeaderRef.current
    if (!tabsHeader) return false

    const isScrollable = tabsHeader.scrollWidth > tabsHeader.clientWidth

    if (isScrollable) {
      tabsHeader.classList.add("scrollable")
    } else {
      tabsHeader.classList.remove("scrollable")
    }

    return isScrollable
  }, [openTabs.length])

  // 탭 스크롤 이벤트 핸들러
  useEffect(() => {
    const tabsHeader = tabsHeaderRef.current
    if (!tabsHeader) return

    const initialCheck = () => {
      setTimeout(() => {
        checkScrollable()
      }, 100)
    }

    // 마우스 휠 스크롤 핸들러 - 탭 헤더에서만 동작
    const handleWheelScroll = (e: WheelEvent) => {
      const target = e.target as Element

      // 탭 헤더 영역에서만 가로 스크롤 처리
      if (
        target === tabsHeader ||
        target.parentElement === tabsHeader ||
        (target.closest && target.closest(".tabs-header") === tabsHeader)
      ) {
        if (tabsHeader.scrollWidth <= tabsHeader.clientWidth) {
          return
        }

        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()

        const scrollAmount = e.deltaY || e.deltaX
        tabsHeader.scrollLeft += scrollAmount

        return false
      }
    }

    // 터치 스크롤 (모바일)
    let startX = 0
    let scrollLeft = 0
    let isDown = false

    const handleTouchStart = (e: TouchEvent) => {
      isDown = true
      startX = e.touches[0].pageX - tabsHeader.offsetLeft
      scrollLeft = tabsHeader.scrollLeft
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.touches[0].pageX - tabsHeader.offsetLeft
      const walk = (x - startX) * 2
      tabsHeader.scrollLeft = scrollLeft - walk
    }

    const handleTouchEnd = () => {
      isDown = false
    }

    const handleResize = () => {
      setTimeout(() => {
        checkScrollable()
      }, 100)
    }

    initialCheck()
    document.addEventListener("wheel", handleWheelScroll, { passive: false, capture: true })
    tabsHeader.addEventListener("touchstart", handleTouchStart, { passive: false })
    tabsHeader.addEventListener("touchmove", handleTouchMove, { passive: false })
    tabsHeader.addEventListener("touchend", handleTouchEnd)
    window.addEventListener("resize", handleResize)

    return () => {
      document.removeEventListener("wheel", handleWheelScroll, { capture: true })
      tabsHeader.removeEventListener("touchstart", handleTouchStart)
      tabsHeader.removeEventListener("touchmove", handleTouchMove)
      tabsHeader.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("resize", handleResize)
    }
  }, [checkScrollable])

  // 탭이 추가/제거될 때마다 스크롤 가능 여부 업데이트
  useEffect(() => {
    setTimeout(() => {
      checkScrollable()
    }, 100)
  }, [openTabs, checkScrollable])

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

    setOpenTabs((prev) => prev.filter((tab) => tab.id !== tabId))

    if (activeTab === tabId) {
      if (openTabs.length > 1) {
        const tabIndex = openTabs.findIndex((tab) => tab.id === tabId)
        const newActiveTab = openTabs[tabIndex === 0 ? 1 : tabIndex - 1]
        setActiveTab(newActiveTab.id)

        if (newActiveTab.type === "file") {
          setActiveFile(newActiveTab.id)
        }
      } else {
        setActiveTab(null)
        setActiveFile(null)
      }
    }

    if (openTabs.find((tab) => tab.id === tabId)?.type === "file") {
      if (tabId === currentFile) {
        setActiveFile(null)
      }
    }
  }

  // 탭 활성화
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)

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
      const fileContent = getFileContent(tab.id)
      return <div key={forceRender}>{fileContent?.content}</div>
    }

    return null
  }

  // 탭이 없을 때 빈 화면 표시
  if (openTabs.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="text-center text-[#6b717d] dark:text-[#6b717d] light:text-gray-500">
          <FileCode size={48} className="mx-auto mb-4" />
          <h3 className="text-xl">{t("portfolio.no.file")}</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-[#282c34] dark:bg-[#282c34] light:bg-[#fafafa] flex flex-col h-full">
      {isMobileView ? (
        // 모바일 뷰
        <div className="flex flex-col h-full">
          <div
            ref={tabsHeaderRef}
            className="tabs-header sticky top-0 z-20 bg-[#21252b] dark:bg-[#21252b] light:bg-[#f0f0f0] border-b border-[#343a47] dark:border-[#343a47] light:border-[#d4d4d4] flex overflow-x-auto flex-shrink-0"
          >
            {openTabs.map((tab) => (
              <div
                key={tab.id}
                className={`file-tab flex items-center cursor-pointer flex-shrink-0 ${
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
              <div className="file-tab flex items-center cursor-pointer border-b-2 border-[#61afef] flex-shrink-0">
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
              <div className="h-full">{getActiveTabContent()}</div>
            )}
          </div>
        </div>
      ) : (
        // 데스크톱 뷰
        <div className="flex h-full">
          {/* 메인 콘텐츠 영역 */}
          <div
            className={`flex flex-col ${selectedBlog ? "w-1/2" : "w-full"}`}
            style={{ transition: "width 0.3s ease-in-out" }}
          >
            {/* 탭 헤더 - 고정 */}
            <div
              ref={tabsHeaderRef}
              className="tabs-header sticky top-0 z-20 bg-[#21252b] dark:bg-[#21252b] light:bg-[#f0f0f0] border-b border-[#343a47] dark:border-[#343a47] light:border-[#d4d4d4] flex overflow-x-auto flex-shrink-0"
            >
              {openTabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`file-tab flex items-center cursor-pointer flex-shrink-0 ${
                    activeTab === tab.id ? "border-b-2 border-[#61afef]" : ""
                  }`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.projectIcon}
                  <span className="text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] truncate max-w-[150px] ml-2 whitespace-nowrap">
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

            {/* 콘텐츠 영역 - 탭 헤더 아래 독립적 스크롤 */}
            <div ref={contentAreaRef} className="flex-1 overflow-auto">
              {activeTab && <div className="h-full">{getActiveTabContent()}</div>}
            </div>
          </div>

          {/* 블로그 뷰어 - iframe 영역 */}
          {selectedBlog && (
            <div className="w-1/2 h-full border-l border-[#343a47] dark:border-[#343a47] light:border-[#d4d4d4] flex flex-col flex-shrink-0">
              <div className="file-tab flex justify-between bg-[#21252b] dark:bg-[#21252b] light:bg-[#f0f0f0] border-b border-[#343a47] dark:border-[#343a47] light:border-[#d4d4d4] sticky top-0 z-20 flex-shrink-0">
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
              <div className="flex-1 overflow-hidden">
                <IframeViewer url={selectedBlog.url} title={selectedBlog.title} onClose={handleCloseBlogViewer} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
