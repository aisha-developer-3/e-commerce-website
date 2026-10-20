import React from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminLayout } from './AdminLayout';

export const AdminDiscountsView: React.FC = () => {
  const { discounts } = useStore();

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8 pb-12">
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#26201c]">Promotional Vouchers</h2>
          <p className="text-sm text-[#61564d] mt-1">
            Active salon promotion codes, percentage vouchers, and minimum purchase thresholds.
          </p>
        </div>

        <div className="bg-white border border-[#ede4d8] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#ede4d8] text-xs font-bold uppercase tracking-wider text-[#61564d] bg-[#faf6f0]">
                  <th className="py-3.5 px-4 rounded-l-xl">Voucher Code</th>
                  <th className="py-3.5 px-4">Discount Type</th>
                  <th className="py-3.5 px-4">Discount Value</th>
                  <th className="py-3.5 px-4">Minimum Order</th>
                  <th className="py-3.5 px-4 text-right rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ede4d8]/60 text-sm">
                {discounts.map((d) => (
                  <tr key={d.id} className="hover:bg-[#faf6f0]/70 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-base text-[#26201c]">
                      <span className="px-3 py-1 bg-[#faf6f0] border border-[#ede4d8] rounded-lg">
                        {d.code}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-xs uppercase tracking-wider text-[#61564d]">{d.type}</td>
                    <td className="py-4 px-4 font-bold text-base text-[#b86b43]">
                      {d.type === 'percentage' ? `${d.value}% OFF` : `$${d.value} USD OFF`}
                    </td>
                    <td className="py-4 px-4 font-medium text-sm text-[#61564d]">
                      {d.minOrderValue ? `$${d.minOrderValue} USD` : 'No Minimum'}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider">
                        {d.active ? 'Active' : 'Expired'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
