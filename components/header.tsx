"use client"

import Link from "next/link"
import ThemeToggle from "./theme-toggle"
import LanguageToggle from "./language-toggle"
import { useLanguage } from "@/contexts/language-context"

export default function Header() {
  const { t } = useLanguage()

  return (
    <header className="h-12 bg-[#21252b] dark:bg-[#21252b] light:bg-[#f0f0f0] border-b border-[#343a47] dark:border-[#343a47] light:border-[#d4d4d4] flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="w-1/3"></div>
      <div className="flex items-center justify-center w-1/3">
        <Link
          href="/about"
          className="text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] font-medium hover:text-[#e5c07b] dark:hover:text-[#e5c07b] light:hover:text-[#4078f2]"
        >
          HYEEUN CHO
        </Link>
      </div>
      <div className="flex items-center justify-end w-1/3 gap-2">
        {/* <LanguageToggle /> */}
        <ThemeToggle />
      </div>
    </header>
  )
}
