import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Compass, MessageCircle, Ruler } from 'lucide-react';
import { products, categories } from '@/data/products';
import { projects } from '@/data/projects';
import type { Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { QuickView } from '@/components/QuickView';
import { Reveal } from '@/components/Reveal';
import { SmartImage } from '@/components/SmartImage';
import { FloatingCollectionNav } from '@/components/FloatingCollectionNav';

const heroImg = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80';
const introImg = 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80';
const textureImg = 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&w=1600&q=80';
const ctaImg = 'https://images.unsplash.com/photo-1564013799919-ab6000bffc30?auto=format&fit=crop&w=1920&q=80';

const categoryLayout = [
  'md:col-span-7 aspect-[16/10]',
  'md:col-span-5 aspect-[16/10]',
  'md:col-span-4 aspect-[4/3]',
  'md:col-span-4 aspect-[4/3]',
  'md:col-span-4 aspect-[4/3]',
  'md:col-span-12 aspect-[21/9]',
];

const planSteps = [
  { number: '01', title: 'Explore Materials', text: 'Discover decking, cladding and architectural finishes.', icon: Compass },
  { number: '02', title: 'Share Your Vision', text: 'Tell us about your space, requirements and measurements.', icon: MessageCircle },
  { number: '03', title: 'Request a Quote', text: 'Get in touch to discuss your project and next steps.', icon: Ruler },
];

export function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);
  const featuredProjects = projects.slice(0, 4);

  return (
    <>
      <section className="relative flex min-h-[700px] h-screen items-center overflow-visible bg-obsidian">
        <div className="absolute inset-0 hero-scale">
          <SmartImage src={heroImg} alt="Luxury home with outdoor timber deck at dusk" className="h-full w-full" loading="eager" fetchPriority="high" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/85 via-obsidian/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-obsidian/30" />

        <div className="relative container-lux w-full pt-20 md:pt-24">
          <p className="eyebrow text-champagne mb-5 reveal-up delay-300">
            Premium Decking &amp; Architectural Surfaces
          </p>
          <h1 className="heading-arch max-w-5xl text-5xl leading-[0.9] text-porcelain reveal-up delay-400 sm:text-6xl md:text-7xl lg:text-8xl">
            Crafted for
            <br />
            <span className="font-serif normal-case italic font-light tracking-normal text-champagne">
              life outside.
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-porcelain/80 md:text-lg reveal-up delay-500">
            Premium decking, architectural finishes and outdoor solutions for exceptional spaces.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row reveal-up delay-600">
            <Link to="/shop" className="btn-primary">
              Explore the Collection <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <Link to="/projects" className="btn-outline !border-emerald bg-forest/80 text-porcelain hover:!bg-emerald hover:!text-porcelain">
              View Our Work
            </Link>
          </div>
        </div>

        <div className="absolute bottom-20 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 fade-in delay-800">
          <span className="text-[0.6rem] uppercase tracking-ultra-wide text-porcelain/50">Scroll</span>
          <div className="relative h-10 w-px overflow-hidden bg-porcelain/20">
            <div className="scroll-dot absolute left-0 top-0 h-3 w-px bg-champagne" />
          </div>
          <ArrowDown className="h-3 w-3 text-emerald" strokeWidth={1.5} />
        </div>
        <FloatingCollectionNav />
      </section>

      <section className="bg-porcelain pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="container-lux grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="eyebrow mb-5">The Reno Decks Collection</p>
            <h2 className="heading-arch mb-7 text-4xl text-ink md:text-5xl lg:text-6xl">
              Materials for
              <br />
              <span className="font-serif normal-case italic font-light tracking-normal text-copper">thoughtful spaces.</span>
            </h2>
            <p className="mb-8 max-w-md text-base leading-relaxed text-ink/70 md:text-lg">
              Explore decking, cladding and architectural finishes selected to bring character to contemporary outdoor environments.
            </p>
            <Link to="/about" className="btn-ghost">
              Discover Our Story <ArrowRight className="h-4 w-4 arrow-anim" strokeWidth={1.5} />
            </Link>
          </Reveal>
          <Reveal delay="reveal-delay-2" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden edge-light">
              <SmartImage src={introImg} alt="Architectural outdoor terrace" className="h-full w-full" imgClassName="img-zoom" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 border border-copper/30 md:block" />
          </Reveal>
        </div>
      </section>

      <section className="bg-limestone py-20 md:py-28">
        <div className="container-lux">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow mb-4">The Collection</p>
            <h2 className="heading-arch mb-4 text-4xl text-ink md:text-5xl">Explore Our Collections.</h2>
            <p className="text-base leading-relaxed text-ink/60 md:text-lg">
              Materials and finishes for thoughtfully designed spaces.
            </p>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-12 md:gap-5">
            {categories.map((category, index) => (
              <Reveal key={category.slug} delay={`reveal-delay-${Math.min(index % 4 + 1, 4)}` as never} className={categoryLayout[index]}>
                <Link to={`/shop?category=${category.slug}`} className="group relative block h-full overflow-hidden edge-light">
                  <SmartImage src={category.image} alt={category.name} className="h-full w-full" imgClassName="img-zoom" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <h3 className="mb-2 text-lg font-light text-porcelain md:text-xl">{category.name}</h3>
                    <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-wider-2 text-champagne">
                      Explore Collection <ArrowRight className="h-3.5 w-3.5 arrow-anim" strokeWidth={1.5} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-obsidian py-20 md:py-28">
        <div className="absolute inset-0 ambient-glow" />
        <div className="relative container-lux grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-square overflow-hidden">
              <SmartImage src={textureImg} alt="Timber material close-up texture" className="h-full w-full" imgClassName="img-zoom" />
              <div className="absolute inset-0 bg-gradient-to-tr from-copper/20 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay="reveal-delay-2">
            <p className="eyebrow mb-5 text-champagne">Materials &amp; Finishes</p>
            <h2 className="heading-arch mb-5 text-4xl text-porcelain md:text-5xl">Texture, Tone &amp; Detail.</h2>
            <p className="mb-8 max-w-md text-base leading-relaxed text-porcelain/70 md:text-lg">
              Explore the textures, tones and details that define your space.
            </p>
            <div className="flex flex-wrap gap-2 border-t border-emerald/50 pt-5">
              {['Walnut', 'Teak', 'Charcoal', 'Ash Grey'].map((finish) => (
                <Link
                  key={finish}
                  to={`/shop?search=${encodeURIComponent(finish)}`}
                  className="border border-emerald/60 px-3 py-2 text-[0.65rem] uppercase tracking-wider-2 text-porcelain/80 transition-colors hover:border-copper hover:text-champagne"
                >
                  {finish}
                </Link>
              ))}
            </div>
            <Link to="/shop" className="btn-ghost mt-8 text-champagne">
              Browse Materials <ArrowRight className="h-4 w-4 arrow-anim" strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-porcelain py-20 md:py-28">
        <div className="container-lux">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow mb-4">Materials in Context</p>
              <h2 className="heading-arch text-4xl text-ink md:text-5xl">The Material Edit.</h2>
            </div>
            <Link to="/shop" className="btn-ghost">
              View All Products <ArrowRight className="h-4 w-4 arrow-anim" strokeWidth={1.5} />
            </Link>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {featuredProducts.map((product, index) => (
              <Reveal key={product.id} delay={`reveal-delay-${(index % 3) + 1}` as never}>
                <ProductCard product={product} onQuickView={setQuickViewProduct} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-limestone py-20 md:py-28">
        <div className="container-lux">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow mb-4">Selected Concepts</p>
              <h2 className="heading-arch text-4xl text-ink md:text-5xl">Spaces Transformed.</h2>
            </div>
            <Link to="/projects" className="btn-ghost">
              View All Projects <ArrowRight className="h-4 w-4 arrow-anim" strokeWidth={1.5} />
            </Link>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={`reveal-delay-${(index % 2) + 1}` as never}>
                <Link to={`/projects/${project.slug}`} className="group relative block overflow-hidden edge-light">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <SmartImage src={project.image} alt={project.title} className="h-full w-full" imgClassName="img-zoom" />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="mb-2 text-[0.6rem] uppercase tracking-wider-2 text-champagne">{project.category} — Concept</p>
                    <h3 className="mb-2 text-xl font-light text-porcelain md:text-2xl">{project.title}</h3>
                    <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-wider-2 text-champagne">
                      View Project <ArrowRight className="h-3.5 w-3.5 arrow-anim" strokeWidth={1.5} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest py-20 md:py-28">
        <div className="container-lux">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow mb-4 text-champagne">Plan Your Project</p>
            <h2 className="heading-arch mb-4 text-4xl text-porcelain md:text-5xl">Your Project Starts Here.</h2>
            <p className="text-base leading-relaxed text-porcelain/70 md:text-lg">
              A clear path from first material choice to a considered outdoor space.
            </p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {planSteps.map(({ number, title, text, icon: Icon }, index) => (
              <Reveal key={number} delay={`reveal-delay-${index + 1}` as never}>
                <div className="group border-t border-emerald/70 pt-6 transition-colors duration-500 hover:border-copper">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="font-serif text-5xl text-champagne/60">{number}</span>
                    <Icon className="h-6 w-6 text-copper transition-transform duration-300 group-hover:-translate-y-1" strokeWidth={1.2} />
                  </div>
                  <h3 className="mb-3 text-sm font-medium uppercase tracking-wider-2 text-porcelain">{title}</h3>
                  <p className="text-sm leading-relaxed text-porcelain/60">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <Link to="/contact" className="btn-primary">
              Request a Quote <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-obsidian">
        <SmartImage src={ctaImg} alt="Outdoor terrace at golden hour" className="absolute inset-0 h-full w-full opacity-45" imgClassName="hero-scale" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/75 to-obsidian/50" />
        <div className="relative container-lux py-24 text-center md:py-32">
          <Reveal>
            <h2 className="heading-arch mb-5 text-4xl text-porcelain md:text-6xl">
              Let&apos;s Create Something
              <br />
              <span className="font-serif normal-case italic font-light tracking-normal text-champagne">Exceptional.</span>
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-base text-porcelain/70 md:text-lg">
              Explore the possibilities for your next outdoor or architectural project.
            </p>
            <Link to="/contact" className="btn-primary">
              Request a Quote <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
      </section>

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  );
}
