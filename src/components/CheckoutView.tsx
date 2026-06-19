import { useState, FormEvent } from 'react';
import { CreditCard, Lock, ShieldCheck, CheckCircle2, ArrowLeft, AlertCircle, ShoppingBag, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutViewProps {
  cartItems: CartItem[];
  onBackToCart: () => void;
  onClearCart: () => void;
  onOrderCompleted: () => void;
  promoApplied: boolean;
  setActivePage: (page: string) => void;
}

export default function CheckoutView({
  cartItems,
  onBackToCart,
  onClearCart,
  onOrderCompleted,
  promoApplied,
  setActivePage,
}: CheckoutViewProps) {
  // Form coordinates
  const [form, setForm] = useState<OrderDetails>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [validationError, setValidationError] = useState('');

  // Computations
  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product.discountPrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const discountValue = promoApplied ? subtotal * 0.15 : 0;
  const shippingThreshold = 150;
  const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 12;
  const grandTotal = subtotal - discountValue + shippingCost;

  // Form input handler
  const handleInputChange = (field: keyof OrderDetails, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setValidationError('');
  };

  const validateForm = () => {
    if (!form.email || !form.firstName || !form.lastName || !form.address || !form.city || !form.zipCode || !form.phone || !form.cardNumber || !form.cardExpiry || !form.cardCvc) {
      return 'Please populate all the delivery and secure checkout card details.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      return 'Please enter a valid email address.';
    }
    if (form.cardNumber.replace(/\s+/g, '').length < 16) {
      return 'The card number must contain at least 16 digits.';
    }
    if (form.cardCvc.length < 3) {
      return 'Card CVV is invalid.';
    }
    return '';
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setValidationError(error);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Enter loading animation flow
    setLoading(true);
    setLoadingStep('Securing payment link...');

    setTimeout(() => {
      setLoadingStep('Verifying card coordinates with local issuer bank...');
    }, 1500);

    setTimeout(() => {
      setLoadingStep('Reserving stock and printing delivery label...');
    }, 3000);

    setTimeout(() => {
      setLoading(false);
      setIsCompleted(true);
      const generatedId = `SA-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      onClearCart();
      onOrderCompleted();
    }, 4500);
  };

  return (
    <div id="checkout-view-wrapper" className="max-w-6xl mx-auto space-y-8 text-neutral-800">
      {/* Checkout Transition Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            id="checkout-loading-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-50 flex flex-col items-center justify-center text-center p-6 text-white"
          >
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-6" />
            <h2 className="font-display font-medium text-xl tracking-tight text-white uppercase">AUTHORIZING PURCHASE</h2>
            <p className="text-xs text-neutral-400 mt-2 max-w-sm tracking-wide font-mono">
              {loadingStep}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isCompleted ? (
          /* Main Billing & Summary columns */
          <motion.div
            id="billing-flow-columns"
            key="checkout-form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
          >
            {/* Left form block column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Heading */}
              <div className="flex items-center space-x-3 pb-3 border-b border-neutral-100">
                <button
                  id="checkout-back-to-cart-btn"
                  onClick={onBackToCart}
                  className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-550 hover:text-neutral-900 transition-colors cursor-pointer"
                  title="Back to Shopping Cart"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="text-left">
                  <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest font-sans">Level up your footwear</span>
                  <h1 className="font-display font-semibold text-2xl tracking-tight text-neutral-900">
                    SECURE CHECKOUT
                  </h1>
                </div>
              </div>

              {/* Validation alert banner */}
              {validationError && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center space-x-2.5 font-medium animate-bounce">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Core form */}
              <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                {/* Section A: Shipping contact info */}
                <div className="space-y-4">
                  <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-neutral-500">
                     Customer Contact
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-600 mb-1.5 font-sans uppercase">
                        Email Address (for Receipt) *
                      </label>
                      <input
                        id="checkout-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="e.g., james@runner.com"
                        className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Section B: Delivery specifics */}
                <div className="space-y-4">
                  <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-neutral-500 pt-2 border-t border-neutral-50">
                     Shipping Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-600 mb-1.5 uppercase font-sans">
                        First Name *
                      </label>
                      <input
                        id="checkout-firstname"
                        type="text"
                        required
                        value={form.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="James"
                        className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-600 mb-1.5 uppercase font-sans">
                        Last Name *
                      </label>
                      <input
                        id="checkout-lastname"
                        type="text"
                        required
                        value={form.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Miller"
                        className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-neutral-600 mb-1.5 uppercase font-sans">
                        Street Address *
                      </label>
                      <input
                        id="checkout-address"
                        type="text"
                        required
                        value={form.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="167 Central Boulevard, Apt 4C"
                        className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-600 mb-1.5 uppercase font-sans">
                        City *
                      </label>
                      <input
                        id="checkout-city"
                        type="text"
                        required
                        value={form.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="New York"
                        className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-600 mb-1.5 uppercase font-sans">
                        Zip / Postal Code *
                      </label>
                      <input
                        id="checkout-zipcode"
                        type="text"
                        required
                        value={form.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        placeholder="10001"
                        className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-neutral-600 mb-1.5 uppercase font-sans">
                        Phone Contact (for Courier) *
                      </label>
                      <input
                        id="checkout-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 732-2342"
                        className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Section C: Secure payment */}
                <div className="space-y-4">
                  <div className="pb-2 border-t border-neutral-50 pt-3 flex items-center justify-between">
                    <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-neutral-500">
                       Safe payment details
                    </h3>
                    <div className="flex items-center space-x-1 text-[10px] font-bold text-green-600">
                      <Lock className="w-3.5 h-3.5 mr-0.5" />
                      <span>256-BIT SSL SECURED</span>
                    </div>
                  </div>

                  <div className="bg-neutral-50/50 p-4 border border-neutral-100 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-bold text-neutral-600 mb-1.5 uppercase font-sans">
                        Credit Card String *
                      </label>
                      <div className="relative">
                        <input
                          id="checkout-cardnumber"
                          type="text"
                          required
                          value={form.cardNumber}
                          onChange={(e) => {
                            // Quick trim of alphabet strings & strip spacing
                            const numbers = e.target.value.replace(/\D/g, '').slice(0, 16);
                            // Format 1234 5678 ...
                            const matched = numbers.match(/.{1,4}/g);
                            const formatted = matched ? matched.join(' ') : '';
                            handleInputChange('cardNumber', formatted);
                          }}
                          placeholder="4111 8299 7234 1100"
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs tracking-widest focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                        <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-neutral-600 mb-1.5 uppercase font-sans">
                        Expiration (MM/YY) *
                      </label>
                      <input
                        id="checkout-expiry"
                        type="text"
                        required
                        value={form.cardExpiry}
                        onChange={(e) => {
                          const sanitized = e.target.value.replace(/\D/g, '').slice(0, 4);
                          if (sanitized.length > 2) {
                            handleInputChange('cardExpiry', `${sanitized.slice(0, 2)}/${sanitized.slice(2)}`);
                          } else {
                            handleInputChange('cardExpiry', sanitized);
                          }
                        }}
                        placeholder="11/28"
                        className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 text-center"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-600 mb-1.5 uppercase font-sans">
                        CVV / CVC *
                      </label>
                      <input
                        id="checkout-cvv"
                        type="password"
                        required
                        maxLength={4}
                        value={form.cardCvc}
                        onChange={(e) => {
                          const sanitized = e.target.value.replace(/\D/g, '').slice(0, 4);
                          handleInputChange('cardCvc', sanitized);
                        }}
                        placeholder="***"
                        className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 text-center font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Authorize action */}
                <button
                  id="checkout-submit-btn"
                  type="submit"
                  className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-97 cursor-pointer"
                >
                  Authorize Payment of ${grandTotal.toFixed(0)} Securely
                </button>
              </form>
            </div>

            {/* Right Summary details Column */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              {/* Checkout summaries panel */}
              <div className="bg-neutral-50/50 border border-neutral-100 rounded-2xl p-6 space-y-5">
                <h3 className="font-display font-semibold text-sm tracking-wide text-neutral-900 border-b border-neutral-100 pb-3 uppercase">
                   Your Order Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)} items)
                </h3>

                {/* Mini row units */}
                <div className="max-h-72 overflow-y-auto space-y-3.5 pr-1">
                  {cartItems.map((item) => {
                    const price = item.product.discountPrice || item.product.price;
                    return (
                      <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 object-cover object-center rounded border border-neutral-200/50 bg-white"
                          />
                          <div>
                            <h4 className="font-semibold text-neutral-800 truncate max-w-44 leading-tight">{item.product.name}</h4>
                            <p className="text-[10px] text-neutral-450 mt-0.5">Size {item.selectedSize} | {item.selectedColor.name} | Qty {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-semibold font-sans text-neutral-800">${price * item.quantity}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Cash breakdowns */}
                <div className="border-t border-neutral-100 pt-4.5 space-y-3 text-xs">
                  <div className="flex justify-between text-neutral-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-neutral-800 font-sans">${subtotal.toFixed(0)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Voucher Discount (SOLE15 applied)</span>
                      <span className="font-bold font-sans">-${discountValue.toFixed(0)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-500 pb-3 border-b border-neutral-100">
                    <span>Express Cargo Shipping</span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600 font-bold uppercase font-sans">FREE</span>
                    ) : (
                      <span className="font-semibold text-neutral-800 font-sans">${shippingCost}</span>
                    )}
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-neutral-800">Final Order Invoice</span>
                    <span className="font-extrabold text-neutral-950 font-sans text-base">${grandTotal.toFixed(0)}</span>
                  </div>
                </div>

                {/* Shield note description */}
                <div className="flex items-start space-x-2.5 p-3 bg-white border border-neutral-100 rounded-xl text-[10px] text-neutral-500 leading-normal">
                  <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Authorized elements are sealed with SHA-256 standard cryptographic wraps. We preserve credit profiles securely.</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* SECTION E: Animated Full screen receipt success! */
          <motion.div
            id="checkout-success-view"
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-white border border-neutral-200 p-8 sm:p-10 rounded-3xl text-center shadow-lg space-y-8"
          >
            {/* Visual Success Shield */}
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto border-2 border-green-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                CHARGE AUTHORIZED SUCCESSFULLY
              </span>
              <h2 className="font-display font-medium text-2xl sm:text-3xl tracking-tight text-neutral-900 mt-2">
                YOUR ORDER IS CONFIRMED!
              </h2>
              <p className="text-xs text-neutral-500">
                You step has been logged. Thank you for shopping with SoleArcade!
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-5 text-left text-xs space-y-3.5">
              <div className="flex justify-between text-[11px] font-mono text-neutral-450 border-b border-neutral-150 pb-2.5">
                <span>ORDER REF NUMBER</span>
                <span className="font-bold text-neutral-800">{orderId}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-neutral-600">
                  <span>Ship To</span>
                  <span className="font-semibold text-neutral-800">
                    {form.firstName} {form.lastName}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Target Address</span>
                  <span className="font-semibold text-neutral-800 truncate max-w-[200px]" title={form.address}>
                    {form.address}, {form.city}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Phone Coordination</span>
                  <span className="font-semibold text-neutral-800">{form.phone}</span>
                </div>
              </div>

              <div className="border-t border-neutral-150 pt-2.5 flex justify-between font-bold text-sm text-neutral-850">
                <span>Total Amount Charged</span>
                <span className="font-sans text-orange-500 font-extrabold">${grandTotal.toFixed(0)}</span>
              </div>
            </div>

            {/* Little logistics notice */}
            <div className="flex items-center space-x-3 p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-left text-blue-800 text-[10px] leading-relaxed">
              <Truck className="w-5 h-5 text-blue-600 shrink-0" />
              <span>We've generated your custom postal tracking code and sent a detailed invoice copy to <strong className="font-extrabold">{form.email}</strong>. See you soon!</span>
            </div>

            {/* Actions returning home */}
            <button
              id="success-back-to-shop-btn"
              onClick={() => {
                setActivePage('home');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="w-full py-4.5 bg-neutral-900 hover:bg-neutral-950 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-97 cursor-pointer"
            >
              Back to Home Homepage
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
