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

  // All resume data in chronological order (newest first)
  const timelineItems: TimelineItem[] = [
    // Work items
    {
      id: "work-1",
      title: language === "en" ? "Junior Backend Developer" : "주니어 백엔드 개발자",
      subtitle: language === "en" ? "TMAX BI" : "티맥스 비아이",
      date: language === "en" ? "2023. 07 - 2024. 12" : "2023. 07 - 2024. 12",
      description:
        language === "en"
          ? "Developed microservices architecture for price policy and inventory modules"
          : "Java와 MyBatis 기반 가격 정책, 재고 모듈 설계 및 개발",
      type: "work",
      status: "completed",
    },
    // Education items
    {
      id: "edu-1",
      title: language === "en" ? "Samsung Software Academy for Youth 7th" : "삼성 청년 소프트웨어 아카데미 7기",
      subtitle: language === "en" ? "Samsung Multicampus" : "삼성전자 멀티캠퍼스",
      date: language === "en" ? "2022 - 2023" : "2022 - 2023",
      description:
        language === "en"
          ? "Built backend development skills through 1,600 hours of intensive training and hands-on project experience."
          : "1,600시간 동안의 집중 교육과 실전 프로젝트 경험을 통해 백엔드 개발자로서의 역량 향상",
      type: "education",
      status: "completed",
    },
    {
      id: "edu-2",
      title: language === "en" ? "Bachelor's in Software Engineering" : "소프트웨어 공학 학사",
      subtitle: language === "en" ? "Soongsil University" : "숭실대학교 소프트웨어학부",
      date: language === "en" ? "2017 - 2022" : "2017 - 2022",
      description:
      // TODO: 내용 추가
        language === "en"
          ? ""
          : "",
      type: "education",
      status: "completed",
    },

    // Project items
    {
      id: "proj-1",
      title: language === "en" ? "PIGREST: Image-based SNS Platform" : "PIGREST: 이미지 기반 SNS 플랫폼",
      subtitle: language === "en" ? "Backend Developer" : "백엔드 개발자",
      date: language === "en" ? "2025. 03 - Present" : "2025. 03 - 현재",
      description:
        language === "en"
          ? "Built a scalable e-commerce platform with microservices architecture"
          : "마이크로서비스 아키텍처로 핀터레스트 스타일의 SNS 플랫폼 구축",
      type: "projects",
      status: "ongoing",
      projectLink: "/portfolio?file=intro1",
    },
    {
      id: "proj-2",
      title: language === "en" ? "RE-VERSE: Metaverse-based Photo Album Service" : "RE-VERSE: 메타버스 기반 포토북 서비스",
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
      title: language === "en" ? "PARSLEY: Online Study Service" : "PARSLEY: 화상 온라인 스터디 서비스",
      subtitle: language === "en" ? "Full-stack Developer" : "풀스택 개발자",
      date: language === "en" ? "2019" : "2019",
      description:
        language === "en"
          ? "Created a secure mobile payment application with biometric authentication"
          : "생체 인증을 통한 안전한 모바일 결제 애플리케이션을 개발",
      type: "projects",
      status: "completed",
      projectLink: "/portfolio?file=intro3",
    },

    // Certification items
    {
      id: "cert-1",
      title: language === "en" ? "TOPCIT(ICT Competency Index Test) - Level 4" : "TOPCIT(ICT역량지수평가) 수준 4",
      subtitle: language === "en" ? "IITP" : "정보통신기획평가원",
      date: language === "en" ? "2021" : "2021",
      description:
        language === "en"
          ? ""
          : "",
      type: "certification",
      status: "completed",
    },
    {
      id: "cert-2",
      title: language === "en" ? "Engineer Information Processing" : "정보처리기사",
      subtitle: language === "en" ? "HRDK" : "한국산업인력공단",
      date: language === "en" ? "2021" : "2021",
      description:
        language === "en"
          ? ""
          : "",
      type: "certification",
      status: "completed",
    },
    {
      id: "cert-3",
      title: language === "en" ? "Craftsman Information Processing" : "정보처리기능사",
      subtitle: language === "en" ? "HRDK" : "한국산업인력공단",
      date: language === "en" ? "2020" : "2020",
      description:
        language === "en"
          ? ""
          : "",
      type: "certification",
      status: "completed",
    },
    // Awards items
    {
      id: "award-1",
      title: language === "en" ? "Free Topic Project - Innovation Award" : "자율 프로젝트 - 우수상",
      subtitle: language === "en" ? "Samsung Electronics Co." : "삼성전자주식회사",
      date: language === "en" ? "2022. 11" : "2022. 11",
      description:
        language === "en"
          ? ""
          : "RE-VERSE 프로젝트로 서울 6반 1등",
      type: "awards",
      status: "completed",
    },
    {
      id: "award-2",
      title: language === "en" ? "" : "공통 프로젝트 (트랙: 웹기술) - 우수상",
      subtitle: language === "en" ? "Samsung Electronics Co." : "삼성전자주식회사",
      date: language === "en" ? "2022. 08" : "2022. 08",
      description:
        language === "en"
          ? ""
          : "PARSLEY 프로젝트로 서울 6반 3등",
      type: "awards",
      status: "completed",
    },
    {
      id: "award-3",
      title: language === "en" ? "1학기 성적 우수상" : "1학기 성적 우수상",
      subtitle: language === "en" ? "Samsung Electronics Co." : "삼성전자주식회사",
      date: language === "en" ? "2022. 05" : "2022. 05",
      description:
        language === "en"
          ? ""
          : "1학기 코딩 집중 과정 종합 성적 서울 19반 3등",
      type: "awards",
      status: "completed",
    },
    {
      id: "award-4",
      title: language === "en" ? "제 16회 TOPCIT 정기평가 - 우수상" : "제 16회 TOPCIT 정기평가 - 우수상",
      subtitle: language === "en" ? "스파르탄SW교육원" : "스파르탄SW교육원",
      date: language === "en" ? "2021. 12" : "2021. 12",
      description:
        language === "en"
          ? "."
          : ".",
      type: "awards",
      status: "completed",
    },
    {
      id: "award-5",
      title: language === "en" ? "제 16회 TOPCIT 정기평가 - 특별상" : "제 16회 TOPCIT 정기평가 - 특별상",
      subtitle: language === "en" ? "" : "IT여성기업인협회",
      date: language === "en" ? "2021. 12" : "2021. 12",
      description:
      language === "en"
        ? "."
        : ".",
      type: "awards",
      status: "completed",
    },
    {
      id: "award-6",
      title: language === "en" ? "2020년 하반기 TOPCIT 특별평가 - 장려상" : "2020년 하반기 TOPCIT 특별평가 - 장려상",
      subtitle: language === "en" ? "스파르탄SW교육원" : "스파르탄SW교육원",
      date: language === "en" ? "2020. 12" : "2020. 12",
      description:
      language === "en"
        ? "."
        : ".",
      type: "awards",
      status: "completed",
    },
    {
      id: "award-7",
      title: language === "en" ? "숭실대학교 소프트웨어학부 소프트웨어 공모전 - 대상" : "숭실대학교 소프트웨어학부 소프트웨어 공모전 - 대상",
      subtitle: language === "en" ? "숭실대학교 소프트웨어학부" : "숭실대학교 소프트웨어학부",
      date: language === "en" ? "2019. 11" : "2019. 11",
      description:
        language === "en"
          ? ""
          : "1대 N 간의 텍스트 공유의 불편함을 최소화하는 솔루션",
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
