/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';
import {
  ShoppingBag,
  Wrench,
  Menu,
  X,
  User,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    page,
    navigate,
    cartItemCount,
    currentUser,
    setIsAdminMode,
    isAdminMode,
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (p: PageView) => {
    setIsAdminMode(false);
    navigate(p);
    setMobileMenuOpen(false);
  };

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Product Shop', page: 'shop' },
    { label: 'Repair Booking', page: 'booking' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f19]/95 backdrop-blur-md">
      {/* Main Navigation Bar - Balanced 3-Zone Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Wordmark (Single element, no attached subtitle chips) */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 text-left focus:outline-none group whitespace-nowrap shrink-0"
        >
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-blue-500/40 bg-slate-900 shadow-lg shadow-blue-500/20 group-hover:border-blue-400 transition-all shrink-0">
            <img
              src="/src/assets/images/kms_tech_logo_1792672120996.jpg"
              alt="M/S Khandokar Mobile Solution Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
              <span>Khandokar Mobile Solution</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium hidden sm:block">
              M/S Khandokar · Feni, Bangladesh
            </div>
          </div>
        </button>

        {/* Zone 2: 4–6 Clean Nav Links (Single line text with hover state) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNav(item.page)}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-blue-400 ${
                page === item.page && !isAdminMode
                  ? 'text-blue-400 font-semibold border-b-2 border-blue-500'
                  : 'text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('tracking')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-blue-400 ${
              page === 'tracking' && !isAdminMode
                ? 'text-blue-400 font-semibold border-b-2 border-blue-500'
                : 'text-slate-300'
            }`}
          >
            Track Repair / Order
          </button>
        </nav>

        {/* Zone 3: Primary Action + Secondary Utility Icons (Cart, Account) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* User Account Button */}
          <button
            onClick={() => handleNav(currentUser ? 'dashboard' : 'login')}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors relative"
            title={currentUser ? `Account: ${currentUser.name}` : 'Customer Sign In'}
          >
            <User className="w-5 h-5" />
            {currentUser && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#0b0f19]" />
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => handleNav('cart')}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors relative"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white font-mono text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => handleNav('booking')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/25 transition-all whitespace-nowrap shrink-0 active:scale-95"
          >
            <Wrench className="w-4 h-4" />
            <span>Book a Repair</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 animate-fade-in">
          <nav className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  page === item.page && !isAdminMode
                    ? 'bg-blue-600/20 text-blue-400 font-semibold'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('tracking')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                page === 'tracking' && !isAdminMode
                  ? 'bg-blue-600/20 text-blue-400 font-semibold'
                  : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              Track Repair or Order
            </button>
            <div className="pt-3 mt-2 border-t border-slate-800">
              <button
                onClick={() => handleNav('booking')}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-600/30"
              >
                <Wrench className="w-4 h-4" />
                <span>Book a Repair Now</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
