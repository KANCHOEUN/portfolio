import { demoMedia } from "@/data/demo-media";
export default function DemoVideo({
  source,
  caption,
}: {
  source: string;
  caption?: string;
}) {
  const media = demoMedia[source];
  return (
    <figure className="my-3">
      <video
        src={media.video}
        poster={media.poster}
        width={media.width}
        height={media.height}
        controls
        playsInline
        preload="none"
        aria-label={caption || "프로젝트 기능 시연"}
        className="rounded w-full max-w-4xl h-auto"
      />
      {caption && (
        <figcaption className="text-sm text-[var(--muted)] mt-1">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
