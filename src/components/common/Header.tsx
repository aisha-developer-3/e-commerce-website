import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export const Header: React.FC = () => {
  const {
    route,
    setRoute,
    cart,
    setSelectedCategory,
    currentUser,
    isAdmin,
    settings,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navigateToSection = (targetRoute: any, categoryId?: string) => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
    setRoute(targetRoute);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#faf6f0]/95 backdrop-blur-md border-b border-[#ede4d8] shadow-[0_4px_24px_rgba(38,32,28,0.04)] m-0 p-0">
      <div className="h-20 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigateToSection('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-[#26201c] group-hover:bg-[#b86b43] transition-colors flex items-center justify-center text-[#faf6f0]">
              <span className="font-serif text-lg font-bold">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-wider uppercase text-[#26201c] group-hover:text-[#b86b43] transition-colors">
                {settings.storeName || 'ATELIER'}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#9e9187] -mt-1 font-medium hidden sm:block">
                Curated Luxury
              </span>
            </div>
          </button>
        </div>

        {/* Center: Clean Website Navigation Sections */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-sm font-medium tracking-wide text-[#5c524a] whitespace-nowrap">
          <button
            onClick={() => navigateToSection('home')}
            className={`pb-1 transition-all cursor-pointer ${
              route === 'home'
                ? 'text-[#26201c] font-bold border-b-2 border-[#b86b43]'
                : 'text-[#61564d] hover:text-[#26201c]'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => {
              setSelectedCategory('all');
              navigateToSection('shop');
            }}
            className={`pb-1 transition-all cursor-pointer ${
              route === 'shop'
                ? 'text-[#26201c] font-bold border-b-2 border-[#b86b43]'
                : 'text-[#61564d] hover:text-[#26201c]'
            }`}
          >
            Shop
          </button>

          <button
            onClick={() => navigateToSection('shop', 'cat-home')}
            className="text-[#61564d] hover:text-[#26201c] pb-1 transition-all cursor-pointer"
          >
            Collections
          </button>

          <button
            onClick={() => {
              navigateToSection('home');
              setTimeout(() => {
                const el = document.getElementById('manifesto-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="text-[#61564d] hover:text-[#26201c] pb-1 transition-all cursor-pointer"
          >
            Editorial
          </button>

          <button
            onClick={() => {
              navigateToSection('home');
              setTimeout(() => {
                const el = document.getElementById('about-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="text-[#61564d] hover:text-[#26201c] pb-1 transition-all cursor-pointer"
          >
            About
          </button>
        </nav>

        {/* Right: Sign In Button & Cart Button */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          
          {/* Sign In Button */}
          <button
            onClick={() => navigateToSection('signin')}
            className={`px-5 py-2.5 text-sm font-semibold tracking-wide rounded-xl shadow-xs transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.98] cursor-pointer ${
              route === 'signin'
                ? 'bg-[#b86b43] text-white border border-[#b86b43]'
                : 'bg-[#26201c] hover:bg-[#b86b43] text-[#faf6f0] border border-[#26201c] hover:border-[#b86b43]'
            }`}
            title="Sign In"
          >
            <span className="material-symbols-outlined text-[20px]">account_circle</span>
            <span>Sign In</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={() => navigateToSection('cart')}
            className="relative p-2.5 text-[#26201c] hover:text-[#b86b43] transition-colors rounded-xl hover:bg-white/80 cursor-pointer flex items-center justify-center border border-transparent hover:border-[#ede4d8]"
            title="Shopping Cart"
          >
            <span className="material-symbols-outlined text-[26px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#b86b43] text-white text-xs flex items-center justify-center font-bold shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#26201c] hover:bg-white rounded-xl transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[26px]">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#faf6f0] border-b border-[#ede4d8] px-6 py-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top duration-200">
          
          {/* Sign In Button in Mobile View */}
          <button
            onClick={() => navigateToSection('signin')}
            className="w-full py-3.5 px-4 bg-[#26201c] hover:bg-[#b86b43] text-white text-sm font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">account_circle</span>
            <span>Sign In</span>
          </button>

          {/* Cart Button in Mobile View */}
          <button
            onClick={() => navigateToSection('cart')}
            className="w-full py-3 px-4 bg-white border border-[#ede4d8] text-[#26201c] hover:bg-[#ede4d8] text-sm font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span>Cart ({cartCount})</span>
          </button>

          <nav className="flex flex-col gap-2 pt-3 border-t border-[#ede4d8]/60 text-base font-medium text-[#5c524a]">
            <button
              onClick={() => navigateToSection('home')}
              className="text-left py-2 hover:text-[#b86b43] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => {
                setSelectedCategory('all');
                navigateToSection('shop');
              }}
              className="text-left py-2 hover:text-[#b86b43] transition-colors cursor-pointer"
            >
              Shop
            </button>
            <button
              onClick={() => navigateToSection('shop', 'cat-home')}
              className="text-left py-2 hover:text-[#b86b43] transition-colors cursor-pointer"
            >
              Collections
            </button>
            <button
              onClick={() => {
                navigateToSection('home');
                setTimeout(() => {
                  const el = document.getElementById('manifesto-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-left py-2 hover:text-[#b86b43] transition-colors cursor-pointer"
            >
              Editorial
            </button>
            <button
              onClick={() => {
                navigateToSection('home');
                setTimeout(() => {
                  const el = document.getElementById('about-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-left py-2 hover:text-[#b86b43] transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
