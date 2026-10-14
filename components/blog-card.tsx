"use client";
import Image from "next/image";
interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  url: string;
  onClick?: (url: string, title: string) => void;
}
export default function BlogCard({
  title,
  description,
  image,
  url,
  onClick,
}: BlogCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      onClick={(event) => {
        if (
          onClick &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.shiftKey &&
          !event.altKey
        ) {
          event.preventDefault();
          onClick(url, title);
        }
      }}
    >
      <div className="relative h-48">
        <Image
          src={image || "/placeholder.svg"}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 400px"
          unoptimized={!image.startsWith("/")}
          className="object-cover"
        />
      </div>
      <div className="p-4 bg-[var(--surface)] min-h-[140px]">
        <h2 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h2>
        <p className="text-sm line-clamp-3">{description}</p>
      </div>
    </a>
  );
}
