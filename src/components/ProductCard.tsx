import { ArrowUpRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../types/product';
import { useFavorites } from '../contexts/FavoritesContext';
import { media } from '../data/media';
import { formatBRL } from '../utils/currency';

const productImages: Record<string, string> = {
  'camisa-oxford-monarch': media.products.camisaOxford,
  'camiseta-essential-heavy': media.products.camisetaEssential,
};

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0] ?? productImages[product.slug];
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  return (
    <article className="group min-w-0">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#1d1d1d]">
        {image ? <img src={image} alt={product.name} className="h-full w-full object-cover grayscale-[12%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0" /> : <div className="h-full w-full bg-[#222]" aria-label={`Imagem de ${product.name}`} />}
        <button type="button" aria-pressed={favorite} aria-label={favorite ? `Remover ${product.name} dos favoritos` : `Adicionar ${product.name} aos favoritos`} onClick={() => toggleFavorite(product.id)} className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition ${favorite ? 'bg-[#c2ae8b] text-black' : 'bg-black/30 text-white hover:bg-white hover:text-black'}`}><Heart size={15} fill={favorite ? 'currentColor' : 'none'} strokeWidth={1.5} /></button>
        <Link to={`/produto/${product.slug}`} className="absolute bottom-3 right-3 grid h-10 w-10 translate-y-3 place-items-center bg-white text-black opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100" aria-label={`Ver ${product.name}`}><ArrowUpRight size={17} /></Link>
      </div>
      <div className="pt-4"><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-500">{product.category.replace('-', ' ')}</p><h3 className="mt-2 text-sm font-medium text-white sm:text-[15px]">{product.name}</h3><div className="mt-2 flex items-center gap-2 text-sm">{product.compareAtPrice && <span className="text-neutral-600 line-through">{formatBRL(product.compareAtPrice)}</span>}<span className="text-neutral-300">{formatBRL(product.price)}</span></div></div>
    </article>
  );
}
