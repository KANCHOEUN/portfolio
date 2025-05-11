"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import Link from "next/link"

interface SearchModalProps {
  onClose: () => void
}

// Sample pages for search
const allPages = [
  { id: "about", name: "About", path: "/about" },
  { id: "resume", name: "Resume", path: "/resume" },
  { id: "portfolio", name: "Portfolio", path: "/portfolio" },
  // Add project pages
  { id: "project1-intro", name: "Project One - 소개", path: "/portfolio?file=intro1" },
  { id: "project1-diagram", name: "Project One - 다이어그램", path: "/portfolio?file=diagram1" },
  { id: "project1-related", name: "Project One - 관련 글", path: "/portfolio?file=related1" },
  { id: "project2-intro", name: "Project Two - 소개", path: "/portfolio?file=intro2" },
  { id: "project2-diagram", name: "Project Two - 다이어그램", path: "/portfolio?file=diagram2" },
  { id: "project2-related", name: "Project Two - 관련 글", path: "/portfolio?file=related2" },
  { id: "project3-intro", name: "Project Three - 소개", path: "/portfolio?file=intro3" },
  { id: "project3-diagram", name: "Project Three - 다이어그램", path: "/portfolio?file=diagram3" },
  { id: "project3-related", name: "Project Three - 관련 글", path: "/portfolio?file=related3" },
]

export default function SearchModal({ onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPages, setFilteredPages] = useState(allPages)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter pages based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPages(allPages)
    } else {
      const filtered = allPages.filter((page) => page.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredPages(filtered)
    }
  }, [searchTerm])

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#21252b] w-full max-w-lg rounded-md shadow-lg overflow-hidden">
        <div className="p-4 border-b border-[#181a1f] flex items-center">
          <Search size={18} className="text-[#6b717d] mr-2" />
          <input
            ref={inputRef}
            type="text"
            placeholder="포트폴리오의 페이지를 검색하세요."
            className="bg-transparent border-none outline-none text-[#abb2bf] w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={onClose} className="text-[#6b717d] hover:text-[#abb2bf]">
            <X size={18} />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {filteredPages.map((page) => (
            <Link
              href={page.path}
              key={page.id}
              onClick={onClose}
              className="block px-4 py-2 hover:bg-[#2c313a] text-[#abb2bf]"
            >
              {page.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
