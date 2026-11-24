import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Plus, ArrowRight } from 'lucide-react';
import type { Product } from '@/data/products';
import { useCart, formatPrice } from '@/context/CartContext';
import { SmartImage } from '@/components/SmartImage';

export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView: (product: Product) => void;
}) {
  const { add } = useCart();
  const [selectedFinish, setSelectedFinish] = useState(product.finishes[0]?.name ?? '');

  return (
    <div className="group card-lux !bg-sage !border-emerald/40 edge-light flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-sage/20">
        <Link to={`/product/${product.slug}`}>
          <SmartImage
            src={product.image}
            alt={product.name}
            className="h-full w-full"
            imgClassName="img-zoom object-contain p-6"
          />
        </Link>
        {/* Quick view button */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-obsidian/85 backdrop-blur-sm py-3 text-[0.65rem] uppercase tracking-wider-2 text-porcelain translate-y-0 md:translate-y-full transition-transform duration-500 group-hover:translate-y-0 focus-visible:translate-y-0 hover:bg-copper"
        >
          <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
          Quick View
        </button>
        {/* Featured badge */}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-copper/90 px-3 py-1 text-[0.55rem] uppercase tracking-wider-2 text-porcelain">
            Featured
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[0.6rem] uppercase tracking-wider-2 text-copper mb-2">{product.category}</p>
        <Link
          to={`/product/${product.slug}`}
          className="text-sm font-medium text-porcelain hover:text-champagne transition-colors leading-snug mb-3"
        >
          {product.name}
        </Link>

        {/* Finishes */}
        <div className="flex items-center gap-1.5 mb-4">
          {product.finishes.map((f) => (
            <button
              key={f.name}
              onClick={() => setSelectedFinish(f.name)}
              className={`h-4 w-4 rounded-full border transition-all duration-300 ${
                selectedFinish === f.name ? 'border-copper ring-1 ring-copper ring-offset-1' : 'border-ink/20'
              }`}
              style={{ backgroundColor: f.hex }}
              title={f.name}
              aria-label={f.name}
            />
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="price-display text-[1.35rem] md:text-2xl text-porcelain">{formatPrice(product.price)}</span>
          {product.price === null ? <Link to="/contact" className="border border-emerald/60 px-3 py-2 text-[0.65rem] uppercase tracking-wider text-porcelain hover:bg-copper">Enquire</Link> : <button
            onClick={() => add(product.slug, selectedFinish, 1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-emerald/60 text-porcelain/70 transition-all duration-300 hover:bg-copper hover:border-copper hover:text-porcelain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
            aria-label="Add to cart"
          >
            <Plus className="h-4 w-4" strokeWidth={1.5} />
          </button>}
        </div>
      </div>
    </div>
  );
}

export function ProductCardMinimal({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-sage/20 mb-4 edge-light">
        <SmartImage src={product.image} alt={product.name} className="h-full w-full" imgClassName="img-zoom object-contain p-6" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <p className="text-[0.6rem] uppercase tracking-wider-2 text-copper mb-1">{product.category}</p>
      <h3 className="text-sm font-medium text-ink group-hover:text-copper transition-colors leading-snug">
        {product.name}
      </h3>
      <p className="price-display mt-1 text-[1.35rem] md:text-2xl text-ink">{formatPrice(product.price)}</p>
      <span className="inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-wider-2 text-copper mt-3">
        View Product <ArrowRight className="h-3 w-3 arrow-anim" strokeWidth={1.5} />
      </span>
    </Link>
  );
}
