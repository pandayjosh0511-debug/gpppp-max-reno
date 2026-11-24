import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Maximize2 } from 'lucide-react';
import { getProject, getRelatedProjects } from '@/data/projects';
import { Lightbox } from '@/components/Lightbox';
import { CTASection } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SmartImage } from '@/components/SmartImage';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;
  const related = slug ? getRelatedProjects(slug, 3) : [];

  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-porcelain">
        <div className="text-center">
          <p className="font-serif text-4xl text-ink/60 mb-4">Project not found</p>
          <Link to="/projects" className="btn-primary">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden bg-obsidian">
        <SmartImage src={project.image} alt={project.title} className="absolute inset-0 h-full w-full" imgClassName="hero-scale" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/20" />
        <div className="relative container-lux pb-16 md:pb-24">
          <Link to="/projects" className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-wider-2 text-porcelain/60 hover:text-champagne transition-colors mb-6">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> All Projects
          </Link>
          <p className="eyebrow text-champagne mb-4">{project.category} — Concept</p>
          <h1 className="heading-arch text-4xl md:text-6xl lg:text-7xl text-porcelain reveal-up delay-200">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Description */}
      <section className="bg-porcelain py-24 md:py-32">
        <div className="container-lux grid md:grid-cols-[1fr_2fr] gap-12">
          <Reveal>
            <p className="eyebrow mb-4">The Concept</p>
            <h2 className="heading-arch text-3xl text-ink">{project.shortDescription}</h2>
          </Reveal>
          <Reveal delay="reveal-delay-1">
            <p className="text-base md:text-lg text-ink/70 leading-relaxed">{project.description}</p>
            <p className="text-xs text-ink/40 mt-6">
              Illustrative demonstration concept. Not a claim of a completed Reno Decks project.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-limestone py-24 md:py-32">
        <div className="container-lux">
          <Reveal className="mb-12">
            <p className="eyebrow mb-4">Gallery</p>
            <h2 className="heading-arch text-3xl md:text-4xl text-ink">Project Images.</h2>
          </Reveal>

          {/* Main image */}
          <Reveal>
            <div
              className="relative aspect-[16/9] overflow-hidden cursor-pointer group edge-light mb-4"
              onClick={() => setLightboxOpen(true)}
            >
              <SmartImage src={project.gallery[activeImage]} alt={`${project.title} image ${activeImage + 1}`} className="h-full w-full" imgClassName="img-zoom" />
              <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center bg-obsidian/60 backdrop-blur text-porcelain/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Maximize2 className="h-4 w-4" strokeWidth={1.5} />
              </div>
            </div>
          </Reveal>

          {/* Thumbnails */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative aspect-[4/3] overflow-hidden border transition-all duration-300 ${
                  activeImage === i ? 'border-copper ring-1 ring-copper' : 'border-ink/10'
                }`}
              >
                <img src={img} alt={`${project.title} thumbnail ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="bg-porcelain py-24 md:py-32">
          <div className="container-lux">
            <Reveal className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <h2 className="heading-arch text-3xl md:text-4xl text-ink">Related Concepts</h2>
              <Link to="/projects" className="btn-ghost">
                All Projects <ArrowRight className="h-4 w-4 arrow-anim" strokeWidth={1.5} />
              </Link>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={`reveal-delay-${i + 1}` as never}>
                  <Link to={`/projects/${p.slug}`} className="group relative block overflow-hidden edge-light">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <SmartImage src={p.image} alt={p.title} className="h-full w-full" imgClassName="img-zoom" />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-[0.55rem] uppercase tracking-wider-2 text-champagne mb-1">{p.category}</p>
                      <h3 className="text-base font-sans font-light text-porcelain">{p.title}</h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title={
          <>
            Inspired by
            <span className="font-serif italic font-light text-champagne normal-case tracking-normal"> this concept?</span>
          </>
        }
        image={project.gallery[1] ?? project.image}
        primaryLabel="Request a Quote"
        secondaryLabel="View All Projects"
        secondaryLink="/projects"
      />

      {lightboxOpen && (
        <Lightbox
          images={project.gallery}
          index={activeImage}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setActiveImage}
        />
      )}
    </>
  );
}
