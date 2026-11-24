import { useState } from 'react';

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
};

export function SmartImage({ src, alt, className = '', imgClassName = '', loading = 'lazy', fetchPriority }: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-sage via-ink to-obsidian ${className}`}>
      {!loaded && !errored && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-sage/40 via-ink/60 to-obsidian/80" />
      )}
      {errored ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sage via-ink to-obsidian">
          <div className="text-center">
            <div className="mx-auto mb-3 h-16 w-16 border border-champagne/30" />
            <span className="text-[0.6rem] uppercase tracking-ultra-wide text-champagne/60">Reno Decks</span>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        />
      )}
    </div>
  );
}
