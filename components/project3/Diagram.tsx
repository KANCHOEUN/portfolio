import DiagramPageWrapper from "../project-common/DiagramPageWrapper";
import { diagramContents } from ",,/project-content/contents";

export default function Project3Diagram() {
  const DiagramContent = diagramContents.project3;
  return (
    <DiagramPageWrapper
      title="PARSLEY 시스템 아키텍처"
      description="PARSLEY의 시스템 아키텍처와 데이터 흐름, ML 파이프라인을 설명합니다."
      toc={[
        { id: "high-level", label: "고수준 설계" },
        { id: "data-flow", label: "데이터 플로우" },
        { id: "ml-pipeline", label: "ML 파이프라인" },
      ]}
    >
      <DiagramContent />
    </DiagramPageWrapper>
  );
} 