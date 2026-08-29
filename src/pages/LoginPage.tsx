import { ArrowRight, LockKeyhole } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => { if (isAuthenticated) navigate('/minha-conta', { replace: true }); }, [isAuthenticated, navigate]);
  if (isAuthenticated) return null;
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) return setError('Digite um e-mail válido.');
    if (!password) return setError('Digite sua senha.');
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (!success) return setError('E-mail ou senha não conferem neste protótipo.');
    const destination = (location.state as { from?: string } | null)?.from ?? '/minha-conta';
    navigate(destination, { replace: true });
  }
  return <main className="mx-auto max-w-md px-5 py-16 sm:px-10 lg:py-24"><div className="border border-white/10 bg-[#161616] p-6 sm:p-10"><div className="grid h-10 w-10 place-items-center border border-[#c2ae8b] text-[#c2ae8b]"><LockKeyhole size={17} /></div><p className="eyebrow mt-8">Monarch / Conta</p><h1 className="section-title mt-4 text-4xl">Entrar</h1><p className="mt-4 text-sm leading-6 text-neutral-500">Acesse sua conta Monarch. Esta é uma experiência local de protótipo.</p><form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5"><label className="block"><span className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-neutral-400">E-mail</span><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" className="w-full border border-white/10 bg-[#0d0d0d] px-4 py-3.5 text-sm text-white outline-none focus:border-[#c2ae8b]" placeholder="voce@email.com" /></label><label className="block"><span className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-neutral-400">Senha</span><input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" className="w-full border border-white/10 bg-[#0d0d0d] px-4 py-3.5 text-sm text-white outline-none focus:border-[#c2ae8b]" placeholder="Sua senha" /></label>{error && <p role="alert" className="text-sm text-red-300">{error}</p>}<button type="submit" disabled={loading} className="button-primary w-full">{loading ? 'Entrando...' : 'Entrar'} <ArrowRight size={16} /></button></form><div className="mt-7 flex flex-col gap-3 text-sm"><Link to="/cadastro" className="text-neutral-300 hover:text-white">Ainda não tenho uma conta</Link><button type="button" onClick={() => setError('A recuperação de senha será disponibilizada quando houver backend.')} className="text-left text-neutral-500 hover:text-white">Esqueci minha senha</button></div></div></main>;
}
