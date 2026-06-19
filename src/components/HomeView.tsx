import { ChevronRight, ArrowRight, Sparkles, TrendingUp, ShieldCheck, Percent, Flame, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface HomeViewProps {
  products: Product[];
  setActivePage: (page: string) => void;
  setSelectedCategory: (category: string) => void;
  onAddToCart: (product: Product, size: number, color: { name: string; hex: string }) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onViewProductDetails: (productId: string) => void;
}

const CATEGORY_PANS = [
  {
    name: 'Sneakers',
    tagline: 'Definitive Street Culture',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600',
    color: 'from-orange-500/20 to-neutral-900/40'
  },
  {
    name: 'Running',
    tagline: 'Engineered Velocity',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    color: 'from-blue-500/20 to-neutral-900/40'
  },
  {
    name: 'Sports',
    tagline: 'Apex Court Agility',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600',
    color: 'from-emerald-500/20 to-neutral-900/40'
  },
  {
    name: 'Casual',
    tagline: 'Relaxed Daily Trajectory',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=600',
    color: 'from-purple-500/20 to-neutral-900/40'
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Marathon Runner',
    rating: 5,
    quote: "The Ultraboost Sonic Wave is like sprinting on whipped clouds. I shaved two whole minutes off my 10k time on the literal first run. Sizing guide is pinpoint accurate!",
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 2,
    name: 'Marcus Vance',
    role: 'Sneaker Collector',
    rating: 5,
    quote: "SoleArcade is easily my top-tier online marketplace now. Pristine customer packaging, fast tracked shipping, and the Retro Legend Jordan design is completely authentic. Zero flaws.",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Crossfit Coach',
    rating: 5,
    quote: "Absolutely outstanding breathability and side-wall stabilization on the Apex Runner. SoleArcade handles exchanges seamlessly. Incredible interface!",
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
  }
];

export default function HomeView({
  products,
  setActivePage,
  setSelectedCategory,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onViewProductDetails,
}: HomeViewProps) {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const sales = products.filter((p) => p.discountPrice).slice(0, 4);

  const handleCategoryNav = (cat: string) => {
    setSelectedCategory(cat);
    setActivePage('products');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div id="home-view-container" className="space-y-16 sm:space-y-24">
      {/* Hero Banner Section */}
      <section id="hero-banner" className="relative bg-neutral-950 text-white rounded-3xl overflow-hidden min-h-[500px] lg:min-h-[600px] flex items-center">
        {/* Overlay Graphic Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/home_hero_sneaker_1781849534688.jpg"
            alt="Futuristic Sneaker Banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-lighten scale-102 filter brightness-[0.7] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Promo Chip */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 hover:bg-white/15 border border-white/10 rounded-full text-xs font-semibold tracking-wider text-orange-400 font-sans backdrop-blur-md uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIMITED DROPS SECURED</span>
            </div>

            {/* Hero Main Heading */}
            <h1 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05] max-w-2xl">
              STEP IN. <br />
              <span className="text-orange-500 font-extrabold">DEFY DRAFT.</span>
            </h1>

            {/* Description */}
            <p className="font-sans text-sm sm:text-base text-neutral-400 max-w-lg leading-relaxed font-light">
              We curate premium footwear archives featuring responsive athletics and supreme streetwear design credentials. Level up your daily trajectory today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                id="hero-shop-cta"
                onClick={() => {
                  setSelectedCategory('All');
                  setActivePage('products');
                }}
                className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold flex items-center space-x-2 transition-all shadow-lg shadow-orange-500/20 active:scale-95 cursor-pointer"
              >
                <span>Browse the Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="hero-promo-cta"
                onClick={() => handleCategoryNav('Sneakers')}
                className="px-6 py-3.5 bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 rounded-xl text-sm font-semibold transition-all backdrop-blur-sm active:scale-95 cursor-pointer"
              >
                <span>View Hot Sneakers</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/10 max-w-md">
              <div>
                <dt className="text-xl sm:text-2xl font-bold font-display text-white">40k+</dt>
                <dd className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider mt-1">Shoes Shipped</dd>
              </div>
              <div>
                <dt className="text-xl sm:text-2xl font-bold font-display text-white">4.8★</dt>
                <dd className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider mt-1">Average Star Rating</dd>
              </div>
              <div>
                <dt className="text-xl sm:text-2xl font-bold font-display text-white">100%</dt>
                <dd className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider mt-1">Authentic Guarantee</dd>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers & Flash Sales Bar */}
      <section id="flash-sale-bar" className="bg-orange-50 border border-orange-100 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white shrink-0">
            <Percent className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h3 className="font-display font-medium text-neutral-900 text-base">EXCLUSIVE MEMBERS DISCOUNTS</h3>
            <p className="text-xs text-neutral-600 mt-1">Use voucher code <strong className="text-orange-600 tracking-wide font-mono px-1.5 py-0.5 bg-orange-100 rounded">SOLE15</strong> to unlock 15% discount on checkout.</p>
          </div>
        </div>
        <button
          id="flash-sale-btn"
          onClick={() => setActivePage('products')}
          className="px-5 py-3 bg-neutral-950 hover:bg-neutral-900 text-white font-semibold text-xs rounded-xl flex items-center space-x-1 transition-colors scale-100 active:scale-95 cursor-pointer"
        >
          <span>Apply and Shop Now</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </section>

      {/* Interactive Category Panels */}
      <section id="categories-grid" className="space-y-6">
        <div className="flex items-end justify-between">
          <div className="text-left space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-orange-500 font-semibold uppercase tracking-wider">
              <Flame className="w-4 h-4" />
              <span>Explore Moods</span>
            </div>
            <h2 className="font-display font-medium text-2xl sm:text-3xl text-neutral-900 tracking-tight">SHOP BY CATEGORY</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORY_PANS.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryNav(cat.name)}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all"
            >
              {/* Background Cover */}
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-neutral-800/20`} />
              <div className="absolute inset-0 bg-black/30 opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Text content */}
              <div className="absolute inset-x-0 bottom-0 p-5 text-left text-white z-10 flex flex-col justify-end">
                <span className="text-[10px] font-semibold text-orange-400 uppercase tracking-widest">{cat.tagline}</span>
                <h3 className="font-display font-semibold text-xl tracking-tight text-white mt-1">{cat.name}</h3>
                <div className="flex items-center space-x-1 text-xs font-semibold text-white/95 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explore Brands</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section id="featured-products" className="space-y-6">
        <div className="flex items-end justify-between">
          <div className="text-left space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-orange-500 font-semibold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Verified Hot Picks</span>
            </div>
            <h2 className="font-display font-medium text-2xl sm:text-3xl text-neutral-900 tracking-tight">FEATURED SHOES</h2>
          </div>
          <button
            id="view-all-featured"
            onClick={() => {
              setSelectedCategory('All');
              setActivePage('products');
            }}
            className="text-neutral-900 font-semibold text-xs tracking-wide flex items-center space-x-1 group hover:text-orange-500 transition-colors cursor-pointer"
          >
            <span>View All Shoes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProductDetails}
              onAddToCart={onAddToCart}
              isWishlisted={wishlist.some((w) => w.id === product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* Special Highlights Section: Promo / Flash Shoes */}
      <section id="hot-discounted-showcase" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div id="left-highlight-panel" className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col justify-between space-y-8 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-20 translate-x-[20%] translate-y-[20%] w-80 h-80 rounded-full border border-orange-500/30" />
          <div className="space-y-4">
            <div className="inline-block px-2.5 py-1 text-[10px] bg-sky-500 text-white font-bold rounded-md uppercase font-display tracking-widest leading-none">
              ATHLETIC EXCELLENCE
            </div>
            <h3 className="font-display font-medium text-2xl sm:text-3xl tracking-tight text-white leading-snug">
              Running High: Advanced <br />Carbon Fast-Plate Technology
            </h3>
            <p className="text-xs text-neutral-400 max-w-sm font-light leading-relaxed">
              Propel your feet forward with performance-grade sneakers built to cushion critical leg impacts and stimulate energy transfers.
            </p>
          </div>
          <button
            id="trail-cta-btn"
            onClick={() => handleCategoryNav('Running')}
            className="self-start px-5 py-3 bg-white text-neutral-950 hover:bg-neutral-100 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <span>Browse Running Selection</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div id="right-highlight-panel" className="bg-neutral-100 rounded-3xl p-8 sm:p-12 flex flex-col justify-between space-y-8 relative overflow-hidden">
          <div className="absolute left-0 bottom-0 opacity-15 -translate-x-[20%] translate-y-[20%] w-80 h-80 rounded-full border border-neutral-900/20" />
          <div className="space-y-4">
            <div className="inline-block px-2.5 py-1 text-[10px] bg-red-500 text-white font-bold rounded-md uppercase font-display tracking-widest leading-none">
              SUMMER PRICE DROP
            </div>
            <h3 className="font-display font-medium text-2xl sm:text-3xl tracking-tight text-neutral-900 leading-snug">
              Hot Styles Under Reductions. <br />Up to 25% Off Storewide.
            </h3>
            <p className="text-xs text-neutral-600 max-w-sm font-light leading-relaxed">
              Grab premium leather boots, suede platform runners, or everyday casual essentials at discounted seasonal values.
            </p>
          </div>
          <button
            id="sales-cta-btn"
            onClick={() => {
              setSelectedCategory('All');
              setActivePage('products');
            }}
            className="self-start px-5 py-3 bg-neutral-950 text-white hover:bg-neutral-900 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <span>See Sale Shoes</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Customer Trust Review Block */}
      <section id="reviews-section" className="bg-neutral-50 rounded-2xl p-8 sm:p-12 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <div className="justify-center inline-flex items-center space-x-1 px-3 py-1 bg-neutral-200/50 rounded-full text-[10px] font-bold text-neutral-600 uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
            <span>AUTHENTIC CLIENT FEEDBACK</span>
          </div>
          <h2 className="font-display font-medium text-2xl sm:text-3xl text-neutral-900 tracking-tight">KUDOS FROM THE COMMUNE</h2>
          <p className="text-xs text-neutral-500">Read verified sneaker reviews submitted directly from active athletes and streetwear enthusiasts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((review) => (
            <div key={review.id} className="bg-white rounded-xl p-5 border border-neutral-100 shadow-sm flex flex-col justify-between space-y-4">
              <div className="text-left space-y-2">
                <div className="flex space-x-0.5">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-light italic">
                  "{review.quote}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-2.5 border-t border-neutral-50 text-left">
                <img
                  src={review.avatar}
                  alt={review.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover shadow-inner"
                />
                <div>
                  <h4 className="text-xs font-bold text-neutral-800 font-sans">{review.name}</h4>
                  <p className="text-[10px] text-neutral-400 font-medium">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
