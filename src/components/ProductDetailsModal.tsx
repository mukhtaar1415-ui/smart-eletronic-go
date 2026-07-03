/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Heart, Star, Check, Sparkles, MessageSquare } from 'lucide-react';
import { Product, Review } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string, storage?: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onAddReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
}

export default function ProductDetailsModal({
  product,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
  onAddReview,
}: ProductDetailsModalProps) {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedStorage, setSelectedStorage] = useState(product.storages?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState<'specs' | 'features' | 'reviews'>('specs');

  // Review Form State
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    onAddReview(product.id, {
      author: reviewAuthor,
      rating: reviewRating,
      comment: reviewComment,
    });

    setReviewAuthor('');
    setReviewRating(5);
    setReviewComment('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity, selectedColor || undefined, selectedStorage || undefined);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto" id="product-details-modal">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative transform overflow-hidden bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-4xl rounded-sm"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-black p-1.5 hover:bg-gray-100 rounded-full transition-colors z-30 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Column: Image with neutral-light-gray background */}
              <div className="bg-[#f4f4f6] p-8 sm:p-12 flex flex-col justify-center items-center relative aspect-square md:aspect-auto md:min-h-[500px]">
                {/* Sale Tag */}
                <span className="absolute top-4 left-4 bg-black text-white text-xs font-semibold tracking-widest uppercase px-3 py-1 z-10">
                  Sale
                </span>
                
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain max-h-[85%] max-w-[85%] select-none drop-shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right Column: Information details */}
              <div className="p-6 sm:p-8 flex flex-col max-h-[600px] overflow-y-auto" id="modal-details-pane">
                {/* Category & Badge */}
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                    {product.category}
                  </span>
                  {product.stock <= 5 && (
                    <span className="text-[9px] bg-red-50 text-red-600 font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                      Only {product.stock} left in stock
                    </span>
                  )}
                </div>

                {/* Name */}
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#171717] mt-2 leading-snug">
                  {product.name}
                </h2>

                {/* Rating & Review quick look */}
                <div className="flex items-center space-x-2 mt-3 pb-4 border-b border-gray-100">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className={i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-gray-200'}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    {product.rating}
                  </span>
                  <span className="text-xs text-gray-400">|</span>
                  <span className="text-xs text-gray-500 font-medium">
                    {product.reviews.length} Customer Reviews
                  </span>
                </div>

                {/* Price Display */}
                <div className="mt-4 flex items-baseline space-x-3">
                  <span className="text-2xl font-bold text-[#171717]">
                    ${product.salePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-sm text-gray-400 line-through font-medium">
                    ${product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-xs font-semibold text-green-600 uppercase bg-green-50 px-2 py-1">
                    Save ${(product.originalPrice - product.salePrice).toFixed(2)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-500 mt-4 leading-relaxed font-normal">
                  {product.description}
                </p>

                {/* Color Selection Option */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-6">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                      Color: <span className="font-normal text-gray-500">{selectedColor}</span>
                    </label>
                    <div className="flex space-x-2.5 mt-2">
                      {product.colors.map((color) => {
                        // Map color names to approximate hex color styles for visual circles
                        let hexBg = '#a1a1aa';
                        if (color.toLowerCase().includes('black')) hexBg = '#171717';
                        else if (color.toLowerCase().includes('white')) hexBg = '#f4f4f5';
                        else if (color.toLowerCase().includes('silver') || color.toLowerCase().includes('titanium')) hexBg = '#d4d4d8';
                        else if (color.toLowerCase().includes('midnight')) hexBg = '#1e293b';
                        else if (color.toLowerCase().includes('blue')) hexBg = '#1d4ed8';
                        else if (color.toLowerCase().includes('green')) hexBg = '#15803d';
                        else if (color.toLowerCase().includes('cream')) hexBg = '#fef3c7';
                        else if (color.toLowerCase().includes('starlight')) hexBg = '#fafaf9';
                        else if (color.toLowerCase().includes('gold')) hexBg = '#fbbf24';

                        return (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            style={{ backgroundColor: hexBg }}
                            className={`w-7 h-7 rounded-full border cursor-pointer relative flex items-center justify-center transition-transform hover:scale-110 ${
                              selectedColor === color
                                ? 'border-black ring-2 ring-black/20 ring-offset-2'
                                : 'border-gray-200'
                            }`}
                            title={color}
                          >
                            {selectedColor === color && (
                              <Check
                                size={12}
                                className={color.toLowerCase().includes('white') || color.toLowerCase().includes('cream') || color.toLowerCase().includes('starlight') ? 'text-black' : 'text-white'}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Storage Options */}
                {product.storages && product.storages.length > 0 && (
                  <div className="mt-5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                      Storage capacity
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.storages.map((storage) => (
                        <button
                          key={storage}
                          onClick={() => setSelectedStorage(storage)}
                          className={`px-3 py-1.5 text-xs font-semibold tracking-wide border cursor-pointer rounded-xs transition-all ${
                            selectedStorage === storage
                              ? 'border-black bg-black text-white'
                              : 'border-gray-200 text-gray-600 hover:border-gray-400 bg-white'
                          }`}
                        >
                          {storage}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-t border-gray-100 pt-6">
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between border border-gray-200 h-11 w-32 px-3 rounded-xs bg-white">
                    <button
                      onClick={decrementQty}
                      className="text-gray-500 hover:text-black font-semibold text-lg px-2"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold text-[#171717]">{quantity}</span>
                    <button
                      onClick={incrementQty}
                      className="text-gray-500 hover:text-black font-semibold text-lg px-2"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCartClick}
                    className="flex-grow bg-black hover:bg-gray-800 text-white font-semibold text-xs tracking-widest uppercase h-11 px-6 flex items-center justify-center space-x-2 transition-all active:scale-95"
                  >
                    <ShoppingBag size={15} />
                    <span>Add To Cart</span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleFavorite(product)}
                    className={`h-11 px-4 border flex items-center justify-center transition-all cursor-pointer active:scale-95 rounded-xs ${
                      isFavorite
                        ? 'border-red-200 bg-red-50 text-red-600'
                        : 'border-gray-200 hover:border-gray-400 text-[#171717]'
                    }`}
                    title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart size={16} className={isFavorite ? 'fill-red-500' : ''} />
                  </button>
                </div>

                {/* Additional Info Sections Tab bar */}
                <div className="mt-8 border-t border-gray-100 pt-6">
                  <div className="flex border-b border-gray-100 space-x-6 text-xs uppercase tracking-wider font-semibold mb-4">
                    <button
                      onClick={() => setActiveSection('specs')}
                      className={`pb-2.5 transition-colors ${
                        activeSection === 'specs' ? 'text-black border-b border-black font-bold' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      Specs
                    </button>
                    <button
                      onClick={() => setActiveSection('features')}
                      className={`pb-2.5 transition-colors ${
                        activeSection === 'features' ? 'text-black border-b border-black font-bold' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      Highlights
                    </button>
                    <button
                      onClick={() => setActiveSection('reviews')}
                      className={`pb-2.5 transition-colors flex items-center space-x-1 ${
                        activeSection === 'reviews' ? 'text-black border-b border-black font-bold' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <span>Reviews ({product.reviews.length})</span>
                    </button>
                  </div>

                  {/* Tab Contents: Specs */}
                  {activeSection === 'specs' && (
                    <div className="text-xs space-y-2 text-gray-600 animate-fade-in">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex border-b border-gray-50 pb-1.5 justify-between">
                          <span className="font-medium text-[#171717]">{key}</span>
                          <span className="text-right text-gray-500">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab Contents: Features */}
                  {activeSection === 'features' && (
                    <ul className="text-xs space-y-2 text-gray-600 animate-fade-in list-disc list-inside">
                      {product.features.map((feature, i) => (
                        <li key={i} className="leading-relaxed">
                          <span className="font-normal text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tab Contents: Reviews List & Form */}
                  {activeSection === 'reviews' && (
                    <div className="space-y-6 text-left animate-fade-in">
                      {/* Reviews Lists */}
                      <div className="max-h-48 overflow-y-auto space-y-4 pr-1">
                        {product.reviews.length === 0 ? (
                          <p className="text-xs text-gray-400 italic">No reviews yet. Be the first to review!</p>
                        ) : (
                          product.reviews.map((review) => (
                            <div key={review.id} className="border-b border-gray-50 pb-3">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="font-semibold text-gray-800">{review.author}</span>
                                <span className="text-gray-400">{review.date}</span>
                              </div>
                              <div className="flex text-amber-400 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={10}
                                    className={i < review.rating ? 'fill-amber-400' : 'text-gray-200'}
                                  />
                                ))}
                              </div>
                              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{review.comment}</p>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Add Review Form */}
                      <div className="border-t border-gray-100 pt-4 mt-4">
                        <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                          <MessageSquare size={13} />
                          <span>Write a Review</span>
                        </h4>

                        {reviewSuccess ? (
                          <div className="bg-green-50 text-green-700 text-xs p-3 rounded-xs font-medium flex items-center space-x-1.5 animate-fade-in">
                            <Sparkles size={14} />
                            <span>Thank you! Your review has been submitted successfully.</span>
                          </div>
                        ) : (
                          <form onSubmit={handleReviewSubmit} className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <input
                                  type="text"
                                  placeholder="Your Name"
                                  value={reviewAuthor}
                                  onChange={(e) => setReviewAuthor(e.target.value)}
                                  required
                                  className="w-full text-xs border border-gray-200 p-2 focus:outline-none focus:border-black rounded-xs bg-white"
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-400">Rating:</span>
                                <div className="flex space-x-0.5">
                                  {[1, 2, 3, 4, 5].map((stars) => (
                                    <button
                                      key={stars}
                                      type="button"
                                      onClick={() => setReviewRating(stars)}
                                      className="text-amber-400 hover:scale-110 transition-transform focus:outline-none"
                                    >
                                      <Star
                                        size={14}
                                        className={stars <= reviewRating ? 'fill-amber-400' : 'text-gray-200'}
                                      />
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div>
                              <textarea
                                placeholder="Share your experience with this product..."
                                value={reviewComment}
                                onChange={(e) => setReviewComment(e.target.value)}
                                required
                                rows={2}
                                className="w-full text-xs border border-gray-200 p-2 focus:outline-none focus:border-black rounded-xs bg-white resize-none"
                              />
                            </div>
                            <button
                              type="submit"
                              className="bg-black hover:bg-gray-800 text-white font-semibold text-[10px] tracking-wider uppercase px-4 py-2 transition-all"
                            >
                              Submit Review
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
