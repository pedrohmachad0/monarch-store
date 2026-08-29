import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';

export function Header() {
  const { itemCount } = useCart();
  const { favoriteIds } = useFavorites();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const links = [
    { label: 'Catálogo', to: '/catalogo' },
    { label: 'Old Money', to: '/categoria/old-money' },
    { label: 'Streetwear', to: '/categoria/streetwear' },
    { label: 'Essentials', to: '/categoria/essentials' },
  ];

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = search.trim();
    navigate(term ? `/catalogo?busca=${encodeURIComponent(term)}` : '/catalogo');
    setSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d0d0d]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:px-16">
        <button type="button" className="mr-4 text-neutral-400 md:hidden" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <Link to="/" className="text-[17px] font-semibold tracking-[0.26em] text-white">MONARCH<span className="text-[#c2ae8b]">.</span></Link>
        <nav className="ml-14 hidden items-center gap-8 md:flex">{links.map((link) => <Link key={link.to} to={link.to} className="text-[11px] uppercase tracking-[0.14em] text-neutral-400 transition hover:text-white">{link.label}</Link>)}</nav>
        <div className="ml-auto flex items-center gap-5 text-neutral-300"><button type="button" className="transition hover:text-white" aria-label="Buscar" aria-expanded={searchOpen} onClick={() => setSearchOpen(!searchOpen)}><Search size={18} strokeWidth={1.5} /></button><Link to="/conta" className="hidden transition hover:text-white sm:block" aria-label="Minha conta"><UserRound size={18} strokeWidth={1.5} /></Link><Link to="/favoritos" className="relative hidden transition hover:text-white sm:block" aria-label={`${favoriteIds.length} favoritos`}><Heart size={18} fill={favoriteIds.length > 0 ? 'currentColor' : 'none'} strokeWidth={1.5} />{favoriteIds.length > 0 && <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-[#c2ae8b] px-1 text-[9px] font-bold text-black">{favoriteIds.length}</span>}</Link><Link to="/carrinho" className="relative transition hover:text-white" aria-label={`Carrinho com ${itemCount} itens`}><ShoppingBag size={19} strokeWidth={1.5} />{itemCount > 0 && <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-[#c2ae8b] px-1 text-[9px] font-bold text-black">{itemCount}</span>}</Link></div>
      </div>
      {searchOpen && <form onSubmit={submitSearch} className="border-t border-white/10 px-5 py-4 sm:px-10 lg:px-16"><div className="mx-auto flex max-w-[1440px] items-center gap-3"><Search size={16} className="text-neutral-500" /><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Buscar produtos" placeholder="Buscar por produto ou categoria" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-600" /><button type="submit" className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Buscar</button></div></form>}
      {menuOpen && <nav className="border-t border-white/10 bg-[#0d0d0d] px-5 py-6 md:hidden">{links.map((link) => <Link onClick={() => setMenuOpen(false)} key={link.to} to={link.to} className="block border-b border-white/10 py-4 text-xs uppercase tracking-[0.16em] text-neutral-300">{link.label}</Link>)}<Link onClick={() => setMenuOpen(false)} to="/favoritos" className="block border-b border-white/10 py-4 text-xs uppercase tracking-[0.16em] text-neutral-300">Favoritos</Link><Link onClick={() => setMenuOpen(false)} to="/conta" className="block py-4 text-xs uppercase tracking-[0.16em] text-neutral-300">Minha conta</Link></nav>}
    </header>
  );
}
