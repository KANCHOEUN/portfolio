"use client"

import type React from "react"

import { X } from "lucide-react"

export interface BlogPost {
  title: string
  description: string
  image: string
  content: React.ReactNode
}

interface BlogViewerProps {
  post: BlogPost
  onClose: () => void
}

export default function BlogViewer({ post, onClose }: BlogViewerProps) {
  return (
    <div className="h-full flex flex-col bg-[#282c34] dark:bg-[#282c34] light:bg-[#fafafa] border-l border-[#343a47] dark:border-[#343a47] light:border-[#d4d4d4]">
      <div className="flex justify-between items-center p-4 border-b border-[#343a47] dark:border-[#343a47] light:border-[#d4d4d4]">
        <h2 className="text-xl font-semibold text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] truncate pr-4">
          {post.title}
        </h2>
        <button
          onClick={onClose}
          className="text-[#abb2bf] dark:text-[#abb2bf] light:text-[#383a42] hover:text-[#e06c75] dark:hover:text-[#e06c75] light:hover:text-[#e45649] transition-colors"
          aria-label="Close viewer"
        >
          <X size={20} />
        </button>
      </div>

      <div className="overflow-auto flex-1 p-6">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-64 object-cover mb-6 rounded-md"
        />

        <div className="prose prose-invert dark:prose-invert light:prose-light max-w-none">
          {typeof post.content === "string" ? <div dangerouslySetInnerHTML={{ __html: post.content }} /> : post.content}
        </div>
      </div>
    </div>
  )
}
