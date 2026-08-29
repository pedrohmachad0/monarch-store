import type { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 'monarch-001',
    name: 'Camisa Oxford Monarch',
    slug: 'camisa-oxford-monarch',
    description: 'Camisa masculina de inspiração clássica para composições sofisticadas.',
    price: 189.9,
    category: 'old-money',
    images: [
      '/images/products/camisa-oxford/frente.webp',
      '/images/products/camisa-oxford/costas.webp',
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Azul-marinho'],
    stock: 20,
    featured: true,
  },
  {
    id: 'monarch-002',
    name: 'Camiseta Essential Heavy',
    slug: 'camiseta-essential-heavy',
    description: 'Camiseta de corte limpo para uso diário e combinações streetwear.',
    price: 119.9,
    category: 'essentials',
    images: [],
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Off-white'],
    stock: 35,
    featured: true,
  },
];
