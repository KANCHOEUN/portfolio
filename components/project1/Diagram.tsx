import DiagramPageWrapper from "../project-common/DiagramPageWrapper";
import { diagramContents } from "../project-content/contents";

export default function Project1Diagram() {
  const DiagramContent = diagramContents.project1;
  return (
    <DiagramPageWrapper
      title="Pigrest 시스템 아키텍처"
      description="이 프로젝트의 시스템 구조와 데이터 흐름을 설명합니다."
      toc={[
        { id: "architecture", label: "아키텍처" },
        { id: "erd", label: "ERD" },
        { id: "sequence", label: "시퀀스" },
      ]}
    >
      <DiagramContent />
    </DiagramPageWrapper>
  );
} 