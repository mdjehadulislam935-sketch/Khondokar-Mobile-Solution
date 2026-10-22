/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Search,
  Wrench,
  Clock,
  Phone,
  Package,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, cartSubtotal, navigate } = useApp();

  const deliveryFee = cart.length > 0 ? 50 : 0;
  const grandTotal = cartSubtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-white">Your Shopping Cart is Empty</h1>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Explore our range of mobile replacement displays, fast chargers, tempered glass, and
          batteries.
        </p>
        <button
          onClick={() => navigate('shop')}
          className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-3">
          {cart.map((item) => {
            const unitPrice = item.product.discountPrice ?? item.product.price;
            return (
              <div
                key={item.product.id}
                className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono text-slate-500">
                      {item.product.sku} · {item.product.category}
                    </div>
                    <h3 className="text-sm font-semibold text-white">{item.product.name}</h3>
                    <div className="text-xs font-mono font-bold text-blue-400 tabular-nums">
                      ৳{unitPrice.toLocaleString()} each
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                  {/* Quantity Controller */}
                  <div className="flex items-center border border-slate-800 rounded-lg bg-slate-950">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-slate-400 hover:text-white text-xs font-semibold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-mono font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-slate-400 hover:text-white text-xs font-semibold"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="font-mono text-sm font-bold text-white tabular-nums">
                      ৳{(unitPrice * item.quantity).toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-slate-500 hover:text-rose-400 p-1.5 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Module */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-5 sticky top-24">
            <h2 className="text-base font-bold text-white">Order Summary</h2>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-mono font-semibold text-white tabular-nums">
                  ৳{cartSubtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Local Delivery:</span>
                <span className="font-mono font-semibold text-white tabular-nums">
                  ৳{deliveryFee}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                <span>Total Amount:</span>
                <span className="font-mono text-blue-400 tabular-nums">
                  ৳{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('checkout')}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-blue-400" />
                <span>Ful-gazi Workshop pickup or courier across Feni</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cash on Delivery & Counter payment accepted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, placeOrder, currentUser, navigate } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+8801');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [address, setAddress] = useState(currentUser?.address || 'Chairman Market Area, Ful-gazi');
  const [district, setDistrict] = useState(currentUser?.district || 'Feni');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash_nagad'>('cod');

  const deliveryFee = district === 'Feni' ? 50 : 100;
  const grandTotal = cartSubtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill in your Name, Phone number, and Address.');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty.');
      navigate('shop');
      return;
    }

    const order = placeOrder({
      customerName: name,
      customerPhone: phone,
      customerEmail: email || 'customer@khandokar.com',
      shippingAddress: address,
      district,
      deliveryNotes,
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        sku: item.product.sku,
        price: item.product.discountPrice ?? item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      })),
      subtotal: cartSubtotal,
      deliveryFee,
      total: grandTotal,
      paymentMethod,
      paymentStatus: 'pending',
      orderStatus: 'processing',
    });

    navigate('orders');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-slate-400 text-sm">You have no items in your cart to checkout.</p>
        <button
          onClick={() => navigate('shop')}
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Checkout & Order Confirmation
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Shipping Address & Payment Selection */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
            <h2 className="text-base font-bold text-white">1. Delivery Address</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Street / Village / Market
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="Feni">Feni District (৳50 delivery)</option>
                  <option value="Chittagong">Chittagong District (৳100)</option>
                  <option value="Comilla">Comilla District (৳100)</option>
                  <option value="Dhaka">Dhaka (৳100)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Special Delivery Notes (Optional)
              </label>
              <input
                type="text"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                placeholder="e.g. Call before coming; leave at Chairman Market pharmacy if not home."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
            <h2 className="text-base font-bold text-white">2. Payment Method</h2>

            <div className="space-y-3">
              <label
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  paymentMethod === 'cod'
                    ? 'border-blue-500 bg-blue-950/20 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="text-blue-600 focus:ring-0"
                  />
                  <div>
                    <div className="text-xs font-bold">Cash on Delivery (COD)</div>
                    <div className="text-[11px] text-slate-400">
                      Pay cash upon delivery or when picking up at Chairman Market counter.
                    </div>
                  </div>
                </div>
                <span className="font-mono text-xs font-semibold text-emerald-400">Recommended</span>
              </label>

              <label
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  paymentMethod === 'bkash_nagad'
                    ? 'border-blue-500 bg-blue-950/20 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bkash_nagad'}
                    onChange={() => setPaymentMethod('bkash_nagad')}
                    className="text-blue-600 focus:ring-0"
                  />
                  <div>
                    <div className="text-xs font-bold">bKash / Nagad Manual Payment</div>
                    <div className="text-[11px] text-slate-400">
                      Direct send money to 01885-181199. Technician verifies TrxID.
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400">Mobile Banking</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-4">
            <h2 className="text-base font-bold text-white">Review Items</h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between text-xs py-1">
                  <div>
                    <span className="text-white font-medium">
                      {item.quantity}x {item.product.name}
                    </span>
                    <div className="text-[11px] text-slate-500 font-mono">{item.product.sku}</div>
                  </div>
                  <span className="font-mono text-slate-300 tabular-nums">
                    ৳{((item.product.discountPrice ?? item.product.price) * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="font-mono text-white tabular-nums">
                  ৳{cartSubtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery:</span>
                <span className="font-mono text-white tabular-nums">৳{deliveryFee}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                <span>Grand Total:</span>
                <span className="font-mono text-blue-400 tabular-nums">
                  ৳{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Place Order</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export const MyOrdersPage: React.FC = () => {
  const { orders, navigate } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Order Records ({orders.length})
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real orders registered in the system. Use the order number to track delivery.
          </p>
        </div>
        <button
          onClick={() => navigate('tracking')}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 self-start sm:self-auto"
        >
          Track an Order / Repair
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((o) => (
          <div
            key={o.id}
            className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-blue-400">{o.orderNumber}</span>
                <div className="text-xs text-slate-400">
                  Customer: <strong className="text-white">{o.customerName}</strong> ({o.customerPhone})
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold capitalize text-emerald-400">
                  {o.orderStatus}
                </span>
                <div className="text-[11px] text-slate-500">
                  {new Date(o.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <div className="text-slate-400 font-medium">Purchased Items:</div>
                {o.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-slate-300">
                    <span>
                      {it.quantity}x {it.productName} ({it.sku})
                    </span>
                    <span className="font-mono text-white">৳{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-slate-400">
                <div>
                  <strong className="text-slate-300">Shipping:</strong> {o.shippingAddress},{' '}
                  {o.district}
                </div>
                <div>
                  <strong className="text-slate-300">Payment:</strong>{' '}
                  {o.paymentMethod.toUpperCase()} ({o.paymentStatus})
                </div>
                <div className="font-bold text-white text-sm pt-1">
                  Total: <span className="font-mono text-blue-400">৳{o.total}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const OrderTrackingPage: React.FC = () => {
  const { bookings, orders } = useApp();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  // Auto-search or manual search
  const foundBooking = bookings.find(
    (b) =>
      b.trackingCode.toLowerCase() === query.trim().toLowerCase() ||
      b.customerPhone.includes(query.trim())
  );

  const foundOrder = orders.find(
    (o) =>
      o.orderNumber.toLowerCase() === query.trim().toLowerCase() ||
      o.customerPhone.includes(query.trim())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  const repairSteps: { key: string; label: string }[] = [
    { key: 'received', label: 'Received at Bench' },
    { key: 'diagnosing', label: 'Electrical Diagnostics' },
    { key: 'in_repair', label: 'Parts & Soldering' },
    { key: 'ready_for_pickup', label: 'Ready for Counter Pickup' },
    { key: 'completed', label: 'Delivered / Completed' },
  ];

  const getStepIndex = (status: string) => {
    const idx = repairSteps.findIndex((s) => s.key === status);
    return idx === -1 ? 0 : idx;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-slate-800 pb-6 text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Track Repair Ticket or Orders
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Enter your unique Repair Tracking Code (e.g.{' '}
          <code className="text-blue-400">KMS-2026-8812</code>), Order ID, or registered phone number.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearched(false);
            }}
            placeholder="e.g. KMS-2026-8812 or 01885181199"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all"
        >
          Track Status
        </button>
      </form>

      {/* Results for Repair Ticket */}
      {foundBooking && (
        <div className="p-6 sm:p-8 rounded-2xl border border-blue-500/30 bg-slate-900/80 space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Repair Work Ticket
              </span>
              <div className="text-xl font-bold font-mono text-blue-400">
                {foundBooking.trackingCode}
              </div>
              <div className="text-sm font-semibold text-white mt-1">
                {foundBooking.deviceBrand} {foundBooking.deviceModel} · {foundBooking.serviceTitle}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold capitalize text-blue-400">
                {foundBooking.status.replace('_', ' ')}
              </span>
              <div className="text-xs text-slate-500">
                Registered: {new Date(foundBooking.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Stepper Visual */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white">Live Benchmark Progress:</div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {repairSteps.map((step, idx) => {
                const currentIdx = getStepIndex(foundBooking.status);
                const isPassed = idx <= currentIdx;
                const isCurrent = idx === currentIdx;
                return (
                  <div
                    key={step.key}
                    className={`p-3 rounded-xl border text-xs text-center transition-all ${
                      isCurrent
                        ? 'border-blue-500 bg-blue-600/20 text-blue-300 font-bold'
                        : isPassed
                        ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300 font-medium'
                        : 'border-slate-800 bg-slate-950/50 text-slate-500'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-mono mb-1">Step 0{idx + 1}</div>
                    <div>{step.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technician Bench Notes */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-blue-400" />
              <span>Technician Diagnostic Notes:</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {foundBooking.technicianNotes ||
                'Device inspected by Imdad Hossain Tuhin. Hardware checks in progress.'}
            </p>
            <div className="pt-2 flex justify-between text-slate-400 border-t border-slate-900">
              <span>Customer: {foundBooking.customerName}</span>
              <span>
                Estimated Cost:{' '}
                <strong className="text-white font-mono">
                  ৳{foundBooking.estimatedCost ?? 'To be calculated'}
                </strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Results for Orders */}
      {foundOrder && (
        <div className="p-6 sm:p-8 rounded-2xl border border-emerald-500/30 bg-slate-900/80 space-y-4 animate-fade-in">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {foundOrder.orderNumber}
              </span>
              <div className="text-xs text-slate-300">
                Recipient: {foundOrder.customerName} ({foundOrder.shippingAddress})
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-white capitalize">
                Status: {foundOrder.orderStatus}
              </span>
            </div>
          </div>

          <div className="text-xs space-y-1 text-slate-300">
            {foundOrder.items.map((it, i) => (
              <div key={i} className="flex justify-between">
                <span>
                  {it.quantity}x {it.productName}
                </span>
                <span className="font-mono text-white">৳{it.price * it.quantity}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-between text-xs font-bold text-white">
            <span>Total Payable:</span>
            <span className="font-mono text-blue-400">৳{foundOrder.total}</span>
          </div>
        </div>
      )}

      {searched && !foundBooking && !foundOrder && (
        <div className="p-8 rounded-xl border border-slate-800 bg-slate-900/40 text-center space-y-2">
          <p className="text-xs text-slate-400">
            No active repair ticket or order matched "{query}".
          </p>
          <p className="text-[11px] text-slate-500">
            Try searching with demo tracking code <code className="text-blue-400">KMS-2026-8812</code>{' '}
            or demo order <code className="text-blue-400">KMS-ORD-1082</code>.
          </p>
        </div>
      )}
    </div>
  );
};
