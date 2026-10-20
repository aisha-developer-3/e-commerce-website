import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminLayout } from './AdminLayout';
import { Category } from '../../types';

export const AdminCategoriesView: React.FC = () => {
  const { categories, products, updateCategory } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: '', description: '', imageUrl: '' });

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (editCategory) {
          updateCategory(editCategory.id, form);
      }
      setIsModalOpen(false);
      setEditCategory(null);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8 pb-12">
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#26201c]">Department Categories</h2>
          <p className="text-sm text-[#61564d] mt-1">
            Manage architectural department curations, gallery groupings, and catalog taxonomy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const count = products.filter((p) => p.categoryId === cat.id).length;
            return (
              <div
                key={cat.id}
                className="bg-white border border-[#ede4d8] rounded-2xl p-6 shadow-xs flex flex-col gap-4"
              >
                <div className="aspect-[16/9] bg-[#faf6f0] overflow-hidden rounded-xl border border-[#ede4d8]">
                  <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#26201c]">{cat.name}</h3>
                  <p className="text-sm text-[#61564d] mt-1 leading-relaxed">{cat.description}</p>
                </div>
                <div className="pt-4 border-t border-[#ede4d8] flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#61564d]">
                  <span className="font-mono text-[#26201c]">{count} artifacts assigned</span>
                  <button
                    onClick={() => {
                        setEditCategory(cat);
                        setForm({ name: cat.name, description: cat.description, imageUrl: cat.imageUrl });
                        setIsModalOpen(true);
                    }}
                    className="px-2 py-1 bg-[#faf6f0] text-[#26201c] border border-[#ede4d8] rounded-md hover:bg-[#ede4d8] cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {isModalOpen && editCategory && (
          <div className="fixed inset-0 z-50 bg-[#26201c]/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-[#faf6f0] border border-[#ede4d8] rounded-3xl p-6 sm:p-8 max-w-lg w-full">
                  <h3 className="font-serif text-2xl font-bold mb-4">Edit Category</h3>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="h-11 px-3 bg-white border border-[#ede4d8] rounded-xl" />
                      <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="p-3 bg-white border border-[#ede4d8] rounded-xl" />
                      <input type="url" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className="h-11 px-3 bg-white border border-[#ede4d8] rounded-xl" />
                      <div className="flex justify-end gap-3 pt-3">
                          <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-white border border-[#ede4d8] rounded-xl">Cancel</button>
                          <button type="submit" className="px-6 py-2.5 bg-[#26201c] text-white rounded-xl">Save</button>
                      </div>
                  </form>
              </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
