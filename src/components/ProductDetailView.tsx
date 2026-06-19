import { useState, useEffect } from 'react';
import { Star, Heart, ShoppingCart, ChevronLeft, Truck, RotateCcw, ShieldCheck, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
  onBackToCatalogue: () => void;
  onAddToCart: (product: Product, size: number, color: { name: string; hex: string }) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onViewProductDetails: (productId: string) => void;
  onBuyNow: (product: Product, size: number, color: { name: string; hex: string }) => void;
}

export default function ProductDetailView({
  product,
  relatedProducts,
  onBackToCatalogue,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onViewProductDetails,
  onBuyNow,
}: ProductDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0] || 9);
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>(
    product.colors[0] || { name: 'Black', hex: '#111827' }
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Update selected assets when product ID changes
  useEffect(() => {
    setSelectedImage(product.images[0]);
    setSelectedSize(product.sizes[0] || 9);
    setSelectedColor(product.colors[0] || { name: 'Black', hex: '#111827' });
    setQuantity(1);
    setSuccessMessage('');
  }, [product]);

  const handleQuantityChange = (val: number) => {
    const nextVal = quantity + val;
    if (nextVal >= 1 && nextVal <= product.stock) {
      setQuantity(nextVal);
    }
  };

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    onAddToCart(product, selectedSize, selectedColor);
    setSuccessMessage('Successfully added to your shopping cart!');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleBuyNow = () => {
    if (product.stock === 0) return;
    onBuyNow(product, selectedSize, selectedColor);
  };

  return (
    <div id={`product-detail-${product.id}`} className="space-y-12 sm:space-y-16">
      {/* Back Button */}
      <div className="flex justify-between items-center bg-neutral-50 px-4 py-3 rounded-xl border border-neutral-150">
        <button
          id="back-to-catalogue-btn"
          onClick={onBackToCatalogue}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Shoes Catalogue</span>
        </button>
        <span className="text-xs text-neutral-400 font-sans font-medium">
          Category: {product.category}
        </span>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start text-left">
        {/* Gallery Column */}
        <div className="space-y-4">
          {/* Main Zoomed Frame */}
          <div className="relative aspect-square bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100">
            <img
              src={selectedImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {product.discountPrice && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg uppercase tracking-wider font-display">
                SALE
              </span>
            )}
          </div>

          {/* Miniature Thumbnails */}
          <div className="grid grid-cols-3 gap-3">
            {product.images.map((imgUrl, index) => (
              <button
                key={index}
                id={`thumb-${product.id}-${index}`}
                onClick={() => setSelectedImage(imgUrl)}
                className={`aspect-square rounded-xl overflow-hidden border bg-neutral-50 hover:bg-neutral-100 transition-all cursor-pointer ${
                  selectedImage === imgUrl ? 'ring-2 ring-orange-500 border-white' : 'border-neutral-200'
                }`}
              >
                <img src={imgUrl} alt="Thumbnail view" referrerPolicy="no-referrer" className="w-full h-full object-cover object-center" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="space-y-6">
          <div className="space-y-2">
            {/* Brand & Stars */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-orange-500 uppercase tracking-widest font-sans">{product.brand}</span>
              <div className="flex items-center space-x-0.5">
                <Star className="w-4.5 h-4.5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-neutral-800 text-sm ml-1">{product.rating.toFixed(1)}</span>
                <span className="text-neutral-400 text-xs">({product.reviewsCount} verified reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="font-display font-medium text-3xl sm:text-4xl tracking-tight text-neutral-900">
              {product.name}
            </h1>
          </div>

          {/* Price Block */}
          <div className="py-4 border-y border-neutral-100 flex items-baseline space-x-3">
            {product.discountPrice ? (
              <>
                <span className="text-3xl font-extrabold text-red-500 font-sans">${product.discountPrice}</span>
                <span className="text-base text-neutral-400 line-through font-sans">${product.price}</span>
                <span className="text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded-full uppercase">
                  Save ${product.price - product.discountPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-extrabold text-neutral-900 font-sans">${product.price}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-600 leading-relaxed font-light">
            {product.description}
          </p>

          {/* Features Checklist */}
          {product.features && product.features.length > 0 && (
            <div className="bg-neutral-50 px-4 py-3 rounded-xl space-y-1.5 text-xs text-neutral-650 border border-neutral-100">
              <span className="font-bold text-neutral-800">Key Features:</span>
              <ul className="list-disc pl-4 space-y-0.5 font-light">
                {product.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Color Chooser */}
          <div className="space-y-2 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Select Color Options:{' '}
              <strong className="text-neutral-800 font-semibold">{selectedColor.name}</strong>
            </span>
            <div className="flex gap-3">
              {product.colors.map((color) => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer hover:scale-105 ${
                      isSelected ? 'ring-2 ring-orange-500 border-white scale-102' : 'border-neutral-200'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {color.name === 'White' && isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
                    )}
                    {color.name !== 'White' && isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Chooser */}
          <div className="space-y-2 text-left">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-neutral-550">
              <span>Select Size (US Mens / Womens):</span>
              <span className="text-orange-500 font-semibold">Active Selection: US {selectedSize}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-11 w-11 text-xs font-bold rounded-xl transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 text-white border-neutral-900 font-bold scale-102 shadow-sm'
                        : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity and Actions Row */}
          <div className="pt-4 space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Quant controllers */}
              <div className="flex items-center border border-neutral-200 rounded-xl bg-white p-1">
                <button
                  id="det-dec-quant"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-9 h-9 flex items-center justify-center text-neutral-500 hover:text-neutral-900 disabled:opacity-40 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold font-mono text-neutral-800">{quantity}</span>
                <button
                  id="det-inc-quant"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="w-9 h-9 flex items-center justify-center text-neutral-500 hover:text-neutral-900 disabled:opacity-40 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Stock Indicator */}
              <div className="text-xs text-left">
                {product.stock > 0 ? (
                  <p className="text-green-600 font-bold">
                    ● In Stock{' '}
                    <span className="text-neutral-400 font-normal">({product.stock} available near you)</span>
                  </p>
                ) : (
                  <p className="text-red-500 font-bold">● Sold Out Temporarily</p>
                )}
                <p className="text-neutral-400 font-light mt-0.5">Ready for dispatch in 24 hours.</p>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <button
                id="details-add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`py-3.5 px-6 rounded-xl font-bold font-sans text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  product.stock === 0
                    ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    : 'bg-neutral-900 hover:bg-neutral-950 text-white shadow-md active:scale-97'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Shopping Cart</span>
              </button>

              <button
                id="details-buy-now-btn"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className={`py-3.5 px-6 rounded-xl font-bold font-sans text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  product.stock === 0
                    ? 'bg-neutral-100 text-neutral-350 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md active:scale-97'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Express Buy Now</span>
              </button>
            </div>

            {/* Wishlist toggle button below */}
            <button
              id="details-wishlist-toggle"
              onClick={() => onToggleWishlist(product)}
              className={`w-full py-2.5 rounded-xl border border-neutral-200 hover:border-neutral-300 text-xs font-semibold flex items-center justify-center space-x-1.5 bg-white transition-colors cursor-pointer ${
                isWishlisted ? 'text-red-500' : 'text-neutral-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{isWishlisted ? 'Remove from Saved Wishlist' : 'Save to My Shoes Wishlist'}</span>
            </button>
          </div>

          {/* Live Success Banner */}
          {successMessage && (
            <motion.div
              id="details-success-banner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl flex items-center space-x-2.5 font-medium"
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </motion.div>
          )}

          {/* Bullet trust facts */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-neutral-500 text-[11px] font-sans border-t border-neutral-100">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Free Delivery above $150</span>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCcw className="w-4 h-4 text-orange-500 shrink-0" />
              <span>30-day Free Retractions</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
              <span>100% Genuine Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section id="related-shoes-listing" className="pt-10 border-t border-neutral-100 space-y-6">
          <div className="text-left">
            <h2 className="font-display font-medium text-xl sm:text-2xl text-neutral-900 tracking-tight">
              RELATED SHOES YOU MIGHT LIKE
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Top selections compiled from the same category: {product.category}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.slice(0, 4).map((related) => (
              <div
                key={related.id}
                onClick={() => {
                  onViewProductDetails(related.id);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="group cursor-pointer bg-white border border-neutral-100 rounded-xl overflow-hidden hover:shadow-md transition-all h-full"
              >
                <div id={`related-${related.id}-image`} className="aspect-square bg-neutral-50 overflow-hidden relative">
                  <img src={related.images[0]} alt={related.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                </div>
                <div className="p-3 text-left">
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{related.brand}</span>
                  <h4 className="font-display font-medium text-xs text-neutral-800 line-clamp-1 group-hover:text-orange-500 transition-colors mt-0.5">
                    {related.name}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-neutral-50">
                    <span className="text-xs font-bold text-neutral-950 font-sans">
                      ${related.discountPrice || related.price}
                    </span>
                    <div className="flex items-center space-x-0.5 text-[10px] text-neutral-500">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{related.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
