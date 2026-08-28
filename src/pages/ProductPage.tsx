import { Link, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';

export function ProductPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const { addItem } = useCart();
  if (!product) return <main className="mx-auto max-w-4xl px-4 py-20"><h1 className="text-3xl font-semibold">Produto não encontrado</h1><Link className="mt-6 inline-block underline" to="/catalogo">Voltar ao catálogo</Link></main>;
  return <main className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-2 lg:px-8"><div className="aspect-square rounded-2xl bg-neutral-800" /><div className="flex flex-col justify-center"><p className="text-xs uppercase tracking-[0.25em] text-neutral-500">{product.category}</p><h1 className="mt-3 text-4xl font-semibold">{product.name}</h1><p className="mt-4 text-2xl">R$ {product.price.toFixed(2).replace('.', ',')}</p><p className="mt-6 leading-7 text-neutral-400">{product.description}</p><button onClick={() => addItem(product, product.sizes[0], product.colors[0])} className="mt-8 rounded-full bg-white px-6 py-3 font-semibold text-black hover:bg-neutral-200">Adicionar ao carrinho</button></div></main>;
}
