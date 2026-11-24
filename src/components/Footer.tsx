import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowRight } from 'lucide-react';

const exploreLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

const shopLinks = [
  { label: 'Decking', path: '/shop?category=premium-decking' },
  { label: 'Cladding', path: '/shop?category=cladding' },
  { label: 'Fascia Boards', path: '/shop?category=fascia-boards' },
  { label: 'Balustrades', path: '/shop?category=balustrades' },
  { label: 'Accessories', path: '/shop?category=accessories' },
];

export function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className="bg-obsidian text-porcelain relative">
      <div className="divider-fine" />
      <div className="container-lux py-16 md:py-24">
        {/* Wordmark */}
        <div className="mb-16 text-center">
          <h2 className="heading-arch text-5xl md:text-7xl text-porcelain mb-4">
            RENO <span className="text-copper">DECKS</span>
          </h2>
          <p className="eyebrow text-champagne/70">Built Around Better Living</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Explore */}
          <div>
            <h3 className="eyebrow text-champagne mb-6">Explore</h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-porcelain/70 hover:text-champagne transition-colors duration-300 link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="eyebrow text-champagne mb-6">Shop</h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-porcelain/70 hover:text-champagne transition-colors duration-300 link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="eyebrow text-champagne mb-6">Contact</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 text-sm text-porcelain/70 hover:text-champagne transition-colors duration-300"
                >
                  Contact Us
                  <ArrowRight className="h-3 w-3 arrow-anim" strokeWidth={1.5} />
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 text-sm text-porcelain/70 hover:text-champagne transition-colors duration-300"
                >
                  Request Quote
                  <ArrowRight className="h-3 w-3 arrow-anim" strokeWidth={1.5} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-fine mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[0.65rem] uppercase tracking-wider-2 text-porcelain/40">
            Demonstration Website — Not a Live Store
          </p>
          <p className="text-[0.65rem] uppercase tracking-wider-2 text-porcelain/40">
            © {new Date().getFullYear()} Reno Decks Preview
          </p>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center border border-copper/40 bg-obsidian/80 backdrop-blur text-champagne transition-all duration-500 hover:bg-copper hover:text-porcelain ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" strokeWidth={1.5} />
      </button>
    </footer>
  );
}
