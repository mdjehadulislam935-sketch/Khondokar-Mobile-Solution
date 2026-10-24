/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  ProductCategory,
  RepairService,
  RepairBooking,
  Order,
  CartItem,
  CustomerUser,
  PageView,
  AdminSection,
  RepairStatus,
  OrderStatus,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_SERVICES,
  INITIAL_BOOKINGS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
} from '../data/initialData';
import { translations, Language } from '../translations';
import {
  db,
  auth,
  googleProvider,
  testConnection,
  handleFirestoreError,
  OperationType,
} from '../firebase/config';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Language & Translation
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;

  // Navigation
  page: PageView;
  navigate: (page: PageView, params?: { productId?: string; serviceId?: string }) => void;
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;
  adminSection: AdminSection;
  setAdminSection: (section: AdminSection) => void;

  // Selected entities for detail views
  selectedProductId: string | null;
  selectedServiceId: string | null;
  setSelectedProductId: (id: string | null) => void;
  setSelectedServiceId: (id: string | null) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Services
  services: RepairService[];

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartItemCount: number;

  // Orders
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => Order;
  updateOrderStatus: (id: string, status: OrderStatus) => void;

  // Repair Bookings
  bookings: RepairBooking[];
  createBooking: (bookingData: Omit<RepairBooking, 'id' | 'trackingCode' | 'createdAt' | 'updatedAt' | 'status'>) => RepairBooking;
  updateBookingStatus: (id: string, status: RepairStatus, notes?: string, cost?: number) => void;

  // Customers & Auth
  customers: CustomerUser[];
  currentUser: CustomerUser | null;
  loginUser: (phoneOrEmail: string, password?: string) => boolean;
  loginWithGoogle: () => Promise<boolean>;
  logoutUser: () => void;
  registerUser: (customer: Omit<CustomerUser, 'id' | 'registeredAt'>) => CustomerUser;
  // Categories
  categories: ProductCategory[];
  addCategory: (name: string, description?: string) => void;
  deleteCategory: (id: string) => void;

  // Admin Security & Credentials (imdad1190 / imdad@1190)
  isAdminAuthenticated: boolean;
  adminId: string;
  adminPassword: string;
  loginAdmin: (id: string, pass: string) => boolean;
  logoutAdmin: () => void;
  updateAdminCredentials: (newId: string, newPass: string) => void;
  updateAdminPassword: (newPass: string) => void;

  // Cloud status
  isCloudConnected: boolean;

  // Toasts
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;

  // Global filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language & Translation State
  const [lang, setLangState] = useState<Language>(() => {
    try {
      return (localStorage.getItem('kms_lang') as Language) || 'en';
    } catch {
      return 'en';
    }
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('kms_lang', newLang);
    } catch {}
  };

  const t = (key: keyof typeof translations['en']): string => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  // Navigation State
  const [page, setPage] = useState<PageView>('home');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [adminSection, setAdminSection] = useState<AdminSection>('overview');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCloudConnected, setIsCloudConnected] = useState<boolean>(false);

  // Persistence Loaders (Permanent deletion filtered out via blacklist)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const deletedIds: string[] = JSON.parse(localStorage.getItem('kms_deleted_product_ids') || '[]');
      const saved = localStorage.getItem('kms_products');
      const base: Product[] = saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
      return base.filter((p) => !deletedIds.includes(p.id) && !p.isArchived);
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [services] = useState<RepairService[]>(INITIAL_SERVICES);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kms_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('kms_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [bookings, setBookings] = useState<RepairBooking[]>(() => {
    try {
      const saved = localStorage.getItem('kms_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [customers, setCustomers] = useState<CustomerUser[]>(() => {
    try {
      const saved = localStorage.getItem('kms_customers');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => {
    try {
      const saved = localStorage.getItem('kms_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Dynamic Categories State
  const [categories, setCategories] = useState<ProductCategory[]>(() => {
    try {
      const saved = localStorage.getItem('kms_categories');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // Admin Security Credentials (Default: imdad1190 & imdad@1190)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('kms_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [adminId, setAdminIdState] = useState<string>(() => {
    try {
      return localStorage.getItem('kms_admin_id') || 'imdad1190';
    } catch {
      return 'imdad1190';
    }
  });

  const [adminPassword, setAdminPasswordState] = useState<string>(() => {
    try {
      return localStorage.getItem('kms_admin_password') || 'imdad@1190';
    } catch {
      return 'imdad@1190';
    }
  });

  const [toast, setToast] = useState<ToastState | null>(null);

  // Local storage backup sync
  useEffect(() => {
    localStorage.setItem('kms_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('kms_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('kms_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('kms_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('kms_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('kms_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('kms_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('kms_user');
    }
  }, [currentUser]);

  // Firestore Real-Time Initialization & Connection Validation
  useEffect(() => {
    let unsubscribeBookings: (() => void) | null = null;
    let unsubscribeOrders: (() => void) | null = null;

    async function initCloudSync() {
      try {
        const connected = await testConnection();
        setIsCloudConnected(connected);

        if (connected) {
          // Listen to bookings collection
          unsubscribeBookings = onSnapshot(
            collection(db, 'bookings'),
            (snapshot) => {
              if (!snapshot.empty) {
                const cloudBookings: RepairBooking[] = [];
                snapshot.forEach((d) => {
                  cloudBookings.push(d.data() as RepairBooking);
                });
                setBookings((prev) => {
                  // Merge by id preferring cloud
                  const map = new Map<string, RepairBooking>();
                  prev.forEach((b) => map.set(b.id, b));
                  cloudBookings.forEach((b) => map.set(b.id, b));
                  return Array.from(map.values());
                });
              }
            },
            (error) => {
              handleFirestoreError(error, OperationType.LIST, 'bookings');
            }
          );

          // Listen to orders collection
          unsubscribeOrders = onSnapshot(
            collection(db, 'orders'),
            (snapshot) => {
              if (!snapshot.empty) {
                const cloudOrders: Order[] = [];
                snapshot.forEach((d) => {
                  cloudOrders.push(d.data() as Order);
                });
                setOrders((prev) => {
                  const map = new Map<string, Order>();
                  prev.forEach((o) => map.set(o.id, o));
                  cloudOrders.forEach((o) => map.set(o.id, o));
                  return Array.from(map.values());
                });
              }
            },
            (error) => {
              handleFirestoreError(error, OperationType.LIST, 'orders');
            }
          );
        }
      } catch (err) {
        console.warn('Firebase sync initialized in offline/resilient mode:', err);
      }
    }

    initCloudSync();

    // Firebase Auth State listener
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const cloudUser: CustomerUser = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'Google User',
          phone: firebaseUser.phoneNumber || '+8801885181199',
          email: firebaseUser.email || 'customer@khandokar.com',
          address: 'Ful-gazi Workshop Area',
          district: 'Feni',
          registeredAt: new Date().toISOString(),
        };
        setCurrentUser(cloudUser);
      }
    });

    return () => {
      if (unsubscribeBookings) unsubscribeBookings();
      if (unsubscribeOrders) unsubscribeOrders();
      unsubscribeAuth();
    };
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 4000);
  };

  const navigate = (nextPage: PageView, params?: { productId?: string; serviceId?: string }) => {
    if (params?.productId) {
      setSelectedProductId(params.productId);
    }
    if (params?.serviceId) {
      setSelectedServiceId(params.serviceId);
    }
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product Actions
  const addProduct = async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const id = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    };
    setProducts((prev) => [newProduct, ...prev]);

    // Cloud sync to Firestore
    try {
      await setDoc(doc(db, 'products', id), newProduct);
    } catch (err) {
      console.warn('Saved locally, cloud sync pending:', err);
    }

    showToast(`Added product "${data.name}"`, 'success');
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    const now = new Date().toISOString();
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: now } : p))
    );

    try {
      await updateDoc(doc(db, 'products', id), { ...updates, updatedAt: now });
    } catch (err) {
      console.warn('Updated locally:', err);
    }

    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    // 1. Permanently remove from products state
    setProducts((prev) => prev.filter((p) => p.id !== id));

    // 2. Remove from cart if item is currently in cart
    setCart((prev) => prev.filter((item) => item.product.id !== id));

    // 3. Save to deleted IDs blacklist so initial seed never reinstates it
    try {
      const deletedIds: string[] = JSON.parse(
        localStorage.getItem('kms_deleted_product_ids') || '[]'
      );
      if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        localStorage.setItem('kms_deleted_product_ids', JSON.stringify(deletedIds));
      }
    } catch (e) {
      console.warn('Error saving deleted ID:', e);
    }

    // 4. Delete document from Firestore cloud collection
    try {
      deleteDoc(doc(db, 'products', id)).catch(() => {});
    } catch (err) {
      console.warn('Deleted locally:', err);
    }

    showToast(
      lang === 'bn' ? 'প্রোডাক্টটি সফলভাবে একবারে ডিলিট করা হয়েছে।' : 'Product permanently deleted.',
      'info'
    );
  };

  // Cart Actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to cart`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + (item.product.discountPrice ?? item.product.price) * item.quantity,
    0
  );

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Orders Actions with Firestore Cloud Persistence
  const placeOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order => {
    const now = new Date().toISOString();
    const orderNumber = `KMS-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const id = `ord-${Date.now()}`;
    const newOrder: Order = {
      ...orderData,
      id,
      orderNumber,
      createdAt: now,
      updatedAt: now,
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Persist to Cloud Firestore
    setDoc(doc(db, 'orders', id), newOrder).catch((err) => {
      console.warn('Order saved locally, cloud sync error:', err);
    });

    showToast(`Order ${orderNumber} placed & saved to Cloud!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    const now = new Date().toISOString();
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, orderStatus: status, updatedAt: now } : o))
    );

    updateDoc(doc(db, 'orders', id), { orderStatus: status, updatedAt: now }).catch((err) => {
      console.warn('Updated locally:', err);
    });

    showToast(`Order status updated to ${status}`, 'success');
  };

  // Repair Booking Actions with Firestore Cloud Persistence
  const createBooking = (
    bookingData: Omit<RepairBooking, 'id' | 'trackingCode' | 'createdAt' | 'updatedAt' | 'status'>
  ): RepairBooking => {
    const now = new Date().toISOString();
    const trackingCode = `KMS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const id = `rep-${Date.now()}`;
    const newBooking: RepairBooking = {
      ...bookingData,
      id,
      trackingCode,
      status: 'received',
      createdAt: now,
      updatedAt: now,
    };
    setBookings((prev) => [newBooking, ...prev]);

    // Persist to Cloud Firestore
    setDoc(doc(db, 'bookings', id), newBooking).catch((err) => {
      console.warn('Booking saved locally, cloud sync error:', err);
    });

    showToast(`Repair booking registered to Cloud! Tracking code: ${trackingCode}`, 'success');
    return newBooking;
  };

  const updateBookingStatus = (
    id: string,
    status: RepairStatus,
    notes?: string,
    cost?: number
  ) => {
    const now = new Date().toISOString();
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status,
              ...(notes !== undefined ? { technicianNotes: notes } : {}),
              ...(cost !== undefined ? { estimatedCost: cost } : {}),
              updatedAt: now,
            }
          : b
      )
    );

    const updatePayload: Record<string, any> = { status, updatedAt: now };
    if (notes !== undefined) updatePayload.technicianNotes = notes;
    if (cost !== undefined) updatePayload.estimatedCost = cost;

    updateDoc(doc(db, 'bookings', id), updatePayload).catch((err) => {
      console.warn('Updated locally:', err);
    });

    showToast(`Booking status updated to ${status.replace('_', ' ')}`, 'success');
  };

  // Customer Auth (Mobile Number + Password verification)
  const loginUser = (phoneOrEmail: string, password?: string): boolean => {
    const cleanInput = phoneOrEmail.trim().replace(/\s+/g, '');
    if (!cleanInput) {
      showToast(lang === 'bn' ? 'মোবাইল নম্বর লিখুন' : 'Please enter your mobile number', 'error');
      return false;
    }

    const found = customers.find((c) => {
      const cleanPhone = (c.phone || '').trim().replace(/\s+/g, '');
      const phoneMatches =
        cleanPhone === cleanInput ||
        cleanPhone.endsWith(cleanInput) ||
        cleanInput.endsWith(cleanPhone);
      const emailMatches =
        Boolean(c.email) && c.email.toLowerCase() === phoneOrEmail.trim().toLowerCase();
      return phoneMatches || emailMatches;
    });

    if (found) {
      if (password !== undefined && found.password && found.password !== password.trim()) {
        showToast(
          lang === 'bn' ? 'ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।' : 'Incorrect password. Please try again.',
          'error'
        );
        return false;
      }
      setCurrentUser(found);
      showToast(
        lang === 'bn' ? `স্বাগতম, ${found.name}!` : `Welcome back, ${found.name}!`,
        'success'
      );
      return true;
    }

    showToast(
      lang === 'bn'
        ? 'এই মোবাইল নম্বরে কোনো অ্যাকাউন্ট নেই। অনুগ্রহ করে রেজিস্টার করুন।'
        : 'No customer account found with this phone. Please register first.',
      'error'
    );
    return false;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const newUser: CustomerUser = {
        id: user.uid,
        name: user.displayName || 'Google User',
        phone: user.phoneNumber || '',
        email: user.email || 'customer@gmail.com',
        address: 'Ful-gazi Workshop Area',
        district: 'Feni',
        registeredAt: new Date().toISOString(),
      };
      setCurrentUser(newUser);
      showToast(
        lang === 'bn'
          ? `গুগল দিয়ে সাইন ইন সফল হয়েছে, ${newUser.name}!`
          : `Signed in with Google as ${newUser.name}!`,
        'success'
      );
      return true;
    } catch (err: any) {
      console.error('Google Sign In error:', err);
      showToast(
        lang === 'bn' ? 'গুগল সাইন-ইন বাতিল বা সম্পন্ন হয়নি' : 'Google sign-in completed or cancelled',
        'info'
      );
      return false;
    }
  };

  const registerUser = (data: Omit<CustomerUser, 'id' | 'registeredAt'>): CustomerUser => {
    const id = `cust-${Date.now()}`;
    const newUser: CustomerUser = {
      ...data,
      id,
      registeredAt: new Date().toISOString(),
    };
    setCustomers((prev) => [newUser, ...prev.filter((c) => c.phone !== data.phone)]);
    setCurrentUser(newUser);

    setDoc(doc(db, 'customers', id), newUser).catch((err) => {
      console.warn('Customer registered locally:', err);
    });

    showToast(
      lang === 'bn'
        ? `রেজিস্ট্রেশন সম্পন্ন হয়েছে! স্বাগতম ${newUser.name}`
        : `Account registered successfully for ${newUser.name}!`,
      'success'
    );
    return newUser;
  };

  const logoutUser = () => {
    signOut(auth).catch(() => {});
    setCurrentUser(null);
    showToast(lang === 'bn' ? 'লগআউট সফল হয়েছে' : 'Signed out successfully', 'info');
  };

  // Category Actions
  const addCategory = (name: string, description?: string) => {
    const trimmed = name.trim();
    if (!trimmed) {
      showToast(lang === 'bn' ? 'ক্যাটাগরির নাম খালি রাখা যাবে না' : 'Category name cannot be empty', 'error');
      return;
    }
    if (categories.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
      showToast(lang === 'bn' ? 'ক্যাটাগরিটি ইতিমধ্যে রয়েছে' : 'Category already exists', 'error');
      return;
    }
    const newCat: ProductCategory = {
      id: `cat-${Date.now()}`,
      name: trimmed,
      description: description?.trim() || 'Custom smartphone accessory and parts category',
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(
      lang === 'bn' ? `নতুন ক্যাটাগরি "${trimmed}" যুক্ত হয়েছে` : `Added new category "${trimmed}"`,
      'success'
    );
  };

  const deleteCategory = (id: string) => {
    const target = categories.find((c) => c.id === id);
    if (!target) return;
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast(
      lang === 'bn' ? `ক্যাটাগরি "${target.name}" মুছে ফেলা হয়েছে` : `Removed category "${target.name}"`,
      'info'
    );
  };

  // Admin Authentication Actions (ID: imdad1190 & Password: imdad@1190)
  const loginAdmin = (idAttempt: string, passwordAttempt: string): boolean => {
    if (
      idAttempt.trim() === adminId.trim() &&
      passwordAttempt.trim() === adminPassword.trim()
    ) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('kms_admin_auth', 'true');
      showToast(
        lang === 'bn' ? 'অ্যাডমিন প্যানেলে স্বাগতম, প্রোপ্রাইটর!' : 'Welcome to Admin Portal, Proprietor!',
        'success'
      );
      return true;
    }
    showToast(
      lang === 'bn'
        ? 'ভুল অ্যাডমিন আইডি বা পাসওয়ার্ড! অনুগ্রহ করে আবার চেষ্টা করুন।'
        : 'Invalid Admin ID or Password. Please try again.',
      'error'
    );
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('kms_admin_auth');
    showToast(lang === 'bn' ? 'অ্যাডমিন কনসোল থেকে লগআউট সম্পন্ন' : 'Logged out of Admin Console', 'info');
  };

  const updateAdminCredentials = (newId: string, newPass: string) => {
    const trimmedId = newId.trim();
    const trimmedPass = newPass.trim();
    if (!trimmedId) {
      showToast(lang === 'bn' ? 'অ্যাডমিন আইডি খালি রাখা যাবে না' : 'Admin ID cannot be empty', 'error');
      return;
    }
    if (trimmedPass.length < 4) {
      showToast(lang === 'bn' ? 'পাসওয়ার্ড অন্তত ৪ অক্ষরের হতে হবে' : 'Password must be at least 4 characters', 'error');
      return;
    }
    setAdminIdState(trimmedId);
    setAdminPasswordState(trimmedPass);
    localStorage.setItem('kms_admin_id', trimmedId);
    localStorage.setItem('kms_admin_password', trimmedPass);
    showToast(
      lang === 'bn'
        ? 'অ্যাডমিন আইডি ও পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে!'
        : 'Admin ID & Password updated successfully!',
      'success'
    );
  };

  const updateAdminPassword = (newPass: string) => {
    updateAdminCredentials(adminId, newPass);
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        page,
        navigate,
        isAdminMode,
        setIsAdminMode,
        adminSection,
        setAdminSection,
        selectedProductId,
        selectedServiceId,
        setSelectedProductId,
        setSelectedServiceId,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        categories,
        addCategory,
        deleteCategory,
        isAdminAuthenticated,
        adminId,
        adminPassword,
        loginAdmin,
        logoutAdmin,
        updateAdminCredentials,
        updateAdminPassword,
        services,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartItemCount,
        orders,
        placeOrder,
        updateOrderStatus,
        bookings,
        createBooking,
        updateBookingStatus,
        customers,
        currentUser,
        loginUser,
        loginWithGoogle,
        registerUser,
        logoutUser,
        isCloudConnected,
        toast,
        showToast,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
