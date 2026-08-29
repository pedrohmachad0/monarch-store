import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useFavorites } from '../contexts/FavoritesContext';
import { products } from '../data/products';

export function FavoritesPage() {
  const { favoriteIds } = useFavorites();
  const favoriteProducts = products.filter((product) => favoriteIds.includes(product.id));

  return <main className="mx-auto max-w-7xl px-5 py-16 sm:px-10 lg:px-16"><p className="eyebrow">Monarch / Sua seleção</p><h1 className="section-title mt-3">Favoritos</h1>{favoriteProducts.length > 0 ? <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">{favoriteProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="mt-16 border-y border-white/10 py-16 text-center"><Heart className="mx-auto text-neutral-600" size={24} /><p className="mt-5 text-sm text-neutral-400">Sua seleção está vazia.</p><Link to="/catalogo" className="button-primary mt-7">Explorar catálogo</Link></div>}</main>;
}
