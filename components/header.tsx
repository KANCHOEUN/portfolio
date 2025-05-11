"use client"

import Link from "next/link"
import ThemeToggle from "./theme-toggle"
import LanguageToggle from "./language-toggle"
import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect } from "react"

export default function Header() {
  // Add fallback handling for language context
  const [language, setLanguage] = useState<"en" | "kr">("en")
  const [translations, setTranslations] = useState({
    en: {
      header: {
        about: "About",
        resume: "Resume",
        portfolio: "Portfolio",
      },
    },
    kr: {
      header: {
        about: "소개",
        resume: "이력서",
        portfolio: "포트폴리오",
      },
    },
  })

  useEffect(() => {
    try {
      const context = useLanguage()
      setLanguage(context.language)
      setTranslations(context.translations)
    } catch (error) {
      console.warn("Language context not available in Header, using fallback")
    }
  }, [])

  return (
    <header className="h-12 bg-[#21252b] dark:bg-[#21252b] light:bg-[#f0f0f0] border-b border-[#343a47] dark:border-[#343a47] light:border-[#d4d4d4] flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="w-1/3"></div>
      <div className="flex items-center justify-center w-1/3">
        <Link
          href="/about"
          className="text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] font-medium hover:text-[#e5c07b] dark:hover:text-[#e5c07b] light:hover:text-[#4078f2]"
        >
          HIA
        </Link>
      </div>
      <div className="flex items-center justify-end w-1/3 gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  )
}
