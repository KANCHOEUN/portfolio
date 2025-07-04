import DiagramPageWrapper from "../project-common/DiagramPageWrapper";
import { diagramContents } from ",,/project-content/contents";

export default function Project3Diagram() {
  const DiagramContent = diagramContents.project3;
  return (
    <DiagramPageWrapper
      title="PARSLEY 시스템 아키텍처"
      description="PARSLEY의 시스템 아키텍처와 ERD, 시퀀스 다이어그램을 설명합니다."
      toc={[
        { id: "architecture", label: "아키텍처" },
        // { id: "er-diagram", label: "ERD" },
        { id: "sequence-diagram", label: "시퀀스 다이어그램" },
      ]}
    >
      <DiagramContent />
    </DiagramPageWrapper>
  );
} 