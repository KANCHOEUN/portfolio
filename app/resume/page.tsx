"use client";
import LayoutWrapper from "@/components/layout-wrapper";
import Link from "next/link";
import { projects } from "@/data/projects";

import ParticlesBackground from "@/components/particles-background";
interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  type: "work" | "education" | "projects" | "certification" | "awards";
  status: "ongoing" | "paused" | "completed";
  projectLink?: string;
}
export default function ResumePage() {
  // All resume data in chronological order (newest first)
  const timelineItems: TimelineItem[] = [
    // Work items
    {
      id: "work-1",
      title: "주니어 백엔드 개발자",
      subtitle: "티맥스 비아이",
      date: "2023. 07 - 2024. 12",
      description: "Java와 MyBatis 기반 가격 정책, 재고 모듈 설계 및 개발",
      type: "work",
      status: "completed",
    },
    // Education items
    {
      id: "edu-1",
      title: "삼성 청년 소프트웨어 아카데미 7기",
      subtitle: "삼성전자 멀티캠퍼스",
      date: "2022.01 ~ 2022.12",
      description:
        "1,600시간 동안의 집중 교육과 실전 프로젝트 경험을 통해 백엔드 개발자로서의 역량 향상",
      type: "education",
      status: "completed",
    },
    {
      id: "edu-2",
      title: "소프트웨어 공학 학사",
      subtitle: "숭실대학교 소프트웨어학부",
      date: "2017 - 2022",
      description: "",
      type: "education",
      status: "completed",
    },
    ...projects.map((project) => ({
      id: project.id,
      title: `${project.name}: ${project.summary}`,
      subtitle: project.role,
      date: project.period,
      description: "",
      type: "projects" as const,
      status: project.status,
      projectLink: `/portfolio?file=${project.pages.find((page) => page.type === "intro")!.id}`,
    })),
    // Certification items
    {
      id: "cert-1",
      title: "TOPCIT(ICT역량지수평가) 수준 4",
      subtitle: "정보통신기획평가원",
      date: "2021",
      description: "",
      type: "certification",
      status: "completed",
    },
    {
      id: "cert-2",
      title: "정보처리기사",
      subtitle: "한국산업인력공단",
      date: "2021",
      description: "",
      type: "certification",
      status: "completed",
    },
    {
      id: "cert-3",
      title: "정보처리기능사",
      subtitle: "한국산업인력공단",
      date: "2020",
      description: "",
      type: "certification",
      status: "completed",
    },
    // Awards items
    {
      id: "award-1",
      title: "자율 프로젝트 - 우수상",
      subtitle: "삼성전자주식회사",
      date: "2022. 11",
      description: "RE-VERSE 프로젝트로 서울 6반 1등",
      type: "awards",
      status: "completed",
    },
    {
      id: "award-2",
      title: "공통 프로젝트 (트랙: 웹기술) - 우수상",
      subtitle: "삼성전자주식회사",
      date: "2022. 08",
      description: "PARSLEY 프로젝트로 서울 6반 3등",
      type: "awards",
      status: "completed",
    },
    {
      id: "award-3",
      title: "1학기 성적 우수상",
      subtitle: "삼성전자주식회사",
      date: "2022. 05",
      description: "1학기 코딩 집중 과정 종합 성적 서울 19반 3등",
      type: "awards",
      status: "completed",
    },
    {
      id: "award-4",
      title: "제 16회 TOPCIT 정기평가 - 우수상",
      subtitle: "스파르탄SW교육원",
      date: "2021. 12",
      description: ".",
      type: "awards",
      status: "completed",
    },
    {
      id: "award-5",
      title: "제 16회 TOPCIT 정기평가 - 특별상",
      subtitle: "IT여성기업인협회",
      date: "2021. 12",
      description: ".",
      type: "awards",
      status: "completed",
    },
    {
      id: "award-6",
      title: "2020년 하반기 TOPCIT 특별평가 - 장려상",
      subtitle: "스파르탄SW교육원",
      date: "2020. 12",
      description: ".",
      type: "awards",
      status: "completed",
    },
    {
      id: "award-7",
      title: "숭실대학교 소프트웨어학부 소프트웨어 공모전 - 대상",
      subtitle: "숭실대학교 소프트웨어학부",
      date: "2019. 11",
      description: "1대 N 간의 텍스트 공유의 불편함을 최소화하는 솔루션",
      type: "awards",
      status: "completed",
    },
  ];
  // Colors for different branch types
  const branchColors: Record<string, string> = {
    work: "var(--blue)", // Blue
    education: "var(--purple)", // Purple
    projects: "var(--green)", // Green
    certification: "var(--yellow)", // Yellow
    awards: "var(--red)", // Red
    me: "var(--foreground)", // Gray (main branch)
  };
  // Group items by type
  const groupedItems: Record<string, TimelineItem[]> = {};
  timelineItems.forEach((item) => {
    if (!groupedItems[item.type]) {
      groupedItems[item.type] = [];
    }
    groupedItems[item.type].push(item);
  });
  // Order of branch types
  const branchOrder = [
    "work",
    "education",
    "projects",
    "certification",
    "awards",
  ];
  return (
    <LayoutWrapper>
      <ParticlesBackground />
      <div className="p-6 bg-[var(--background)] min-h-full">
        <div className="git-graph-container pb-2 relative">
          {/* Main branch line - 위치 고정 */}
          <div className="main-branch fixed-branch-line left-0 top-0 bottom-0 w-1 bg-[var(--foreground)]"></div>

          {/* Branch sections */}
          {branchOrder.map((branchType) => (
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
                <h2
                  className="text-lg font-semibold ml-20 py-3"
                  style={{ color: branchColors[branchType] }}
                >
                  {branchType === "work"
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
                <div key={item.id} className="branch-item flex">
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
                      className={`absolute top-3 left-[35px] w-3 h-3 rounded-full border-2 ${item.status === "ongoing" ? "bg-transparent" : ""}`}
                      style={{
                        backgroundColor:
                          item.status !== "completed"
                            ? "transparent"
                            : branchColors[branchType],
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
                    className={`flex-1 bg-[var(--elevated)]   rounded-md p-4 mb-4 ml-0 ${item.projectLink ? "hover:opacity-90" : ""}`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">
                        {item.projectLink ? (
                          <Link href={item.projectLink}>{item.title}</Link>
                        ) : (
                          item.title
                        )}
                      </h3>
                      <span className="text-sm text-[var(--green)]">
                        {item.date}
                      </span>
                    </div>
                    <div className="text-sm text-[var(--foreground)]">
                      {item.subtitle}
                    </div>
                    <p className="text-sm text-[var(--foreground)]">
                      {item.description}
                    </p>
                    {item.projectLink && (
                      <div className="text-xs text-[var(--blue)] mt-1">
                        {"프로젝트 상세보기"} →
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
  );
}
