import React from 'react';
import { Hero, CategoryPreview } from '../components/HomeComponents';
import { ProductCard } from '../components/ProductCard';
import { PinCard } from '../components/PinCard';
import { useProducts } from '../context/ProductContext';
import { PINS } from '../constants';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const HomeView = () => {
  const { products, loading } = useProducts();
  const featuredProducts = products.filter(p => p.isFeatured);
  const featuredPins = PINS.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-veloura-beige">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-veloura-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs uppercase tracking-[0.3em] text-veloura-gold font-medium">Loading Veloura</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <Hero />
      
      <CategoryPreview />

      {/* Featured Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-serif mb-4">The Signature Collection</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Discover our most-loved pieces, meticulously crafted to bring timeless elegance to your everyday wardrobe. Each item reflects our commitment to superior quality and sophisticated design.
              </p>
            </div>
            <Link to="/clothes" className="text-xs uppercase tracking-widest font-bold border-b border-veloura-ink pb-1 hover:text-veloura-gold hover:border-veloura-gold transition-all">
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook Preview */}
      <section className="py-24 bg-veloura-beige/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.5em] text-veloura-gold font-bold mb-4 block">Inspiration</span>
            <h2 className="text-4xl font-serif italic mb-6">Veloura Lookbook</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mb-8">
              Discover how to style our latest pieces with our curated lookbook. Shop the entire look with a single click.
            </p>
            <Link to="/lookbook" className="btn-luxury">
              Explore All Inspiration
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPins.map((pin) => (
              <PinCard key={pin.id} pin={pin} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Statement */}
      <section className="py-32 bg-veloura-nude/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-veloura-gold font-bold mb-6 block">Our Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-8 italic">
              "Fashion is not just about what you wear, it's about how you feel. We create pieces that empower the modern woman to embrace her inner elegance."
            </h2>
            <Link to="/about" className="btn-outline">
              Discover Our Story
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};
