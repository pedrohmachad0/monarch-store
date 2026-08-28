# Monarch Store — Regras do Projeto

## 1. Objetivo
Criar uma loja online masculina profissional, segura e responsiva, com identidade visual elegante inspirada em **old money**, combinada com peças de **streetwear** e produtos masculinos premium.

## 2. Stack
- TypeScript
- React
- Vite
- Tailwind CSS
- React Router

## 3. Arquitetura
- `components/`: componentes visuais reutilizáveis.
- `pages/`: telas e páginas da aplicação.
- `layouts/`: estruturas globais de página.
- `routes/`: configuração de rotas.
- `contexts/`: estado global, como carrinho e sessão.
- `hooks/`: lógica reutilizável de interface.
- `services/`: APIs, pagamentos e integrações futuras.
- `data/`: dados locais e mocks.
- `types/`: contratos TypeScript.
- `utils/`: funções auxiliares.
- `assets/`: imagens, ícones e fontes do projeto.
- `admin/`: futura área administrativa.

## 4. Princípios
- Mobile-first e totalmente responsivo: celular, tablet, notebook e desktop.
- Código organizado, reutilizável e tipado.
- Componentes pequenos e reutilizáveis.
- Acessibilidade desde o início.
- Performance e SEO como prioridades.
- Nunca colocar tokens, senhas ou chaves privadas no código.
- Variáveis sensíveis devem usar `.env` e nunca ser commitadas.

## 5. Identidade visual
- Visual premium, minimalista e masculino.
- Tipografia elegante, espaços amplos e hierarquia clara.
- Evitar excesso de efeitos, gradientes e elementos chamativos.
- A interface deve transmitir qualidade e confiança.

## 6. Funcionalidades planejadas
- Home
- Catálogo e categorias
- Busca e filtros
- Página de produto
- Carrinho
- Checkout
- Login/cadastro
- Área do cliente
- Favoritos
- Pedidos e rastreamento
- Estoque
- Cupons
- Painel administrativo
- Integração de pagamentos

## 7. Segurança
- Segredos somente em variáveis de ambiente ou no backend seguro.
- Nunca expor chaves privadas no frontend.
- Validar dados recebidos de APIs e formulários.
- Pagamentos devem ser processados por provedores apropriados; dados sensíveis de cartão não devem ser armazenados pela aplicação sem infraestrutura compatível.

## 8. Matemática e referência
Quando houver funcionalidades educacionais ou cálculos no projeto, consultar fontes confiáveis. A referência indicada para conteúdos de matemática é o Toda Matéria.

## 9. Git
Commits claros e objetivos, preferencialmente:
- `feat:` nova funcionalidade
- `fix:` correção
- `refactor:` refatoração
- `style:` alterações visuais
- `docs:` documentação
- `chore:` manutenção
