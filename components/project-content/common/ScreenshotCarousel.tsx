"use client";

import { useRef, useState, useEffect } from "react";

interface ScreenshotCarouselProps {
  images: { src: string; alt: string }[];
}

export default function ScreenshotCarousel({ images }: ScreenshotCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);
  const dragStart = useRef<{ x: number; scrollLeft: number } | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const check = () => {
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };

    check();
    el.addEventListener("scroll", check);
    return () => el.removeEventListener("scroll", check);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    dragStart.current = { x: e.pageX, scrollLeft: el.scrollLeft };
    el.style.scrollSnapType = "none";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragStart.current || !scrollRef.current) return;
    const dx = e.pageX - dragStart.current.x;
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const onMouseUp = () => {
    if (!dragStart.current || !scrollRef.current) return;
    dragStart.current = null;
    setTimeout(() => {
      if (scrollRef.current) scrollRef.current.style.scrollSnapType = "";
    }, 0);
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing select-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {images.map((image) => (
          <div
            key={image.src}
            className="shrink-0 snap-start rounded overflow-hidden border"
            style={{ width: 180 }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none absolute right-0 top-0 bottom-2 w-16 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to right, transparent, var(--background))",
          opacity: atEnd ? 0 : 1,
        }}
      />
    </div>
  );
}
