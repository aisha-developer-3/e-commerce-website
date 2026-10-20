import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Product, Category, CartItem, WishlistItem, Order, Customer, DiscountCode, StoreSettings, ViewRoute } from '../types';
import { initialProducts, initialCategories, initialOrders, initialCustomers, initialDiscounts, initialStoreSettings } from '../data/mockData';
import { auth, googleProvider, isFirebaseConfigured } from '../services/firebase/firebase';
import { signInWithPopup, signOut as fbSignOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface StoreContextType {
  route: ViewRoute;
  setRoute: (route: ViewRoute) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  
  // Data
  products: Product[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  discounts: DiscountCode[];
  settings: StoreSettings;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, colorway?: string, hardware?: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  appliedDiscount: DiscountCode | null;
  applyDiscountCode: (codeStr: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;
  
  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Filters & Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  filteredProducts: Product[];
  
  // Checkout
  checkoutData: {
    contactEmail: string;
    shippingAddress: any;
    deliveryMethod: string;
    paymentMethod: string;
  };
  updateCheckoutData: (data: any) => void;
  placeOrder: (address: any, delivery: string, payment: string) => Order;
  
  // Admin actions
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  updateOrderStatus: (orderId: string, status: Order['fulfillmentStatus']) => void;
  updateStock: (productId: string, newStock: number) => void;
  simulateIncomingOrder: () => Order;
  clearAllOrders: () => void;
  
  // Auth & Mode
  currentUser: FirebaseUser | { uid: string; email: string; displayName: string } | null;
  isAdmin: boolean;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password?: string, displayName?: string) => { success: boolean; isAdmin: boolean };
  loginAsDemoAdmin: () => void;
  logout: () => Promise<void>;
  
  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<ViewRoute>('signin');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Persistent storage state with localStorage hydration
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('atelier:products:v1');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('atelier:categories:v1');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('atelier:orders:v1');
      if (saved) {
        const parsed: Order[] = JSON.parse(saved);
        const realOrders = parsed.filter(
          (o) =>
            !o.id.startsWith('ord-104') &&
            o.orderNumber !== 'ATL-2026-1042' &&
            o.orderNumber !== 'ATL-2026-1041' &&
            o.customerEmail !== 'elena.vance@chambers-curation.com' &&
            o.customerEmail !== 'marcus@sterling-holdings.co.uk'
        );
        return realOrders;
      }
    } catch {}
    return [];
  });

  const customers = useMemo<Customer[]>(() => {
    const custMap = new Map<string, Customer>();
    orders.forEach((o) => {
      const email = o.customerEmail || 'patron@example.com';
      if (!custMap.has(email)) {
        custMap.set(email, {
          id: `cust-${email}`,
          name: o.customerName || 'Boutique Patron',
          email,
          orderCount: 1,
          totalSpent: o.totalAmount,
          createdAt: o.createdAt,
          status: o.totalAmount > 600 ? 'vip' : 'active',
        });
      } else {
        const existing = custMap.get(email)!;
        existing.orderCount += 1;
        existing.totalSpent += o.totalAmount;
        if (existing.totalSpent > 600) existing.status = 'vip';
      }
    });
    return Array.from(custMap.values());
  }, [orders]);
  const [discounts] = useState<DiscountCode[]>(initialDiscounts);
  const [settings] = useState<StoreSettings>(initialStoreSettings);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('atelier:cart:v1');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('atelier:wishlist:v1');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Checkout Draft
  const [checkoutData, setCheckoutData] = useState({
    contactEmail: 'elena.vance@chambers-curation.com',
    shippingAddress: {
      firstName: 'Elena',
      lastName: 'Vance',
      streetAddress: '742 Evergreen Galleria, Penthouse 4B',
      city: 'New York',
      state: 'New York',
      postalCode: '10021',
      country: 'United States of America',
    },
    deliveryMethod: 'white-glove',
    paymentMethod: 'credit-card',
  });

  // Auth & Demo Mode
  const [currentUser, setCurrentUser] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('atelier:user:v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.displayName === 'Master Curator' || parsed?.email?.includes('admin')) {
          localStorage.removeItem('atelier:user:v1');
          return null;
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return null;
  });
  const [isDemoMode, setIsDemoMode] = useState(!isFirebaseConfigured);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('atelier:products:v1', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('atelier:categories:v1', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('atelier:orders:v1', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('atelier:cart:v1', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('atelier:wishlist:v1', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('atelier:user:v1', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('atelier:user:v1');
    }
  }, [currentUser]);

  // Real-time cross-tab storage sync
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'atelier:orders:v1' && e.newValue) {
        try {
          setOrders(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === 'atelier:products:v1' && e.newValue) {
        try {
          setProducts(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Firebase auth state listener
  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user);
        }
      });
      return () => unsubscribe();
    }
  }, []);

  const isAdmin = useMemo(() => {
    if (!currentUser) return false;
    const email = (currentUser.email || '').toLowerCase().trim();
    return (
      email === 'ayeshaanwer6969@gmail.com' ||
      email === 'ayeshaanwer6969gmail.com' ||
      (currentUser as any).role === 'admin'
    );
  }, [currentUser]);

  const loginWithGoogle = async () => {
    if (auth && isFirebaseConfigured) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        setCurrentUser(result.user);
        showToast('Successfully signed in with Google');
      } catch (err: any) {
        showToast(err.message || 'Google sign-in failed', 'error');
      }
    } else {
      // Demo login
      const demoUser = {
        uid: 'demo-user-1',
        email: 'ayeshaanwer6969@gmail.com',
        displayName: 'Admin Ayesha',
        role: 'admin',
      };
      setCurrentUser(demoUser);
      showToast('Signed in as Admin Ayesha');
    }
  };

  const loginWithEmail = (
    email: string,
    password?: string,
    displayName?: string
  ): { success: boolean; isAdmin: boolean } => {
    const rawEmail = email.trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    // Check specific Admin credentials:
    const ADMIN_EMAIL = 'ayeshaanwer6969@gmail.com';
    const ADMIN_PASSWORDS = ['009', 'ayeshaanwer009', 'password009'];
    
    // Normalize input to be very permissive
    const normalizedEmail = rawEmail.replace(/[@]/g, '');
    const normalizedAdminEmail = ADMIN_EMAIL.replace(/[@]/g, '');

    const isAdminEmail = rawEmail === ADMIN_EMAIL || normalizedEmail === normalizedAdminEmail;
    const isAdminPassword = ADMIN_PASSWORDS.includes(cleanPassword);

    console.log('Login attempt:', { rawEmail, isAdminEmail, isAdminPassword });

    if (isAdminEmail) {
      if (!isAdminPassword) {
        showToast('Incorrect password for admin account', 'error');
        return { success: false, isAdmin: false };
      }
      const adminUser = {
        uid: 'admin-ayeshaanwer',
        email: ADMIN_EMAIL,
        displayName: displayName?.trim() || 'Admin Ayesha',
        role: 'admin',
      };
      setCurrentUser(adminUser);
      showToast('Admin authenticated! Launching Admin Portal...', 'success');
      return { success: true, isAdmin: true };
    }

    // Regular Customer / Patron login
    const user = {
      uid: 'user-' + Math.random().toString(36).substring(2, 9),
      email: email.trim(),
      displayName: displayName?.trim() || email.split('@')[0] || 'Atelier Patron',
      role: 'user',
    };
    setCurrentUser(user);
    showToast(`Welcome! Signed in as ${user.displayName}`);
    return { success: true, isAdmin: false };
  };

  const loginAsDemoAdmin = () => {
    const demoAdmin = {
      uid: 'admin-ayeshaanwer',
      email: 'ayeshaanwer6969@gmail.com',
      displayName: 'Admin Ayesha',
      role: 'admin',
    };
    setCurrentUser(demoAdmin);
    showToast('Signed in as Admin Ayesha');
  };

  const logout = async () => {
    if (auth && isFirebaseConfigured && !isDemoMode) {
      await fbSignOut(auth);
    }
    setCurrentUser(null);
    showToast('Signed out successfully', 'info');
  };

  // Cart Actions
  const addToCart = (product: Product, quantity = 1, colorway?: string, hardware?: string) => {
    const cartItemId = `${product.id}-${colorway || 'default'}-${hardware || 'default'}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            cartItemId,
            productId: product.id,
            product,
            quantity,
            selectedColorway: colorway || product.variants?.colorways?.[0]?.name,
            selectedHardware: hardware || product.variants?.hardwareFinishes?.[0],
            addedAt: new Date().toISOString(),
          },
        ];
      }
    });
    showToast(`Added ${product.name} to your Atelier Bag`);
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) => prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item)));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyDiscountCode = (codeStr: string) => {
    const found = discounts.find((d) => d.code.toUpperCase() === codeStr.toUpperCase() && d.active);
    if (found) {
      setAppliedDiscount(found);
      showToast(`Promo voucher "${found.code}" successfully applied.`);
      return { success: true, message: 'Discount applied successfully' };
    } else {
      showToast('Invalid or expired promotional code', 'error');
      return { success: false, message: 'Invalid code' };
    }
  };

  const removeDiscountCode = () => {
    setAppliedDiscount(null);
    showToast('Voucher removed', 'info');
  };

  // Wishlist Actions
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.productId === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from wishlist`, 'info');
        return prev.filter((item) => item.productId !== product.id);
      } else {
        showToast(`Saved ${product.name} to your wishlist`);
        return [
          ...prev,
          {
            wishlistItemId: `wish-${product.id}`,
            productId: product.id,
            product,
            addedAt: new Date().toISOString(),
          },
        ];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.productId === productId);
  };

  // Filter Pipeline
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.categoryName.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat) return false;
        }
        // Category filter
        if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) {
          return false;
        }
        // Price range
        if (p.price < priceRange[0] || p.price > priceRange[1]) {
          return false;
        }
        // Stock
        if (inStockOnly && p.stockQuantity <= 0) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        // default 'featured'
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [products, searchQuery, selectedCategory, priceRange, inStockOnly, sortBy]);

  // Checkout & Order creation
  const updateCheckoutData = (data: any) => {
    setCheckoutData((prev) => ({ ...prev, ...data }));
  };

  const placeOrder = (address: any, delivery: string, payment: string): Order => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discountAmount = appliedDiscount
      ? appliedDiscount.type === 'percentage'
        ? (subtotal * appliedDiscount.value) / 100
        : appliedDiscount.value
      : 0;
    const shippingAmount = delivery === 'express-air' ? 35 : subtotal >= 300 ? 0 : 25;
    const taxAmount = Number(((subtotal - discountAmount) * 0.075).toFixed(2));
    const totalAmount = Number((subtotal - discountAmount + shippingAmount + taxAmount).toFixed(2));

    const newOrder: Order = {
      id: `ord-${Date.now().toString().slice(-4)}`,
      orderNumber: `ATL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: `${address.firstName} ${address.lastName}`,
      customerEmail: checkoutData.contactEmail,
      items: cart.map((i) => ({
        productId: i.productId,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        selectedColorway: i.selectedColorway,
        selectedHardware: i.selectedHardware,
        imageUrl: i.product.imageUrls[0],
      })),
      shippingAddress: address,
      subtotal,
      discountAmount,
      shippingAmount,
      taxAmount,
      totalAmount,
      deliveryMethod: delivery === 'express-air' ? 'Express Priority Courier' : 'Atelier White Glove Signature',
      paymentMethod: payment === 'card' ? 'Credit Card' : 'Cash on Delivery / Instant Pay',
      paymentStatus: 'paid',
      fulfillmentStatus: 'processing',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedDiscount(null);
    setSelectedOrderId(newOrder.id);
    showToast(`Order ${newOrder.orderNumber} successfully placed`);
    return newOrder;
  };

  // Admin Actions
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProd: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Product "${newProd.name}" created successfully`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    );
    showToast('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted', 'info');
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    showToast('Category updated successfully');
  };

  const updateOrderStatus = (orderId: string, status: Order['fulfillmentStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, fulfillmentStatus: status, updatedAt: new Date().toISOString() } : o))
    );
    showToast(`Order status updated to ${status}`);
  };

  const updateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stockQuantity: Math.max(0, newStock) } : p))
    );
    showToast('Inventory stock updated');
  };

  const simulateIncomingOrder = (): Order => {
    const randomProduct = products[Math.floor(Math.random() * products.length)] || initialProducts[0];
    const cities = ['New York, USA', 'London, UK', 'Tokyo, Japan', 'Paris, France', 'Milan, Italy', 'Zurich, Switzerland'];
    const names = ['Sophia Laurent', 'Julian Sterling', 'Claire Beaumont', 'Liam Harrington', 'Elena Vance', 'Alexander Cross'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const orderNum = `ATL-${Math.floor(1000 + Math.random() * 9000)}`;
    const qty = Math.floor(Math.random() * 2) + 1;
    const totalAmount = randomProduct.price * qty;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      customerName: randomName,
      customerEmail: `${randomName.toLowerCase().replace(' ', '.')}@chambers.luxury`,
      items: [
        {
          productId: randomProduct.id,
          name: randomProduct.name,
          price: randomProduct.price,
          quantity: qty,
          imageUrl: randomProduct.imageUrls?.[0] || '',
        },
      ],
      shippingAddress: {
        firstName: randomName.split(' ')[0],
        lastName: randomName.split(' ')[1] || 'Patron',
        streetAddress: '342 Madison Avenue',
        city: randomCity.split(',')[0],
        state: 'Curated District',
        postalCode: '10017',
        country: randomCity.split(',')[1]?.trim() || 'USA',
        email: `${randomName.toLowerCase().replace(' ', '.')}@chambers.luxury`,
      },
      subtotal: totalAmount,
      discountAmount: 0,
      shippingAmount: 0,
      taxAmount: 0,
      totalAmount,
      deliveryMethod: 'Atelier White Glove Signature',
      paymentMethod: 'Instant Pay',
      paymentStatus: 'paid',
      fulfillmentStatus: 'processing',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    showToast(`⚡ Real-time Order: ${orderNum} from ${randomCity} ($${totalAmount.toLocaleString()})`, 'success');
    return newOrder;
  };

  const clearAllOrders = () => {
    setOrders([]);
    localStorage.removeItem('atelier:orders:v1');
    showToast('All order records wiped. Real-time slate reset to 0.', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        route,
        setRoute,
        selectedProductId,
        setSelectedProductId,
        selectedOrderId,
        setSelectedOrderId,
        products,
        categories,
        orders,
        customers,
        discounts,
        settings,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        appliedDiscount,
        applyDiscountCode,
        removeDiscountCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        inStockOnly,
        setInStockOnly,
        sortBy,
        setSortBy,
        filteredProducts,
        checkoutData,
        updateCheckoutData,
        placeOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        updateCategory,
        updateOrderStatus,
        updateStock,
        simulateIncomingOrder,
        clearAllOrders,
        currentUser,
        isAdmin,
        isDemoMode,
        setIsDemoMode,
        loginWithGoogle,
        loginWithEmail,
        loginAsDemoAdmin,
        logout,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
