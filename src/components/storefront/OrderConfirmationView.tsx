import React from 'react';
import { useStore } from '../../context/StoreContext';

export const OrderConfirmationView: React.FC = () => {
  const { orders, selectedOrderId, setRoute } = useStore();

  const order = orders.find((o) => o.id === selectedOrderId) || orders[0];

  if (!order) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-24 text-center bg-[#fdfbf7]">
        <h2 className="text-3xl font-serif text-[#26201c] font-semibold">No recent order found</h2>
        <button
          onClick={() => setRoute('shop')}
          className="mt-6 px-8 py-3 bg-[#26201c] text-white text-sm uppercase font-semibold rounded-xl"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 flex flex-col gap-10 bg-[#fdfbf7]">
      <div className="bg-[#faf6f0] p-8 md:p-12 border border-[#ede4d8] rounded-3xl shadow-xs flex flex-col items-center text-center gap-6">
        <div className="w-16 h-16 rounded-full bg-white border border-[#ede4d8] text-[#b86b43] flex items-center justify-center shadow-xs">
          <span className="material-symbols-outlined text-[36px]">check_circle</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-[#b86b43] font-bold">
            Order Confirmed & Allocated
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-[#26201c] font-semibold">{order.orderNumber}</h1>
          <p className="text-base text-[#61564d] max-w-lg mx-auto leading-relaxed">
            Thank you, {order.customerName}. Your order has been securely processed and transmitted to our curation studio.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setRoute('shop')}
            className="px-8 py-3.5 bg-[#26201c] text-white text-sm font-semibold uppercase tracking-wider rounded-xl hover:bg-[#b86b43] transition-colors shadow-sm"
          >
            Continue Curation
          </button>
          <button
            onClick={() => setRoute('account')}
            className="px-8 py-3.5 bg-white border border-[#ede4d8] text-[#26201c] text-sm font-semibold uppercase tracking-wider rounded-xl hover:bg-[#faf6f0] transition-colors shadow-xs"
          >
            View Account & Orders
          </button>
        </div>
      </div>

      {/* Order Details Receipt */}
      <div className="bg-white p-8 border border-[#ede4d8] rounded-3xl shadow-xs flex flex-col gap-6">
        <h3 className="font-serif text-2xl text-[#26201c] font-semibold pb-4 border-b border-[#ede4d8]">Archival Receipt</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#61564d]">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#26201c] font-bold block mb-1">Shipping Destination</span>
            <p className="font-semibold text-[#26201c]">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
            <p>{order.shippingAddress.streetAddress}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-[#26201c] font-bold block mb-1">Fulfillment & Payment</span>
            <p>Delivery: <strong className="text-[#26201c]">{order.deliveryMethod}</strong></p>
            <p>Payment: <strong className="text-[#26201c]">{order.paymentMethod}</strong></p>
            <p>Status: <strong className="text-[#b86b43] capitalize">{order.fulfillmentStatus}</strong></p>
          </div>
        </div>

        <div className="pt-6 border-t border-[#ede4d8] flex flex-col gap-4">
          <span className="text-xs uppercase tracking-wider text-[#26201c] font-bold">Ordered Artifacts</span>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4 py-3 border-b border-[#ede4d8]/60">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#f3ece1] overflow-hidden rounded-xl border border-[#ede4d8]">
                  <img src={item.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#26201c]">{item.name}</h4>
                  <span className="text-xs text-[#61564d]">Qty: {item.quantity}</span>
                </div>
              </div>
              <span className="text-base font-bold text-[#26201c]">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 pt-4 items-end text-sm">
          <div className="flex justify-between w-64 text-[#61564d]">
            <span>Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-64 text-[#61564d]">
            <span>Shipping</span>
            <span>${order.shippingAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-64 text-[#61564d]">
            <span>Tax</span>
            <span>${order.taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-64 text-[#26201c] font-bold text-base pt-3 border-t border-[#ede4d8]">
            <span>Total Paid</span>
            <span className="text-lg">${order.totalAmount.toFixed(2)} USD</span>
          </div>
        </div>
      </div>
    </div>
  );
};
