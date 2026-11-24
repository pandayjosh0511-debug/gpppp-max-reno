import { useEffect, useRef, useState, type ReactNode } from 'react';

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export function Reveal({
  children,
  className = '',
  delay = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: '' | 'reveal-delay-1' | 'reveal-delay-2' | 'reveal-delay-3' | 'reveal-delay-4';
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Tag ref={ref as never} className={`reveal ${delay} ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </Tag>
  );
}
