import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Category } from '../types';
import { motion } from 'motion/react';

export const CategoryView = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { products } = useProducts();
  
  // Capitalize first letter
  const formattedCategory = categoryName 
    ? (categoryName.charAt(0).toUpperCase() + categoryName.slice(1)) as Category
    : 'Bags' as Category;

  const filteredProducts = products.filter(p => p.category === formattedCategory);

  const categoryHeroImages: Record<string, string> = {
    Bags: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=2000',
    Clothes: 'https://images.unsplash.com/photo-1539109132314-34a9c6553876?auto=format&fit=crop&q=80&w=2000',
    Shoes: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=2000',
    Lingerie: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&q=80&w=2000',
  };

  return (
    <main className="pt-24">
      {/* Category Header */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden mb-16">
        <div className="absolute inset-0 z-0">
          <img
            src={categoryHeroImages[formattedCategory] || categoryHeroImages.Bags}
            alt={formattedCategory}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif tracking-widest uppercase italic"
          >
            {formattedCategory}
          </motion.h1>
          <div className="w-20 h-px bg-white mx-auto mt-6"></div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex justify-between items-center mb-12 border-b border-gray-200 pb-6">
          <p className="text-xs uppercase tracking-widest text-gray-500">
            Showing {filteredProducts.length} items
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest font-bold">Sort By:</span>
            <select className="bg-transparent text-[10px] uppercase tracking-widest font-bold focus:outline-none cursor-pointer">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 font-serif italic text-xl">Coming soon to the {formattedCategory} collection.</p>
          </div>
        )}
      </section>
    </main>
  );
};
