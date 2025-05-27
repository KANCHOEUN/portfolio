import InfoPageWrapper from "../project-common/InfoPageWrapper";
import { projectInfo } from "@/lib/project-content";
import { infoContents } from "../project-content/contents";

export default function Project1Info() {
  const info = projectInfo.project1;
  const InfoContent = infoContents.project1;
  return (
    <InfoPageWrapper
      title="Pigrest"
      githubUrl={info.githubUrl}
      period={info.period}
      techStack={info.techStack}
    >
      <InfoContent />
    </InfoPageWrapper>
  );
} 