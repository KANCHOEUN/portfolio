import { Suspense } from "react";
import LayoutWrapper from "@/components/layout-wrapper"
import Terminal from "@/components/terminal"
import ParticlesBackground from "@/components/particles-background"

export default function AboutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LayoutWrapper>
        <div className="relative h-full">
          <ParticlesBackground />
          <Terminal />
        </div>
      </LayoutWrapper>
    </Suspense>
  )
}
