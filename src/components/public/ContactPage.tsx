/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BUSINESS_INFO } from '../../data/initialData';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast, lang, t } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isBn = lang === 'bn';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      alert(isBn ? 'অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং বার্তা লিখুন।' : 'Please fill in your name, contact phone, and message.');
      return;
    }
    setSubmitted(true);
    showToast(
      isBn ? 'আপনার বার্তাটি সফলভাবে আমাদের ফুলগাজী টেকনিশিয়ান ডেস্কে পাঠানো হয়েছে!' : 'Your inquiry has been sent to our Ful-gazi technician desk!',
      'success'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-8 space-y-3">
        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          {isBn ? 'সরাসরি কারিগরি পরামর্শ ও যোগাযোগ' : 'Direct Technical Advisory & Support'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {isBn ? 'মেসার্স খন্দকার মোবাইল সলিউশন-এ যোগাযোগ' : 'Contact M/S Khandokar Mobile Solution'}
        </h1>
        <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
          {isBn
            ? 'আপনার ডিভাইসের সম্ভাব্য মেরামতের খরচ জানতে, পার্টস স্টকে আছে কিনা নিশ্চিত হতে বা যেকোনো কারিগরি সহায়তায় আমাদের সাথে যোগাযোগ করুন।'
            : 'Whether you need a quick repair estimate, want to verify stock of replacement displays, or require emergency hardware diagnostics, we are ready to assist.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Contact Cards & Location Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
            <h2 className="text-lg font-bold text-white">
              {isBn ? 'ওয়ার্কশপ ও যোগাযোগের ঠিকানা' : 'Workshop & Contact Details'}
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">
                    {isBn ? 'সরাসরি ওয়ার্কশপ ঠিকানা' : 'Physical Workshop Address'}
                  </div>
                  <div className="text-slate-300 mt-0.5">
                    {isBn ? 'চেয়ারম্যান মার্কেট, আমজাদ হাট, ফুলগাজী, ফেনী' : BUSINESS_INFO.address}
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    {isBn ? 'জেলা: ফেনী, বিভাগ: চট্টগ্রাম' : `District: ${BUSINESS_INFO.district}, Division: ${BUSINESS_INFO.division}`}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">
                    {isBn ? 'সরাসরি মোবাইল নম্বর' : 'Direct Mobile Line'}
                  </div>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="text-slate-200 hover:text-blue-400 font-mono text-sm block mt-0.5"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                  <div className="text-slate-500 text-[11px]">
                    {isBn ? 'কল ও এসএমএস স্বাগতম' : 'Calls & SMS welcome'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">
                    {isBn ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
                  </div>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-slate-200 hover:text-blue-400 block mt-0.5"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">
                    {isBn ? 'ওয়ার্কশপের সময়সূচি' : 'Operating Hours'}
                  </div>
                  <div className="text-slate-300 mt-0.5">
                    {isBn ? 'শনিবার – বৃহস্পতিবার: সকাল ৯:০০ – রাত ৯:০০' : 'Sat – Thu: 9:00 AM – 9:00 PM'}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    {isBn ? 'শুক্রবার: দুপুর ২:৩০ – রাত ৯:০০ (জুমার পর)' : 'Friday: 2:30 PM – 9:00 PM (After Juma)'}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <a
                href={`https://wa.me/8801885181199?text=${encodeURIComponent(
                  isBn
                    ? 'আসসালামু আলাইকুম! মেসার্স খন্দকার মোবাইল সলিউশনে সার্ভিসিং সম্পর্কে জানতে চাই।'
                    : 'Assalamu Alaikum! I would like to inquire about mobile servicing at M/S Khandokar Mobile Solution.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-600/25 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('directWhatsApp')}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Inquiry Message Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">
                {isBn ? 'টেকনিশিয়ান ডেস্কে সরাসরি বার্তা পাঠান' : 'Send a Direct Inquiry to the Technician Desk'}
              </h2>
              <p className="text-xs text-slate-400">
                {isBn
                  ? 'আপনার সমস্যা বা প্রশ্নের বিবরণ দিন। আমরা দ্রুততম সময়ে আপনার সাথে যোগাযোগ করব।'
                  : 'Submit your query or describe your phone issue. We will respond promptly.'}
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {t('fullNameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('fullNamePlaceholder')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {t('phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('phonePlaceholder')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {isBn ? 'আপনার বার্তা বা ডিভাইসের সমস্যার বিবরণ *' : 'Your Message / Inquiry Details *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      isBn
                        ? 'আপনার মোবাইল মডেল ও সমস্যার বিবরণ লিখুন (যেমন: স্যামসাং A52 ওলেড ডিসপ্লে পরিবর্তন বা ডেড ফোন ডায়াগনস্টিক)...'
                        : 'Describe your device model and problem (e.g., Samsung A52 screen replacement price, Xiaomi charging IC check)...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isBn ? 'বার্তা প্রেরণ করুন' : 'Send Message'}</span>
                </button>
              </form>
            ) : (
              <div className="p-8 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {isBn ? 'বার্তাটি সফলভাবে পাঠানো হয়েছে!' : 'Message Received!'}
                </h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  {isBn
                    ? 'ধন্যবাদ! টেকনিশিয়ান এমদাদ হোসেন আপনার বার্তাটি পর্যালোচনা করে শীঘ্রই আপনার নম্বরে যোগাযোগ করবেন।'
                    : 'Thank you for reaching out. Technician Imdad Hossain will review your note and contact you shortly.'}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
                >
                  {isBn ? 'আরেকটি বার্তা পাঠান' : 'Send Another Inquiry'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
