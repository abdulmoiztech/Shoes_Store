import { useState, FormEvent } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
  promoApplied: boolean;
  setPromoApplied: (val: boolean) => void;
}

export default function CartView({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
  promoApplied,
  setPromoApplied,
}: CartViewProps) {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Computations
  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.product.discountPrice || item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  const discountValue = promoApplied ? subtotal * 0.15 : 0;
  const shippingThreshold = 150;
  const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 12;
  const grandTotal = subtotal - discountValue + shippingCost;

  const handleApplyPromo = (e: FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.trim().toUpperCase() === 'SOLE15') {
      if (promoApplied) {
        setPromoError('Promo code is already applied to this order!');
        return;
      }
      setPromoApplied(true);
      setPromoSuccess('Promo SOL15 successfully applied: 15% Off storewide!');
      setPromoCode('');
    } else {
      setPromoError('Invalid coupon code. Try using SOLE15 for a nice discount.');
    }
  };

  const handleClearPromo = () => {
    setPromoApplied(false);
    setPromoSuccess('');
    setPromoError('');
  };

  return (
    <div id="cart-page-wrapper" className="space-y-8 text-neutral-800">
      {/* Title */}
      <div className="flex justify-between items-center bg-neutral-50 p-4 rounded-xl border border-neutral-150">
        <div className="text-left">
          <span className="text-xs text-orange-500 font-bold uppercase font-sans tracking-wide">Ready for dispatch</span>
          <h1 className="font-display font-medium text-2xl tracking-tight text-neutral-900 leading-none mt-1">
            SHOPPING CART
          </h1>
        </div>
        <button
          id="cart-continue-shop-top"
          onClick={onContinueShopping}
          className="text-xs font-semibold text-neutral-600 hover:text-orange-500 underline cursor-pointer"
        >
          Keep Browsing Shoes
        </button>
      </div>

      <AnimatePresence mode="wait">
        {cartItems.length === 0 ? (
          /* Empty Cart state */
          <motion.div
            id="cart-empty-state"
            key="empty"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-16 text-center bg-neutral-50 rounded-2xl border border-dashed border-neutral-200"
          >
            <div className="w-16 h-16 bg-neutral-105 rounded-full flex items-center justify-center text-neutral-400 mx-auto mb-4">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-display font-medium text-lg text-neutral-700">Your Shopping Cart is Empty</h3>
            <p className="text-xs text-neutral-450 mt-1 max-w-sm mx-auto leading-relaxed">
              Looks like you haven't selected any footwear models yet. Head over to our catalog to select your perfect pair.
            </p>
            <button
              id="empty-cart-shop-now"
              onClick={onContinueShopping}
              className="mt-5 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Start Shopping Shoes
            </button>
          </motion.div>
        ) : (
          /* Cart contents */
          <motion.div
            id="cart-filled-contents"
            key="filled"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* List of Items column */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => {
                const itemPrice = item.product.discountPrice || item.product.price;
                return (
                  <motion.div
                    key={item.id}
                    layoutId={`cart-row-${item.id}`}
                    className="bg-white border border-neutral-100 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Image & naming */}
                    <div className="flex items-center space-x-4">
                      {/* Little shoe thumbnail */}
                      <div className="w-16 sm:w-20 aspect-square rounded-lg bg-neutral-50 overflow-hidden border border-neutral-100 shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Naming block */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none">
                          {item.product.brand}
                        </span>
                        <h4 className="font-display font-medium text-sm sm:text-base text-neutral-900 leading-tight">
                          {item.product.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-2.5 text-xs text-neutral-500">
                          <span className="inline-flex items-center">
                            Size: <strong className="text-neutral-700 ml-1">US {item.selectedSize}</strong>
                          </span>
                          <span className="inline-flex items-center">
                            Color:
                            <span
                              className="w-3 h-3 rounded-full border border-neutral-300 ml-1 mr-1 inline-block shrink-0"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            <strong className="text-neutral-700">{item.selectedColor.name}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity controller & Price block */}
                    <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-6 border-t sm:border-0 pt-3 sm:pt-0 mt-2 sm:mt-0">
                      {/* Quantity buttons */}
                      <div className="flex items-center border border-neutral-200 rounded-lg p-0.5 bg-neutral-50">
                        <button
                          id={`decrease-qty-${item.id}`}
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:text-neutral-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold font-mono text-neutral-700">
                          {item.quantity}
                        </span>
                        <button
                          id={`increase-qty-${item.id}`}
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-neutral-500 hover:text-neutral-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Pricing block */}
                      <div className="text-right flex flex-col justify-center min-w-[70px]">
                        <span className="text-sm font-bold text-neutral-900 font-sans">
                          ${(itemPrice * item.quantity).toFixed(0)}
                        </span>
                        <span className="text-[10px] text-neutral-450">
                          ${itemPrice} each
                        </span>
                      </div>

                      {/* Delete bin */}
                      <button
                        id={`remove-cart-item-${item.id}`}
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}

              {/* Keep shopping link */}
              <button
                id="continue-shop-btm-btn"
                onClick={onContinueShopping}
                className="w-full py-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 font-semibold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <span>Continue Shopping Shoes Collection</span>
              </button>
            </div>

            {/* Right Summary Block */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              {/* Checkout Calculation Card */}
              <div className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm text-left">
                <h3 className="font-display font-semibold text-sm tracking-wide text-neutral-900 border-b border-neutral-50 pb-3 mb-4 uppercase">
                  Order Summary
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between text-neutral-500">
                    <span>Selected Items Subtotal</span>
                    <span className="font-semibold text-neutral-800 font-sans">${subtotal.toFixed(0)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center">
                        <Tag className="w-3.5 h-3.5 mr-1 text-green-600 shrink-0" />
                        Discount (Promo 15%)
                      </span>
                      <span className="font-bold font-sans">-${discountValue.toFixed(0)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-500 pb-3.5 border-b border-neutral-50">
                    <span>Tracked Shipping & Ingress</span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600 font-semibold uppercase font-sans">FREE</span>
                    ) : (
                      <span className="font-semibold text-neutral-800 font-sans">${shippingCost}</span>
                    )}
                  </div>

                  {shippingCost > 0 && (
                    <div className="text-[10px] text-orange-600 bg-orange-50/50 p-2 border border-orange-100/30 rounded">
                      Add <strong className="font-serif">${shippingThreshold - subtotal}</strong> more to qualify for **Free Shipping**!
                    </div>
                  )}

                  <div className="flex justify-between text-sm pt-2">
                    <span className="font-bold text-neutral-800">Total Price Due</span>
                    <span className="text-lg font-extrabold text-neutral-900 font-sans">${grandTotal.toFixed(0)}</span>
                  </div>
                </div>

                {/* Main Checkout button */}
                <button
                  id="cart-proceed-checkout-btn"
                  onClick={onProceedToCheckout}
                  className="w-full mt-6 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md shadow-orange-500/10 active:scale-97 cursor-pointer animate-pulse"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Promo apply form */}
              <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-5 text-left">
                <div className="flex items-center space-x-1.5 text-neutral-700 text-xs font-bold uppercase tracking-wider mb-3">
                  <Ticket className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Promo / Voucher Discount</span>
                </div>

                {promoApplied ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xl flex items-center justify-between font-medium">
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                        <span>SOLE15 Is Active</span>
                      </div>
                      <button
                        id="promo-clear-btn"
                        onClick={handleClearPromo}
                        className="text-xs text-red-500 hover:text-red-700 font-bold underline ml-2 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-[10px] text-neutral-450 leading-tight">15% discount successfully calculated on your bag.</p>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="space-y-2">
                    <p className="text-[10px] text-neutral-500 leading-tight mb-2">Have a secret shoe club coupon? Apply your code to claim instant savings.</p>
                    <div className="relative">
                      <input
                        id="cart-voucher-input"
                        type="text"
                        placeholder="e.g., SOLE15"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full pl-3 pr-20 py-2.5 border border-neutral-200 bg-white text-xs rounded-lg text-neutral-800 focus:outline-none focus:ring-1 focus:ring-orange-500 placeholder:text-neutral-350"
                      />
                      <button
                        id="apply-voucher-btn"
                        type="submit"
                        className="absolute right-1 top-1 bottom-1 px-3 bg-neutral-900 hover:bg-neutral-950 text-white font-semibold text-xs rounded-md transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && <p className="text-[10px] text-red-500 font-medium pl-1">{promoError}</p>}
                    {promoSuccess && <p className="text-[10px] text-green-600 font-bold pl-1">{promoSuccess}</p>}
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
