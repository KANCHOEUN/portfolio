// 콘텐츠 데이터 (번역 키만 포함) - 레거시 i18n 기반 콘텐츠용
// 새 프로젝트는 components/project-content/{project-name}/ 폴더에 JSX로 작성
export const projectContentData = {
  intro1: {
    projectKey: "project1",
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
    projectKey: "project2",
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
    projectKey: "project3",
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
  intro4: {
    projectKey: "project4",
    titleKey: "content.project.four.intro.title",
    sections: [
      {
        type: "description",
        contentKey: "content.project.four.intro.desc",
      },
      {
        type: "section",
        titleKey: "content.project.four.core.features",
        contentKey: null,
      },
      {
        type: "list",
        items: [
          "content.project.four.feature.contract",
          "content.project.four.feature.mock",
          "content.project.four.feature.analytics",
        ],
      },
    ],
  },
  diagram4: {
    titleKey: "content.project.four.design.title",
    hasToc: true,
    sections: [
      {
        type: "description",
        contentKey: "content.project.four.design.desc",
      },
      {
        type: "toc",
        items: [
          { id: "contract-testing", titleKey: "content.project.four.contract.testing" },
          { id: "mock-server-orchestration", titleKey: "content.project.four.mock.orchestration" },
          { id: "observability", titleKey: "content.project.four.observability" },
        ],
      },
      {
        type: "section",
        id: "contract-testing",
        titleKey: "content.project.four.contract.testing",
        contentKey: "content.project.four.contract.testing.desc",
      },
      {
        type: "section",
        id: "mock-server-orchestration",
        titleKey: "content.project.four.mock.orchestration",
        contentKey: "content.project.four.mock.orchestration.desc",
      },
      {
        type: "section",
        id: "observability",
        titleKey: "content.project.four.observability",
        contentKey: "content.project.four.observability.desc",
      },
      {
        type: "code",
        content: "Contract Repo → CI Pipeline → Ephemeral Mock Runtime → Observability Stack",
      },
    ],
  },
}
