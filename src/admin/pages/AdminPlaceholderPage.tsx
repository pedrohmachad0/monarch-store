import { ArrowLeft, Construction } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';

const copy = { produtos: ['Produtos', 'O gerenciamento de produtos será desenvolvido em uma próxima etapa.'], pedidos: ['Pedidos', 'A gestão operacional de pedidos será integrada em uma próxima etapa.'], usuarios: ['Usuários', 'A administração de usuários depende da proteção real do backend.'], configuracoes: ['Configurações', 'As configurações do painel serão definidas junto ao backend administrativo.'] } as const;

export function AdminPlaceholderPage() {
  const { section = 'produtos' } = useParams<{ section: string }>();
  const content = copy[section as keyof typeof copy] ?? ['Área administrativa', 'Esta área ainda não possui conteúdo funcional.'];
  return <AdminLayout><div className="mx-auto max-w-3xl"><Link to="/admin" className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#77736b] hover:text-[#24231f]"><ArrowLeft size={14} /> Voltar ao dashboard</Link><section className="mt-8 border border-[#dedbd3] bg-[#fbfaf7] p-8 sm:p-12"><div className="grid h-12 w-12 place-items-center border border-[#d6c3a1] text-[#9b835b]"><Construction size={21} /></div><p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b835b]">Área preparada</p><h1 className="mt-3 font-display text-4xl tracking-[-0.05em]">{content[0]}</h1><p className="mt-5 max-w-lg text-sm leading-6 text-[#77736b]">{content[1]}</p><p className="mt-8 border-t border-[#dedbd3] pt-5 text-xs leading-5 text-[#aaa49b]">Nenhuma operação foi simulada nesta branch. O painel está preparado para receber a implementação futura com autenticação, permissões e API no backend.</p></section></div></AdminLayout>;
}
