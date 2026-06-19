import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCart: () => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCart,
  onProceedToCheckout,
}: CartDrawerProps) {
  const totalAmount = cartItems.reduce((acc, item) => {
    const price = item.product.discountPrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            id="cart-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer Slide Out Element */}
          <motion.div
            id="cart-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 max-w-md w-full bg-white z-50 shadow-2xl flex flex-col focus:outline-none"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
              <div className="flex items-center space-x-2 text-neutral-900 text-left">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                <span className="font-display font-medium text-lg leading-none">
                  Shopping Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)})
                </span>
              </div>
              <button
                id="close-cart-drawer-btn"
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List scroll elements */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div id="drawer-empty-state" className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
                  <ShoppingBag className="w-12 h-12 text-neutral-250 mb-3" />
                  <h4 className="font-display font-medium text-neutral-600 text-sm">Your Bag is Empty</h4>
                  <p className="text-xs text-neutral-400 mt-1 max-w-[200px]">
                    Select running shoes, sneakers, or formal slip-ons to continue checkout.
                  </p>
                  <button
                    id="drawer-browse-cta"
                    onClick={() => {
                      onClose();
                      onProceedToCart();
                    }}
                    className="mt-4 px-4 py-2 bg-neutral-905 hover:bg-neutral-950 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                cartItems.map((item) => {
                  const activePrice = item.product.discountPrice || item.product.price;
                  return (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-3 pb-4 border-b border-neutral-100 text-left"
                    >
                      {/* Image + Info */}
                      <div className="flex items-center space-x-3 min-w-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-lg object-cover bg-neutral-50 border border-neutral-150 shrink-0"
                        />
                        <div className="min-w-0">
                          <h5 className="font-display font-medium text-xs sm:text-sm text-neutral-800 truncate" title={item.product.name}>
                            {item.product.name}
                          </h5>
                          <p className="text-[10px] text-neutral-400 mt-0.5">
                            Size: US {item.selectedSize} | {item.selectedColor.name}
                          </p>
                          <span className="text-xs font-bold text-neural-950 block mt-1 font-sans">
                            ${activePrice * item.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Quantity buttons & Removals */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0 justify-between h-14">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-400 hover:text-red-500 p-1 rounded-sm hover:bg-red-50"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center border border-neutral-200 rounded-md p-0.5 bg-neutral-50 text-[11px]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-5.5 h-5.5 flex items-center justify-center text-neutral-400 hover:text-neutral-800"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="w-4 text-center font-bold font-mono text-neutral-700">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-5.5 h-5.5 flex items-center justify-center text-neutral-400 hover:text-neutral-800"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Calculations and Actions Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-neutral-100 bg-neutral-50/50 space-y-4 text-left">
                <div className="flex justify-between text-xs sm:text-sm font-semibold">
                  <span className="text-neutral-600">Subtotal Price</span>
                  <span className="text-neutral-900 font-bold font-sans">${totalAmount.toFixed(0)}</span>
                </div>
                <p className="text-[10px] text-neutral-400 leading-normal">
                  Shipping updates, custom promocodes, and billing totals will be finalized seamlessly on checkout.
                </p>

                <div className="grid grid-cols-2 gap-3.5 pt-1">
                  <button
                    id="drawer-view-bag-btn"
                    onClick={() => {
                      onClose();
                      onProceedToCart();
                    }}
                    className="py-3 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 rounded-xl text-xs font-bold leading-none cursor-pointer transition-colors"
                  >
                    View Bag
                  </button>
                  <button
                    id="drawer-checkout-btn"
                    onClick={() => {
                      onClose();
                      onProceedToCheckout();
                    }}
                    className="py-3 bg-neutral-900 hover:bg-neutral-950 text-white rounded-xl text-xs font-bold leading-none cursor-pointer flex items-center justify-center space-x-1"
                  >
                    <span>Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
