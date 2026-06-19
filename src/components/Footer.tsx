import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronRight, RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  setActivePage: (page: string) => void;
  setSelectedCategory?: (category: string) => void;
}

export default function Footer({ setActivePage, setSelectedCategory }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleCategoryClick = (category: string) => {
    if (setSelectedCategory) {
      setSelectedCategory(category);
    }
    setActivePage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-neutral-950 text-neutral-400 mt-16 border-t border-neutral-900">
      {/* Advantages banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-900 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="p-3 bg-neutral-900 rounded-xl text-orange-500">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">Free Express Shipping</h4>
              <p className="text-xs text-neutral-500 mt-1">On all orders above $150 with prompt tracking delivery.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="p-3 bg-neutral-900 rounded-xl text-orange-500">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">30-Day Easy Returns</h4>
              <p className="text-xs text-neutral-500 mt-1">Return or exchange any shoe in protective packaging, hassle free.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="p-3 bg-neutral-900 rounded-xl text-orange-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">100% Genuine Guarantee</h4>
              <p className="text-xs text-neutral-500 mt-1">All products are sourced directly from verified official manufacturers.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand block */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-neutral-950 font-bold shrink-0">
                S
              </div>
              <span className="font-display font-medium text-lg tracking-tight text-white">
                SOLE<span className="text-orange-500">ARCADE</span>
              </span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Curating the ultimate footwear library. Built for daily speed, pristine luxury, and performance lifestyle. Match your stride.
            </p>
            <div className="pt-2 text-xs text-neutral-500 space-y-2">
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span>129 Ocean Drive, Suite 400, Miami, FL</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+1 (800) 555-SOLE</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>support@solearcade.com</span>
              </div>
            </div>
          </div>

          {/* Categories list */}
          <div>
            <h4 className="text-white font-display font-medium text-sm tracking-wide uppercase mb-5">Categories</h4>
            <ul className="space-y-3 text-xs">
              {['Sneakers', 'Running', 'Casual', 'Sports', 'Formal', 'Kids'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="hover:text-white transition-colors flex items-center group cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 mr-1 text-neutral-700 group-hover:text-orange-500 transition-colors" />
                    {cat} Shoes
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care list */}
          <div>
            <h4 className="text-white font-display font-medium text-sm tracking-wide uppercase mb-5">Customer Care</h4>
            <ul className="space-y-3 text-xs">
              {['Track Your Order', 'Return Policy', 'Store Locations', 'Size Guide Details', 'Payment Info', 'FAQs & Help'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      setActivePage('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors flex items-center group cursor-pointer text-left"
                  >
                    <ChevronRight className="w-3 h-3 mr-1 text-neutral-700 group-hover:text-orange-500 transition-colors" />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h4 className="text-white font-display font-medium text-sm tracking-wide uppercase">Join the Club</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Unlock exclusive shoe drop notifications, early sale accesses, and get **$15 off** your first premium checkout.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="relative">
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 bg-neutral-900 border border-neutral-800 text-xs rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors placeholder:text-neutral-600"
                />
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md flex items-center justify-center transition-colors"
                  title="Subscribe"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>

            <AnimatePresence>
              {subscribed && (
                <motion.div
                  id="newsletter-success-toast"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center space-x-2 text-green-500 bg-green-950/40 p-2.5 border border-green-900/50 rounded-lg text-xs"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed! Check your inbox for $15 discount.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="border-t border-neutral-900 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-600">
          <p>© 2026 SoleArcade. Built for modern sneaker-heads and running athletes. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span className="hover:text-neutral-500 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-500 cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-500 cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
