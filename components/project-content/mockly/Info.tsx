import Todo from "../common/Todo";

export default function MocklyInfo() {
  return (
    <>
      <p>
        Mockly는 실제 Google Play Store에 출시를 목표로 개발하고 있는 AI 기반
        모의 면접 플랫폼입니다.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-4">주요 기능</h2>
      <Todo
        status="done"
        description="모바일 환경을 고려한 OAuth 2.1 표준을 따른 Google Social Login 제공"
      />
      <Todo status="in-progress" description="" />
      <Todo status="ready" description="" />
      <Todo status="ready" description="" />
      <Todo status="ready" description="" />
    </>
  );
}
