import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './components/Navigation';
import { HomeView } from './views/HomeView';
import { CategoryView } from './views/CategoryView';
import { AboutView, ContactView } from './views/OtherViews';
import { LookbookView } from './views/LookbookView';
import { AdminView } from './views/AdminView';
import { ProductProvider } from './context/ProductContext';
import { FloatingAdminButton } from './components/FloatingAdminButton';
import { AnimatePresence } from 'motion/react';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <ProductProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/lookbook" element={<LookbookView />} />
                <Route path="/admin" element={<AdminView />} />
                <Route path="/:categoryName" element={<CategoryView />} />
                <Route path="/about" element={<AboutView />} />
                <Route path="/contact" element={<ContactView />} />
              </Routes>
            </AnimatePresence>
          </div>
          <FloatingAdminButton />
          <Footer />
        </div>
      </Router>
    </ProductProvider>
  );
}
