"use client"

import { useLanguage } from "@/contexts/language-context"

export default function LanguageToggle() {
  const context = useLanguage()
  const language = context?.language || "en"
  const toggleLanguage = context?.toggleLanguage || (() => {})

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-md hover:bg-[#343b47] dark:hover:bg-[#343b47] light:hover:bg-gray-200 text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42]"
      aria-label="Toggle language"
    >
      {language === "en" ? "KR" : "EN"}
    </button>
  )
}
