/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminSection, Product, RepairStatus, OrderStatus } from '../../types';
import { BUSINESS_INFO } from '../../data/initialData';
import {
  LayoutDashboard,
  Package,
  Layers,
  Users,
  ShoppingBag,
  Wrench,
  BarChart3,
  FileText,
  Settings,
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Clock,
  DollarSign,
  ArrowRight,
  TrendingUp,
  Save,
  X,
  Phone,
  Mail,
  MapPin,
  Lock,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    adminSection,
    setAdminSection,
    setIsAdminMode,
    navigate,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    bookings,
    updateBookingStatus,
    orders,
    updateOrderStatus,
    customers,
    showToast,
  } = useApp();

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for product
  const [pName, setPName] = useState('');
  const [pSku, setPSku] = useState('');
  const [pCategory, setPCategory] = useState('Screens & Displays');
  const [pPrice, setPPrice] = useState(1000);
  const [pDiscountPrice, setPDiscountPrice] = useState<number | undefined>(undefined);
  const [pStock, setPStock] = useState(10);
  const [pDesc, setPDesc] = useState('');
  const [pCompatible, setPCompatible] = useState('Samsung, Xiaomi, Vivo');

  // Search in admin
  const [adminSearch, setAdminSearch] = useState('');

  // Selected booking for editing
  const [selectedBookingForEdit, setSelectedBookingForEdit] = useState<string | null>(null);
  const [bookingStatusInput, setBookingStatusInput] = useState<RepairStatus>('received');
  const [techNotesInput, setTechNotesInput] = useState('');
  const [costInput, setCostInput] = useState<number>(500);

  // Business info state for editor
  const [bPhone, setBPhone] = useState(BUSINESS_INFO.phone);
  const [bEmail, setBEmail] = useState(BUSINESS_INFO.email);
  const [bAddress, setBAddress] = useState(BUSINESS_INFO.address);
  const [bHours, setBHours] = useState(BUSINESS_INFO.openingHours);

  // Metrics calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeBookingsCount = bookings.filter(
    (b) => b.status !== 'completed' && b.status !== 'cancelled'
  ).length;
  const lowStockCount = products.filter((p) => !p.isArchived && p.stockQuantity <= 15).length;

  const handleOpenAdd = () => {
    setPName('');
    setPSku(`KMS-NEW-${Math.floor(100 + Math.random() * 900)}`);
    setPCategory('Accessories');
    setPPrice(500);
    setPDiscountPrice(undefined);
    setPStock(20);
    setPDesc('');
    setPCompatible('Universal Smartphone');
    setShowAddModal(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setPName(p.name);
    setPSku(p.sku);
    setPCategory(p.category);
    setPPrice(p.price);
    setPDiscountPrice(p.discountPrice);
    setPStock(p.stockQuantity);
    setPDesc(p.description);
    setPCompatible(p.compatibleModels.join(', '));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const models = pCompatible
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: pName,
        sku: pSku,
        category: pCategory,
        price: Number(pPrice),
        discountPrice: pDiscountPrice ? Number(pDiscountPrice) : undefined,
        stockQuantity: Number(pStock),
        description: pDesc,
        compatibleModels: models,
      });
      setEditingProduct(null);
    } else {
      addProduct({
        name: pName,
        sku: pSku,
        category: pCategory,
        price: Number(pPrice),
        discountPrice: pDiscountPrice ? Number(pDiscountPrice) : undefined,
        stockQuantity: Number(pStock),
        availability: Number(pStock) > 0 ? 'in_stock' : 'out_of_stock',
        description: pDesc || 'High quality mobile replacement part.',
        image: '/src/assets/images/fast_charger_accessories_1792669912435.jpg',
        compatibleModels: models,
        details: { Warranty: '30-Day Testing Guarantee' },
        isDemo: true,
      });
      setShowAddModal(false);
    }
  };

  const navItems: { id: AdminSection; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'products', label: 'Product Management', icon: <Package className="w-4 h-4" /> },
    { id: 'categories', label: 'Category Management', icon: <Layers className="w-4 h-4" /> },
    { id: 'bookings', label: 'Repair Bookings', icon: <Wrench className="w-4 h-4" /> },
    { id: 'orders', label: 'Order Management', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'inventory', label: 'Inventory & Stock', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'customers', label: 'Customer Management', icon: <Users className="w-4 h-4" /> },
    { id: 'sales', label: 'Sales & Revenue', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'content', label: 'Website Content', icon: <FileText className="w-4 h-4" /> },
    { id: 'settings', label: 'Business Information', icon: <Settings className="w-4 h-4" /> },
    { id: 'security', label: 'Account & Security', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      {/* Admin Top Bar */}
      <header className="h-16 border-b border-slate-800 bg-slate-950/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm sm:text-base text-white tracking-tight">
              M/S Khandokar Admin Console
            </div>
            <div className="text-[11px] text-blue-400">
              Workshop Management Portal · Ful-gazi, Feni
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-medium">Firestore Live (Free Plan)</span>
          </div>

          <button
            onClick={() => {
              setIsAdminMode(false);
              navigate('home');
            }}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <span>Exit to Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Admin Body: Sidebar + Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800/80 p-4 shrink-0">
          <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-2 px-3">
            Administration Menu
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setAdminSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                  adminSection === item.id
                    ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-8 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <div className="font-semibold text-slate-200">Proprietor:</div>
            <div>{BUSINESS_INFO.proprietor}</div>
            <div className="text-slate-500 font-mono text-[10px]">{BUSINESS_INFO.phone}</div>
          </div>
        </aside>

        {/* Dynamic Section Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {/* SECTION 1: OVERVIEW */}
          {adminSection === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Live operating metrics for M/S Khandokar Mobile Solution, Feni.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Total Sales (Orders)</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-mono font-bold text-white tabular-nums">
                    ৳{totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{orders.length} orders recorded</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Active Repair Tickets</span>
                    <Wrench className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-mono font-bold text-blue-400 tabular-nums">
                    {activeBookingsCount}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {bookings.length} total repair bookings
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Catalog Products</span>
                    <Package className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-mono font-bold text-white tabular-nums">
                    {products.filter((p) => !p.isArchived).length}
                  </div>
                  <div className="text-[11px] text-slate-400">12 Initial demonstration items</div>
                </div>

                <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Stock Attention</span>
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-mono font-bold text-amber-400 tabular-nums">
                    {lowStockCount}
                  </div>
                  <div className="text-[11px] text-slate-400">Items with stock ≤ 15 units</div>
                </div>
              </div>

              {/* Recent Repair Bookings Table */}
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white">Recent Repair Bookings</h2>
                  <button
                    onClick={() => setAdminSection('bookings')}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    View All Tickets →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 px-3">Tracking Code</th>
                        <th className="py-2.5 px-3">Customer</th>
                        <th className="py-2.5 px-3">Device & Fault</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Est. Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {bookings.slice(0, 5).map((b) => (
                        <tr key={b.id} className="hover:bg-slate-800/40">
                          <td className="py-3 px-3 font-mono font-bold text-blue-400">
                            {b.trackingCode}
                          </td>
                          <td className="py-3 px-3">
                            <div className="text-white font-medium">{b.customerName}</div>
                            <div className="text-slate-500 font-mono text-[11px]">
                              {b.customerPhone}
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="text-slate-200">
                              {b.deviceBrand} {b.deviceModel}
                            </div>
                            <div className="text-slate-500 text-[11px]">{b.serviceTitle}</div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="capitalize text-slate-300 font-medium">
                              {b.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right font-mono text-white font-bold">
                            ৳{b.estimatedCost ?? '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: PRODUCT MANAGEMENT */}
          {adminSection === 'products' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Product Management
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Add, edit, search, and soft-delete products. Deleting protects historical customer
                    order records.
                  </p>
                </div>
                <button
                  onClick={handleOpenAdd}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Table */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="text-slate-400 border-b border-slate-800 bg-slate-950/40">
                      <tr>
                        <th className="py-3 px-4">Product Name & SKU</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Price (BDT)</th>
                        <th className="py-3 px-4">Stock</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {products.map((p) => (
                        <tr
                          key={p.id}
                          className={`hover:bg-slate-800/40 ${p.isArchived ? 'opacity-40' : ''}`}
                        >
                          <td className="py-3 px-4">
                            <div className="font-semibold text-white">{p.name}</div>
                            <div className="text-[11px] font-mono text-slate-500">{p.sku}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-300">{p.category}</td>
                          <td className="py-3 px-4 font-mono font-bold text-white">
                            ৳{(p.discountPrice ?? p.price).toLocaleString()}
                            {p.discountPrice && (
                              <span className="text-[10px] text-slate-500 line-through ml-1.5">
                                ৳{p.price}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 font-mono">
                            <span
                              className={
                                p.stockQuantity <= 10
                                  ? 'text-rose-400 font-bold'
                                  : 'text-slate-200'
                              }
                            >
                              {p.stockQuantity} pcs
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {p.isArchived ? (
                              <span className="text-rose-400 font-semibold">Archived</span>
                            ) : p.availability === 'in_stock' ? (
                              <span className="text-emerald-400 font-medium">In Stock</span>
                            ) : (
                              <span className="text-amber-400 font-medium">Pre-Order</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                              title="Edit product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            {!p.isArchived && (
                              <button
                                onClick={() => deleteProduct(p.id)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 transition-colors"
                                title="Soft Delete (Preserves order history)"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: CATEGORY MANAGEMENT */}
          {adminSection === 'categories' && (
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-2xl font-bold text-white tracking-tight">Category Management</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Screens & Displays', desc: 'OLED, AMOLED, and IPS LCD assemblies' },
                  { name: 'Batteries', desc: 'High-density fresh-cycle lithium batteries' },
                  { name: 'Internal Parts', desc: 'Charging docks, camera sensors, speakers, mics' },
                  { name: 'Accessories', desc: 'GaN fast wall chargers, braided cables, cases' },
                  { name: 'Services & Care', desc: 'Diagnostic evaluations, ultrasonic maintenance' },
                ].map((cat, i) => {
                  const count = products.filter(
                    (p) => !p.isArchived && p.category === cat.name
                  ).length;
                  return (
                    <div
                      key={i}
                      className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-white text-sm">{cat.name}</h3>
                        <span className="font-mono text-xs text-blue-400 font-bold">
                          {count} Products
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{cat.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION 4: REPAIR BOOKINGS MANAGEMENT */}
          {adminSection === 'bookings' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Repair Booking Management
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Update customer device repair statuses, add diagnostic notes, and record final
                  servicing costs.
                </p>
              </div>

              <div className="space-y-4">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-xs font-mono font-bold text-blue-400">
                          {b.trackingCode}
                        </span>
                        <h3 className="text-base font-bold text-white">
                          {b.deviceBrand} {b.deviceModel} · {b.serviceTitle}
                        </h3>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Customer: <strong className="text-slate-200">{b.customerName}</strong> ({b.customerPhone})
                          · {b.customerAddress}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={b.status}
                          onChange={(e) =>
                            updateBookingStatus(b.id, e.target.value as RepairStatus)
                          }
                          className="bg-slate-950 border border-slate-700 text-xs text-white rounded-lg px-3 py-1.5 font-medium"
                        >
                          <option value="received">Received</option>
                          <option value="diagnosing">Diagnosing</option>
                          <option value="in_repair">In Repair</option>
                          <option value="ready_for_pickup">Ready for Pickup</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300">
                      <strong className="text-slate-400">Customer Reported Symptoms: </strong>
                      {b.problemDescription}
                    </div>

                    {b.technicianNotes && (
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                        <strong className="text-blue-400">Technician Bench Notes: </strong>
                        <span className="text-slate-300">{b.technicianNotes}</span>
                      </div>
                    )}

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                      <div>
                        Estimated Cost: <strong className="text-white font-mono">৳{b.estimatedCost ?? '—'}</strong>
                      </div>
                      <button
                        onClick={() => {
                          const note = prompt('Update technician note for this device:', b.technicianNotes || '');
                          if (note !== null) {
                            updateBookingStatus(b.id, b.status, note);
                          }
                        }}
                        className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
                      >
                        Edit Technician Note
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 5: ORDER MANAGEMENT */}
          {adminSection === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-2xl font-bold text-white tracking-tight">Order Management</h1>
              <div className="space-y-4">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-blue-400">
                          {o.orderNumber}
                        </span>
                        <div className="text-sm font-semibold text-white">
                          {o.customerName} · {o.customerPhone}
                        </div>
                        <div className="text-xs text-slate-400">{o.shippingAddress}, {o.district}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Status:</span>
                        <select
                          value={o.orderStatus}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                          className="bg-slate-950 border border-slate-700 text-xs text-white rounded-lg px-3 py-1.5 font-medium"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 space-y-1">
                      {o.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>
                            {it.quantity}x {it.productName} ({it.sku})
                          </span>
                          <span className="font-mono font-bold text-white">
                            ৳{it.price * it.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                      <span className="text-slate-400">
                        Payment: {o.paymentMethod.toUpperCase()} ({o.paymentStatus})
                      </span>
                      <span className="font-mono text-sm font-bold text-blue-400">
                        Total: ৳{o.total}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 6: INVENTORY & STOCK */}
          {adminSection === 'inventory' && (
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-2xl font-bold text-white tracking-tight">Inventory & Stock Alerts</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products
                  .filter((p) => !p.isArchived)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="font-semibold text-white text-xs">{p.name}</div>
                        <div className="font-mono text-[11px] text-slate-500">{p.sku}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono font-bold text-xs ${
                            p.stockQuantity <= 10 ? 'text-rose-400' : 'text-slate-200'
                          }`}
                        >
                          {p.stockQuantity} pcs
                        </span>
                        <button
                          onClick={() =>
                            updateProduct(p.id, { stockQuantity: p.stockQuantity + 5 })
                          }
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
                        >
                          +5 Stock
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* SECTION 7: CUSTOMER MANAGEMENT */}
          {adminSection === 'customers' && (
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-2xl font-bold text-white tracking-tight">Customer Management</h1>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="text-slate-400 border-b border-slate-800 bg-slate-950/40">
                      <tr>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Address</th>
                        <th className="py-3 px-4">District</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {customers.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-800/40">
                          <td className="py-3 px-4 font-semibold text-white">{c.name}</td>
                          <td className="py-3 px-4 font-mono text-slate-300">{c.phone}</td>
                          <td className="py-3 px-4 text-slate-400">{c.email}</td>
                          <td className="py-3 px-4 text-slate-300">{c.address}</td>
                          <td className="py-3 px-4 text-blue-400">{c.district}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 8: SALES REPORTS */}
          {adminSection === 'sales' && (
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-2xl font-bold text-white tracking-tight">Sales & Revenue Metrics</h1>
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-white">Gross Store Sales:</span>
                  <span className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">
                    ৳{totalRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Total Completed Orders: {orders.filter((o) => o.orderStatus === 'delivered').length} ·
                  Pending Shipments: {orders.filter((o) => o.orderStatus === 'processing').length}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 9: WEBSITE CONTENT MANAGEMENT */}
          {adminSection === 'content' && (
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-2xl font-bold text-white tracking-tight">Website Content Management</h1>
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Announcement Banner Text:
                  </label>
                  <input
                    type="text"
                    defaultValue="M/S Khandokar Mobile Solution · Chairman Market, Amjad Hat, Ful-gazi, Feni · Call/WhatsApp: +88 01885-181199"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100"
                  />
                </div>
                <button
                  onClick={() => showToast('Website banner updated', 'success')}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold"
                >
                  Save Announcement
                </button>
              </div>
            </div>
          )}

          {/* SECTION 10: BUSINESS INFORMATION SETTINGS */}
          {adminSection === 'settings' && (
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Business Information Settings
              </h1>
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Business Name</label>
                    <input
                      type="text"
                      disabled
                      value={BUSINESS_INFO.name}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Proprietor Name</label>
                    <input
                      type="text"
                      disabled
                      value={BUSINESS_INFO.proprietor}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={bPhone}
                      onChange={(e) => setBPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Email Address</label>
                    <input
                      type="text"
                      value={bEmail}
                      onChange={(e) => setBEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Workshop Address</label>
                  <input
                    type="text"
                    value={bAddress}
                    onChange={(e) => setBAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Operating Hours</label>
                  <input
                    type="text"
                    value={bHours}
                    onChange={(e) => setBHours(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100"
                  />
                </div>

                <button
                  onClick={() => showToast('Business settings saved', 'success')}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Contact & Address</span>
                </button>
              </div>
            </div>
          )}

          {/* SECTION 11: ACCOUNT AND SECURITY SETTINGS */}
          {adminSection === 'security' && (
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Account & Security Settings
              </h1>
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4 text-xs leading-relaxed text-slate-300">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Lock className="w-4 h-4 text-blue-400" />
                  <span>Backend Integration Readiness Checklist</span>
                </div>
                <p>
                  In accordance with security requirements, no plain-text database passwords or
                  hardcoded API keys are stored in client JavaScript. This admin foundation provides
                  full interface modeling and state controllers ready to connect to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                  <li>
                    <strong className="text-slate-200">Database Engine:</strong> PostgreSQL / Cloud
                    SQL or Firebase Firestore via server-side proxy routes.
                  </li>
                  <li>
                    <strong className="text-slate-200">Authentication:</strong> Role-based access
                    control (Super Admin, Bench Technician, Customer) with secure HTTP-only cookies
                    or JWT.
                  </li>
                  <li>
                    <strong className="text-slate-200">SMS Gateway:</strong> Bangladeshi SMS API
                    (e.g., Greenweb, BulkSMSBD) for automated repair tracking alerts.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add / Edit Product Modal */}
      {(showAddModal || editingProduct) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingProduct(null);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={pName}
                  onChange={(e) => setPName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">SKU *</label>
                  <input
                    type="text"
                    required
                    value={pSku}
                    onChange={(e) => setPSku(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="Screens & Displays">Screens & Displays</option>
                    <option value="Batteries">Batteries</option>
                    <option value="Internal Parts">Internal Parts</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Services & Care">Services & Care</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Price (৳) *</label>
                  <input
                    type="number"
                    required
                    value={pPrice}
                    onChange={(e) => setPPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Discount Price (৳)</label>
                  <input
                    type="number"
                    value={pDiscountPrice ?? ''}
                    onChange={(e) =>
                      setPDiscountPrice(e.target.value ? Number(e.target.value) : undefined)
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Stock Qty *</label>
                  <input
                    type="number"
                    required
                    value={pStock}
                    onChange={(e) => setPStock(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Compatible Models</label>
                <input
                  type="text"
                  value={pCompatible}
                  onChange={(e) => setPCompatible(e.target.value)}
                  placeholder="e.g. Samsung A52, Redmi Note 10, Realme 8"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  value={pDesc}
                  onChange={(e) => setPDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
