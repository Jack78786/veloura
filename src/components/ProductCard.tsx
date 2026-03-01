import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ExternalLink } from 'lucide-react';
import { AffiliateButton } from './AffiliateButton';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group"
    >
      <div className="relative overflow-hidden mb-4 aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-veloura-ink px-6 py-3 text-xs uppercase tracking-widest font-semibold flex items-center gap-2 hover:bg-veloura-gold hover:text-white transition-colors"
          >
            Quick View <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
      <div className="text-center px-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1">{product.category}</p>
        <h3 className="text-lg font-serif mb-1 group-hover:text-veloura-gold transition-colors">{product.name}</h3>
        <p className="text-sm font-medium mb-2">${product.price}</p>
        <p className="text-xs text-gray-500 line-clamp-2 mb-6">{product.description}</p>
        <AffiliateButton url={product.affiliateUrl} />
      </div>
    </motion.div>
  );
};
