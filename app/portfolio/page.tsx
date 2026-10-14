import { Suspense } from "react";
import LayoutWrapper from "@/components/layout-wrapper";
import EditorContent from "@/components/editor-content";
import ParticlesBackground from "@/components/particles-background";
export default function Portfolio() {
  return (
    <Suspense fallback={<p>불러오는 중입니다…</p>}>
      <LayoutWrapper>
        <ParticlesBackground />
        <EditorContent />
      </LayoutWrapper>
    </Suspense>
  );
}
