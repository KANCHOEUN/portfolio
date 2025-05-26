"use client"

import { useLanguage } from "@/contexts/language-context"

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-md hover:bg-[#343b47] dark:hover:bg-[#343b47] light:hover:bg-gray-200 text-[#abb2bf] dark:text-[#abb2bf] light:text-gray-600 hover:text-[#e5c07b] dark:hover:text-[#e5c07b] light:hover:text-blue-600 transition-colors"
      aria-label="Toggle language"
    >
      {language === "ko" ? "EN" : "KO"}
    </button>
  )
}
