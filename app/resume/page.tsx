"use client"
import LayoutWrapper from "@/components/layout-wrapper"
import { useLanguage } from "@/contexts/language-context"
import { useRouter, useSearchParams } from "next/navigation"
import ParticlesBackground from "@/components/particles-background"

interface TimelineItem {
  id: string
  title: string
  subtitle: string
  date: string
  description: string
  type: "work" | "education" | "projects" | "certification" | "awards"
  status: "ongoing" | "completed"
  projectLink?: string
}

export default function ResumePage() {
  const { language } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()

  // All resume data in chronological order (newest first)
  const timelineItems: TimelineItem[] = [
    // Work items
    {
      id: "work-1",
      title: language === "en" ? "Senior Backend Developer" : "시니어 백엔드 개발자",
      subtitle: language === "en" ? "Tech Company Inc." : "테크 컴퍼니",
      date: language === "en" ? "2022 - Present" : "2022 - 현재",
      description:
        language === "en" ? "Led the development of microservices architecture" : "마이크로서비스 아키텍처 개발을 주도",
      type: "work",
      status: "ongoing",
    },
    {
      id: "work-2",
      title: language === "en" ? "Backend Developer" : "백엔드 개발자",
      subtitle: language === "en" ? "Software Solutions Ltd." : "소프트웨어 솔루션즈",
      date: language === "en" ? "2019 - 2022" : "2019 - 2022",
      description:
        language === "en"
          ? "Developed RESTful APIs and implemented CI/CD pipelines"
          : "RESTful API를 개발하고 CI/CD 파이프라인을 구현",
      type: "work",
      status: "completed",
    },
    {
      id: "work-3",
      title: language === "en" ? "Junior Developer" : "주니어 개발자",
      subtitle: language === "en" ? "Web Startup" : "웹 스타트업",
      date: language === "en" ? "2017 - 2019" : "2017 - 2019",
      description:
        language === "en"
          ? "Worked on full-stack web development using Node.js and React"
          : "Node.js와 React를 사용한 풀스택 웹 개발 작업을 수행",
      type: "work",
      status: "completed",
    },

    // Education items
    {
      id: "edu-1",
      title: language === "en" ? "Master's in Computer Science" : "컴퓨터 과학 석사",
      subtitle: language === "en" ? "Tech University" : "테크 대학교",
      date: language === "en" ? "2015 - 2017" : "2015 - 2017",
      description:
        language === "en"
          ? "Specialized in Distributed Systems and Cloud Computing"
          : "분산 시스템 및 클라우드 컴퓨팅 전공",
      type: "education",
      status: "completed",
    },
    {
      id: "edu-2",
      title: language === "en" ? "Bachelor's in Software Engineering" : "소프트웨어 공학 학사",
      subtitle: language === "en" ? "Engineering College" : "공학 대학",
      date: language === "en" ? "2011 - 2015" : "2011 - 2015",
      description:
        language === "en"
          ? "Graduated with honors. Participated in multiple hackathons"
          : "우등으로 졸업. 여러 해커톤에 참가",
      type: "education",
      status: "completed",
    },

    // Project items
    {
      id: "proj-1",
      title: language === "en" ? "E-commerce Platform" : "이커머스 플랫폼",
      subtitle: language === "en" ? "Lead Developer" : "리드 개발자",
      date: language === "en" ? "2021 - 2022" : "2021 - 2022",
      description:
        language === "en"
          ? "Built a scalable e-commerce platform with microservices architecture"
          : "마이크로서비스 아키텍처로 확장 가능한 이커머스 플랫폼을 구축",
      type: "projects",
      status: "completed",
      projectLink: "/portfolio?file=intro1",
    },
    {
      id: "proj-2",
      title: language === "en" ? "Real-time Analytics Dashboard" : "실시간 분석 대시보드",
      subtitle: language === "en" ? "Backend Developer" : "백엔드 개발자",
      date: language === "en" ? "2020" : "2020",
      description:
        language === "en"
          ? "Developed a real-time analytics system processing millions of events daily"
          : "일일 수백만 개의 이벤트를 처리하는 실시간 분석 시스템을 개발",
      type: "projects",
      status: "completed",
      projectLink: "/portfolio?file=intro2",
    },
    {
      id: "proj-3",
      title: language === "en" ? "Mobile Payment App" : "모바일 결제 앱",
      subtitle: language === "en" ? "Full-stack Developer" : "풀스택 개발자",
      date: language === "en" ? "2019" : "2019",
      description:
        language === "en"
          ? "Created a secure mobile payment application with biometric authentication"
          : "생체 인증을 통한 안전한 모바일 결제 애플리케이션을 개발",
      type: "projects",
      status: "ongoing",
      projectLink: "/portfolio?file=intro3",
    },

    // Certification items
    {
      id: "cert-1",
      title: language === "en" ? "AWS Certified Solutions Architect" : "AWS 공인 솔루션스 아키텍트",
      subtitle: language === "en" ? "Amazon Web Services" : "아마존 웹 서비스",
      date: language === "en" ? "2022" : "2022",
      description:
        language === "en"
          ? "Professional certification for designing distributed systems on AWS"
          : "AWS에서 분산 시스템을 설계하기 위한 전문 자격증",
      type: "certification",
      status: "completed",
    },
    {
      id: "cert-2",
      title: language === "en" ? "Certified Kubernetes Administrator" : "공인 쿠버네티스 관리자",
      subtitle: language === "en" ? "Cloud Native Computing Foundation" : "클라우드 네이티브 컴퓨팅 재단",
      date: language === "en" ? "2021" : "2021",
      description:
        language === "en"
          ? "Certification for managing Kubernetes clusters in production environments"
          : "프로덕션 환경에서 쿠버네티스 클러스터를 관리하기 위한 자격증",
      type: "certification",
      status: "completed",
    },

    // Awards items
    {
      id: "award-1",
      title: language === "en" ? "Innovation Award" : "혁신상",
      subtitle: language === "en" ? "Tech Conference 2022" : "테크 컨퍼런스 2022",
      date: language === "en" ? "2022" : "2022",
      description:
        language === "en"
          ? "Recognized for innovative approach to solving complex technical challenges"
          : "복잡한 기술적 과제를 해결하는 혁신적인 접근 방식으로 인정",
      type: "awards",
      status: "completed",
    },
    {
      id: "award-2",
      title: language === "en" ? "Hackathon Winner" : "해커톤 우승자",
      subtitle: language === "en" ? "Global Code Fest" : "글로벌 코드 페스트",
      date: language === "en" ? "2020" : "2020",
      description:
        language === "en"
          ? "First place in a 48-hour hackathon focused on AI solutions"
          : "AI 솔루션에 중점을 둔 48시간 해커톤에서 1위를 차지",
      type: "awards",
      status: "completed",
    },
  ]

  // Colors for different branch types
  const branchColors: Record<string, string> = {
    work: "#61afef", // Blue
    education: "#c678dd", // Purple
    projects: "#98c379", // Green
    certification: "#e5c07b", // Yellow
    awards: "#e06c75", // Red
    me: "#abb2bf", // Gray (main branch)
  }

  // Navigate to project page
  const handleProjectClick = (projectLink: string | undefined) => {
    if (projectLink) {
      router.push(projectLink)
    }
  }

  // Group items by type
  const groupedItems: Record<string, TimelineItem[]> = {}
  timelineItems.forEach((item) => {
    if (!groupedItems[item.type]) {
      groupedItems[item.type] = []
    }
    groupedItems[item.type].push(item)
  })

  // Order of branch types
  const branchOrder = ["work", "education", "projects", "certification", "awards"]

  return (
    <LayoutWrapper>
      <ParticlesBackground />
      <div className="p-6 bg-[#282c34] dark:bg-[#282c34] light:bg-[#fafafa] min-h-full">
        <div className="git-graph-container pb-2 relative">
          {/* Main branch line - 위치 고정 */}
          <div className="main-branch fixed-branch-line left-0 top-0 bottom-0 w-1 bg-[#abb2bf] dark:bg-[#abb2bf] light:bg-[#6b717d]"></div>

          {/* Branch sections */}
          {branchOrder.map((branchType, branchIndex) => (
            <div key={branchType} className="branch-section mb-8 relative">
              {/* Branch label */}
              <div className="branch-label flex items-center relative">
                <div
                  className="branch-line h-1 w-10 absolute left-1"
                  style={{ backgroundColor: branchColors[branchType] }}
                ></div>
                {/* Vertical branch line - 위치 고정 */}
                <div
                  className="fixed-branch-line absolute top-6 bottom-0 left-10 w-1"
                  style={{ backgroundColor: branchColors[branchType] }}
                ></div>
                <h2 className="text-lg font-semibold ml-20 py-3" style={{ color: branchColors[branchType] }}>
                  {language === "en"
                    ? branchType.charAt(0).toUpperCase() + branchType.slice(1)
                    : branchType === "work"
                      ? "경력"
                      : branchType === "education"
                        ? "교육"
                        : branchType === "projects"
                          ? "프로젝트"
                          : branchType === "certification"
                            ? "자격증"
                            : "수상"}
                </h2>
              </div>

              {/* Branch items */}
              {groupedItems[branchType]?.map((item, index) => (
                <div
                  key={item.id}
                  className={`branch-item flex ${item.projectLink ? "cursor-pointer" : ""}`}
                  onClick={() => item.projectLink && handleProjectClick(item.projectLink)}
                >
                  {/* Git branch visualization - 위치 고정 */}
                  <div className="git-branch w-16 flex-shrink-0 relative">
                    {/* Vertical branch line - 위치 고정 */}
                    <div
                      className="fixed-branch-line absolute top-0 bottom-0 left-10 w-1"
                      style={{ backgroundColor: branchColors[branchType] }}
                    ></div>

                    {/* Horizontal connector to main branch */}
                    <div
                      className="absolute top-4 left-1 w-10 h-1"
                      style={{ backgroundColor: branchColors[branchType] }}
                    ></div>

                    {/* Commit dot */}
                    <div
                      className={`absolute top-3 left-[35px] w-3 h-3 rounded-full border-2 ${
                        item.status === "ongoing" ? "bg-transparent" : ""
                      }`}
                      style={{
                        backgroundColor: item.status === "ongoing" ? "transparent" : branchColors[branchType],
                        borderColor: branchColors[branchType],
                      }}
                    ></div>

                    {/* Merge line back to main branch (for completed items) */}
                    {index === groupedItems[branchType].length - 1 && (
                      <div
                        className="absolute bottom-0 left-1 w-10 h-1"
                        style={{ backgroundColor: branchColors[branchType] }}
                      ></div>
                    )}
                  </div>

                  {/* Content - 라이트 모드 배경색 수정 */}
                  <div
                    className={`flex-1 bg-[#2c313a] dark:bg-[#2c313a] light:bg-[#f0f0f0] rounded-md p-4 mb-4 ml-0 ${
                      item.projectLink ? "hover:opacity-90" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42]">
                        {item.title}
                      </h3>
                      <span className="text-sm text-[#98c379] dark:text-[#98c379] light:text-[#50a14f]">
                        {item.date}
                      </span>
                    </div>
                    <div className="text-sm text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42]">
                      {item.subtitle}
                    </div>
                    <p className="text-sm text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42]">
                      {item.description}
                    </p>
                    {item.projectLink && (
                      <div className="text-xs text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] mt-1">
                        {language === "en" ? "View project details" : "프로젝트 상세보기"} →
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </LayoutWrapper>
  )
}
