/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, Tag, Gift, Percent } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
  appliedPromo: { code: string; discountPercent: number; freeShipping: boolean } | null;
  onApplyPromo: (code: string) => boolean;
  onRemovePromo: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.salePrice * item.quantity, 0);
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discountPercent) / 100 : 0;
  
  // Free shipping over 100 or promo code
  const isFreeShipping = subtotal >= 100 || (appliedPromo?.freeShipping ?? false);
  const shipping = subtotal === 0 ? 0 : (isFreeShipping ? 0 : 15.00);
  const total = subtotal - discountAmount + shipping;

  const handleApplyPromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    
    setPromoError('');
    const success = onApplyPromo(promoCode.toUpperCase().trim());
    
    if (success) {
      setPromoCode('');
    } else {
      setPromoError('Invalid promo code. Try "SMART20" or "FREESHIP".');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="shopping-cart-drawer">
          <div className="absolute inset-0 overflow-hidden">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            />

            {/* Slide over pane */}
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
                      <h2 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                        Shopping Cart
                      </h2>
                      <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-black p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Body: Scrollable list */}
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    {cartItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center py-12" id="empty-cart-state">
                        <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-full text-gray-400 mb-4">
                          <Minus size={24} />
                        </div>
                        <h3 className="text-sm font-semibold text-[#171717]">Your cart is empty</h3>
                        <p className="text-xs text-gray-400 mt-1.5 max-w-xs">
                          Looks like you haven't added anything yet. Discover our latest gadgets and gear!
                        </p>
                        <button
                          onClick={onClose}
                          className="mt-6 border border-black bg-black text-white hover:bg-gray-800 text-[10px] font-bold tracking-widest uppercase px-6 py-2.5 transition-colors"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {cartItems.map((item, index) => (
                          <div key={`${item.product.id}-${index}`} className="flex items-start border-b border-gray-50 pb-5">
                            {/* Product Image on grey bg */}
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-[#f4f4f6] flex items-center justify-center p-2">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="h-full w-full object-contain"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            {/* Details on the right */}
                            <div className="ml-4 flex flex-1 flex-col text-left">
                              <div className="flex justify-between text-xs font-semibold text-gray-900">
                                <h3 className="hover:text-gray-600 cursor-pointer line-clamp-1 pr-4">{item.product.name}</h3>
                                <p className="ml-4">${(item.product.salePrice * item.quantity).toFixed(2)}</p>
                              </div>
                              
                              {/* Selected options details */}
                              {(item.selectedColor || item.selectedStorage) && (
                                <p className="mt-1 text-[10px] text-gray-400 font-medium">
                                  {item.selectedColor && `Color: ${item.selectedColor}`}
                                  {item.selectedColor && item.selectedStorage && ' | '}
                                  {item.selectedStorage && `Storage: ${item.selectedStorage}`}
                                </p>
                              )}

                              <div className="flex flex-1 items-end justify-between text-[11px] mt-3">
                                {/* Quantity Toggles */}
                                <div className="flex items-center border border-gray-200 rounded-sm">
                                  <button
                                    onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                                    className="p-1 hover:text-black text-gray-400 font-bold px-2 cursor-pointer"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus size={10} />
                                  </button>
                                  <span className="px-2 font-semibold text-[#171717]">{item.quantity}</span>
                                  <button
                                    onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                                    className="p-1 hover:text-black text-gray-400 font-bold px-2 cursor-pointer"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus size={10} />
                                  </button>
                                </div>

                                {/* Trash / Delete */}
                                <button
                                  onClick={() => onRemoveItem(index)}
                                  className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors flex items-center space-x-1 cursor-pointer"
                                  aria-label="Remove item"
                                >
                                  <Trash2 size={13} />
                                  <span className="text-[10px]">Delete</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer details & totals */}
                  {cartItems.length > 0 && (
                    <div className="border-t border-gray-100 bg-[#fafafa] px-4 py-6 sm:px-6">
                      {/* Promo Code Input */}
                      <div className="mb-4">
                        {appliedPromo ? (
                          <div className="flex items-center justify-between bg-green-50 border border-green-100 text-green-700 text-xs px-3 py-2 rounded-xs font-medium">
                            <div className="flex items-center space-x-1.5">
                              <Tag size={13} />
                              <span>
                                Code <strong>{appliedPromo.code}</strong> Applied ({appliedPromo.discountPercent}% Off
                                {appliedPromo.freeShipping && ', Free Shipping'})
                              </span>
                            </div>
                            <button
                              onClick={onRemovePromo}
                              className="text-green-800 hover:text-red-600 hover:scale-110 font-bold text-sm cursor-pointer ml-2 focus:outline-none"
                              title="Remove promo"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <form onSubmit={handleApplyPromoSubmit} className="flex space-x-2">
                            <input
                              type="text"
                              placeholder="PROMO CODE (e.g. SMART20)"
                              value={promoCode}
                              onChange={(e) => {
                                setPromoCode(e.target.value);
                                setPromoError('');
                              }}
                              className="flex-grow border border-gray-200 text-xs px-3 py-2 uppercase tracking-wide focus:outline-none focus:border-black rounded-xs bg-white"
                            />
                            <button
                              type="submit"
                              className="bg-[#171717] hover:bg-black text-white text-[10px] font-bold tracking-wider px-4 py-2 uppercase transition-all rounded-xs cursor-pointer"
                            >
                              Apply
                            </button>
                          </form>
                        )}
                        {promoError && (
                          <p className="text-[10px] text-red-500 font-medium mt-1.5 leading-none">{promoError}</p>
                        )}
                        {!appliedPromo && (
                          <p className="text-[10px] text-gray-400 mt-1.5 leading-none">
                            Tip: Try <span className="font-semibold text-gray-500">SMART20</span> for 20% off, or <span className="font-semibold text-gray-500">FREESHIP</span> for free shipping.
                          </p>
                        )}
                      </div>

                      {/* Calculations Lines */}
                      <div className="space-y-2 border-b border-gray-200 pb-4 text-xs text-gray-600">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                        </div>
                        
                        {appliedPromo && (
                          <div className="flex justify-between text-green-600 font-medium">
                            <span className="flex items-center space-x-1">
                              <Percent size={12} />
                              <span>Discount ({appliedPromo.discountPercent}%)</span>
                            </span>
                            <span>-${discountAmount.toFixed(2)}</span>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <span>Shipping</span>
                          {shipping === 0 ? (
                            <span className="text-green-600 font-semibold uppercase tracking-wider text-[10px]">Free</span>
                          ) : (
                            <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
                          )}
                        </div>

                        {shipping > 0 && (
                          <p className="text-[10px] text-gray-400 text-right leading-none">
                            Add ${(100 - subtotal).toFixed(2)} more to unlock free shipping!
                          </p>
                        )}
                      </div>

                      {/* Grand Total */}
                      <div className="flex justify-between text-sm font-bold text-gray-900 pt-4">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-6 space-y-3">
                        <button
                          onClick={onCheckout}
                          className="w-full bg-black hover:bg-gray-800 text-white font-semibold text-xs tracking-widest uppercase py-3.5 flex items-center justify-center transition-all active:scale-95"
                        >
                          Proceed to Checkout
                        </button>
                        <button
                          onClick={onClose}
                          className="w-full border border-gray-200 bg-white hover:border-gray-400 text-[#171717] font-semibold text-[10px] tracking-widest uppercase py-2.5 transition-all"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
