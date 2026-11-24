import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SmartImage } from '@/components/SmartImage';

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  align = 'left',
}: {
  eyebrow: string;
  title: string | React.ReactNode;
  description?: string;
  image: string;
  align?: 'left' | 'center';
}) {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden bg-obsidian">
      <SmartImage src={image} alt={eyebrow} className="absolute inset-0 h-full w-full" imgClassName="hero-scale" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/20" />
      <div className={`relative container-lux pb-16 md:pb-24 ${align === 'center' ? 'text-center' : ''}`}>
        <p className="eyebrow text-champagne mb-4 reveal-up delay-100">{eyebrow}</p>
        <h1 className="heading-arch text-4xl md:text-6xl lg:text-7xl text-porcelain max-w-4xl reveal-up delay-200">
          {title}
        </h1>
        {description && (
          <p className={`text-base md:text-lg text-porcelain/70 mt-6 max-w-xl reveal-up delay-300 ${align === 'center' ? 'mx-auto' : ''}`}>
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

export function CTASection({
  title,
  image,
  primaryLink = '/contact',
  primaryLabel = 'Request a Quote',
  secondaryLink = '/shop',
  secondaryLabel = 'Explore the Shop',
}: {
  title: React.ReactNode;
  image: string;
  primaryLink?: string;
  primaryLabel?: string;
  secondaryLink?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-obsidian">
      <SmartImage src={image} alt="Call to action" className="absolute inset-0 h-full w-full opacity-40" imgClassName="hero-scale" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/50" />
      <div className="relative container-lux py-24 md:py-32 text-center">
        <h2 className="heading-arch text-4xl md:text-6xl text-porcelain mb-8">{title}</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={primaryLink} className="btn-primary">
            {primaryLabel} <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <Link to={secondaryLink} className="btn-outline !border-champagne/40 text-champagne hover:!bg-champagne hover:!text-ink">
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
