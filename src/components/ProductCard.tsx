/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Eye, ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  isFavorite,
  onToggleFavorite,
}) => {
  // Calculate discount percentage
  const discountPercent = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );

  return (
    <div className="group flex flex-col w-full bg-white transition-all duration-300" id={`product-card-${product.id}`}>
      {/* Image Container with Grey Backdrop */}
      <div className="relative aspect-square w-full bg-[#f4f4f6] flex items-center justify-center p-6 overflow-hidden rounded-sm" id={`img-container-${product.id}`}>
        
        {/* SALE Tag */}
        <span className="absolute bottom-3 left-3 bg-black text-white text-[10px] tracking-wider font-semibold uppercase px-2.5 py-1 z-10 rounded-xs shadow-sm">
          Sale
        </span>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product);
          }}
          className="absolute top-3 right-3 bg-white hover:bg-black text-[#171717] hover:text-white p-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200 z-10 active:scale-90 cursor-pointer"
          aria-label={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={15} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="object-contain max-h-[80%] max-w-[85%] select-none transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <button
            onClick={() => onQuickView(product)}
            className="bg-white hover:bg-[#171717] text-[#171717] hover:text-white w-full py-2.5 px-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-[11px] font-bold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer border border-gray-100"
          >
            <Eye size={14} />
            <span>Select Options</span>
          </button>
        </div>
      </div>

      {/* Info Details Section */}
      <div className="pt-4 pb-2 flex flex-col flex-grow text-left" id={`info-container-${product.id}`}>
        {/* Star Ratings */}
        <div className="flex items-center space-x-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className={`${
                i < Math.floor(product.rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-200'
              }`}
            />
          ))}
          <span className="text-[10px] text-gray-400 font-medium ml-1">
            ({product.rating})
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onQuickView(product)}
          className="text-xs sm:text-sm font-medium text-[#171717] tracking-tight hover:text-gray-600 cursor-pointer line-clamp-2 min-h-[36px] transition-colors"
        >
          {product.name}
        </h3>

        {/* Prices */}
        <div className="mt-2 flex items-center space-x-2.5">
          {/* Original Price */}
          <span className="text-xs text-gray-400 line-through font-medium">
            ${product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          {/* Sale Price */}
          <span className="text-sm font-bold text-[#171717]">
            ${product.salePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          {/* Discount Percentage Badge */}
          <span className="text-[10px] text-green-600 font-semibold bg-green-50 px-1.5 py-0.5 rounded-xs">
            -{discountPercent}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
