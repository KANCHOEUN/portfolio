import ImageZoom from "@/components/common/ImageZoom";

export default function MocklyDiagram() {
  return (
    <>
      <section id="mockly-login" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          OAuth 2.1 기반 구글 소셜 로그인
        </h2>
        <div>
          <ImageZoom
            src="/images/posts/mockly/mockly-login.png"
            alt="mockly-login"
            className="my-4 rounded"
          />
        </div>
      </section>
      <section id="mockly-refresh-rotation" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          토큰 재발급 - Refresh Token Rotation 적용
        </h2>
        <div>
          <ImageZoom
            src="/images/posts/mockly/mockly-refresh-rotation.png"
            alt="mockly-refresh-rotation"
            className="my-4 rounded"
          />
        </div>
      </section>
      <section id="mockly-logout" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          로그아웃 - Blacklist 기반 토큰 무효화
        </h2>
        <div>
          <ImageZoom
            src="/images/posts/mockly/mockly-logout.png"
            alt="mockly-logout"
            className="my-4 rounded"
          />
        </div>
      </section>
    </>
  );
}
