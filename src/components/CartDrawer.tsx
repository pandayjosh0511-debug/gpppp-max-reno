import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart, formatPrice } from '@/context/CartContext';

export function CartDrawer() {
  const { lines, isOpen, close, remove, updateQuantity, count, subtotal } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[70] bg-obsidian/60 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={close}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[71] w-full max-w-md bg-porcelain shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-ink/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-copper" strokeWidth={1.5} />
            <h2 className="text-[0.7rem] uppercase tracking-wider-2 font-medium">
              Your Cart ({count})
            </h2>
          </div>
          <button onClick={close} className="text-ink/60 hover:text-copper transition-colors" aria-label="Close cart">
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="mb-6 h-20 w-20 border border-copper/30 flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-copper/40" strokeWidth={1} />
              </div>
              <p className="font-serif text-2xl text-ink/70 mb-2">Your cart is empty</p>
              <p className="text-sm text-ink/50 mb-8">Explore the collection to begin.</p>
              <Link to="/shop" onClick={close} className="btn-primary">
                Explore the Shop <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {lines.map((line) => (
                <li key={`${line.slug}-${line.finish}`} className="flex gap-4">
                  <Link to={`/product/${line.slug}`} onClick={close} className="shrink-0">
                    <div className="h-24 w-24 overflow-hidden bg-sage/20 border border-ink/10">
                      <img src={line.image} alt={line.name} className="h-full w-full object-cover" />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${line.slug}`}
                      onClick={close}
                      className="text-sm font-medium text-ink hover:text-copper transition-colors line-clamp-2"
                    >
                      {line.name}
                    </Link>
                    <p className="text-[0.65rem] uppercase tracking-wider-2 text-ink/50 mt-1">
                      Finish: {line.finish}
                    </p>
                    <p className="price-display mt-1 text-sm text-copper">{formatPrice(line.price)}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-ink/15">
                        <button
                          onClick={() => updateQuantity(line.slug, line.finish, line.quantity - 1)}
                          className="px-2 py-1 text-ink/60 hover:text-copper transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" strokeWidth={2} />
                        </button>
                        <span className="px-3 text-sm">{line.quantity}</span>
                        <button
                          onClick={() => updateQuantity(line.slug, line.finish, line.quantity + 1)}
                          className="px-2 py-1 text-ink/60 hover:text-copper transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" strokeWidth={2} />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(line.slug, line.finish)}
                        className="text-ink/40 hover:text-copper transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="border-t border-ink/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[0.7rem] uppercase tracking-wider-2 text-ink/60">
                Priced Subtotal
              </span>
              <span className="price-display text-2xl text-ink">
                {subtotal > 0 ? formatPrice(subtotal) : '—'}
              </span>
            </div>
            <p className="text-[0.65rem] text-ink/40">
              Items without demo prices are quoted on request.
            </p>
            <div className="flex gap-3">
              <Link to="/shop" onClick={close} className="btn-outline !border-ink/20 text-ink/70 flex-1 !text-[0.65rem]">
                Continue
              </Link>
              <Link to="/cart" onClick={close} className="btn-primary flex-1 !text-[0.65rem]">
                View Cart <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
