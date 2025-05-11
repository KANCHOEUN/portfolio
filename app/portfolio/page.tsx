"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import LayoutWrapper from "@/components/layout-wrapper"
import EditorContent from "@/components/editor-content"
import ParticlesBackground from "@/components/particles-background"
import { LanguageProvider } from "@/contexts/language-context"

export default function Portfolio() {
  const searchParams = useSearchParams()
  const fileParam = searchParams.get("file")
  const [activeFile, setActiveFile] = useState<string | null>(fileParam)

  // Update active file when URL changes
  useEffect(() => {
    setActiveFile(fileParam)
  }, [fileParam])

  return (
    <LanguageProvider>
      <LayoutWrapper activeFile={activeFile} setActiveFile={setActiveFile}>
        <ParticlesBackground />
        <EditorContent activeFile={activeFile} setActiveFile={setActiveFile} />
      </LayoutWrapper>
    </LanguageProvider>
  )
}
