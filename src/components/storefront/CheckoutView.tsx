import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export const CheckoutView: React.FC = () => {
  const { cart, checkoutData, updateCheckoutData, placeOrder, setRoute, appliedDiscount, settings } = useStore();

  const [step, setStep] = useState(2); // 1: Contact, 2: Shipping, 3: Delivery, 4: Payment
  const [formData, setFormData] = useState({
    firstName: checkoutData.shippingAddress.firstName || 'Elena',
    lastName: checkoutData.shippingAddress.lastName || 'Vance',
    streetAddress: checkoutData.shippingAddress.streetAddress || '742 Evergreen Galleria, Penthouse 4B',
    city: checkoutData.shippingAddress.city || 'New York',
    state: checkoutData.shippingAddress.state || 'New York',
    postalCode: checkoutData.shippingAddress.postalCode || '10021',
    country: checkoutData.shippingAddress.country || 'United States of America',
    email: checkoutData.contactEmail || 'elena.vance@chambers-curation.com',
    delivery: 'white-glove',
    payment: 'card',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedDiscount
    ? appliedDiscount.type === 'percentage'
      ? (subtotal * appliedDiscount.value) / 100
      : appliedDiscount.value
    : 0;
  const shippingAmount = formData.delivery === 'express-air' ? 35 : 0;
  const taxAmount = Number(((subtotal - discountAmount) * 0.075).toFixed(2));
  const total = Number((subtotal - discountAmount + shippingAmount + taxAmount).toFixed(2));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const address = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      streetAddress: formData.streetAddress,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.country,
      email: formData.email,
    };
    updateCheckoutData({
      contactEmail: formData.email,
      shippingAddress: address,
      deliveryMethod: formData.delivery,
      paymentMethod: formData.payment,
    });

    const newOrder = placeOrder(address, formData.delivery, formData.payment);
    setRoute('order-confirmation');
  };

  return (
    <div className="w-full bg-[#fdfbf7] min-h-screen text-[#26201c]">
      {/* Header */}
      <header className="w-full bg-[#faf6f0] border-b border-[#ede4d8] py-5 px-6 lg:px-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setRoute('home')} className="font-serif text-2xl tracking-wider text-[#26201c] uppercase font-bold">
            {settings.storeName}
          </button>
          <span className="h-4 w-px bg-[#ede4d8] hidden sm:block"></span>
          <span className="text-xs text-[#9e9187] uppercase tracking-widest hidden sm:inline-block font-semibold">
            Bespoke Checkout
          </span>
        </div>
        <div className="flex items-center gap-2 bg-white border border-[#ede4d8] px-3.5 py-1.5 rounded-full shadow-xs">
          <span className="material-symbols-outlined text-[16px] text-[#b86b43]">lock</span>
          <span className="text-xs text-[#61564d] font-bold tracking-wide">
            SECURE SSL 256-BIT ENCRYPTION
          </span>
        </div>
      </header>

      {/* Main Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Checkout Form */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-8">
              {/* Contact Information */}
              <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-[#ede4d8] flex flex-col gap-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#ede4d8]">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#26201c] text-white flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <h2 className="font-serif text-2xl text-[#26201c] font-semibold">Contact Information</h2>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#26201c] uppercase tracking-wider font-semibold">Email or Mobile Phone</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-12 px-4 rounded-xl bg-[#faf6f0] border border-[#ede4d8] focus:border-[#b86b43] focus:outline-none text-sm text-[#26201c]"
                    />
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-[#ede4d8] flex flex-col gap-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#ede4d8]">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#b86b43] text-white flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <h2 className="font-serif text-2xl text-[#26201c] font-semibold">Shipping Destination</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#26201c] uppercase tracking-wider font-semibold">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="h-12 px-4 rounded-xl bg-[#faf6f0] border border-[#ede4d8] focus:border-[#b86b43] focus:outline-none text-sm text-[#26201c]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#26201c] uppercase tracking-wider font-semibold">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="h-12 px-4 rounded-xl bg-[#faf6f0] border border-[#ede4d8] focus:border-[#b86b43] focus:outline-none text-sm text-[#26201c]"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-[#26201c] uppercase tracking-wider font-semibold">Street Address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    required
                    className="h-12 px-4 rounded-xl bg-[#faf6f0] border border-[#ede4d8] focus:border-[#b86b43] focus:outline-none text-sm text-[#26201c]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#26201c] uppercase tracking-wider font-semibold">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="h-12 px-4 rounded-xl bg-[#faf6f0] border border-[#ede4d8] focus:border-[#b86b43] focus:outline-none text-sm text-[#26201c]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#26201c] uppercase tracking-wider font-semibold">State / Province</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="h-12 px-4 rounded-xl bg-[#faf6f0] border border-[#ede4d8] focus:border-[#b86b43] focus:outline-none text-sm text-[#26201c]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#26201c] uppercase tracking-wider font-semibold">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      className="h-12 px-4 rounded-xl bg-[#faf6f0] border border-[#ede4d8] focus:border-[#b86b43] focus:outline-none text-sm text-[#26201c]"
                    />
                  </div>
                </div>
              </section>

              {/* Delivery Method */}
              <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-[#ede4d8] flex flex-col gap-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#ede4d8]">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#faf6f0] border border-[#ede4d8] text-[#26201c] flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <h2 className="font-serif text-2xl text-[#26201c] font-semibold">Delivery Method</h2>
                  </div>
                  <span className="text-xs text-[#b86b43] uppercase tracking-wider font-bold">Climate-Neutral</span>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center justify-between p-4 rounded-xl border-2 border-[#b86b43] bg-[#faf6f0] cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        value="white-glove"
                        checked={formData.delivery === 'white-glove'}
                        onChange={handleChange}
                        className="h-4 w-4 accent-[#b86b43]"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#26201c]">Atelier White Glove Signature</span>
                        <span className="text-xs text-[#61564d] mt-0.5">Archival dust bag, signed certificate of provenance · 3–5 business days</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#b86b43] uppercase tracking-wider">Complimentary</span>
                  </label>
                  <label className="flex items-center justify-between p-4 rounded-xl border border-[#ede4d8] bg-white cursor-pointer hover:bg-[#faf6f0] transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        value="express-air"
                        checked={formData.delivery === 'express-air'}
                        onChange={handleChange}
                        className="h-4 w-4 accent-[#b86b43]"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#26201c]">Express Priority Courier</span>
                        <span className="text-xs text-[#61564d] mt-0.5">Guaranteed climate-controlled transport · 1–2 business days</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[#26201c]">$35.00</span>
                  </label>
                </div>
              </section>

              {/* Payment Method */}
              <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-[#ede4d8] flex flex-col gap-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#ede4d8]">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#faf6f0] border border-[#ede4d8] text-[#26201c] flex items-center justify-center text-xs font-bold">
                      4
                    </span>
                    <h2 className="font-serif text-2xl text-[#26201c] font-semibold">Payment Method</h2>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#9e9187]">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                    <span className="text-xs uppercase tracking-wider font-semibold">PCI Tier-1 Certified</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#26201c] uppercase tracking-wider font-semibold">Card Number</label>
                    <input
                      type="text"
                      defaultValue="•••• •••• •••• 8492"
                      className="h-12 px-4 rounded-xl bg-[#faf6f0] border border-[#ede4d8] text-sm text-[#26201c] font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-[#26201c] uppercase tracking-wider font-semibold">Expiry</label>
                      <input type="text" defaultValue="09/28" className="h-12 px-4 rounded-xl bg-[#faf6f0] border border-[#ede4d8] text-sm font-mono text-[#26201c]" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-[#26201c] uppercase tracking-wider font-semibold">CVC</label>
                      <input type="password" defaultValue="984" className="h-12 px-4 rounded-xl bg-[#faf6f0] border border-[#ede4d8] text-sm font-mono text-[#26201c]" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-[#26201c] uppercase tracking-wider font-semibold">Cardholder</label>
                      <input type="text" defaultValue="Elena Vance" className="h-12 px-4 rounded-xl bg-[#faf6f0] border border-[#ede4d8] text-sm text-[#26201c]" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setRoute('cart')}
                  className="text-xs uppercase tracking-wider font-semibold text-[#61564d] hover:text-[#b86b43] transition-colors"
                >
                  ← Return to Bag
                </button>
                <button
                  type="submit"
                  className="h-14 px-10 bg-[#26201c] hover:bg-[#b86b43] text-white text-sm uppercase tracking-wider font-semibold rounded-xl shadow-md transition-all flex items-center gap-3 active:scale-[0.99]"
                >
                  <span>Place Curated Order (${total.toFixed(2)})</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="lg:col-span-5 sticky top-24">
            <div className="bg-[#faf6f0] p-6 sm:p-8 rounded-2xl shadow-xs border border-[#ede4d8] flex flex-col gap-6">
              <h3 className="font-serif text-2xl text-[#26201c] font-semibold pb-4 border-b border-[#ede4d8]">
                Curated Order ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
              </h3>
              <div className="flex flex-col gap-5 max-h-96 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl bg-[#f3ece1] flex-shrink-0 overflow-hidden border border-[#ede4d8]">
                      <img src={item.product.imageUrls[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-xs text-[#b86b43] uppercase font-bold truncate">{item.product.categoryName}</span>
                      <h4 className="font-serif text-base font-semibold text-[#26201c] truncate">{item.product.name}</h4>
                      <span className="text-xs text-[#61564d]">Qty: {item.quantity}</span>
                    </div>
                    <span className="text-sm font-bold text-[#26201c]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t border-[#ede4d8] text-sm">
                <div className="flex justify-between text-[#61564d]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#26201c]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#61564d]">
                  <span>Shipping</span>
                  <span className="text-[#b86b43] font-bold uppercase text-xs">
                    {shippingAmount === 0 ? 'Complimentary' : `$${shippingAmount.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-[#61564d]">
                  <span>Estimated Tax (7.5%)</span>
                  <span className="font-semibold text-[#26201c]">${taxAmount.toFixed(2)}</span>
                </div>
                <div className="h-px bg-[#ede4d8] my-1"></div>
                <div className="flex justify-between items-baseline">
                  <span className="text-base font-semibold text-[#26201c]">Total Due</span>
                  <span className="text-2xl font-bold text-[#26201c]">${total.toFixed(2)} USD</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
