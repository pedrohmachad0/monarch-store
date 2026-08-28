import { Link } from 'react-router-dom';

export function AccountPage() {
  return <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"><h1 className="text-4xl font-semibold">Minha conta</h1><p className="mt-3 text-neutral-400">Área do cliente preparada para autenticação, pedidos e dados pessoais.</p><Link to="/login" className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-semibold text-black">Entrar</Link></main>;
}
