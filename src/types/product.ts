export type ProductCategory = 'old-money' | 'streetwear' | 'essentials';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  featured?: boolean;
}
