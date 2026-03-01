import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useProducts } from '../context/ProductContext';
import { Product, Category } from '../types';
import { Plus, Edit2, Trash2, X, Upload, ExternalLink, Save, LogOut, Mail, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const AdminView = () => {
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
      }
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Form State
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    description: '',
    image: '',
    category: 'Bags',
    affiliateUrl: '',
    isFeatured: false,
  });

  const categories: Category[] = ['Bags', 'Clothes', 'Shoes', 'Lingerie'];

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if Supabase is configured
    const isConfigured = 
      import.meta.env.VITE_SUPABASE_URL && 
      !import.meta.env.VITE_SUPABASE_URL.includes('placeholder');

    if (!isConfigured) {
      // Demo Mode: Always allow access if email and password are provided
      if (email && password) {
        // Automatically save these as the "saved" credentials for this browser
        localStorage.setItem('demo_admin_email', email);
        localStorage.setItem('demo_admin_password', password);
        setIsAuthenticated(true);
        return;
      }
      setError('Please enter an email and password.');
      return;
    }

    setIsLoggingIn(true);
    setError('');
    
    try {
      if (isSignUp) {
        const { error: authError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (authError) throw authError;
        setError('Check your email for the confirmation link!');
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) throw authError;
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <main className="pt-32 pb-24 min-h-screen bg-veloura-beige flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl text-center"
        >
          <div className="w-16 h-16 bg-veloura-beige rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-veloura-gold" />
          </div>
          <h1 className="text-3xl font-serif mb-2">{isSignUp ? 'Create Admin Account' : 'Admin Access'}</h1>
          <p className="text-gray-500 text-sm mb-8">
            {(!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) 
              ? 'Demo Mode: Enter any email and password to access the dashboard.' 
              : (isSignUp ? 'Register your administrative credentials.' : 'Please enter your administrative credentials to manage the store.')}
          </p>
          
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-4 text-left">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 p-4 pl-12 text-sm rounded-xl focus:ring-1 focus:ring-veloura-gold outline-none"
                    placeholder="milille59000@gmail.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Password</label>
                  <button 
                    type="button"
                    onClick={() => {
                      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
                        setError('In Demo Mode, you can use any password!');
                      } else {
                        setError('To reset your password, please use the Supabase Dashboard or check your email for a reset link if configured.');
                      }
                    }}
                    className="text-[9px] uppercase tracking-widest font-bold text-veloura-gold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 p-4 pl-12 text-sm rounded-xl focus:ring-1 focus:ring-veloura-gold outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              {error && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`${error.includes('Check your email') ? 'text-green-600' : 'text-red-500'} text-[10px] mt-1 uppercase tracking-wider font-bold`}
                >
                  {error}
                </motion.p>
              )}
            </div>
            
            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="btn-luxury w-full py-4 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoggingIn ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                isSignUp ? 'Create Account' : 'Enter Dashboard'
              )}
            </button>

            {/* Demo Access Button for preview */}
            {(!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) && !isSignUp && (
              <button
                type="button"
                onClick={() => {
                  const savedEmail = localStorage.getItem('demo_admin_email') || 'milille59000@gmail.com';
                  const savedPass = localStorage.getItem('demo_admin_password') || 'Muhammad@2026';
                  setEmail(savedEmail);
                  setPassword(savedPass);
                  setIsAuthenticated(true);
                }}
                className="w-full py-3 text-[10px] uppercase tracking-widest font-bold text-gray-400 border border-dashed border-gray-200 rounded-xl hover:bg-gray-50 hover:text-veloura-gold hover:border-veloura-gold transition-all"
              >
                Demo Access (Saved Credentials)
              </button>
            )}
          </form>

          {(!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) ? null : (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-[10px] uppercase tracking-widest font-bold text-veloura-gold hover:text-veloura-ink transition-colors"
              >
                {isSignUp ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
              </button>
            </div>
          )}

          <p className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
            Authorized access only. All activities are monitored for security purposes.
          </p>
        </motion.div>
      </main>
    );
  }

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category,
        affiliateUrl: product.affiliateUrl,
        isFeatured: product.isFeatured || false,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: 0,
        description: '',
        image: '',
        category: 'Bags',
        affiliateUrl: '',
        isFeatured: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await addProduct(formData);
      }
      setIsModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  };

  return (
    <main className="pt-32 pb-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-serif mb-2">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">Manage your Veloura store inventory and products.</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleOpenModal()}
              className="btn-luxury flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </button>
            <button
              onClick={handleLogout}
              className="p-3 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {(!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) && (
          <div className="bg-veloura-beige p-6 rounded-xl mb-12 border border-veloura-gold/20">
            <h3 className="text-sm font-serif italic mb-2">Demo Mode Active</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              You are currently in Demo Mode. Any products you add, edit, or delete are saved <strong>locally to this browser only</strong>. 
              To sync your products across all devices (like your mobile phone), you will need to connect a Supabase database.
            </p>
          </div>
        )}

        {/* Product List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">Product</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">Category</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-500">Price</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-4 h-4 border-2 border-veloura-gold border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Loading Inventory...</span>
                      </div>
                    </td>
                  </tr>
                ) : products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-sm object-cover bg-gray-100"
                        />
                        <div>
                          <p className="text-sm font-medium text-veloura-ink">{product.name}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[200px]">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-veloura-beige text-veloura-ink text-[10px] uppercase tracking-widest font-bold rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-2 text-gray-400 hover:text-veloura-gold transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-400 italic">No products found. Start by adding one.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h2 className="text-2xl font-serif">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Product Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Silk Evening Gown"
                      className="w-full bg-gray-50 border border-gray-200 p-3 text-sm rounded-lg focus:ring-1 focus:ring-veloura-gold outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Price ($)</label>
                    <input
                      required
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      placeholder="299"
                      className="w-full bg-gray-50 border border-gray-200 p-3 text-sm rounded-lg focus:ring-1 focus:ring-veloura-gold outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Category</label>
                  <div className="flex flex-wrap gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold rounded-full border transition-all ${
                          formData.category === cat
                            ? 'bg-veloura-ink text-white border-veloura-ink'
                            : 'bg-white text-gray-500 border-gray-200 hover:border-veloura-gold hover:text-veloura-gold'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Product Image</label>
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="flex-grow w-full space-y-4">
                      <div className="space-y-1">
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest">Image URL</p>
                        <input
                          required
                          type="url"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full bg-gray-50 border border-gray-200 p-3 text-sm rounded-lg focus:ring-1 focus:ring-veloura-gold outline-none"
                        />
                      </div>
                      <p className="text-[10px] text-gray-400 italic leading-relaxed">
                        Provide a direct link to a high-quality image. We recommend portrait orientation (3:4 aspect ratio) for the best luxury aesthetic.
                      </p>
                    </div>
                    <div className="w-32 h-40 shrink-0 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl overflow-hidden flex items-center justify-center relative group">
                      {formData.image ? (
                        <img 
                          src={formData.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/300x400?text=Invalid+URL';
                          }}
                        />
                      ) : (
                        <div className="text-center p-2">
                          <Upload className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                          <p className="text-[8px] text-gray-400 uppercase tracking-widest font-bold">Preview</p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-[8px] text-white uppercase tracking-widest font-bold">Live Preview</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Amazon Affiliate Link</label>
                  <input
                    required
                    type="url"
                    value={formData.affiliateUrl}
                    onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
                    placeholder="https://amazon.com/..."
                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm rounded-lg focus:ring-1 focus:ring-veloura-gold outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Short Description</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the product elegance..."
                    className="w-full bg-gray-50 border border-gray-200 p-3 text-sm rounded-lg focus:ring-1 focus:ring-veloura-gold outline-none resize-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 accent-veloura-gold"
                  />
                  <label htmlFor="isFeatured" className="text-[10px] uppercase tracking-widest font-bold text-gray-500 cursor-pointer">
                    Feature on Homepage
                  </label>
                </div>

                <div className="pt-6 flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-luxury flex-grow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {editingProduct ? 'Update Product' : 'Save Product'}
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setIsModalOpen(false)}
                    className="btn-outline flex-grow disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};
