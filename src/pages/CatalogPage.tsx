import { Search } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function CatalogPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('busca')?.trim().toLowerCase() ?? '';
  const visible = products.filter((product) => {
    const matchesCategory = !category || product.category === category;
    const matchesSearch = !search || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });
  const title = search ? `Busca: ${searchParams.get('busca')}` : category ?? 'Catálogo';
  return <main className="mx-auto max-w-7xl px-5 py-16 sm:px-10 lg:px-16"><p className="eyebrow">Monarch / Seleção</p><div className="flex flex-wrap items-end justify-between gap-4"><h1 className="section-title mt-3 capitalize">{title}</h1><span className="text-xs uppercase tracking-[0.16em] text-neutral-500">{visible.length} {visible.length === 1 ? 'peça' : 'peças'}</span></div>{visible.length > 0 ? <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="mt-16 border-y border-white/10 py-16 text-center"><Search className="mx-auto text-neutral-600" size={24} /><p className="mt-5 text-sm text-neutral-400">Nenhum produto encontrado para esta busca.</p><Link to="/catalogo" className="button-secondary mt-7">Ver catálogo completo</Link></div>}</main>;
}
