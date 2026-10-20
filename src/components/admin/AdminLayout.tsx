import React, { ReactNode, useState } from 'react';
import { useStore } from '../../context/StoreContext';

export const AdminLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { route, setRoute, logout, settings, currentUser } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'admin-dashboard', label: 'Real-Time Overview', icon: 'dashboard' },
    { id: 'admin-orders', label: 'Live Orders', icon: 'shopping_cart' },
    { id: 'admin-products', label: 'Products & Artifacts', icon: 'inventory_2' },
    { id: 'admin-inventory', label: 'Inventory Stock', icon: 'warehouse' },
    { id: 'admin-categories', label: 'Categories', icon: 'category' },
    { id: 'admin-customers', label: 'Patrons & Customers', icon: 'group' },
    { id: 'admin-discounts', label: 'Promo Discounts', icon: 'percent' },
    { id: 'admin-settings', label: 'Store Settings', icon: 'settings' },
  ];

  const handleNav = (id: any) => {
    setRoute(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#fdfbf7] overflow-hidden text-[#26201c]">
      {/* Sidebar Desktop */}
      <aside className="w-68 bg-[#faf6f0] border-r border-[#ede4d8] flex flex-col hidden md:flex shrink-0">
        <div className="flex-1 overflow-y-auto">
          {/* Header Branding */}
          <div className="h-20 px-6 border-b border-[#ede4d8] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#26201c] text-[#faf6f0] flex items-center justify-center font-serif font-bold text-sm">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-wider uppercase text-[#26201c] font-bold">
                  {settings.storeName || 'ATELIER'}
                </span>
                <span className="text-xs uppercase font-bold tracking-widest text-[#b86b43]">
                  Admin Portal
                </span>
              </div>
            </div>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>

          {/* Admin User Info Card */}
          <div className="p-4 mx-4 my-3 bg-white border border-[#ede4d8] rounded-2xl flex items-center gap-3 shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-[#b86b43]/15 text-[#b86b43] flex items-center justify-center font-bold text-base">
              AA
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-[#26201c] truncate">Ayesha Anwer</span>
              <span className="text-xs text-[#61564d] truncate font-mono">
                {currentUser?.email || 'ayeshaanwer6969@gmail.com'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 flex flex-col gap-1.5">
            {navItems.map((item) => {
              const active = route === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all rounded-xl cursor-pointer ${
                    active ? 'bg-[#26201c] text-white shadow-xs' : 'text-[#61564d] hover:bg-white hover:text-[#26201c]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#ede4d8] flex flex-col gap-2 shrink-0">
          <button
            onClick={() => setRoute('home')}
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#26201c] hover:bg-white transition-colors rounded-xl cursor-pointer border border-transparent hover:border-[#ede4d8]"
          >
            <span className="material-symbols-outlined text-[20px] text-[#b86b43]">store</span>
            <span>View User Site</span>
          </button>
          <button
            onClick={async () => {
              await logout();
              setRoute('signin');
            }}
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors rounded-xl cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-20 bg-[#faf6f0] border-b border-[#ede4d8] px-6 lg:px-12 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#26201c] hover:bg-white rounded-xl transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <div>
              <span className="font-serif text-2xl text-[#26201c] font-semibold capitalize block">
                {route.replace('admin-', '').replace('-', ' ')}
              </span>
              <span className="text-xs text-emerald-700 font-mono font-bold flex items-center gap-1.5 hidden sm:flex">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                Connected to Real-Time Cloud Engine
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRoute('home')}
              className="px-4 py-2 bg-white border border-[#ede4d8] text-[#26201c] hover:bg-[#ede4d8] text-xs uppercase tracking-wider font-semibold rounded-xl transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">storefront</span>
              <span>Open User Site</span>
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#faf6f0] border-b border-[#ede4d8] p-4 flex flex-col gap-2 shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-xl text-left ${
                  route === item.id ? 'bg-[#26201c] text-white' : 'text-[#61564d] hover:bg-white'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}

        <main className="p-5 md:p-8 lg:p-10 flex-1 max-w-[1440px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
};
