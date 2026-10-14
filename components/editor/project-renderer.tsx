import { getProjectPage } from "@/data/projects";
import { infoContents, diagramContents } from "../project-content";
import InfoPageWrapper from "../project-common/InfoPageWrapper";
import DiagramPageWrapper from "../project-common/DiagramPageWrapper";
import BlogCard from "../blog-card";
export default function ProjectRenderer({
  pageId,
  onOpenArticle,
}: {
  pageId: string;
  onOpenArticle: (url: string, title: string) => void;
}) {
  const entry = getProjectPage(pageId);
  if (!entry) return null;
  const { project, page } = entry;
  if (page.type === "intro") {
    const Content = infoContents[project.slug as keyof typeof infoContents];
    return (
      <InfoPageWrapper
        title={project.name}
        githubUrl={project.githubUrl}
        period={project.period}
        techStack={project.techStack}
      >
        <Content />
      </InfoPageWrapper>
    );
  }
  if (page.type === "diagram") {
    const Content =
      diagramContents[project.slug as keyof typeof diagramContents];
    return (
      <DiagramPageWrapper
        title={`${project.name} 설계 및 구현`}
        description={`${project.name}의 설계와 주요 구현 내용을 소개합니다.`}
      >
        <Content />
      </DiagramPageWrapper>
    );
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">{project.name} 관련 글</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {project.relatedPosts.map((post) => (
          <BlogCard key={post.id} {...post} onClick={onOpenArticle} />
        ))}
      </div>
    </div>
  );
}
