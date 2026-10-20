/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';

import { HomeView } from './components/storefront/HomeView';
import { ShopCatalogView } from './components/storefront/ShopCatalogView';
import { ProductDetailView } from './components/storefront/ProductDetailView';
import { CartAndBagView } from './components/storefront/CartAndBagView';
import { CheckoutView } from './components/storefront/CheckoutView';
import { OrderConfirmationView } from './components/storefront/OrderConfirmationView';
import { WishlistView } from './components/storefront/WishlistView';
import { AccountView } from './components/storefront/AccountView';
import { SignInView } from './components/storefront/SignInView';

import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { AdminProductsView } from './components/admin/AdminProductsView';
import { AdminCategoriesView } from './components/admin/AdminCategoriesView';
import { AdminOrdersView } from './components/admin/AdminOrdersView';
import { AdminInventoryView } from './components/admin/AdminInventoryView';
import { AdminCustomersView } from './components/admin/AdminCustomersView';
import { AdminDiscountsView } from './components/admin/AdminDiscountsView';
import { AdminSettingsView } from './components/admin/AdminSettingsView';

const MainRouter: React.FC = () => {
  const { route } = useStore();

  const renderRoute = () => {
    switch (route) {
      case 'home':
        return <HomeView />;
      case 'shop':
        return <ShopCatalogView />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'cart':
        return <CartAndBagView />;
      case 'checkout':
        return <CheckoutView />;
      case 'order-confirmation':
        return <OrderConfirmationView />;
      case 'wishlist':
        return <WishlistView />;
      case 'account':
        return <AccountView />;
      case 'signin':
        return <SignInView />;
      case 'admin-dashboard':
        return <AdminDashboardView />;
      case 'admin-products':
        return <AdminProductsView />;
      case 'admin-categories':
        return <AdminCategoriesView />;
      case 'admin-orders':
        return <AdminOrdersView />;
      case 'admin-inventory':
        return <AdminInventoryView />;
      case 'admin-customers':
        return <AdminCustomersView />;
      case 'admin-discounts':
        return <AdminDiscountsView />;
      case 'admin-settings':
        return <AdminSettingsView />;
      default:
        return <HomeView />;
    }
  };

  const isAdminRoute = route.startsWith('admin-');
  const isCheckoutRoute = route === 'checkout';

  if (isAdminRoute) {
    return (
      <>
        {renderRoute()}
        <ToastContainer />
      </>
    );
  }

  if (isCheckoutRoute) {
    return (
      <>
        <CheckoutView />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-[#26201c]">
      <Header />
      <main className="flex-1 pt-20">{renderRoute()}</main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainRouter />
    </StoreProvider>
  );
}
