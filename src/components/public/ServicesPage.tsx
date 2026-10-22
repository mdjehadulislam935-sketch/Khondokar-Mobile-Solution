/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Smartphone,
  BatteryCharging,
  Zap,
  Volume2,
  Camera,
  Droplet,
  Activity,
  Cpu,
  Key,
  ShieldAlert,
  Wifi,
  Wrench,
  CheckCircle2,
  Clock,
  Shield,
  ArrowRight,
  PhoneCall,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { services, navigate } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const iconsMap: Record<string, React.ReactNode> = {
    'display-replacement': <Smartphone className="w-5 h-5 text-blue-400" />,
    'battery-replacement': <BatteryCharging className="w-5 h-5 text-emerald-400" />,
    'charging-port-repair': <Zap className="w-5 h-5 text-amber-400" />,
    'speaker-mic-repair': <Volume2 className="w-5 h-5 text-sky-400" />,
    'camera-repair': <Camera className="w-5 h-5 text-indigo-400" />,
    'water-damage-diagnostics': <Droplet className="w-5 h-5 text-cyan-400" />,
    'dead-phone-diagnostics': <Activity className="w-5 h-5 text-rose-400" />,
    'software-firmware-flashing': <Cpu className="w-5 h-5 text-violet-400" />,
    'pattern-frp-troubleshooting': <Key className="w-5 h-5 text-yellow-400" />,
    'icloud-related-support': <ShieldAlert className="w-5 h-5 text-red-400" />,
    'network-signal-diagnostics': <Wifi className="w-5 h-5 text-teal-400" />,
    'motherboard-component-repair': <Wrench className="w-5 h-5 text-blue-400" />,
  };

  const filteredServices =
    activeFilter === 'all'
      ? services
      : services.filter((s) => s.category === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-8 space-y-3">
        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          Complete Servicing Solutions
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Professional Mobile Phone Repair Services
        </h1>
        <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
          From screen and battery replacements to micro-soldering and official firmware recovery.
          Every repair at M/S Khandokar Mobile Solution includes diagnostic checks and testing
          warranties.
        </p>

        {/* Filter Controls (Allowed functional button tabs) */}
        <div className="pt-4 flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Services (12)' },
            { id: 'hardware', label: 'Hardware Replacement' },
            { id: 'diagnostics', label: 'Electrical Diagnostics' },
            { id: 'software', label: 'Software & OS' },
            { id: 'component', label: 'Component & Motherboard' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeFilter === tab.id
                  ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 12 Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-slate-700 hover:shadow-xl hover:shadow-blue-950/20 transition-all duration-200"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center">
                  {iconsMap[service.id] || <Wrench className="w-5 h-5 text-blue-400" />}
                </div>
                {/* Zero-Pill Unboxed Text */}
                <div className="text-xs text-slate-400 capitalize">
                  {service.category}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{service.description}</p>
              </div>

              {/* Service specs */}
              <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>Est. Turnaround:</span>
                  </span>
                  <span className="font-medium text-slate-200">{service.turnaroundTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Warranty:</span>
                  </span>
                  <span className="font-medium text-slate-200">{service.warrantyPeriod}</span>
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-1.5 pt-2 text-xs text-slate-400">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Purchase / Booking Module */}
            <div className="pt-5 mt-6 border-t border-slate-800 flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] text-slate-400">Starting from</div>
                <div className="text-lg font-bold font-mono text-white tabular-nums">
                  ৳{service.startingPrice}
                </div>
              </div>

              <button
                onClick={() => navigate('booking', { serviceId: service.id })}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 transition-all active:scale-95"
              >
                <span>Book This Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency / Walk-in Callout */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-bold text-white">Need an Instant Diagnosis at the Counter?</h3>
          <p className="text-xs text-slate-300 max-w-xl">
            You are always welcome to bring your phone directly to Chairman Market, Amjad Hat,
            Ful-gazi. We conduct initial visual checks and DC power measurements immediately.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:+8801885181199"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/25 transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call +88 01885-181199</span>
          </a>
        </div>
      </div>
    </div>
  );
};
