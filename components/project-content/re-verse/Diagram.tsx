import ImageZoom from "@/components/common/ImageZoom";

export default function ReVerseDiagram() {
  return (
    <>
      <section id="system-design" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">아키텍처 설계</h2>
        <div>
          <ImageZoom
            src="/images/posts/re-verse/architecture.png"
            alt="architecture"
            className="my-4 rounded"
          />
          <b>보안</b>, <b>재해복구</b>, <b>고가용성</b>의 특성을 고려하여 AWS 기반
          아키텍처를 설계하였습니다.
          <br />
          <br />
          <div>
            SSAFY에서 이전까지 진행하던 프로젝트들은 EC2 서버만의 public IP만을
            제공받았기 때문에, 외부에서의 침입 시도가 여러 번 있었습니다. <br />
            이러한 문제를 해결하기 위해 다음과 같은 방법으로 외부에서의 직접적인
            접근이 불가능하도록 구성했습니다.
            <br />
            <ul>
              <li>
                먼저 VPC에 <b>Internet Gateway</b>(IGW)를 두어,{" "}
                <b>외부 요청은 IGW를 통해서만</b> 들어오도록 하였습니다.
              </li>
              <li>
                Public Subnet에 <b>Application Load Balancer</b>(ALB)를
                배치하여, <b>IGW에 들어온 외부 요청은 ALB로 전달</b>하도록
                하였습니다.
              </li>
              <li>
                그리고 VPC 내부에서만 통신이 가능한 <b>Private Subnet에</b>{" "}
                서비스가 배포된 <b>EC2 인스턴스들을 배치</b>하였고,{" "}
                <b>ALB를 통해 접근이 가능</b>하도록 함으로써 보안을 강화하였습니다.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section id="ci-cd-pipeline" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">CI/CD 파이프라인 구조</h2>
        <ImageZoom
          src="/images/posts/re-verse/ci-cd-pipeline.png"
          alt="ci-cd-pipeline"
          className="my-4 rounded"
        />
      </section>
    </>
  );
}
