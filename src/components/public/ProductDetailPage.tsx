/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  Truck,
  MessageSquare,
  Sparkles,
  Smartphone,
  CheckCircle2,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { products, selectedProductId, addToCart, navigate } = useApp();
  const [quantity, setQuantity] = useState<number>(1);
  const [imgError, setImgError] = useState(false);

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-400">Product not found.</p>
        <button
          onClick={() => navigate('shop')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const isDiscounted = product.discountPrice && product.discountPrice < product.price;
  const currentPrice = product.discountPrice ?? product.price;
  const savings = isDiscounted ? product.price - product.discountPrice! : 0;

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Product Shop</span>
        </button>
      </div>

      {/* Contiguous PDP Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Product Visual */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            {!imgError ? (
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-500">
                <Smartphone className="w-16 h-16 mb-2 text-slate-600" />
                <span className="text-xs">{product.name}</span>
              </div>
            )}

            {product.isDemo && (
              <div className="absolute top-4 left-4 bg-slate-900/90 text-slate-300 border border-slate-700/80 px-2.5 py-1 rounded text-xs font-mono uppercase tracking-wider">
                Demonstration Item
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>SKU: {product.sku}</span>
            <span>Category: {product.category}</span>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
              {product.category}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {product.name}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed pt-1">{product.description}</p>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                ৳{currentPrice.toLocaleString()}
              </span>
              {isDiscounted && (
                <>
                  <span className="text-base text-slate-500 line-through font-mono tabular-nums">
                    ৳{product.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-emerald-400">
                    Save ৳{savings.toLocaleString()}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    product.availability === 'in_stock' ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
                <span className="text-slate-300 capitalize">
                  {product.availability.replace('_', ' ')} ({product.stockQuantity} available)
                </span>
              </div>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Cash on Delivery Available</span>
            </div>

            {/* Quantity and Actions */}
            <div className="pt-3 border-t border-slate-800 space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-xs font-medium text-slate-300">Quantity:</label>
                <div className="flex items-center border border-slate-700 rounded-lg bg-slate-950 overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-slate-300 hover:bg-slate-800 text-sm font-semibold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-mono font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stockQuantity, q + 1))
                    }
                    className="px-3 py-1.5 text-slate-300 hover:bg-slate-800 text-sm font-semibold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-semibold text-xs transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>Instant Checkout</span>
                </button>
              </div>

              {/* WhatsApp direct stock query */}
              <a
                href={`https://wa.me/8801885181199?text=${encodeURIComponent(
                  `Assalamu Alaikum! I would like to inquire about "${product.name}" (SKU: ${product.sku}) at M/S Khandokar Mobile Solution.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-lg border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-950/40 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Confirm Compatibility via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Delivery & Warranty Trust Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-400">
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Ful-gazi Workshop Pickup or Local Delivery</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Testing Guarantee & Quality Verification</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Compatible Models Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-slate-800 pt-10">
        {/* Compatible Phone Models */}
        <div className="lg:col-span-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Compatible Phone Models</h2>
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              This component is engineered to match factory tolerances on the following smartphone
              chassis:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.compatibleModels.map((model, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{model}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Details Table */}
        <div className="lg:col-span-6 space-y-4">
          <h2 className="text-lg font-bold text-white">Technical Specifications</h2>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden text-xs">
            {Object.entries(product.details).map(([key, val], idx) => (
              <div
                key={key}
                className={`flex items-center justify-between p-3.5 ${
                  idx !== 0 ? 'border-t border-slate-800' : ''
                }`}
              >
                <span className="text-slate-400 font-medium">{key}</span>
                <span className="text-slate-200 text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
