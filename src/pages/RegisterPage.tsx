import { ArrowRight, UserRound } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function RegisterPage() {
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => { if (isAuthenticated) navigate('/minha-conta', { replace: true }); }, [isAuthenticated, navigate]);
  if (isAuthenticated) return null;
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !password || !confirmation) return setError('Preencha todos os campos.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Digite um e-mail válido.');
    if (password.length < 8) return setError('A senha deve ter pelo menos 8 caracteres.');
    if (password !== confirmation) return setError('As senhas não coincidem.');
    setLoading(true);
    const success = await register(name, email, password);
    setLoading(false);
    if (!success) return setError('Este e-mail já possui uma conta neste protótipo.');
    navigate('/minha-conta', { replace: true });
  }
  return <main className="mx-auto max-w-md px-5 py-16 sm:px-10 lg:py-24"><div className="border border-white/10 bg-[#161616] p-6 sm:p-10"><div className="grid h-10 w-10 place-items-center border border-[#c2ae8b] text-[#c2ae8b]"><UserRound size={17} /></div><p className="eyebrow mt-8">Monarch / Conta</p><h1 className="section-title mt-4 text-4xl">Criar conta</h1><p className="mt-4 text-sm leading-6 text-neutral-500">Crie seu acesso para acompanhar sua experiência Monarch. Este cadastro funciona apenas localmente como protótipo.</p><form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5"><label className="block"><span className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-neutral-400">Nome completo</span><input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" className="w-full border border-white/10 bg-[#0d0d0d] px-4 py-3.5 text-sm text-white outline-none focus:border-[#c2ae8b]" placeholder="Seu nome" /></label><label className="block"><span className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-neutral-400">E-mail</span><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" className="w-full border border-white/10 bg-[#0d0d0d] px-4 py-3.5 text-sm text-white outline-none focus:border-[#c2ae8b]" placeholder="voce@email.com" /></label><label className="block"><span className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-neutral-400">Senha</span><input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="new-password" className="w-full border border-white/10 bg-[#0d0d0d] px-4 py-3.5 text-sm text-white outline-none focus:border-[#c2ae8b]" placeholder="Mínimo de 8 caracteres" /></label><label className="block"><span className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-neutral-400">Confirmar senha</span><input value={confirmation} onChange={(event) => setConfirmation(event.target.value)} type="password" autoComplete="new-password" className="w-full border border-white/10 bg-[#0d0d0d] px-4 py-3.5 text-sm text-white outline-none focus:border-[#c2ae8b]" placeholder="Repita sua senha" /></label>{error && <p role="alert" className="text-sm text-red-300">{error}</p>}<button type="submit" disabled={loading} className="button-primary w-full">{loading ? 'Criando...' : 'Criar conta'} <ArrowRight size={16} /></button></form><p className="mt-7 text-sm text-neutral-500">Já possui uma conta? <Link to="/login" className="text-neutral-300 hover:text-white">Entrar</Link></p></div></main>;
}
