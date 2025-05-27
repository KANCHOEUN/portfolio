import InfoPageWrapper from "../project-common/InfoPageWrapper";
import { projectInfo } from "@/lib/project-content";
import { infoContents } from "../project-content/contents";

export default function Project3Info() {
  const info = projectInfo.project3;
  const InfoContent = infoContents.project3;
  return (
    <InfoPageWrapper
      title="PARSLEY"
      githubUrl={info.githubUrl}
      period={info.period}
      techStack={info.techStack}
    >
      <InfoContent />
    </InfoPageWrapper>
  );
} 