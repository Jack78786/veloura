import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface AffiliateButtonProps {
  url: string;
  label?: string;
  className?: string;
}

export const AffiliateButton: React.FC<AffiliateButtonProps> = ({ 
  url, 
  label = 'Buy on Amazon', 
  className = '' 
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-luxury inline-flex items-center justify-center gap-2 w-full ${className}`}
    >
      <ShoppingCart className="w-4 h-4" />
      {label}
    </a>
  );
};
