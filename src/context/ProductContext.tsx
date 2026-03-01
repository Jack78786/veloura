import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../constants';
import { supabase } from '../lib/supabase';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  isDemoMode: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  syncLocalToCloud: () => Promise<{ success: boolean; count: number; error?: string }>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Helper to check if Supabase is configured
  const isSupabaseConfigured = () => {
    return (
      import.meta.env.VITE_SUPABASE_URL && 
      !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')
    );
  };

  // Fetch products from Supabase or LocalStorage on mount
  useEffect(() => {
    const fetchProducts = async () => {
      const configured = isSupabaseConfigured();
      setIsDemoMode(!configured);

      if (!configured) {
        console.warn('Supabase not configured. Using LocalStorage/Initial products.');
        try {
          const savedProducts = localStorage.getItem('veloura_demo_products');
          if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
          } else {
            setProducts(INITIAL_PRODUCTS);
          }
        } catch (e) {
          console.error('LocalStorage access failed:', e);
          setProducts(INITIAL_PRODUCTS);
        }
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setProducts(data);
        } else {
          // If no products in DB, use initial constants
          setProducts(INITIAL_PRODUCTS);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setProducts(INITIAL_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    if (!isSupabaseConfigured()) {
      const demoProduct: Product = {
        ...newProduct,
        id: `demo-${Date.now()}`
      };
      const updatedProducts = [demoProduct, ...products];
      setProducts(updatedProducts);
      localStorage.setItem('veloura_demo_products', JSON.stringify(updatedProducts));
      return;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([newProduct])
        .select();

      if (error) throw error;
      if (data) {
        setProducts((prev) => [data[0], ...prev]);
      }
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product to database.');
    }
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    if (!isSupabaseConfigured()) {
      const updatedProducts = products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
      setProducts(updatedProducts);
      localStorage.setItem('veloura_demo_products', JSON.stringify(updatedProducts));
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .update(updatedFields)
        .eq('id', id);

      if (error) throw error;
      
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
      );
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Failed to update product in database.');
    }
  };

  const deleteProduct = async (id: string) => {
    if (!isSupabaseConfigured()) {
      const updatedProducts = products.filter((p) => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('veloura_demo_products', JSON.stringify(updatedProducts));
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product from database.');
    }
  };

  const syncLocalToCloud = async () => {
    if (!isSupabaseConfigured()) {
      return { success: false, count: 0, error: 'Supabase not configured' };
    }

    try {
      const savedProducts = localStorage.getItem('veloura_demo_products');
      if (!savedProducts) return { success: true, count: 0 };

      const localProducts: Product[] = JSON.parse(savedProducts);
      if (localProducts.length === 0) return { success: true, count: 0 };

      // Filter out products that might already be in DB or have demo IDs
      const productsToUpload = localProducts.map(({ id, ...rest }) => rest);

      const { data, error } = await supabase
        .from('products')
        .insert(productsToUpload)
        .select();

      if (error) throw error;

      // Clear local storage after successful sync
      localStorage.removeItem('veloura_demo_products');
      
      // Refresh products list
      if (data) {
        setProducts((prev) => [...data, ...prev]);
      }

      return { success: true, count: productsToUpload.length };
    } catch (err: any) {
      console.error('Sync failed:', err);
      return { success: false, count: 0, error: err.message || 'Unknown error' };
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, isDemoMode, addProduct, updateProduct, deleteProduct, syncLocalToCloud }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
