import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Lookbook', path: '/lookbook' },
    { name: 'Bags', path: '/bags' },
    { name: 'Clothes', path: '/clothes' },
    { name: 'Shoes', path: '/shoes' },
    { name: 'Accessories', path: '/accessories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-effect py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setIsOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link to="/" className="text-3xl font-serif tracking-widest uppercase hover-gold">
          Veloura
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-xs uppercase tracking-widest font-medium hover-gold transition-colors ${location.pathname === link.path ? 'text-veloura-gold' : 'text-veloura-ink'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button className="hover-gold transition-colors">
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-veloura-beige z-[60] lg:hidden flex flex-col p-8"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col space-y-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-serif tracking-widest uppercase hover-gold"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="mt-auto flex justify-center space-x-8 pb-8">
              <Instagram className="w-6 h-6 hover-gold cursor-pointer" />
              <Facebook className="w-6 h-6 hover-gold cursor-pointer" />
              <Twitter className="w-6 h-6 hover-gold cursor-pointer" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-veloura-ink text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <h3 className="text-2xl font-serif tracking-widest uppercase mb-6">Veloura</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            Redefining luxury fashion with a commitment to elegance, quality, and the empowerment of women worldwide.
          </p>
          <div className="flex space-x-4">
            <Instagram className="w-5 h-5 hover:text-veloura-gold cursor-pointer transition-colors" />
            <Facebook className="w-5 h-5 hover:text-veloura-gold cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 hover:text-veloura-gold cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">Shop</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/lookbook" className="hover:text-white transition-colors">Lookbook</Link></li>
            <li><Link to="/bags" className="hover:text-white transition-colors">Bags</Link></li>
            <li><Link to="/clothes" className="hover:text-white transition-colors">Clothes</Link></li>
            <li><Link to="/shoes" className="hover:text-white transition-colors">Shoes</Link></li>
            <li><Link to="/accessories" className="hover:text-white transition-colors">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">Newsletter</h4>
          <p className="text-sm text-gray-400 mb-6">Join our list for exclusive previews and offers.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent border-b border-gray-700 py-2 text-sm focus:outline-none focus:border-veloura-gold w-full"
            />
            <button className="ml-4 text-xs uppercase tracking-widest font-semibold hover:text-veloura-gold transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-gray-800 text-center">
        <p className="text-xs text-gray-500 tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Veloura Fashion. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
