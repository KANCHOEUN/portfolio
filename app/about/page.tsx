"use client"

import LayoutWrapper from "@/components/layout-wrapper"
import Terminal from "@/components/terminal"
import ParticlesBackground from "@/components/particles-background"

export default function AboutPage() {
  return (
    <LayoutWrapper>
      <div className="relative h-full">
        <ParticlesBackground />
        <Terminal />
      </div>
    </LayoutWrapper>
  )
}
