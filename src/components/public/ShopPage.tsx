/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { getLocalizedCategory } from '../../translations';
import { Search, SlidersHorizontal, Info, X } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    categories: appCategories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    lang,
    t,
  } = useApp();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categories = useMemo(() => ['All', ...appCategories.map((c) => c.name)], [appCategories]);

  // Real-time filtering matching by name, category, SKU, or compatible phone models
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products
      .filter((p) => !p.isArchived)
      .filter((p) => {
        // Category tab filter
        const matchesCategoryTab =
          selectedCategory === 'All' || p.category === selectedCategory;

        if (!matchesCategoryTab) return false;

        // If no search query, keep items in the selected category
        if (!query) return true;

        // Real-time search matching:
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesSku = p.sku.toLowerCase().includes(query);
        const matchesModels = p.compatibleModels.some((m) =>
          m.toLowerCase().includes(query)
        );

        return matchesName || matchesCategory || matchesSku || matchesModels;
      })
      .sort((a, b) => {
        const priceA = a.discountPrice ?? a.price;
        const priceB = b.discountPrice ?? b.price;
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Compute category product counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: 0 };
    products.forEach((p) => {
      if (!p.isArchived) {
        counts.All = (counts.All || 0) + 1;
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  const activeCount = products.filter((p) => !p.isArchived).length;
  const isFiltered = searchQuery.trim() !== '' || selectedCategory !== 'All';

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Catalog Disclosure */}
      <div className="border-b border-slate-800 pb-8 space-y-3">
        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
          {lang === 'bn' ? 'আসল রিপ্লেসমেন্ট পার্টস ও মোবাইল এক্সেসরিজ' : 'Genuine Replacement Parts & Phone Accessories'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {lang === 'bn' ? 'প্রোডাক্ট ও পার্টস শপ' : 'Product & Parts Shop'}
        </h1>
        <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
          {lang === 'bn'
            ? 'উন্নত হার্ডওয়্যার পার্টস, চার্জার ক্যাবল, অ্যাডাপ্টার, গ্লাস প্রটেক্টর ও এক্সেসরিজ সরাসরি ফুলগাজী ওয়ার্কশপ থেকে বা ফেনীতে ডেলিভারি নিতে অর্ডার করুন।'
            : 'Browse replacement hardware components, charging cables, adapters, tempered glass, and phone care accessories available for customer pickup or local delivery in Feni.'}
        </p>

        {/* Clear Demonstration Notice */}
        <div className="pt-2">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-white">
                {lang === 'bn' ? 'ডেমোনস্ট্রেশন ক্যাটালগ মোড:' : 'Demonstration Catalog Mode:'}
              </strong>{' '}
              {lang === 'bn'
                ? 'এখানে প্রদর্শিত পণ্যসমূহ প্রাথমিক ক্যাটালগ ডাটা। অনুমোদিত অ্যাডমিন প্যানেলের মাধ্যমে নতুন স্টক যুক্ত বা মূল্য পরিবর্তন করা যায়।'
                : 'These initial products represent live demonstrative catalog data. Authorized store administrators can update stock, add models, or modify prices inside the Admin Panel.'}
            </p>
          </div>
        </div>
      </div>

      {/* Real-Time Search Bar & Filter Controls */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Main Real-Time Product Search Bar */}
          <div className="relative flex-1">
            <label htmlFor="product-search-input" className="sr-only">
              {t('searchPlaceholder')}
            </label>
            <Search className="w-4 h-4 text-blue-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="product-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
                title={lang === 'bn' ? 'অনুসন্ধান মুছুন' : 'Clear search'}
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <select
                aria-label="Filter by Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto bg-slate-950 border border-slate-700/80 text-xs font-medium text-slate-200 rounded-xl px-3.5 py-3 focus:outline-none focus:border-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {t('category')}: {getLocalizedCategory(cat, lang)} ({categoryCounts[cat] || 0})
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
              <select
                aria-label="Sort products"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-950 border border-slate-700/80 text-xs font-medium text-slate-200 rounded-xl px-3.5 py-3 focus:outline-none focus:border-blue-500"
              >
                <option value="featured">{t('featured')}</option>
                <option value="price-asc">{t('priceLowHigh')}</option>
                <option value="price-desc">{t('priceHighLow')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Category Buttons with Product Counts */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none">
          {categories.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                    : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{getLocalizedCategory(cat, lang)}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-blue-700 text-blue-100' : 'bg-slate-900 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Real-Time Results Counter & Filter Status */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>
              {t('showing')} <strong className="text-white font-mono">{filteredProducts.length}</strong> {t('of')}{' '}
              <span className="text-slate-300 font-mono">{activeCount}</span> {t('products')}
            </span>

            {searchQuery && (
              <>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-300">
                  {lang === 'bn' ? 'অনুসন্ধান: ' : 'matching '}
                  "<strong className="text-blue-400">{searchQuery}</strong>"
                </span>
              </>
            )}

            {selectedCategory !== 'All' && (
              <>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-300">
                  {lang === 'bn' ? 'ক্যাটাগরি: ' : 'in category '}
                  "<strong className="text-blue-400">{getLocalizedCategory(selectedCategory, lang)}</strong>"
                </span>
              </>
            )}
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              {t('resetFilters')}
            </button>
          )}
        </div>
      </div>

      {/* Product Catalog Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3">
          <p className="text-slate-300 text-sm">
            {lang === 'bn'
              ? 'আপনার অনুসন্ধানের সাথে মেলে এমন কোনো প্রোডাক্ট পাওয়া যায়নি।'
              : 'No products found matching your active filter criteria.'}
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold"
          >
            {t('resetFilters')}
          </button>
        </div>
      )}
    </div>
  );
};
