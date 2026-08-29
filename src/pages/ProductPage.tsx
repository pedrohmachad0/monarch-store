import { ArrowLeft, Check, ChevronRight, Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { media } from '../data/media';
import { products } from '../data/products';
import type { Product } from '../types/product';
import { formatBRL } from '../utils/currency';

const productImages: Record<string, string> = {
  'camisa-oxford-monarch': media.products.camisaOxford,
  'camiseta-essential-heavy': media.products.camisetaEssential,
};

function ProductGallery({ product }: { product: Product }) {
  const image = product.images[0] ?? productImages[product.slug];
  return <div className="grid gap-3 sm:grid-cols-[96px_1fr] sm:gap-4"><div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:flex-col">{image && <button type="button" aria-label={`Visualizar imagem de ${product.name}`} className="h-24 w-20 shrink-0 overflow-hidden border border-[#c2ae8b] bg-[#1d1d1d] sm:h-28 sm:w-full"><img src={image} alt="" className="h-full w-full object-cover" /></button>}</div><div className="order-1 aspect-[4/5] overflow-hidden bg-[#1d1d1d] sm:order-2 sm:aspect-[4/5]"><img src={image} alt={product.name} className="h-full w-full object-cover" /></div></div>;
}

function QuantityControl({ quantity, stock, onChange }: { quantity: number; stock: number; onChange: (quantity: number) => void }) {
  return <div className="flex h-12 w-fit items-center border border-white/15"><button type="button" aria-label="Diminuir quantidade" disabled={quantity <= 1} onClick={() => onChange(Math.max(1, quantity - 1))} className="grid h-full w-12 place-items-center text-neutral-400 transition hover:text-white disabled:opacity-30"><Minus size={15} /></button><span aria-live="polite" className="w-8 text-center text-sm text-white">{quantity}</span><button type="button" aria-label="Aumentar quantidade" disabled={quantity >= stock} onClick={() => onChange(Math.min(stock, quantity + 1))} className="grid h-full w-12 place-items-center text-neutral-400 transition hover:text-white disabled:opacity-30"><Plus size={15} /></button></div>;
}

function ProductInfo({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? '');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const favorite = isFavorite(product.id);

  function handleAddToCart() {
    addItem(product, selectedSize || undefined, selectedColor || undefined, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2400);
  }

  return <div className="flex flex-col justify-center lg:pl-10"><p className="eyebrow">{product.category.replace('-', ' ')} / Monarch</p><h1 className="mt-4 text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-6xl">{product.name}</h1><div className="mt-6 flex items-center gap-3"><span className="text-xl text-white">{formatBRL(product.price)}</span>{product.compareAtPrice && <span className="text-sm text-neutral-600 line-through">{formatBRL(product.compareAtPrice)}</span>}</div><p className="mt-7 max-w-lg text-sm leading-7 text-neutral-400">{product.description}</p><div className="mt-9 space-y-7 border-y border-white/10 py-7">{product.sizes.length > 0 && <fieldset><legend className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">Tamanho <span className="text-white">{selectedSize}</span></legend><div className="flex flex-wrap gap-2">{product.sizes.map((size) => <button type="button" key={size} aria-pressed={selectedSize === size} onClick={() => setSelectedSize(size)} className={`grid h-11 min-w-11 place-items-center border px-3 text-xs transition ${selectedSize === size ? 'border-[#c2ae8b] bg-[#c2ae8b] text-black' : 'border-white/15 text-neutral-300 hover:border-white'}`}>{size}</button>)}</div></fieldset>}{product.colors.length > 0 && <fieldset><legend className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">Cor <span className="text-white">{selectedColor}</span></legend><div className="flex flex-wrap gap-2">{product.colors.map((color) => <button type="button" key={color} aria-pressed={selectedColor === color} onClick={() => setSelectedColor(color)} className={`border px-4 py-3 text-xs transition ${selectedColor === color ? 'border-[#c2ae8b] text-[#c2ae8b]' : 'border-white/15 text-neutral-300 hover:border-white'}`}>{color}</button>)}</div></fieldset>}<div><p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">Quantidade</p><QuantityControl quantity={quantity} stock={product.stock} onChange={setQuantity} /></div></div><div className="flex flex-col gap-3 sm:flex-row"><button type="button" onClick={handleAddToCart} className="button-primary flex-1">{added ? <><Check size={16} /> Adicionado</> : <><ShoppingBag size={16} /> Adicionar ao carrinho</>}</button><button type="button" aria-pressed={favorite} onClick={() => toggleFavorite(product.id)} className={`grid h-12 w-12 place-items-center border transition ${favorite ? 'border-[#c2ae8b] bg-[#c2ae8b] text-black' : 'border-white/20 text-white hover:border-white'}`} aria-label={favorite ? 'Remover produto dos favoritos' : 'Adicionar produto aos favoritos'}><Heart size={18} fill={favorite ? 'currentColor' : 'none'} /></button></div><p className="mt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-600">{product.stock > 0 ? `${product.stock} unidades disponíveis` : 'Indisponível'}</p></div>;
}

function RelatedProducts({ product }: { product: Product }) {
  const related = products.filter((item) => item.id !== product.id && item.category === product.category);
  if (related.length === 0) return null;
  return <section className="mt-24 border-t border-white/10 pt-16"><div className="flex items-end justify-between"><div><p className="eyebrow">Complete seu uniforme</p><h2 className="section-title mt-3 text-4xl">Você também pode gostar</h2></div><Link to="/catalogo" className="hidden items-center gap-2 text-xs uppercase tracking-[0.16em] text-neutral-400 hover:text-white sm:flex">Ver catálogo <ChevronRight size={15} /></Link></div><div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>;
}

export function ProductPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  if (!product) return <main className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-start justify-center px-5 py-20 sm:px-10 lg:px-16"><p className="eyebrow">Monarch / 404</p><h1 className="section-title mt-4">Produto não encontrado</h1><p className="mt-5 text-sm text-neutral-500">A peça que você procura não está disponível ou foi movida.</p><Link className="button-primary mt-8" to="/catalogo"><ArrowLeft size={16} /> Voltar ao catálogo</Link></main>;
  return <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-10 lg:px-16 lg:py-12"><nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-neutral-600"><Link to="/" className="transition hover:text-white">Home</Link><ChevronRight size={12} /><Link to="/catalogo" className="transition hover:text-white">Catálogo</Link><ChevronRight size={12} /><span className="max-w-[180px] truncate text-neutral-400">{product.name}</span></nav><section className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16"><ProductGallery product={product} /><ProductInfo product={product} /></section><RelatedProducts product={product} /></main>;
}
