/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, Globe, Heart } from 'lucide-react';

interface HeaderProps {
  currentTab: 'home' | 'shop' | 'contact';
  setTab: (tab: 'home' | 'shop' | 'contact') => void;
  cartCount: number;
  onCartClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favoritesCount: number;
  onFavoritesClick: () => void;
}

export default function Header({
  currentTab,
  setTab,
  cartCount,
  onCartClick,
  searchQuery,
  setSearchQuery,
  favoritesCount,
  onFavoritesClick,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setTab('shop');
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-40" id="main-header">
      {/* Ticker / Promo Bar */}
      <div className="w-full bg-[#f3f4f6] text-[#171717] py-2 border-b border-gray-200 overflow-hidden" id="promo-ticker">
        <div className="flex animate-infinite-scroll whitespace-nowrap text-[10px] tracking-widest font-medium uppercase justify-around select-none">
          <span className="mx-4">Free Shipping For All Orders Over $100</span>
          <span className="hidden md:inline mx-4">•</span>
          <span className="hidden md:inline mx-4">30-Day Money Back Guarantee</span>
          <span className="hidden md:inline mx-4">•</span>
          <span className="mx-4">Free Shipping For All Orders Over $100</span>
          <span className="hidden lg:inline mx-4">•</span>
          <span className="hidden lg:inline mx-4">Secure Checkout Powered by Stripe</span>
          <span className="mx-4">Free Shipping For All Orders Over $100</span>
        </div>
      </div>

      {/* Main Header Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between" id="header-container">
        {/* Navigation Links - Left (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium" id="desktop-nav">
          <button
            onClick={() => setTab('home')}
            className={`transition-colors duration-200 hover:text-black pb-1 relative ${
              currentTab === 'home' ? 'text-black border-b-2 border-black font-semibold' : 'text-gray-500'
            }`}
            id="nav-link-home"
          >
            Home
          </button>
          <button
            onClick={() => setTab('shop')}
            className={`transition-colors duration-200 hover:text-black pb-1 relative ${
              currentTab === 'shop' ? 'text-black border-b-2 border-black font-semibold' : 'text-gray-500'
            }`}
            id="nav-link-shop"
          >
            Shop Now
          </button>
          <button
            onClick={() => setTab('contact')}
            className={`transition-colors duration-200 hover:text-black pb-1 relative ${
              currentTab === 'contact' ? 'text-black border-b-2 border-black font-semibold' : 'text-gray-500'
            }`}
            id="nav-link-contact"
          >
            Contact
          </button>
        </nav>

        {/* Mobile Menu Button - Left (Mobile) */}
        <div className="flex md:hidden" id="mobile-menu-btn-container">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 p-2 focus:outline-none"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Logo and Shop Title - Center */}
        <div
          className="text-center flex flex-col items-center cursor-pointer select-none"
          onClick={() => setTab('home')}
          id="logo-brand"
        >
          <h1 className="font-display font-bold text-lg sm:text-xl tracking-widest text-[#171717] leading-none uppercase">
            Smart Electronic
          </h1>
          <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-gray-500 font-medium mt-1 uppercase">
            Technology Shop
          </span>
        </div>

        {/* Utilities - Right */}
        <div className="flex items-center space-x-3 sm:space-x-4" id="header-utilities">
          {/* Search Trigger */}
          <div className="relative" id="search-container">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full flex items-center px-3 py-1 shadow-sm w-48 sm:w-64 z-50">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs bg-transparent focus:outline-none text-gray-800"
                  autoFocus
                />
                <button type="submit" className="text-gray-500 hover:text-black">
                  <Search size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-400 hover:text-gray-600 ml-1"
                >
                  <X size={14} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-700 p-2 hover:text-black rounded-full hover:bg-gray-50 transition-colors"
                aria-label="Search"
                id="search-trigger-btn"
              >
                <Search size={20} />
              </button>
            )}
          </div>

          {/* Favorites Heart */}
          <button
            onClick={onFavoritesClick}
            className="text-gray-700 p-2 hover:text-black rounded-full hover:bg-gray-50 transition-colors relative"
            aria-label="View Wishlist"
            id="wishlist-trigger-btn"
          >
            <Heart size={20} className={favoritesCount > 0 ? "fill-red-500 text-red-500" : ""} />
            {favoritesCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white font-semibold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Shopping Bag */}
          <button
            onClick={onCartClick}
            className="text-gray-700 p-2 hover:text-black rounded-full hover:bg-gray-50 transition-colors relative"
            aria-label="Open Cart"
            id="cart-trigger-btn"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-black text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3 shadow-md animate-fade-in" id="mobile-menu-dropdown">
          <button
            onClick={() => {
              setTab('home');
              setIsMobileMenuOpen(false);
            }}
            className={`block w-full text-left py-2 px-3 rounded-md text-sm font-medium ${
              currentTab === 'home' ? 'bg-gray-50 text-black font-semibold' : 'text-gray-600'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              setTab('shop');
              setIsMobileMenuOpen(false);
            }}
            className={`block w-full text-left py-2 px-3 rounded-md text-sm font-medium ${
              currentTab === 'shop' ? 'bg-gray-50 text-black font-semibold' : 'text-gray-600'
            }`}
          >
            Shop Now
          </button>
          <button
            onClick={() => {
              setTab('contact');
              setIsMobileMenuOpen(false);
            }}
            className={`block w-full text-left py-2 px-3 rounded-md text-sm font-medium ${
              currentTab === 'contact' ? 'bg-gray-50 text-black font-semibold' : 'text-gray-600'
            }`}
          >
            Contact
          </button>
        </div>
      )}
    </header>
  );
}
