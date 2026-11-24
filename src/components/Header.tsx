import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Shop', path: '/shop' },
  { label: 'Contact', path: '/contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [cartBounce, setCartBounce] = useState(false);
  const { count, open: openCart, lastAdded } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (lastAdded > 0) {
      setCartBounce(true);
      const t = setTimeout(() => setCartBounce(false), 500);
      return () => clearTimeout(t);
    }
  }, [lastAdded]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const transparent = isHome && !scrolled;

  const headerClass = transparent
    ? 'bg-transparent border-transparent'
    : 'header-scrolled';

  const linkColor = 'text-porcelain/80 hover:text-porcelain';
  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname === path || location.pathname.startsWith(`${path}/`);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setSearchValue('');
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerClass}`}>
        <div className="container-lux flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="group z-50">
            <span className="font-sans text-lg md:text-xl font-light tracking-[0.3em] text-porcelain transition-colors duration-300 group-hover:text-champagne">
              RENO
            </span>
            <span className="font-sans text-lg md:text-xl font-light tracking-[0.3em] text-copper transition-colors duration-300 group-hover:text-champagne">
              {' '}DECKS
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[0.7rem] uppercase tracking-wider-2 font-medium transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-emerald after:transition-all after:duration-500 hover:after:w-full ${
                  isActive(link.path) ? 'text-champagne after:w-full' : linkColor
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4 md:gap-5">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className="text-porcelain/80 hover:text-champagne transition-colors duration-300"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
            <button
              onClick={openCart}
              className="relative text-porcelain/80 hover:text-champagne transition-colors duration-300"
              aria-label="Cart"
            >
              <ShoppingBag className={`h-[18px] w-[18px] ${cartBounce ? 'cart-bounce' : ''}`} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-copper px-1 text-[0.6rem] font-medium text-porcelain shadow-[0_0_10px_rgba(183,128,75,0.5)]">
                  {count}
                </span>
              )}
            </button>
            <Link
              to="/contact"
              className="hidden md:inline-flex btn-primary !px-6 !py-3 !text-[0.65rem]"
            >
              Request Quote
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-porcelain"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-obsidian/95 backdrop-blur-xl border-t border-champagne/10 fade-in">
            <div className="container-lux py-6">
              <form onSubmit={handleSearch} className="flex items-center gap-4">
                <Search className="h-5 w-5 text-champagne/60" strokeWidth={1.5} />
                <input
                  autoFocus
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search the collection..."
                  className="flex-1 bg-transparent border-b border-champagne/20 py-2 text-porcelain placeholder:text-porcelain/40 focus:border-copper focus:outline-none"
                />
                <button type="submit" className="btn-ghost">
                  Search <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-obsidian" />
        <div className="relative flex flex-col h-full">
          <div className="flex items-center justify-between h-20 px-6 border-b border-champagne/10">
            <span className="font-sans text-lg font-light tracking-[0.3em] text-porcelain">
              RENO <span className="text-copper">DECKS</span>
            </span>
            <button onClick={() => setMobileOpen(false)} className="text-porcelain" aria-label="Close menu">
              <X className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-6 gap-2">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-3xl font-serif font-light tracking-tight py-3 border-b border-champagne/10 transition-all duration-500 ${
                  isActive(link.path) ? 'text-champagne' : 'text-porcelain'
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${i * 60 + 100}ms` : '0ms',
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: mobileOpen ? 1 : 0,
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="btn-primary mt-8 self-start">
              Request Quote <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </nav>
          <div className="p-6 border-t border-champagne/10">
            <p className="text-[0.65rem] uppercase tracking-ultra-wide text-champagne/50">
              Built Around Better Living
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
