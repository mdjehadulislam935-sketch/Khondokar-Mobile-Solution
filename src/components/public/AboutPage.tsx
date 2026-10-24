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
  const { navigate, lang } = useApp();

  const isBn = lang === 'bn';

  const hardwareCompetencies = isBn
    ? [
        'মাল্টি-লেয়ার মাদারবোর্ড ডায়াগনস্টিক ও শর্ট সার্কিট ডিটেকশন',
        'সিপিইউ ও পাওয়ার আইসি (PMIC) রিবলিং এবং মাইক্রো-সোল্ডারিং',
        'নিখুঁত ডিসপ্লে প্যানেল, টাচ ডিজিটাইজার ও ওলেড স্ক্রিন রিপ্লেসমেন্ট',
        'আসল ক্ষমতার ব্যাটারি প্রতিস্থাপন ও বিএমএস হেলথ ক্যালিব্রেশন',
        'সারফেস মাউন্ট চার্জিং পোর্ট ও সাব-বোর্ড রিবিল্ড',
        'আল্ট্রাসনিক ওয়াশ ও পানিতে পড়া ফোনের গভীর কেমিক্যাল ট্রিটমেন্ট',
      ]
    : BUSINESS_INFO.competencies.hardware;

  const softwareCompetencies = isBn
    ? [
        'সুরক্ষিত অফিশিয়াল ফার্মওয়্যার ফ্ল্যাশিং ও ফাস্টবুট রিকভারি',
        'অ্যান্ড্রয়েড বুটলুপ, সফট-ব্রিক ও পার্টিশন ত্রুটি মেরামত',
        'বৈধ মালিকানাধীন ফোনের প্যাটার্ন লক ও এফআরপি সমস্যার সমাধান',
        'সমর্থিত ডিভাইসের বেসব্যান্ড ও আইএমইআই নেটওয়ার্ক ডায়াগনস্টিক',
        'আইওএস ডিএফইউ মোড রিস্টোর ও ডেটা ব্যাকআপ পরামর্শ',
      ]
    : BUSINESS_INFO.competencies.software;

  const toolsCompetencies = isBn
    ? [
        'Easy JTAG Plus হার্ডওয়্যার ফ্ল্যাশ প্রোগ্রামার',
        'উচ্চ-নির্ভুল ডিজিটাল মাল্টিমিটার ও রেগুলেটেড ডিসি পাওয়ার সাপ্লাই',
        'হট-এয়ার রিওয়ার্ক স্টেশন এবং T12 মাইক্রো-সোল্ডারিং আয়রন',
        'এইচডি মনিটর আউটপুটযুক্ত স্টেরিও বাইনোকুলার মাইক্রোস্কোপ',
        'ইএসডি-নিরাপদ অ্যান্টি-স্ট্যাটিক ওয়ার্কবেঞ্চ ও গ্রাউন্ডিং সিস্টেম',
      ]
    : BUSINESS_INFO.competencies.tools;

  const businessCompetencies = isBn
    ? [
        'যাচাইকৃত টিয়ার-১ ওইএম পার্টস সংগ্রহ ও কোয়ালিটি কন্ট্রোল',
        'কাজের পূর্বে নিখুঁত খরচ নির্ধারণ ও গ্রাহককে স্বচ্ছ ধারণা প্রদান',
        'কাস্টমার টিকিট ও রিপেয়ার হিস্ট্রি নির্ভুলভাবে সংরক্ষণ',
        'জরুরি মোবাইল সেবা ও কাউন্টারে তাৎক্ষণিক ডায়াগনস্টিক',
      ]
    : BUSINESS_INFO.competencies.business;

  const timeline = isBn
    ? [
        {
          period: 'জানুয়ারি ২০২৬ – বর্তমান',
          role: 'প্রতিষ্ঠাতা ও প্রধান টেকনিশিয়ান',
          organization: 'মেসার্স খন্দকার মোবাইল সলিউশন',
          location: 'চেয়ারম্যান মার্কেট, আমজাদ হাট, ফুলগাজী, ফেনী',
          description:
            'ওয়ার্কশপ পরিচালনা, সার্কিট লেভেল মাইক্রো-সোল্ডারিং, হার্ডওয়্যার ডায়াগনস্টিক, ফার্মওয়্যার প্রোগ্রামিং এবং অরিজিনাল এক্সেসরিজ পরিবেশন।',
        },
        {
          period: '২০২৫ সাল (৬ মাস মেয়াদি)',
          role: 'প্রফেশনাল ইন্টার্নশিপ',
          organization: 'মোবাইল সার্ভিসিং সেন্টার',
          location: 'ফেনী, বাংলাদেশ',
          description:
            'মাল্টি-লেয়ার পিসিবি সার্কিট ডায়াগনস্টিক, সিপিইউ রিবলিং, স্কিম্যাটিক ডায়াগ্রাম বিশ্লেষণ এবং ফার্মওয়্যার রিকভারির ওপর ৬ মাসের নিবিড় বাস্তব প্রশিক্ষণ সম্পন্ন।',
        },
      ]
    : BUSINESS_INFO.experienceTimeline;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-8 space-y-3">
        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          {isBn ? 'স্বত্বাধিকারী ও কারিগরি পরিচিতি' : 'Proprietor & Engineering Profile'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {isBn ? 'মেসার্স খন্দকার মোবাইল সলিউশন সম্পর্কে' : 'About M/S Khandokar Mobile Solution'}
        </h1>
        <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
          {isBn
            ? '২০২৬ সালের জানুয়ারিতে চেয়ারম্যান মার্কেট, আমজাদ হাট, ফুলগাজী, ফেনীতে প্রতিষ্ঠিত। আমাদের মূল লক্ষ্য অ্যান্ড্রয়েড এবং আইফোনের সার্কিট লেভেল মাইক্রো-সোল্ডারিং, ডিসপ্লে পরিবর্তন এবং অরিজিনাল পার্টসের বিশ্বস্ত সেবা প্রদান করা।'
            : 'Founded in January 2026 at Chairman Market, Amjad Hat, Ful-gazi, Feni, our mission is providing honest, component-level mobile device diagnostics, precision micro-soldering, and genuine accessories for Android and iOS smartphones.'}
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
                <div className="text-white font-bold text-base">
                  {isBn ? 'এমদাদ হোসেন তুহিন' : BUSINESS_INFO.proprietor}
                </div>
                <div className="text-xs text-blue-400">
                  {isBn ? 'মোবাইল সার্ভিস উদ্যোক্তা ও টেকনিশিয়ান' : BUSINESS_INFO.title}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white">
                {isBn ? 'এমদাদ হোসেন তুহিন' : BUSINESS_INFO.proprietor}
              </h2>
              <div className="text-sm text-blue-400 font-medium">
                {isBn
                  ? 'প্রতিষ্ঠাতা, মোবাইল সার্ভিস উদ্যোক্তা ও টেকনিশিয়ান'
                  : 'Founder, Mobile Service Entrepreneur & Technician'}
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {isBn
                ? 'আধুনিক কারিগরি প্রশিক্ষণ ও দায়িত্বশীল মানসিকতা নিয়ে এমদাদ হোসেন তুহিন মেসার্স খন্দকার মোবাইল সলিউশন প্রতিষ্ঠা করেছেন। ফুলগাজী ও ফেনীর গ্রাহকদের জন্য কোনো অনুমাননির্ভর মেরামত নয়, বরং রেগুলেটেড ডিসি পাওয়ার সাপ্লাই, ডিজিটাল মাল্টিমিটার এবং মাইক্রোস্কোপিক বিশ্লেষণের মাধ্যমে প্রতিটি ডিভাইসের নিখুঁত সমস্যা চিহ্নিত করা হয়।'
                : 'With a disciplined engineering mindset and specialized bench training, Imdad Hossain Tuhin established M/S Khandokar Mobile Solution to bring reliable, transparent mobile phone diagnostics to the Ful-gazi and Feni community. Rather than prematurely discarding costly smartphones or guessing faults, each device is tested using calibrated DC power supplies, multimeters, and microscopic visual inspections.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  {isBn ? 'চেয়ারম্যান মার্কেট, আমজাদ হাট, ফুলগাজী, ফেনী' : BUSINESS_INFO.address}
                </span>
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
                <span>{isBn ? 'প্রতিষ্ঠা জানুয়ারি ২০২৬' : 'Active Since January 2026'}</span>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => navigate('booking')}
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/25 transition-all"
              >
                {isBn ? 'ডিভাইস মেরামত বুকিং করুন' : 'Schedule Device Inspection'}
              </button>
              <button
                onClick={() => navigate('contact')}
                className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all"
              >
                {isBn ? 'সরাসরি যোগাযোগ করুন' : 'Direct Inquiry'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Experience & Career Milestones */}
      <div className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            {isBn ? 'বাস্তব কর্মদক্ষতার রেকর্ড' : 'Hands-on Track Record'}
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            {isBn ? 'পেশাগত অভিজ্ঞতা' : 'Professional Experience'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {timeline.map((item, idx) => (
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

      {/* Core Competencies */}
      <div className="space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            {isBn ? 'কারিগরি পারদর্শিতা' : 'Technical Proficiency'}
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            {isBn ? 'প্রধান দক্ষতা ও সেবাসমূহ' : 'Core Competencies'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Hardware */}
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">
              {isBn ? 'হার্ডওয়্যার সার্ভিসিং' : 'Hardware Servicing'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {hardwareCompetencies.map((c, i) => (
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
            <h3 className="font-bold text-white text-base">
              {isBn ? 'সফটওয়্যার ও ফার্মওয়্যার' : 'Software & OS'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {softwareCompetencies.map((c, i) => (
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
            <h3 className="font-bold text-white text-base">
              {isBn ? 'ওয়ার্কবেঞ্চ যন্ত্রপাতি' : 'Bench Instruments'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {toolsCompetencies.map((c, i) => (
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
            <h3 className="font-bold text-white text-base">
              {isBn ? 'ব্যবসায়িক সততা ও সেবা' : 'Business Operations'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {businessCompetencies.map((c, i) => (
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
        <h3 className="text-lg font-bold text-white">
          {isBn ? 'গ্রাহকদের প্রতি আমাদের অঙ্গীকার' : 'Our Commitments to Every Customer'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="space-y-1.5">
            <div className="font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? 'শতভাগ ডাটা গোপনীয়তা' : 'Complete Data Confidentiality'}</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {isBn
                ? 'আমরা কখনোই গ্রাহকের ব্যক্তিগত ছবি, মেসেজ বা ফাইল খুলি না। শুধুমাত্র বিশেষায়িত টেস্ট কোডের মাধ্যমে হার্ডওয়্যার কার্যকারিতা পরীক্ষা করা হয়।'
                : 'We never open personal galleries, messaging apps, or storage folders. Repairs are tested strictly through diagnostic test codes (*#0*# or similar hardware commands).'}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>{isBn ? 'কাজের পূর্বেই খরচের হিসাব' : 'Diagnostic Quote Before Action'}</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {isBn
                ? 'কোনো অপ্রকাশিত গোপন চার্জ নেই। ডিভাইস পরীক্ষার পর খরচের সঠিক অংক জানিয়ে গ্রাহকের সুস্পষ্ট সম্মতির পরই মেরামতের কাজ শুরু করা হয়।'
                : 'No hidden surprise charges. After inspecting the device, we inform you of the exact cost and get your clear confirmation before opening components.'}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isBn ? 'কম্পোনেন্ট রিপেয়ারকে অগ্রাধিকার' : 'Component Repair First'}</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {isBn
                ? 'পুরো মাদারবোর্ড বদলানোর মতো চড়া খরচের আগে আমরা চিপ রিবলিং বা নির্দিষ্ট নষ্ট পার্টস সারাই করে কম খরচে ফোন ঠিক করার চেষ্টা করি।'
                : 'We prioritize reballing chips or replacing discrete capacitors rather than charging high sums for complete board replacement whenever physically viable.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
