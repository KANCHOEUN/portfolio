import DiagramPageWrapper from "../project-common/DiagramPageWrapper";
import { diagramContents } from "../project-content/contents";

export default function Project2Diagram() {
  const DiagramContent = diagramContents.project2;
  return (
    <DiagramPageWrapper
      title="RE-VERSE 시스템 아키텍처"
      description="RE-VERSE의 시스템 설계와 기술 스택, API 설계를 설명합니다."
      toc={[
        { id: "system-design", label: "시스템 설계" },
        { id: "tech-stack", label: "기술 스택" },
        { id: "api-design", label: "API 설계" },
      ]}
    >
      <DiagramContent />
    </DiagramPageWrapper>
  );
} 