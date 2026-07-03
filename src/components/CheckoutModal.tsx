/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, CreditCard, ShoppingBag, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { CartItem, CustomerDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedPromo: { code: string; discountPercent: number; freeShipping: boolean } | null;
  onOrderComplete: (customerDetails: CustomerDetails) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  appliedPromo,
  onOrderComplete,
}: CheckoutModalProps) {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State - Shipping
  const [shippingName, setShippingName] = useState('');
  const [shippingEmail, setShippingEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingZip, setShippingZip] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');

  // Form State - Payment
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [paymentError, setPaymentError] = useState('');

  // Snapshot of order to display on completion page after parent state is cleared
  const [orderSnapshot, setOrderSnapshot] = useState<{
    cartItems: CartItem[];
    subtotal: number;
    discountAmount: number;
    shipping: number;
    total: number;
    email: string;
  } | null>(null);

  // Reset local states when modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setShippingName('');
      setShippingEmail('');
      setShippingAddress('');
      setShippingCity('');
      setShippingZip('');
      setShippingPhone('');
      setCardName('');
      setCardNumber('');
      setCardExpiry('');
      setCardCvv('');
      setPaymentError('');
      setOrderSnapshot(null);
    }
  }, [isOpen]);

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.salePrice * item.quantity, 0);
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discountPercent) / 100 : 0;
  const isFreeShipping = subtotal >= 100 || (appliedPromo?.freeShipping ?? false);
  const shipping = isFreeShipping ? 0 : 15.00;
  const total = subtotal - discountAmount + shipping;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError('');

    // Mock validation
    const cardClean = cardNumber.replace(/\s+/g, '');
    if (cardClean.length < 16) {
      setPaymentError('Please enter a valid 16-digit credit card number.');
      return;
    }
    if (!cardExpiry.includes('/')) {
      setPaymentError('Please enter card expiration in MM/YY format.');
      return;
    }
    if (cardCvv.length < 3) {
      setPaymentError('Please enter a valid 3-digit CVV security code.');
      return;
    }

    // Success! Capture order details in local state before the parent clears the cart
    setOrderSnapshot({
      cartItems: [...cartItems],
      subtotal,
      discountAmount,
      shipping,
      total,
      email: shippingEmail,
    });

    // Prepare customer details
    const customerDetails: CustomerDetails = {
      name: shippingName,
      email: shippingEmail,
      address: shippingAddress,
      city: shippingCity,
      zip: shippingZip,
      phone: shippingPhone,
    };

    onOrderComplete(customerDetails);
    setStep(3);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format card number as 1111 2222 3333 4444
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 16) val = val.substring(0, 16);
    const matches = val.match(/.{1,4}/g);
    setCardNumber(matches ? matches.join(' ') : val);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.substring(0, 4);
    if (val.length > 2) {
      val = val.substring(0, 2) + '/' + val.substring(2);
    }
    setCardExpiry(val);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 4) setCardCvv(val);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto" id="checkout-modal">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={step === 3 ? undefined : onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4 }}
            className="relative transform overflow-hidden bg-white shadow-2xl transition-all w-full max-w-2xl rounded-sm p-6 sm:p-8 text-left"
          >
            {/* Header / Step Indicator */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                {step === 2 && (
                  <button
                    onClick={() => setStep(1)}
                    className="text-gray-500 hover:text-black mr-2 focus:outline-none"
                    title="Back to shipping"
                  >
                    <ArrowLeft size={16} />
                  </button>
                )}
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                  {step === 1 && 'Shipping Details'}
                  {step === 2 && 'Secure Payment'}
                  {step === 3 && 'Order Success!'}
                </h2>
              </div>
              {step !== 3 && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-black p-1 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Step Progress Circles */}
            {step !== 3 && (
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="flex items-center">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step === 1 ? 'bg-black text-white' : 'bg-green-100 text-green-700'
                  }`}>
                    {step > 1 ? '✓' : '1'}
                  </span>
                  <span className="text-[11px] font-semibold tracking-wider text-[#171717] uppercase ml-2">Shipping</span>
                </div>
                <div className="w-12 h-px bg-gray-200"></div>
                <div className="flex items-center">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step === 2 ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    2
                  </span>
                  <span className={`text-[11px] font-semibold tracking-wider uppercase ml-2 ${
                    step === 2 ? 'text-[#171717]' : 'text-gray-400'
                  }`}>Payment</span>
                </div>
              </div>
            )}

            {/* CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Main Column */}
              <div className={`${step === 3 ? 'md:col-span-12' : 'md:col-span-7'}`}>
                {/* STEP 1: Shipping Details Form */}
                {step === 1 && (
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full text-xs border border-gray-200 p-2.5 focus:outline-none focus:border-black rounded-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingEmail}
                        onChange={(e) => setShippingEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full text-xs border border-gray-200 p-2.5 focus:outline-none focus:border-black rounded-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="123 Tech Avenue"
                        className="w-full text-xs border border-gray-200 p-2.5 focus:outline-none focus:border-black rounded-xs bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingCity}
                          onChange={(e) => setShippingCity(e.target.value)}
                          placeholder="San Francisco"
                          className="w-full text-xs border border-gray-200 p-2.5 focus:outline-none focus:border-black rounded-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                          ZIP / Postal Code
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingZip}
                          onChange={(e) => setShippingZip(e.target.value)}
                          placeholder="94107"
                          className="w-full text-xs border border-gray-200 p-2.5 focus:outline-none focus:border-black rounded-xs bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingPhone}
                        onChange={(e) => setShippingPhone(e.target.value)}
                        placeholder="+1 (555) 019-2834"
                        className="w-full text-xs border border-gray-200 p-2.5 focus:outline-none focus:border-black rounded-xs bg-white"
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-800 text-white font-semibold text-xs tracking-widest uppercase py-3.5 transition-all active:scale-95"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 2: Secure Payment Form */}
                {step === 2 && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    {/* Security Badge */}
                    <div className="bg-green-50 text-green-700 text-[10px] p-2.5 rounded-xs font-semibold flex items-center space-x-1.5 border border-green-100">
                      <ShieldCheck size={14} />
                      <span>256-bit SSL encrypted connection. Your data is safe.</span>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full text-xs border border-gray-200 p-2.5 focus:outline-none focus:border-black rounded-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="4111 2222 3333 4444"
                          className="w-full text-xs border border-gray-200 p-2.5 pr-10 focus:outline-none focus:border-black rounded-xs bg-white"
                        />
                        <CreditCard size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          placeholder="MM / YY"
                          className="w-full text-xs border border-gray-200 p-2.5 text-center focus:outline-none focus:border-black rounded-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                          CVV Security Code
                        </label>
                        <input
                          type="password"
                          required
                          value={cardCvv}
                          onChange={handleCvvChange}
                          placeholder="123"
                          className="w-full text-xs border border-gray-200 p-2.5 text-center focus:outline-none focus:border-black rounded-xs bg-white"
                        />
                      </div>
                    </div>

                    {paymentError && (
                      <p className="text-[10px] text-red-500 font-medium leading-normal mt-1">{paymentError}</p>
                    )}

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-800 text-white font-semibold text-xs tracking-widest uppercase py-3.5 transition-all active:scale-95"
                      >
                        Complete Order (${total.toFixed(2)})
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 3: Order Completed / Confirmation Receipt */}
                {step === 3 && (
                  <div className="text-center py-6 flex flex-col items-center justify-center max-w-md mx-auto" id="order-completed-view">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', duration: 0.6 }}
                      className="w-16 h-16 bg-green-50 text-green-500 flex items-center justify-center rounded-full mb-4"
                    >
                      <CheckCircle size={36} />
                    </motion.div>
                    
                    <h3 className="text-lg font-bold text-[#171717] font-display uppercase tracking-wider">
                      Thank You for Your Order!
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      We have received your payment. Your order number is{' '}
                      <span className="font-bold text-gray-800">SM-{Math.floor(100000 + Math.random() * 900000)}</span>. A
                      receipt and tracking number have been sent to{' '}
                      <span className="font-semibold text-gray-800">{orderSnapshot ? orderSnapshot.email : shippingEmail}</span>.
                    </p>

                    {/* Simple Receipt Summary details */}
                    <div className="w-full bg-gray-50 border border-gray-100 rounded-sm p-4 text-xs mt-6 text-left space-y-2">
                      <h4 className="font-bold text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-1.5 mb-2.5">
                        Order Summary
                      </h4>
                      <div className="max-h-24 overflow-y-auto space-y-1 pb-1.5 border-b border-gray-200">
                        {(orderSnapshot ? orderSnapshot.cartItems : cartItems).map((item, i) => (
                          <div key={i} className="flex justify-between text-gray-600">
                            <span>
                              {item.product.name.split(',')[0]} <strong className="text-gray-400">x{item.quantity}</strong>
                            </span>
                            <span className="font-medium text-gray-800">${(item.product.salePrice * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between font-semibold pt-1 text-[#171717]">
                        <span>Grand Total Paid</span>
                        <span>${(orderSnapshot ? orderSnapshot.total : total).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="w-full mt-8">
                      <button
                        onClick={onClose}
                        className="w-full bg-black hover:bg-gray-800 text-white font-semibold text-xs tracking-widest uppercase py-3.5 transition-all"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Summary (Only on Steps 1 & 2) */}
              {step !== 3 && (
                <div className="md:col-span-5 bg-gray-50 border border-gray-100 p-4 rounded-sm text-xs" id="checkout-sidebar">
                  <h3 className="font-bold text-[10px] text-[#171717] uppercase tracking-wider border-b border-gray-200 pb-2 mb-4 flex items-center space-x-1.5">
                    <ShoppingBag size={13} />
                    <span>Cart Overview</span>
                  </h3>

                  {/* List of checkout items */}
                  <div className="space-y-3.5 max-h-48 overflow-y-auto mb-4 pr-1">
                    {cartItems.map((item, i) => (
                      <div key={i} className="flex items-start">
                        <div className="w-10 h-10 bg-white border border-gray-100 rounded p-1 flex items-center justify-center flex-shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="object-contain max-h-full max-w-full" />
                        </div>
                        <div className="ml-2.5 text-left flex-grow">
                          <h4 className="font-semibold text-gray-800 line-clamp-1">{item.product.name}</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            Qty: {item.quantity}
                            {item.selectedColor && ` | Color: ${item.selectedColor}`}
                          </p>
                        </div>
                        <span className="font-bold ml-2 text-gray-700">
                          ${(item.product.salePrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Summary Totals */}
                  <div className="space-y-2 border-t border-gray-200 pt-3 text-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
                    </div>

                    {appliedPromo && (
                      <div className="flex justify-between text-green-600 font-semibold">
                        <span>Discount ({appliedPromo.code})</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-semibold uppercase text-[10px]">Free</span>
                      ) : (
                        <span className="font-medium text-gray-800">${shipping.toFixed(2)}</span>
                      )}
                    </div>

                    <div className="flex justify-between font-bold text-sm text-[#171717] border-t border-gray-200 pt-3 mt-1">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
