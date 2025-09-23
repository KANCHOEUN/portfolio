"use client"

import type React from "react"

import { useState, useEffect } from "react"
import SidebarNavigation from "./sidebar-navigation"
import { Menu, X } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Footer from "./footer"

interface LayoutWrapperProps {
  children: React.ReactNode
  activeFile?: string | null
  setActiveFile?: (fileId: string | null) => void
}

export default function LayoutWrapper({ children, activeFile, setActiveFile }: LayoutWrapperProps) {
  const [showSidebar, setShowSidebar] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const searchParams = useSearchParams()
  const fileParam = searchParams.get("file")

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setShowSidebar(false)
      } else {
        setShowSidebar(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-48px)] relative">
      <div className="flex flex-1 overflow-hidden h-full">
        {/* Mobile toggle button */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="fixed bottom-4 left-4 z-20 p-3 bg-[#21252b] dark:bg-[#21252b] light:bg-[#f8f8f7] rounded-full shadow-lg"
          >
            {showSidebar ? (
              <X size={20} className="dark:text-[#abb2bf] light:text-gray-800" />
            ) : (
              <Menu size={20} className="dark:text-[#abb2bf] light:text-gray-800" />
            )}
          </button>
        )}

        {/* Sidebar */}
        {(showSidebar || !isMobile) && (
          <div className={`${isMobile ? "fixed inset-0 z-10" : "relative"}`}>
            <SidebarNavigation
              setActiveFile={setActiveFile}
              activeFile={fileParam || activeFile}
              isMobile={isMobile}
              onItemClick={isMobile ? () => setShowSidebar(false) : undefined}
            />
          </div>
        )}

        {/* Content area */}
        <div className={`flex-1 ${isMobile && showSidebar ? "hidden" : "block"} overflow-hidden flex flex-col`}>
          <div className="flex-1 overflow-auto bg-[#282c34] dark:bg-[#282c34] light:bg-white">
            <div className="min-h-full flex flex-col h-full">
              <div className="flex-grow overflow-y-hidden">{children}</div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
