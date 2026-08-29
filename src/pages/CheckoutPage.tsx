import { Check, ChevronLeft, CreditCard, MapPin, Package, QrCode, ShoppingBag } from 'lucide-react';
import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { getProductImages } from '../data/media';
import type { CartItem } from '../types/cart';
import { formatBRL } from '../utils/currency';

type CheckoutFields = {
  name: string;
  email: string;
  phone: string;
  cep: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};

type FieldErrors = Partial<Record<keyof CheckoutFields, string>>;

const initialFields: CheckoutFields = {
  name: '', email: '', phone: '', cep: '', address: '', number: '', complement: '', neighborhood: '', city: '', state: '',
};

function Field({ label, name, value, onChange, error, required = true, type = 'text', placeholder }: { label: string; name: keyof CheckoutFields; value: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void; error?: string; required?: boolean; type?: string; placeholder?: string }) {
  return <label className="block"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">{label}{required && <span className="ml-1 text-[#c2ae8b]">*</span>}</span><input name={name} value={value} onChange={onChange} type={type} required={required} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} className={`w-full border bg-[#161616] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-neutral-700 focus:border-[#c2ae8b] ${error ? 'border-red-400/70' : 'border-white/10'}`} />{error && <span id={`${name}-error`} className="mt-2 block text-xs text-red-300">{error}</span>}</label>;
}

function SectionHeading({ icon: Icon, eyebrow, title }: { icon: typeof MapPin; eyebrow: string; title: string }) {
  return <div className="mb-7 flex items-start gap-4"><div className="grid h-9 w-9 shrink-0 place-items-center border border-white/10 text-[#c2ae8b]"><Icon size={16} /></div><div><p className="eyebrow">{eyebrow}</p><h2 className="mt-2 text-2xl font-medium tracking-[-0.03em]">{title}</h2></div></div>;
}

function OrderSummary({ items, subtotal }: { items: CartItem[]; subtotal: number }) {
  return <aside className="h-fit border border-white/10 bg-[#161616] p-6 sm:p-8 lg:sticky lg:top-8"><p className="eyebrow">Resumo do pedido</p><h2 className="mt-3 text-2xl font-medium tracking-[-0.03em]">Sua seleção</h2><div className="mt-7 space-y-5 border-b border-white/10 pb-7">{items.map((item) => { const image = getProductImages(item.product)[0]; const variation = [item.size && `Tam. ${item.size}`, item.color].filter(Boolean).join(' · '); return <div key={`${item.product.id}-${item.size ?? ''}-${item.color ?? ''}`} className="flex gap-3"><div className="relative h-20 w-16 shrink-0 overflow-hidden bg-[#222]">{image ? <img src={image} alt={item.product.name} className="h-full w-full object-cover" /> : <div className="h-full w-full" aria-label={`Imagem de ${item.product.name} indisponível`} />}<span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center bg-[#c2ae8b] px-1 text-[10px] font-semibold text-black">{item.quantity}</span></div><div className="min-w-0"><p className="text-sm text-white">{item.product.name}</p>{variation && <p className="mt-1 text-xs text-neutral-500">{variation}</p>}<p className="mt-2 text-xs text-neutral-400">{formatBRL(item.product.price)} / un.</p></div></div>; })}</div><div className="mt-6 space-y-4 text-sm"><div className="flex justify-between gap-4 text-neutral-400"><span>Subtotal</span><span className="text-white">{formatBRL(subtotal)}</span></div><div className="flex justify-between gap-4 text-neutral-400"><span>Frete</span><span className="text-white">A calcular</span></div></div><div className="mt-6 flex justify-between gap-4 border-t border-white/10 pt-6 text-base"><strong>Total</strong><strong>{formatBRL(subtotal)}</strong></div></aside>;
}

function EmptyCheckout() {
  return <main className="mx-auto flex min-h-[65vh] max-w-4xl flex-col items-start justify-center px-5 py-20 sm:px-10 lg:px-16"><p className="eyebrow">Monarch / Checkout</p><h1 className="section-title mt-4">Nada para finalizar</h1><p className="mt-5 max-w-md text-sm leading-6 text-neutral-500">Seu carrinho está vazio. Explore a curadoria Monarch antes de continuar.</p><Link to="/catalogo" className="button-primary mt-8">Explorar produtos</Link></main>;
}

function SuccessState() {
  return <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center sm:px-10"><div className="grid h-16 w-16 place-items-center rounded-full bg-[#c2ae8b] text-black"><Check size={28} /></div><p className="eyebrow mt-8">Monarch / Pedido preparado</p><h1 className="section-title mt-4">Recebemos sua solicitação</h1><p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-neutral-400">A confirmação é apenas demonstrativa nesta etapa. A criação de pedidos e o pagamento real serão integrados futuramente.</p><Link to="/" className="button-primary mt-8">Voltar para Home</Link></main>;
}

export function CheckoutPage() {
  const { items } = useCart();
  const [fields, setFields] = useState<CheckoutFields>(initialFields);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [payment, setPayment] = useState<'card' | 'pix'>('card');
  const [submitted, setSubmitted] = useState(false);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [items]);

  if (items.length === 0) return <EmptyCheckout />;
  if (submitted) return <SuccessState />;

  function updateField(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));
    if (errors[name as keyof CheckoutFields]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function validateFields() {
    const nextErrors: FieldErrors = {};
    const requiredFields: Array<keyof CheckoutFields> = ['name', 'email', 'phone', 'cep', 'address', 'number', 'neighborhood', 'city', 'state'];
    requiredFields.forEach((field) => { if (!fields[field].trim()) nextErrors[field] = 'Preencha este campo.'; });
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) nextErrors.email = 'Digite um e-mail válido.';
    const phoneDigits = fields.phone.replace(/\D/g, '');
    if (fields.phone && (phoneDigits.length < 10 || phoneDigits.length > 11)) nextErrors.phone = 'Digite um telefone válido.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validateFields()) setSubmitted(true);
  }

  return <main className="mx-auto max-w-[1440px] px-5 py-10 sm:px-10 lg:px-16 lg:py-16"><div className="mb-12 flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Monarch / Finalização</p><h1 className="section-title mt-4">Finalizar compra</h1><p className="mt-5 max-w-xl text-sm leading-6 text-neutral-400">Preencha seus dados para preparar o pedido. Nenhuma cobrança será realizada nesta etapa.</p></div><Link to="/carrinho" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-neutral-500 transition hover:text-white"><ChevronLeft size={14} /> Voltar ao carrinho</Link></div><div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start"><form onSubmit={handleSubmit} noValidate className="space-y-12"><section><SectionHeading icon={ShoppingBag} eyebrow="01 / Seus dados" title="Dados do cliente" /><div className="grid gap-5 sm:grid-cols-2"><div className="sm:col-span-2"><Field label="Nome completo" name="name" value={fields.name} onChange={updateField} error={errors.name} placeholder="Seu nome" /></div><Field label="E-mail" name="email" value={fields.email} onChange={updateField} error={errors.email} type="email" placeholder="voce@email.com" /><Field label="Telefone" name="phone" value={fields.phone} onChange={updateField} error={errors.phone} type="tel" placeholder="(11) 99999-9999" /></div></section><section><SectionHeading icon={MapPin} eyebrow="02 / Entrega" title="Endereço de entrega" /><div className="grid gap-5 sm:grid-cols-2"><Field label="CEP" name="cep" value={fields.cep} onChange={updateField} error={errors.cep} placeholder="00000-000" /><Field label="Estado" name="state" value={fields.state} onChange={updateField} error={errors.state} placeholder="SP" /><div className="sm:col-span-2"><Field label="Endereço" name="address" value={fields.address} onChange={updateField} error={errors.address} placeholder="Rua, avenida ou alameda" /></div><Field label="Número" name="number" value={fields.number} onChange={updateField} error={errors.number} placeholder="123" /><Field label="Complemento" name="complement" value={fields.complement} onChange={updateField} error={errors.complement} required={false} placeholder="Apto, bloco (opcional)" /><Field label="Bairro" name="neighborhood" value={fields.neighborhood} onChange={updateField} error={errors.neighborhood} placeholder="Seu bairro" /><Field label="Cidade" name="city" value={fields.city} onChange={updateField} error={errors.city} placeholder="São Paulo" /></div></section><section><SectionHeading icon={Package} eyebrow="03 / Método" title="Forma de entrega" /><label className="flex cursor-pointer items-start gap-4 border border-[#c2ae8b] bg-[#161616] p-4"><input type="radio" name="shipping" defaultChecked className="mt-1 accent-[#c2ae8b]" /><span className="flex-1"><span className="block text-sm text-white">Entrega padrão</span><span className="mt-1 block text-xs text-neutral-500">Frete a calcular posteriormente</span></span><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#c2ae8b]">A calcular</span></label></section><section><SectionHeading icon={payment === 'card' ? CreditCard : QrCode} eyebrow="04 / Pagamento" title="Método de pagamento" /><div className="grid gap-3 sm:grid-cols-2"><label className={`flex cursor-pointer items-center gap-3 border p-4 transition ${payment === 'card' ? 'border-[#c2ae8b] bg-[#161616]' : 'border-white/10 hover:border-white/30'}`}><input type="radio" name="payment" value="card" checked={payment === 'card'} onChange={() => setPayment('card')} className="accent-[#c2ae8b]" /><CreditCard size={17} className="text-[#c2ae8b]" /><span className="text-sm text-white">Cartão</span></label><label className={`flex cursor-pointer items-center gap-3 border p-4 transition ${payment === 'pix' ? 'border-[#c2ae8b] bg-[#161616]' : 'border-white/10 hover:border-white/30'}`}><input type="radio" name="payment" value="pix" checked={payment === 'pix'} onChange={() => setPayment('pix')} className="accent-[#c2ae8b]" /><QrCode size={17} className="text-[#c2ae8b]" /><span className="text-sm text-white">PIX</span></label></div><p className="mt-4 text-xs leading-5 text-neutral-600">A integração de pagamento será disponibilizada em uma próxima etapa. Nenhum dado financeiro é solicitado aqui.</p></section><button type="submit" className="button-primary w-full sm:w-auto">Preparar pedido <Check size={16} /></button></form><OrderSummary items={items} subtotal={subtotal} /></div></main>;
}
