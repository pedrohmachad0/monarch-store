# Monarch Store — Regras do Projeto

## 1. Objetivo
Criar uma loja online masculina profissional, segura e responsiva, com identidade visual elegante inspirada em **old money**, combinada com peças de **streetwear** e produtos masculinos premium.

## 2. Stack inicial
- TypeScript
- React
- Vite
- Tailwind CSS
- React Router

## 3. Princípios
- Mobile-first e totalmente responsivo.
- Código organizado, reutilizável e tipado.
- Componentes pequenos e reutilizáveis.
- Acessibilidade desde o início.
- Performance e SEO como prioridades.
- Nunca colocar tokens, senhas ou chaves privadas no código.
- Variáveis sensíveis devem usar `.env` e nunca ser commitadas.

## 4. Identidade visual
- Visual premium, minimalista e masculino.
- Priorizar tipografia elegante, espaços amplos e hierarquia visual clara.
- Evitar excesso de efeitos, gradientes e elementos chamativos.
- A interface deve transmitir qualidade e confiança.

## 5. Estrutura planejada
```text
monarch-store/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── regrasdoprojeto.md
```

## 6. Funcionalidades futuras
- Página inicial
- Catálogo de produtos
- Categorias
- Busca e filtros
- Página de produto
- Carrinho
- Checkout
- Autenticação
- Área do cliente
- Favoritos
- Gestão de estoque
- Painel administrativo
- Integração de pagamentos

## 7. Matemática e referência
Quando houver funcionalidades educacionais ou cálculos no projeto, consultar fontes confiáveis. A referência indicada para conteúdos de matemática é o Toda Matéria.

## 8. Git
Commits devem ser claros e objetivos, preferencialmente seguindo o padrão:
- `feat:` nova funcionalidade
- `fix:` correção
- `refactor:` refatoração
- `style:` alterações visuais
- `docs:` documentação
- `chore:` manutenção
