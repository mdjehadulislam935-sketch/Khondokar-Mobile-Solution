/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, FileText, RotateCcw } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/initialData';
import { useApp } from '../../context/AppContext';

export const PrivacyPolicyPage: React.FC = () => {
  const { lang } = useApp();
  const isBn = lang === 'bn';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>{isBn ? 'গ্রাহকের ডাটা ও গোপনীয়তা সুরক্ষা' : 'Customer Device Data & Privacy Protection'}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {isBn ? 'গোপনীয়তা নীতি (Privacy Policy)' : 'Privacy Policy'}
        </h1>
        <p className="text-xs text-slate-400">
          {isBn ? 'কার্যকর তারিখ: ১ জানুয়ারি, ২০২৬ · ফুলগাজী, ফেনী' : 'Effective Date: January 1, 2026 · Last Updated: 2026'}
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">
            {isBn ? '১. শতভাগ ডিভাইস গোপনীয়তা প্রতিশ্রুতি' : '1. Strict Device Confidentiality Commitment'}
          </h2>
          <p>
            {isBn ? (
              <>
                <strong className="text-white">মেসার্স খন্দকার মোবাইল সলিউশন</strong>-এ আমরা গ্রাহকের মোবাইল ফোনকে সম্পূর্ণ ব্যক্তিগত আমানত হিসেবে বিবেচনা করি। চেয়ারম্যান মার্কেট, আমজাদ হাট, ফুলগাজী ওয়ার্কশপে টেকনিশিয়ান{' '}
                <strong className="text-white">এমদাদ হোসেন তুহিন</strong>-এর তত্ত্বাবধানে মেরামতের সময় গ্রাহকের অনুমতি ছাড়া কোনো ডাটা দেখার ওপর কঠোর নিষেধাজ্ঞা বলবৎ থাকে।
              </>
            ) : (
              <>
                At <strong className="text-white">{BUSINESS_INFO.name}</strong>, we consider your smartphone to be an extension of your personal and professional privacy. When you entrust your phone to technician{' '}
                <strong className="text-white">{BUSINESS_INFO.proprietor}</strong> at our Chairman Market workshop in Ful-gazi, we enforce a strict zero-tolerance policy against unauthorized data inspection.
              </>
            )}
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-400">
            {isBn ? (
              <>
                <li>টেকনিশিয়ান কোনো অবস্থাতেই গ্রাহকের গ্যালারির ব্যক্তিগত ছবি বা ভিডিও দেখতে পারবেন না।</li>
                <li>হোয়াটসঅ্যাপ, মেসেঞ্জার, ইমেইল বা এসএমএসের মতো কোনো ব্যক্তিগত অ্যাপে প্রবেশ করা হয় না।</li>
                <li>হার্ডওয়্যার টেস্টের ক্ষেত্রে কেবল ডায়াল কোড (*#0*# ইত্যাদি) বা সেফ মোড ব্যবহার করা হয়।</li>
              </>
            ) : (
              <>
                <li>Technicians will never open, browse, or copy customer photo galleries.</li>
                <li>We do not open WhatsApp, Messenger, SMS, emails, or personal messaging apps.</li>
                <li>Hardware testing is conducted strictly using diagnostic dial codes (*#0*#) or safe mode.</li>
              </>
            )}
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">
            {isBn ? '২. সংগৃহীত তথ্য ও ব্যবহার' : '2. Customer Information Collected'}
          </h2>
          <p>
            {isBn
              ? 'সার্ভিস বুকিং বা প্রোডাক্ট অর্ডারের সময় আমরা কেবলমাত্র প্রয়োজনীয় তথ্য সংগ্রহ করি: আপনার নাম, সক্রিয় মোবাইল নম্বর, ঐচ্ছিক ইমেইল ও ঠিকানা। এই তথ্য শুধুমাত্র মেরামতের অগ্রগতি ও ডেলিভারি যোগাযোগের জন্য ব্যবহৃত হয় এবং কোনো তৃতীয় পক্ষের কাছে হস্তান্তর করা হয় না।'
              : 'When booking a repair or purchasing parts, we collect only essential contact details: your name, mobile telephone number, optional email address, and physical delivery address in Feni. This information is used exclusively to contact you regarding repair status updates or delivery.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">
            {isBn ? '৩. ডাটা ব্যাকআপ সংক্রান্ত সতর্কতা' : '3. Data Backup Recommendations'}
          </h2>
          <p>
            {isBn
              ? 'আমাদের সার্কিট রিপেয়ার সবসময় ডাটা অক্ষত রাখার চেষ্টা করে। তবে মাদারবোর্ড শর্ট বা সফটওয়্যার ফ্ল্যাশিংয়ের ক্ষেত্রে অনাকাঙ্ক্ষিত ডাটা হারানোর ঝুঁকি এড়াতে সম্ভব হলে আগে ব্যাকআপ রাখার পরামর্শ দেওয়া হয়।'
              : 'While our component-level repairs aim to preserve user data whenever physically possible, severe motherboard failures, CPU issues, and software firmware flashing may involve inherent risk of data loss. Customers are strongly encouraged to maintain backups.'}
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const { lang } = useApp();
  const isBn = lang === 'bn';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>{isBn ? 'ওয়ার্কশপ সার্ভিস ও লেনদেনের শর্তাবলী' : 'Service Engagement & Workshop Terms'}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {isBn ? 'শর্তাবলী ও নিয়মাবলী (Terms and Conditions)' : 'Terms and Conditions'}
        </h1>
        <p className="text-xs text-slate-400">
          {isBn ? 'কার্যকর তারিখ: ১ জানুয়ারি, ২০২৬ · ফুলগাজী, ফেনী' : 'Effective Date: January 1, 2026 · Operating in Feni, Bangladesh'}
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">
            {isBn ? '১. ডায়াগনস্টিক ও কাজের অনুমোদন' : '1. Diagnostic Quotes and Authorization'}
          </h2>
          <p>
            {isBn
              ? 'প্রতিটি ডিভাইসের ক্ষেত্রে প্রাথমিক কারেন্ট ও সার্কিট পরীক্ষা করার পর গ্রাহককে খরচের আনুমানিক হিসাব জানানো হয়। গ্রাহকের স্পষ্ট সম্মতির পরই পার্টস লাগানো বা সোল্ডারিং কাজ শুরু করা হয়।'
              : 'All repair work begins with initial electrical evaluation (DC power curve, multimeter impedance, microscope inspection). We provide an upfront estimated cost before executing micro-soldering or swapping major components. Work only proceeds upon clear customer authorization.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">
            {isBn ? '২. পানিতে পড়া ফোনের বিশেষ শর্ত' : '2. Pre-Existing Water & Liquid Damage'}
          </h2>
          <p>
            {isBn
              ? 'পানিতে পড়া ফোনে ভেতরে রাসায়নিক ক্ষয় হতে থাকে। আল্ট্রাসনিক ওয়াশ দ্বারা সার্কিট বাঁচানোর সর্বোচ্চ চেষ্টা করা হলেও অত্যন্ত ক্ষতিগ্রস্ত সার্কিটের ক্ষেত্রে যেকোনো ঝুঁকি গ্রাহককে স্বচ্ছভাবে জানিয়ে কাজ করা হয়।'
              : 'Liquids cause ongoing galvanic corrosion across multi-layer PCBs. While our ultrasonic cleaning and trace rebuilding have high recovery rates, devices with severe prior liquid exposure may develop secondary failures in unserviced areas over time.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">
            {isBn ? '৩. ডিভাইস সংগ্রহের সময়সীমা' : '3. Collection and Storage Period'}
          </h2>
          <p>
            {isBn
              ? 'মেরামত সম্পন্ন হওয়ার পর গ্রাহককে ফোন বা এসএমএস করে জানানো হবে। নোটিফিকেশন পাওয়ার ৬০ দিনের মধ্যে ফুলগাজী ল্যাব থেকে ফোন সংগ্রহ করতে অনুরোধ করা হচ্ছে।'
              : 'Customers will be notified via phone/SMS upon completion of repair work. Repaired or diagnosed devices should be collected within 60 days from notification date at our Chairman Market workshop in Ful-gazi.'}
          </p>
        </section>
      </div>
    </div>
  );
};

export const RefundPolicyPage: React.FC = () => {
  const { lang } = useApp();
  const isBn = lang === 'bn';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
          <RotateCcw className="w-4 h-4" />
          <span>{isBn ? 'ওয়ারেন্টি ও রিটার্ন নীতিমালা' : 'Warranty & Returns Transparency'}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {isBn ? 'রিটার্ন ও ওয়ারেন্টি পলিসি' : 'Return and Refund Policy'}
        </h1>
        <p className="text-xs text-slate-400">
          {isBn ? 'কার্যকর তারিখ: ১ জানুয়ারি, ২০২৬ · মেসার্স খন্দকার মোবাইল সলিউশন' : 'Effective Date: January 1, 2026'}
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">
            {isBn ? '১. রিপ্লেসমেন্ট পার্টস ওয়ারেন্টি' : '1. Replacement Parts Warranty'}
          </h2>
          <p>
            {isBn ? 'আমাদের ওয়ার্কশপে সংযোজিত গুণগত মানের পার্টসে রয়েছে নির্দিষ্ট ওয়ারেন্টি:' : 'We stand behind the quality of components installed by our technician:'}
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-400">
            {isBn ? (
              <>
                <li>
                  <strong className="text-slate-200">নতুন ডিসপ্লে ও টাচ:</strong> ৩০ দিনের কার্যকরী টেস্টিং ওয়ারেন্টি (টাচ রেসপন্স ও ডিসপ্লে লাইনের জন্য প্রযোজ্য, ফিজিক্যাল ভাঙা বা পানিতে পড়া ব্যতীত)।
                </li>
                <li>
                  <strong className="text-slate-200">নতুন ব্যাটারি:</strong> ৯০ দিনের রিপ্লেসমেন্ট ওয়ারেন্টি (ব্যাটারি ফুলে যাওয়া বা আকস্মিক চার্জ শেষ হওয়ার সমস্যায়)।
                </li>
                <li>
                  <strong className="text-slate-200">চার্জিং পোর্ট ও ইন্টারনাল ফ্লেক্স:</strong> ৩০ দিনের টেস্টিং গ্যারান্টি।
                </li>
              </>
            ) : (
              <>
                <li>
                  <strong className="text-slate-200">Replacement Displays & Touch Digitizers:</strong> 30-Day functional warranty covering touch failure or display lines (excluding physical cracks or liquid damage).
                </li>
                <li>
                  <strong className="text-slate-200">Replacement Batteries:</strong> 90-Day warranty covering abnormal swelling, failure to charge, or sudden shutdown.
                </li>
                <li>
                  <strong className="text-slate-200">Charging Ports & Internal Flex:</strong> 30-Day functional testing guarantee.
                </li>
              </>
            )}
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">
            {isBn ? '২. রিটেইল এক্সেসরিজ পরিবর্তন' : '2. Retail Accessories Return'}
          </h2>
          <p>
            {isBn
              ? 'আমাদের শপ থেকে ক্রয়কৃত ফাস্ট চার্জার বা ক্যাবলে উৎপাদনজনিত ত্রুটি থাকলে ক্রয়ের ৭ দিনের মধ্যে ক্যাশ মেমোসহ পরিবর্তন সুবিধা প্রযোজ্য।'
              : 'Charging cables, GaN power adapters, and accessories purchased through our shop can be exchanged within 7 days of purchase upon presentation of original packaging and order receipt if found to possess manufacturing defects.'}
          </p>
        </section>
      </div>
    </div>
  );
};
