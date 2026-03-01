import { Product, Pin } from './types';

export const PRODUCTS: Product[] = [
  // Bags
  {
    id: 'b1',
    name: 'Seraphina Leather Tote',
    price: 345,
    description: 'Handcrafted Italian leather with gold-tone hardware. Perfect for the modern woman.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    category: 'Bags',
    affiliateUrl: 'https://www.amazon.com/s?k=luxury+leather+tote+bag',
    isFeatured: true,
  },
  {
    id: 'b2',
    name: 'Luna Crossbody',
    price: 185,
    description: 'Minimalist design with a versatile strap. Ideal for evening outings.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    category: 'Bags',
    affiliateUrl: 'https://www.amazon.com/s?k=minimalist+crossbody+bag',
  },
  {
    id: 'b3',
    name: 'Aurelia Clutch',
    price: 120,
    description: 'Elegant satin finish with a delicate chain strap. A timeless piece.',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fd113f0d?auto=format&fit=crop&q=80&w=800',
    category: 'Bags',
    affiliateUrl: 'https://www.amazon.com/s?k=elegant+clutch+bag',
  },
  // Clothes
  {
    id: 'c1',
    name: 'Silk Slip Dress',
    price: 210,
    description: '100% pure mulberry silk. Effortlessly elegant for any occasion.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
    category: 'Clothes',
    affiliateUrl: 'https://www.amazon.com/s?k=silk+slip+dress',
    isFeatured: true,
  },
  {
    id: 'c2',
    name: 'Cashmere Oversized Knit',
    price: 275,
    description: 'Ultra-soft Mongolian cashmere. The ultimate in luxury comfort.',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800',
    category: 'Clothes',
    affiliateUrl: 'https://www.amazon.com/s?k=cashmere+knit+sweater',
  },
  {
    id: 'c3',
    name: 'Tailored Linen Blazer',
    price: 195,
    description: 'Breathable linen with a sharp, feminine silhouette.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    category: 'Clothes',
    affiliateUrl: 'https://www.amazon.com/s?k=tailored+linen+blazer',
  },
  // Shoes
  {
    id: 's1',
    name: 'Velvet Stiletto',
    price: 240,
    description: 'Deep blush velvet with a sleek pointed toe. Height of sophistication.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
    category: 'Shoes',
    affiliateUrl: 'https://www.amazon.com/s?k=velvet+stiletto+heels',
    isFeatured: true,
  },
  {
    id: 's2',
    name: 'Minimalist Leather Slide',
    price: 95,
    description: 'Clean lines and premium leather for effortless summer style.',
    image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&q=80&w=800',
    category: 'Shoes',
    affiliateUrl: 'https://www.amazon.com/s?k=leather+slides+women',
  },
  // Lingerie
  {
    id: 'a1',
    name: 'Seamless Nursing Bra',
    price: 45,
    description: 'Ultra-soft, seamless nursing bra designed for ultimate comfort and support. Features one-hand access clips for easy feeding.',
    image: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&q=80&w=800',
    category: 'Lingerie',
    affiliateUrl: 'https://www.amazon.com/s?k=seamless+nursing+bra',
    isFeatured: true,
  },
  {
    id: 'a2',
    name: 'Silk Lace Slip',
    price: 85,
    description: 'Elegant silk slip with delicate lace detailing. Perfect for lounging or layering.',
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=800',
    category: 'Lingerie',
    affiliateUrl: 'https://www.amazon.com/s?k=silk+lace+slip',
  },
];

export const PINS: Pin[] = [
  {
    id: 'p1',
    title: 'Autumn Elegance',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    type: 'inspiration',
    description: 'The perfect blend of warm tones and sharp silhouettes for the transition into fall.',
  },
  {
    id: 'p2',
    title: 'The Seraphina Collection',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    type: 'product',
    description: 'Handcrafted Italian leather with gold-tone hardware.',
  },
  {
    id: 'p3',
    title: 'Street Style Sophistication',
    image: 'https://images.unsplash.com/photo-1539109132314-34a9c6553876?auto=format&fit=crop&q=80&w=800',
    type: 'shop-look',
    hotspots: [
      { x: 50, y: 40, productId: 'c3' }, // Blazer
      { x: 45, y: 70, productId: 'b1' }, // Tote
    ],
    description: 'Elevate your daily commute with our tailored linen blazer and signature tote.',
  },
  {
    id: 'p4',
    title: 'Evening Radiance',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
    type: 'shop-look',
    hotspots: [
      { x: 50, y: 50, productId: 'c1' }, // Silk Dress
      { x: 60, y: 30, productId: 'a1' }, // Gold Bracelet
    ],
    description: 'A look that transitions seamlessly from dinner to the dance floor.',
  },
  {
    id: 'p5',
    title: 'Modern Minimalist',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    type: 'product',
    description: 'Clean lines and premium materials for the modern wardrobe.',
  },
  {
    id: 'p6',
    title: 'Weekend Getaway',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800',
    type: 'inspiration',
    description: 'Comfort meets style in our curated weekend essentials.',
  },
];
