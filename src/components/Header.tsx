import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export function Header() {
  const { itemCount } = useCart();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-semibold tracking-[0.2em]">MONARCH</Link>
        <nav className="hidden gap-8 text-sm text-neutral-300 md:flex">
          <Link to="/catalogo" className="hover:text-white">Coleção</Link>
          <Link to="/categoria/old-money" className="hover:text-white">Old Money</Link>
          <Link to="/categoria/streetwear" className="hover:text-white">Streetwear</Link>
          <Link to="/categoria/essentials" className="hover:text-white">Essentials</Link>
        </nav>
        <Link to="/carrinho" className="text-sm hover:text-neutral-300">Carrinho ({itemCount})</Link>
      </div>
    </header>
  );
}
