import React from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminLayout } from './AdminLayout';

export const AdminInventoryView: React.FC = () => {
  const { products, updateStock } = useStore();

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8 pb-12">
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#26201c]">Inventory & Stock Ledger</h2>
          <p className="text-sm text-[#61564d] mt-1">
            Monitor real-time workshop tranche levels, low-stock notifications, and instant replenishments.
          </p>
        </div>

        <div className="bg-white border border-[#ede4d8] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#ede4d8] text-xs font-bold uppercase tracking-wider text-[#61564d] bg-[#faf6f0]">
                  <th className="py-3.5 px-4 rounded-l-xl">Artifact</th>
                  <th className="py-3.5 px-4">SKU</th>
                  <th className="py-3.5 px-4">Stock Quantity</th>
                  <th className="py-3.5 px-4">Stock Level</th>
                  <th className="py-3.5 px-4 text-right rounded-r-xl">Instant Restock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ede4d8]/60 text-sm">
                {products.map((p) => {
                  const isLow = p.stockQuantity <= 5;
                  return (
                    <tr key={p.id} className="hover:bg-[#faf6f0]/70 transition-colors">
                      <td className="py-4 px-4 flex items-center gap-3">
                        <img
                          src={p.imageUrls[0]}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover border border-[#ede4d8] shrink-0"
                        />
                        <div>
                          <p className="font-bold text-sm text-[#26201c]">{p.name}</p>
                          <p className="text-xs text-[#61564d]">{p.categoryName}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-mono font-semibold text-xs text-[#61564d]">{p.sku}</td>
                      <td className="py-4 px-4 font-bold text-base text-[#26201c]">
                        {p.stockQuantity} units
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            isLow
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}
                        >
                          {isLow ? 'Low Stock Warning' : 'Optimal Level'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => updateStock(p.id, Math.max(0, p.stockQuantity - 1))}
                            className="w-8 h-8 flex items-center justify-center bg-white hover:bg-red-50 text-red-600 border border-[#ede4d8] rounded-lg transition-colors font-bold text-sm cursor-pointer"
                            title="Decrease stock by 1"
                          >
                            -
                          </button>
                          <button
                            onClick={() => updateStock(p.id, p.stockQuantity + 5)}
                            className="px-3 h-8 bg-white hover:bg-[#faf6f0] text-[#26201c] border border-[#ede4d8] rounded-lg transition-colors text-xs font-bold uppercase cursor-pointer"
                          >
                            +5
                          </button>
                          <button
                            onClick={() => updateStock(p.id, p.stockQuantity + 10)}
                            className="px-3 h-8 bg-[#26201c] hover:bg-[#b86b43] text-white rounded-lg transition-colors text-xs font-bold uppercase cursor-pointer shadow-2xs"
                          >
                            +10 Restock
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
