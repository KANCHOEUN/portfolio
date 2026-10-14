import { Suspense } from "react";
import LayoutWrapper from "@/components/layout-wrapper";
import Terminal from "@/components/terminal";
import ParticlesBackground from "@/components/particles-background";

export default function AboutPage() {
  return (
    <Suspense fallback={<p>불러오는 중입니다…</p>}>
      <LayoutWrapper>
        <div className="relative h-full">
          <ParticlesBackground />
          <Terminal />
        </div>
      </LayoutWrapper>
    </Suspense>
  );
}
