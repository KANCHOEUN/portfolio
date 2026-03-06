import ImageZoom from "@/components/common/ImageZoom";
import { BookOpen } from "lucide-react";

export default function MocklyDiagram() {
  return (
    <>
      <section id="mockly-data-consistency" className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Data Consistency</h2>
        <section id="mockly-transactional-outbox" className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Transactional Outbox 패턴</h3>
          <ImageZoom
            src="/images/projects/mockly/mockly-transactional-outbox-diagram.png"
            alt="mockly-transactional-outbox"
            className="my-4 rounded"
          />
          <p className="mb-2">Mockly는 구독 기반 서비스이며 결제 처리는 외부 결제 API를 통해 수행합니다.</p>
          <p className="mb-2">결제가 완료되면 결제 정보와 구독 상태를 <u>내부 DB에 반영</u>하고, 동시에 외부 API를 호출하여 <u>다음 결제 예약</u>과 같은 후속 작업을 수행해야 합니다.</p>
          <p className="mb-2">하지만 외부 API 호출과 내부 DB 상태 변경은 하나의 트랜잭션으로 묶을 수 없기 때문에 한쪽만 성공하는 데이터 정합성 문제가 발생할 수 있습니다.</p>
          <p className="mb-2">해당 문제를 해결하기 위해 도메인 상태 변경과 함께 Outbox 테이블에 이벤트를 기록하고, 이후 Scheduler가 Outbox 테이블을 조회하여 미처리 이벤트를 재시도하도록 구성하였습니다.</p>
          <div className="mt-4 flex gap-3 border-l-4 border-[#61afef] bg-[#61afef]/10 rounded-r px-4 py-3 text-sm">
            <BookOpen size={16} className="text-[#61afef] flex-shrink-0 mt-0.5" />
            <p>
              자세한 설계 과정은{" "}
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("openBlogPost", {
                      detail: { id: "transactional-outbox-payment" },
                    })
                  )
                }
                className="text-[#61afef] hover:text-[#56b6c2] transition-colors underline"
              >
                Transactional Outbox 패턴 도입기; 결제 후 스케줄 예약하기
              </button>{" "}
              글에서 확인할 수 있습니다.
            </p>
          </div>
        </section>
      </section>
      <section id="mockly-authentication" className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Authentication</h2>
        <section id="mockly-login" className="mb-6">
          <h3 className="text-xl font-semibold mb-4">
            OAuth 2.1 기반 구글 소셜 로그인
          </h3>
          <div>
            <ImageZoom
              src="/images/posts/mockly/mockly-login.png"
              alt="mockly-login"
              className="my-4 rounded"
            />
          </div>
        </section>
        <section id="mockly-refresh-rotation" className="mb-6">
          <h3 className="text-xl font-semibold mb-4">
            토큰 재발급 - Refresh Token Rotation 적용
          </h3>
          <div>
            <ImageZoom
              src="/images/posts/mockly/mockly-refresh-rotation.png"
              alt="mockly-refresh-rotation"
              className="my-4 rounded"
            />
          </div>
        </section>
        <section id="mockly-logout" className="mb-6">
          <h3 className="text-xl font-semibold mb-4">
            로그아웃 - Blacklist 기반 토큰 무효화
          </h3>
          <div>
            <ImageZoom
              src="/images/posts/mockly/mockly-logout.png"
              alt="mockly-logout"
              className="my-4 rounded"
            />
          </div>
        </section>
      </section>
    </>
  );
}
