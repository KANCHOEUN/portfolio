import InfoPageWrapper from "../project-common/InfoPageWrapper";
import { projectInfo } from "@/lib/project-content";
import { infoContents } from "../project-content/contents";

export default function Project2Info() {
  const info = projectInfo.project2;
  const InfoContent = infoContents.project2;
  return (
    <InfoPageWrapper
      title="RE-VERSE"
      githubUrl={info.githubUrl}
      period={info.period}
      techStack={info.techStack}
    >
      <InfoContent />
    </InfoPageWrapper>
  );
} 