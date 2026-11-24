import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ArrowRight, Check } from 'lucide-react';
import type { Product } from '@/data/products';
import { useCart, formatPrice } from '@/context/CartContext';
import { SmartImage } from '@/components/SmartImage';

export function QuickView({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { add } = useCart();
  const [finish, setFinish] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setFinish(product.finishes[0]?.name ?? '');
      setQuantity(1);
      setAdded(false);
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    add(product.slug, finish, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm fade-in" onClick={onClose} />
      <div className="relative bg-porcelain w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center bg-porcelain/80 backdrop-blur text-ink/60 hover:text-copper transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto bg-sage/20">
            <SmartImage src={product.image} alt={product.name} className="h-full w-full" />
          </div>

          {/* Details */}
          <div className="p-8 md:p-10 flex flex-col">
            <p className="text-[0.6rem] uppercase tracking-wider-2 text-copper mb-3">{product.category}</p>
            <h2 className="heading-serif text-3xl md:text-4xl text-ink mb-4">{product.name}</h2>
            <p className="text-sm text-ink/70 leading-relaxed mb-6">{product.shortDescription}</p>

            <p className="price-display mb-6 text-3xl text-ink">{formatPrice(product.price)}</p>

            {/* Finishes */}
            <div className="mb-6">
              <p className="text-[0.6rem] uppercase tracking-wider-2 text-ink/50 mb-3">Finish</p>
              <div className="flex items-center gap-2">
                {product.finishes.map((f) => (
                  <button
                    key={f.name}
                    onClick={() => setFinish(f.name)}
                    className={`flex items-center gap-2 border px-3 py-2 transition-all duration-300 ${
                      finish === f.name ? 'border-copper bg-copper/5' : 'border-ink/15'
                    }`}
                  >
                    <span className="h-4 w-4 rounded-full border border-ink/10" style={{ backgroundColor: f.hex }} />
                    <span className="text-xs">{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-[0.6rem] uppercase tracking-wider-2 text-ink/50 mb-3">Quantity</p>
              <div className="flex items-center border border-ink/15 w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-ink/60 hover:text-copper transition-colors"
                  aria-label="Decrease"
                >
                  <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
                <span className="px-5 text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-ink/60 hover:text-copper transition-colors"
                  aria-label="Increase"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mt-auto">
              {product.price === null ? <Link to="/contact" onClick={onClose} className="btn-primary w-full justify-center">Request a Price</Link> : <button onClick={handleAdd} className="btn-primary w-full">
                {added ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={2} /> Added to Cart
                  </>
                ) : (
                  <>Add to Cart</>
                )}
              </button>}
              <Link to={`/product/${product.slug}`} onClick={onClose} className="btn-ghost w-full justify-center">
                View Full Product <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
