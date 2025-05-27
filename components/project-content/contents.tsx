import Toggle from "@/components/common/Toggle";
import ImageZoom from "@/components/common/ImageZoom";
import { Square, SquareCheckBig, SquareDot } from "lucide-react";

const Todo = ({status, description}: {status: string, description: string}) => {
  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        { status == "done" && <SquareCheckBig size={18}/> }
        { status == "in-progress" && <SquareDot size={18} /> }
        { status == "ready" && <Square size={18}/> }
        <span>{description}</span>
      </div>
    </>
  )
}

// --- Project 1 ---
export function Project1InfoContent() {
  return (
    <>
      <p>Pigrest는 이미지 기반의 콘텐츠(핀)를 보드에 저장하고, 주제별로 공유할 수 있는 Pinterest 스타일의 SNS 플랫폼입니다.</p>
      <ImageZoom src="/images/posts/pigrest/thumbnail.png"
           alt="thumbnail" className="my-4 rounded" width="30%" />
      <h2 className="text-xl font-semibold mt-6 mb-4">✏️ 주요 기능</h2>
      <Todo status="done" description="Spring Security와 JWT 기반 로그인, 회원가입"/>
      <Todo status="done" description="나만의 프로필을 꾸미고, 관심 있는 사람들 팔로우로 소통"/>
      <Todo status="in-progress" description="마음에 드는 이미지들을 핀으로 저장하고, 주제별로 나만의 보드를 만들어 관리"/>
      <Todo status="ready" description="팔로우한 친구들의 새로운 핀들을 실시간으로 받아보고, 좋아요 및 댓글 작성"/>
      <Todo status="ready" description="핀이나 보드를 친구들과 공유하며 텍스트 채팅"/>
      <Todo status="ready" description="좋아요, 팔로우, 공유 등 활동에 대한 반응 알림"/>
    </>
  );
}
export function Project1DiagramContent() {
  return (
    <>
      <section id="architecture" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">아키텍처</h2>
        {/* <div>여기에 원하는 HTML/컴포넌트/이미지 등</div> */}
      </section>
      <section id="erd" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">ER 다이어그램</h2>
        {/* <img src="/images/project1/erd.png" alt="ERD" /> */}
      </section>
      <section id="sequence" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">인증 시퀀스 다이어그램</h2>
        {/* <div>시퀀스 다이어그램 설명 등 자유롭게</div> */}
      </section>
    </>
  );
}

// --- Project 2 ---
export function Project2InfoContent() {
  return (
    <>
      <p>RE-VERSE는 추억을 특별하게 저장하고 공유하는 메타버스 기반 포토북 서비스입니다.</p>
      <ImageZoom src="/images/posts/re-verse/thumbnail.jpg"
           alt="overview" className="my-2 rounded" width="30%" />
      <h2 className="text-xl font-semibold mt-6 mb-4">✏️ 주요 기능</h2>
      <Toggle title="React Quill 텍스트 에디터를 활용하여 추억들을 다이어리처럼 작성 및 관리">
        <ImageZoom src="/images/posts/re-verse/나의-아카이브-글-작성하기.gif" alt="quill" className="my-2 rounded" width="40%"
          caption="텍스트 에디터로 추억 작성하기" />
        <ImageZoom src="/images/posts/re-verse/친구-아카이브-글-쓰기-보기.gif" alt="quill" className="my-2 rounded" width="40%"
          caption="작성한 추억들 보기기" />
      </Toggle>
      <Toggle title="추억 저장소인 아카이브 별로 추억을 공유하고 싶은 친구들끼리 공유">
        <ImageZoom src="/images/posts/re-verse/아카이브-친구-초대.gif" alt="archive" className="my-2 rounded" width="40%"
          caption="아카이브 관리 - 친구에게 공유하기"
        />
        <ImageZoom src="/images/posts/re-verse/나의-아카이브-친구-초대-추방.gif" alt="archive" className="my-2 rounded" width="40%"
          caption="아카이브 3D 공간 - 친구에게 공유하기/내보내기"
        />
      </Toggle>
      <Toggle title="Three.js 기반 3D 공간에서 WebRTC로 P2P 연결을 통해 친구들과 함께 텍스트와 음성 채팅으로 상호 작용 가능">
        <ImageZoom src="/images/posts/re-verse/아카이브-설명.gif" alt="3d-chat" className="my-2 rounded" width="40%"
          caption="RE-VERSE 사용 가이드"/>
        <div className="my-2">
          <video 
            src="/images/posts/re-verse/아카이브-음성-채팅.mp4" 
            className="rounded w-full sm:w-[80%] md:w-[70%] lg:w-[70%] xl:w-[45%] 2xl:w-[40%]" 
            controls
            playsInline
          />
        </div>
        <p className="text-sm text-gray-500">아카이브 내 음성 채팅</p>
      </Toggle>
      <Toggle title="그 외 다양한 인터랙션 요소들">
        <ImageZoom src="/images/posts/re-verse/캐릭터-선택.gif" alt="select-character" className="my-2 rounded" width="40%" />
        <ImageZoom src="/images/posts/re-verse/개발자-정보.gif" alt="developer-info" className="my-2 rounded" width="40%" />
        <ImageZoom src="/images/posts/re-verse/지뢰게임.gif" alt="game" className="my-2 rounded" width="40%" />
      </Toggle>
    </>
  );
}
export function Project2DiagramContent() {
  return (
    <>
      <section id="system-design" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">아키텍처 설계</h2>
        <div>
          <ImageZoom src="/images/posts/re-verse/architecture.png"
              alt="architecture" className="my-4 rounded" width="40%" />
          <b>보안</b>, <b>재해복구</b>, <b>고가용성</b>의 특성을 고려하여 AWS 기반 아키텍처를 설계하였습니다.
          <br/>
          <br/>
          <p>
            SSAFY에서 이전까지 진행하던 프로젝트들은 EC2 서버만의 public IP만을 제공받았기 때문에, 외부에서의 침입 시도가 여러 번 있었습니다. <br/>
            이러한 문제를 해결하기 위해 다음과 같은 방법으로 외부에서의 직접적인 접근이 불가능하도록 구성했습니다.<br/>
            <ul>
              <li>먼저 VPC에 <b>Internet Gateway</b>(IGW)를 두어, <b>외부 요청은 IGW를 통해서만</b> 들어오도록 하였습니다.</li>
              <li>Public Subnet에 <b>Application Load Balancer</b>(ALB)를 배치하여, <b>IGW에 들어온 외부 요청은 ALB로 전달</b>하도록 하였습니다.</li>
              <li>그리고 VPC 내부에서만 통신이 가능한 <b>Private Subnet에</b> 서비스가 배포된 <b>EC2 인스턴스들을 배치</b>하였고, <b>ALB를 통해 접근이 가능</b>하도록 함으로써 보안을 강화하였습니다.</li>
            </ul>
          </p>
        </div>
      </section>
      <section id="ci-cd-pipeline" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">CI/CD 파이프라인 구조</h2>
        <ImageZoom src="/images/posts/re-verse/ci-cd-pipeline.png"
              alt="ci-cd-pipeline" className="my-4 rounded" width="40%" />
        <p>CI/CD 파이프라인은 소스 코드 변경 시 자동으로 테스트, 빌드, 배포를 수행하여 빠른 피드백을 제공합니다.</p>
      </section>
      <section id="api-design" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">API 설계</h2>
        <div>RESTful API 설계 및 엔드포인트 구조 설명</div>
      </section>
    </>
  );
}

