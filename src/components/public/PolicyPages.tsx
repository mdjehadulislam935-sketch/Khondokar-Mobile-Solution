/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, FileText, RotateCcw } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/initialData';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Customer Device Data & Privacy Protection</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Effective Date: January 1, 2026 · Last Updated: 2026</p>
      </div>

      <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Strict Device Confidentiality Commitment</h2>
          <p>
            At <strong className="text-white">{BUSINESS_INFO.name}</strong>, we consider your
            smartphone to be an extension of your personal and professional privacy. When you
            entrust your phone, tablet, or device to technician{' '}
            <strong className="text-white">{BUSINESS_INFO.proprietor}</strong> at our Chairman
            Market workshop in Ful-gazi, we enforce a strict zero-tolerance policy against
            unauthorized data inspection.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-400">
            <li>Technicians will never open, browse, or copy customer photo galleries.</li>
            <li>We do not open WhatsApp, Messenger, SMS, emails, or personal messaging apps.</li>
            <li>
              Hardware testing (screen digitizer response, speakers, proximity sensors) is conducted
              strictly using diagnostic dial codes (*#0*#, test menus) or guest/safe mode.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Customer Information Collected</h2>
          <p>
            When booking a repair or purchasing parts, we collect only essential contact details:
            your name, mobile telephone number, optional email address, and physical delivery/pickup
            village or district in Feni. This information is used exclusively to contact you
            regarding repair status updates or parcel delivery. We never sell, rent, or distribute
            customer numbers to third-party telemarketers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Data Backup Recommendations</h2>
          <p>
            While our component-level repairs aim to preserve user data whenever physically possible,
            severe motherboard failures, CPU/eMMC issues, and software firmware flashing may involve
            inherent risk of data loss. Customers are strongly encouraged to maintain backups of
            vital data prior to servicing whenever the device remains operational.
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>Service Engagement & Workshop Terms</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Terms and Conditions</h1>
        <p className="text-xs text-slate-400">Effective Date: January 1, 2026 · Operating in Feni, Bangladesh</p>
      </div>

      <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Diagnostic Quotes and Authorization</h2>
          <p>
            All repair work begins with initial electrical evaluation (DC power curve, multimeter
            impedance, microscope inspection). We provide an upfront estimated cost before executing
            micro-soldering or swapping major components. Work only proceeds upon clear verbal,
            SMS, or in-person customer authorization.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Pre-Existing Water & Liquid Damage</h2>
          <p>
            Liquids cause ongoing galvanic corrosion across multi-layer PCBs. While our ultrasonic
            cleaning and trace rebuilding have high recovery rates, devices with severe prior liquid
            exposure may develop secondary failures in unserviced areas over time. Diagnosing dead
            water-damaged units entails inherent unpredictability, which we communicate transparently.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Collection and Storage Period</h2>
          <p>
            Customers will be notified via phone/SMS upon completion of repair work. Repaired or
            diagnosed devices should be collected within 60 days from notification date at our
            Chairman Market workshop in Ful-gazi.
          </p>
        </section>
      </div>
    </div>
  );
};

export const RefundPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
          <RotateCcw className="w-4 h-4" />
          <span>Warranty & Returns Transparency</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Return and Refund Policy
        </h1>
        <p className="text-xs text-slate-400">Effective Date: January 1, 2026</p>
      </div>

      <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Replacement Parts Warranty</h2>
          <p>
            We stand behind the quality of components installed by our technician:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-400">
            <li>
              <strong className="text-slate-200">Replacement Displays & Touch Digitizers:</strong> 30-Day
              functional warranty covering touch failure, display discoloration, or lines (provided
              there is no subsequent physical glass crack or liquid damage).
            </li>
            <li>
              <strong className="text-slate-200">Replacement Batteries:</strong> 90-Day warranty covering
              abnormal battery swelling, failure to charge, or sudden shutdown.
            </li>
            <li>
              <strong className="text-slate-200">Charging Ports & Internal Flex:</strong> 30-Day functional
              testing guarantee.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Retail Accessories Return</h2>
          <p>
            Charging cables, GaN power adapters, and earphones purchased through our shop can be
            exchanged within 7 days of purchase upon presentation of original packaging and order
            receipt if found to possess manufacturing defects.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Labor and Diagnostic Fees</h2>
          <p>
            Diagnostic evaluations that require deep board disassembly or ultrasonic cleaning carry
            a modest labor charge (communicated upfront) to cover technician time and specialized
            chemical solvents, even if a phone is diagnosed as physically unrepairable due to
            catastrophic PCB fracturing.
          </p>
        </section>
      </div>
    </div>
  );
};
