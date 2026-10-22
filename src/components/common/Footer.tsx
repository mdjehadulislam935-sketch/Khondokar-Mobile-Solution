/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';
import { BUSINESS_INFO } from '../../data/initialData';
import {
  Wrench,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Shield,
  MessageSquare,
  Lock,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, setIsAdminMode } = useApp();

  const handleNav = (p: PageView) => {
    setIsAdminMode(false);
    navigate(p);
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-sm">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Proprietor Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base tracking-tight">
                  M/S Khandokar Mobile Solution
                </h3>
                <p className="text-xs text-blue-400">Mobile Service Entrepreneur & Technician</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              Professional mobile phone repair, component-level micro-soldering, firmware
              restoration, and genuine accessories in Feni, Bangladesh. Led by{' '}
              <strong className="text-slate-200">{BUSINESS_INFO.proprietor}</strong>.
            </p>

            <div className="pt-1 flex flex-col gap-1.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>

            <a
              href={`https://wa.me/8801885181199?text=${encodeURIComponent(
                'Assalamu Alaikum! I would like to inquire about mobile servicing at M/S Khandokar Mobile Solution.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 text-xs font-semibold transition-colors mt-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct WhatsApp Inquiry</span>
            </a>
          </div>

          {/* Column 2: Repair Services */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 tracking-wide">
              Specialized Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Motherboard & Micro-Soldering
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Display & Touch Digitizer Replacement
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  High-Capacity Battery Replacement
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Water Damage Ultrasonic Restoration
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Dead Phone Electrical Diagnostics
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Official Firmware & Unbricking
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Charging Port & Sub-board Rebuild
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Network & Baseband IC Diagnostics
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation & Customer Portal */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 tracking-wide">
              Customer Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Product Shop & Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('booking')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Online Repair Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tracking')}
                  className="hover:text-blue-400 transition-colors text-blue-400 font-medium"
                >
                  Track Repair / Order Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('dashboard')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Customer Account Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('login')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Customer Login / Register
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('cart')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Shopping Bag & Checkout
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-blue-400 transition-colors"
                >
                  About Technician Imdad Hossain
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Workshop Hours & Transparency */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 tracking-wide">
              Operating Hours & Trust
            </h4>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 text-slate-200 font-medium mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Workshop Hours</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Sat – Thu: 9:00 AM – 9:00 PM
                  <br />
                  Friday: 2:30 PM – 9:00 PM (After Juma)
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-medium text-slate-200">Customer Data Privacy</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Strict privacy protocol. Customer personal data, photos, and messages are never
                  accessed or extracted during servicing.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsAdminMode(true)}
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-blue-400 text-xs transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>Administrative Control Panel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demonstration Data Transparency Notice */}
      <div className="border-t border-slate-800/60 bg-slate-900/50 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            <span className="text-blue-400 font-semibold">Demonstration Disclosure:</span>{' '}
            Pre-populated products and prices are staged for demonstration and testing. Real repair
            quotes and retail inventory are managed through the Admin Panel or confirmed at the
            counter.
          </p>
          <div className="flex items-center gap-4 shrink-0 text-slate-400">
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-slate-200 transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('terms')}
              className="hover:text-slate-200 transition-colors"
            >
              Terms of Service
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('refund')}
              className="hover:text-slate-200 transition-colors"
            >
              Return & Refund
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright and Location */}
      <div className="border-t border-slate-900 bg-black/60 py-4 px-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © 2026 M/S Khandokar Mobile Solution. All rights reserved. Chairman Market, Amjad Hat,
            Ful-gazi, Feni, Bangladesh.
          </span>
          <span className="text-slate-400">
            Founded January 2026 · Proprietor: Imdad Hossain Tuhin
          </span>
        </div>
      </div>
    </footer>
  );
};
