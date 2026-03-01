import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Fashion Hero"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.5em] mb-6 font-medium"
        >
          New Collection 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 italic"
        >
          Elegance in Every Detail
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/clothes" className="btn-luxury bg-white text-veloura-ink hover:bg-veloura-gold hover:text-white">
            Shop Collection
          </Link>
          <Link to="/about" className="btn-outline border-white text-white hover:bg-white hover:text-veloura-ink">
            Our Story
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-px h-12 bg-white/50"></div>
      </motion.div>
    </section>
  );
};

export const CategoryPreview = () => {
  const categories = [
    { name: 'Bags', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=800', path: '/bags' },
    { name: 'Clothes', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800', path: '/clothes' },
    { name: 'Shoes', image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=800', path: '/shoes' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?auto=format&fit=crop&q=80&w=800', path: '/accessories' },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif mb-4">Curated Categories</h2>
        <div className="w-20 h-px bg-veloura-gold mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, idx) => (
          <Link key={cat.name} to={cat.path} className="group relative aspect-[4/5] overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.1 }}
              className="w-full h-full"
            >
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-2xl font-serif tracking-widest uppercase mb-4">{cat.name}</h3>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-white pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};
