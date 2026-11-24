import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { getService } from '@/data/services';
import { products } from '@/data/products';
import { ProductCardMinimal } from '@/components/ProductCard';
import { CTASection } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SmartImage } from '@/components/SmartImage';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getService(slug) : undefined;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-porcelain">
        <div className="text-center">
          <p className="font-serif text-4xl text-ink/60 mb-4">Service not found</p>
          <Link to="/services" className="btn-primary">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.categorySlug === service.slug || (service.slug === 'composite-decking' && p.categorySlug === 'composite-decking'))
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-obsidian">
        <SmartImage src={service.image} alt={service.title} className="absolute inset-0 h-full w-full" imgClassName="hero-scale" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/20" />
        <div className="relative container-lux pb-16 md:pb-24">
          <Link to="/services" className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-wider-2 text-porcelain/60 hover:text-champagne transition-colors mb-6">
            All Services
          </Link>
          <p className="eyebrow text-champagne mb-4 reveal-up delay-100">Service</p>
          <h1 className="heading-arch text-4xl md:text-6xl lg:text-7xl text-porcelain reveal-up delay-200">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Description */}
      <section className="bg-porcelain py-24 md:py-32">
        <div className="container-lux grid md:grid-cols-[1fr_2fr] gap-12">
          <Reveal>
            <p className="eyebrow mb-4">Overview</p>
            <h2 className="heading-arch text-3xl text-ink">{service.title}</h2>
          </Reveal>
          <Reveal delay="reveal-delay-1">
            <p className="text-base md:text-lg text-ink/70 leading-relaxed">{service.description}</p>
          </Reveal>
        </div>
      </section>

      {/* Applications */}
      <section className="bg-limestone py-24 md:py-32">
        <div className="container-lux">
          <Reveal className="mb-12">
            <p className="eyebrow mb-4">Applications</p>
            <h2 className="heading-arch text-3xl md:text-4xl text-ink">Where It's Used.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.applications.map((app, i) => (
              <Reveal key={app} delay={`reveal-delay-${(i % 3) + 1}` as never}>
                <div className="flex items-center gap-3 border-t border-ink/10 pt-5">
                  <Check className="h-4 w-4 text-copper shrink-0" strokeWidth={2} />
                  <span className="text-sm text-ink/80">{app}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-porcelain py-24 md:py-32">
        <div className="container-lux">
          <Reveal className="mb-12">
            <p className="eyebrow mb-4">Gallery</p>
            <h2 className="heading-arch text-3xl md:text-4xl text-ink">In Context.</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {service.gallery.map((img, i) => (
              <Reveal key={i} delay={`reveal-delay-${(i % 3) + 1}` as never} className={i === 0 ? 'md:col-span-2 md:row-span-2' : ''}>
                <div className={`relative overflow-hidden edge-light group ${i === 0 ? 'aspect-square md:h-full' : 'aspect-[4/3]'}`}>
                  <SmartImage src={img} alt={`${service.title} ${i + 1}`} className="h-full w-full" imgClassName="img-zoom" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="bg-limestone py-24 md:py-32">
          <div className="container-lux">
            <Reveal className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <h2 className="heading-arch text-3xl md:text-4xl text-ink">Related Products</h2>
              <Link to="/shop" className="btn-ghost">
                All Products <ArrowRight className="h-4 w-4 arrow-anim" strokeWidth={1.5} />
              </Link>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedProducts.map((p, i) => (
                <Reveal key={p.id} delay={`reveal-delay-${i + 1}` as never}>
                  <ProductCardMinimal product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title={
          <>
            Interested in
            <span className="font-serif italic font-light text-champagne normal-case tracking-normal"> {service.title}?</span>
          </>
        }
        image={service.gallery[1] ?? service.image}
      />
    </>
  );
}
