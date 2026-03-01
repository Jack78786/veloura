import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useProducts } from '../context/ProductContext';
import { Product, Category } from '../types';
import { Plus, Edit2, Trash2, X, Upload, ExternalLink, Save } from 'lucide-react';

export const AdminView = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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

  const categories: Category[] = ['Bags', 'Clothes', 'Shoes', 'Accessories'];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
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
          <button
            onClick={() => handleOpenModal()}
            className="btn-luxury flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Product
          </button>
        </div>

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
                {products.map((product) => (
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
                    className="btn-luxury flex-grow flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" /> {editingProduct ? 'Update Product' : 'Save Product'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-outline flex-grow"
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