// --- Project 3 ---
export function Project3InfoContent() {
  return (
    <>
      <p>PARSLEY는 WebRTC를 활용한 Gamification 기반 화상 온라인 스터디 서비스입니다.</p>
      <ImageZoom src="/images/posts/parsley/thumbnail.png"
           alt="overview" className="my-2 rounded" width="100%" />
      <h2 className="text-xl font-semibold mt-6 mb-4">✏️ 주요 기능</h2>
      <Toggle title="실시간 화상 채팅 및 화면 동시 공유 가능">
        <ImageZoom src="/images/posts/parsley/[심플]스터디룸-입장(여러 사용자).gif" alt="enter-studyroom" className="my-2 rounded" width="40%"
          caption="스터디룸 입장장" />
      </Toggle>
      {/* TODO: 하나 추가 */}
      <Toggle title="허브 키우기 및 도감 채우기 등과 같은 게임적인 요소">
        <ImageZoom src="/images/posts/parsley/[심플]허브심기.gif" alt="planting-herb" className="my-2 rounded" width="40%"
          caption="허브 심기" />
        <ImageZoom src="/images/posts/parsley/[심플]스터디룸-수확,랭킹,알림.gif" alt="harveting-herb" className="my-2 rounded" width="40%"
          caption="허브 수확하기" />
        <ImageZoom src="/images/posts/parsley/[화려]대표프로필설정.gif" alt="setting-profile" className="my-2 rounded" width="40%"
          caption="도감 - 대표 프로필 설정" />
      </Toggle>
      <Toggle title="전체 사용자의 도감 점수 기준 랭킹 시스템 제공">
        <ImageZoom src="/images/posts/parsley/[화려]실시간 랭킹 확인.gif" alt="ranking" className="my-2 rounded" width="40%"
          caption="Redis로 실시간 랭킹 확인" />
      </Toggle>
      {/* TODO: 하나 더 추가 */}
    </>
  );
}
export function Project3DiagramContent() {
  return (
    <>
      <section id="high-level" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">고수준 설계</h2>
        <div>고수준 설계에 대한 자유로운 설명 및 다이어그램</div>
      </section>
      <section id="data-flow" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">데이터 플로우</h2>
        <div>Raw Data → ETL Pipeline → Data Lake → Analysis → Visualization</div>
      </section>
      <section id="ml-pipeline" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">ML 파이프라인</h2>
        <div>머신러닝 모델 학습 및 배포 파이프라인 설명</div>
      </section>
    </>
  );
}

// 매핑 객체
export const infoContents = {
  project1: Project1InfoContent,
  project2: Project2InfoContent,
  project3: Project3InfoContent,
};
export const diagramContents = {
  project1: Project1DiagramContent,
  project2: Project2DiagramContent,
  project3: Project3DiagramContent,
}; 