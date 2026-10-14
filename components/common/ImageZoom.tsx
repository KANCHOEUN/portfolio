"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import { imageDimensions } from "@/data/image-dimensions";
interface ImageZoomProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  width?: string;
}
export default function ImageZoom({
  src,
  alt,
  caption,
  className = "",
}: ImageZoomProps) {
  const [zoomed, setZoomed] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const dimensions = imageDimensions[src] ?? { width: 1200, height: 800 };
  useEffect(() => {
    if (!zoomed) return;
    const modal = dialog.current;
    const opener = trigger.current;
    modal?.showModal();
    return () => {
      modal?.close();
      opener?.focus();
    };
  }, [zoomed]);
  return (
    <figure className={className}>
      <button
        ref={trigger}
        onClick={() => setZoomed(true)}
        aria-label={`${alt} 이미지 확대`}
        className="block cursor-zoom-in max-w-[80%] md:max-w-[75%] 2xl:max-w-[65%]"
      >
        <Image
          src={src}
          alt={alt}
          width={dimensions.width}
          height={dimensions.height}
          sizes="(max-width: 767px) 80vw, 65vw"
          unoptimized={!src.startsWith("/") || src.endsWith(".svg")}
          className="w-auto h-auto max-h-[45vh] object-contain rounded"
        />
      </button>
      {caption && (
        <figcaption className="text-sm text-[var(--muted)] mt-1">
          {caption}
        </figcaption>
      )}
      {zoomed &&
        createPortal(
          <dialog
            ref={dialog}
            aria-label={`${alt} 확대 이미지`}
            className="image-dialog"
            onCancel={() => setZoomed(false)}
            onClose={() => setZoomed(false)}
            onClick={(event) => {
              if (event.target === event.currentTarget) setZoomed(false);
            }}
          >
            <div className="relative">
              <Image
                src={src}
                alt={alt}
                width={dimensions.width}
                height={dimensions.height}
                unoptimized
                className="w-auto h-auto max-w-[90vw] max-h-[90dvh] object-contain"
              />
              <button
                autoFocus
                aria-label="확대 이미지 닫기"
                className="absolute top-2 right-2 rounded-full bg-black/60 text-white p-2"
                onClick={() => setZoomed(false)}
              >
                <X size={24} />
              </button>
            </div>
          </dialog>,
          document.body,
        )}
    </figure>
  );
}
