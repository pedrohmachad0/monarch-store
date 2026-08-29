import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import type { ProductCategory } from '../types/product';

type SortOrder = 'relevancia' | 'menor-preco' | 'maior-preco' | 'nome-az' | 'nome-za';
type PriceRange = 'todos' | 'ate-100' | '100-250' | '250-500' | 'acima-500';
type CategoryValue = ProductCategory | 'todas';

const categoryOptions: Array<{ value: CategoryValue; label: string }> = [
  { value: 'todas', label: 'Todas as categorias' },
  { value: 'old-money', label: 'Old Money' },
  { value: 'streetwear', label: 'Streetwear' },
  { value: 'essentials', label: 'Essentials' },
];

const priceOptions: Array<{ value: PriceRange; label: string }> = [
  { value: 'todos', label: 'Qualquer preço' },
  { value: 'ate-100', label: 'Até R$ 100' },
  { value: '100-250', label: 'R$ 100 – R$ 250' },
  { value: '250-500', label: 'R$ 250 – R$ 500' },
  { value: 'acima-500', label: 'Acima de R$ 500' },
];

const sortOptions: Array<{ value: SortOrder; label: string }> = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'nome-az', label: 'Nome A–Z' },
  { value: 'nome-za', label: 'Nome Z–A' },
];

function matchesPrice(price: number, range: PriceRange) {
  if (range === 'ate-100') return price <= 100;
  if (range === '100-250') return price > 100 && price <= 250;
  if (range === '250-500') return price > 250 && price <= 500;
  if (range === 'acima-500') return price > 500;
  return true;
}

interface CatalogHeaderProps {
  resultLabel: string;
  resultCount: number;
}

function CatalogHeader({ resultLabel, resultCount }: CatalogHeaderProps) {
  return <header className="max-w-3xl"><p className="eyebrow">Monarch / Collection 01</p><h1 className="section-title mt-4">{resultLabel}</h1><p className="mt-6 max-w-xl text-sm leading-6 text-neutral-400 sm:text-base">Explore uma seleção de peças essenciais, streetwear e clássicos contemporâneos escolhidos para elevar o seu uniforme.</p><p className="mt-7 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">{resultCount} {resultCount === 1 ? 'peça encontrada' : 'peças encontradas'}</p></header>;
}

interface CatalogFiltersProps {
  searchInput: string;
  selectedCategory: CategoryValue;
  selectedPrice: PriceRange;
  selectedSort: SortOrder;
  filtersOpen: boolean;
  hasActiveFilters: boolean;
  onSearchInputChange: (value: string) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCategoryChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onToggleFilters: () => void;
  onClearFilters: () => void;
}

