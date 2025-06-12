"use client"

import type React from "react"

interface IframeViewerProps {
  url: string
  title: string
  onClose: () => void
}

export default function IframeViewer({ url, title, onClose }: IframeViewerProps) {
  // URL이 이미 디코딩되어 있는지 확인
  const isAlreadyDecoded = url === decodeURIComponent(url)
  const finalUrl = isAlreadyDecoded ? url : decodeURIComponent(url)
  
  console.log('Original URL:', url)
  console.log('Is already decoded:', isAlreadyDecoded)
  console.log('Final URL:', finalUrl)

  // const openInNewTab = () => {
  //   window.open(url, "_blank", "noopener,noreferrer")
  // }

  return (
    <div className="h-full flex flex-col bg-[#282c34] dark:bg-[#282c34] light:bg-[#fafafa]">
      <div className="flex-1 overflow-hidden h-full">
        <iframe
          src={finalUrl}
          title={title}
          className="w-full h-full border-0"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  )
}
