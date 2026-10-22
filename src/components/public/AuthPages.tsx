/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Lock,
  ArrowRight,
  ShieldCheck,
  Wrench,
  ShoppingBag,
  Clock,
  LogOut,
  Calendar,
} from 'lucide-react';

export const CustomerLoginPage: React.FC = () => {
  const { loginUser, loginWithGoogle, navigate } = useApp();
  const [identifier, setIdentifier] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    const success = loginUser(identifier);
    if (success) {
      navigate('dashboard');
    }
  };

  const handleQuickDemoUser = (phone: string) => {
    loginUser(phone);
    navigate('dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto">
          <User className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-white">Customer Account Login</h1>
        <p className="text-xs text-slate-400">
          Access your device repair tickets, order history, and saved details.
        </p>
      </div>

      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Phone Number or Email
            </label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. +8801819234567 or tanvir.feni@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-900 px-3 text-[11px] text-slate-500 uppercase font-mono">
            Or Cloud Auth
          </span>
        </div>

        <button
          type="button"
          onClick={async () => {
            const ok = await loginWithGoogle();
            if (ok) navigate('dashboard');
          }}
          className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Demo Fast Login Buttons */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="text-[11px] text-slate-400 font-medium">Quick Demo Accounts:</div>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleQuickDemoUser('+8801819234567')}
              className="px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs text-left flex items-center justify-between text-slate-300"
            >
              <span>Tanvir Ahmed (Has active repair ticket)</span>
              <span className="text-[10px] text-blue-400 font-mono">Use Account</span>
            </button>
            <button
              onClick={() => handleQuickDemoUser('+8801834567890')}
              className="px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs text-left flex items-center justify-between text-slate-300"
            >
              <span>Kamrul Hasan (Has order history)</span>
              <span className="text-[10px] text-blue-400 font-mono">Use Account</span>
            </button>
          </div>
        </div>

        <div className="pt-1 text-center text-xs text-slate-400">
          Don't have an account yet?{' '}
          <button
            onClick={() => navigate('register')}
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Register Here
          </button>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed text-center">
        <Lock className="w-3.5 h-3.5 text-slate-500 inline mr-1" />
        Backend Integration Layer Ready: In production, sessions will authenticate via SMS OTP or
        secure Firestore/SQL token.
      </div>
    </div>
  );
};

export const CustomerRegistrationPage: React.FC = () => {
  const { registerUser, navigate } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+8801');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('Amjad Hat, Ful-gazi');
  const [district, setDistrict] = useState('Feni');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Name and Phone number are required.');
      return;
    }

    registerUser({
      name,
      phone,
      email: email || `${phone.replace(/\D/g, '')}@khandokar.com`,
      address,
      district,
    });

    navigate('dashboard');
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto">
          <User className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-white">Create Customer Profile</h1>
        <p className="text-xs text-slate-400">
          Register to quickly book device repairs, save delivery addresses, and track work orders.
        </p>
      </div>

      <form
        onSubmit={handleRegister}
        className="p-6 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-4"
      >
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Shakil Mahmud"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+8801885181199"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="shakil@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Village / Upazila / Area
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Amjad Hat, Ful-gazi"
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
              <option value="Feni">Feni</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Comilla">Comilla</option>
              <option value="Noakhali">Noakhali</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <span>Complete Registration</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="pt-2 text-center text-xs text-slate-400">
          Already registered?{' '}
          <button
            type="button"
            onClick={() => navigate('login')}
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export const CustomerDashboardPage: React.FC = () => {
  const { currentUser, logoutUser, bookings, orders, navigate } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-slate-400 text-sm">Please sign in to view your customer dashboard.</p>
        <button
          onClick={() => navigate('login')}
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  // Filter user bookings and orders by matching phone or email
  const userBookings = bookings.filter(
    (b) =>
      b.customerPhone === currentUser.phone ||
      (b.customerEmail && b.customerEmail.toLowerCase() === currentUser.email.toLowerCase())
  );

  const userOrders = orders.filter(
    (o) =>
      o.customerPhone === currentUser.phone ||
      (o.customerEmail && o.customerEmail.toLowerCase() === currentUser.email.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Profile Header */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-600/30">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-white">{currentUser.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>{currentUser.phone}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>
                  {currentUser.address}, {currentUser.district}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('booking')}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/25 transition-all"
          >
            New Repair Booking
          </button>
          <button
            onClick={logoutUser}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Sections Split: Active Repair Tickets & Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Repair Tickets */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-blue-400" />
              <span>Your Repair Tickets ({userBookings.length})</span>
            </h2>
            <button
              onClick={() => navigate('booking')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
            >
              + Book Device
            </button>
          </div>

          {userBookings.length > 0 ? (
            <div className="space-y-3">
              {userBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-blue-400">
                        {b.trackingCode}
                      </span>
                      <h3 className="text-sm font-semibold text-white mt-0.5">
                        {b.deviceBrand} {b.deviceModel}
                      </h3>
                    </div>
                    {/* Zero-Pill Unboxed Status */}
                    <div className="text-right">
                      <div className="text-xs font-semibold text-blue-400 capitalize">
                        {b.status.replace('_', ' ')}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {new Date(b.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    <strong className="text-slate-300">{b.serviceTitle}:</strong>{' '}
                    {b.problemDescription}
                  </p>

                  {b.technicianNotes && (
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                      <span className="text-blue-400 font-semibold">Technician Note: </span>
                      {b.technicianNotes}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                    <div>
                      Est. Cost:{' '}
                      <span className="text-white font-mono font-bold">
                        ৳{b.estimatedCost ?? 'TBD'}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate('tracking')}
                      className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                    >
                      <span>Track Progress</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-slate-800 bg-slate-900/30 text-center space-y-2">
              <p className="text-xs text-slate-400">No repair tickets registered for your account.</p>
              <button
                onClick={() => navigate('booking')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold"
              >
                Book a Device Repair
              </button>
            </div>
          )}
        </div>

        {/* Order History */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <span>Parts Orders ({userOrders.length})</span>
            </h2>
            <button
              onClick={() => navigate('shop')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
            >
              Shop Parts
            </button>
          </div>

          {userOrders.length > 0 ? (
            <div className="space-y-3">
              {userOrders.map((o) => (
                <div
                  key={o.id}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-blue-400 font-bold">{o.orderNumber}</span>
                    <span className="capitalize text-emerald-400 font-medium">
                      {o.orderStatus}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300">
                    {o.items.map((it) => (
                      <div key={it.productId} className="flex justify-between py-1">
                        <span>
                          {it.quantity}x {it.productName}
                        </span>
                        <span className="font-mono tabular-nums text-white">
                          ৳{it.price * it.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between text-xs font-bold text-white">
                    <span>Total Paid/COD:</span>
                    <span className="font-mono tabular-nums">৳{o.total}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-slate-800 bg-slate-900/30 text-center space-y-2">
              <p className="text-xs text-slate-400">No parts orders yet.</p>
              <button
                onClick={() => navigate('shop')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold"
              >
                Browse Catalog
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
