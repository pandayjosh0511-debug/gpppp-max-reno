import { useEffect, useState } from 'react';

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
};

// A generic architectural fallback is used only when the requested image fails.
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1516594762805-9a87a90b9ca6?auto=format&fit=crop&w=1200&q=80';

export function SmartImage({ src, alt, className = '', imgClassName = '', loading = 'lazy', fetchPriority }: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setLoaded(false);
    setErrored(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-sage via-ink to-obsidian ${className}`}>
      {!loaded && !errored && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-sage/40 via-ink/60 to-obsidian/80" />
      )}
      {errored ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sage via-ink to-obsidian">
          <span className="text-[0.6rem] uppercase tracking-ultra-wide text-champagne/60">Reno Decks</span>
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (currentSrc !== FALLBACK_IMAGE) {
              setLoaded(false);
              setCurrentSrc(FALLBACK_IMAGE);
            } else setErrored(true);
          }}
          className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        />
      )}
    </div>
  );
}
