"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(prefersDark)
    }
  }, [])

  useEffect(() => {
    // Update document class when theme changes
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("light")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.add("light")
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }

    // Dispatch custom event for theme change
    const event = new Event("themeChange")
    document.dispatchEvent(event)
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-[#343b47] dark:hover:bg-[#343b47] light:hover:bg-gray-200"
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun size={18} className="text-[#e5c07b]" /> : <Moon size={18} className="text-[#4078f2]" />}
    </button>
  )
}
