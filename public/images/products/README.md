# Imagens locais de produtos Monarch

Esta pasta é o ponto de entrada para os assets próprios dos produtos. Cada produto deve ter uma subpasta com o mesmo identificador estável usado no campo `slug`.

Exemplo:

```text
public/images/products/camisa-oxford/
├── frente.webp
├── costas.webp
└── detalhe.webp
```

No mock do produto, preencha `images` com os caminhos públicos correspondentes:

```ts
images: [
  '/images/products/camisa-oxford/frente.webp',
  '/images/products/camisa-oxford/costas.webp',
  '/images/products/camisa-oxford/detalhe.webp',
]
```

A galeria e o `ProductCard` já consomem esse array. Enquanto os assets próprios não forem adicionados, o sistema mantém o fallback editorial atual centralizado em `src/data/media.ts`.
