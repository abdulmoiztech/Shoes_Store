import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ProductsView from './components/ProductsView';
import ProductDetailView from './components/ProductDetailView';
import CartView from './components/CartView';
import CartDrawer from './components/CartDrawer';
import CheckoutView from './components/CheckoutView';
import AboutContactView from './components/AboutContactView';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';

export default function App() {
  // Navigation / Views Routing
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Search and Category Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Dynamic store stock state (so purchases decrease stock in real-time!)
  const [storeProducts, setStoreProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('solearcade_inventory');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  // Cart State (Hydrated from LocalStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('solearcade_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist State (Hydrated from LocalStorage)
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('solearcade_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // UI Drawer State
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [promoApplied, setPromoApplied] = useState<boolean>(false);

  // Sync to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem('solearcade_inventory', JSON.stringify(storeProducts));
  }, [storeProducts]);

  useEffect(() => {
    localStorage.setItem('solearcade_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('solearcade_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Scroll to top on page switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activePage, selectedProductId]);

  // Active Product Lookup
  const activeProduct = storeProducts.find((p) => p.id === selectedProductId) || null;

  // Lookup related products (exclude active product, match category)
  const relatedProducts = activeProduct
    ? storeProducts.filter((p) => p.category === activeProduct.category && p.id !== activeProduct.id)
    : [];

  // Add to Cart handler
  const handleAddToCart = (product: Product, size: number, color: { name: string; hex: string }, quantity: number = 1) => {
    setCart((prev) => {
      const cartItemId = `${product.id}-${size}-${color.name}`;
      const existingItemidx = prev.findIndex((item) => item.id === cartItemId);

      if (existingItemidx > -1) {
        const updated = [...prev];
        const newQty = updated[existingItemidx].quantity + quantity;
        // Cap quantity at product stock limit
        updated[existingItemidx].quantity = Math.min(newQty, product.stock);
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            selectedSize: size,
            selectedColor: color,
            quantity: Math.min(quantity, product.stock),
          },
        ];
      }
    });

    // Toggle mini drawer open to give clear user visual feedback
    setIsCartDrawerOpen(true);
  };

  // Adjust quantity helper inside cart
  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null; // prepare for filtering
            return {
              ...item,
              quantity: Math.min(newQty, item.product.stock),
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  // Remove individual item from cart
  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Toggles item inside saved wishlist
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // Quick "Buy Now" handler
  const handleBuyNow = (product: Product, size: number, color: { name: string; hex: string }) => {
    // Add to cart with quantity 1
    setCart((prev) => {
      const cartItemId = `${product.id}-${size}-${color.name}`;
      const existingidx = prev.findIndex((item) => item.id === cartItemId);

      if (existingidx > -1) {
        return prev;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            selectedSize: size,
            selectedColor: color,
            quantity: 1,
          },
        ];
      }
    });

    // Close drawers and route directly to secure checkout
    setIsCartDrawerOpen(false);
    setActivePage('checkout');
  };

  // Subtract stock from store catalog upon successful order settlement
  const handleOrderCompleted = () => {
    setStoreProducts((prevProducts) => {
      return prevProducts.map((p) => {
        // Find matching cart item
        const soldQuantity = cart
          .filter((item) => item.product.id === p.id)
          .reduce((sum, item) => sum + item.quantity, 0);

        if (soldQuantity > 0) {
          return {
            ...p,
            stock: Math.max(0, p.stock - soldQuantity),
          };
        }
        return p;
      });
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div id="full-app-root" className="min-h-screen bg-slate-50 flex flex-col font-sans select-none antialiased">
      {/* Sticky Top Header Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          setSelectedProductId(null);
        }}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        wishlistCount={wishlist.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openCartDrawer={() => setIsCartDrawerOpen(true)}
      />

      {/* Main Page Slide Viewport with Framer Motion AnimatePresence */}
      <main id="main-viewport-content" className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {/* Detailed Product info View */}
          {activeProduct ? (
            <motion.div
              key={`details-${activeProduct.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <ProductDetailView
                product={activeProduct}
                relatedProducts={relatedProducts}
                onBackToCatalogue={() => {
                  setSelectedProductId(null);
                  setActivePage('products');
                }}
                onAddToCart={handleAddToCart}
                isWishlisted={wishlist.some((w) => w.id === activeProduct.id)}
                onToggleWishlist={handleToggleWishlist}
                onViewProductDetails={(id) => {
                  setSelectedProductId(id);
                }}
                onBuyNow={handleBuyNow}
              />
            </motion.div>
          ) : activePage === 'home' ? (
            /* Home Page View */
            <motion.div
              key="view-home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <HomeView
                products={storeProducts}
                setActivePage={setActivePage}
                setSelectedCategory={setSelectedCategory}
                onAddToCart={handleAddToCart}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onViewProductDetails={(id) => {
                  setSelectedProductId(id);
                }}
              />
            </motion.div>
          ) : activePage === 'products' ? (
            /* Products Listing Grid Page View */
            <motion.div
              key="view-products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProductsView
                products={storeProducts}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onAddToCart={handleAddToCart}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onViewProductDetails={(id) => {
                  setSelectedProductId(id);
                }}
              />
            </motion.div>
          ) : activePage === 'cart' ? (
            /* Shoppers Cart View */
            <motion.div
              key="view-cart"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <CartView
                cartItems={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onProceedToCheckout={() => setActivePage('checkout')}
                onContinueShopping={() => {
                  setActivePage('products');
                  setSelectedCategory('All');
                }}
                promoApplied={promoApplied}
                setPromoApplied={setPromoApplied}
              />
            </motion.div>
          ) : activePage === 'checkout' ? (
            /* Secure Checkout Page View */
            <motion.div
              key="view-checkout"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <CheckoutView
                cartItems={cart}
                onBackToCart={() => setActivePage('cart')}
                onClearCart={handleClearCart}
                onOrderCompleted={handleOrderCompleted}
                promoApplied={promoApplied}
                setActivePage={setActivePage}
              />
            </motion.div>
          ) : activePage === 'about' ? (
            /* About / Contact Details Page View */
            <motion.div
              key="view-about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <AboutContactView />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Slide out Cart Drawer Element */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCart={() => setActivePage('cart')}
        onProceedToCheckout={() => setActivePage('checkout')}
      />

      {/* Main Footer Block */}
      <Footer setActivePage={setActivePage} setSelectedCategory={setSelectedCategory} />
    </div>
  );
}
