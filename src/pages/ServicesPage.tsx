import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '@/data/services';
import { PageHero, CTASection } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SmartImage } from '@/components/SmartImage';

const heroImg = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80';

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={
          <>
            Surfaces. Structures.
            <br />
            <span className="font-serif italic font-light text-champagne normal-case tracking-normal">Possibilities.</span>
          </>
        }
        description="Comprehensive decking, cladding and outdoor architectural solutions for residential and commercial environments."
        image={heroImg}
      />

      <section className="bg-porcelain py-24 md:py-32">
        <div className="container-lux">
          <Reveal className="text-center mb-16">
            <p className="eyebrow mb-4">What We Offer</p>
            <h2 className="heading-arch text-4xl md:text-5xl text-ink">Explore Our Services.</h2>
          </Reveal>

          <div className="space-y-16 md:space-y-24">
            {services.map((service, i) => (
              <Reveal key={service.slug}>
                <div
                  className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                    i % 2 === 1 ? 'md:[direction:rtl]' : ''
                  }`}
                >
                  <div className="md:[direction:ltr]">
                    <div className="relative aspect-[4/3] overflow-hidden edge-light group">
                      <SmartImage src={service.image} alt={service.title} className="h-full w-full" imgClassName="img-zoom" />
                    </div>
                  </div>
                  <div className="md:[direction:ltr]">
                    <p className="eyebrow mb-4">{`0${i + 1}`}</p>
                    <h3 className="heading-arch text-3xl md:text-4xl text-ink mb-6">{service.title}</h3>
                    <p className="text-base text-ink/70 leading-relaxed mb-8 max-w-md">
                      {service.shortDescription}
                    </p>
                    <Link to={`/services/${service.slug}`} className="btn-ghost">
                      Explore Service <ArrowRight className="h-4 w-4 arrow-anim" strokeWidth={1.5} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={
          <>
            Ready to begin
            <span className="font-serif italic font-light text-champagne normal-case tracking-normal"> your project?</span>
          </>
        }
        image="https://images.unsplash.com/photo-1503394324252-6b2e60a47d21?auto=format&fit=crop&w=1920&q=80"
      />
    </>
  );
}
