"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, t } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ko")

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && (savedLanguage === "ko" || savedLanguage === "en")) {
        setLanguage(savedLanguage)
      }
    } catch (error) {
      console.warn("Failed to load language from localStorage:", error)
    }
  }, [])

  const toggleLanguage = () => {
    try {
      const newLanguage: Language = language === "ko" ? "en" : "ko"
      setLanguage(newLanguage)
      localStorage.setItem("language", newLanguage)

      // 언어 변경 이벤트 발생
      const event = new CustomEvent("languageChange", { detail: newLanguage })
      window.dispatchEvent(event)
    } catch (error) {
      console.warn("Failed to save language to localStorage:", error)
    }
  }

  const translate = (key: string) => {
    try {
      return t(key as any, language)
    } catch (error) {
      console.warn("Translation error for key:", key, error)
      return key
    }
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: translate }}>{children}</LanguageContext.Provider>
  )
}

// useLanguage 훅을 수정하여 더 안전한 fallback 값 제공
export function useLanguage() {
  const context = useContext(LanguageContext)

  // 컨텍스트가 없을 때 기본값 반환
  if (context === undefined) {
    console.warn("useLanguage must be used within a LanguageProvider, using fallback values")
    return {
      language: "ko" as Language,
      toggleLanguage: () => {},
      t: (key: string) => {
        try {
          return t(key as any, "ko")
        } catch (error) {
          console.warn("Fallback translation error for key:", key, error)
          return key
        }
      },
    }
  }

  return context
}
