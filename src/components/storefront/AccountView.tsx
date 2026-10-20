import React from 'react';
import { useStore } from '../../context/StoreContext';

export const AccountView: React.FC = () => {
  const { currentUser, orders, logout, setRoute, setSelectedOrderId, isAdmin, loginAsDemoAdmin, loginWithGoogle } = useStore();

  if (!currentUser) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-6 bg-[#fdfbf7]">
        <div className="w-20 h-20 rounded-full bg-[#faf6f0] border border-[#ede4d8] flex items-center justify-center text-[#b86b43]">
          <span className="material-symbols-outlined text-[44px]">account_circle</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#26201c] font-semibold">Patron Sign-In Required</h2>
        <p className="text-base text-[#61564d] max-w-md">
          Sign in to access your private salon invites, order history, and archival certificates.
        </p>
        <button
          onClick={() => setRoute('signin')}
          className="px-8 py-3.5 bg-[#26201c] hover:bg-[#b86b43] text-white text-sm font-semibold uppercase tracking-wider rounded-xl shadow-md transition-all"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 flex flex-col gap-10 bg-[#fdfbf7]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#ede4d8]">
        <div>
          <span className="text-xs uppercase text-[#b86b43] tracking-widest font-bold block mb-1">Patron Profile</span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#26201c] font-semibold">
            {currentUser.displayName || 'Atelier Patron'}
          </h1>
          <p className="text-sm text-[#61564d] mt-1">{currentUser.email}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {isAdmin && (
            <button
              onClick={() => setRoute('admin-dashboard')}
              className="px-5 py-2.5 bg-[#b86b43] text-white text-xs uppercase tracking-wider font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm"
            >
              Open Admin Panel
            </button>
          )}
          {!isAdmin && (
            <button
              onClick={loginAsDemoAdmin}
              className="px-4 py-2.5 bg-white border border-[#ede4d8] text-[#26201c] text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-[#faf6f0] transition-colors shadow-xs"
            >
              Become Admin
            </button>
          )}
          <button
            onClick={logout}
            className="px-5 py-2.5 bg-white border border-red-200 text-red-600 text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-red-50 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-6">
        <h3 className="font-serif text-2xl sm:text-3xl text-[#26201c] font-semibold">Order History ({orders.length})</h3>
        {orders.length === 0 ? (
          <div className="p-12 text-center bg-[#faf6f0] border border-[#ede4d8] rounded-2xl">
            <p className="text-base text-[#61564d]">No orders recorded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white p-6 border border-[#ede4d8] rounded-2xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-[#26201c]">{ord.orderNumber}</span>
                    <span className="text-xs uppercase px-3 py-1 bg-[#faf6f0] border border-[#ede4d8] rounded-full text-[#b86b43] font-bold">
                      {ord.fulfillmentStatus}
                    </span>
                  </div>
                  <span className="text-sm text-[#61564d]">
                    Placed on {new Date(ord.createdAt).toLocaleDateString()} · {ord.items.length} items
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-lg font-bold text-[#26201c]">${ord.totalAmount.toFixed(2)} USD</span>
                  <button
                    onClick={() => {
                      setSelectedOrderId(ord.id);
                      setRoute('order-confirmation');
                    }}
                    className="px-5 py-2.5 bg-[#faf6f0] hover:bg-[#26201c] hover:text-white text-[#26201c] border border-[#ede4d8] text-xs uppercase tracking-wider font-semibold rounded-xl transition-all"
                  >
                    View Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
