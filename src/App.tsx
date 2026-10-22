/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { HomePage } from './components/public/HomePage';
import { AboutPage } from './components/public/AboutPage';
import { ServicesPage } from './components/public/ServicesPage';
import { ShopPage } from './components/public/ShopPage';
import { ProductDetailPage } from './components/public/ProductDetailPage';
import { RepairBookingPage } from './components/public/RepairBookingPage';
import { ContactPage } from './components/public/ContactPage';
import {
  CustomerLoginPage,
  CustomerRegistrationPage,
  CustomerDashboardPage,
} from './components/public/AuthPages';
import {
  CartPage,
  CheckoutPage,
  MyOrdersPage,
  OrderTrackingPage,
} from './components/public/CartAndCheckoutPages';
import {
  PrivacyPolicyPage,
  TermsPage,
  RefundPolicyPage,
} from './components/public/PolicyPages';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainContent: React.FC = () => {
  const { page, isAdminMode } = useApp();

  if (isAdminMode) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
        <AdminDashboard />
        <Toast />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white w-full overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full overflow-x-hidden">
        {page === 'home' && <HomePage />}
        {page === 'about' && <AboutPage />}
        {page === 'services' && <ServicesPage />}
        {page === 'shop' && <ShopPage />}
        {page === 'product-details' && <ProductDetailPage />}
        {page === 'booking' && <RepairBookingPage />}
        {page === 'contact' && <ContactPage />}
        {page === 'login' && <CustomerLoginPage />}
        {page === 'register' && <CustomerRegistrationPage />}
        {page === 'dashboard' && <CustomerDashboardPage />}
        {page === 'cart' && <CartPage />}
        {page === 'checkout' && <CheckoutPage />}
        {page === 'orders' && <MyOrdersPage />}
        {page === 'tracking' && <OrderTrackingPage />}
        {page === 'privacy' && <PrivacyPolicyPage />}
        {page === 'terms' && <TermsPage />}
        {page === 'refund' && <RefundPolicyPage />}
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
