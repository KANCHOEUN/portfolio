"use client"

import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <div className="px-6">
      <div className="mx-auto py-5 border-t border-[#343a47] dark:border-[#343a47] light:border-[#d4d4d4]">
        <div className="flex justify-end items-center">
          <span className="px-4 text-sm text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42]">
            {t("common.copyright")}
          </span>
        </div>
      </div>
    </div>
  )
}
