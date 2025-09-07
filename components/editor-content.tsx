"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { FileCode, X, PiggyBankIcon as Pig, Fish, Leaf, ExternalLink, Calendar, Github, List } from "lucide-react"
import BlogCard from "./blog-card"
import IframeViewer from "./iframe-viewer"
import { useLanguage } from "@/contexts/language-context"
import { useSearchParams, useRouter } from "next/navigation"
import { projectContentData, projectInfo, relatedArticlesData } from "@/lib/project-content"
import NotionViewer from "./notion-viewer"

import { infoContents, diagramContents } from "./project-content/contents"
import InfoPageWrapper from "@/components/project-common/InfoPageWrapper"
import DiagramPageWrapper from "@/components/project-common/DiagramPageWrapper"

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
    id: "uuid",
    title: "UUID 적용기",
    description:
      "UUID를 도입하게 된 배경과 실제 코드에 어떻게 적용하였는가",
    image: "https://kanchoeun.github.io/assets/img/posts/uuid.png",
    url: "https://blog.kancho.co/posts/UUID-%EC%A0%81%EC%9A%A9%EA%B8%B0/",
  },
  {
    id: "common-response-format",
    title: "공통 응답 형식 적용기",
    description: "Pigrest 프로젝트에서 정의한 공통 응답 형식과 ResponseBodyAdvice를 적용하지 않은 이유",
    image: "https://kanchoeun.github.io/assets/img/posts/spring-mvc-request-life-cycle.jpg",
    url: "https://blog.kancho.co/posts/%EA%B3%B5%ED%86%B5-%EC%9D%91%EB%8B%B5-%ED%98%95%EC%8B%9D-%EC%A0%81%EC%9A%A9%EA%B8%B0/",
  },
  {
    id: "filter-interceptor-response-body",
    title: "Filter와 Interceptor에서 Response의 body를 수정할 수 있을까",
    description:
      "Spring MVC Request Lifecycle에서 HttpMessageConverter 톺아보기",
    image: "https://kanchoeun.github.io/assets/img/posts/spring-mvc-request-life-cycle-http-message-converter.svg",
    url: "https://blog.kancho.co/posts/Filter%EC%99%80-Interceptor%EC%97%90%EC%84%9C-Response%EC%9D%98-body%EB%A5%BC-%EC%88%98%EC%A0%95%ED%95%A0-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C/",
  },
  {
    id: "filter-exception-handler",
    title: "Filter에서 발생한 예외는 어떻게 처리할까",
    description:
      "GlobalExceptionHandler가 잡지 못하는 예외 처리 방법 (feat. AuthenticationEntryPoint)",
    image: "https://kanchoeun.github.io/assets/img/posts/jwt-filter-dispatcher-servlet.svg",
    url: "https://blog.kancho.co/posts/Filter%EC%97%90%EC%84%9C-%EB%B0%9C%EC%83%9D%ED%95%9C-%EC%98%88%EC%99%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%B2%98%EB%A6%AC%ED%95%A0%EA%B9%8C/",
  },
  {
    id: "index-performance",
    title: "INDEX를 적용하여 성능 개선하기",
    description: "EXPLAIN 명령어로 병목 식별하고, 4만 건 이상의 데이터 성능 46% 향상시키기",
    image: "https://re-verse.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F95a5f1ad-4464-4a33-b743-c773a2133990%2FUntitled.png?table=block&id=49792335-1313-46ea-94d5-af47b7b4d885&spaceId=1dc760ff-98aa-4cb3-b846-75e0be268835&width=2000&userId=&cache=v2",
    url: "https://www.notion.so/choeun/INDEX-1ff9d8968ca3801d82acf4679a919f8f",
  },
  {
    id: "gitlab-ci",
    title: "GitLab CI 파이프라인 구축하기",
    description: "GitLab CI 파이프라인을 구축 방법 및 발생한 이슈들 기록",
    image: "https://choeun.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc535450d-5e96-4e1f-b8e6-a7b95b3eec87%2FUntitled.png?table=block&id=1ff9d896-8ca3-815f-9c36-e294bbb66ef6&spaceId=5d0a987d-8a0f-4ad2-a579-07d63bd3b542&width=2000&userId=&cache=v2",
    url: "https://www.notion.so/choeun/GitLab-CI-1ff9d8968ca380169aa2d223996b4f6d",
  },
  {
    id: "argo-cd",
    title: "Argo CD 파이프라인 구축하기",
    description: "Comprehensive documentation for the Health API used in Project Two, with examples and use cases.",
    image: "https://choeun.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8c234292-e9a8-4fa0-a3c3-1766fdefae60%2FUntitled.png?table=block&id=1ff9d896-8ca3-8113-a2f6-ed66966fa453&spaceId=5d0a987d-8a0f-4ad2-a579-07d63bd3b542&width=2000&userId=&cache=v2",
    url: "https://www.notion.so/choeun/Argo-CD-1ff9d8968ca3800da11fc2224537449c",
  },
  {
    id: "hpa-artillery",
    title: "HPA 적용 테스트 (feat.Artillery)",
    description: "서버에 부하를 줘서 Horizontal Pod Autoscaler를 테스트해보자",
    image: "https://choeun.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8171808e-639c-4cf6-9afa-b6813eaeecce%2FUntitled.png?table=block&id=1ff9d896-8ca3-8114-a9a4-d7131ce0b81e&spaceId=5d0a987d-8a0f-4ad2-a579-07d63bd3b542&width=2000&userId=&cache=v2",
    url: "https://www.notion.so/HPA-feat-Artillery-1ff9d8968ca3803dacfbef45bb3d84e0",
  },
  {
    id: "deploy-to-ec2-apply-https",
    title: "EC2에 배포 및 HTTPS 적용하기",
    description:
      "EC2에서 Docker Compose로 컨테이너를 관리하고, HTTPS 적용하기",
    image: "/images/posts/parsley/parsley-architecture.png",
    url: "https://www.notion.so/choeun/EC2-HTTPS-2269d8968ca381939975ef57e6cc1027",
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

function infoKeyToTitle(projectKey: keyof typeof infoContents) {
  switch (projectKey) {
    case "project1": return "Pigrest";
    case "project2": return "RE-VERSE";
    case "project3": return "PARSLEY";
    default: return "";
  }
}

function diagramKeyToTitle(projectKey: keyof typeof diagramContents) {
  switch (projectKey) {
    case "project1": return "Pigrest 설계 및 구현";
    case "project2": return "RE-VERSE 설계 및 구현";
    case "project3": return "PARSLEY 설계 및 구현";
    default: return "";
  }
}

function diagramKeyToDescription(projectKey: keyof typeof diagramContents) {
  switch (projectKey) {
    case "project1": return "Pigrest 프로젝트를 진행하면서 고민했던 점과 설계 및 구현 내용을 설명합니다.";
    case "project2": return "RE-VERSE 시스템 아키텍처를 어떻게 설계했는지, 그리고 CI/CD 파이프라인을 어떻게 구축했는지 설명합니다.";
    case "project3": return "PARSLEY의 시스템 아키텍처와 랭킹 시스템을 어떻게 설계했는지 설명합니다.";
    default: return "";
  }
}

function diagramKeyToToc(projectKey: keyof typeof diagramContents) {
  switch (projectKey) {
    case "project1":
      return [
        { id: "auto-save-system", label: "실시간 자동 저장 시스템" },
        { id: "spring-security-jwt", label: "JWT 기반 인증 시스템" },
        { id: "uuid", label: "UUID 기반 설계" },
      ];
    case "project2":
      return [
        { id: "system-design", label: "시스템 설계" },
        { id: "ci-cd-pipeline", label: "CI/CD 파이프라인" },
        { id: "api-design", label: "API 설계" },
      ];
    case "project3":
      return [
        { id: "architecture", label: "아키텍처" },
        { id: "sequence-diagram", label: "시퀀스 다이어그램" },
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
        const infoMatch = fileId.match(/^intro([1-3])$/);
        const diagramMatch = fileId.match(/^diagram([1-3])$/);
        if (infoMatch) {
          const projectKey = `project${infoMatch[1]}` as keyof typeof infoContents;
          const InfoContent = infoContents[projectKey];
          const info = projectInfo[projectKey];
          return {
            project: t(["project.one", "project.two", "project.three"][parseInt(infoMatch[1], 10) - 1]),
            content: (
              <InfoPageWrapper
                title={infoKeyToTitle(projectKey)}
                githubUrl={info.githubUrl}
                period={info.period}
                techStack={info.techStack}
              >
                <InfoContent />
              </InfoPageWrapper>
            ),
          };
        }
        if (diagramMatch) {
          const projectKey = `project${diagramMatch[1]}` as keyof typeof diagramContents;
          const DiagramContent = diagramContents[projectKey];
          return {
            project: t(["project.one", "project.two", "project.three"][parseInt(diagramMatch[1], 10) - 1]),
            content: (
              <DiagramPageWrapper
                title={diagramKeyToTitle(projectKey)}
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
      const articleIds = relatedArticlesData[fileId as keyof typeof relatedArticlesData] || []
      const filteredPosts = blogPosts.filter((post) => articleIds.includes(post.id))

      console.log(filteredPosts);

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
