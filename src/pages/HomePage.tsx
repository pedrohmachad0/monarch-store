import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function HomePage() {
  return <main>
    <section className="mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">Monarch Store</p><h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-7xl">Elegância que fala por você.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-400">Moda masculina com peças old money, streetwear e essenciais selecionados.</p><Link to="/catalogo" className="mt-8 inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-black hover:bg-neutral-200">Explorar coleção</Link></div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="flex items-end justify-between"><div><p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Seleção</p><h2 className="mt-2 text-3xl font-semibold">Destaques</h2></div><Link to="/catalogo" className="text-sm text-neutral-400 hover:text-white">Ver tudo</Link></div><div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">{products.filter((p) => p.featured).map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
  </main>;
}
