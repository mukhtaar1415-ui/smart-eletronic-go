/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, Disc, Laptop, Headphones } from 'lucide-react';
import { HERO_HEADPHONE_IMAGE, HERO_WOMAN_IMAGE } from '../data/products';

interface HeroProps {
  onShopClick: () => void;
  onCategoryClick: (category: 'audio' | 'laptops' | 'smartphones' | 'wearables') => void;
}

export default function Hero({ onShopClick, onCategoryClick }: HeroProps) {
  return (
    <section className="relative w-full bg-white overflow-hidden border-b border-gray-100" id="hero-section">
      <div className="w-full flex flex-col md:flex-row min-h-[500px] md:min-h-[580px]">
        
        {/* Left Side: White Background with Large Headphone */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 sm:p-12 relative" id="hero-left-pane">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center"
          >
            {/* Soft backdrop radial shadow */}
            <div className="absolute w-64 h-64 bg-gray-100 rounded-full blur-3xl opacity-60"></div>
            <img
              src={HERO_HEADPHONE_IMAGE}
              alt="Premium White Headphones"
              className="object-contain max-h-full max-w-full drop-shadow-xl select-none z-10 hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Right Side: Light Grey Background with Woman Listening */}
        <div className="w-full md:w-1/2 bg-[#f4f4f6] flex flex-col justify-between relative p-8 sm:p-12 lg:p-16" id="hero-right-pane">
          {/* Hero Content - Placed Over and Centered */}
          <div className="my-auto max-w-lg z-20 md:absolute md:left-[-120px] md:top-1/2 md:-translate-y-1/2 md:w-[480px] text-center md:text-left pt-6 pb-12 md:p-0" id="hero-overlay-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-wider text-[#171717] uppercase leading-none">
                Earphone Bundle
              </h2>
              <p className="text-gray-500 text-sm sm:text-base font-medium mt-4 tracking-tight">
                Iphone, Earphone, Macbook, iMac & Speaker Available
              </p>
              <div className="mt-8">
                <button
                  onClick={onShopClick}
                  className="bg-black text-white hover:bg-gray-800 text-xs sm:text-sm font-semibold tracking-widest px-8 py-3.5 sm:px-10 uppercase transition-all duration-300 hover:shadow-lg active:scale-95"
                  id="hero-shop-btn"
                >
                  Shop Now
                </button>
              </div>
            </motion.div>
          </div>

          {/* Image of woman - aligned right and absolute bottom/side on desktop */}
          <div className="hidden md:block absolute right-0 bottom-0 top-0 w-3/5" id="hero-woman-container">
            <img
              src={HERO_WOMAN_IMAGE}
              alt="Experience Premium Sound"
              className="w-full h-full object-cover object-center mix-blend-multiply opacity-90 select-none"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Three category quick link blocks bottom-aligned (desktop/mobile) */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 mt-auto pt-6 z-25" id="hero-category-blocks">
            {/* Quick Box: Headphone */}
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => onCategoryClick('audio')}
              className="bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-gray-200 p-4 flex items-center justify-between cursor-pointer rounded transition-all duration-300 shadow-sm"
              id="quick-box-headphone"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 text-black rounded">
                  <Headphones size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#171717]">Headphone</span>
                </div>
              </div>
              <ArrowRight size={14} className="text-gray-400" />
            </motion.div>

            {/* Quick Box: Earbuds */}
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => onCategoryClick('audio')}
              className="bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-gray-200 p-4 flex items-center justify-between cursor-pointer rounded transition-all duration-300 shadow-sm"
              id="quick-box-earbuds"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 text-black rounded">
                  <Disc size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#171717]">Earbuds</span>
                </div>
              </div>
              <ArrowRight size={14} className="text-gray-400" />
            </motion.div>

            {/* Quick Box: Macbook */}
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => onCategoryClick('laptops')}
              className="bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-gray-200 p-4 flex items-center justify-between cursor-pointer rounded transition-all duration-300 shadow-sm"
              id="quick-box-macbook"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 text-black rounded">
                  <Laptop size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#171717]">Macbook</span>
                </div>
              </div>
              <ArrowRight size={14} className="text-gray-400" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
