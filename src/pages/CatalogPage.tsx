import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function CatalogPage() {
  const { category } = useParams();
  const visible = category ? products.filter((product) => product.category === category) : products;
  return <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Monarch</p><h1 className="mt-2 text-4xl font-semibold">{category ?? 'Catálogo'}</h1><div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div></main>;
}
