// 다국어 지원을 위한 번역 데이터와 유틸리티 함수

export type Language = "ko" | "en"

// 번역 키 타입 정의
export interface TranslationKeys {
  // 헤더
  "header.about": string
  "header.resume": string
  "header.portfolio": string

  // 터미널
  "terminal.help.desc": string
  "terminal.whoami.desc": string
  "terminal.clear.desc": string
  "terminal.skills.desc": string
  "terminal.history.desc": string
  "terminal.unknown.command": string
  "terminal.name": string
  "terminal.role": string
  "terminal.intro": string
  "terminal.expertise": string
  "terminal.beliefs": string
  "terminal.current.work": string
  "terminal.microservice.optimization": string
  "terminal.performance.tuning": string
  "terminal.opensource.contribution": string
  "terminal.recent.activity": string
  "terminal.activity.1": string
  "terminal.activity.2": string
  "terminal.activity.3": string
  "terminal.activity.4": string
  "terminal.placeholder": string

  // 포트폴리오
  "portfolio.explorer": string
  "portfolio.no.file": string
  "portfolio.file.not.found": string

  // 프로젝트
  "project.one": string
  "project.two": string
  "project.three": string
  "project.intro": string
  "project.diagram": string
  "project.related": string

  // 스킬
  "skills.backend": string
  "skills.infrastructure": string

  // 이력서
  "resume.work": string
  "resume.education": string
  "resume.projects": string
  "resume.certification": string
  "resume.awards": string
  "resume.senior.backend.developer": string
  "resume.backend.developer": string
  "resume.junior.developer": string
  "resume.tech.company": string
  "resume.software.solutions": string
  "resume.web.startup": string
  "resume.present": string
  "resume.led.microservices": string
  "resume.developed.apis": string
  "resume.fullstack.work": string
  "resume.masters.cs": string
  "resume.bachelors.se": string
  "resume.tech.university": string
  "resume.engineering.college": string
  "resume.distributed.systems": string
  "resume.graduated.honors": string
  "resume.ecommerce.platform": string
  "resume.analytics.dashboard": string
  "resume.mobile.payment": string
  "resume.lead.developer": string
  "resume.backend.developer.role": string
  "resume.fullstack.developer": string
  "resume.built.scalable.ecommerce": string
  "resume.realtime.analytics": string
  "resume.secure.mobile.payment": string
  "resume.aws.certified": string
  "resume.kubernetes.certified": string
  "resume.amazon.web.services": string
  "resume.cloud.native.foundation": string
  "resume.aws.certification.desc": string
  "resume.kubernetes.certification.desc": string
  "resume.innovation.award": string
  "resume.hackathon.winner": string
  "resume.tech.conference": string
  "resume.global.code.fest": string
  "resume.innovation.recognition": string
  "resume.hackathon.first.place": string
  "resume.view.project.details": string

  // 프로젝트 내용
  "content.project.one.intro.title": string
  "content.project.one.intro.desc": string
  "content.project.one.overview": string
  "content.project.one.overview.desc": string
  "content.project.one.diagram.title": string
  "content.project.one.diagram.desc": string
  "content.project.one.architecture": string
  "content.project.one.architecture.desc": string
  "content.project.one.frontend": string
  "content.project.one.backend": string
  "content.project.one.database": string
  "content.project.two.intro.title": string
  "content.project.two.intro.desc": string
  "content.project.two.key.features": string
  "content.project.two.activity.tracking": string
  "content.project.two.meal.planning": string
  "content.project.two.sleep.analysis": string
  "content.project.two.architecture.title": string
  "content.project.two.system.design": string
  "content.project.two.tech.stack": string
  "content.project.two.react.native": string
  "content.project.two.nodejs": string
  "content.project.two.mongodb": string
  "content.project.two.aws": string
  "content.project.two.resources.title": string
  "content.project.three.overview.title": string
  "content.project.three.overview.desc": string
  "content.project.three.problem.statement": string
  "content.project.three.problem.desc": string
  "content.project.three.architecture.title": string
  "content.project.three.high.level.design": string
  "content.project.three.data.collection": string
  "content.project.three.processing.engine": string
  "content.project.three.analysis.framework": string
  "content.project.three.visualization.dashboard": string
  "content.project.three.data.flow": string
  "content.project.three.documentation.title": string
  "content.project.one.erd": string
  "content.project.one.erd.desc": string
  "content.project.one.sequence": string
  "content.project.one.sequence.desc": string
  "content.project.two.api.design": string
  "content.project.two.api.design.desc": string
  "content.project.three.ml.pipeline": string
  "content.project.three.ml.pipeline.desc": string

