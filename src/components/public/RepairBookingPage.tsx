/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RepairBooking } from '../../types';
import { BUSINESS_INFO } from '../../data/initialData';
import { bookingPageContent, servicesDataTranslations } from '../../translations';
import {
  Wrench,
  CheckCircle2,
  Calendar,
  User,
  Smartphone,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Copy,
} from 'lucide-react';

export const RepairBookingPage: React.FC = () => {
  const { services, selectedServiceId, createBooking, navigate, currentUser, lang, t } = useApp();

  const bc = bookingPageContent[lang] || bookingPageContent['en'];

  const [deviceBrand, setDeviceBrand] = useState('Samsung');
  const [deviceModel, setDeviceModel] = useState('');
  const [serviceId, setServiceId] = useState(
    selectedServiceId || 'display-replacement'
  );
  const [problemDescription, setProblemDescription] = useState('');
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerAddress, setCustomerAddress] = useState(currentUser?.address || '');
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });

  const [createdBooking, setCreatedBooking] = useState<RepairBooking | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedService = services.find((s) => s.id === serviceId) || services[0];
  const selectedServiceLoc = servicesDataTranslations[selectedService.id];
  const selectedServiceTitle = selectedServiceLoc?.title[lang] || selectedService.title;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deviceModel.trim() || !customerName.trim() || !customerPhone.trim()) {
      alert(lang === 'bn' ? 'অনুগ্রহ করে আবশ্যক ঘরগুলো পূরণ করুন: ডিভাইসের মডেল, নাম এবং মোবাইল নম্বর।' : 'Please fill in the required fields: Device Model, Name, and Phone number.');
      return;
    }

    const newBooking = createBooking({
      customerName,
      customerPhone,
      customerEmail: customerEmail || 'unspecified@customer.com',
      customerAddress,
      deviceBrand,
      deviceModel,
      serviceId,
      serviceTitle: selectedServiceTitle,
      problemDescription: problemDescription || (lang === 'bn' ? 'সাধারণ ডায়াগনস্টিক পরীক্ষণ।' : 'General diagnostic inspection requested.'),
      preferredDate,
      estimatedCost: selectedService.startingPrice,
      technicianNotes: 'Registered via web portal. Awaiting device drop-off at workshop.',
    });

    setCreatedBooking(newBooking);
  };

  const handleCopyCode = () => {
    if (createdBooking) {
      navigator.clipboard.writeText(createdBooking.trackingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-2 text-center sm:text-left">
        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          {bc.tag}
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {bc.title}
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl">
          {bc.subtitle}
        </p>
      </div>

      {!createdBooking ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Device Information */}
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-5">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <Smartphone className="w-5 h-5 text-blue-400" />
                  <span>{bc.step1Title}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      {bc.deviceBrandLabel}
                    </label>
                    <select
                      value={deviceBrand}
                      onChange={(e) => setDeviceBrand(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Samsung">Samsung</option>
                      <option value="Apple">Apple / iPhone</option>
                      <option value="Xiaomi">Xiaomi / Redmi / POCO</option>
                      <option value="Vivo">Vivo / iQOO</option>
                      <option value="Oppo">Oppo</option>
                      <option value="Realme">Realme</option>
                      <option value="Infinix">Infinix</option>
                      <option value="Tecno">Tecno</option>
                      <option value="OnePlus">OnePlus</option>
                      <option value="Other">{lang === 'bn' ? 'অন্যান্য ব্র্যান্ড' : 'Other Brand'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      {bc.deviceModelLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={deviceModel}
                      onChange={(e) => setDeviceModel(e.target.value)}
                      placeholder={bc.deviceModelPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {bc.serviceTypeLabel}
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    {services.map((s) => {
                      const loc = servicesDataTranslations[s.id];
                      const title = loc?.title[lang] || s.title;
                      return (
                        <option key={s.id} value={s.id}>
                          {title} ({t('startsFrom')} ৳{s.startingPrice})
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {bc.issueDescriptionLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                    placeholder={bc.issueDescriptionPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Section 2: Customer Contact Information */}
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-5">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <User className="w-5 h-5 text-blue-400" />
                  <span>{bc.step2Title}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      {t('fullNameLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
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
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder={t('phonePlaceholder')}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      {t('emailLabel')}
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder={t('emailPlaceholder')}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      {t('addressLabel')}
                    </label>
                    <input
                      type="text"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder={t('addressPlaceholder')}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {bc.preferredDateLabel}
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full sm:w-64 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Diagnostic Guarantee Callout */}
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/50 flex items-start gap-3 text-xs text-blue-200">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold text-white">
                    {lang === 'bn' ? 'স্বচ্ছ ডায়াগনস্টিক প্রতিশ্রুতি:' : 'Transparent Diagnostic Promise:'}
                  </span>
                  <p className="text-slate-300">
                    {lang === 'bn'
                      ? 'অনলাইনে বুকিং করার পর ডিভাইসটি আমাদের ল্যাবে পৌঁছালে আমরা আগে পাওয়ার ও সার্কিট চেক করে সঠিক খরচের হিসাব জানাবো। আপনার সম্মতির পরই কেবল মেরামত কাজ শুরু হবে।'
                      : 'Registering a booking does not obligate you to proceed. We test your phone on our DC power supply and microscope first, quote the exact cost, and only start repair upon your clear agreement.'}
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-xs text-slate-400 text-center sm:text-left">
                  {lang === 'bn'
                    ? 'ওয়ার্কশপ লোকেশন: চেয়ারম্যান মার্কেট, আমজাদ হাট, ফুলগাজী, ফেনী'
                    : 'Drop-off Location: Chairman Market, Amjad Hat, Ful-gazi, Feni'}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Wrench className="w-4 h-4" />
                  <span>{bc.submitBookingBtn}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Workshop Info Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>{lang === 'bn' ? 'ওয়ার্কশপ পরিচিতি' : 'Workshop Information'}</span>
              </h3>

              <div className="space-y-4 text-xs text-slate-300">
                <div>
                  <div className="text-slate-400 text-[11px] mb-0.5">
                    {lang === 'bn' ? 'ওয়ার্কশপের ঠিকানা:' : 'Workshop Address:'}
                  </div>
                  <div className="text-white font-medium">
                    {lang === 'bn' ? 'চেয়ারম্যান মার্কেট, আমজাদ হাট, ফুলগাজী, ফেনী' : BUSINESS_INFO.address}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px] mb-0.5">
                    {lang === 'bn' ? 'প্রধান টেকনিশিয়ান:' : 'Lead Technician:'}
                  </div>
                  <div className="text-white font-medium">
                    {lang === 'bn' ? 'এমদাদ হোসেন তুহিন' : BUSINESS_INFO.proprietor}
                  </div>
                  <div className="text-blue-400 text-[11px]">
                    {lang === 'bn' ? 'মোবাইল সার্ভিস উদ্যোক্তা ও টেকনিশিয়ান' : BUSINESS_INFO.title}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px] mb-0.5">
                    {lang === 'bn' ? 'সরাসরি হেল্পলাইন / হোয়াটসঅ্যাপ:' : 'Direct Helpline / WhatsApp:'}
                  </div>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="text-blue-400 font-mono text-sm font-semibold hover:underline"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px] mb-0.5">
                    {lang === 'bn' ? 'কর্মঘণ্টা:' : 'Workshop Hours:'}
                  </div>
                  <div className="text-slate-200">
                    {lang === 'bn' ? 'শনিবার – বৃহস্পতিবার: সকাল ৯:০০ – রাত ৯:০০' : 'Sat – Thu: 9:00 AM – 9:00 PM'}
                  </div>
                  <div className="text-slate-200">
                    {lang === 'bn' ? 'শুক্রবার: দুপুর ২:৩০ – রাত ৯:০০ (জুমার পর)' : 'Friday: 2:30 PM – 9:00 PM'}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{lang === 'bn' ? 'স্টকে থাকা ডিসপ্লে ৪৫–৯০ মিনিটে পরিবর্তন' : 'Fast 45–90 min turnaround on in-stock displays'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{lang === 'bn' ? 'কঠোর ডাটা প্রাইভেসি নীতি' : 'Strict zero data inspection policy'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{lang === 'bn' ? '৩০–৯০ দিনের হার্ডওয়্যার টেস্টিং ওয়ারেন্টি' : '30–90 days hardware testing warranty'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Success Screen with Real Generated Tracking Code */
        <div className="p-8 rounded-2xl border border-emerald-500/40 bg-slate-900/80 space-y-6 text-center animate-fade-in">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">{bc.successTitle}</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              {bc.successSubtitle}
            </p>
          </div>

          {/* Tracking Code Highlight Box */}
          <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
            <div className="text-left">
              <div className="text-[10px] uppercase font-mono text-slate-500">
                {bc.trackingCodeLabel}
              </div>
              <div className="font-mono text-xl font-bold text-blue-400">
                {createdBooking.trackingCode}
              </div>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? bc.copiedText : bc.copyCodeBtn}</span>
            </button>
          </div>

          {/* Ticket Summary Details */}
          <div className="max-w-md mx-auto rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">{lang === 'bn' ? 'কাস্টমার:' : 'Customer:'}</span>
              <span className="text-white font-medium">{createdBooking.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">{lang === 'bn' ? 'ডিভাইস:' : 'Device:'}</span>
              <span className="text-white font-medium">
                {createdBooking.deviceBrand} {createdBooking.deviceModel}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">{lang === 'bn' ? 'সার্ভিস:' : 'Service:'}</span>
              <span className="text-white font-medium">{createdBooking.serviceTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">{lang === 'bn' ? 'বর্তমান অবস্থা:' : 'Current Status:'}</span>
              <span className="text-blue-400 font-semibold capitalize">
                {createdBooking.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('tracking')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>{bc.trackOnlineBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setCreatedBooking(null)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              {bc.newBookingBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
