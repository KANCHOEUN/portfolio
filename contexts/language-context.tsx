"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "kr"

interface Translations {
  en: {
    header: {
      about: string
      resume: string
      portfolio: string
    }
    terminal: {
      helpDesc: string
      whoamiDesc: string
      clearDesc: string
      skillsDesc: string
      historyDesc: string
      unknownCommand: string
    }
    portfolio: {
      explorer: string
      noFile: string
      fileNotFound: string
    }
  }
  kr: {
    header: {
      about: string
      resume: string
      portfolio: string
    }
    terminal: {
      helpDesc: string
      whoamiDesc: string
      clearDesc: string
      skillsDesc: string
      historyDesc: string
      unknownCommand: string
    }
    portfolio: {
      explorer: string
      noFile: string
      fileNotFound: string
    }
  }
}

const translations: Translations = {
  en: {
    header: {
      about: "About",
      resume: "Resume",
      portfolio: "Portfolio",
    },
    terminal: {
      helpDesc: "Show available commands",
      whoamiDesc: "Display information about me",
      clearDesc: "Clear the terminal",
      skillsDesc: "Display my technical skills",
      historyDesc: "Show my recent activity",
      unknownCommand: "Command not found. Type 'help' to see available commands.",
    },
    portfolio: {
      explorer: "EXPLORER",
      noFile: "No file is open",
      fileNotFound: "File not found",
    },
  },
  kr: {
    header: {
      about: "소개",
      resume: "이력서",
      portfolio: "포트폴리오",
    },
    terminal: {
      helpDesc: "사용 가능한 명령어 표시",
      whoamiDesc: "내 정보 표시",
      clearDesc: "터미널 지우기",
      skillsDesc: "기술 스택 표시",
      historyDesc: "최근 활동 표시",
      unknownCommand: "명령어를 찾을 수 없습니다. 'help'를 입력하여 사용 가능한 명령어를 확인하세요.",
    },
    portfolio: {
      explorer: "탐색기",
      noFile: "열린 파일이 없습니다",
      fileNotFound: "파일을 찾을 수 없습니다",
    },
  },
}

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  translations: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "kr")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "kr" : "en"
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>{children}</LanguageContext.Provider>
  )
}

// Modify the useLanguage hook to provide fallback values when used outside a provider
export function useLanguage() {
  const context = useContext(LanguageContext)

  // Return fallback values if context is undefined
  if (context === undefined) {
    // Instead of throwing an error, return default values
    return {
      language: "en" as Language,
      toggleLanguage: () => {},
      translations,
    }
  }

  return context
}
