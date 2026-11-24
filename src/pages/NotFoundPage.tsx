import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="min-h-[70vh] bg-obsidian px-6 pt-40 pb-24 text-center text-porcelain">
      <p className="eyebrow text-champagne mb-6">Page not found</p>
      <h1 className="heading-arch text-5xl md:text-7xl mb-6">This page doesn't exist.</h1>
      <p className="mx-auto max-w-lg text-porcelain/70 mb-10">The link may have changed. Explore the collection or return to the homepage.</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link className="btn-primary" to="/">Return Home</Link>
        <Link className="btn-outline text-porcelain" to="/shop">Explore Products</Link>
      </div>
    </section>
  );
}
