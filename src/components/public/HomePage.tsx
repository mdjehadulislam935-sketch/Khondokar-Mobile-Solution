/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BUSINESS_INFO } from '../../data/initialData';
import { ProductCard } from '../common/ProductCard';
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
  Clock,
  Sparkles,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate, services, products } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  const faqs = [
    {
      q: 'How long does a typical display or battery replacement take?',
      a: 'Most standard display and battery replacements are completed within 45 to 90 minutes at our Ful-gazi workshop if genuine replacement parts for your model are in stock.',
    },
    {
      q: 'Is my personal data safe during the repair process?',
      a: 'Yes, completely. M/S Khandokar Mobile Solution follows a strict customer privacy protocol. We do not inspect personal photos, chats, or personal files. For hardware repairs that do not require OS boot verification, you may even bring the phone locked or backed up.',
    },
    {
      q: 'What specialized tools do you use for motherboard diagnostics?',
      a: 'Technician Imdad Hossain Tuhin utilizes industry-standard equipment including the Easy JTAG Plus programmer, high-precision digital multimeters, regulated DC power supplies for current-draw leak detection, and a stereo binocular microscope for micro-soldering.',
    },
    {
      q: 'Do you offer a testing warranty on replaced parts?',
      a: 'Yes. Replacement displays come with a 30-day functional testing warranty against touch failure (excluding physical cracks or liquid ingress), and batteries include a 90-day replacement warranty.',
    },
    {
      q: 'Where exactly is the shop located in Feni?',
      a: 'Our workshop is located at Chairman Market, Amjad Hat, Ful-gazi, Feni, Bangladesh. You can drop off your device in person or coordinate via phone/WhatsApp at +88 01885-181199.',
    },
  ];

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
                <span>Professional Mobile Servicing in Ful-gazi, Feni</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
                Expert Mobile Repair.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
                  Trusted Technical Solutions.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Professional mobile phone repair and software troubleshooting for supported Android
                and iPhone devices. Reliable service, transparent communication, and
                customer-focused support.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('booking')}
                  className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2 active:scale-95"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Book a Repair</span>
                </button>

                <button
                  onClick={() => navigate('shop')}
                  className="px-6 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all flex items-center gap-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-blue-400" />
                  <span>Explore Products</span>
                </button>
              </div>

              {/* Micro Trust Markers */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Component-Level Micro-Soldering</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Tested Replacement Parts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Transparent Upfront Quotes</span>
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
                        {BUSINESS_INFO.proprietor}
                      </div>
                      <div className="text-[11px] text-blue-400">{BUSINESS_INFO.title}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-slate-400">Workshop Location</div>
                      <div className="text-xs font-semibold text-slate-200">
                        Chairman Market, Ful-gazi
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Metric Strip (Full width row below hero split) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="space-y-1">
              <div className="font-mono text-2xl font-bold text-white tabular-nums">12+</div>
              <div className="text-xs text-slate-400">Specialized Repair Services</div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-2xl font-bold text-blue-400 tabular-nums">0%</div>
              <div className="text-xs text-slate-400">Data Inspection Policy</div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-2xl font-bold text-white tabular-nums">Easy JTAG</div>
              <div className="text-xs text-slate-400">Hardware Programmer Equipped</div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">30-90D</div>
              <div className="text-xs text-slate-400">Parts Testing Warranties</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Repair Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Diagnostic & Hardware Expertise
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Featured Repair Services
            </h2>
          </div>
          <button
            onClick={() => navigate('services')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>View All 12 Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all flex flex-col justify-between hover:shadow-lg hover:shadow-blue-950/20"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                  {serviceIcons[service.id] || <Wrench className="w-5 h-5 text-blue-400" />}
                </div>
                <h3 className="font-semibold text-slate-100 text-base">{service.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{service.description}</p>
                <div className="pt-2 text-xs text-slate-500 space-y-1">
                  <div>
                    Turnaround: <span className="text-slate-300">{service.turnaroundTime}</span>
                  </div>
                  <div>
                    Warranty: <span className="text-slate-300">{service.warrantyPeriod}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400">Starts from</span>
                  <div className="font-mono text-base font-bold text-white tabular-nums">
                    ৳{service.startingPrice}
                  </div>
                </div>
                <button
                  onClick={() => navigate('booking', { serviceId: service.id })}
                  className="px-3.5 py-2 rounded-lg bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                >
                  Book This Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Products & Accessories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Parts & Mobile Accessories
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Featured Replacement Parts
            </h2>
          </div>
          <button
            onClick={() => navigate('shop')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>Visit Complete Shop (12 Items)</span>
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
                Engineering Standard
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Why Ful-gazi & Feni Customers Rely on Khandokar Mobile Solution
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Many modern repair shops simply advise swapping entire expensive motherboard
                assemblies when a phone fails. At M/S Khandokar Mobile Solution, we diagnose at the
                individual component level—identifying shorted capacitors, reballing power ICs, and
                flashing corrupted boot partitions to save your device and your money.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <Cpu className="w-5 h-5 text-blue-400 mb-2" />
                  <div className="text-sm font-semibold text-white">Easy JTAG Plus Equipped</div>
                  <div className="text-xs text-slate-400 mt-1">
                    Direct eMMC & UFS flash memory chip programming and unbricking.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
                  <div className="text-sm font-semibold text-white">Zero Data Snooping</div>
                  <div className="text-xs text-slate-400 mt-1">
                    Your personal files, photos, and messages remain untouched.
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
              Have a Damaged Display or Dead Device?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Register an online booking ticket now to receive a dedicated tracking code and
              priority diagnostic queue at Chairman Market, Ful-gazi.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('booking')}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all whitespace-nowrap active:scale-95"
            >
              Book Repair Online
            </button>
            <a
              href="tel:+8801885181199"
              className="px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Call Technician</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. Professional Experience & Founder Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Verified Credentials & Background
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            About the Founder & Lead Technician
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-400">
                Founder & Lead Technician
              </span>
              <span className="text-xs font-mono text-slate-400">January 2026 – Present</span>
            </div>
            <h3 className="text-lg font-bold text-white">{BUSINESS_INFO.proprietor}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Managing business operations, customer service, mobile hardware diagnostics,
              micro-soldering, and software troubleshooting at Chairman Market, Amjad Hat,
              Ful-gazi, Feni.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400">
                Professional Internship
              </span>
              <span className="text-xs font-mono text-slate-400">Year 2025 · 6 Months</span>
            </div>
            <h3 className="text-lg font-bold text-white">Mobile Servicing Center</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Completed an intensive 6-month hands-on professional internship focused on circuit
              level mobile servicing, hardware diagnostics, CPU reballing, and operating system
              firmware recovery.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Transparent Customer Testimonial Policy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Verified Customer Service
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Real Customer Satisfaction
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              "My Samsung A52 display cracked completely after falling on the concrete. Imdad bhai
              replaced the display with original AMOLED in under an hour. Touch responsiveness is
              spot on."
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-xs">
              <div className="font-semibold text-white">Tanvir Ahmed</div>
              <div className="text-slate-400">Ful-gazi, Feni · Samsung Screen Repair</div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              "Phone was completely dead after a software crash. Other shops asked for 5,000 Taka
              to change the full board. Khandokar Mobile Solution diagnosed a PMIC issue and fixed
              it for 1,800 Taka."
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-xs">
              <div className="font-semibold text-white">Rafiqul Islam</div>
              <div className="text-slate-400">Amjad Hat · Dead Phone Diagnostics</div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              "Purchased a GaN 65W fast charger and Type-C cable. Sourced original quality and
              super-fast charging actually triggers on my Xiaomi phone. Highly recommended."
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-xs">
              <div className="font-semibold text-white">Kamrul Hasan</div>
              <div className="text-slate-400">Feni Sadar · Accessories Purchase</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Customer Clarity
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
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
      </section>

      {/* 9. Contact & Location Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg font-bold text-white">Visit Our Workshop in Ful-gazi</h3>
            <p className="text-xs text-slate-300">
              {BUSINESS_INFO.address} · Working: {BUSINESS_INFO.openingHours}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('contact')}
              className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
            >
              View Contact Details
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
