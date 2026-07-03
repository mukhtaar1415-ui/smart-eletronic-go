/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, ArrowUpDown, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';

interface ShopViewProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  favoriteProductIds: string[];
  onToggleFavorite: (product: Product) => void;
  initialCategoryFilter?: string;
}

export default function ShopView({
  onAddToCart,
  onQuickView,
  favoriteProductIds,
  onToggleFavorite,
  initialCategoryFilter = 'all',
}: ShopViewProps) {
  const [searchVal, setSearchVal] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter);
  const [maxPrice, setMaxPrice] = useState<number>(4000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Available Categories list
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'smartphones', name: 'Smartphones' },
    { id: 'laptops', name: 'Laptops' },
    { id: 'audio', name: 'Audio (Headphones / Speakers)' },
    { id: 'wearables', name: 'Wearables (Smartwatches)' },
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        product.description.toLowerCase().includes(searchVal.toLowerCase());
      
      // 2. Category filter
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      // 3. Price filter
      const matchesPrice = product.salePrice <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      // 4. Sort logic
      if (sortBy === 'price-low') return a.salePrice - b.salePrice;
      if (sortBy === 'price-high') return b.salePrice - a.salePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0); // Featured / Best Seller by default
    });
  }, [searchVal, selectedCategory, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSearchVal('');
    setSelectedCategory('all');
    setMaxPrice(4000);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="shop-view-container">
      {/* Intro Header */}
      <div className="text-center mb-10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-widest text-[#171717] uppercase">
          Explore Our Catalog
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium max-w-md mx-auto">
          High-performance smart electronics designed for your daily life. Filter and find the perfect match.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR FILTERS - Left */}
        <div className="lg:col-span-1 space-y-8" id="shop-sidebar-filters">
          {/* Search Box */}
          <div className="bg-white border border-gray-100 p-5 rounded-sm shadow-xs text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-3 flex items-center space-x-2">
              <Search size={14} />
              <span>Search Products</span>
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full text-xs border border-gray-200 p-2.5 pr-8 focus:outline-none focus:border-black rounded-xs bg-white text-gray-800"
              />
              {searchVal && (
                <button
                  onClick={() => setSearchVal('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-xs font-bold focus:outline-none"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Categories select */}
          <div className="bg-white border border-gray-100 p-5 rounded-sm shadow-xs text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-4 flex items-center space-x-2">
              <SlidersHorizontal size={14} />
              <span>Categories</span>
            </h3>
            <div className="space-y-2.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left text-xs py-2 px-3 transition-colors duration-200 cursor-pointer rounded-xs flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-black text-white font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] ${selectedCategory === cat.id ? 'text-gray-300' : 'text-gray-400'}`}>
                    ({cat.id === 'all' 
                      ? PRODUCTS.length 
                      : PRODUCTS.filter(p => p.category === cat.id).length
                    })
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="bg-white border border-gray-100 p-5 rounded-sm shadow-xs text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-3">
              Filter by Price
            </h3>
            <div className="space-y-4">
              <input
                type="range"
                min="1000"
                max="4000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
              <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                <span>Min: $1000</span>
                <span className="text-[#171717] font-bold">Max: ${maxPrice}</span>
              </div>
            </div>
          </div>

          {/* Reset Filters Option Button */}
          <button
            onClick={handleResetFilters}
            className="w-full border border-gray-200 hover:border-gray-400 bg-white text-[#171717] hover:bg-gray-50 text-[10px] font-bold tracking-widest uppercase py-3 flex items-center justify-center space-x-2 transition-all rounded-xs cursor-pointer"
          >
            <RefreshCw size={12} />
            <span>Reset All Filters</span>
          </button>
        </div>

        {/* PRODUCTS GRID - Right */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-4 gap-4">
            <div className="text-xs text-gray-500 font-medium">
              Showing <span className="font-bold text-gray-800">{filteredProducts.length}</span> of{' '}
              <span className="font-bold text-gray-800">{PRODUCTS.length}</span> products
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 text-xs" id="shop-sorting">
              <span className="text-gray-400 font-medium flex items-center space-x-1">
                <ArrowUpDown size={13} />
                <span>Sort by:</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-200 bg-white p-1.5 focus:outline-none focus:border-black rounded-xs text-xs font-semibold text-gray-800 cursor-pointer"
              >
                <option value="featured">Featured (Default)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Product Items Display */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 border border-gray-100 rounded-sm">
              <h3 className="text-sm font-semibold text-[#171717]">No products match your criteria</h3>
              <p className="text-xs text-gray-400 mt-1.5 max-w-xs mx-auto">
                Try widening your search keywords, adjusting the price limits, or selecting a different category.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 bg-black text-white hover:bg-gray-800 text-[10px] font-bold tracking-widest uppercase px-6 py-2.5 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6"
              id="shop-product-grid"
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                  isFavorite={favoriteProductIds.includes(product.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
