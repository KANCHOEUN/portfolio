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
      <Todo status="in-progress" description="나만의 프로필을 꾸미고, 관심 있는 사람들 팔로우로 소통"/>
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
        <h2 className="text-xl font-semibold mb-4">실시간 자동 저장 시스템</h2>
        <ImageZoom src="/images/posts/pigrest/auto-save-sequence.svg" alt="auto-save-sequence" className="my-4 rounded" width="100%" 
        caption="Publish한 적 없는 게시글에 대한 자동 저장 시스템의 시퀀스 다이어그램"/>
        <br/>
        <br/>
        <div>
        자동 저장 기능은 사용자가 입력할 때마다 수시로 API를 호출하므로 DB 부하가 급격히 증가할 수 있다고 판단하여,
        임시 저장(draft) 단계에 <b>Write Behind</b> 전략을 적용했습니다.
        <br/>
        Draft 데이터는 Redis Hash에 우선 저장하고, Spring Scheduler가 <b>주기적으로 DB에 비동기로 반영</b>합니다.
        <br/>
        초기에는 `draft:*`로 key 스캔 방식(O(N))을 사용했으나,
        TTL이 만료되기 전까지는 이미 DB에 동기화된 데이터도 <b>중복으로 반영</b>하고 있는 문제가 있었습니다.
        이를 개선하기 위해 <b>최신 업데이트된 데이터의 key를 기록하는 Set</b>을 두어, 스케줄러가 필요한 데이터만 <b>O(1)</b>로 확인할 수 있게 하였고, 반영 이후 즉시 제거하도록 설계하였습니다.
        <br/>
        또한 <b>Cache Aside</b> 전략을 적용하여 사용자가 실시간으로 최신 데이터를 확인할 수 있고, 다른 기기에서도 작업을 이어나갈 수 있도록 하였습니다.
        <br/>
        임시 저장된 데이터는 <b>TTL로 관리</b>하였고, 게시물을 발행(publish)하는 시점에는 Redis에 저장된 데이터를 모두 삭제하여 메모리를 효율적으로 관리하였습니다.
        </div>
      </section>
      <section id="erd" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">JWT 기반 인증 시스템</h2>
      </section>
      <section id="sequence" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">UUID 기반 설계</h2>
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
        <ImageZoom src="/images/posts/re-verse/write-post-at-my-archive.gif" alt="quill" className="my-2 rounded" width="40%"
          caption="텍스트 에디터로 추억 작성하기" />
        <ImageZoom src="/images/posts/re-verse/write-and-view-post-at-friend-archive.gif" alt="quill" className="my-2 rounded" width="40%"
          caption="작성한 추억들 보기기" />
      </Toggle>
      <Toggle title="추억 저장소인 아카이브 별로 추억을 공유하고 싶은 친구들끼리 공유">
        <ImageZoom src="/images/posts/re-verse/invite-friend-to-archive.gif" alt="archive" className="my-2 rounded" width="40%"
          caption="아카이브 관리 - 친구에게 공유하기"
        />
        <ImageZoom src="/images/posts/re-verse/invite-and-remove-friend-from-archive.gif" alt="archive" className="my-2 rounded" width="40%"
          caption="아카이브 3D 공간 - 친구에게 공유하기/내보내기"
        />
      </Toggle>
      <Toggle title="Three.js 기반 3D 공간에서 WebRTC로 P2P 연결을 통해 친구들과 함께 텍스트와 음성 채팅으로 상호 작용 가능">
        <ImageZoom src="/images/posts/re-verse/archive-description.gif" alt="3d-chat" className="my-2 rounded" width="40%"
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
        <ImageZoom src="/images/posts/re-verse/select-character.gif" alt="select-character" className="my-2 rounded" width="40%" />
        <ImageZoom src="/images/posts/re-verse/developer-info.gif" alt="developer-info" className="my-2 rounded" width="40%" />
        <ImageZoom src="/images/posts/re-verse/mine-game.gif" alt="game" className="my-2 rounded" width="40%" />
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
          <div>
            SSAFY에서 이전까지 진행하던 프로젝트들은 EC2 서버만의 public IP만을 제공받았기 때문에, 외부에서의 침입 시도가 여러 번 있었습니다. <br/>
            이러한 문제를 해결하기 위해 다음과 같은 방법으로 외부에서의 직접적인 접근이 불가능하도록 구성했습니다.<br/>
            <ul>
              <li>먼저 VPC에 <b>Internet Gateway</b>(IGW)를 두어, <b>외부 요청은 IGW를 통해서만</b> 들어오도록 하였습니다.</li>
              <li>Public Subnet에 <b>Application Load Balancer</b>(ALB)를 배치하여, <b>IGW에 들어온 외부 요청은 ALB로 전달</b>하도록 하였습니다.</li>
              <li>그리고 VPC 내부에서만 통신이 가능한 <b>Private Subnet에</b> 서비스가 배포된 <b>EC2 인스턴스들을 배치</b>하였고, <b>ALB를 통해 접근이 가능</b>하도록 함으로써 보안을 강화하였습니다.</li>
            </ul>
          </div>
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
        <ImageZoom src="/images/posts/parsley/enter-studyroom.gif" alt="enter-studyroom" className="my-2 rounded" width="40%"
          caption="스터디룸 입장장" />
      </Toggle>
      {/* TODO: 하나 추가 */}
      <Toggle title="허브 키우기 및 도감 채우기 등과 같은 게임적인 요소">
        <ImageZoom src="/images/posts/parsley/simple-planting-herb.gif" alt="planting-herb" className="my-2 rounded" width="40%"
          caption="허브 심기" />
        <ImageZoom src="/images/posts/parsley/simple-harvest-herb.gif" alt="harveting-herb" className="my-2 rounded" width="40%"
          caption="허브 수확하기" />
        <ImageZoom src="/images/posts/parsley/setting-profile.gif" alt="setting-profile" className="my-2 rounded" width="40%"
          caption="도감 - 대표 프로필 설정" />
      </Toggle>
      <Toggle title="전체 사용자의 도감 점수 기준 랭킹 시스템 제공">
        <ImageZoom src="/images/posts/parsley/check-ranking.gif" alt="ranking" className="my-2 rounded" width="40%"
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
        <h2 className="text-xl font-semibold mb-4">아키텍처</h2>
        <div>
          <ImageZoom src="/images/posts/parsley/parsley-architecture.png" alt="architecture" className="my-4 rounded" width="40%" />
          <p>
            
          </p>
        </div>
      </section>
      {/* <section id="er-diagram" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">ERD</h2>
        <div>
          <ImageZoom src="/images/posts/parsley/erd.png" alt="erd" className="my-4 rounded" width="40%" />
        </div>
      </section> */}
      <section id="sequence-diagram" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">시퀀스 다이어그램</h2>
        <h3 className="text-lg font-semibold mb-2">랭킹 시스템</h3>
        <div>
          <ImageZoom src="/images/posts/parsley/parsley-ranking-sequence-diagram.png" alt="sequence-diagram" className="my-4 rounded" width="40%" />
        </div>
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