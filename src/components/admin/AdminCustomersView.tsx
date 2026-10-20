import React from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminLayout } from './AdminLayout';

export const AdminCustomersView: React.FC = () => {
  const { customers } = useStore();

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8 pb-12">
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#26201c]">Patron & Customer Directory</h2>
          <p className="text-sm text-[#61564d] mt-1">
            Real-time directory of verified clients, live order histories, and patron acquisition values.
          </p>
        </div>

        <div className="bg-white border border-[#ede4d8] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#ede4d8] text-xs font-bold uppercase tracking-wider text-[#61564d] bg-[#faf6f0]">
                  <th className="py-3.5 px-4 rounded-l-xl">Patron Name</th>
                  <th className="py-3.5 px-4">Email Address</th>
                  <th className="py-3.5 px-4">Live Orders</th>
                  <th className="py-3.5 px-4">Total Spent</th>
                  <th className="py-3.5 px-4">Patron Tier</th>
                  <th className="py-3.5 px-4 text-right rounded-r-xl">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ede4d8]/60 text-sm">
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#61564d]">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[44px] text-[#b86b43]/40">group</span>
                        <p className="text-base font-semibold text-[#26201c]">No customer records yet</p>
                        <p className="text-sm text-[#61564d]">Customers will populate here automatically as live purchases occur on the store.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  customers.map((c) => (
                    <tr key={c.id} className="hover:bg-[#faf6f0]/70 transition-colors">
                      <td className="py-4 px-4 font-bold text-base text-[#26201c]">{c.name}</td>
                      <td className="py-4 px-4 font-mono text-sm text-[#61564d]">{c.email}</td>
                      <td className="py-4 px-4 font-medium text-sm text-[#26201c]">
                        {c.orderCount} {c.orderCount === 1 ? 'order' : 'orders'}
                      </td>
                      <td className="py-4 px-4 font-bold text-base text-[#26201c]">
                        ${c.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            c.status === 'vip'
                              ? 'bg-purple-100 text-purple-900 border border-purple-300'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}
                        >
                          {c.status === 'vip' ? 'VIP Patron' : 'Active Patron'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-mono text-xs text-[#61564d]">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
