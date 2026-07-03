/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Trash2, ArrowRight, Star, Headphones, Laptop, Smartphone, Watch, ChevronRight, Check, X } from 'lucide-react';

// Types and Components
import { Product, CartItem, CustomerDetails, Review } from './types';
import { PRODUCTS } from './data/products';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ShopView from './components/ShopView';
import ContactView from './components/ContactView';

export default function App() {
  // Navigation State
  const [currentTab, setTab] = useState<'home' | 'shop' | 'contact'>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Products List State (allows adding reviews locally)
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  // Cart & Favorites State (with LocalStorage persistence)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('smart_electronic_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const saved = localStorage.getItem('smart_electronic_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Dialogs / Drawers States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Promo Code State
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number; freeShipping: boolean } | null>(() => {
    const saved = localStorage.getItem('smart_electronic_promo');
    return saved ? JSON.parse(saved) : null;
  });

  // Sync Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('smart_electronic_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync Favorites to LocalStorage
  useEffect(() => {
    localStorage.setItem('smart_electronic_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Sync Promo to LocalStorage
  useEffect(() => {
    if (appliedPromo) {
      localStorage.setItem('smart_electronic_promo', JSON.stringify(appliedPromo));
    } else {
      localStorage.removeItem('smart_electronic_promo');
    }
  }, [appliedPromo]);

  // Handle Search submit from Header
  useEffect(() => {
    if (searchQuery.trim()) {
      setTab('shop');
    }
  }, [searchQuery]);

  // --- CART OPERATIONS ---
  const handleAddToCart = (product: Product, quantity = 1, color?: string, storage?: string) => {
    setCart((prev) => {
      // Check if exact item already exists (same id, color, and storage)
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedStorage === storage
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }

      return [...prev, { product, quantity, selectedColor: color, selectedStorage: storage }];
    });
    
    // Auto-open cart drawer for a highly responsive feel
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty < 1) {
      handleRemoveCartItem(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // --- FAVORITES OPERATIONS ---
  const handleToggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleMoveFavoriteToCart = (product: Product) => {
    handleAddToCart(product, 1, product.colors?.[0], product.storages?.[0]);
    // Remove from favorites once moved
    setFavorites((prev) => prev.filter((item) => item.id !== product.id));
  };

  // --- PROMO CODE VALIDATION ---
  const handleApplyPromo = (code: string) => {
    if (code === 'SMART20') {
      setAppliedPromo({ code: 'SMART20', discountPercent: 20, freeShipping: false });
      return true;
    }
    if (code === 'FREESHIP') {
      setAppliedPromo({ code: 'FREESHIP', discountPercent: 0, freeShipping: true });
      return true;
    }
    return false;
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  // --- REVIEW LOGGING (LOCALLY) ---
  const handleAddReview = (productId: string, newReviewData: Omit<Review, 'id' | 'date'>) => {
    const formattedReview: Review = {
      id: `r-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...newReviewData,
    };

    // Update product list state
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === productId) {
          const updatedReviews = [formattedReview, ...prod.reviews];
          // Recalculate average rating
          const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
          const newAvgRating = parseFloat((totalRating / updatedReviews.length).toFixed(1));

          return {
            ...prod,
            reviews: updatedReviews,
            rating: newAvgRating,
          };
        }
        return prod;
      })
    );

    // Keep active product updated in modal
    setActiveProduct((prev) => {
      if (prev && prev.id === productId) {
        const updatedReviews = [formattedReview, ...prev.reviews];
        const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
        const newAvgRating = parseFloat((totalRating / updatedReviews.length).toFixed(1));

        return {
          ...prev,
          reviews: updatedReviews,
          rating: newAvgRating,
        };
      }
      return prev;
    });
  };

  // --- CHECKOUT SUBMISSION ---
  const handleOrderComplete = (customerDetails: CustomerDetails) => {
    // Clear cart and active states
    setCart([]);
    setAppliedPromo(null);
    localStorage.removeItem('smart_electronic_cart');
    localStorage.removeItem('smart_electronic_promo');
  };

  // Group Products for Home Page
  const bestSellers = products.filter((p) => p.isBestSeller);
  const featuredProducts = products.filter((p) => p.isFeatured);

  const favoriteIds = favorites.map((f) => f.id);

  // Navigate to category from Hero/Category block
  const handleCategoryNav = (catId: string) => {
    setSelectedCategoryFilter(catId);
    setTab('shop');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-black selection:text-white" id="root-app-container">
      {/* Header */}
      <Header
        currentTab={currentTab}
        setTab={(tab) => {
          setTab(tab);
          if (tab !== 'shop') {
            setSelectedCategoryFilter('all');
            setSearchQuery('');
          }
        }}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favorites.length}
        onFavoritesClick={() => setIsFavoritesOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-16"
            >
              {/* Hero Section */}
              <Hero
                onShopClick={() => setTab('shop')}
                onCategoryClick={(cat) => handleCategoryNav(cat)}
              />

              {/* Best Seller Grid Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="home-best-sellers">
                <div className="text-center mb-8">
                  <h2 className="font-display font-extrabold text-2xl tracking-widest text-[#171717] uppercase">
                    Best Seller
                  </h2>
                  <div className="w-12 h-0.5 bg-black mx-auto mt-3"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 sm:gap-x-8">
                  {bestSellers.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={(p) => handleAddToCart(p, 1, p.colors?.[0], p.storages?.[0])}
                      onQuickView={setActiveProduct}
                      isFavorite={favoriteIds.includes(product.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              </section>

              {/* Featured Product Grid Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="home-featured-products">
                <div className="text-center mb-8">
                  <h2 className="font-display font-extrabold text-2xl tracking-widest text-[#171717] uppercase">
                    Featured Product
                  </h2>
                  <div className="w-12 h-0.5 bg-black mx-auto mt-3"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 sm:gap-x-8">
                  {featuredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={(p) => handleAddToCart(p, 1, p.colors?.[0], p.storages?.[0])}
                      onQuickView={setActiveProduct}
                      isFavorite={favoriteIds.includes(product.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              </section>

              {/* Shop By Category Bento Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" id="home-shop-by-category">
                <div className="text-center mb-10">
                  <h2 className="font-display font-extrabold text-xl tracking-widest text-[#171717] uppercase">
                    Shop By Category
                  </h2>
                  <div className="w-12 h-0.5 bg-black mx-auto mt-3"></div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" id="categories-grid-container">
                  {/* Category: Smartphones */}
                  <div
                    onClick={() => handleCategoryNav('smartphones')}
                    className="group relative h-48 bg-[#f4f4f6] flex flex-col justify-between p-6 cursor-pointer overflow-hidden rounded-xs transition-all duration-300"
                  >
                    <div className="absolute right-[-10px] bottom-[-10px] w-32 h-32 opacity-20 group-hover:scale-110 group-hover:opacity-30 transition-all duration-500 text-black">
                      <Smartphone className="w-full h-full" strokeWidth={1} />
                    </div>
                    <div className="z-10 text-left">
                      <h3 className="font-display font-bold text-sm sm:text-base tracking-wider uppercase text-[#171717]">
                        Smartphones
                      </h3>
                      <p className="text-[10px] text-gray-500 font-medium tracking-tight mt-1">Latest flagships</p>
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#171717] z-10 group-hover:translate-x-1.5 transition-transform duration-300">
                      <span>Explore</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>

                  {/* Category: Laptops */}
                  <div
                    onClick={() => handleCategoryNav('laptops')}
                    className="group relative h-48 bg-[#f4f4f6] flex flex-col justify-between p-6 cursor-pointer overflow-hidden rounded-xs transition-all duration-300"
                  >
                    <div className="absolute right-[-10px] bottom-[-10px] w-32 h-32 opacity-20 group-hover:scale-110 group-hover:opacity-30 transition-all duration-500 text-black">
                      <Laptop className="w-full h-full" strokeWidth={1} />
                    </div>
                    <div className="z-10 text-left">
                      <h3 className="font-display font-bold text-sm sm:text-base tracking-wider uppercase text-[#171717]">
                        Laptops
                      </h3>
                      <p className="text-[10px] text-gray-500 font-medium tracking-tight mt-1">Ultrabooks & gaming</p>
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#171717] z-10 group-hover:translate-x-1.5 transition-transform duration-300">
                      <span>Explore</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>

                  {/* Category: Audio */}
                  <div
                    onClick={() => handleCategoryNav('audio')}
                    className="group relative h-48 bg-[#f4f4f6] flex flex-col justify-between p-6 cursor-pointer overflow-hidden rounded-xs transition-all duration-300"
                  >
                    <div className="absolute right-[-10px] bottom-[-10px] w-32 h-32 opacity-20 group-hover:scale-110 group-hover:opacity-30 transition-all duration-500 text-black">
                      <Headphones className="w-full h-full" strokeWidth={1} />
                    </div>
                    <div className="z-10 text-left">
                      <h3 className="font-display font-bold text-sm sm:text-base tracking-wider uppercase text-[#171717]">
                        Audio
                      </h3>
                      <p className="text-[10px] text-gray-500 font-medium tracking-tight mt-1">Earphones & speakers</p>
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#171717] z-10 group-hover:translate-x-1.5 transition-transform duration-300">
                      <span>Explore</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>

                  {/* Category: Wearables */}
                  <div
                    onClick={() => handleCategoryNav('wearables')}
                    className="group relative h-48 bg-[#f4f4f6] flex flex-col justify-between p-6 cursor-pointer overflow-hidden rounded-xs transition-all duration-300"
                  >
                    <div className="absolute right-[-10px] bottom-[-10px] w-32 h-32 opacity-20 group-hover:scale-110 group-hover:opacity-30 transition-all duration-500 text-black">
                      <Watch className="w-full h-full" strokeWidth={1} />
                    </div>
                    <div className="z-10 text-left">
                      <h3 className="font-display font-bold text-sm sm:text-base tracking-wider uppercase text-[#171717]">
                        Wearables
                      </h3>
                      <p className="text-[10px] text-gray-500 font-medium tracking-tight mt-1">Fitness & smart watches</p>
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#171717] z-10 group-hover:translate-x-1.5 transition-transform duration-300">
                      <span>Explore</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {currentTab === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ShopView
                onAddToCart={(p) => handleAddToCart(p, 1, p.colors?.[0], p.storages?.[0])}
                onQuickView={setActiveProduct}
                favoriteProductIds={favoriteIds}
                onToggleFavorite={handleToggleFavorite}
                initialCategoryFilter={selectedCategoryFilter}
              />
            </motion.div>
          )}

          {currentTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ContactView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[#171717] text-white py-12 border-t border-gray-900" id="global-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          {/* Logo / Tagline */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-base tracking-widest uppercase">
              Smart Electronic
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
              Premium consumer electronics store featuring selected premium gadgets with unmatched quality and warranty.
            </p>
          </div>

          {/* Links: Catalog */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-4">Shop Pages</h4>
            <ul className="text-xs text-gray-400 space-y-2">
              <li>
                <button onClick={() => { setTab('shop'); setSelectedCategoryFilter('smartphones'); }} className="hover:text-white transition-colors cursor-pointer">
                  Smartphones
                </button>
              </li>
              <li>
                <button onClick={() => { setTab('shop'); setSelectedCategoryFilter('laptops'); }} className="hover:text-white transition-colors cursor-pointer">
                  Laptops
                </button>
              </li>
              <li>
                <button onClick={() => { setTab('shop'); setSelectedCategoryFilter('audio'); }} className="hover:text-white transition-colors cursor-pointer">
                  Audio & Sound
                </button>
              </li>
              <li>
                <button onClick={() => { setTab('shop'); setSelectedCategoryFilter('wearables'); }} className="hover:text-white transition-colors cursor-pointer">
                  Wearables
                </button>
              </li>
            </ul>
          </div>

          {/* Links: Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-4">Customer Care</h4>
            <ul className="text-xs text-gray-400 space-y-2">
              <li>
                <button onClick={() => setTab('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Support
                </button>
              </li>
              <li>
                <span className="text-gray-500">Shipping & Returns</span>
              </li>
              <li>
                <span className="text-gray-500">Privacy Policy</span>
              </li>
              <li>
                <span className="text-gray-500">Terms of Service</span>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Newsletter</h4>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Subscribe to get notified about sales, new releases, and exclusive discount codes!
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-neutral-800 text-xs text-white border border-neutral-700 px-3 py-2 w-full focus:outline-none focus:border-white rounded-l-xs"
              />
              <button className="bg-white hover:bg-neutral-200 text-black text-[10px] font-bold tracking-widest uppercase px-4 rounded-r-xs transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-neutral-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2026 Smart Electronic Shop. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <span className="hover:text-gray-400 transition-colors cursor-pointer">Security</span>
            <span>•</span>
            <span className="hover:text-gray-400 transition-colors cursor-pointer">Privacy</span>
            <span>•</span>
            <span className="hover:text-gray-400 transition-colors cursor-pointer">Cookies</span>
          </div>
        </div>
      </footer>

      {/* --- DRAWERS & DIALOGS --- */}

      {/* Product Details Modal / Quick View */}
      <ProductDetailsModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
        isFavorite={activeProduct ? favoriteIds.includes(activeProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onAddReview={handleAddReview}
      />

      {/* Shopping Cart Slider Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={handleRemovePromo}
      />

      {/* Wishlist Favorites Drawer */}
      <AnimatePresence>
        {isFavoritesOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden" id="favorites-drawer">
            <div className="absolute inset-0 overflow-hidden">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFavoritesOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              />

              {/* Drawer pane */}
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'tween', duration: 0.4 }}
                  className="pointer-events-auto w-screen max-w-md"
                >
                  <div className="flex h-full flex-col bg-white shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-5 sm:px-6">
                      <div className="flex items-center space-x-2">
                        <Heart size={16} className="fill-red-500 text-red-500" />
                        <h2 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                          My Wishlist
                        </h2>
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {favorites.length}
                        </span>
                      </div>
                      <button
                        onClick={() => setIsFavoritesOpen(false)}
                        className="text-gray-400 hover:text-black p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* Body List */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      {favorites.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-12">
                          <Heart size={32} className="text-gray-300 mb-4" />
                          <h3 className="text-sm font-semibold text-[#171717]">Your wishlist is empty</h3>
                          <p className="text-xs text-gray-400 mt-1.5 max-w-xs">
                            Keep track of products you love. Add items to your wishlist and they will show up here.
                          </p>
                          <button
                            onClick={() => {
                              setIsFavoritesOpen(false);
                              setTab('shop');
                            }}
                            className="mt-6 border border-black bg-black text-white hover:bg-gray-800 text-[10px] font-bold tracking-widest uppercase px-6 py-2.5 transition-colors"
                          >
                            Explore Products
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {favorites.map((item) => (
                            <div key={item.id} className="flex items-start border-b border-gray-50 pb-5">
                              {/* Product Image */}
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-[#f4f4f6] flex items-center justify-center p-2">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-contain"
                                  referrerPolicy="no-referrer"
                                />
                              </div>

                              {/* Details */}
                              <div className="ml-4 flex flex-1 flex-col text-left">
                                <div className="flex justify-between text-xs font-semibold text-gray-900">
                                  <h3
                                    onClick={() => {
                                      setIsFavoritesOpen(false);
                                      setActiveProduct(item);
                                    }}
                                    className="hover:text-gray-600 cursor-pointer line-clamp-1 pr-2"
                                  >
                                    {item.name}
                                  </h3>
                                  <p className="ml-2">${item.salePrice.toFixed(2)}</p>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-0.5 line-through">
                                  ${item.originalPrice.toFixed(2)}
                                </p>

                                <div className="flex flex-1 items-end justify-between mt-3 text-[10px]">
                                  {/* Add to Cart */}
                                  <button
                                    onClick={() => handleMoveFavoriteToCart(item)}
                                    className="border border-black bg-black hover:bg-gray-800 text-white font-semibold tracking-wide uppercase px-3 py-1.5 flex items-center space-x-1"
                                  >
                                    <ShoppingBag size={11} />
                                    <span>Move to Cart</span>
                                  </button>

                                  {/* Delete */}
                                  <button
                                    onClick={() => handleToggleFavorite(item)}
                                    className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors flex items-center space-x-1 cursor-pointer"
                                  >
                                    <Trash2 size={12} />
                                    <span>Remove</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border-t border-gray-100 bg-[#fafafa] px-4 py-5 sm:px-6">
                      <button
                        onClick={() => setIsFavoritesOpen(false)}
                        className="w-full border border-gray-200 bg-white hover:border-gray-400 text-[#171717] font-semibold text-[10px] tracking-widest uppercase py-2.5 transition-all"
                      >
                        Close Wishlist
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Step Checkout Modal Flow */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        appliedPromo={appliedPromo}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}
