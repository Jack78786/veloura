export type Category = 'Bags' | 'Clothes' | 'Shoes' | 'Lingerie';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: Category;
  affiliateUrl: string;
  isFeatured?: boolean;
}

export interface Hotspot {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  productId: string;
}

export interface Pin {
  id: string;
  title: string;
  image: string;
  type: 'product' | 'inspiration' | 'shop-look';
  hotspots?: Hotspot[];
  description?: string;
}

export type View = 'home' | 'bags' | 'clothes' | 'shoes' | 'lingerie' | 'about' | 'contact' | 'lookbook';
