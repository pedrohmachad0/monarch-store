import { BarChart3, Boxes, ChevronRight, ExternalLink, LayoutDashboard, LogOut, Menu, Settings, ShoppingBag, Users, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const navigation = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { label: 'Produtos', to: '/admin/produtos', icon: Boxes },
  { label: 'Pedidos', to: '/admin/pedidos', icon: ShoppingBag },
  { label: 'Usuários', to: '/admin/usuarios', icon: Users },
  { label: 'Configurações', to: '/admin/configuracoes', icon: Settings },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() { logout(); setMenuOpen(false); navigate('/login', { replace: true }); }
  return <div className="min-h-screen bg-[#f4f3ef] text-[#24231f]"><div className="flex min-h-screen"><aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-[#dedbd3] bg-[#fbfaf7] px-5 py-6 transition-transform lg:static lg:translate-x-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}><div className="flex items-center justify-between"><Link to="/admin" onClick={() => setMenuOpen(false)} className="font-display text-2xl tracking-[-0.06em]">MONARCH<span className="text-[#9b835b]">.</span></Link><button type="button" onClick={() => setMenuOpen(false)} className="grid h-9 w-9 place-items-center text-[#77736b] lg:hidden" aria-label="Fechar menu administrativo"><X size={18} /></button></div><div className="mt-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9b835b]"><BarChart3 size={13} /> Admin / Protótipo</div><nav className="mt-12 space-y-1" aria-label="Navegação administrativa">{navigation.map(({ label, to, icon: Icon }) => <Link key={to} to={to} onClick={() => setMenuOpen(false)} className="group flex items-center gap-3 px-3 py-3 text-sm text-[#6d6a63] transition hover:bg-[#efede8] hover:text-[#24231f]"><Icon size={17} /><span>{label}</span><ChevronRight size={14} className="ml-auto opacity-0 transition group-hover:opacity-100" /></Link>)}</nav><div className="mt-auto border-t border-[#dedbd3] pt-5"><Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 text-sm text-[#6d6a63] hover:text-[#24231f]"><ExternalLink size={17} /> Voltar para a loja</Link>{user && <button type="button" onClick={handleLogout} className="mt-1 flex w-full items-center gap-3 px-3 py-3 text-left text-sm text-[#6d6a63] hover:text-[#24231f]"><LogOut size={17} /> Sair de {user.name.split(' ')[0]}</button>}</div></aside>{menuOpen && <button type="button" aria-label="Fechar navegação" onClick={() => setMenuOpen(false)} className="fixed inset-0 z-30 bg-black/30 lg:hidden" /> }<div className="min-w-0 flex-1"><header className="flex min-h-20 items-center justify-between border-b border-[#dedbd3] bg-[#fbfaf7] px-5 sm:px-8 lg:px-12"><div className="flex items-center gap-4"><button type="button" onClick={() => setMenuOpen(true)} className="grid h-10 w-10 place-items-center border border-[#dedbd3] text-[#6d6a63] lg:hidden" aria-label="Abrir menu administrativo"><Menu size={19} /></button><div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b835b]">Monarch Store</p><p className="mt-1 text-sm text-[#6d6a63]">Painel administrativo</p></div></div><div className="hidden items-center gap-4 sm:flex"><span className="text-xs text-[#77736b]">{user ? user.name : 'Visitante'}</span><span className="h-2 w-2 rounded-full bg-[#9b835b]" title="Ambiente de protótipo" /></div></header><main className="px-5 py-8 sm:px-8 lg:px-12 lg:py-12">{children}</main></div></div></div>;
}
