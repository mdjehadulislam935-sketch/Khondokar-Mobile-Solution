/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  description: string;
  image: string;
  price: number; // in BDT (৳)
  discountPrice?: number;
  stockQuantity: number;
  availability: 'in_stock' | 'out_of_stock' | 'pre_order';
  compatibleModels: string[];
  details: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  isDemo: boolean;
  isArchived?: boolean; // soft-delete to preserve order history
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
}

export interface RepairService {
  id: string;
  title: string;
  category: 'hardware' | 'software' | 'diagnostics' | 'component';
  description: string;
  iconName: string;
  turnaroundTime: string;
  warrantyPeriod: string;
  startingPrice: number; // in BDT (৳)
  features: string[];
}

export type RepairStatus =
  | 'received'
  | 'diagnosing'
  | 'in_repair'
  | 'ready_for_pickup'
  | 'completed'
  | 'cancelled';

export interface RepairBooking {
  id: string;
  trackingCode: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deviceBrand: string;
  deviceModel: string;
  serviceId: string;
  serviceTitle: string;
  problemDescription: string;
  customerAddress?: string;
  preferredDate: string;
  status: RepairStatus;
  estimatedCost?: number;
  actualCost?: number;
  technicianNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cod' | 'bkash_nagad';
export type PaymentStatus = 'pending' | 'verified' | 'paid';

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: string;
  district: string;
  deliveryNotes?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  password?: string;
  address: string;
  district: string;
  registeredAt: string;
}

export type PageView =
  | 'home'
  | 'about'
  | 'services'
  | 'shop'
  | 'product-details'
  | 'booking'
  | 'contact'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'cart'
  | 'checkout'
  | 'orders'
  | 'tracking'
  | 'privacy'
  | 'terms'
  | 'refund';

export type AdminSection =
  | 'overview'
  | 'products'
  | 'categories'
  | 'customers'
  | 'orders'
  | 'bookings'
  | 'inventory'
  | 'sales'
  | 'content'
  | 'settings'
  | 'security';
