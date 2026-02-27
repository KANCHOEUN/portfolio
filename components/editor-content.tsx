"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { FileCode, X, PiggyBankIcon as Pig, Fish, Leaf, Bot, ExternalLink, Calendar, Github, List } from "lucide-react"
import BlogCard from "./blog-card"
import IframeViewer from "./iframe-viewer"
import { useLanguage } from "@/contexts/language-context"
import { useSearchParams, useRouter } from "next/navigation"
import { projectContentData } from "@/lib/project-content"
import NotionViewer from "./notion-viewer"

import { infoContents, diagramContents } from "./project-content"
import InfoPageWrapper from "@/components/project-common/InfoPageWrapper"
import DiagramPageWrapper from "@/components/project-common/DiagramPageWrapper"

import { getProjectById, getBlogPostById } from "@/data/projects"

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

const projectTranslationKeys = ["project.one", "project.two", "project.three", "project.four"] as const

// 프로젝트 아이콘 매핑
const getProjectIcon = (fileId: string) => {
  if (fileId.includes("1")) {
    return <Pig size={16} className="text-[#e06c75] dark:text-[#e06c75] light:text-[#e45649] flex-shrink-0" />
  } else if (fileId.includes("2")) {
    return <Fish size={16} className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] flex-shrink-0" />
  } else if (fileId.includes("3")) {
    return <Leaf size={16} className="text-[#98c379] dark:text-[#98c379] light:text-[#50a14f] flex-shrink-0" />
  } else if (fileId.includes("4")) {
    return <Bot size={16} className="text-[#c678dd] dark:text-[#c678dd] light:text-[#a626a4] flex-shrink-0" />
  }
  return <FileCode size={16} className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] flex-shrink-0" />
}

function getDiagramTitle(projectKey: string): string {
  const project = getProjectById(projectKey);
  return project ? `${project.name} 설계 및 구현` : "";
}

function diagramKeyToDescription(projectKey: keyof typeof diagramContents) {
  switch (projectKey) {
    case "project1": return "Pigrest 프로젝트를 진행하면서 고민했던 점과 설계 및 구현 내용을 설명합니다.";
    case "project2": return "RE-VERSE 시스템 아키텍처를 어떻게 설계했는지, 그리고 CI/CD 파이프라인을 어떻게 구축했는지 설명합니다.";
    case "project3": return "PARSLEY의 시스템 아키텍처와 랭킹 시스템을 어떻게 설계했는지 설명합니다.";
    case "project4": return "";
    default: return "";
  }
}

function diagramKeyToToc(projectKey: keyof typeof diagramContents) {
  switch (projectKey) {
    case "project1":
      return [
        { id: "auto-save-system", label: "게시물 초안 자동 저장 시스템" },
        // { id: "spring-security-jwt", label: "JWT 기반 인증 시스템" },
        { id: "uuid", label: "UUID 기반 Primary Key 설계" },
        { id: "ci-cd-pipeline", label: "CI/CD 파이프라인"}
      ];
    case "project2":
      return [
        { id: "system-design", label: "시스템 설계" },
        { id: "ci-cd-pipeline", label: "CI/CD 파이프라인" },
      ];
    case "project3":
      return [
        { id: "architecture", label: "아키텍처" },
        { id: "sequence-diagram", label: "시퀀스 다이어그램" },
      ];
    case "project4":
      return [
        { id: "mockly-login", label: "OAuth 2.1 기반 구글 소셜 로그인" },
        { id: "mockly-refresh-rotation", label: "토큰 재발급 - Refresh Token Rotation 적용" },
        { id: "mockly-logout", label: "로그아웃 - Blacklist 기반 토큰 무효화" },
      ];
    default:
      return [];
  }
}

