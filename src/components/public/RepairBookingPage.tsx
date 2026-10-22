/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RepairBooking } from '../../types';
import { BUSINESS_INFO } from '../../data/initialData';
import {
  Wrench,
  CheckCircle2,
  Calendar,
  Phone,
  User,
  Smartphone,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Copy,
} from 'lucide-react';

export const RepairBookingPage: React.FC = () => {
  const { services, selectedServiceId, createBooking, navigate, currentUser } = useApp();

  const [deviceBrand, setDeviceBrand] = useState('Samsung');
  const [deviceModel, setDeviceModel] = useState('');
  const [serviceId, setServiceId] = useState(
    selectedServiceId || 'display-replacement'
  );
  const [problemDescription, setProblemDescription] = useState('');
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '+8801');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerAddress, setCustomerAddress] = useState(currentUser?.address || 'Ful-gazi, Feni');
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });

  const [createdBooking, setCreatedBooking] = useState<RepairBooking | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedService = services.find((s) => s.id === serviceId) || services[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deviceModel.trim() || !customerName.trim() || !customerPhone.trim()) {
      alert('Please fill in the required fields: Device Model, Name, and Phone number.');
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
      serviceTitle: selectedService.title,
      problemDescription: problemDescription || 'General diagnostic inspection requested.',
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
          Counter Drop-off & Priority Queue
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Book a Mobile Repair Service
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl">
          Reserve your diagnostic bench slot at Chairman Market, Amjad Hat, Ful-gazi. You will
          receive a unique tracking code to follow your repair status online.
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
                  <span>1. Device & Problem Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Device Brand *
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
                      <option value="Other">Other Brand</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Device Model Name / Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={deviceModel}
                      onChange={(e) => setDeviceModel(e.target.value)}
                      placeholder="e.g. Galaxy A52s, Redmi Note 10 Pro, iPhone 12"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Service Required *
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} (Est. starting ৳{s.startingPrice})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Describe the Fault or Symptoms
                  </label>
                  <textarea
                    rows={3}
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                    placeholder="e.g. Screen cracked after falling; touch works partially; device vibrates but display remains blank; phone gets hot near camera..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Section 2: Customer Contact Information */}
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-5">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <User className="w-5 h-5 text-blue-400" />
                  <span>2. Customer & Appointment Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Phone Number (Active for SMS / Calls) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+8801885181199"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Location / Area in Feni
                    </label>
                    <input
                      type="text"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="e.g. Amjad Hat, Ful-gazi or Feni Sadar"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Preferred Drop-off Date
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
                  <span className="font-semibold text-white">Transparent Diagnostic Promise:</span>
                  <p className="text-slate-300">
                    Registering a booking does not obligate you to proceed. We test your phone on our DC
                    power supply and microscope first, quote the exact cost, and only start repair upon
                    your clear agreement.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-xs text-slate-400 text-center sm:text-left">
                  Drop-off Location: Chairman Market, Amjad Hat, Ful-gazi, Feni
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Confirm & Generate Tracking Code</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Workshop Info Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Workshop Information</span>
              </h3>

              <div className="space-y-4 text-xs text-slate-300">
                <div>
                  <div className="text-slate-400 text-[11px] mb-0.5">Workshop Address:</div>
                  <div className="text-white font-medium">{BUSINESS_INFO.address}</div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px] mb-0.5">Lead Technician:</div>
                  <div className="text-white font-medium">{BUSINESS_INFO.proprietor}</div>
                  <div className="text-blue-400 text-[11px]">{BUSINESS_INFO.title}</div>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px] mb-0.5">Direct Helpline / WhatsApp:</div>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="text-blue-400 font-mono text-sm font-semibold hover:underline"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>

                <div>
                  <div className="text-slate-400 text-[11px] mb-0.5">Workshop Hours:</div>
                  <div className="text-slate-200">Sat – Thu: 9:00 AM – 9:00 PM</div>
                  <div className="text-slate-200">Friday: 2:30 PM – 9:00 PM</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Fast 45–90 min turnaround on in-stock displays</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Strict zero data inspection policy</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>30–90 days hardware testing warranty</span>
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
            <h2 className="text-2xl font-bold text-white">Repair Ticket Registered!</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Your device diagnostic slot has been queued in our workshop database. Please save your
              tracking code below.
            </p>
          </div>

          {/* Tracking Code Highlight Box */}
          <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
            <div className="text-left">
              <div className="text-[10px] uppercase font-mono text-slate-500">
                Repair Tracking Code
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
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Ticket Summary Details */}
          <div className="max-w-md mx-auto rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Customer:</span>
              <span className="text-white font-medium">{createdBooking.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Device:</span>
              <span className="text-white font-medium">
                {createdBooking.deviceBrand} {createdBooking.deviceModel}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Service:</span>
              <span className="text-white font-medium">{createdBooking.serviceTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Current Status:</span>
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
              <span>Track Live Status</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setCreatedBooking(null)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              Book Another Device
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
