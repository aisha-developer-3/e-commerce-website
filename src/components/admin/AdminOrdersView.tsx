import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminLayout } from './AdminLayout';

export const AdminOrdersView: React.FC = () => {
  const { orders, updateOrderStatus, clearAllOrders } = useStore();
  const [filter, setFilter] = useState<string>('all');

  const filteredOrders = orders.filter((o) => {
    if (filter === 'all') return true;
    return o.fulfillmentStatus === filter;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#26201c]">Order Management</h2>
            <p className="text-sm text-[#61564d] mt-1">
              Review live customer acquisitions, update real-time fulfillment status, and track shipments.
            </p>
          </div>

          {orders.length > 0 && (
            <button
              onClick={clearAllOrders}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 border border-red-300 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Clear All Orders
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                filter === status
                  ? 'bg-[#26201c] text-white shadow-xs'
                  : 'bg-white border border-[#ede4d8] text-[#61564d] hover:text-[#26201c] hover:bg-[#faf6f0]'
              }`}
            >
              {status} ({status === 'all' ? orders.length : orders.filter((o) => o.fulfillmentStatus === status).length})
            </button>
          ))}
        </div>

        {/* Orders Table Container */}
        <div className="bg-white border border-[#ede4d8] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#ede4d8] text-xs font-bold uppercase tracking-wider text-[#61564d] bg-[#faf6f0]">
                  <th className="py-3.5 px-4 rounded-l-xl">Order Number</th>
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Destination</th>
                  <th className="py-3.5 px-4">Total Amount</th>
                  <th className="py-3.5 px-4">Fulfillment Status</th>
                  <th className="py-3.5 px-4 text-right rounded-r-xl">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ede4d8]/60 text-sm">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#61564d]">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[44px] text-[#b86b43]/40">inbox</span>
                        <p className="text-base font-semibold text-[#26201c]">No orders recorded</p>
                        <p className="text-sm text-[#61564d]">New customer orders will appear here in real-time as patrons checkout.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#faf6f0]/70 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-base text-[#26201c]">
                        {ord.orderNumber}
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-sm text-[#26201c]">{ord.customerName}</p>
                        <p className="text-xs text-[#61564d] font-mono">{ord.customerEmail}</p>
                      </td>
                      <td className="py-4 px-4 text-sm text-[#61564d]">
                        {ord.shippingAddress?.city || 'Worldwide'}, {ord.shippingAddress?.country || 'USA'}
                      </td>
                      <td className="py-4 px-4 font-bold text-base text-[#26201c]">
                        ${ord.totalAmount.toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={ord.fulfillmentStatus}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                          className="bg-[#faf6f0] border border-[#ede4d8] px-3 py-1.5 rounded-lg text-xs uppercase font-bold tracking-wider text-[#26201c] cursor-pointer focus:outline-none focus:border-[#b86b43]"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-right font-mono text-xs text-[#61564d]">
                        {new Date(ord.createdAt).toLocaleDateString()} · {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
