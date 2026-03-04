import Todo from "../common/Todo";
import ScreenshotCarousel from "../common/ScreenshotCarousel";

const screenshots = [
  { src: "/images/projects/mockly/mockly-1-home.png", alt: "홈 화면" },
  { src: "/images/projects/mockly/mockly-2-plan-list.png", alt: "플랜 목록" },
  { src: "/images/projects/mockly/mockly-6-change-plan.png", alt: "플랜 변경" },
  { src: "/images/projects/mockly/mockly-3-interview-home.png", alt: "면접 홈" },
  { src: "/images/projects/mockly/mockly-4-interview.png", alt: "면접 진행" },
  { src: "/images/projects/mockly/mockly-5-feedback.png", alt: "피드백" },
  { src: "/images/projects/mockly/mockly-7-payment-method.png", alt: "결제 수단" },
];

export default function MocklyInfo() {
  return (
    <>
      <ScreenshotCarousel images={screenshots} />
      <p className="mt-2 bt-3">
        Mockly는 AI 면접관과 모의 면접을 연습할 수 있는 구독형 모바일 플랫폼입니다.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">주요 기능</h2>

      <Todo
        status="done"
        description="모바일 환경을 고려한 OAuth 2.1 기반 Google Social Login"
      >
        <ul className="text-sm list-disc pl-4 space-y-1">
          <li>PKCE 및 Refresh Token Rotation을 적용한 토큰 탈취 대응 설계</li>
        </ul>
      </Todo>

      <Todo
        status="done"
        description="PortOne 기반 구독 및 결제 시스템"
      >
        <ul className="text-sm list-disc pl-4 space-y-1">
          <li>Billing Key 기반 정기 결제 및 Webhook 기반 결제/구독 상태 동기화</li>
          <li>외부 API 연동 트랜잭션 정합성 보장을 위해 Transactional Outbox 패턴 적용</li>
          <li>미납(연체) 7일 경과 시 구독 자동 만료 스케줄러 구현</li>
        </ul>
      </Todo>

      <Todo
        status="in-progress"
        description="AI 면접관 기반 모의 면접 서비스"
      >
        <ul className="text-sm list-disc pl-4 space-y-1">
          <li>Spring AI로 LLM 연동 및 구조화된 피드백 생성 (BeanOutputConverter)</li>
          <li>구독 플랜별 질문 개수 제한 및 일일 쿼터 관리</li>
          <li>가변적인 피드백 카테고리를 JSONB로 저장</li>
        </ul>
      </Todo>

      {/* <Todo
        status="ready"
        description="PGVector 기반 이력서 맞춤 면접 (Phase 2)"
      >
        <ul className="text-sm list-disc pl-4 space-y-1">
          <li>이력서 임베딩 → 벡터 유사도 검색으로 맞춤 질문 생성 (RAG)</li>
          <li>Pro 플랜 전용 프리미엄 기능</li>
        </ul>
      </Todo> */}

    </>
  );
}
