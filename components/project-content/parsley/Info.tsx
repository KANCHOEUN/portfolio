import DemoVideo from "@/components/common/DemoVideo";
import ImageZoom from "@/components/common/ImageZoom";
import Toggle from "@/components/common/Toggle";

export default function ParsleyInfo() {
  return (
    <>
      <p>
        PARSLEY는 WebRTC를 활용한 Gamification 기반 화상 온라인 스터디
        서비스입니다.
      </p>
      <ImageZoom
        src="/images/posts/parsley/thumbnail.png"
        alt="overview"
        className="my-2 rounded"
      />
      <h2 className="text-xl font-semibold mt-6 mb-4">주요 기능</h2>
      <Toggle title="실시간 화상 채팅 및 화면 동시 공유 가능">
        <DemoVideo
          source="/images/posts/parsley/enter-studyroom.mp4"
          caption="스터디룸 입장"
        />
      </Toggle>
      <Toggle title="허브 키우기 및 도감 채우기 등과 같은 게임적인 요소">
        <DemoVideo
          source="/images/posts/parsley/simple-planting-herb.mp4"
          caption="허브 심기"
        />
        <DemoVideo
          source="/images/posts/parsley/simple-harvest-herb.mp4"
          caption="허브 수확하기"
        />
        <DemoVideo
          source="/images/posts/parsley/setting-profile.mp4"
          caption="도감 - 대표 프로필 설정"
        />
      </Toggle>
      <Toggle title="전체 사용자의 도감 점수 기준 랭킹 시스템 제공">
        <DemoVideo
          source="/images/posts/parsley/check-ranking.mp4"
          caption="Redis로 실시간 랭킹 확인"
        />
      </Toggle>
    </>
  );
}
