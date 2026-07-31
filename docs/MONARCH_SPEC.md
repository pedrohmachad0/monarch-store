# MONARCH — Documento de Especificação do Projeto

## 1. Visão geral

A **MONARCH** é um e-commerce profissional de moda masculina com foco em elegância, qualidade e experiência premium. A marca deve unir os universos **Old Money**, **Quiet Luxury** e **Streetwear Premium**, transmitindo exclusividade, sofisticação e confiança por meio de uma interface moderna, minimalista, acessível e extremamente rápida.

O resultado esperado deve ter padrão comparável ao de grandes marcas internacionais, como Zara, COS, Massimo Dutti, Ralph Lauren, Hugo Boss e Represent, mantendo identidade visual própria e luxo discreto.

## 2. Status atual e objetivo do produto

> **Status atual:** este repositório ainda contém apenas a documentação inicial do projeto. As funcionalidades descritas neste documento são requisitos e próximos entregáveis planejados; elas ainda não foram implementadas em código de aplicação.

Criar um e-commerce completo, escalável, seguro e preparado para produção, com arquitetura modular e código limpo. Antes de implementar qualquer funcionalidade, a solução deve ser avaliada sob os critérios de engenharia de software, segurança, acessibilidade, performance, manutenibilidade e escalabilidade.

A versão final não deve manter código experimental, trechos temporários, fluxos incompletos ou implementações sem validação.

## 3. Stack tecnológica definida

### 3.1 Front-end

- Next.js 15.
- React.
- TypeScript.
- Tailwind CSS.
- Framer Motion.
- React Hook Form.
- Zod.

### 3.2 Backend e dados

- Supabase.
- PostgreSQL.
- Prisma ORM.

### 3.3 Autenticação

- Supabase Auth.
- Login por email.
- Login com Google.
- Login com GitHub.
- Recuperação de senha.
- Verificação por email.

### 3.4 Pagamentos

A arquitetura de pagamentos deve ser preparada para múltiplos gateways, com priorização para:

- Mercado Pago.
- Stripe.

### 3.5 Upload, hospedagem e emails

- Upload de imagens: Cloudinary.
- Hospedagem: Vercel.
- Emails transacionais e marketing: Resend.

## 4. Identidade visual

A identidade visual deve evitar aparência genérica e priorizar luxo discreto, minimalismo e sofisticação.

### 4.1 Paleta de cores

- Preto: `#111111`.
- Branco: `#FFFFFF`.
- Off white.
- Cinza claro.
- Cinza escuro.
- Bege.
- Marrom.
- Azul marinho.
- Verde militar.

### 4.2 Tipografia

As fontes devem ser elegantes, modernas e altamente legíveis. Sugestões:

- Inter.
- Manrope.
- Plus Jakarta Sans.

### 4.3 Direção de interface

- Muito espaço em branco.
- Poucas cores por tela.
- Animações suaves.
- Sombras discretas.
- Cartões minimalistas.
- Fotografias grandes.
- Hierarquia visual clara.
- Microinterações elegantes.

## 5. Estrutura do site

### 5.1 Home

A página inicial deve apresentar:

- Hero banner.
- Categorias principais.
- Coleções.
- Produtos em destaque.
- Lançamentos.
- Looks completos.
- Avaliações.
- Newsletter.
- Instagram.
- Rodapé completo.

### 5.2 Categorias

Categorias previstas:

- Old Money.
- Streetwear.
- Quiet Luxury.
- Camisas.
- Camisetas.
- Calças.
- Jeans.
- Alfaiataria.
- Blazers.
- Jaquetas.
- Moletom.
- Tênis.
- Sapatos.
- Acessórios.
- Perfumes.
- Relógios.
- Bonés.

### 5.3 Página de produto

A página de produto deve conter:

- Galeria de imagens.
- Zoom de imagem.
- Vídeo opcional.
- Descrição completa.
- Especificações.
- Tabela de medidas.
- Avaliações.
- Produtos relacionados.
- Looks combinando.
- Favoritar.
- Compartilhar.
- Cálculo ou consulta de frete.
- Status de estoque.
- Variações de tamanho, cor e atributos relevantes.
- Botão Comprar.
- Botão Adicionar ao Carrinho.

