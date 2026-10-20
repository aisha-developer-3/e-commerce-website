import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export const CartAndBagView: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    appliedDiscount,
    applyDiscountCode,
    removeDiscountCode,
    setRoute,
    settings,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedDiscount
    ? appliedDiscount.type === 'percentage'
      ? (subtotal * appliedDiscount.value) / 100
      : appliedDiscount.value
    : 0;
  const shippingAmount = subtotal >= settings.shippingThreshold || subtotal === 0 ? 0 : settings.standardShippingCost || 25;
  const taxAmount = Number(((subtotal - discountAmount) * 0.075).toFixed(2));
  const total = Number((subtotal - discountAmount + shippingAmount + taxAmount).toFixed(2));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyDiscountCode(promoInput.trim());
      setPromoInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-6 bg-[#fdfbf7]">
        <div className="w-20 h-20 rounded-full bg-[#faf6f0] border border-[#ede4d8] flex items-center justify-center text-[#b86b43]">
          <span className="material-symbols-outlined text-[44px]">shopping_bag</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#26201c] font-semibold">Your Atelier Bag is Empty</h2>
        <p className="text-base text-[#61564d] max-w-md">
          Explore our limited runs of architectural homeware, bespoke leather pieces, and tactile artifacts.
        </p>
        <button
          onClick={() => setRoute('shop')}
          className="px-8 py-4 bg-[#26201c] text-white text-sm uppercase tracking-wider font-semibold rounded-xl hover:bg-[#b86b43] transition-colors shadow-md"
        >
          Explore Catalog →
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 bg-[#fdfbf7]">
      <div className="flex flex-col gap-2 mb-10 pb-6 border-b border-[#ede4d8]">
        <nav className="flex items-center gap-2 text-sm text-[#61564d]">
          <button onClick={() => setRoute('home')} className="hover:text-[#b86b43] transition-colors">
            Home
          </button>
          <span className="text-[#9e9187]">/</span>
          <span className="text-[#26201c] font-semibold">Curated Bag</span>
        </nav>
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-4xl sm:text-5xl text-[#26201c] font-semibold">Your Curated Bag</h1>
          <button
            onClick={clearCart}
            className="text-xs uppercase text-red-600 hover:underline tracking-wider font-bold"
          >
            Empty Bag
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 bg-white border border-[#ede4d8] rounded-2xl shadow-xs"
            >
              <div className="flex items-center gap-5">
                <div className="relative w-28 h-28 bg-[#f3ece1] rounded-xl overflow-hidden flex-shrink-0 border border-[#ede4d8]">
                  <img
                    src={item.product.imageUrls[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs uppercase text-[#b86b43] tracking-widest font-bold">{item.product.categoryName}</span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#26201c] font-semibold">{item.product.name}</h3>
                  <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-[#61564d]">
                    {item.selectedColorway && <span>Color: <strong>{item.selectedColorway}</strong></span>}
                    {item.selectedHardware && <span>Hardware: <strong>{item.selectedHardware}</strong></span>}
                  </div>
                  <span className="text-base sm:text-lg font-bold text-[#26201c] mt-1">
                    ${item.product.price.toFixed(2)} USD
                  </span>
                </div>
              </div>

              {/* Quantity Stepper & Removal */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                <div className="flex items-center bg-[#faf6f0] border border-[#ede4d8] rounded-xl px-2 h-11 justify-between min-w-[110px]">
                  <button
                    onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                    className="px-2.5 text-[#26201c] hover:text-[#b86b43] font-bold text-base"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-[#26201c] px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                    className="px-2.5 text-[#26201c] hover:text-[#b86b43] font-bold text-base"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="text-xs uppercase text-[#9e9187] hover:text-red-600 transition-colors tracking-wider font-semibold"
                >
                  Remove Item
                </button>
              </div>
            </div>
          ))}

          {/* Complimentary Perks Banner in Bag */}
          <div className="p-5 bg-[#faf6f0] border border-[#ede4d8] rounded-2xl flex items-center gap-4 text-sm text-[#61564d]">
            <span className="material-symbols-outlined text-[24px] text-[#b86b43]">verified_user</span>
            <span>All consignments insured in full with archival certificates of authenticity included.</span>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 bg-[#faf6f0] p-6 sm:p-8 rounded-2xl border border-[#ede4d8] shadow-xs flex flex-col gap-6">
          <h2 className="font-serif text-2xl text-[#26201c] font-semibold pb-4 border-b border-[#ede4d8]">
            Order Summary
          </h2>

          <div className="flex flex-col gap-3 text-sm text-[#61564d]">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span className="text-base font-bold text-[#26201c]">${subtotal.toFixed(2)}</span>
            </div>

            {appliedDiscount && (
              <div className="flex justify-between items-center text-[#b86b43]">
                <div className="flex items-center gap-1.5">
                  <span>Promo ({appliedDiscount.code})</span>
                  <button onClick={removeDiscountCode} className="text-xs underline hover:text-red-600">
                    ✕
                  </button>
                </div>
                <span className="font-bold">-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span>Estimated Shipping</span>
              <span>
                {shippingAmount === 0 ? (
                  <strong className="text-[#b86b43] uppercase text-xs">Complimentary</strong>
                ) : (
                  `$${shippingAmount.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>Estimated Sales Tax</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>

            <div className="pt-4 border-t border-[#ede4d8] flex justify-between items-baseline">
              <span className="text-base font-semibold text-[#26201c]">Estimated Total</span>
              <span className="text-2xl font-bold text-[#26201c]">${total.toFixed(2)} USD</span>
            </div>
          </div>

          {/* Promo code input */}
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Promo Code (e.g. ATELIERVIP)"
              className="flex-1 bg-white border border-[#ede4d8] px-3.5 py-2.5 text-xs text-[#26201c] rounded-xl focus:outline-none focus:border-[#b86b43]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#26201c] text-white text-xs uppercase font-semibold rounded-xl hover:bg-[#b86b43] transition-colors"
            >
              Apply
            </button>
          </form>

          {/* Checkout Button */}
          <button
            onClick={() => setRoute('checkout')}
            className="w-full py-4 bg-[#26201c] hover:bg-[#b86b43] text-white text-sm font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <span className="material-symbols-outlined text-[18px]">lock</span>
          </button>
        </div>
      </div>
    </div>
  );
};
