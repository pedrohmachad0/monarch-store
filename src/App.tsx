import { Link, Route, Routes } from 'react-router-dom';

function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20 lg:px-12">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-400">Monarch Store</p>
        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-7xl">Elegância que fala por você.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-400">Moda masculina com peças old money, streetwear e essenciais selecionados.</p>
        <Link to="/catalogo" className="mt-10 w-fit rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200">Explorar coleção</Link>
      </section>
    </main>
  );
}

function Catalogo() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <Link to="/" className="text-sm text-neutral-400 hover:text-white">← Voltar</Link>
        <h1 className="mt-10 text-4xl font-semibold">Catálogo</h1>
        <p className="mt-3 text-neutral-400">A estrutura do catálogo começa aqui.</p>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
    </Routes>
  );
}
