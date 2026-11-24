import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const next = useCallback(() => {
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  const prev = useCallback(() => {
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, next, prev]);

  if (images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-obsidian/95 backdrop-blur-md fade-in p-4">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center text-porcelain/80 hover:text-champagne transition-colors z-10"
        aria-label="Close"
      >
        <X className="h-6 w-6" strokeWidth={1.5} />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 flex h-12 w-12 items-center justify-center text-porcelain/80 hover:text-champagne transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-8 w-8" strokeWidth={1} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 md:right-8 flex h-12 w-12 items-center justify-center text-porcelain/80 hover:text-champagne transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-8 w-8" strokeWidth={1} />
          </button>
        </>
      )}

      <img
        src={images[index]}
        alt={`Image ${index + 1}`}
        className="max-h-[85vh] max-w-[90vw] object-contain fade-in"
      />

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className={`h-1.5 transition-all duration-300 ${
                i === index ? 'w-8 bg-champagne' : 'w-4 bg-porcelain/30'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
