"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface ResizeHandleProps {
  sidebarWidth: number
  setSidebarWidth: (width: number) => void
}

export default function ResizeHandle({ sidebarWidth, setSidebarWidth }: ResizeHandleProps) {
  const [isResizing, setIsResizing] = useState(false)

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  const stopResizing = () => {
    setIsResizing(false)
  }

  const resize = (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = e.clientX
      if (newWidth > 160 && newWidth < 500) {
        setSidebarWidth(newWidth)
      }
    }
  }

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize)
      window.addEventListener("mouseup", stopResizing)
      // Add cursor style to body during resize
      document.body.style.cursor = "col-resize"
    } else {
      document.body.style.cursor = ""
    }

    return () => {
      window.removeEventListener("mousemove", resize)
      window.removeEventListener("mouseup", stopResizing)
      document.body.style.cursor = ""
    }
  }, [isResizing])

  return (
    <div
      className="w-[2px] bg-[#343a47] dark:bg-[#343a47] light:bg-[#d4d4d4] cursor-col-resize transition-colors"
      onMouseDown={startResizing}
    />
  )
}
