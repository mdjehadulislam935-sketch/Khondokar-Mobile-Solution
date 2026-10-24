/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';
import { BUSINESS_INFO } from '../../data/initialData';
import { footerContent } from '../../translations';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  MessageSquare,
  Lock,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, setIsAdminMode, lang } = useApp();

  const fc = footerContent[lang] || footerContent['en'];

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
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-blue-500/40 bg-slate-900 shadow-md shadow-blue-600/30 shrink-0">
                <img
                  src="/src/assets/images/kms_tech_logo_1792672120996.jpg"
                  alt="KMS Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-base tracking-tight">
                  {lang === 'bn' ? 'মেসার্স খন্দকার মোবাইল সলিউশন' : 'M/S Khandokar Mobile Solution'}
                </h3>
                <p className="text-xs text-blue-400">{fc.tagline}</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              {fc.bio}{' '}
              <strong className="text-slate-200">
                {lang === 'bn' ? 'এমদাদ হোসেন তুহিন' : BUSINESS_INFO.proprietor}
              </strong>.
            </p>

            <div className="pt-1 flex flex-col gap-1.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  {lang === 'bn' ? 'চেয়ারম্যান মার্কেট, আমজাদ হাট, ফুলগাজী, ফেনী' : BUSINESS_INFO.address}
                </span>
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
                lang === 'bn'
                  ? 'আসসালামু আলাইকুম! মেসার্স খন্দকার মোবাইল সলিউশনে মোবাইল সার্ভিসিং বিষয়ে জানতে চাচ্ছি।'
                  : 'Assalamu Alaikum! I would like to inquire about mobile servicing at M/S Khandokar Mobile Solution.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 text-xs font-semibold transition-colors mt-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{fc.directWhatsApp}</span>
            </a>
          </div>

          {/* Column 2: Repair Services */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 tracking-wide">
              {fc.specializedServicesTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              {fc.servicesList.map((serviceName, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNav('services')}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    {serviceName}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation & Customer Portal */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 tracking-wide">
              {fc.customerPortalTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {fc.portalLinks.shop}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('booking')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {fc.portalLinks.booking}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tracking')}
                  className="hover:text-blue-400 transition-colors text-blue-400 font-medium"
                >
                  {fc.portalLinks.tracking}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('dashboard')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {fc.portalLinks.dashboard}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('login')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {fc.portalLinks.login}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('cart')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {fc.portalLinks.cart}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-blue-400 transition-colors"
                >
                  {fc.portalLinks.about}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Workshop Hours & Transparency */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4 tracking-wide">
              {fc.operatingHoursTitle}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 text-slate-200 font-medium mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>{fc.hoursHeader}</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {fc.hoursTextSatThu}
                  <br />
                  {fc.hoursTextFri}
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-medium text-slate-200">{fc.dataPrivacyTitle}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {fc.dataPrivacyText}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsAdminMode(true)}
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-blue-400 text-xs transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>{fc.adminControl}</span>
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
            <span className="text-blue-400 font-semibold">{fc.demoDisclosureTitle}</span>{' '}
            {fc.demoDisclosureText}
          </p>
          <div className="flex items-center gap-4 shrink-0 text-slate-400">
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-slate-200 transition-colors"
            >
              {fc.privacyPolicy}
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('terms')}
              className="hover:text-slate-200 transition-colors"
            >
              {fc.termsOfService}
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('refund')}
              className="hover:text-slate-200 transition-colors"
            >
              {fc.refundPolicy}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright and Location */}
      <div className="border-t border-slate-900 bg-black/60 py-4 px-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{fc.copyright}</span>
          <span className="text-slate-400">{fc.founded}</span>
        </div>
      </div>
    </footer>
  );
};
