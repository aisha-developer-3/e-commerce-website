import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminLayout } from './AdminLayout';
import { Product } from '../../types';

export const AdminProductsView: React.FC = () => {
  const { products, addProduct, deleteProduct, categories } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const [form, setForm] = useState({
    name: '',
    sku: '',
    description: '',
    categoryId: categories[0]?.id || 'cat-leather',
    categoryName: categories[0]?.name || 'Leather Goods',
    price: 250,
    stockQuantity: 10,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find((c) => c.id === form.categoryId);
    if (editProduct) {
        updateProduct(editProduct.id, {
            ...form,
            categoryName: cat ? cat.name : 'Curated',
            price: Number(form.price),
            stockQuantity: Number(form.stockQuantity),
            imageUrls: [form.imageUrl],
        });
        setEditProduct(null);
    } else {
        addProduct({
            name: form.name,
            slug: form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            sku: form.sku || `ATL-${Math.floor(100 + Math.random() * 900)}`,
            description: form.description,
            categoryId: form.categoryId,
            categoryName: cat ? cat.name : 'Curated',
            price: Number(form.price),
            stockQuantity: Number(form.stockQuantity),
            imageUrls: [form.imageUrl],
            status: 'active',
            materials: ['Handcrafted', 'Solid Hardware'],
        });
    }
    setForm({
      name: '',
      sku: '',
      description: '',
      categoryId: categories[0]?.id || 'cat-leather',
      categoryName: categories[0]?.name || 'Leather Goods',
      price: 250,
      stockQuantity: 10,
      imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    });
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#26201c]">Product Catalog</h2>
            <p className="text-sm text-[#61564d] mt-1">
              Curate architectural artifacts, set luxury pricing, and manage real-time inventory.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-[#26201c] hover:bg-[#b86b43] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Add New Product</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-md">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-[#9e9187]">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products by name, category, or SKU..."
              className="w-full h-11 pl-11 pr-4 bg-white border border-[#ede4d8] rounded-xl text-sm text-[#26201c] placeholder:text-[#9e9187] focus:outline-none focus:border-[#b86b43]"
            />
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white border border-[#ede4d8] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#ede4d8] text-xs font-bold uppercase tracking-wider text-[#61564d] bg-[#faf6f0]">
                  <th className="py-3.5 px-4 rounded-l-xl">Artifact</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price (USD)</th>
                  <th className="py-3.5 px-4">In Stock</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ede4d8]/60 text-sm">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#faf6f0]/70 transition-colors">
                    <td className="py-4 px-4 flex items-center gap-3">
                      <img
                        src={p.imageUrls[0]}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded-xl border border-[#ede4d8] shrink-0"
                      />
                      <div>
                        <p className="font-bold text-sm text-[#26201c]">{p.name}</p>
                        <p className="text-xs text-[#61564d] font-mono">{p.sku}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-[#61564d]">{p.categoryName}</td>
                    <td className="py-4 px-4 font-bold text-base text-[#26201c]">${p.price}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                          p.stockQuantity <= 5
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-[#faf6f0] text-[#26201c] border border-[#ede4d8]'
                        }`}
                      >
                        {p.stockQuantity} units
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-xs uppercase font-bold tracking-wider">
                        Active
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                            setEditProduct(p);
                            setForm({
                                name: p.name,
                                sku: p.sku,
                                description: p.description,
                                categoryId: p.categoryId,
                                categoryName: p.categoryName,
                                price: p.price,
                                stockQuantity: p.stockQuantity,
                                imageUrl: p.imageUrls[0],
                            });
                            setIsModalOpen(true);
                        }}
                        className="px-2 py-1 text-[10px] bg-[#faf6f0] text-[#61564d] border border-[#ede4d8] rounded-md font-bold uppercase tracking-wider cursor-pointer hover:bg-[#ede4d8]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="px-2 py-1 text-[10px] text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors font-bold uppercase tracking-wider cursor-pointer border border-red-100"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Product Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-[#26201c]/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#faf6f0] border border-[#ede4d8] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl flex flex-col gap-6 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#ede4d8]">
                <h3 className="font-serif text-2xl font-bold text-[#26201c]">{editProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <button
                  onClick={() => {
                      setIsModalOpen(false);
                      setEditProduct(null);
                  }}
                  className="w-8 h-8 rounded-full bg-white border border-[#ede4d8] flex items-center justify-center text-[#61564d] hover:text-[#26201c] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-[#26201c]">Product Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Florentine Marble Catchall"
                    className="h-11 px-3 bg-white border border-[#ede4d8] rounded-xl text-sm text-[#26201c] focus:outline-none focus:border-[#b86b43]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-[#26201c]">Price ($ USD)</label>
                    <input
                      type="number"
                      required
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                      className="h-11 px-3 bg-white border border-[#ede4d8] rounded-xl text-sm text-[#26201c] focus:outline-none focus:border-[#b86b43]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-[#26201c]">Initial Stock</label>
                    <input
                      type="number"
                      required
                      value={form.stockQuantity}
                      onChange={(e) => setForm({ ...form, stockQuantity: Number(e.target.value) })}
                      className="h-11 px-3 bg-white border border-[#ede4d8] rounded-xl text-sm text-[#26201c] focus:outline-none focus:border-[#b86b43]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-[#26201c]">Category</label>
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="h-11 px-3 bg-white border border-[#ede4d8] rounded-xl text-sm text-[#26201c] focus:outline-none focus:border-[#b86b43]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-[#26201c]">Image URL</label>
                  <input
                    type="url"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    className="h-11 px-3 bg-white border border-[#ede4d8] rounded-xl text-sm text-[#26201c] focus:outline-none focus:border-[#b86b43]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-[#26201c]">Description</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Handcrafted in limited editions..."
                    className="p-3 bg-white border border-[#ede4d8] rounded-xl text-sm text-[#26201c] focus:outline-none focus:border-[#b86b43]"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#ede4d8]">
                  <button
                    type="button"
                    onClick={() => {
                        setIsModalOpen(false);
                        setEditProduct(null);
                    }}
                    className="px-5 py-2.5 bg-white border border-[#ede4d8] rounded-xl text-xs font-bold uppercase tracking-wider text-[#61564d] hover:text-[#26201c]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#26201c] hover:bg-[#b86b43] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    {editProduct ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
