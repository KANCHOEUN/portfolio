import { useState } from 'react';
import { ZoomOut } from 'lucide-react';

interface ImageZoomProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  width?: string;
}

export default function ImageZoom({ src, alt, caption, className = "", width = "40%" }: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  return (
    <>
      <div className="relative inline-block">
        <img
          src={src}
          alt={alt}
          className={`${className} cursor-zoom-in transition-transform duration-200
            w-full sm:w-[80%] md:w-[70%] lg:w-[70%] xl:w-[45%] 2xl:w-[40%]`}
          onClick={handleZoom}
        />
        {caption && <p className="text-sm text-gray-500 mt-1">{caption}</p>}
      </div>

      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={handleZoom}
        >
          <div className="relative w-[95vw] h-[95vh] sm:w-[90vw] sm:h-[90vh] md:w-[80vw] md:h-[80vh] lg:w-[70vw] lg:h-[70vh]">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-contain cursor-zoom-out"
            />
            <button
              className="absolute top-4 right-4 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              onClick={handleZoom}
            >
              <ZoomOut className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
} 