  // 공통
  "common.copyright": string
}

// 한국어 번역 (기본)
const ko: TranslationKeys = {
  // 헤더
  "header.about": "소개",
  "header.resume": "이력서",
  "header.portfolio": "포트폴리오",

  // 터미널
  "terminal.help.desc": "사용 가능한 명령어 표시",
  "terminal.whoami.desc": "내 정보 표시",
  "terminal.clear.desc": "터미널 지우기",
  "terminal.skills.desc": "기술 스택 표시",
  "terminal.history.desc": "최근 활동 표시",
  "terminal.unknown.command": "명령어를 찾을 수 없습니다. 'help'를 입력하여 사용 가능한 명령어를 확인하세요.",
  "terminal.name": "이름: 조혜은",
  "terminal.role": "직무: 백엔드 개발자",
  "terminal.intro": "반복되는 비효율을 줄이고, 본질에 집중하는 백엔드 개발자입니다.",
  "terminal.expertise": "가독성과 안정성을 중요하게 생각하며, 유연하게 확장할 수 있는 코드를 작성하는 데 집중합니다.",
  "terminal.beliefs": "문제를 정확하게 인식하고, 팀과 협력해 원활한 소통 속에서 함께 개선해 나가는 것을 중요하게 생각합니다.",
  "terminal.current.work": "여러 프로젝트를 거치며, 다음과 같은 경험들을 쌓아왔습니다.\n- Java & Spring Boot 기반의 웹 서비스 백엔드 설계 및 개발",
  "terminal.microservice.optimization": "- 관계형 데이터베이스 설계 및 MyBatis, JPA(ORM) 활용\n- Redis를 활용한 성능 최적화 및 데이터 캐싱",
  "terminal.performance.tuning": "- Docker & Docker Compose를 활용한 로컬 및 테스트 환경 컨테이너 구성\n- Github CI와 Argo CD를 활용한 CI/CD 파이프라인 구축",
  "terminal.opensource.contribution": "- AWS EKS, VPC, ELB를 활용한 클라우드 인프라 구축",
  "terminal.recent.activity": "최근 활동:",
  "terminal.activity.1": "1. 2025-05 ~ 현재: [개인] 포트폴리오 사이트 구현 중",
  "terminal.activity.2": "2. 2025-04 ~ 현재: [개인] Pigrest 프로젝트 진행 중",
  "terminal.activity.3": "3. 2023-07 ~ 2024-12: [티맥스비아이] FOCUS 서비스 - 가격 정책, 재고 모듈 설계 및 구현",
  "terminal.activity.4": "4. 2022-01 ~ 2022-12: [삼성청년SW아카데미] RE-VERSE & PARSLEY 프로젝트 진행",
  "terminal.placeholder": "'help' 입력하여 명령어 확인 또는 ↑↓ 키로 명령어 탐색",

  // 포트폴리오
  "portfolio.explorer": "탐색기",
  "portfolio.no.file": "열린 파일이 없습니다",
  "portfolio.file.not.found": "파일을 찾을 수 없습니다",

  // 프로젝트
  "project.one": "Pigrest",
  "project.two": "RE-VERSE",
  "project.three": "PARSLEY",
  "project.intro": "소개",
  "project.diagram": "설계 및 구현",
  "project.related": "관련 글",

  // 스킬
  "skills.backend": "백엔드",
  "skills.infrastructure": "인프라",

  // 이력서
  "resume.work": "경력",
  "resume.education": "교육",
  "resume.projects": "프로젝트",
  "resume.certification": "자격증",
  "resume.awards": "수상",
  "resume.senior.backend.developer": "시니어 백엔드 개발자",
  "resume.backend.developer": "백엔드 개발자",
  "resume.junior.developer": "주니어 개발자",
  "resume.tech.company": "테크 컴퍼니",
  "resume.software.solutions": "소프트웨어 솔루션즈",
  "resume.web.startup": "웹 스타트업",
  "resume.present": "현재",
  "resume.led.microservices": "마이크로서비스 아키텍처 개발을 주도",
  "resume.developed.apis": "RESTful API를 개발하고 CI/CD 파이프라인을 구현",
  "resume.fullstack.work": "Java와 Spring Boot를 사용한 풀스택 웹 개발 작업을 수행",
  "resume.masters.cs": "컴퓨터 과학 석사",
  "resume.bachelors.se": "소프트웨어 공학 학사",
  "resume.tech.university": "테크 대학교",
  "resume.engineering.college": "공학 대학",
  "resume.distributed.systems": "분산 시스템 및 클라우드 컴퓨팅 전공",
  "resume.graduated.honors": "우등으로 졸업. 여러 해커톤에 참가",
  "resume.ecommerce.platform": "이커머스 플랫폼",
  "resume.analytics.dashboard": "실시간 분석 대시보드",
  "resume.mobile.payment": "모바일 결제 앱",
  "resume.lead.developer": "리드 개발자",
  "resume.backend.developer.role": "백엔드 개발자",
  "resume.fullstack.developer": "풀스택 개발자",
  "resume.built.scalable.ecommerce": "마이크로서비스 아키텍처로 확장 가능한 이커머스 플랫폼을 구축",
  "resume.realtime.analytics": "일일 수백만 개의 이벤트를 처리하는 실시간 분석 시스템을 개발",
  "resume.secure.mobile.payment": "생체 인증을 통한 안전한 모바일 결제 애플리케이션을 개발",
  "resume.aws.certified": "AWS 공인 솔루션스 아키텍트",
  "resume.kubernetes.certified": "공인 쿠버네티스 관리자",
  "resume.amazon.web.services": "아마존 웹 서비스",
  "resume.cloud.native.foundation": "클라우드 네이티브 컴퓨팅 재단",
  "resume.aws.certification.desc": "AWS에서 분산 시스템을 설계하기 위한 전문 자격증",
  "resume.kubernetes.certification.desc": "프로덕션 환경에서 쿠버네티스 클러스터를 관리하기 위한 자격증",
  "resume.innovation.award": "혁신상",
  "resume.hackathon.winner": "해커톤 우승자",
  "resume.tech.conference": "테크 컨퍼런스 2022",
  "resume.global.code.fest": "글로벌 코드 페스트",
  "resume.innovation.recognition": "복잡한 기술적 과제를 해결하는 혁신적인 접근 방식으로 인정",
  "resume.hackathon.first.place": "AI 솔루션에 중점을 둔 48시간 해커톤에서 1위를 차지",
  "resume.view.project.details": "프로젝트 상세보기",

  // 프로젝트 내용
  // PIGREST
  "content.project.one.intro.title": "프로젝트 원 소개",
  "content.project.one.intro.desc": "프로젝트 원에 대한 소개입니다. 프로젝트 개요, 목표 및 주요 기능을 포함합니다.",
  "content.project.one.overview": "개요",
  "content.project.one.overview.desc":
    "프로젝트 원은 사용자가 작업을 효율적으로 관리할 수 있도록 도와주는 웹 애플리케이션입니다.",
  "content.project.one.diagram.title": "프로젝트 원 핵심 구현 사항",
  "content.project.one.diagram.desc":
    "이 페이지에는 프로젝트 원의 핵심 구현 사항과 아키텍처가 포함되어 있습니다.",
  "content.project.one.architecture": "아키텍처",
  "content.project.one.architecture.desc": "애플리케이션은 다음 구성 요소를 가진 마이크로서비스 아키텍처를 따릅니다:",
  "content.project.one.frontend": "프론트엔드 (React)",
  "content.project.one.backend": "백엔드 API (Spring Boot)",
  "content.project.one.database": "데이터베이스 (MySQL)",
  // RE-VERES
  "content.project.two.intro.title": "RE-VERSE 소개",
  "content.project.two.intro.desc":
    "RE-VERSE는 추억을 특별하게 저장하고 공유하는 메타버스 기반 포토북 서비스입니다.",
  "content.project.two.key.features": "주요 기능",
  "content.project.two.activity.tracking": "활동 추적",
  "content.project.two.meal.planning": "식사 계획",
  "content.project.two.sleep.analysis": "수면 분석",
  "content.project.two.architecture.title": "프로젝트 투 핵심 구현 사항",
  "content.project.two.system.design": "시스템 설계",
  "content.project.two.tech.stack": "기술 스택",
  "content.project.two.react.native": "React Native",
  "content.project.two.nodejs": "Spring Boot",
  "content.project.two.mongodb": "MySQL",
  "content.project.two.aws": "AWS",
  "content.project.two.resources.title": "프로젝트 투 리소스",
  // PARSLEY
  "content.project.three.overview.title": "프로젝트 쓰리 개요",
  "content.project.three.overview.desc": "프로젝트 쓰리는 비즈니스 인텔리전스를 위한 AI 기반 데이터 분석 플랫폼입니다.",
  "content.project.three.problem.statement": "문제 정의",
  "content.project.three.problem.desc":
    "기업들은 대용량 데이터셋에서 의미 있는 인사이트를 효율적으로 추출하는 데 어려움을 겪고 있습니다.",
  "content.project.three.architecture.title": "프로젝트 쓰리 핵심 구현 사항",
  "content.project.three.high.level.design": "고수준 설계",
  "content.project.three.data.collection": "데이터 수집 계층",
  "content.project.three.processing.engine": "처리 엔진",
  "content.project.three.analysis.framework": "분석 프레임워크",
  "content.project.three.visualization.dashboard": "시각화 대시보드",
  "content.project.three.data.flow": "데이터 플로우",
  "content.project.three.documentation.title": "프로젝트 쓰리 문서",
  "content.project.one.erd": "ERD 설계",
  "content.project.one.erd.desc": "데이터베이스 엔티티 관계 다이어그램입니다.",
  "content.project.one.sequence": "시퀀스 다이어그램",
  "content.project.one.sequence.desc": "주요 기능의 시퀀스 다이어그램입니다.",
  "content.project.two.api.design": "API 설계",
  "content.project.two.api.design.desc": "RESTful API 설계 및 엔드포인�� 구조입니다.",
  "content.project.three.ml.pipeline": "ML 파이프라인",
  "content.project.three.ml.pipeline.desc": "머신러닝 모델 학습 및 배포 파이프라인입니다.",

  // 공통
  "common.copyright": "© 2025 Hia. CC BY 4.0 라이센스 적용",
}