### 5.4 Carrinho

O carrinho deve conter:

- Resumo dos itens.
- Campo de cupom.
- Frete.
- Subtotal.
- Chamada para checkout.

### 5.5 Checkout

O checkout deve possuir fluxo simples e objetivo:

- Endereço.
- Entrega.
- Pagamento.
- Resumo.
- Confirmação.

### 5.6 Área do cliente

A área do cliente deve conter:

- Cadastro.
- Login.
- Pedidos.
- Favoritos.
- Endereços.
- Dados pessoais.
- Alterar senha.
- Notificações.

### 5.7 Painel administrativo

O painel administrativo deve conter:

- Dashboard.
- Produtos.
- Categorias.
- Pedidos.
- Clientes.
- Cupons.
- Estoque.
- Avaliações.
- Newsletter.
- Relatórios.
- Banners.
- Configurações.
- Usuários administradores.

## 6. Funcionalidades obrigatórias

O sistema deve implementar:

- Busca inteligente.
- Filtros avançados.
- Ordenação.
- Favoritos.
- Carrinho persistente.
- Produtos relacionados.
- Histórico de compras.
- Rastreamento.
- Newsletter.
- Avaliações.
- Cupons.
- Frete automático.
- Banner promocional.
- Produtos em destaque.
- Mais vendidos.
- Novidades.
- Lista de desejos.
- Recomendações.
- Compartilhamento.

## 7. Banco de dados

A estrutura de dados deve ser normalizada e preparada para crescimento. Tabelas principais previstas:

- `users`.
- `addresses`.
- `products`.
- `product_images`.
- `categories`.
- `sizes`.
- `colors`.
- `inventory`.
- `orders`.
- `order_items`.
- `payments`.
- `reviews`.
- `wishlists`.
- `coupons`.
- `banners`.
- `newsletter`.
- `audit_logs`.
- `roles`.
- `permissions`.
- `sessions`.

## 8. Segurança

O sistema deve seguir boas práticas modernas de segurança, incluindo:

- HTTPS obrigatório em produção.
- Content Security Policy.
- Proteção CSRF.
- Proteção XSS.
- Proteção contra SQL Injection.
- Validação de dados com Zod.
- Sanitização de entradas.
- Rate limiting.
- MFA para administradores.
- Hash de senha com Argon2 ou bcrypt quando necessário.
- Sessões seguras.
- Cookies `HttpOnly`.
- Cookies `Secure`.
- Logs de auditoria.
- Estratégia de backups.
- Controle de permissões baseado em papéis (RBAC).

## 9. Performance

A meta de qualidade é obter Lighthouse acima de 95, aplicando:

- Lazy loading.
- Otimização de imagens.
- Server Components.
- ISR.
- SSR quando necessário.
- Code splitting.
- Caching.
- Compressão.
- CDN.
- Prefetch.

## 10. SEO

O SEO deve ser completo e preparado para páginas dinâmicas, incluindo:

- Metadata dinâmica.
- Open Graph.
- Twitter Cards.
- Robots.
- Sitemap.
- Canonical.
- Breadcrumb.
- Schema.org.
- URLs amigáveis.

## 11. Responsividade

Toda a interface deve funcionar perfeitamente em:

- Desktop.
- Notebook.
- Tablet.
- Celular.

## 12. Acessibilidade

A experiência deve seguir WCAG e implementar:

- Labels.
- ARIA quando necessário.
- Contraste adequado.
- Navegação por teclado.
- Estados de foco visíveis.
- Texto alternativo em imagens.

## 13. Arquitetura sugerida

A aplicação deve seguir arquitetura modular e reutilizável:

```text
src/
 ├── app/
 ├── components/
 │    ├── ui/
 │    ├── layout/
 │    ├── product/
 │    ├── cart/
 │    ├── checkout/
 │    └── admin/
 ├── features/
 ├── hooks/
 ├── lib/
 ├── services/
 ├── types/
 ├── utils/
 ├── styles/
 └── middleware.ts
```

