import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects, projectCategories } from '@/data/projects';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SmartImage } from '@/components/SmartImage';

const heroImg = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80';

const gridLayouts = [
  'md:col-span-8 aspect-[16/10]',
  'md:col-span-4 aspect-[4/5]',
  'md:col-span-4 aspect-[4/5]',
  'md:col-span-8 aspect-[16/10]',
  'md:col-span-6 aspect-[16/10]',
  'md:col-span-6 aspect-[16/10]',
  'md:col-span-7 aspect-[16/10]',
  'md:col-span-5 aspect-[4/5]',
];

export function ProjectsPage() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title={
          <>
            Spaces
            <span className="font-serif italic font-light text-champagne normal-case tracking-normal"> reimagined.</span>
          </>
        }
        description="Illustrative concept projects exploring the potential of our materials in architectural settings."
        image={heroImg}
      />

      <section className="bg-porcelain py-16 md:py-24">
        <div className="container-lux">
          {/* Filters */}
          <Reveal className="flex flex-wrap items-center gap-3 mb-12 border-b border-ink/10 pb-8">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 text-[0.65rem] uppercase tracking-wider-2 font-medium transition-all duration-300 border ${
                  filter === cat
                    ? 'bg-copper border-copper text-porcelain'
                    : 'border-ink/15 text-ink/60 hover:border-copper hover:text-copper'
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto text-sm text-ink/50">
              {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
            </span>
          </Reveal>

          {/* Grid */}
          <div className="grid md:grid-cols-12 gap-4 md:gap-6">
            {filtered.map((project, i) => (
              <Reveal key={project.slug} delay={`reveal-delay-${(i % 4) + 1}` as never} className={gridLayouts[i % gridLayouts.length]}>
                <Link to={`/projects/${project.slug}`} className="group relative block h-full overflow-hidden edge-light">
                  <SmartImage src={project.image} alt={project.title} className="h-full w-full" imgClassName="img-zoom" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-[0.6rem] uppercase tracking-wider-2 text-champagne mb-2">
                      {project.category} — Concept
                    </p>
                    <h3 className="text-xl md:text-2xl font-sans font-light text-porcelain mb-2">{project.title}</h3>
                    <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-wider-2 text-champagne opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      View Project <ArrowRight className="h-3.5 w-3.5 arrow-anim" strokeWidth={1.5} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
