import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search, Check } from 'lucide-react';
import { products, categories, allFinishes } from '@/data/products';
import type { Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { QuickView } from '@/components/QuickView';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';

const heroImg = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80';

type SortOption = 'featured' | 'name-asc' | 'price-asc' | 'price-desc';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'price-asc', label: 'Price Low–High' },
  { value: 'price-desc', label: 'Price High–Low' },
];

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const categoryParam = searchParams.get('category') ?? '';
  const searchParam = searchParams.get('search') ?? '';

  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam ? [categoryParam] : []);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<'all' | 'under-300' | '300-600' | 'over-600'>('all');
  const [search, setSearch] = useState(searchParam);
  const [sort, setSort] = useState<SortOption>('featured');

  useEffect(() => {
    setSelectedCategories(categoryParam ? [categoryParam] : []);
  }, [categoryParam]);

  useEffect(() => {
    setSearch(searchParam);
  }, [searchParam]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const toggleFinish = (finish: string) => {
    setSelectedFinishes((prev) =>
      prev.includes(finish) ? prev.filter((f) => f !== finish) : [...prev, finish]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedFinishes([]);
    setPriceRange('all');
    setSearch('');
    setSearchParams({});
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.categorySlug));
    }
    if (selectedFinishes.length > 0) {
      result = result.filter((p) => p.finishes.some((f) => selectedFinishes.includes(f.name)));
    }
    if (priceRange !== 'all') {
      result = result.filter((p) => {
        if (p.price === null) return false;
        if (priceRange === 'under-300') return p.price < 300;
        if (priceRange === '300-600') return p.price >= 300 && p.price <= 600;
        if (priceRange === 'over-600') return p.price > 600;
        return true;
      });
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        result.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [selectedCategories, selectedFinishes, priceRange, search, sort]);

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedFinishes.length > 0 ||
    priceRange !== 'all' ||
    search.trim() !== '';

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <p className="eyebrow mb-4">Search</p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40" strokeWidth={1.5} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full border border-ink/15 bg-white pl-10 pr-4 py-3 text-sm focus:border-copper focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <p className="eyebrow mb-4">Category</p>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() => toggleCategory(cat.slug)}
                className="flex items-center gap-3 text-sm text-ink/70 hover:text-copper transition-colors w-full text-left"
              >
                <span className={`flex h-4 w-4 items-center justify-center border transition-all ${
                  selectedCategories.includes(cat.slug) ? 'border-copper bg-copper' : 'border-ink/20'
                }`}>
                  {selectedCategories.includes(cat.slug) && <Check className="h-3 w-3 text-porcelain" strokeWidth={2} />}
                </span>
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Finishes */}
      <div>
        <p className="eyebrow mb-4">Finish</p>
        <div className="flex flex-wrap gap-2">
          {allFinishes.map((finish) => (
            <button
              key={finish}
              onClick={() => toggleFinish(finish)}
              className={`text-xs px-3 py-1.5 border transition-all duration-300 ${
                selectedFinishes.includes(finish)
                  ? 'border-copper bg-copper/10 text-copper'
                  : 'border-ink/15 text-ink/60 hover:border-ink/30'
              }`}
            >
              {finish}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="eyebrow mb-4">Price Range</p>
        <ul className="space-y-2">
          {[
            { value: 'all' as const, label: 'All Prices' },
            { value: 'under-300' as const, label: 'Under R 300' },
            { value: '300-600' as const, label: 'R 300 – R 600' },
            { value: 'over-600' as const, label: 'Over R 600' },
          ].map((opt) => (
            <li key={opt.value}>
              <button
                onClick={() => setPriceRange(opt.value)}
                className={`text-sm transition-colors ${
                  priceRange === opt.value ? 'text-copper font-medium' : 'text-ink/60 hover:text-copper'
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {hasActiveFilters && (
        <button onClick={clearFilters} className="btn-ghost w-full justify-center !text-[0.65rem]">
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <PageHero
        eyebrow="The Collection"
        title={
          <>
            The Material
            <br />
            <span className="font-serif italic font-light text-champagne normal-case tracking-normal">Collection.</span>
          </>
        }
        description="Explore premium decking, cladding and outdoor architectural products."
        image={heroImg}
      />

      <section className="bg-porcelain py-16 md:py-24">
        <div className="container-lux">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4 border-b border-ink/10 pb-6">
            <p className="text-sm text-ink/60">
              Showing <span className="text-ink font-medium">{filtered.length}</span> of {products.length} products
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 text-[0.7rem] uppercase tracking-wider-2 text-ink/70"
              >
                <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} /> Filters
              </button>
              <div className="flex items-center gap-3">
                <label className="text-[0.65rem] uppercase tracking-wider-2 text-ink/50">Sort</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="border border-ink/15 bg-white px-3 py-2 text-sm focus:border-copper focus:outline-none transition-colors"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[260px_1fr] gap-12">
            {/* Desktop filters */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <FilterContent />
              </div>
            </aside>

            {/* Products grid */}
            <div>
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                  <p className="font-serif text-3xl text-ink/60 mb-4">No products found</p>
                  <p className="text-sm text-ink/50 mb-8">Try adjusting your filters or search terms.</p>
                  <button onClick={clearFilters} className="btn-primary">
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                  {filtered.map((product, i) => (
                    <Reveal key={product.id} delay={`reveal-delay-${(i % 3) + 1}` as never}>
                      <ProductCard product={product} onQuickView={setQuickViewProduct} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-obsidian/60 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-porcelain p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[0.7rem] uppercase tracking-wider-2 font-medium">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="text-ink/60 hover:text-copper">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  );
}
