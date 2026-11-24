import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { getProduct } from '@/data/products';

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  finish: string;
  quantity: number;
  price: number | null;
  image: string;
};

type CartContextType = {
  lines: CartLine[];
  add: (slug: string, finish: string, quantity?: number) => void;
  remove: (slug: string, finish: string) => void;
  updateQuantity: (slug: string, finish: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  lastAdded: number;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = 'reno-decks-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartLine[];
        setLines(parsed.filter((line) => getProduct(line.slug)?.price !== null && getProduct(line.slug)?.price !== undefined));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore
    }
  }, [lines]);

  const add = useCallback((slug: string, finish: string, quantity = 1) => {
    const product = getProduct(slug);
    if (!product || product.price === null) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug && l.finish === finish);
      if (existing) {
        return prev.map((l) =>
          l.slug === slug && l.finish === finish ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          finish,
          quantity,
          price: product.price,
          image: product.image,
        },
      ];
    });
    setLastAdded(Date.now());
  }, []);

  const remove = useCallback((slug: string, finish: string) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.finish === finish)));
  }, []);

  const updateQuantity = useCallback((slug: string, finish: string, quantity: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.slug === slug && l.finish === finish ? { ...l, quantity: Math.max(1, quantity) } : l))
        .filter((l) => l.quantity > 0)
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const count = lines.reduce((sum, l) => sum + l.quantity, 0);
  const subtotal = lines.reduce((sum, l) => sum + (l.price ?? 0) * l.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        lines,
        add,
        remove,
        updateQuantity,
        clear,
        count,
        subtotal,
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        lastAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function formatPrice(price: number | null): string {
  if (price === null) return 'Price on Request';
  return `R ${price.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
