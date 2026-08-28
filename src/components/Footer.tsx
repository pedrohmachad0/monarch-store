export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950 text-neutral-400">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div><p className="font-semibold tracking-[0.2em] text-white">MONARCH</p><p className="mt-3 text-sm">Moda masculina com presença.</p></div>
        <div><h3 className="text-sm font-medium text-white">Comprar</h3><p className="mt-3 text-sm">Coleção · Old Money · Streetwear</p></div>
        <div><h3 className="text-sm font-medium text-white">Atendimento</h3><p className="mt-3 text-sm">Envios · Trocas · Contato</p></div>
        <div><h3 className="text-sm font-medium text-white">Monarch</h3><p className="mt-3 text-sm">Qualidade, estilo e identidade.</p></div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs">© {new Date().getFullYear()} Monarch Store. Todos os direitos reservados.</div>
    </footer>
  );
}
