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
  Navigation,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      alert('Please fill in your name, contact phone, and message.');
      return;
    }
    setSubmitted(true);
    showToast('Your inquiry has been sent to our Ful-gazi technician desk!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-8 space-y-3">
        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          Direct Technical Advisory & Support
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contact M/S Khandokar Mobile Solution
        </h1>
        <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
          Whether you need a quick repair estimate, want to verify stock of replacement displays,
          or require emergency hardware diagnostics, we are ready to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Contact Cards & Location Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
            <h2 className="text-lg font-bold text-white">Workshop & Contact Details</h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Physical Workshop Address</div>
                  <div className="text-slate-300 mt-0.5">{BUSINESS_INFO.address}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    District: {BUSINESS_INFO.district}, Division: {BUSINESS_INFO.division}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Direct Mobile Line</div>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="text-slate-200 hover:text-blue-400 font-mono text-sm block mt-0.5"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                  <div className="text-slate-500 text-[11px]">Calls & SMS welcome</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Email Address</div>
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
                  <div className="font-semibold text-white">Operating Hours</div>
                  <div className="text-slate-300 mt-0.5">{BUSINESS_INFO.openingHours}</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/8801885181199?text=${encodeURIComponent(
                  'Assalamu Alaikum! I would like to inquire about mobile servicing at M/S Khandokar Mobile Solution.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Instantly via WhatsApp (+88 01885-181199)</span>
              </a>
            </div>
          </div>

          {/* Location Visual Aid */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Navigation className="w-4 h-4 text-blue-400" />
              <span>How to Reach Our Workshop</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Located directly at <strong className="text-white">Chairman Market</strong> in{' '}
              <strong className="text-white">Amjad Hat Bazar</strong>, along the main road
              connecting Ful-gazi and Parshuram in Feni. Easy access by CNG, auto-rickshaw, or
              motorcycle with parking available in front of the market.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Send Us a Direct Message</h2>
              <p className="text-xs text-slate-400">
                Have a technical question about your phone or a specific part? Send your inquiry
                directly to technician Imdad Hossain Tuhin.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Shahidul Islam"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+88 01885-181199"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Question or Problem Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your phone model, current issue, or parts inquiry..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            ) : (
              <div className="p-6 rounded-xl border border-emerald-500/40 bg-slate-950 text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Inquiry Received!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Thank you, {name}. Technician Imdad Hossain will review your query and contact
                  you at {phone} shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
