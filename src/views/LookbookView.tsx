import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PINS } from '../constants';
import { PinCard } from '../components/PinCard';
import { Pin } from '../types';

export const LookbookView = () => {
  const [filter, setFilter] = useState<Pin['type'] | 'all'>('all');

  const filteredPins = filter === 'all' ? PINS : PINS.filter(p => p.type === filter);

  const filters: { name: string; value: Pin['type'] | 'all' }[] = [
    { name: 'All Inspiration', value: 'all' },
    { name: 'Shop the Look', value: 'shop-look' },
    { name: 'Outfit Inspiration', value: 'inspiration' },
    { name: 'Product Pins', value: 'product' },
  ];

  return (
    <main className="pt-32 min-h-screen bg-veloura-beige/30">
      <section className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-veloura-gold font-bold mb-6 block">Inspiration</span>
          <h1 className="text-5xl md:text-6xl font-serif mb-8 italic">Veloura Lookbook</h1>
          <p className="text-gray-500 max-w-2xl mx-auto mb-12">
            Explore our curated collection of outfit inspirations and shoppable looks. Click on the pins to discover the products that define our signature style.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-6 py-2 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 rounded-full border ${
                  filter === f.value
                    ? 'bg-veloura-ink text-white border-veloura-ink'
                    : 'bg-white text-veloura-ink border-gray-200 hover:border-veloura-gold hover:text-veloura-gold'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredPins.map((pin) => (
            <PinCard key={pin.id} pin={pin} />
          ))}
        </div>

        {filteredPins.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 font-serif italic text-xl">No pins found for this category.</p>
          </div>
        )}
      </section>
    </main>
  );
};
