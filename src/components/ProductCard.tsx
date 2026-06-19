import { useState, MouseEvent } from 'react';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onViewDetails: (productId: string) => void;
  onAddToCart: (product: Product, size: number, color: { name: string; hex: string }) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export default function ProductCard({
  product,
  onViewDetails,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const discountRatio = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleQuickAdd = (e: MouseEvent) => {
    e.stopPropagation();
    // Use default values for quick-add: first available size and first available color
    const defaultSize = product.sizes[0] || 9;
    const defaultColor = product.colors[0] || { name: 'Black', hex: '#111827' };
    onAddToCart(product, defaultSize, defaultColor);
  };

  const handleWishlistClick = (e: MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };


  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(product.id)}
      className="group relative bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full bg-neutral-50 overflow-hidden shrink-0">
        {/* Badges container */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5 items-start">
          {product.discountPrice && (
            <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-white bg-red-500 rounded-md shadow-sm uppercase font-display">
              SALE -{discountRatio}%
            </span>
          )}
          {product.newArrival && (
            <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-white bg-blue-500 rounded-md shadow-sm uppercase font-display">
              NEW
            </span>
          )}
          {product.bestSeller && (
            <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-white bg-yellow-500 rounded-md shadow-sm uppercase font-display">
              BESTSELLER
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="px-2.5 py-1 text-[10px] font-semibold text-white bg-neutral-900 rounded-md shadow-sm uppercase font-sans">
              Only {product.stock} left
            </span>
          )}
          {product.stock === 0 && (
            <span className="px-2.5 py-1 text-[10px] font-semibold text-white bg-neutral-400 rounded-md shadow-sm uppercase font-sans">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={handleWishlistClick}
          className="absolute top-3.5 right-3.5 z-10 w-8.5 h-8.5 rounded-full bg-white/90 hover:bg-white text-neutral-600 hover:text-red-500 flex items-center justify-center shadow-md transition-all active:scale-95"
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            className={`w-4.5 h-4.5 transition-colors ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-neutral-500'
            }`}
          />
        </button>

        {/* Shoe Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Card Quick Actions Slide Up */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-between gap-2 z-10">
          <button
            id={`quick-add-${product.id}`}
            onClick={handleQuickAdd}
            disabled={product.stock === 0}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-all text-white ${
              product.stock === 0
                ? 'bg-neutral-500 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 active:scale-95'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Quick Shop</span>
          </button>
          <button
            id={`quick-view-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product.id);
            }}
            className="w-9 h-9 bg-white/20 hover:bg-white/30 text-white rounded-lg flex items-center justify-center backdrop-blur-sm transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info Block */}
      <div className="p-4 flex flex-col flex-1">
        {/* Brand & Category */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-400 uppercase tracking-widest leading-none mb-1">
          <span>{product.brand}</span>
          <span>{product.category}</span>
        </div>

        {/* Shoe Name */}
        <h3 className="font-display font-medium text-sm text-neutral-800 tracking-tight group-hover:text-orange-500 transition-colors line-clamp-1 mb-1.5">
          {product.name}
        </h3>

        {/* Ratings & Gender */}
        <div className="flex items-center justify-between mb-3 text-xs text-neutral-500">
          <div className="flex items-center space-x-0.5">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-neutral-700 text-xs ml-0.5">{product.rating.toFixed(1)}</span>
            <span className="text-neutral-400 text-[10px]">({product.reviewsCount})</span>
          </div>
          <span className="text-[11px] px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-full">{product.gender}</span>
        </div>

        {/* Pricing & Add to Cart button (mobile-only/compact fallback) */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-neutral-50">
          <div className="flex flex-col">
            {product.discountPrice ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-red-500 font-sans">${product.discountPrice}</span>
                <span className="text-xs text-neutral-400 line-through font-sans">${product.price}</span>
              </div>
            ) : (
              <span className="text-sm font-bold text-neutral-900 font-sans">${product.price}</span>
            )}
          </div>

          {/* Inline shop icon for mobile layouts */}
          <button
            id={`mob-add-btn-${product.id}`}
            onClick={handleQuickAdd}
            disabled={product.stock === 0}
            className={`md:hidden p-2 rounded-xl text-white transition-all ${
              product.stock === 0
                ? 'bg-neutral-300 cursor-not-allowed'
                : 'bg-neutral-900 active:scale-95'
            }`}
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