// 영어 번역
const en: TranslationKeys = {
  // 헤더
  "header.about": "About",
  "header.resume": "Resume",
  "header.portfolio": "Portfolio",

  // 터미널
  "terminal.help.desc": "Show available commands",
  "terminal.whoami.desc": "Display information about me",
  "terminal.clear.desc": "Clear the terminal",
  "terminal.skills.desc": "Display my technical skills",
  "terminal.history.desc": "Show my recent activity",
  "terminal.unknown.command": "Command not found. Type 'help' to see available commands.",
  "terminal.name": "Name: Hong Gil-dong",
  "terminal.role": "Role: Backend Developer",
  "terminal.intro": "I'm a passionate backend developer focused on building robust and scalable systems.",
  "terminal.expertise": "My expertise includes Java, Spring Boot, and cloud infrastructure.",
  "terminal.beliefs": "I believe in clean code, thorough testing, and continuous learning.",
  "terminal.current.work": "Currently working on:",
  "terminal.microservice.optimization": "- Microservice architecture optimization",
  "terminal.performance.tuning": "- Performance tuning for high-traffic applications",
  "terminal.opensource.contribution": "- Contributing to open source projects",
  "terminal.recent.activity": "Recent Activity:",
  "terminal.activity.1": "1. 2023-12 ~ Present: Working on microservice architecture optimization",
  "terminal.activity.2": "2. 2023-06 ~ 2023-11: Developed high-performance API gateway",
  "terminal.activity.3": "3. 2022-09 ~ 2023-05: Built scalable backend for e-commerce platform",
  "terminal.activity.4": "4. 2022-01 ~ 2022-08: Implemented CI/CD pipeline for cloud deployment",
  "terminal.placeholder": "Type 'help' for commands or use ↑↓ to navigate commands",

  // 포트폴리오
  "portfolio.explorer": "EXPLORER",
  "portfolio.no.file": "No file is open",
  "portfolio.file.not.found": "File not found",

  // 프로젝트
  "project.one": "Pigrest",
  "project.two": "RE-VERSE",
  "project.three": "PARSLEY",
  "project.intro": "Introduction",
  "project.diagram": "Design & Implementation",
  "project.related": "Related Articles",

  // 스킬
  "skills.backend": "Backend",
  "skills.infrastructure": "Infrastructure",

  // 이력서
  "resume.work": "Work",
  "resume.education": "Education",
  "resume.projects": "Projects",
  "resume.certification": "Certification",
  "resume.awards": "Awards",
  "resume.senior.backend.developer": "Senior Backend Developer",
  "resume.backend.developer": "Backend Developer",
  "resume.junior.developer": "Junior Developer",
  "resume.tech.company": "Tech Company Inc.",
  "resume.software.solutions": "Software Solutions Ltd.",
  "resume.web.startup": "Web Startup",
  "resume.present": "Present",
  "resume.led.microservices": "Led the development of microservices architecture",
  "resume.developed.apis": "Developed RESTful APIs and implemented CI/CD pipelines",
  "resume.fullstack.work": "Worked on full-stack web development using Java and Spring Boot",
  "resume.masters.cs": "Master's in Computer Science",
  "resume.bachelors.se": "Bachelor's in Software Engineering",
  "resume.tech.university": "Tech University",
  "resume.engineering.college": "Engineering College",
  "resume.distributed.systems": "Specialized in Distributed Systems and Cloud Computing",
  "resume.graduated.honors": "Graduated with honors. Participated in multiple hackathons",
  "resume.ecommerce.platform": "E-commerce Platform",
  "resume.analytics.dashboard": "Real-time Analytics Dashboard",
  "resume.mobile.payment": "Mobile Payment App",
  "resume.lead.developer": "Lead Developer",
  "resume.backend.developer.role": "Backend Developer",
  "resume.fullstack.developer": "Full-stack Developer",
  "resume.built.scalable.ecommerce": "Built a scalable e-commerce platform with microservices architecture",
  "resume.realtime.analytics": "Developed a real-time analytics system processing millions of events daily",
  "resume.secure.mobile.payment": "Created a secure mobile payment application with biometric authentication",
  "resume.aws.certified": "AWS Certified Solutions Architect",
  "resume.kubernetes.certified": "Certified Kubernetes Administrator",
  "resume.amazon.web.services": "Amazon Web Services",
  "resume.cloud.native.foundation": "Cloud Native Computing Foundation",
  "resume.aws.certification.desc": "Professional certification for designing distributed systems on AWS",
  "resume.kubernetes.certification.desc": "Certification for managing Kubernetes clusters in production environments",
  "resume.innovation.award": "Innovation Award",
  "resume.hackathon.winner": "Hackathon Winner",
  "resume.tech.conference": "Tech Conference 2022",
  "resume.global.code.fest": "Global Code Fest",
  "resume.innovation.recognition": "Recognized for innovative approach to solving complex technical challenges",
  "resume.hackathon.first.place": "First place in a 48-hour hackathon focused on AI solutions",
  "resume.view.project.details": "View project details",

  // 프로젝트 내용
  "content.project.one.intro.title": "Project One Introduction",
  "content.project.one.intro.desc":
    "This is the introduction to Project One. It includes the project overview, goals, and key features.",
  "content.project.one.overview": "Overview",
  "content.project.one.overview.desc":
    "Project One is a web application that helps users manage their tasks efficiently.",
  "content.project.one.diagram.title": "Project One Diagram",
  "content.project.one.diagram.desc": "This page contains the architecture diagram and flow charts for Project One.",
  "content.project.one.architecture": "Architecture",
  "content.project.one.architecture.desc":
    "The application follows a microservices architecture with the following components:",
  "content.project.one.frontend": "Frontend (React)",
  "content.project.one.backend": "Backend API (Spring Boot)",
  "content.project.one.database": "Database (MySQL)",
  "content.project.two.intro.title": "Project Two Introduction",
  "content.project.two.intro.desc":
    "Project Two is a mobile application built with React Native. It focuses on health tracking and wellness.",
  "content.project.two.key.features": "Key Features",
  "content.project.two.activity.tracking": "Activity tracking",
  "content.project.two.meal.planning": "Meal planning",
  "content.project.two.sleep.analysis": "Sleep analysis",
  "content.project.two.architecture.title": "Project Two Architecture",
  "content.project.two.system.design": "System Design",
  "content.project.two.tech.stack": "Technology Stack",
  "content.project.two.react.native": "React Native",
  "content.project.two.nodejs": "Spring Boot",
  "content.project.two.mongodb": "MySQL",
  "content.project.two.aws": "AWS",
  "content.project.two.resources.title": "Project Two Resources",
  "content.project.three.overview.title": "Project Three Overview",
  "content.project.three.overview.desc":
    "Project Three is an AI-powered data analysis platform for business intelligence.",
  "content.project.three.problem.statement": "Problem Statement",
  "content.project.three.problem.desc":
    "Businesses struggle to extract meaningful insights from large datasets efficiently.",
  "content.project.three.architecture.title": "Project Three System Architecture",
  "content.project.three.high.level.design": "High-Level Design",
  "content.project.three.data.collection": "Data Collection Layer",
  "content.project.three.processing.engine": "Processing Engine",
  "content.project.three.analysis.framework": "Analysis Framework",
  "content.project.three.visualization.dashboard": "Visualization Dashboard",
  "content.project.three.data.flow": "Data Flow",
  "content.project.three.documentation.title": "Project Three Documentation",
  "content.project.one.erd": "ERD Design",
  "content.project.one.erd.desc": "Database entity relationship diagram.",
  "content.project.one.sequence": "Sequence Diagram",
  "content.project.one.sequence.desc": "Sequence diagrams for key functionalities.",
  "content.project.two.api.design": "API Design",
  "content.project.two.api.design.desc": "RESTful API design and endpoint structure.",
  "content.project.three.ml.pipeline": "ML Pipeline",
  "content.project.three.ml.pipeline.desc": "Machine learning model training and deployment pipeline.",

  // 공통
  "common.copyright": "© 2025 Hia. Licensed under CC BY 4.0",
}

// 번역 데이터
export const translations = {
  ko,
  en,
}

// 번역 함수
export function t(key: keyof TranslationKeys, language: Language = "ko"): string {
  return translations[language][key] || translations.ko[key] || key
}

// 현재 언어에 따른 번역 객체 반환
export function getTranslations(language: Language) {
  return translations[language] || translations.ko
}
