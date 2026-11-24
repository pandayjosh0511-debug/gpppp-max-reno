import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Plus, Minus, Check, ArrowRight, ArrowLeft, Eye, Maximize2 } from 'lucide-react';
import { getProduct, getRelatedProducts } from '@/data/products';
import { useCart, formatPrice } from '@/context/CartContext';
import { ProductCardMinimal } from '@/components/ProductCard';
import { Lightbox } from '@/components/Lightbox';
import { Reveal } from '@/components/Reveal';
import { SmartImage } from '@/components/SmartImage';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProduct(slug) : undefined;
  const related = slug ? getRelatedProducts(slug, 4) : [];
  const { add } = useCart();

  const [finish, setFinish] = useState(product?.finishes[0]?.name ?? '');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-porcelain">
        <div className="text-center">
          <p className="font-serif text-4xl text-ink/60 mb-4">Product not found</p>
          <Link to="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    add(product.slug, finish, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-obsidian pt-32 pb-6">
        <div className="container-lux">
          <Link to="/shop" className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-wider-2 text-porcelain/60 hover:text-champagne transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> Back to Shop
          </Link>
        </div>
      </div>

      {/* Product main */}
      <section className="bg-obsidian pb-24">
        <div className="container-lux grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Gallery */}
          <div>
            <div
              className="relative aspect-square overflow-hidden cursor-pointer group bg-sage/20"
              onClick={() => setLightboxOpen(true)}
            >
              <SmartImage src={product.gallery[activeImage]} alt={product.name} className="h-full w-full" imgClassName="img-zoom" />
              <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center bg-obsidian/60 backdrop-blur text-porcelain/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Maximize2 className="h-4 w-4" strokeWidth={1.5} />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-20 w-20 overflow-hidden border transition-all duration-300 ${
                    activeImage === i ? 'border-copper ring-1 ring-copper' : 'border-champagne/20'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="text-porcelain">
            <p className="eyebrow text-champagne mb-4">{product.category}</p>
            <h1 className="heading-serif text-4xl md:text-5xl text-porcelain mb-6">{product.name}</h1>
            <p className="text-base text-porcelain/70 leading-relaxed mb-8">{product.description}</p>

            <p className="price-display mb-8 text-3xl text-champagne md:text-4xl">{formatPrice(product.price)}</p>

            {/* Finishes */}
            <div className="mb-8">
              <p className="text-[0.6rem] uppercase tracking-wider-2 text-porcelain/50 mb-3">
                Finish — {finish}
              </p>
              <div className="flex flex-wrap gap-3">
                {product.finishes.map((f) => (
                  <button
                    key={f.name}
                    onClick={() => setFinish(f.name)}
                    className={`flex items-center gap-2 border px-4 py-2.5 transition-all duration-300 ${
                      finish === f.name ? 'border-copper bg-copper/10' : 'border-porcelain/20'
                    }`}
                  >
                    <span className="h-4 w-4 rounded-full border border-porcelain/20" style={{ backgroundColor: f.hex }} />
                    <span className="text-xs">{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-[0.6rem] uppercase tracking-wider-2 text-porcelain/50 mb-3">Quantity</p>
              <div className="flex items-center border border-porcelain/20 w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-porcelain/60 hover:text-champagne transition-colors"
                  aria-label="Decrease"
                >
                  <Minus className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <span className="px-6 text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-3 text-porcelain/60 hover:text-champagne transition-colors"
                  aria-label="Increase"
                >
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              {product.price === null ? <Link to="/contact" className="btn-primary flex-1 justify-center">Request a Price</Link> : <button onClick={handleAdd} className="btn-primary flex-1">
                {added ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={2} /> Added to Cart
                  </>
                ) : (
                  <>Add to Cart</>
                )}
              </button>}
              <Link to="/contact" className="btn-outline !border-champagne/40 text-champagne hover:!bg-champagne hover:!text-ink flex-1 justify-center">
                Request Quote
              </Link>
            </div>

            {/* Overview */}
            <div className="border-t border-porcelain/10 pt-8">
              <h2 className="text-[0.7rem] uppercase tracking-wider-2 font-medium mb-4">Product Overview</h2>
              <p className="text-sm text-porcelain/70 leading-relaxed mb-6">{product.overview}</p>

              <h3 className="text-[0.6rem] uppercase tracking-wider-2 text-champagne mb-3">Key Features</h3>
              <ul className="space-y-2 mb-6">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-porcelain/70">
                    <Check className="h-3.5 w-3.5 text-copper shrink-0" strokeWidth={2} />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technical details */}
      <section className="bg-porcelain py-20 md:py-24">
        <div className="container-lux">
          <Reveal>
            <p className="eyebrow mb-4">Illustrative Details</p>
            <h2 className="heading-arch text-3xl md:text-4xl text-ink mb-12">Technical Specifications</h2>
          </Reveal>
          <Reveal delay="reveal-delay-1">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-ink/10">
              {product.details.map((detail) => (
                <div key={detail.label} className="border-b border-ink/10 py-6 px-4 first:pl-0">
                  <p className="text-[0.6rem] uppercase tracking-wider-2 text-copper mb-2">{detail.label}</p>
                  <p className="text-sm text-ink">{detail.value}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-ink/50 mt-6">Collection references only. Confirm exact technical specifications, stock, prices and image rights with Max before publication.</p>
          </Reveal>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-limestone py-20 md:py-24">
          <div className="container-lux">
            <Reveal className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <h2 className="heading-arch text-3xl md:text-4xl text-ink">Related Products</h2>
              <Link to="/shop" className="btn-ghost">
                All Products <ArrowRight className="h-4 w-4 arrow-anim" strokeWidth={1.5} />
              </Link>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={`reveal-delay-${i + 1}` as never}>
                  <ProductCardMinimal product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {lightboxOpen && (
        <Lightbox
          images={product.gallery}
          index={activeImage}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setActiveImage}
        />
      )}
    </>
  );
}
