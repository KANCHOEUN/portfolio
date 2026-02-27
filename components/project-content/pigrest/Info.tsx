import ImageZoom from "@/components/common/ImageZoom";
import Todo from "../common/Todo";

export default function PigrestInfo() {
  return (
    <>
      <p>
        Pigrest는 이미지 기반의 콘텐츠(핀)를 보드에 저장하고, 주제별로 공유할 수
        있는 Pinterest 스타일의 SNS 플랫폼입니다.
      </p>
      <ImageZoom
        src="/images/posts/pigrest/thumbnail.png"
        alt="thumbnail"
        className="my-4 rounded"
      />
      <h2 className="text-xl font-semibold mt-6 mb-4">주요 기능</h2>
      <Todo status="done" description="Spring Security와 JWT 기반 로그인, 회원가입" />
      <Todo
        status="in-progress"
        description="나만의 프로필을 꾸미고, 관심 있는 사람들 팔로우로 소통"
      />
      <Todo
        status="in-progress"
        description="마음에 드는 이미지들을 핀으로 저장하고, 주제별로 나만의 보드를 만들어 관리"
      />
      <Todo
        status="ready"
        description="팔로우한 친구들의 새로운 핀들을 실시간으로 받아보고, 좋아요 및 댓글 작성"
      />
      <Todo
        status="ready"
        description="핀이나 보드를 친구들과 공유하며 텍스트 채팅"
      />
      <Todo
        status="ready"
        description="좋아요, 팔로우, 공유 등 활동에 대한 반응 알림"
      />
    </>
  );
}
