import { useState, useRef, useEffect, FormEvent } from 'react';
import { Search, Heart, ShoppingCart, Menu, X, Footprints } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openCartDrawer: () => void;
}

export default function Navbar({
  activePage,
  setActivePage,
  cartCount,
  wishlistCount,
  searchQuery,
  setSearchQuery,
  openCartDrawer,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: string) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  };

  const executeSearch = (e: FormEvent) => {
    e.preventDefault();
    setActivePage('products');
  };

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div
            id="brand-logo"
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-white transition-transform group-hover:scale-105">
              <Footprints className="w-5 h-5 text-orange-500" />
            </div>
            <span className="hidden sm:block font-display font-medium text-xl tracking-tight text-neutral-900">
              SOLE<span className="text-orange-500 font-bold">ARCADE</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex space-x-8 font-sans text-sm font-medium">
            <button
              id="nav-btn-home"
              onClick={() => handleNavClick('home')}
              className={`transition-colors py-2 relative ${
                activePage === 'home' ? 'text-orange-500' : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              Home
              {activePage === 'home' && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                />
              )}
            </button>
            <button
              id="nav-btn-products"
              onClick={() => handleNavClick('products')}
              className={`transition-colors py-2 relative ${
                activePage === 'products' ? 'text-orange-500' : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              Shop Shoes
              {activePage === 'products' && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                />
              )}
            </button>
            <button
              id="nav-btn-about"
              onClick={() => handleNavClick('about')}
              className={`transition-colors py-2 relative ${
                activePage === 'about' ? 'text-orange-500' : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              About & Contact
              {activePage === 'about' && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                />
              )}
            </button>
          </nav>

          {/* Search, Wishlist, Cart, Mobile menu */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Bar */}
            <form onSubmit={executeSearch} className="relative hidden max-w-xs sm:block">
              <input
                id="navbar-search-input"
                ref={searchInputRef}
                type="text"
                placeholder="Search shoes by brand..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activePage !== 'products') {
                    setActivePage('products');
                  }
                }}
                className="w-48 xl:w-60 pl-9 pr-4 py-2 border border-neutral-200 rounded-full text-xs font-sans tracking-wide bg-neutral-50/50 hover:bg-neutral-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-neutral-400"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            </form>

            {/* Mobile Search Icon Trigger */}
            <button
              id="toggle-mobile-search"
              onClick={() => {
                setActivePage('products');
                setTimeout(() => searchInputRef.current?.focus(), 150);
              }}
              className="p-2 text-neutral-600 hover:text-orange-500 sm:hidden transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              id="navbar-wishlist-btn"
              onClick={() => handleNavClick('products')}
              className="p-2 text-neutral-600 hover:text-orange-500 relative transition-colors"
              title="View Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-orange-500 text-orange-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold text-white bg-orange-500 rounded-full flex items-center justify-center scale-95 leading-none">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              id="navbar-cart-btn"
              onClick={openCartDrawer}
              className="p-2 text-neutral-600 hover:text-orange-500 relative transition-colors"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold text-white bg-black rounded-full flex items-center justify-center scale-95 leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-600 hover:text-neutral-900 md:hidden transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-100 bg-white shadow-inner overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3 font-sans font-medium text-sm">
              <button
                id="mob-nav-home"
                onClick={() => handleNavClick('home')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  activePage === 'home' ? 'bg-orange-50 text-orange-600' : 'text-neutral-600 hover:bg-neutral-55 hover:text-neutral-900'
                }`}
              >
                Home
              </button>
              <button
                id="mob-nav-products"
                onClick={() => handleNavClick('products')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  activePage === 'products' ? 'bg-orange-50 text-orange-600' : 'text-neutral-600 hover:bg-neutral-55 hover:text-neutral-900'
                }`}
              >
                Shop Shoes
              </button>
              <button
                id="mob-nav-about"
                onClick={() => handleNavClick('about')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  activePage === 'about' ? 'bg-orange-50 text-orange-600' : 'text-neutral-600 hover:bg-neutral-55 hover:text-neutral-900'
                }`}
              >
                About & Contact
              </button>

              {/* Mobile Search */}
              <div className="pt-2 px-3">
                <div className="relative">
                  <input
                    id="mobile-search-input"
                    type="text"
                    placeholder="Search shoes by brand..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-xs"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