Todo componente deve ser reutilizável, coeso e simples de testar.

## 14. Qualidade de código

O projeto deve utilizar:

- ESLint.
- Prettier.
- TypeScript Strict.
- Comentários apenas quando realmente necessários.
- Funções pequenas.
- Código limpo.
- Princípios SOLID quando aplicável.
- Arquitetura escalável.

## 15. Testes

A estrutura do projeto deve ser preparada para:

- Testes unitários.
- Testes de integração.
- Testes E2E.

## 16. Experiência do usuário

A navegação deve ser extremamente fluida e premium, com:

- Animações discretas.
- Microinterações elegantes.
- Feedback visual para todas as ações.
- Estados de carregamento com skeletons.
- Estados vazios bem desenhados.
- Mensagens de erro claras.

## 17. O que posso fazer neste projeto

Com base nesta especificação, posso ajudar a executar o projeto em etapas, incluindo:

1. Planejar a arquitetura inicial do Next.js 15 com TypeScript, Tailwind CSS e organização modular.
2. Criar o design system da MONARCH com tokens de cor, tipografia, espaçamentos, botões, cards, inputs, badges, skeletons e componentes base.
3. Implementar a home premium com hero, categorias, coleções, produtos em destaque, newsletter e rodapé.
4. Criar listagens de produtos com busca, filtros, ordenação, paginação e URLs amigáveis.
5. Implementar página de produto com galeria, variações, tabela de medidas, avaliações, favoritos, estoque e produtos relacionados.
6. Desenvolver carrinho persistente, fluxo de checkout e arquitetura preparada para Mercado Pago e Stripe.
7. Configurar Supabase Auth com email, Google, GitHub, recuperação de senha e verificação por email.
8. Modelar o banco com Prisma e PostgreSQL, incluindo produtos, pedidos, clientes, estoque, cupons, avaliações, RBAC e auditoria.
9. Criar painel administrativo para gestão de produtos, categorias, pedidos, clientes, cupons, banners, estoque e relatórios.
10. Integrar Cloudinary para upload e otimização de imagens.
11. Integrar Resend para emails transacionais, newsletter e notificações.
12. Implementar segurança com validação Zod, CSP, rate limiting, cookies seguros, sanitização, RBAC e logs.
13. Preparar SEO técnico com metadata dinâmica, sitemap, robots, canonical, Open Graph, Twitter Cards e Schema.org.
14. Otimizar performance com Server Components, ISR, SSR seletivo, cache, lazy loading, code splitting e otimização de imagens.
15. Garantir acessibilidade com labels, ARIA quando necessário, contraste, navegação por teclado e estados de foco.
16. Criar testes unitários, de integração e E2E conforme a evolução do produto.
17. Revisar código, remover implementações experimentais, melhorar manutenibilidade e preparar o projeto para deploy na Vercel.

## 18. Plano de execução recomendado

Para transformar esta especificação em produto funcional, a implementação deve ser feita em fases:

1. **Base do projeto:** scaffold do Next.js 15, TypeScript Strict, Tailwind CSS, ESLint, Prettier e estrutura modular.
2. **Design system:** tokens visuais, tipografia, componentes base, layout global, header, footer e padrões de estados.
3. **Catálogo:** modelagem inicial de produtos, categorias, imagens, variantes, estoque, listagem, filtros, busca e página de produto.
4. **Cliente e autenticação:** Supabase Auth, perfis, endereços, favoritos, pedidos e recuperação de senha.
5. **Carrinho e checkout:** carrinho persistente, cupons, frete, resumo de pedido e integração preparada para Mercado Pago e Stripe.
6. **Admin:** dashboard, gestão de produtos, pedidos, clientes, estoque, cupons, banners, avaliações e permissões.
7. **Produção:** segurança, auditoria, SEO, performance, acessibilidade, testes, observabilidade, emails, uploads e deploy na Vercel.

## 19. Critério de aceite final

O projeto será considerado pronto quando entregar um e-commerce profissional, seguro, moderno, rápido, responsivo e escalável, com aparência premium, ótima experiência de usuário, código limpo e base técnica preparada para produção.
