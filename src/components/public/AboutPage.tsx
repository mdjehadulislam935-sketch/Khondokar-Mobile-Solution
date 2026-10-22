/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { BUSINESS_INFO } from '../../data/initialData';
import {
  Wrench,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-8 space-y-3">
        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          Proprietor & Engineering Profile
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          About M/S Khandokar Mobile Solution
        </h1>
        <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
          Founded in January 2026 at Chairman Market, Amjad Hat, Ful-gazi, Feni, our mission is
          providing honest, component-level mobile device diagnostics, precision micro-soldering,
          and genuine accessories for Android and iOS smartphones.
        </p>
      </div>

      {/* Founder Spotlight Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src="/src/assets/images/technician_workstation_1792669912683.jpg"
                alt="Proprietor Imdad Hossain Tuhin at workstation"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent">
                <div className="text-white font-bold text-base">{BUSINESS_INFO.proprietor}</div>
                <div className="text-xs text-blue-400">{BUSINESS_INFO.title}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white">{BUSINESS_INFO.proprietor}</h2>
              <div className="text-sm text-blue-400 font-medium">
                Founder, Mobile Service Entrepreneur & Technician
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              With a disciplined engineering mindset and specialized bench training, Imdad Hossain
              Tuhin established M/S Khandokar Mobile Solution to bring reliable, transparent mobile
              phone diagnostics to the Ful-gazi and Feni community. Rather than prematurely discarding
              costly smartphones or guessing faults, each device is tested using calibrated DC power
              supplies, multimeters, and microscopic visual inspections.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Chairman Market, Amjad Hat, Ful-gazi, Feni</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{BUSINESS_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{BUSINESS_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Active Since January 2026</span>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => navigate('booking')}
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/25 transition-all"
              >
                Schedule Device Inspection
              </button>
              <button
                onClick={() => navigate('contact')}
                className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all"
              >
                Direct Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Experience & Career Milestones */}
      <div className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Hands-on Track Record
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Professional Experience</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BUSINESS_INFO.experienceTimeline.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-blue-400 font-mono">{item.period}</span>
                <span className="text-slate-500">{item.location}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{item.role}</h3>
              <div className="text-xs font-medium text-slate-300">{item.organization}</div>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Competencies (Hardware, Software, Technical Tools, Business) */}
      <div className="space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Technical Proficiency
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Core Competencies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Hardware */}
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Hardware Servicing</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {BUSINESS_INFO.competencies.hardware.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Software */}
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
            <div className="w-9 h-9 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Software & OS</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {BUSINESS_INFO.competencies.software.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Technical Tools */}
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
            <div className="w-9 h-9 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Bench Instruments</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {BUSINESS_INFO.competencies.tools.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Business & Customer Care */}
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
            <div className="w-9 h-9 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Business Operations</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {BUSINESS_INFO.competencies.business.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Workshop Principles */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white">Our Commitments to Every Customer</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="space-y-1.5">
            <div className="font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Complete Data Confidentiality</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              We never open personal galleries, messaging apps, or storage folders. Repairs are
              tested strictly through diagnostic test codes (*#0*# or similar hardware commands).
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Diagnostic Quote Before Action</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              No hidden surprise charges. After inspecting the device, we inform you of the exact
              cost and get your clear confirmation before opening components.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Component Repair First</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              We prioritize reballing chips or replacing discrete capacitors rather than charging
              high sums for complete board replacement whenever physically viable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