function CatalogFilters({ searchInput, selectedCategory, selectedPrice, selectedSort, filtersOpen, hasActiveFilters, onSearchInputChange, onSearchSubmit, onCategoryChange, onPriceChange, onSortChange, onToggleFilters, onClearFilters }: CatalogFiltersProps) {
  return <section className="mt-12 border-y border-white/10 py-4"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><form onSubmit={onSearchSubmit} className="flex min-w-0 items-center gap-3 border-b border-white/20 pb-3 lg:w-80"><Search size={16} className="shrink-0 text-neutral-500" /><input value={searchInput} onChange={(event) => onSearchInputChange(event.target.value)} aria-label="Buscar produtos no catálogo" placeholder="Buscar produtos" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-600" /><button type="submit" className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-400 transition hover:text-white">Buscar</button></form><button type="button" onClick={onToggleFilters} aria-expanded={filtersOpen} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-300 lg:hidden"><SlidersHorizontal size={15} /> Filtros {hasActiveFilters && <span className="grid h-4 min-w-4 place-items-center rounded-full bg-[#c2ae8b] px-1 text-[9px] text-black">!</span>}</button><div className={`${filtersOpen ? 'grid' : 'hidden'} gap-3 sm:grid-cols-2 lg:flex lg:items-center`}><label className="flex items-center gap-3 text-xs text-neutral-400"><span className="sr-only">Categoria</span><Filter size={14} className="hidden text-neutral-600 sm:block" /><select aria-label="Filtrar por categoria" value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)} className="w-full appearance-none bg-transparent py-2 text-xs text-white outline-none lg:w-auto">{categoryOptions.map((option) => <option className="bg-[#171717]" key={option.value} value={option.value}>{option.label}</option>)}</select></label><label className="flex items-center gap-3 text-xs text-neutral-400"><span className="sr-only">Faixa de preço</span><select aria-label="Filtrar por faixa de preço" value={selectedPrice} onChange={(event) => onPriceChange(event.target.value)} className="w-full appearance-none bg-transparent py-2 text-xs text-white outline-none lg:w-auto">{priceOptions.map((option) => <option className="bg-[#171717]" key={option.value} value={option.value}>{option.label}</option>)}</select></label><label className="flex items-center gap-3 text-xs text-neutral-400"><span className="sr-only">Ordenar produtos</span><select aria-label="Ordenar produtos" value={selectedSort} onChange={(event) => onSortChange(event.target.value)} className="w-full appearance-none bg-transparent py-2 text-xs text-white outline-none lg:w-auto">{sortOptions.map((option) => <option className="bg-[#171717]" key={option.value} value={option.value}>{option.label}</option>)}</select></label></div>{hasActiveFilters && <button type="button" onClick={onClearFilters} className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500 transition hover:text-white"><X size={13} /> Limpar filtros</button>}</div></section>;
}

function EmptyCatalogState({ onClearFilters }: { onClearFilters: () => void }) {
  return <section className="mt-12 border-y border-white/10 py-24 text-center"><Search size={24} className="mx-auto text-neutral-600" /><h2 className="mt-6 text-2xl font-medium tracking-[-0.03em]">Nenhum produto encontrado</h2><p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-neutral-500">Ajuste sua busca ou remova os filtros para explorar toda a seleção Monarch.</p><button type="button" onClick={onClearFilters} className="button-primary mt-8">Limpar filtros</button></section>;
}

export function CatalogPage() {
  const { category: routeCategory } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('busca') ?? '';
  const selectedCategory = (searchParams.get('categoria') ?? routeCategory ?? 'todas') as CategoryValue;
  const selectedPrice = (searchParams.get('preco') ?? 'todos') as PriceRange;
  const selectedSort = (searchParams.get('ordem') ?? 'relevancia') as SortOrder;
  const [searchInput, setSearchInput] = useState(query);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const searchableText = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      return (!normalizedQuery || searchableText.includes(normalizedQuery)) && (selectedCategory === 'todas' || product.category === selectedCategory) && matchesPrice(product.price, selectedPrice);
    });
    return [...filtered].sort((first, second) => {
      if (selectedSort === 'menor-preco') return first.price - second.price;
      if (selectedSort === 'maior-preco') return second.price - first.price;
      if (selectedSort === 'nome-az') return first.name.localeCompare(second.name);
      if (selectedSort === 'nome-za') return second.name.localeCompare(first.name);
      return Number(second.featured ?? false) - Number(first.featured ?? false);
    });
  }, [query, selectedCategory, selectedPrice, selectedSort]);

  function updateFilters(updates: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === 'todos' || (key === 'categoria' && value === 'todas') || (key === 'ordem' && value === 'relevancia')) next.delete(key);
      else next.set(key, value);
    });
    navigate(`/catalogo${next.toString() ? `?${next.toString()}` : ''}`, { replace: true });
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateFilters({ busca: searchInput.trim() || null });
  }

  function clearFilters() {
    setSearchInput('');
    navigate('/catalogo', { replace: true });
    setFiltersOpen(false);
  }

  const hasActiveFilters = Boolean(query || selectedCategory !== 'todas' || selectedPrice !== 'todos' || selectedSort !== 'relevancia');
  const resultLabel = query ? `Resultados para “${query}”` : selectedCategory === 'todas' ? 'Monarch Collection' : categoryOptions.find((option) => option.value === selectedCategory)?.label ?? 'Monarch Collection';

  return <main className="mx-auto max-w-[1440px] px-5 py-14 sm:px-10 lg:px-16 lg:py-20"><CatalogHeader resultLabel={resultLabel} resultCount={visibleProducts.length} /><CatalogFilters searchInput={searchInput} selectedCategory={selectedCategory} selectedPrice={selectedPrice} selectedSort={selectedSort} filtersOpen={filtersOpen} hasActiveFilters={hasActiveFilters} onSearchInputChange={setSearchInput} onSearchSubmit={submitSearch} onCategoryChange={(value) => updateFilters({ categoria: value })} onPriceChange={(value) => updateFilters({ preco: value })} onSortChange={(value) => updateFilters({ ordem: value })} onToggleFilters={() => setFiltersOpen((isOpen) => !isOpen)} onClearFilters={clearFilters} />{visibleProducts.length > 0 ? <section aria-label="Produtos do catálogo" className="mt-12 grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</section> : <EmptyCatalogState onClearFilters={clearFilters} />}<div className="mt-16 flex items-center justify-between border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.16em] text-neutral-600"><span>Curadoria Monarch / 01</span><Link to="/" className="transition hover:text-white">Voltar para Home</Link></div></main>;
}
