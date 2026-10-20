import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { setRoute, setSelectedCategory, showToast, settings, isAdmin } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast(`Subscribed ${email} to The Atelier Monograph.`);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#121110] text-[#f4efe8] border-t border-[#26221f]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#b86b43] flex items-center justify-center text-white">
                <span className="font-serif text-lg font-bold">A</span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider uppercase text-white">
                {settings.storeName || 'ATELIER'}
              </span>
            </div>
            
            <p className="font-serif text-xl italic text-stone-300 font-normal max-w-md">
              Crafted with intentionality, designed for generational longevity.
            </p>
            
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              An editorial house presenting limited runs of architectural homeware, bespoke leather pieces, and tactile artifacts created by master artisans.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5 pt-2">
              <label className="text-xs uppercase tracking-widest text-stone-300 font-bold">
                Subscribe to The Monograph
              </label>
              <div className="flex items-center max-w-md bg-[#1c1a17] border border-[#332e29] rounded-xl overflow-hidden p-1 shadow-inner">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your correspondence email"
                  required
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#b86b43] hover:bg-[#cf7d4e] text-white text-xs uppercase px-5 py-3 tracking-wider font-semibold rounded-lg transition-colors whitespace-nowrap shadow-sm"
                >
                  Join Atelier
                </button>
              </div>
            </form>
          </div>

          {/* Shop Departments */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest text-[#e89b6c] font-bold">Departments</span>
            <ul className="flex flex-col gap-3 text-sm text-stone-400">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('cat-home');
                    setRoute('shop');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Living & Decor
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('cat-leather');
                    setRoute('shop');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Leather Goods
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('cat-watches');
                    setRoute('shop');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Timepieces
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setRoute('shop');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setRoute('shop');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  All Curations
                </button>
              </li>
            </ul>
          </div>

          {/* Client Service */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest text-[#e89b6c] font-bold">Client Service</span>
            <ul className="flex flex-col gap-3 text-sm text-stone-400">
              <li className="hover:text-white transition-colors cursor-pointer">Private Concierge</li>
              <li className="hover:text-white transition-colors cursor-pointer">White-Glove Delivery</li>
              <li className="hover:text-white transition-colors cursor-pointer">Returns & Exchanges</li>
              <li className="hover:text-white transition-colors cursor-pointer">Archival Care Guides</li>
              <li className="hover:text-white transition-colors cursor-pointer">Provenance Authentication</li>
            </ul>
          </div>

          {/* The House */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest text-[#e89b6c] font-bold">The Atelier House</span>
            <ul className="flex flex-col gap-3 text-sm text-stone-400">
              <li
                onClick={() => {
                  setRoute('home');
                  setTimeout(() => {
                    const el = document.getElementById('manifesto-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Our Manifesto & Philosophy
              </li>
              <li
                onClick={() => {
                  setRoute('home');
                  setTimeout(() => {
                    const el = document.getElementById('about-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Artisanal Provenance
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">Editorial Press Inquiries</li>
              <li className="hover:text-white transition-colors cursor-pointer">Private Appointments</li>
              <li className="hover:text-white transition-colors cursor-pointer">Galleries in Zurich & Florence</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#26221f] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 ATELIER Curated Collections. All Rights Reserved.</p>
          <div className="flex items-center gap-6 uppercase tracking-wider font-medium">
            {isAdmin && (
              <button
                onClick={() => setRoute('admin-dashboard')}
                className="text-[#e89b6c] hover:underline transition-colors cursor-pointer font-bold"
              >
                Admin Panel
              </button>
            )}
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
