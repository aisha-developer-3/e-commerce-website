export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  categoryId: string;
  categoryName: string;
  price: number;
  compareAtPrice?: number;
  imageUrls: string[];
  variants?: {
    colorways?: { name: string; hex: string }[];
    hardwareFinishes?: string[];
  };
  stockQuantity: number;
  status: 'active' | 'draft' | 'archived';
  isBestseller?: boolean;
  isNewArrival?: boolean;
  rating?: number;
  reviewCount?: number;
  dimensions?: { width: number; height: number; depth: number; unit: string };
  materials?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
  status: 'active' | 'inactive';
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedColorway?: string;
  selectedHardware?: string;
  addedAt: string;
}

export interface WishlistItem {
  wishlistItemId: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface OrderAddress {
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  email: string;
  phone?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedColorway?: string;
  selectedHardware?: string;
  imageUrl: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  shippingAddress: OrderAddress;
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
  totalAmount: number;
  deliveryMethod: string;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  fulfillmentStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  orderCount: number;
  totalSpent: number;
  createdAt: string;
  status: 'active' | 'vip' | 'inactive';
}

export interface DiscountCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderValue?: number;
  expirationDate?: string;
  active: boolean;
}

export interface StoreSettings {
  storeName: string;
  currency: string;
  shippingThreshold: number;
  standardShippingCost: number;
  expressShippingCost: number;
  announcementMessage: string;
  maintenanceMode: boolean;
}

export type ViewRoute =
  | 'home'
  | 'shop'
  | 'category'
  | 'product-detail'
  | 'wishlist'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'account'
  | 'signin'
  | 'admin-dashboard'
  | 'admin-products'
  | 'admin-categories'
  | 'admin-orders'
  | 'admin-inventory'
  | 'admin-customers'
  | 'admin-discounts'
  | 'admin-settings';
