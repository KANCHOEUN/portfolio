import ImageZoom from "@/components/common/ImageZoom";

export default function ParsleyDiagram() {
  return (
    <>
      <section id="high-level" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">아키텍처</h2>
        <div>
          <ImageZoom
            src="/images/posts/parsley/parsley-architecture.png"
            alt="architecture"
            className="my-4 rounded"
          />
        </div>
      </section>
      <section id="sequence-diagram" className="mb-6">
        <h2 className="text-xl font-semibold mb-4">시퀀스 다이어그램</h2>
        <h3 className="text-lg font-semibold mb-2">랭킹 시스템</h3>
        <div>
          <ImageZoom
            src="/images/posts/parsley/parsley-ranking-sequence-diagram.png"
            alt="sequence-diagram"
            className="my-4 rounded"
          />
        </div>
      </section>
    </>
  );
}
