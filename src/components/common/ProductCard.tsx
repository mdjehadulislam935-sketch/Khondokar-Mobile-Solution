/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Eye, Smartphone } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigate, addToCart } = useApp();
  const [imgError, setImgError] = useState(false);

  const isDiscounted = product.discountPrice && product.discountPrice < product.price;
  const currentPrice = product.discountPrice ?? product.price;

  return (
    <div className="group rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-slate-700 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-blue-950/20">
      <div>
        {/* Product Media Area */}
        <div
          onClick={() => navigate('product-details', { productId: product.id })}
          className="relative aspect-[4/3] bg-slate-950 overflow-hidden cursor-pointer"
        >
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-500">
              <Smartphone className="w-10 h-10 mb-2 text-slate-600" />
              <span className="text-xs text-center">{product.name}</span>
            </div>
          )}

          {/* Demonstration Notice Watermark */}
          {product.isDemo && (
            <div className="absolute top-2.5 left-2.5 text-[10px] uppercase font-mono tracking-wider bg-slate-900/90 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60">
              Demo Item
            </div>
          )}

          {/* Quick View Overlay Button */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-semibold backdrop-blur-sm border border-slate-700">
              <Eye className="w-3.5 h-3.5" />
              <span>View Specifications</span>
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4 space-y-2">
          {/* Unboxed Metadata (Zero-Pill Compliance) */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px] text-slate-500">{product.sku}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => navigate('product-details', { productId: product.id })}
            className="font-semibold text-slate-100 text-sm line-clamp-2 hover:text-blue-400 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          {/* Compatible Models Snippet */}
          {product.compatibleModels.length > 0 && (
            <p className="text-xs text-slate-400 line-clamp-1">
              Supports: {product.compatibleModels.join(', ')}
            </p>
          )}
        </div>
      </div>

      {/* Footer Area: Price and Add Action */}
      <div className="p-4 pt-0">
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800/80">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-white font-mono tabular-nums">
                ৳{currentPrice.toLocaleString()}
              </span>
              {isDiscounted && (
                <span className="text-xs text-slate-500 line-through font-mono tabular-nums">
                  ৳{product.price.toLocaleString()}
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-500">
              {product.availability === 'in_stock' ? (
                <span className="text-emerald-400 font-medium">In Stock ({product.stockQuantity})</span>
              ) : (
                <span className="text-amber-400 font-medium">Pre-Order Only</span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.availability === 'out_of_stock'}
            className="p-2.5 rounded-lg bg-blue-600/90 text-white hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
