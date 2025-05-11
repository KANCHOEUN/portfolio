"use client"

import type React from "react"

interface BlogCardProps {
  title: string
  description: string
  image: string
  url: string
  onClick?: (url: string, title: string) => void
}

export default function BlogCard({ title, description, image, url, onClick }: BlogCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick(url, title)
    }
  }

  return (
    <a
      href={url}
      className="block rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 bg-[#21252b] dark:bg-[#21252b] light:bg-[#f0f0f0] h-[140px]">
        <h3 className="text-lg font-semibold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] mb-2 truncate">
          {title}
        </h3>
        <p className="text-sm text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] line-clamp-3">{description}</p>
      </div>
    </a>
  )
}
