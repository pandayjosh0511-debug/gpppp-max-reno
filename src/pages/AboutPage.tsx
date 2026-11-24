import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Compass, Leaf, Sparkles } from 'lucide-react';
import { PageHero, CTASection } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SmartImage } from '@/components/SmartImage';

const heroImg = 'https://images.unsplash.com/photo-1600569398248-86fe23243f06?auto=format&fit=crop&w=1920&q=80';
const philosophyImg = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80';
const materialsImg = 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&w=1200&q=80';
const lifestyleImg = 'https://images.unsplash.com/photo-1564013799919-ab6000bffc30?auto=format&fit=crop&w=1200&q=80';

const values = [
  { icon: Layers, title: 'Material Integrity', text: 'We believe outdoor surfaces should earn their place through character, performance and timeless appeal.' },
  { icon: Compass, title: 'Design Sensibility', text: 'Every product is selected with an architectural eye — for tone, proportion and how it reads in real spaces.' },
  { icon: Leaf, title: 'Living Outdoors', text: 'Our materials are made for the way people actually live outside — gathering, relaxing and connecting.' },
  { icon: Sparkles, title: 'Considered Detail', text: 'From edge trims to fixing clips, we attend to the details that make a finished project feel complete.' },
];

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Reno Decks"
        title={
          <>
            Outdoor living,
            <br />
            <span className="font-serif italic font-light text-champagne normal-case tracking-normal">reimagined.</span>
          </>
        }
        image={heroImg}
      />

      {/* Introduction */}
      <section className="bg-porcelain py-24 md:py-32">
        <div className="container-lux grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Reveal>
            <p className="eyebrow mb-6">Who We Are</p>
            <h2 className="heading-arch text-4xl md:text-5xl text-ink mb-8">
              A focus on
              <span className="font-serif italic font-light text-copper normal-case tracking-normal"> materials.</span>
            </h2>
            <div className="space-y-4 text-base text-ink/70 leading-relaxed max-w-md">
              <p>
                Reno Decks is a decking, cladding and outdoor architectural materials company. Our focus is
                on the surfaces and structures that define outdoor spaces — the decking beneath your feet,
                the cladding that shapes a facade, the structures that create shade and shelter.
              </p>
              <p>
                We bring together a curated range of materials designed for contemporary outdoor living,
                from premium engineered decking to sculptural cladding systems and complete outdoor
                solutions.
              </p>
            </div>
          </Reveal>
          <Reveal delay="reveal-delay-2" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden edge-light">
              <SmartImage src={philosophyImg} alt="Modern architectural terrace" className="h-full w-full" imgClassName="img-zoom" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy - dark */}
      <section className="bg-obsidian py-24 md:py-32">
        <div className="container-lux grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Reveal className="order-2 md:order-1 relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <SmartImage src={materialsImg} alt="Architectural material textures" className="h-full w-full" imgClassName="img-zoom" />
            </div>
          </Reveal>
          <Reveal delay="reveal-delay-2" className="order-1 md:order-2">
            <p className="eyebrow text-champagne mb-6">Our Philosophy</p>
            <h2 className="heading-arch text-4xl md:text-5xl text-porcelain mb-8">
              Materials shape
              <span className="font-serif italic font-light text-champagne normal-case tracking-normal"> experience.</span>
            </h2>
            <p className="text-base md:text-lg text-porcelain/70 leading-relaxed mb-6 max-w-md">
              We believe the materials that surround us shape how we feel in a space. The warmth of timber
              underfoot, the shadow across a sculpted facade, the cool surface of a poolside deck — these
              sensory experiences define outdoor living.
            </p>
            <p className="text-base md:text-lg text-porcelain/70 leading-relaxed max-w-md">
              That belief guides every product we select and every project we support.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values grid */}
      <section className="bg-limestone py-24 md:py-32">
        <div className="container-lux">
          <Reveal className="text-center mb-16">
            <p className="eyebrow mb-4">What We Value</p>
            <h2 className="heading-arch text-4xl md:text-5xl text-ink">Principles in Practice.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={`reveal-delay-${i + 1}` as never}>
                <div className="border-t border-ink/10 pt-6 group hover:border-copper transition-colors duration-500">
                  <v.icon className="h-7 w-7 text-copper mb-6 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.2} />
                  <h3 className="text-sm font-sans font-medium text-ink mb-3 leading-snug">{v.title}</h3>
                  <p className="text-sm text-ink/60 leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle - light */}
      <section className="bg-porcelain py-24 md:py-32">
        <div className="container-lux grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Reveal>
            <p className="eyebrow mb-6">Outdoor Lifestyle</p>
            <h2 className="heading-arch text-4xl md:text-5xl text-ink mb-8">
              Designed for
              <span className="font-serif italic font-light text-copper normal-case tracking-normal"> time outside.</span>
            </h2>
            <p className="text-base md:text-lg text-ink/70 leading-relaxed mb-8 max-w-md">
              Outdoor spaces have become extensions of how we live — places to gather, dine, relax and
              retreat. Our materials are chosen to support that lifestyle across seasons and settings.
            </p>
            <Link to="/projects" className="btn-ghost">
              View Our Projects <ArrowRight className="h-4 w-4 arrow-anim" strokeWidth={1.5} />
            </Link>
          </Reveal>
          <Reveal delay="reveal-delay-2" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden edge-light">
              <SmartImage src={lifestyleImg} alt="Outdoor living terrace" className="h-full w-full" imgClassName="img-zoom" />
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title={
          <>
            Let's create something
            <span className="font-serif italic font-light text-champagne normal-case tracking-normal"> exceptional.</span>
          </>
        }
        image="https://images.unsplash.com/photo-1516594762805-9a87a90b9ca6?auto=format&fit=crop&w=1920&q=80"
      />
    </>
  );
}
