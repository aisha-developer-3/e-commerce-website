import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminLayout } from './AdminLayout';

export const AdminDashboardView: React.FC = () => {
  const {
    products,
    orders,
    updateOrderStatus,
    updateStock,
    simulateIncomingOrder,
    clearAllOrders,
    showToast,
  } = useStore();

  // Real-time live status states
  const [onlineShoppers, setOnlineShoppers] = useState(19);
  const [activeCheckouts, setActiveCheckouts] = useState(2);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [isAutoStreamActive, setIsAutoStreamActive] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'processing' | 'shipped' | 'delivered'>('all');
  const [recentActivity, setRecentActivity] = useState<Array<{ id: string; text: string; time: string; type: 'order' | 'stock' | 'status' }>>([
    { id: 'act-1', text: 'Real-time WebSocket stream active and connected', time: 'Just now', type: 'status' },
  ]);

  // Real-time clock and simulated online shoppers fluctuation
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    const shoppersInterval = setInterval(() => {
      setOnlineShoppers((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(8, Math.min(45, prev + delta));
      });
      setActiveCheckouts((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.max(0, Math.min(6, prev + delta));
      });
    }, 4500);

    return () => {
      clearInterval(clockInterval);
      clearInterval(shoppersInterval);
    };
  }, []);

  // Real-time automatic order stream generator (when enabled)
  useEffect(() => {
    if (!isAutoStreamActive) return;

    const streamInterval = setInterval(() => {
      if (simulateIncomingOrder) {
        const newOrd = simulateIncomingOrder();
        setRecentActivity((prev) => [
          {
            id: `act-${Date.now()}`,
            text: `Live order ${newOrd.orderNumber} ($${newOrd.totalAmount.toFixed(2)}) placed by ${newOrd.customerName}`,
            time: 'Just now',
            type: 'order',
          },
          ...prev.slice(0, 9),
        ]);
      }
    }, 16000);

    return () => clearInterval(streamInterval);
  }, [isAutoStreamActive, simulateIncomingOrder]);

  const handleManualOrder = () => {
    if (simulateIncomingOrder) {
      const newOrd = simulateIncomingOrder();
      setRecentActivity((prev) => [
        {
          id: `act-${Date.now()}`,
          text: `Real-time order placed: ${newOrd.orderNumber} ($${newOrd.totalAmount.toFixed(2)})`,
          time: 'Just now',
          type: 'order',
        },
        ...prev.slice(0, 9),
      ]);
    }
  };

  const handleStatusChange = (orderId: string, orderNumber: string, newStatus: any) => {
    updateOrderStatus(orderId, newStatus);
    setRecentActivity((prev) => [
      {
        id: `act-${Date.now()}`,
        text: `Order ${orderNumber} updated to ${newStatus.toUpperCase()}`,
        time: 'Just now',
        type: 'status',
      },
      ...prev.slice(0, 9),
    ]);
  };

  const handleStockAdjust = (productId: string, productName: string, currentStock: number, delta: number) => {
    const updated = Math.max(0, currentStock + delta);
    updateStock(productId, updated);
    setRecentActivity((prev) => [
      {
        id: `act-${Date.now()}`,
        text: `Stock updated for "${productName}": now ${updated} items`,
        time: 'Just now',
        type: 'stock',
      },
      ...prev.slice(0, 9),
    ]);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.fulfillmentStatus === 'processing').length;
  const lowStockProducts = products.filter((p) => p.stockQuantity <= 5);

  const filteredOrders = orders.filter((ord) => {
    if (statusFilter === 'all') return true;
    return ord.fulfillmentStatus === statusFilter;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8 pb-12">
        


        {/* Real-time Key Metrics Cards - Enhanced Typography */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-[#ede4d8] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between text-[#61564d]">
              <span className="text-xs uppercase tracking-[0.2em] font-bold">Total Revenue</span>
              <span className="material-symbols-outlined text-[24px] text-[#b86b43]">payments</span>
            </div>
            <span className="font-serif text-5xl font-semibold text-[#26201c] tracking-tight">
              ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <div className="flex items-center gap-2 text-sm text-emerald-700 font-medium mt-2">
              <span className="material-symbols-outlined text-[20px]">trending_up</span>
              <span>Live performance</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#ede4d8] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between text-[#61564d]">
              <span className="text-xs uppercase tracking-[0.2em] font-bold">Live Orders</span>
              <span className="material-symbols-outlined text-[24px] text-[#b86b43]">shopping_bag</span>
            </div>
            <span className="font-serif text-5xl font-semibold text-[#26201c] tracking-tight">{totalOrders}</span>
            <div className="flex items-center gap-3 text-sm font-medium mt-2 text-[#b86b43]">
              <span className="w-3 h-3 rounded-full bg-[#b86b43] animate-pulse"></span>
              <span>{pendingOrders} awaiting dispatch</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#ede4d8] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between text-[#61564d]">
              <span className="text-xs uppercase tracking-[0.2em] font-bold">Inventory</span>
              <span className="material-symbols-outlined text-[24px] text-[#b86b43]">inventory_2</span>
            </div>
            <span className="font-serif text-5xl font-semibold text-[#26201c] tracking-tight">{products.length}</span>
            <span className="text-base text-[#61564d] font-medium mt-2">
              {products.reduce((acc, p) => acc + (p.stockQuantity > 0 ? 1 : 0), 0)} items in stock
            </span>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#ede4d8] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between text-[#61564d]">
              <span className="text-xs uppercase tracking-[0.2em] font-bold">Low Stock</span>
              <span className="material-symbols-outlined text-[24px] text-amber-600">warning</span>
            </div>
            <span className="font-serif text-5xl font-semibold text-amber-700 tracking-tight">{lowStockProducts.length}</span>
            <span className="text-base text-amber-800 font-medium mt-2">
              {lowStockProducts.length > 0 ? 'Replenishment needed' : 'All items well-stocked'}
            </span>
          </div>
        </div>

        {/* Live Orders Feed & Real-Time Management */}
        <div className="bg-white rounded-2xl border border-[#ede4d8] p-6 sm:p-8 shadow-xs flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ede4d8]">
            <div className="flex items-center gap-3">
              <h3 className="font-serif text-2xl font-bold text-[#26201c]">Live Orders Stream</h3>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                Real-Time
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1.5 bg-[#faf6f0] rounded-xl border border-[#ede4d8]">
              {(['all', 'processing', 'shipped', 'delivered'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    statusFilter === status
                      ? 'bg-[#26201c] text-white shadow-xs'
                      : 'text-[#61564d] hover:text-[#26201c]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#ede4d8] text-xs font-bold uppercase tracking-wider text-[#61564d] bg-[#faf6f0]">
                  <th className="py-3.5 px-4 rounded-l-xl">Order #</th>
                  <th className="py-3.5 px-4">Customer & City</th>
                  <th className="py-3.5 px-4">Artifacts</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right rounded-r-xl">Real-Time Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ede4d8]/60 text-sm">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#61564d]">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <span className="material-symbols-outlined text-[48px] text-[#b86b43]/50">receipt_long</span>
                        <p className="text-base font-semibold text-[#26201c]">No active orders in this view</p>
                        <p className="text-sm text-[#61564d] max-w-sm">
                          Live orders will appear here automatically when patrons make purchases on the user site, or click <strong>Simulate Live Order</strong> above.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord, idx) => (
                    <tr key={ord.id} className="hover:bg-[#faf6f0]/70 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-base text-[#26201c]">
                        <div className="flex items-center gap-2">
                          <span>{ord.orderNumber}</span>
                          {idx === 0 && (
                            <span className="px-2 py-0.5 rounded text-[11px] bg-[#b86b43] text-white uppercase font-bold tracking-wider animate-pulse">
                              Live
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-sm text-[#26201c]">{ord.customerName}</p>
                        <p className="text-xs text-[#61564d] font-mono">{ord.customerEmail}</p>
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-[#26201c]">
                        {ord.items.length} {ord.items.length === 1 ? 'artifact' : 'artifacts'}
                      </td>
                      <td className="py-4 px-4 font-bold text-base text-[#26201c]">
                        ${ord.totalAmount.toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            ord.fulfillmentStatus === 'delivered'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : ord.fulfillmentStatus === 'shipped'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {ord.fulfillmentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          {ord.fulfillmentStatus === 'processing' && (
                            <button
                              onClick={() => handleStatusChange(ord.id, ord.orderNumber, 'shipped')}
                              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs transition-colors cursor-pointer"
                            >
                              Dispatch
                            </button>
                          )}
                          {ord.fulfillmentStatus === 'shipped' && (
                            <button
                              onClick={() => handleStatusChange(ord.id, ord.orderNumber, 'delivered')}
                              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs transition-colors cursor-pointer"
                            >
                              Deliver
                            </button>
                          )}
                          <span className="text-xs text-[#61564d] font-mono">
                            {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-Time Stock Control & Live Event Log */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Real-Time Inventory Restock Control */}
          <div className="bg-white rounded-2xl border border-[#ede4d8] p-6 sm:p-8 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#ede4d8]">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[24px] text-[#b86b43]">inventory</span>
                <h4 className="font-serif text-xl font-bold text-[#26201c]">Instant Inventory Control</h4>
              </div>
              <span className="text-xs text-[#61564d] font-semibold">Changes sync instantly</span>
            </div>

            <div className="flex flex-col gap-3">
              {products.slice(0, 5).map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center justify-between p-3.5 bg-[#faf6f0] border border-[#ede4d8] rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.imageUrls?.[0] || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=200'}
                      alt={prod.name}
                      className="w-12 h-12 rounded-lg object-cover border border-[#ede4d8]"
                    />
                    <div>
                      <p className="text-sm font-bold text-[#26201c] line-clamp-1">{prod.name}</p>
                      <p className="text-xs text-[#61564d] font-semibold">${prod.price} USD</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-bold px-3 py-1 rounded-md ${
                        prod.stockQuantity <= 5
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-white text-[#26201c] border border-[#ede4d8]'
                      }`}
                    >
                      {prod.stockQuantity} in stock
                    </span>
                    <button
                      onClick={() => handleStockAdjust(prod.id, prod.name, prod.stockQuantity, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-white hover:bg-red-50 text-red-600 border border-[#ede4d8] rounded-lg transition-colors font-bold text-sm cursor-pointer"
                      title="Decrease stock"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleStockAdjust(prod.id, prod.name, prod.stockQuantity, +5)}
                      className="px-3 h-8 flex items-center justify-center bg-[#26201c] hover:bg-[#b86b43] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      title="Add 5 items"
                    >
                      +5
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-Time Live Activity Stream */}
          <div className="bg-white rounded-2xl border border-[#ede4d8] p-6 sm:p-8 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#ede4d8]">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[24px] text-emerald-600">sensors</span>
                <h4 className="font-serif text-xl font-bold text-[#26201c]">Live Store Activity</h4>
              </div>
              <span className="text-xs font-mono text-emerald-700 font-bold">Synchronized</span>
            </div>

            <div className="flex flex-col gap-3">
              {recentActivity.map((act) => (
                <div
                  key={act.id}
                  className="flex items-start gap-3.5 p-3.5 bg-[#faf6f0] border border-[#ede4d8] rounded-xl text-sm text-[#26201c]"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${
                      act.type === 'order'
                        ? 'text-[#b86b43]'
                        : act.type === 'stock'
                        ? 'text-blue-600'
                        : 'text-emerald-600'
                    }`}
                  >
                    {act.type === 'order' ? 'receipt_long' : act.type === 'stock' ? 'inventory_2' : 'sensors'}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-[#26201c]">{act.text}</p>
                    <span className="text-xs text-[#61564d] font-mono">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};
