import Todo from "../common/Todo";

export default function MocklyInfo() {
  return (
    <>
      <p>
        Mockly는 AI 면접관과 모의 면접을 연습할 수 있는 구독형 모바일 플랫폼입니다.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-4">주요 기능</h2>

      <Todo
        status="done"
        description="모바일 환경을 고려한 OAuth 2.1 표준을 따른 Google Social Login"
      >
        <ul className="text-sm list-disc pl-4 space-y-1">
          <li>모바일 환경에서 client secret 없이 안전한 인증을 위해 PKCE 적용</li>
          <li>Refresh Token Rotation과 Redis Blacklist로 토큰 탈취 대응</li>
          <li>멀티 디바이스 세션 관리 (최대 2대, 디바이스 정보 추적)</li>
        </ul>
      </Todo>

    </>
  );
}
