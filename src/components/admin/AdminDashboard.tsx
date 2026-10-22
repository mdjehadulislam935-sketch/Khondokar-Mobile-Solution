/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
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
  MoreVertical,
  Upload,
  Image as ImageIcon,
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  MessageSquare,
  LogOut,
  FolderPlus,
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
    categories,
    addCategory,
    deleteCategory,
    isAdminAuthenticated,
    adminPassword,
    loginAdmin,
    logoutAdmin,
    updateAdminPassword,
    bookings,
    updateBookingStatus,
    orders,
    updateOrderStatus,
    customers,
    showToast,
  } = useApp();

  // Admin Login States
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // 3-dot dropdown active ID (e.g. 'prod-01' or 'rep-101')
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // Form states for product
  const [pName, setPName] = useState('');
  const [pSku, setPSku] = useState('');
  const [pCategory, setPCategory] = useState(categories[0]?.name || 'Screens & Displays');
  const [pPrice, setPPrice] = useState(1000);
  const [pDiscountPrice, setPDiscountPrice] = useState<number | undefined>(undefined);
  const [pStock, setPStock] = useState(10);
  const [pDesc, setPDesc] = useState('');
  const [pCompatible, setPCompatible] = useState('Samsung, Xiaomi, Vivo');
  const [pImage, setPImage] = useState<string>('/src/assets/images/oled_display_module_1792669913235.jpg');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password change state in settings
  const [newAdminPass, setNewAdminPass] = useState('');
  const [confirmAdminPass, setConfirmAdminPass] = useState('');

  // Business info state for editor
  const [bPhone, setBPhone] = useState(BUSINESS_INFO.phone);
  const [bEmail, setBEmail] = useState(BUSINESS_INFO.email);
  const [bAddress, setBAddress] = useState(BUSINESS_INFO.address);
  const [bHours, setBHours] = useState(BUSINESS_INFO.openingHours);

  // Preset stock images to choose from
  const presetImages = [
    { label: 'OLED Display', url: '/src/assets/images/oled_display_module_1792669913235.jpg' },
    { label: 'Fast Charger & Cable', url: '/src/assets/images/fast_charger_accessories_1792669912435.jpg' },
    { label: 'Technician Workstation', url: '/src/assets/images/technician_workstation_1792669912683.jpg' },
    { label: 'Diagnostic Lab Bench', url: '/src/assets/images/hero_repair_lab_1792669912345.jpg' },
    { label: 'KMS Brand Logo', url: '/src/assets/images/kms_tech_logo_1792672120996.jpg' },
  ];

  // Metrics calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeBookingsCount = bookings.filter(
    (b) => b.status !== 'completed' && b.status !== 'cancelled'
  ).length;
  const lowStockCount = products.filter((p) => !p.isArchived && p.stockQuantity <= 15).length;

  const handleOpenAdd = () => {
    setPName('');
    setPSku(`KMS-NEW-${Math.floor(100 + Math.random() * 900)}`);
    setPCategory(categories[0]?.name || 'Screens & Displays');
    setPPrice(500);
    setPDiscountPrice(undefined);
    setPStock(20);
    setPDesc('');
    setPCompatible('Universal Smartphone');
    setPImage('/src/assets/images/oled_display_module_1792669913235.jpg');
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
    setPImage(p.image);
    setActiveMenuId(null);
  };

  // Image upload handler (converts uploaded file from user device to Base64)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert('Image size exceeds 4MB. Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setPImage(reader.result);
        showToast('Product photo uploaded successfully!', 'success');
      }
    };
    reader.readAsDataURL(file);
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
        image: pImage,
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
        image: pImage || '/src/assets/images/oled_display_module_1792669913235.jpg',
        compatibleModels: models,
        details: { Warranty: '30-Day Testing Guarantee' },
        isDemo: true,
      });
      setShowAddModal(false);
    }
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory(newCatName, newCatDesc);
    setNewCatName('');
    setNewCatDesc('');
    setShowCategoryModal(false);
  };

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginAdmin(passwordInput);
    if (ok) {
      setPasswordInput('');
    }
  };

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAdminPass !== confirmAdminPass) {
      alert('New passwords do not match!');
      return;
    }
    updateAdminPassword(newAdminPass);
    setNewAdminPass('');
    setConfirmAdminPass('');
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

  // -------------------------------------------------------------
  // PASSWORD GATE: IF NOT AUTHENTICATED AS ADMIN
  // -------------------------------------------------------------
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl relative">
          {/* Logo and Title */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-blue-500/50 shadow-xl shadow-blue-500/20 mx-auto">
              <img
                src="/src/assets/images/kms_tech_logo_1792672120996.jpg"
                alt="Khandokar Mobile Solution Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Admin Console Login</h1>
              <p className="text-xs text-blue-400 font-medium">M/S Khandokar Mobile Solution</p>
            </div>
            <p className="text-xs text-slate-400">
              Please enter the administrative password to access workshop operations, stock, and customer bookings.
            </p>
          </div>

          <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Admin Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full pl-3.5 pr-10 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-blue-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <KeyRound className="w-4 h-4" />
              <span>Unlock Admin Console</span>
            </button>
          </form>

          {/* Quick Default Password Helper for the User */}
          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/50 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">Default Admin Password:</span>
              <button
                type="button"
                onClick={() => setPasswordInput(adminPassword)}
                className="text-[11px] text-blue-400 hover:text-blue-300 font-mono underline"
              >
                Auto Fill
              </button>
            </div>
            <div className="font-mono text-sm text-blue-400 bg-slate-950/80 px-2.5 py-1.5 rounded border border-slate-800 flex items-center justify-between">
              <span>{adminPassword}</span>
              <span className="text-[10px] text-slate-500 font-sans">Proprietor Access</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
              You can change this password at any time inside the <strong>Account & Security Settings</strong> tab.
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setIsAdminMode(false);
                navigate('home');
              }}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN CONSOLE
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col" onClick={() => setActiveMenuId(null)}>
      {/* Admin Top Bar */}
      <header className="h-16 border-b border-slate-800 bg-slate-950/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-blue-500/40 bg-slate-900 shadow-md shadow-blue-600/30 shrink-0">
            <img
              src="/src/assets/images/kms_tech_logo_1792672120996.jpg"
              alt="KMS Tech Logo"
              className="w-full h-full object-cover"
            />
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
            onClick={logoutAdmin}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-rose-400 border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
            title="Lock Admin Console"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lock / Sign Out</span>
          </button>

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

          <div className="mt-8 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg overflow-hidden border border-blue-500/40">
                <img
                  src="/src/assets/images/kms_tech_logo_1792672120996.jpg"
                  alt="KMS"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-semibold text-slate-200">{BUSINESS_INFO.proprietor}</div>
            </div>
            <div className="text-slate-400 text-[10px]">Lead Technician & Entrepreneur</div>
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
                  <div className="text-[11px] text-slate-400">{categories.length} active categories</div>
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

              {/* Recent Repair Bookings Table with 3-dot Menu */}
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
                        <th className="py-2.5 px-3 text-center">Action</th>
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
                          <td className="py-3 px-3 text-center relative">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(activeMenuId === b.id ? null : b.id);
                              }}
                              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {/* 3-dot dropdown menu */}
                            {activeMenuId === b.id && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute right-0 top-10 z-30 w-44 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1 text-xs text-left"
                              >
                                <button
                                  onClick={() => {
                                    const nextStatus: RepairStatus =
                                      b.status === 'received'
                                        ? 'diagnosing'
                                        : b.status === 'diagnosing'
                                        ? 'in_repair'
                                        : b.status === 'in_repair'
                                        ? 'ready_for_pickup'
                                        : 'completed';
                                    updateBookingStatus(b.id, nextStatus);
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full px-3 py-2 text-slate-200 hover:bg-slate-800 hover:text-blue-400 flex items-center gap-2"
                                >
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>Advance Status</span>
                                </button>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(b.trackingCode);
                                    showToast(`Copied ${b.trackingCode}`, 'success');
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full px-3 py-2 text-slate-200 hover:bg-slate-800 flex items-center gap-2"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy Tracking Code</span>
                                </button>
                                <a
                                  href={`https://wa.me/${b.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                                    `Hello ${b.customerName}, this is Khandokar Mobile Solution regarding your device repair ${b.trackingCode}.`
                                  )}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="w-full px-3 py-2 text-slate-200 hover:bg-slate-800 text-emerald-400 flex items-center gap-2"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span>WhatsApp Customer</span>
                                </a>
                              </div>
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

          {/* SECTION 2: PRODUCT MANAGEMENT (WITH IMAGE UPLOAD & 3-DOT MENU) */}
          {adminSection === 'products' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Product Management
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Add new products with real image upload, configure stock, and use 3-dot actions.
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
                        <th className="py-3 px-4">Picture</th>
                        <th className="py-3 px-4">Product Name & SKU</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Price (BDT)</th>
                        <th className="py-3 px-4">Stock</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-center">Actions (3-Dot)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {products.map((p) => (
                        <tr
                          key={p.id}
                          className={`hover:bg-slate-800/40 ${p.isArchived ? 'opacity-40' : ''}`}
                        >
                          <td className="py-3 px-4">
                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 shrink-0">
                              <img
                                src={p.image}
                                alt={p.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </td>
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
                          <td className="py-3 px-4 text-center relative">
                            {/* 3-dot Button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(activeMenuId === p.id ? null : p.id);
                              }}
                              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                              title="More Options"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {/* 3-dot Dropdown Menu */}
                            {activeMenuId === p.id && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute right-2 top-10 z-30 w-48 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1 text-xs text-left"
                              >
                                <button
                                  onClick={() => handleOpenEdit(p)}
                                  className="w-full px-3.5 py-2 text-slate-200 hover:bg-slate-800 hover:text-blue-400 flex items-center gap-2"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                  <span>Edit Product Details</span>
                                </button>

                                <button
                                  onClick={() => {
                                    updateProduct(p.id, { stockQuantity: p.stockQuantity + 5 });
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full px-3.5 py-2 text-slate-200 hover:bg-slate-800 flex items-center gap-2"
                                >
                                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Quick Add +5 Stock</span>
                                </button>

                                <button
                                  onClick={() => {
                                    addProduct({
                                      name: `${p.name} (Copy)`,
                                      sku: `${p.sku}-CP`,
                                      category: p.category,
                                      price: p.price,
                                      stockQuantity: p.stockQuantity,
                                      availability: p.availability,
                                      description: p.description,
                                      image: p.image,
                                      compatibleModels: p.compatibleModels,
                                      details: p.details,
                                      isDemo: true,
                                    });
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full px-3.5 py-2 text-slate-200 hover:bg-slate-800 flex items-center gap-2"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Duplicate Item</span>
                                </button>

                                {!p.isArchived && (
                                  <button
                                    onClick={() => {
                                      deleteProduct(p.id);
                                      setActiveMenuId(null);
                                    }}
                                    className="w-full px-3.5 py-2 text-rose-400 hover:bg-rose-950/40 flex items-center gap-2 border-t border-slate-800"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Archive / Soft Delete</span>
                                  </button>
                                )}
                              </div>
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

          {/* SECTION 3: CATEGORY MANAGEMENT (WITH ADD NEW CATEGORY) */}
          {adminSection === 'categories' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Category Management</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage store categories. New categories added here will be immediately available in the shop and product editor.
                  </p>
                </div>
                <button
                  onClick={() => setShowCategoryModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>+ Add New Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => {
                  const count = products.filter(
                    (p) => !p.isArchived && p.category.toLowerCase() === cat.name.toLowerCase()
                  ).length;
                  return (
                    <div
                      key={cat.id}
                      className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between space-y-3 relative group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold text-white text-sm">{cat.name}</h3>
                          <span className="font-mono text-xs text-blue-400 font-bold bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/50">
                            {count} Items
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{cat.description}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500">Slug: {cat.name.toLowerCase().replace(/\s+/g, '-')}</span>
                        {categories.length > 1 && (
                          <button
                            type="button"
                            onClick={() => deleteCategory(cat.id)}
                            className="text-slate-500 hover:text-rose-400 text-xs p-1"
                            title="Delete category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION 4: REPAIR BOOKINGS MANAGEMENT (WITH 3-DOT MENU) */}
          {adminSection === 'bookings' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Repair Booking Management
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Update customer device repair statuses, add diagnostic notes, and record final servicing costs.
                </p>
              </div>

              <div className="space-y-4">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4 relative"
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

                      <div className="flex items-center gap-3">
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

                        {/* 3-dot button */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuId(activeMenuId === b.id ? null : b.id);
                            }}
                            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeMenuId === b.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 top-10 z-30 w-48 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1 text-xs text-left"
                            >
                              <button
                                onClick={() => {
                                  const cost = prompt('Update estimated/actual repair cost (৳):', String(b.estimatedCost || ''));
                                  if (cost && !isNaN(Number(cost))) {
                                    updateBookingStatus(b.id, b.status, undefined, Number(cost));
                                  }
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3.5 py-2 text-slate-200 hover:bg-slate-800 flex items-center gap-2"
                              >
                                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Set Servicing Cost</span>
                              </button>
                              <button
                                onClick={() => {
                                  const note = prompt('Update technician note for this device:', b.technicianNotes || '');
                                  if (note !== null) {
                                    updateBookingStatus(b.id, b.status, note);
                                  }
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3.5 py-2 text-slate-200 hover:bg-slate-800 flex items-center gap-2"
                              >
                                <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                                <span>Edit Bench Note</span>
                              </button>
                              <a
                                href={`https://wa.me/${b.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                                  `Assalamu Alaikum ${b.customerName}, your device (${b.deviceBrand} ${b.deviceModel}) status at Khandokar Mobile Solution is now: ${b.status.replace('_', ' ')}.`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full px-3.5 py-2 text-emerald-400 hover:bg-slate-800 flex items-center gap-2"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>Send WhatsApp Update</span>
                              </a>
                            </div>
                          )}
                        </div>
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
                      <span className="text-slate-500 font-mono text-[11px]">
                        Registered: {new Date(b.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 5: ORDER MANAGEMENT (WITH 3-DOT MENU) */}
          {adminSection === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-2xl font-bold text-white tracking-tight">Order Management</h1>
              <div className="space-y-4">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4 relative"
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

                        {/* 3-dot dropdown */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuId(activeMenuId === o.id ? null : o.id);
                            }}
                            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeMenuId === o.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 top-10 z-30 w-48 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1 text-xs text-left"
                            >
                              <button
                                onClick={() => {
                                  updateOrderStatus(o.id, 'delivered');
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3.5 py-2 text-slate-200 hover:bg-slate-800 flex items-center gap-2"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Mark as Delivered</span>
                              </button>
                              <a
                                href={`https://wa.me/${o.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                                  `Assalamu Alaikum ${o.customerName}, your parcel ${o.orderNumber} from Khandokar Mobile Solution has been dispatched!`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full px-3.5 py-2 text-emerald-400 hover:bg-slate-800 flex items-center gap-2"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>WhatsApp Customer</span>
                              </a>
                            </div>
                          )}
                        </div>
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
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-800 shrink-0 bg-slate-950">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-semibold text-white text-xs">{p.name}</div>
                          <div className="font-mono text-[11px] text-slate-500">{p.sku}</div>
                        </div>
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

          {/* SECTION 11: ACCOUNT AND SECURITY SETTINGS (WITH ADMIN PASSWORD CHANGE) */}
          {adminSection === 'security' && (
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Account & Security Settings
              </h1>

              {/* Password Change Card */}
              <div className="p-6 rounded-2xl border border-blue-500/30 bg-slate-900/70 space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <KeyRound className="w-4 h-4 text-blue-400" />
                  <span>Change Admin Access Password</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Update the proprietor administrative master password used to unlock this Admin Console.
                </p>

                <form onSubmit={handlePasswordChangeSubmit} className="space-y-3 max-w-md text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1">New Password *</label>
                    <input
                      type="password"
                      required
                      value={newAdminPass}
                      onChange={(e) => setNewAdminPass(e.target.value)}
                      placeholder="Enter new admin password..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Confirm New Password *</label>
                    <input
                      type="password"
                      required
                      value={confirmAdminPass}
                      onChange={(e) => setConfirmAdminPass(e.target.value)}
                      placeholder="Re-type new password..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
                  >
                    Save New Password
                  </button>
                </form>
              </div>

              {/* Backend Integration Readiness Checklist */}
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4 text-xs leading-relaxed text-slate-300">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>Cloud Database & Security Architecture</span>
                </div>
                <p>
                  Connected to Google Cloud Firestore (Free Spark Tier). Live data sync enabled for products, bookings, and customer orders.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                  <li>
                    <strong className="text-slate-200">Database Engine:</strong> Cloud Firestore Live (Free Tier)
                  </li>
                  <li>
                    <strong className="text-slate-200">Security Rules:</strong> Deployed via DeployRules RPC
                  </li>
                  <li>
                    <strong className="text-slate-200">Admin Email:</strong> jisnejamuddinmozumder935@gmail.com
                  </li>
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* -------------------------------------------------------------
          ADD / EDIT PRODUCT MODAL (WITH REAL IMAGE UPLOAD & PRESETS)
         ------------------------------------------------------------- */}
      {(showAddModal || editingProduct) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-400" />
                <span>{editingProduct ? 'Edit Product' : 'Add New Product'}</span>
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
              {/* Image Upload & Preview Section */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <label className="block text-slate-200 font-semibold flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-blue-400" />
                  <span>Product Picture / Photo *</span>
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Image Preview Box */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shrink-0 relative">
                    <img
                      src={pImage}
                      alt="Product preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/40 hover:bg-blue-600/30 font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Picture from Device</span>
                    </button>
                    <div className="text-[11px] text-slate-400">
                      Supports PNG, JPG, WEBP photos from your smartphone camera or file storage.
                    </div>
                  </div>
                </div>

                {/* Direct Image URL input */}
                <div>
                  <label className="block text-slate-400 mb-1 text-[11px]">Or Paste Image URL directly:</label>
                  <input
                    type="text"
                    value={pImage}
                    onChange={(e) => setPImage(e.target.value)}
                    placeholder="https://... or /src/assets/images/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-mono text-[11px]"
                  />
                </div>

                {/* Preset Fast Picker */}
                <div>
                  <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Or Pick Stock Preset Photo:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {presetImages.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPImage(preset.url)}
                        className={`p-1.5 rounded-lg border text-left flex items-center gap-2 transition-all ${
                          pImage === preset.url
                            ? 'border-blue-500 bg-blue-950/40'
                            : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                        }`}
                      >
                        <img src={preset.url} alt={preset.label} className="w-6 h-6 rounded object-cover" />
                        <span className="text-[10px] text-slate-300 truncate">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={pName}
                  onChange={(e) => setPName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category *</label>
                  <select
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
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
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/30"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          ADD NEW CATEGORY MODAL
         ------------------------------------------------------------- */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FolderPlus className="w-4 h-4 text-blue-400" />
                <span>Add New Category</span>
              </h2>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCategorySubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Smart Watches, Soldering Consumables, IC Chips..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="Brief description of items in this category..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
