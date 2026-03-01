import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pin, Product } from '../types';
import { PRODUCTS } from '../constants';
import { ShoppingCart, Plus, X } from 'lucide-react';
import { AffiliateButton } from './AffiliateButton';

interface PinCardProps {
  pin: Pin;
}

export const PinCard: React.FC<PinCardProps> = ({ pin }) => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const getProduct = (id: string) => PRODUCTS.find(p => p.id === id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative group break-inside-avoid mb-8 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={pin.image}
          alt={pin.title}
          referrerPolicy="no-referrer"
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hotspots for "Shop this look" */}
        {pin.type === 'shop-look' && pin.hotspots?.map((hotspot, idx) => {
          const product = getProduct(hotspot.productId);
          if (!product) return null;

          return (
            <div
              key={idx}
              className="absolute z-10"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot === product.id ? null : product.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeHotspot === product.id ? 'bg-veloura-gold scale-110' : 'bg-white/80 backdrop-blur-sm hover:bg-white'
                } shadow-lg`}
              >
                {activeHotspot === product.id ? <X className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-veloura-ink" />}
              </button>

              <AnimatePresence>
                {activeHotspot === product.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className="absolute top-10 left-1/2 -translate-x-1/2 w-48 bg-white p-4 shadow-xl rounded-sm z-20"
                  >
                    <div className="text-center">
                      <img src={product.image} alt={product.name} className="w-full h-24 object-cover mb-2 rounded-sm" />
                      <h4 className="text-xs font-serif font-bold mb-1">{product.name}</h4>
                      <p className="text-[10px] text-gray-500 mb-2">${product.price}</p>
                      <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold text-veloura-gold border-b border-veloura-gold pb-0.5"
                      >
                        Shop Now
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Badge for Type */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/80 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-widest font-bold rounded-full shadow-sm">
            {pin.type === 'shop-look' ? 'Shop the Look' : pin.type === 'inspiration' ? 'Inspiration' : 'Product'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-serif mb-2 group-hover:text-veloura-gold transition-colors">{pin.title}</h3>
        {pin.description && (
          <p className="text-xs text-gray-500 leading-relaxed mb-4">{pin.description}</p>
        )}
        
        {pin.type === 'product' && (
          <div className="mt-2">
            <AffiliateButton url="#" label="View Product" className="py-2 text-[10px]" />
          </div>
        )}
      </div>
    </motion.div>
  );
};
