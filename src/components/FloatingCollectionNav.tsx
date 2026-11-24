import { Layers, PanelsTopLeft, Home, Shapes, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const collections = [
  { label: 'Decking', href: '/shop?category=premium-decking', icon: Layers },
  { label: 'Cladding', href: '/shop?category=cladding', icon: PanelsTopLeft },
  { label: 'Outdoor Living', href: '/services/outdoor-living-solutions', icon: Home },
  { label: 'Architectural Surfaces', href: '/shop?category=cladding', icon: Shapes },
];

export function FloatingCollectionNav() {
  const location = useLocation();

  return (
    <div className="floating-collection-wrap absolute bottom-0 left-0 right-0 z-20 translate-y-1/2 px-4 md:px-8">
      <nav
        aria-label="Explore collections; swipe horizontally to see more"
        className="floating-collection mx-auto max-w-6xl overflow-x-auto snap-x snap-mandatory"
      >
        <div className="flex min-w-max md:min-w-0">
          {collections.map(({ label, href, icon: Icon }, index) => {
            const [path, query] = href.split('?');
            const active = location.pathname === path && (!query || location.search.includes(query));

            return (
            <Link
              key={label}
              to={href}
              aria-current={active ? 'page' : undefined}
              className={`floating-collection-item ${active ? 'floating-collection-item-active' : ''} group flex min-h-[88px] min-w-[205px] flex-1 snap-start items-center justify-center gap-4 px-6 py-5 text-left transition-all duration-300 md:min-w-0 ${
                index < collections.length - 1 ? 'border-r border-emerald/40' : ''
              }`}
            >
              <Icon className="h-8 w-8 shrink-0 text-copper transition-all duration-300 group-hover:-translate-y-1 group-hover:text-champagne" strokeWidth={1.2} />
              <span className="flex flex-col gap-1">
                <span className="text-[0.65rem] uppercase tracking-wider-2 text-porcelain/90 transition-colors duration-300 group-hover:text-porcelain">
                  {label}
                </span>
                <span className="flex items-center gap-1 text-[0.55rem] uppercase tracking-[0.18em] text-sage opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  Explore <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                </span>
              </span>
            </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
