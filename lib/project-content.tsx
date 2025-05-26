export interface ProjectInfo {
  period: string
  techStack: string[]
  githubUrl: string
}

// 프로젝트 정보 데이터
export const projectInfo: Record<string, ProjectInfo> = {
  project1: {
    period: "2023.03 ~ 2023.08",
    techStack: ["Spring Boot", "JPA", "MySQL", "Github Actions", "AWS S3"],
    githubUrl: "https://github.com/username/project1",
  },
  project2: {
    period: "2023.09 ~ 2024.02",
    techStack: ["React Native", "Node.js", "MongoDB", "AWS", "Docker"],
    githubUrl: "https://github.com/username/project2",
  },
  project3: {
    period: "2024.03 ~ 현재",
    techStack: ["Python", "TensorFlow", "PostgreSQL", "Kubernetes", "GCP"],
    githubUrl: "https://github.com/username/project3",
  },
}

// 콘텐츠 데이터 (번역 키만 포함)
export const projectContentData = {
  intro1: {
    projectKey: "project1" as keyof typeof projectInfo,
    titleKey: "content.project.one.intro.title",
    sections: [
      {
        type: "description",
        contentKey: "content.project.one.intro.desc",
      },
      {
        type: "section",
        titleKey: "content.project.one.overview",
        contentKey: "content.project.one.overview.desc",
      },
    ],
  },
  diagram1: {
    titleKey: "content.project.one.diagram.title",
    hasToc: true,
    sections: [
      {
        type: "description",
        contentKey: "content.project.one.diagram.desc",
      },
      {
        type: "toc",
        items: [
          { id: "architecture", titleKey: "content.project.one.architecture" },
          { id: "erd", titleKey: "content.project.one.erd" },
          { id: "sequence", titleKey: "content.project.one.sequence" },
        ],
      },
      {
        type: "section",
        id: "architecture",
        titleKey: "content.project.one.architecture",
        contentKey: "content.project.one.architecture.desc",
      },
      {
        type: "list",
        items: ["content.project.one.frontend", "content.project.one.backend", "content.project.one.database"],
      },
      {
        type: "section",
        id: "erd",
        titleKey: "content.project.one.erd",
        contentKey: "content.project.one.erd.desc",
      },
      {
        type: "section",
        id: "sequence",
        titleKey: "content.project.one.sequence",
        contentKey: "content.project.one.sequence.desc",
      },
    ],
  },
  intro2: {
    projectKey: "project2" as keyof typeof projectInfo,
    titleKey: "content.project.two.intro.title",
    sections: [
      {
        type: "description",
        contentKey: "content.project.two.intro.desc",
      },
      {
        type: "section",
        titleKey: "content.project.two.key.features",
        contentKey: null,
      },
      {
        type: "list",
        items: [
          "content.project.two.activity.tracking",
          "content.project.two.meal.planning",
          "content.project.two.sleep.analysis",
        ],
      },
    ],
  },
  diagram2: {
    titleKey: "content.project.two.architecture.title",
    hasToc: true,
    sections: [
      {
        type: "toc",
        items: [
          { id: "system-design", titleKey: "content.project.two.system.design" },
          { id: "tech-stack", titleKey: "content.project.two.tech.stack" },
          { id: "api-design", titleKey: "content.project.two.api.design" },
        ],
      },
      {
        type: "section",
        id: "system-design",
        titleKey: "content.project.two.system.design",
        contentKey: null,
      },
      {
        type: "code",
        content: "Mobile App → API Gateway → Microservices → Database",
      },
      {
        type: "section",
        id: "tech-stack",
        titleKey: "content.project.two.tech.stack",
        contentKey: null,
      },
      {
        type: "list",
        items: [
          "content.project.two.react.native",
          "content.project.two.nodejs",
          "content.project.two.mongodb",
          "content.project.two.aws",
        ],
      },
      {
        type: "section",
        id: "api-design",
        titleKey: "content.project.two.api.design",
        contentKey: "content.project.two.api.design.desc",
      },
    ],
  },
  intro3: {
    projectKey: "project3" as keyof typeof projectInfo,
    titleKey: "content.project.three.overview.title",
    sections: [
      {
        type: "description",
        contentKey: "content.project.three.overview.desc",
      },
      {
        type: "section",
        titleKey: "content.project.three.problem.statement",
        contentKey: "content.project.three.problem.desc",
      },
    ],
  },
  diagram3: {
    titleKey: "content.project.three.architecture.title",
    hasToc: true,
    sections: [
      {
        type: "toc",
        items: [
          { id: "high-level", titleKey: "content.project.three.high.level.design" },
          { id: "data-flow", titleKey: "content.project.three.data.flow" },
          { id: "ml-pipeline", titleKey: "content.project.three.ml.pipeline" },
        ],
      },
      {
        type: "section",
        id: "high-level",
        titleKey: "content.project.three.high.level.design",
        contentKey: null,
      },
      {
        type: "list",
        items: [
          "content.project.three.data.collection",
          "content.project.three.processing.engine",
          "content.project.three.analysis.framework",
          "content.project.three.visualization.dashboard",
        ],
      },
      {
        type: "section",
        id: "data-flow",
        titleKey: "content.project.three.data.flow",
        contentKey: null,
      },
      {
        type: "code",
        content: "Raw Data → ETL Pipeline → Data Lake → Analysis → Visualization",
      },
      {
        type: "section",
        id: "ml-pipeline",
        titleKey: "content.project.three.ml.pipeline",
        contentKey: "content.project.three.ml.pipeline.desc",
      },
    ],
  },
}

// 관련 글 데이터
export const relatedArticlesData = {
  related1: ["how-we-built-project-one", "lessons-learned", "case-study", "future-roadmap"],
  related2: ["user-engagement", "performance-optimization", "health-api-documentation"],
  related3: ["scalable-data-processing", "machine-learning-models", "data-visualization-techniques", "team-structure"],
}
