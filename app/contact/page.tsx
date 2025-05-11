"use client"

import { FileCode } from "lucide-react"
import LayoutWrapper from "@/components/layout-wrapper"
import ParticlesBackground from "@/components/particles-background"

export default function ContactPage() {
  return (
    <LayoutWrapper>
      <div className="flex items-center justify-center h-full">
        <ParticlesBackground />
        <div className="text-center text-[#6b717d] dark:text-[#6b717d] light:text-gray-500">
          <FileCode size={48} className="mx-auto mb-4" />
          <h3 className="text-xl">Contact Page</h3>
        </div>
      </div>
    </LayoutWrapper>
  )
}
