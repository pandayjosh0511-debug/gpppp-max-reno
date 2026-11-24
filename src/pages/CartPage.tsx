import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ArrowRight, ArrowLeft, X, Info } from 'lucide-react';
import { useCart, formatPrice } from '@/context/CartContext';

export function CartPage() {
  const { lines, remove, updateQuantity, clear, subtotal, count } = useCart();
  const [quoteOpen, setQuoteOpen] = useState(false);

  if (lines.length === 0) {
    return (
      <div className="min-h-screen bg-porcelain flex items-center justify-center pt-32 pb-32">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-8 h-24 w-24 border border-copper/30 flex items-center justify-center">
            <ArrowRight className="h-10 w-10 text-copper/40 rotate-45" strokeWidth={1} />
          </div>
          <p className="font-serif text-4xl text-ink/70 mb-4">Your cart is empty</p>
          <p className="text-sm text-ink/50 mb-10">
            Explore the collection and add materials to begin your project.
          </p>
          <Link to="/shop" className="btn-primary">
            Explore the Shop <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-porcelain pt-32 md:pt-40 pb-24">
        <div className="container-lux">
          <Link to="/shop" className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-wider-2 text-ink/60 hover:text-copper transition-colors mb-8">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> Continue Shopping
          </Link>

          <p className="eyebrow mb-4">Your Selection</p>
          <h1 className="heading-arch text-4xl md:text-5xl text-ink mb-12">
            Cart <span className="text-copper">({count})</span>
          </h1>

          <div className="grid lg:grid-cols-[1fr_360px] gap-12">
            {/* Items */}
            <div>
              <div className="border-t border-ink/10">
                {lines.map((line) => (
                  <div
                    key={`${line.slug}-${line.finish}`}
                    className="flex gap-6 py-6 border-b border-ink/10"
                  >
                    <Link to={`/product/${line.slug}`} className="shrink-0">
                      <div className="h-28 w-28 md:h-32 md:w-32 overflow-hidden bg-sage/20 border border-ink/10">
                        <img src={line.image} alt={line.name} className="h-full w-full object-cover" />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link
                            to={`/product/${line.slug}`}
                            className="text-sm md:text-base font-medium text-ink hover:text-copper transition-colors"
                          >
                            {line.name}
                          </Link>
                          <p className="text-[0.65rem] uppercase tracking-wider-2 text-ink/50 mt-1">
                            Finish: {line.finish}
                          </p>
                        </div>
                        <button
                          onClick={() => remove(line.slug, line.finish)}
                          className="text-ink/40 hover:text-copper transition-colors shrink-0"
                          aria-label="Remove"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>
                      <div className="flex items-end justify-between mt-auto pt-4">
                        <div className="flex items-center border border-ink/15">
                          <button
                            onClick={() => updateQuantity(line.slug, line.finish, line.quantity - 1)}
                            className="px-3 py-2 text-ink/60 hover:text-copper transition-colors"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                          </button>
                          <span className="px-4 text-sm">{line.quantity}</span>
                          <button
                            onClick={() => updateQuantity(line.slug, line.finish, line.quantity + 1)}
                            className="px-3 py-2 text-ink/60 hover:text-copper transition-colors"
                            aria-label="Increase"
                          >
                            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                          </button>
                        </div>
                        <span className="price-display text-xl text-ink">
                          {line.price !== null ? formatPrice(line.price * line.quantity) : 'Price on Request'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={clear}
                className="mt-6 text-[0.65rem] uppercase tracking-wider-2 text-ink/40 hover:text-copper transition-colors"
              >
                Clear Cart
              </button>
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-28 h-fit">
              <div className="bg-limestone p-8 border border-ink/10">
                <h2 className="text-[0.7rem] uppercase tracking-wider-2 font-medium mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-ink/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/60">Items</span>
                    <span className="text-ink">{count}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/60">Priced Subtotal</span>
                    <span className="text-ink font-medium">
                      {subtotal > 0 ? formatPrice(subtotal) : '—'}
                    </span>
                  </div>
                  {lines.some((l) => l.price === null) && (
                    <p className="text-xs text-copper/80 pt-2">
                      Some items are priced on request and excluded from the subtotal.
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center mb-8">
                  <span className="text-[0.7rem] uppercase tracking-wider-2 text-ink/60">Estimated Total</span>
                  <span className="price-display text-3xl text-ink">
                    {subtotal > 0 ? formatPrice(subtotal) : 'On Request'}
                  </span>
                </div>

                <button onClick={() => setQuoteOpen(true)} className="btn-primary w-full mb-3">
                  Request Quote <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <Link to="/shop" className="btn-outline !border-ink/20 text-ink/70 w-full justify-center !text-[0.65rem]">
                  Continue Shopping
                </Link>

                <p className="text-[0.6rem] text-ink/40 mt-6 leading-relaxed">
                  Demonstration only — no orders, quotations or payments are processed on this preview website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote modal */}
      {quoteOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm fade-in" onClick={() => setQuoteOpen(false)} />
          <div className="relative bg-porcelain w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl fade-in">
            <button
              onClick={() => setQuoteOpen(false)}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center text-ink/60 hover:text-copper transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <div className="p-8 md:p-10">
              <p className="eyebrow mb-4">Quotation Summary</p>
              <h2 className="heading-serif text-3xl text-ink mb-6">Your Request</h2>

              <div className="border-t border-ink/10 mb-6">
                {lines.map((line) => (
                  <div
                    key={`${line.slug}-${line.finish}`}
                    className="flex items-center justify-between py-4 border-b border-ink/10 gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="h-14 w-14 shrink-0 overflow-hidden bg-sage/20 border border-ink/10">
                        <img src={line.image} alt={line.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ink truncate">{line.name}</p>
                        <p className="text-[0.6rem] uppercase tracking-wider-2 text-ink/50">
                          {line.finish} — Qty {line.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-ink shrink-0">
                      {line.price !== null ? formatPrice(line.price * line.quantity) : 'On Request'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-[0.7rem] uppercase tracking-wider-2 text-ink/60">Priced Subtotal</span>
                <span className="price-display text-2xl text-ink">
                  {subtotal > 0 ? formatPrice(subtotal) : 'On Request'}
                </span>
              </div>

              <div className="flex items-start gap-3 bg-copper/5 border border-copper/20 p-4 mb-6">
                <Info className="h-5 w-5 text-copper shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-xs text-ink/70 leading-relaxed">
                  <strong className="text-ink">Demonstration Only</strong> — Quotations, orders and payments are not
                  enabled on this preview website. No information has been submitted or stored.
                </p>
              </div>

              <div className="flex gap-3">
                <Link to="/shop" onClick={() => setQuoteOpen(false)} className="btn-outline !border-ink/20 text-ink/70 flex-1 justify-center !text-[0.65rem]">
                  Continue Shopping
                </Link>
                <button onClick={() => setQuoteOpen(false)} className="btn-primary flex-1 !text-[0.65rem]">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
