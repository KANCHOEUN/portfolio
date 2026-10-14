import DemoVideo from "@/components/common/DemoVideo";
import ImageZoom from "@/components/common/ImageZoom";
import Toggle from "@/components/common/Toggle";

export default function ReVerseInfo() {
  return (
    <>
      <p>
        RE-VERSE는 추억을 특별하게 저장하고 공유하는 메타버스 기반 포토북
        서비스입니다.
      </p>
      <ImageZoom
        src="/images/posts/re-verse/thumbnail.jpg"
        alt="overview"
        className="my-2 rounded"
      />
      <h2 className="text-xl font-semibold mt-6 mb-4">주요 기능</h2>
      <Toggle title="React Quill 텍스트 에디터를 활용하여 추억들을 다이어리처럼 작성 및 관리">
        <DemoVideo
          source="/images/posts/re-verse/write-post-at-my-archive.mp4"
          caption="텍스트 에디터로 추억 작성하기"
        />
        <DemoVideo
          source="/images/posts/re-verse/write-and-view-post-at-friend-archive.mp4"
          caption="작성한 추억들 보기"
        />
      </Toggle>
      <Toggle title="추억 저장소인 아카이브 별로 추억을 공유하고 싶은 친구들끼리 공유">
        <DemoVideo
          source="/images/posts/re-verse/invite-friend-to-archive.mp4"
          caption="아카이브 관리 - 친구에게 공유하기"
        />
        <DemoVideo
          source="/images/posts/re-verse/invite-and-remove-friend-from-archive.mp4"
          caption="아카이브 3D 공간 - 친구에게 공유하기/내보내기"
        />
      </Toggle>
      <Toggle title="Three.js 기반 3D 공간에서 WebRTC로 P2P 연결을 통해 친구들과 함께 텍스트와 음성 채팅으로 상호 작용 가능">
        <DemoVideo
          source="/images/posts/re-verse/archive-description.mp4"
          caption="RE-VERSE 사용 가이드"
        />
        <div className="my-2">
          <video
            src="/images/posts/re-verse/아카이브-음성-채팅.mp4"
            width={1920}
            height={1080}
            aria-label="아카이브 내 음성 채팅 시연"
            className="rounded w-full sm:w-[80%] md:w-[70%] lg:w-[70%] xl:w-[45%] 2xl:w-[40%]"
            preload="none"
            controls
            playsInline
          />
        </div>
        <p className="text-sm text-gray-500">아카이브 내 음성 채팅</p>
      </Toggle>
      <Toggle title="그 외 다양한 인터랙션 요소들">
        <DemoVideo
          source="/images/posts/re-verse/select-character.mp4"
          caption="select-character"
        />
        <DemoVideo
          source="/images/posts/re-verse/developer-info.mp4"
          caption="developer-info"
        />
        <DemoVideo
          source="/images/posts/re-verse/mine-game.mp4"
          caption="game"
        />
      </Toggle>
    </>
  );
}
