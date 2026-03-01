import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { motion } from 'motion/react';

export const FloatingAdminButton = () => {
  const location = useLocation();
  
  // Don't show the floating button if we are already on the admin page
  if (location.pathname === '/admin') return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100]"
    >
      <Link
        to="/admin"
        className="flex items-center justify-center w-14 h-14 bg-veloura-ink text-white rounded-full shadow-2xl hover:bg-veloura-gold transition-colors group"
        title="Admin Dashboard"
      >
        <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
      </Link>
    </motion.div>
  );
};
