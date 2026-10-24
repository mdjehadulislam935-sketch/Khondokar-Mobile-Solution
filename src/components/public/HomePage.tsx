/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BUSINESS_INFO } from '../../data/initialData';
import { ProductCard } from '../common/ProductCard';
import { homeContent, servicesDataTranslations } from '../../translations';
import {
  Wrench,
  ShoppingBag,
  ShieldCheck,
  Cpu,
  Smartphone,
  BatteryCharging,
  Zap,
  Droplet,
  Activity,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Phone,
  Sparkles,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate, services, products, lang, t } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const hc = homeContent[lang] || homeContent['en'];
  const featuredServices = services.slice(0, 6);
  const featuredProducts = products.filter((p) => !p.isArchived).slice(0, 4);

  const serviceIcons: Record<string, React.ReactNode> = {
    'display-replacement': <Smartphone className="w-5 h-5 text-blue-400" />,
    'battery-replacement': <BatteryCharging className="w-5 h-5 text-emerald-400" />,
    'charging-port-repair': <Zap className="w-5 h-5 text-amber-400" />,
    'water-damage-diagnostics': <Droplet className="w-5 h-5 text-sky-400" />,
    'dead-phone-diagnostics': <Activity className="w-5 h-5 text-rose-400" />,
    'motherboard-component-repair': <Wrench className="w-5 h-5 text-indigo-400" />,
  };

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section: Split-screen visual anchor with clear headline */}
      <section className="relative pt-6 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline and CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 bg-blue-950/60 border border-blue-800/60 px-3 py-1 rounded-md">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>{hc.heroBadge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
                {hc.heroTitlePrefix}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
                  {hc.heroTitleHighlight}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {hc.heroSubtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('booking')}
                  className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2 active:scale-95"
                >
                  <Wrench className="w-4 h-4" />
                  <span>{hc.bookRepairBtn}</span>
                </button>

                <button
                  onClick={() => navigate('shop')}
                  className="px-6 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all flex items-center gap-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-blue-400" />
                  <span>{hc.exploreProductsBtn}</span>
                </button>
              </div>

              {/* Micro Trust Markers */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{hc.trust1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{hc.trust2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{hc.trust3}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl shadow-blue-950/30">
                <img
                  src="/src/assets/images/hero_repair_lab_1792669912345.jpg"
                  alt="Khandokar Mobile Solution Hardware Repair Lab"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">
                        {lang === 'bn' ? 'এমদাদ হোসেন তুহিন' : BUSINESS_INFO.proprietor}
                      </div>
                      <div className="text-[11px] text-blue-400">{hc.labOwnerBadge}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-slate-400">{hc.labLocationBadge}</div>
                      <div className="text-xs font-semibold text-slate-200">
                        {hc.labLocationText}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Metric Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
            {hc.metrics.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <div className={`font-mono text-2xl font-bold tabular-nums ${idx === 1 ? 'text-blue-400' : idx === 3 ? 'text-emerald-400' : 'text-white'}`}>
                  {m.num}
                </div>
                <div className="text-xs text-slate-400">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Featured Repair Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              {hc.featuredServicesBadge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              {hc.featuredServicesTitle}
            </h2>
          </div>
          <button
            onClick={() => navigate('services')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>{hc.viewAllServices}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => {
            const loc = servicesDataTranslations[service.id];
            const title = loc?.title[lang] || service.title;
            const desc = loc?.description[lang] || service.description;
            const turnaround = loc?.turnaroundTime[lang] || service.turnaroundTime;
            const warranty = loc?.warrantyPeriod[lang] || service.warrantyPeriod;

            return (
              <div
                key={service.id}
                className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all flex flex-col justify-between hover:shadow-lg hover:shadow-blue-950/20"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                    {serviceIcons[service.id] || <Wrench className="w-5 h-5 text-blue-400" />}
                  </div>
                  <h3 className="font-semibold text-slate-100 text-base">{title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                  <div className="pt-2 text-xs text-slate-500 space-y-1">
                    <div>
                      {hc.turnaround}: <span className="text-slate-300">{turnaround}</span>
                    </div>
                    <div>
                      {hc.warranty}: <span className="text-slate-300">{warranty}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400">{hc.turnaround ? t('startsFrom') : 'Starts from'}</span>
                    <div className="font-mono text-base font-bold text-white tabular-nums">
                      ৳{service.startingPrice}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('booking', { serviceId: service.id })}
                    className="px-3.5 py-2 rounded-lg bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                  >
                    {hc.bookThisService}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Products & Accessories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              {hc.featuredProductsBadge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              {hc.featuredProductsTitle}
            </h2>
          </div>
          <button
            onClick={() => navigate('shop')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>{hc.viewAllProducts}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Why Choose Us: Precision Tools & Ethics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                {hc.whyChooseBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {hc.whyChooseTitle}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {hc.whyChooseDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <Cpu className="w-5 h-5 text-blue-400 mb-2" />
                  <div className="text-sm font-semibold text-white">{hc.featureCard1Title}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    {hc.featureCard1Desc}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
                  <div className="text-sm font-semibold text-white">{hc.featureCard2Title}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    {hc.featureCard2Desc}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-slate-800">
                <img
                  src="/src/assets/images/technician_workstation_1792669912683.jpg"
                  alt="Technician diagnostic workstation"
                  referrerPolicy="no-referrer"
                  className="w-full h-72 sm:h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Repair Booking CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-blue-900/60 via-slate-900 to-slate-900 border border-blue-700/50 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-950/20">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {hc.ctaTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {hc.ctaSubtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('booking')}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all whitespace-nowrap active:scale-95"
            >
              {hc.bookOnlineBtn}
            </button>
            <a
              href="tel:+8801885181199"
              className="px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>{t('callTechnician')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. Professional Experience & Founder Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            {hc.aboutFounderBadge}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            {hc.aboutFounderTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-400">
                {hc.founderRole}
              </span>
              <span className="text-xs font-mono text-slate-400">{hc.founderDates}</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              {lang === 'bn' ? 'এমদাদ হোসেন তুহিন' : BUSINESS_INFO.proprietor}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {hc.founderDesc}
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400">
                {hc.internshipRole}
              </span>
              <span className="text-xs font-mono text-slate-400">{hc.internshipDates}</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              {lang === 'bn' ? 'মোবাইল সার্ভিসিং সেন্টার' : hc.internshipPlace}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {hc.internshipDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 7. Transparent Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            {hc.testimonialsBadge}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            {hc.testimonialsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hc.testimonials.map((test, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                {test.quote}
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-xs">
                <div className="font-semibold text-white">{test.name}</div>
                <div className="text-slate-400">{test.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              {hc.faqsBadge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{hc.faqsTitle}</h2>
          </div>

          <div className="space-y-3">
            {hc.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-slate-100 font-medium text-sm hover:text-blue-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-blue-400' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 border-t border-slate-800/60 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Contact & Location Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg font-bold text-white">{hc.visitShopTitle}</h3>
            <p className="text-xs text-slate-300">
              {lang === 'bn' ? 'চেয়ারম্যান মার্কেট, আমজাদ হাট, ফুলগাজী, ফেনী' : BUSINESS_INFO.address} · {hc.working}: {BUSINESS_INFO.openingHours}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('contact')}
              className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
            >
              {hc.viewContactDetails}
            </button>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
