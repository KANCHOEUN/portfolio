import ImageZoom from "@/components/common/ImageZoom";

export default function PigrestDiagram() {
  return (
    <>
      <section id="architecture" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">게시물 초안 자동 저장 시스템</h2>
        <button
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("openBlogPost", {
                detail: { id: "cache-ttl-autosave-system" },
              })
            )
          }
          className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] hover:text-[#56b6c2] dark:hover:text-[#56b6c2] light:hover:text-[#0184bc] transition-colors underline mb-2"
        >
          블로그 글에서 자세히 보기
        </button>
        <br />
        <br />※ 게시물 기능은 사용자가 작성중인 게시물을 임시로 저장하는{" "}
        <b>초안 단계</b>와 실제로 등록하는 <b>발행 단계</b>로 나뉩니다.
        <ImageZoom
          src="/images/posts/pigrest/auto-save-sequence.svg"
          alt="auto-save-sequence"
          className="my-4 rounded"
          caption="Publish한 적 없는 게시글에 대한 자동 저장 시스템의 시퀀스 다이어그램"
        />
        <br />
        <br />
        <div>
          사용자 입력 시 발생하는 DB 부하를 줄이기 위해 <b>Write Behind</b> 전략을
          적용한 자동 저장 시스템을 구현하였습니다.
          <br />
          입력한 데이터는 <b>Redis Hash</b>에 임시 저장(draft)되며, Spring
          Scheduler를 통해 <b>주기적으로 DB에 비동기 반영</b>됩니다. 초기{" "}
          {"`draft:*`"} 패턴으로 전체 key를 스캔하는 방식에서 최신 업데이트된
          데이터의 key를 관리하는 Set 기반 방식으로 개선하여,
          <b> 중복 동기화를 방지</b>하고 시간 복잡도를 O(N)에서 O(1)로
          최적화했습니다. 또한 <b>Redis 파이프라인</b>을 적용하여 IO 성능을
          개선함으로써 1000개의 요청을 기준으로 약 1450ms에서 264ms로 단축했습니다.
          <br />
          <b>Cache Aside</b> 전략을 통해 실시간 데이터 조회와 다중 기기 간 작업
          연속성을 보장했으며, TTL을 활용하여 임시 데이터의 생명 주기를
          관리했습니다.
          <br />
          <br />
          게시물 발행(publish) 시 Unique Constraint를 적용하여{" "}
          <b>중복 요청을 방지</b>하여 멱등성을 보장했습니다. 그와 동시에 Redis에
          저장된 데이터를 즉시 삭제하여 메모리 효율성 또한 높였습니다.
        </div>
      </section>
      <section id="uuid" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">UUID 기반 Primary Key 설계</h2>
        <button
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("openBlogPost", { detail: { id: "uuid" } })
            )
          }
          className="text-[#61afef] dark:text-[#61afef] light:text-[#4078f2] hover:text-[#56b6c2] dark:hover:text-[#56b6c2] light:hover:text-[#0184bc] transition-colors underline mb-2"
        >
          블로그 글에서 자세히 보기
        </button>
        <div>
          Auto Increment 기반 ID의 보안 취약점을 해결하기 위해 UUID v7을
          도입하였습니다. UUID를 BINARY(16) 형태로 저장하여 1억개 데이터 기준 약
          2GB의 저장 공간을 절약했으며, 시간 기반 UUID v7로 B-Tree 인덱스 성능을
          최적화하여 쿼리 효율성을 개선했습니다.
        </div>
      </section>
      <section id="ci-cd-pipeline" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">CI/CD 파이프라인</h2>
        <ImageZoom
          src="/images/posts/pigrest/ci-cd-pipeline.png"
          alt="ci-cd-pipeline"
          className="my-4 rounded"
        />
        <div>
          개발 과정에서 수동 배포로 인한 휴먼 에러와 배포 시간 지연 문제를
          해결하기 위해 Github Actions과 Docker를 활용한 자동화 파이프라인을
          구축했습니다.
          <br />
          Pull Request 시 자동으로 빌드와 테스트를 수행하여 코드 품질을
          보장하였고, main 브랜치 push 시 Docker 이미지를 빌드하여 AWS ECR에
          저장하였습니다.
          <br />
          이후, EC2에서 Docker Compose로 MySQL, Redis, 애플리케이션을
          오케스트레이션하며 Infrastructure as Code(IaC) 방식을 적용하여 선언적이고
          안정적인 배포 환경을 구성했습니다.
        </div>
      </section>
    </>
  );
}
