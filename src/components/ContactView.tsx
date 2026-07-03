/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, Sparkles, AlertCircle } from 'lucide-react';

export default function ContactView() {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('order-issue');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Generate dynamic ticket ID
    const randomTicket = `TK-${Math.floor(10000 + Math.random() * 90000)}`;
    setTicketId(randomTicket);
    setIsSubmitted(true);

    // Reset Form
    setName('');
    setEmail('');
    setSubject('order-issue');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="contact-view-container">
      {/* Intro Header */}
      <div className="text-center mb-12">
        <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-widest text-[#171717] uppercase">
          Contact Customer Care
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium max-w-md mx-auto">
          Have questions or need help with an order? Drop us a line and our expert technology support agents will be in touch shortly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* CONTACT FORM - Left */}
        <div className="md:col-span-7 bg-white border border-gray-100 p-6 sm:p-8 rounded-sm shadow-xs text-left">
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-8 text-center flex flex-col items-center justify-center max-w-md mx-auto"
              id="ticket-submitted-screen"
            >
              <div className="w-14 h-14 bg-green-50 text-green-500 flex items-center justify-center rounded-full mb-4">
                <Sparkles size={26} />
              </div>
              <h3 className="text-base font-bold text-[#171717] uppercase tracking-wider font-display">
                Support Request Received!
              </h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Thank you! We have logged your request. Your support ticket ID is{' '}
                <strong className="text-gray-800 font-bold">{ticketId}</strong>. One of our specialist representatives will review
                your inquiry and respond via email within 24 business hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-6 border border-black bg-black text-white hover:bg-gray-800 text-[10px] font-bold tracking-widest uppercase px-6 py-2.5 transition-colors"
              >
                Submit Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-2">
                Send Us a Message
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full text-xs border border-gray-200 p-2.5 focus:outline-none focus:border-black rounded-xs bg-white text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full text-xs border border-gray-200 p-2.5 focus:outline-none focus:border-black rounded-xs bg-white text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Topic of Inquiry
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs border border-gray-200 p-2.5 focus:outline-none focus:border-black rounded-xs bg-white text-gray-800 cursor-pointer font-medium"
                >
                  <option value="order-issue">Order Status & Tracking</option>
                  <option value="technical-support">Technical Support / Troubleshoot</option>
                  <option value="returns-refunds">Returns & Refund Requests</option>
                  <option value="product-inquiry">Pre-purchase Product Questions</option>
                  <option value="other">General Feedback / Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Message Details
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you today? Please include order numbers if applicable."
                  className="w-full text-xs border border-gray-200 p-2.5 focus:outline-none focus:border-black rounded-xs bg-white text-gray-800 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white font-semibold text-xs tracking-widest uppercase py-3.5 flex items-center justify-center space-x-2 transition-all active:scale-95"
                >
                  <Send size={13} />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* SUPPORT CARDS - Right */}
        <div className="md:col-span-5 space-y-6" id="contact-sidebar-info">
          {/* Quick Info Block */}
          <div className="bg-gray-50 border border-gray-100 p-6 rounded-sm text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-5">
              Contact Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3.5">
                <div className="p-2 bg-white rounded border border-gray-200 text-gray-700 flex-shrink-0">
                  <Phone size={15} />
                </div>
                <div className="flex flex-col text-xs">
                  <span className="font-semibold text-[#171717]">Customer Hotline</span>
                  <span className="text-gray-500 mt-0.5">+1 (800) 555-SMART</span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2 bg-white rounded border border-gray-200 text-gray-700 flex-shrink-0">
                  <Mail size={15} />
                </div>
                <div className="flex flex-col text-xs">
                  <span className="font-semibold text-[#171717]">Email Support</span>
                  <span className="text-gray-500 mt-0.5">support@smartelectronics.com</span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2 bg-white rounded border border-gray-200 text-gray-700 flex-shrink-0">
                  <MapPin size={15} />
                </div>
                <div className="flex flex-col text-xs">
                  <span className="font-semibold text-[#171717]">HQ Location</span>
                  <span className="text-gray-500 mt-0.5">100 Technology Plaza, San Francisco, CA 94107</span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2 bg-white rounded border border-gray-200 text-gray-700 flex-shrink-0">
                  <Clock size={15} />
                </div>
                <div className="flex flex-col text-xs">
                  <span className="font-semibold text-[#171717]">In-Office Hours</span>
                  <span className="text-gray-500 mt-0.5">Monday – Friday: 9am – 6pm PST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQs */}
          <div className="bg-white border border-gray-100 p-6 rounded-sm text-left">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-4">
              Frequently Asked FAQs
            </h3>
            
            <div className="space-y-3.5 text-xs">
              <div className="border-b border-gray-50 pb-2.5">
                <h4 className="font-semibold text-gray-800">Do you offer international shipping?</h4>
                <p className="text-gray-500 mt-1 leading-relaxed">Yes! We ship globally. Shipping is flat $15.00, or completely free for orders exceeding $100.</p>
              </div>
              <div className="border-b border-gray-50 pb-2.5">
                <h4 className="font-semibold text-gray-800">What is your return policy?</h4>
                <p className="text-gray-500 mt-1 leading-relaxed">We provide a 30-day hassle-free return. Simply request a return shipping label via this support page.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Can I modify my order?</h4>
                <p className="text-gray-500 mt-1 leading-relaxed">If your order has not shipped, we can modify details or addresses. Submit an inquiry immediately.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
