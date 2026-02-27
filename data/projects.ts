import { ProjectMeta } from "./types";

export const projects: ProjectMeta[] = [
  {
    id: "project4",
    slug: "mockly",
    name: "Mockly",
    period: "2025.11 ~ 현재 진행중",
    techStack: [
      "Spring AI",
      "Spring Boot",
      "PostgreSQL",
      "Redis",
      "OpenAI",
      "Docker/Docker Compose",
      "Github Actions",
    ],
    githubUrl: "https://github.com/Mockly-Company/mockly-server",
    icon: "bot",
    pages: [
      { id: "intro4", name: "소개", type: "intro" },
      { id: "diagram4", name: "핵심 구현 사항", type: "diagram" },
      { id: "related4", name: "관련 글", type: "related" },
    ],
    relatedPosts: [
      {
        id: "multiple-security-filter-chain",
        title: "요청마다 다른 SecurityFilterChain을 적용해보자",
        description: "Spring Security의 Multiple SecurityFilterChain 적용 중 JWT 인증 필터가 계속 실행되던 원인과 해결 방법 정리",
        image: "",
        url: "https://blog.kancho.co/posts/%EC%9A%94%EC%B2%AD%EB%A7%88%EB%8B%A4-%EB%8B%A4%EB%A5%B8-SecurityFilterChain%EC%9D%84-%EC%A0%81%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90/",
      },
      {
        id: "transactional-outbox-payment",
        title: "Transactional Outbox 패턴 도입기; 결제 후 스케줄 예약하기",
        description: "외부 시스템 연동이 포함된 트랜잭션에서 데이터 정합성 확보하기",
        image: "https://blog.kancho.co/assets/img/posts/event-sequence-diagram.png",
        url: "https://blog.kancho.co/posts/Transactional-Outbox-%ED%8C%A8%ED%84%B4-%EB%8F%84%EC%9E%85%EA%B8%B0-%EA%B2%B0%EC%A0%9C-%ED%9B%84-%EC%8A%A4%EC%BC%80%EC%A4%84-%EC%98%88%EC%95%BD%ED%95%98%EA%B8%B0/",
      }
    ],
  },
  {
    id: "project1",
    slug: "pigrest",
    name: "Pigrest",
    period: "2025.05 ~ 잠정 중단",
    techStack: [
      "Spring Boot",
      "JPA",
      "MySQL",
      "Github Actions",
      "Amazon S3",
    ],
    githubUrl: "https://github.com/The-Greatest-Piggy/pigrest-server",
    icon: "pig",
    pages: [
      { id: "intro1", name: "소개", type: "intro" },
      { id: "diagram1", name: "핵심 구현 사항", type: "diagram" },
      { id: "related1", name: "관련 글", type: "related" },
    ],
    relatedPosts: [
      {
        id: "uuid",
        title: "UUID 적용기",
        description: "UUID를 도입하게 된 배경과 실제 코드에 어떻게 적용하였는가",
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
        description: "Spring MVC Request Lifecycle에서 HttpMessageConverter 톺아보기",
        image: "https://kanchoeun.github.io/assets/img/posts/spring-mvc-request-life-cycle-http-message-converter.svg",
        url: "https://blog.kancho.co/posts/Filter%EC%99%80-Interceptor%EC%97%90%EC%84%9C-Response%EC%9D%98-body%EB%A5%BC-%EC%88%98%EC%A0%95%ED%95%A0-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C/",
      },
      {
        id: "filter-exception-handler",
        title: "Filter에서 발생한 예외는 어떻게 처리할까",
        description: "GlobalExceptionHandler가 잡지 못하는 예외 처리 방법 (feat. AuthenticationEntryPoint)",
        image: "https://kanchoeun.github.io/assets/img/posts/jwt-filter-dispatcher-servlet.svg",
        url: "https://blog.kancho.co/posts/Filter%EC%97%90%EC%84%9C-%EB%B0%9C%EC%83%9D%ED%95%9C-%EC%98%88%EC%99%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%B2%98%EB%A6%AC%ED%95%A0%EA%B9%8C/",
      },
      {
        id: "cache-ttl-autosave-system",
        title: "캐시와 TTL로 효율적인 자동 저장 시스템 만들기",
        description: "Write-Behind & Cache Aside 패턴과 TTL 관리로 초안 자동 저장 최적화하기",
        image: "https://about.kancho.co/images/posts/pigrest/auto-save-sequence.svg",
        url: "https://blog.kancho.co/posts/%EC%BA%90%EC%8B%9C%EC%99%80-TTL%EB%A1%9C-%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-%EC%9E%90%EB%8F%99-%EC%A0%80%EC%9E%A5-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EB%A7%8C%EB%93%A4%EA%B8%B0/",
      },
    ],
  },
  {
    id: "project2",
    slug: "re-verse",
    name: "RE-VERSE",
    period: "2022.10 ~ 2024.11",
    techStack: [
      "Spring Boot",
      "JPA",
      "QueryDSL",
      "MySQL",
      "Amazon EKS",
      "GitLab CI",
      "Argo CD",
    ],
    githubUrl: "https://github.com/KANCHOEUN/re-verse",
    icon: "fish",
    pages: [
      { id: "intro2", name: "소개", type: "intro" },
      { id: "diagram2", name: "핵심 구현 사항", type: "diagram" },
      { id: "related2", name: "관련 글", type: "related" },
    ],
    relatedPosts: [
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
        description: "Argo CD 파이프라인 구축 방법 기록",
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
    ],
  },
  {
    id: "project3",
    slug: "parsley",
    name: "PARSLEY",
    period: "2022.07 ~ 2022.08",
    techStack: [
      "Spring Boot",
      "JPA",
      "MySQL",
      "Amazon EC2",
      "Amazon S3",
      "Docker/Docker Compose",
      "Redis",
      "Nginx",
    ],
    githubUrl: "https://github.com/KANCHOEUN/parsley",
    icon: "leaf",
    pages: [
      { id: "intro3", name: "소개", type: "intro" },
      { id: "diagram3", name: "핵심 구현 사항", type: "diagram" },
      { id: "related3", name: "관련 글", type: "related" },
    ],
    relatedPosts: [
      {
        id: "deploy-to-ec2-apply-https",
        title: "EC2에 배포 및 HTTPS 적용하기",
        description: "EC2에서 Docker Compose로 컨테이너를 관리하고, HTTPS 적용하기",
        image: "/images/posts/parsley/parsley-architecture.png",
        url: "https://www.notion.so/choeun/EC2-HTTPS-2269d8968ca381939975ef57e6cc1027",
      },
    ],
  },
];

// 헬퍼 함수
export const getProjectById = (id: string): ProjectMeta | undefined =>
  projects.find((p) => p.id === id);

export const getProjectBySlug = (slug: string): ProjectMeta | undefined =>
  projects.find((p) => p.slug === slug);

// 모든 블로그 포스트 가져오기 (openBlogPostById용)
export const getAllBlogPosts = () =>
  projects.flatMap((p) => p.relatedPosts);

export const getBlogPostById = (id: string) =>
  getAllBlogPosts().find((post) => post.id === id);
