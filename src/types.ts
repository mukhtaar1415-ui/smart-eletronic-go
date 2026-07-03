/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'smartphones' | 'laptops' | 'audio' | 'wearables' | 'accessories';
  image: string;
  originalPrice: number;
  salePrice: number;
  rating: number;
  reviews: Review[];
  specs: Record<string, string>;
  features: string[];
  isBestSeller: boolean;
  isFeatured: boolean;
  stock: number;
  colors?: string[];
  storages?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface CustomerDetails {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customerDetails: CustomerDetails;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}
