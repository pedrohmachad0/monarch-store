import { Link } from 'react-router-dom';
import type { Product } from '../types/product';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
      <div className="aspect-[4/5] bg-neutral-800" aria-label={`Imagem de ${product.name}`} />
      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-neutral-500">{product.category}</p>
        <h3 className="mt-2 font-medium text-white">{product.name}</h3>
        <p className="mt-2 text-sm text-neutral-300">R$ {product.price.toFixed(2).replace('.', ',')}</p>
        <Link to={`/produto/${product.slug}`} className="mt-4 inline-block text-sm font-medium text-white underline-offset-4 hover:underline">Ver produto</Link>
      </div>
    </article>
  );
}
