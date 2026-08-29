import { ArrowUpRight, Check, Mail, ShieldCheck, Sparkles, Truck, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

const categories = [
  { name: 'Old Money', label: 'Clássicos refinados', slug: 'old-money', image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=900&q=85' },
  { name: 'Streetwear', label: 'Atitude contemporânea', slug: 'streetwear', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85' },
  { name: 'Essentials', label: 'O essencial bem feito', slug: 'essentials', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85' },
];

const benefits = [
  { icon: Sparkles, title: 'Curadoria premium', text: 'Peças escolhidas para elevar a sua presença.' },
  { icon: ShieldCheck, title: 'Compra segura', text: 'Uma experiência transparente em cada etapa.' },
  { icon: Truck, title: 'Experiência simples', text: 'Navegue, escolha e encontre seu novo padrão.' },
  { icon: UserRound, title: 'Atendimento próximo', text: 'Estamos preparando um atendimento à altura da marca.' },
];

export function HomePage() {
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <main>
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#141414]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_20%,rgba(188,167,126,0.16),transparent_32%)]" />
        <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1440px] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="flex flex-col justify-center px-5 py-20 sm:px-10 lg:px-16 lg:py-24">
            <p className="eyebrow">MONARCH / 01 — THE NEW STANDARD</p>
            <h1 className="display-title mt-6 max-w-xl text-6xl font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:text-8xl lg:text-[7.2rem]">Style without compromise.</h1>
            <p className="mt-8 max-w-md text-base leading-7 text-neutral-400 sm:text-lg">Moda masculina para quem entende que presença está nos detalhes. Uma nova leitura do clássico, feita para agora.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/catalogo" className="button-primary">Comprar agora <ArrowUpRight size={16} /></Link>
              <Link to="/categoria/old-money" className="button-secondary">Explorar coleção</Link>
            </div>
            <div className="mt-16 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-neutral-500"><span className="h-px w-10 bg-neutral-600" /> Edição 2026 <span className="text-[#c2ae8b]">●</span> Curadoria Monarch</div>
          </div>
          <div className="relative min-h-[560px] overflow-hidden lg:min-h-0">
            <img src="https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1600&q=90" alt="Homem usando look masculino sofisticado em tons neutros" className="absolute inset-0 h-full w-full object-cover object-center grayscale-[15%] transition duration-700 hover:scale-[1.02]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
            <p className="absolute bottom-7 left-6 text-[10px] uppercase tracking-[0.25em] text-white/70 sm:left-10">Monarch / Campaign 01</p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#f1eee8] text-[#171717]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em]">Uma assinatura visual. Diferentes formas de vestir.</p>
          <div className="flex gap-8 text-xs uppercase tracking-[0.2em] text-black/50"><span>Designed for presence</span><span className="hidden sm:inline">Made to last</span></div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="flex items-end justify-between gap-6"><div><p className="eyebrow">Explore por estética</p><h2 className="section-title mt-3">Encontre seu<br /><em>novo uniforme.</em></h2></div><Link to="/catalogo" className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 transition hover:text-white sm:flex">Ver catálogo <ArrowUpRight size={15} /></Link></div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">{categories.map((category, index) => <Link to={`/categoria/${category.slug}`} key={category.slug} className="category-card group relative aspect-[4/5] overflow-hidden bg-neutral-900 md:aspect-[3/4]"><img src={category.image} alt={`Coleção ${category.name}`} className="absolute inset-0 h-full w-full object-cover grayscale-[25%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" /><div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-7"><div><p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-white/60">0{index + 1} / {category.label}</p><h3 className="text-2xl font-medium tracking-[-0.03em] text-white sm:text-3xl">{category.name}</h3></div><span className="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white transition group-hover:border-white group-hover:bg-white group-hover:text-black"><ArrowUpRight size={17} /></span></div></Link>)}</div>
      </section>

      <section className="border-y border-white/10 bg-[#111111]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-10 lg:px-16 lg:py-28"><div className="flex items-end justify-between gap-6"><div><p className="eyebrow">Seleção da semana</p><h2 className="section-title mt-3">Destaques</h2></div><Link to="/catalogo" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 transition hover:text-white">Ver tudo <ArrowUpRight size={15} /></Link></div><div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-5 lg:grid-cols-4">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div></div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-10 lg:px-16 lg:py-28"><div className="relative min-h-[580px] overflow-hidden bg-neutral-900"><img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=90" alt="Campanha Monarch com modelo usando alfaiataria contemporânea" className="absolute inset-0 h-full w-full object-cover object-center grayscale-[30%]" /><div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent" /><div className="relative flex min-h-[580px] max-w-xl flex-col justify-end p-7 sm:p-12 lg:p-16"><p className="eyebrow text-white/70">Campaign 01 / Monarch</p><h2 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-7xl">The Monarch<br /><em>Collection.</em></h2><p className="mt-6 max-w-sm text-sm leading-6 text-white/70">Silhuetas marcantes, materiais honestos e uma paleta que atravessa estações.</p><Link to="/catalogo" className="button-primary mt-8 w-fit">Descobrir a coleção <ArrowUpRight size={16} /></Link></div></div></section>

      <section className="border-y border-white/10 bg-[#f1eee8] text-[#171717]"><div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-10 lg:px-16 lg:py-20"><div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">{benefits.map(({ icon: Icon, title, text }) => <div key={title} className="border-l border-black/15 pl-5"><Icon size={20} strokeWidth={1.4} /><h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.12em]">{title}</h3><p className="mt-3 max-w-[220px] text-sm leading-6 text-black/55">{text}</p></div>)}</div></div></section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-10 lg:px-16 lg:py-28"><div className="grid gap-8 border-b border-white/10 pb-20 lg:grid-cols-[1fr_1.2fr] lg:items-end"><div><p className="eyebrow">Stay in the know</p><h2 className="section-title mt-4 max-w-xl">Receba o próximo<br /><em>capítulo.</em></h2></div><div><p className="max-w-md text-sm leading-6 text-neutral-400">Novidades, lançamentos e referências de estilo direto na sua caixa de entrada. Sem excesso. Apenas o que importa.</p><form className="mt-8 flex max-w-lg border-b border-white/30 pb-3 focus-within:border-white" onSubmit={(event) => event.preventDefault()}><Mail size={17} className="mr-3 text-neutral-500" /><input aria-label="Seu melhor e-mail" type="email" required placeholder="Seu melhor e-mail" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-600" /><button type="submit" className="text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:text-[#c2ae8b]">Inscrever <span className="sr-only">e-mail</span></button></form></div></div><div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-600"><Check size={14} /> Newsletter exclusivamente editorial. Você pode sair quando quiser.</div></section>
    </main>
  );
}
