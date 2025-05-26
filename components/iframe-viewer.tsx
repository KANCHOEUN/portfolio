"use client"

interface IframeViewerProps {
  url: string
  title: string
  onClose: () => void
}

export default function IframeViewer({ url, title, onClose }: IframeViewerProps) {
  // const openInNewTab = () => {
  //   window.open(url, "_blank", "noopener,noreferrer")
  // }

  return (
    <div className="h-full flex flex-col bg-[#282c34] dark:bg-[#282c34] light:bg-[#fafafa]">
      <div className="flex-1 overflow-hidden h-full">
        <iframe
          src={url}
          className="w-full h-full border-0"
          title={title}
          sandbox="allow-scripts allow-same-origin allow-forms"
          loading="lazy"
        />
      </div>
    </div>
  )
}