export default function EditorContent({ activeFile, setActiveFile }: EditorContentProps) {
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [fileParam, setFileParam] = useState(searchParams.get("file"))
  const [openTabs, setOpenTabs] = useState<OpenTab[]>([])
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [selectedBlog, setSelectedBlog] = useState<{ url: string; title: string } | null>(null)
  const [isMobileView, setIsMobileView] = useState(false)
  const [forceRender, setForceRender] = useState(0)
  const tabsHeaderRef = useRef<HTMLDivElement>(null)
  const contentAreaRef = useRef<HTMLDivElement>(null)

  console.log(selectedBlog);

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
  const handleToClick = (id: string) => {
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
                      onClick={() => handleToClick(item.id)}
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
        // info/diagram 페이지 자동 매핑
        const infoMatch = fileId.match(/^intro([1-4])$/);
        const diagramMatch = fileId.match(/^diagram([1-4])$/);
        if (infoMatch) {
          const projectKey = `project${infoMatch[1]}` as keyof typeof infoContents;
          const InfoContent = infoContents[projectKey];
          const projectIndex = parseInt(infoMatch[1], 10) - 1;
          const projectTranslationKey = projectTranslationKeys[projectIndex] || "project.one";
          const project = getProjectById(projectKey);
          if (!project) return null;
          return {
            project: t(projectTranslationKey),
            content: (
              <InfoPageWrapper
                title={project.name}
                githubUrl={project.githubUrl}
                period={project.period}
                techStack={project.techStack}
              >
                <InfoContent />
              </InfoPageWrapper>
            ),
          };
        }
        if (diagramMatch) {
          const projectKey = `project${diagramMatch[1]}` as keyof typeof diagramContents;
          const DiagramContent = diagramContents[projectKey];
          const projectIndex = parseInt(diagramMatch[1], 10) - 1;
          const projectTranslationKey = projectTranslationKeys[projectIndex] || "project.one";
          const project = getProjectById(projectKey);
          return {
            project: t(projectTranslationKey),
            content: (
              <DiagramPageWrapper
                title={getDiagramTitle(projectKey)}
                description={diagramKeyToDescription(projectKey)}
                toc={diagramKeyToToc(projectKey)}
              >
                <DiagramContent />
              </DiagramPageWrapper>
            ),
          };
        }
        // 관련 글 페이지 처리
        if (fileId.includes("related")) {
          const getProjectName = () => {
            if (fileId.includes("1")) return t("project.one")
            if (fileId.includes("2")) return t("project.two")
            if (fileId.includes("3")) return t("project.three")
            if (fileId.includes("4")) return t("project.four")
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
          if (fileId.includes("4")) return t("project.four")
          return "Project"
        }

        return {
          project: getProjectName(),
          content: (
            <div className="p-6">
              <h1 className="text-2xl font-bold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-4">
                {t(contentData.titleKey)}
              </h1>
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
      // fileId가 "related1", "related2" 등의 형태이므로 projectId 추출
      const projectNum = fileId.replace("related", "");
      const projectKey = `project${projectNum}`;
      const project = getProjectById(projectKey);
      const relatedPosts = project?.relatedPosts || [];

      const getProjectNameForRelated = () => {
        try {
          if (fileId.includes("1")) return t("project.one")
          if (fileId.includes("2")) return t("project.two")
          if (fileId.includes("3")) return t("project.three")
          if (fileId.includes("4")) return t("project.four")
        } catch (error) {
          console.warn("Translation error for project name:", fileId, error)
        }
        return "Project"
      }

      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-8">
            {getProjectNameForRelated()} {t("project.related")}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {relatedPosts.map((post) => (
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

  // 커스텀 이벤트 처리 (블로그 포스트 열기)
  useEffect(() => {
    const handleOpenBlogPost = (event: CustomEvent) => {
      const { id } = event.detail
      openBlogPostById(id)
    }

    window.addEventListener('openBlogPost', handleOpenBlogPost as EventListener)

    return () => {
      window.removeEventListener('openBlogPost', handleOpenBlogPost as EventListener)
    }
  }, [])

  // 파일 파라미터 변경 감지
  useEffect(() => {
    setFileParam(searchParams.get("file"))
  }, [searchParams])

  // 파일이 변경될 때 탭 업데이트 (중복 방지)
  useEffect(() => {
    if (fileParam && getFileContent(fileParam)) {
      setOpenTabs((prev) => {
        if (prev.some((tab) => tab.id === fileParam && tab.type === "file")) {
          return prev.map((tab) =>
            tab.id === fileParam && tab.type === "file"
              ? { ...tab, title: getFilePageName(fileParam) }
              : tab
          );
        }
        return [
          ...prev,
          {
            id: fileParam,
            title: getFilePageName(fileParam),
            type: "file",
            projectIcon: getProjectIcon(fileParam),
          },
        ];
      });
      setActiveTab(fileParam);
      setActiveFile(fileParam);
    }
  }, [fileParam, getFileContent, getFilePageName]);

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

  // 블로그 포스트 ID로 직접 열기
  const openBlogPostById = (postId: string) => {
    const post = getBlogPostById(postId)
    if (post) {
      setSelectedBlog({ url: post.url, title: post.title })
    }
  }

  // 탭 닫기 (openTabs만 변경)
  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (fileParam === tabId) {
      router.replace("/portfolio");
      setFileParam(null);
    }
    setOpenTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
  };

  // openTabs가 바뀔 때 activeTab, setActiveFile 동기화
  useEffect(() => {
    if (openTabs.length > 0) {
      if (!openTabs.some(tab => tab.id === activeTab)) {
        const lastTabId = openTabs[openTabs.length - 1].id;
        setActiveTab(lastTabId);
        setActiveFile(lastTabId);
        console.log('[DEBUG] openTabs changed, setActiveTab/setActiveFile:', lastTabId);
      }
    } else {
      setActiveTab(null);
      setActiveFile(null);
      console.log('[DEBUG] openTabs empty, setActiveTab/setActiveFile null');
    }
  }, [openTabs]);

  // 탭 클릭, 사이드바 클릭, 탭 추가/제거, activeTab, openTabs, setActiveFile, fileParam 변화 등 주요 지점에 console.log 추가

  useEffect(() => {
    console.log('[DEBUG] openTabs:', openTabs);
  }, [openTabs]);

  useEffect(() => {
    console.log('[DEBUG] activeTab:', activeTab);
  }, [activeTab]);

  useEffect(() => {
    console.log('[DEBUG] setActiveFile:', activeFile);
  }, [activeFile]);

  useEffect(() => {
    console.log('[DEBUG] fileParam:', fileParam);
  }, [fileParam]);

  // 탭 클릭 시 fileParam도 router.replace로 동기화
  const handleTabClick = (tabId: string) => {
    console.log('[DEBUG] handleTabClick:', tabId);
    setActiveTab(tabId);
    setActiveFile(tabId);
    if (fileParam !== tabId) {
      router.replace(`/portfolio?file=${tabId}`);
      console.log('[DEBUG] handleTabClick: router.replace', tabId);
    }
  };

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
              selectedBlog.url.includes("notion.so") ? (
                <NotionViewer notionPageId={selectedBlog.url.split("/").pop()?.split("-").pop() || ""} onClose={handleCloseBlogViewer} />
              ) : (
                <IframeViewer url={selectedBlog.url} title={selectedBlog.title} onClose={handleCloseBlogViewer} />
              )
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
                {selectedBlog.url.includes("notion.so") ? (
                  <NotionViewer notionPageId={selectedBlog.url.split("/").pop()?.split("-").pop() || ""} onClose={handleCloseBlogViewer} />
                ) : (
                  <IframeViewer url={selectedBlog.url} title={selectedBlog.title} onClose={handleCloseBlogViewer} />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
