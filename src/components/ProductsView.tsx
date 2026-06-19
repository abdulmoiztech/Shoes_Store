import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Grid3X3, List, RefreshCw, Heart, Info, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, FilterState } from '../types';
import { BRANDS, CATEGORIES, SIZES, COLORS } from '../data/products';
import ProductCard from './ProductCard';

interface ProductsViewProps {
  products: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onAddToCart: (product: Product, size: number, color: { name: string; hex: string }) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onViewProductDetails: (productId: string) => void;
}

export default function ProductsView({
  products,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onViewProductDetails,
}: ProductsViewProps) {
  // Filters State
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(250);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [showWishlistedOnly, setShowWishlistedOnly] = useState<boolean>(false);

  // Toggle helpers
  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleGenderToggle = (gender: string) => {
    setSelectedGenders((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  const handleSizeToggle = (size: number) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedGenders([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedCategory('All');
    setMaxPrice(250);
    setSearchQuery('');
    setSortBy('featured');
    setShowWishlistedOnly(false);
  };

  // Live filter computation
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Wishlist Only
    if (showWishlistedOnly) {
      result = result.filter((p) => wishlist.some((w) => w.id === p.id));
    }

    // Category
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Search Query (Name/Brand/Category)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Brands
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // Genders
    if (selectedGenders.length > 0) {
      result = result.filter((p) => selectedGenders.includes(p.gender));
    }

    // Sizes
    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((sz) => selectedSizes.includes(sz)));
    }

    // Colors
    if (selectedColors.length > 0) {
      result = result.filter((p) => p.colors.some((col) => selectedColors.includes(col.name)));
    }

    // Price
    result = result.filter((p) => {
      const activePrice = p.discountPrice || p.price;
      return activePrice <= maxPrice;
    });

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // 'featured' - sort featured/bestSeller to top, otherwise preserves original order
      result.sort((a, b) => {
        const scoreA = (a.featured ? 2 : 0) + (a.bestSeller ? 1 : 0);
        const scoreB = (b.featured ? 2 : 0) + (b.bestSeller ? 1 : 0);
        return scoreB - scoreA;
      });
    }

    return result;
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedBrands,
    selectedGenders,
    selectedSizes,
    selectedColors,
    maxPrice,
    sortBy,
    showWishlistedOnly,
    wishlist,
  ]);

  return (
    <div id="catalog-page-container" className="space-y-6 sm:space-y-8 text-neutral-800">
      {/* Title & Page Indicators */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 border-b border-neutral-100">
        <div className="text-left space-y-1">
          <div className="text-xs text-orange-500 font-semibold tracking-wide uppercase font-sans">
            Archival Drops
          </div>
          <h1 className="font-display font-medium text-3xl text-neutral-900 tracking-tight">
            EXPLORE FOOTWEAR
          </h1>
          <p className="text-xs text-neutral-400">
            Showing <strong className="text-neutral-700">{filteredProducts.length}</strong> styles
          </p>
        </div>

        {/* Global Catalog Controls (Sort, Layout view, Sidebar toggle) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Wishlist only toggle */}
          <button
            id="toggle-wishlist-filter-btn"
            onClick={() => setShowWishlistedOnly(!showWishlistedOnly)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors border ${
              showWishlistedOnly
                ? 'bg-red-50 border-red-200 text-red-600'
                : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-600'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${showWishlistedOnly ? 'fill-red-500' : ''}`} />
            <span>Wishlist Only ({wishlist.length})</span>
          </button>

          {/* Sidebar Toggle */}
          <button
            id="toggle-filters-sidebar"
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors border ${
              showFilters
                ? 'bg-orange-50 border-orange-200 text-orange-600'
                : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-600'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          {/* Sort Menu */}
          <div className="relative flex items-center bg-white border border-neutral-200 rounded-xl px-2.5 py-1.5 focus-within:ring-1 focus-within:ring-orange-500">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400 mr-1.5" />
            <select
              id="catalog-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-0 text-xs font-semibold text-neutral-700 focus:outline-none pr-1 focus:ring-0 cursor-pointer"
            >
              <option value="featured">Best Matches</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>

          {/* Grid/List layout switcher */}
          <div className="hidden sm:flex items-center space-x-1 bg-neutral-100 p-1 rounded-xl">
            <button
              id="layout-grid-btn"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
              }`}
              title="Grid View"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              id="layout-list-btn"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'list' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Catalog Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filters Sidebar */}
        <AnimatePresence initial={false}>
          {showFilters && (
            <motion.aside
              id="sidebar-filters-panel"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:col-span-3 lg:block bg-neutral-50/50 border border-neutral-100 rounded-2xl p-5 lg:sticky lg:top-24 max-h-[85vh] overflow-y-auto space-y-6 text-left"
            >
              {/* Category selector row */}
              <div className="space-y-3 pb-4 border-b border-neutral-100">
                <h3 className="font-display font-semibold text-xs tracking-wider text-neutral-550 uppercase">
                  Shoe Category
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {['All', ...CATEGORIES].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        selectedCategory.toLowerCase() === category.toLowerCase()
                          ? 'bg-neutral-900 text-white'
                          : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100 shadow-sm'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter range */}
              <div className="space-y-3 pb-4 border-b border-neutral-100">
                <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-neutral-550">
                  <span>Price Limit</span>
                  <span className="text-orange-500 font-bold">${maxPrice}</span>
                </div>
                <input
                  id="filter-price-slider"
                  type="range"
                  min="40"
                  max="250"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-orange-500 bg-neutral-200 cursor-pointer h-1.5 rounded-full"
                />
                <div className="flex justify-between text-[10px] text-neutral-450 font-mono">
                  <span>Min: $40</span>
                  <span>Max: $250</span>
                </div>
              </div>

              {/* Brands filter */}
              <div className="space-y-3 pb-4 border-b border-neutral-100">
                <h3 className="font-display font-semibold text-xs tracking-wider text-neutral-550 uppercase">
                  Brands
                </h3>
                <div className="space-y-2">
                  {BRANDS.map((brand) => (
                    <label key={brand} className="flex items-center text-xs text-neutral-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="rounded border-neutral-300 text-orange-500 focus:ring-orange-500 mr-2.5 h-4 w-4"
                      />
                      <span className="font-medium">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender filters */}
              <div className="space-y-3 pb-4 border-b border-neutral-100">
                <h3 className="font-display font-semibold text-xs tracking-wider text-neutral-550 uppercase">
                  Gender / Age
                </h3>
                <div className="space-y-2">
                  {['Men', 'Women', 'Kids', 'Unisex'].map((gender) => (
                    <label key={gender} className="flex items-center text-xs text-neutral-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedGenders.includes(gender)}
                        onChange={() => handleGenderToggle(gender)}
                        className="rounded border-neutral-300 text-orange-500 focus:ring-orange-500 mr-2.5 h-4 w-4"
                      />
                      <span className="font-medium">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size selections */}
              <div className="space-y-3 pb-4 border-b border-neutral-100">
                <h3 className="font-display font-semibold text-xs tracking-wider text-neutral-550 uppercase">
                  Sizes (US)
                </h3>
                <div className="grid grid-cols-4 gap-1.5">
                  {SIZES.map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeToggle(size)}
                        className={`py-2 text-xs font-bold rounded-lg cursor-pointer transition-colors border ${
                          isSelected
                            ? 'bg-neutral-900 text-white border-neutral-900 font-extrabold'
                            : 'bg-white border-neutral-200 hover:border-neutral-350 text-neutral-600'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color swatch selectors */}
              <div className="space-y-3">
                <h3 className="font-display font-semibold text-xs tracking-wider text-neutral-550 uppercase">
                  Color Scheme
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {COLORS.map((color) => {
                    const isSelected = selectedColors.includes(color.name);
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => handleColorToggle(color.name)}
                        className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                          isSelected
                            ? 'ring-2 ring-orange-500 border-white'
                            : 'border-neutral-200'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {color.name === 'White' && isSelected && (
                          <span className="w-2 h-2 rounded-full bg-neutral-900" />
                        )}
                        {color.name !== 'White' && isSelected && (
                          <span className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reset Actions */}
              <button
                id="reset-filters-sidebar-btn"
                onClick={handleResetFilters}
                className="w-full mt-4 py-2.5 bg-neutral-200/50 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Right Shop items grid/list flow */}
        <section className={`lg:col-span-9 ${showFilters ? 'lg:col-span-9' : 'lg:col-span-12'}`}>
          {/* Active filter pills */}
          {(selectedBrands.length > 0 ||
            selectedGenders.length > 0 ||
            selectedSizes.length > 0 ||
            selectedColors.length > 0 ||
            selectedCategory !== 'All' ||
            searchQuery.trim() !== '' ||
            showWishlistedOnly) && (
            <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
              <span className="text-[10px] font-bold text-neutral-550 uppercase tracking-wider mr-1">Active:</span>

              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-neutral-200 text-neutral-700 text-xs font-medium">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')} className="ml-1 text-neutral-500 hover:text-neutral-700">×</button>
                </span>
              )}

              {searchQuery.trim() !== '' && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-neutral-200 text-neutral-700 text-xs font-medium">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="ml-1 text-neutral-500 hover:text-neutral-700">×</button>
                </span>
              )}

              {selectedBrands.map((b) => (
                <span key={b} className="inline-flex items-center px-2 py-0.5 rounded-md bg-neutral-200 text-neutral-700 text-xs font-medium">
                  {b}
                  <button onClick={() => handleBrandToggle(b)} className="ml-1 text-neutral-500 hover:text-neutral-700">×</button>
                </span>
              ))}

              {selectedGenders.map((g) => (
                <span key={g} className="inline-flex items-center px-2 py-0.5 rounded-md bg-neutral-200 text-neutral-700 text-xs font-medium">
                  {g}
                  <button onClick={() => handleGenderToggle(g)} className="ml-1 text-neutral-500 hover:text-neutral-700">×</button>
                </span>
              ))}

              {selectedSizes.map((s) => (
                <span key={s} className="inline-flex items-center px-2 py-0.5 rounded-md bg-neutral-200 text-neutral-700 text-xs font-medium">
                  US {s}
                  <button onClick={() => handleSizeToggle(s)} className="ml-1 text-neutral-500 hover:text-neutral-700">×</button>
                </span>
              ))}

              {selectedColors.map((c) => (
                <span key={c} className="inline-flex items-center px-2 py-0.5 rounded-md bg-neutral-250 text-neutral-700 text-xs font-medium">
                  Color: {c}
                  <button onClick={() => handleColorToggle(c)} className="ml-1 text-neutral-500 hover:text-neutral-700">×</button>
                </span>
              ))}

              {showWishlistedOnly && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-red-100 text-red-700 text-xs font-semibold">
                  Wishlist Only
                  <button onClick={() => setShowWishlistedOnly(false)} className="ml-1 text-red-500 hover:text-red-700">×</button>
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="text-[11px] font-bold text-orange-500 hover:text-orange-600 underline ml-auto cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Grid View Content */}
          {filteredProducts.length > 0 ? (
            viewMode === 'grid' ? (
              <motion.div
                id="catalog-items-grid"
                layout
                className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={onViewProductDetails}
                      onAddToCart={onAddToCart}
                      isWishlisted={wishlist.some((w) => w.id === product.id)}
                      onToggleWishlist={onToggleWishlist}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* List View Content */
              <div id="catalog-items-list" className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => {
                    const discountRatio = product.discountPrice
                      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
                      : 0;
                    const isWish = wishlist.some((w) => w.id === product.id);

                    return (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onViewProductDetails(product.id)}
                        className="bg-white border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-stretch p-4 gap-4 text-left cursor-pointer relative"
                      >
                        {/* Image Block */}
                        <div className="relative aspect-square sm:w-44 bg-neutral-50 rounded-xl overflow-hidden shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          {product.discountPrice && (
                            <span className="absolute top-2 left-2 z-10 px-2 py-0.5 text-[9px] font-bold text-white bg-red-500 rounded text-center">
                              -{discountRatio}%
                            </span>
                          )}
                        </div>

                        {/* List details */}
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[10px] font-semibold text-neutral-405 uppercase tracking-wider">
                                  {product.brand} · {product.category}
                                </span>
                                <h3 className="font-display font-medium text-base text-neutral-900 group-hover:text-orange-500 mt-0.5">
                                  {product.name}
                                </h3>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleWishlist(product);
                                }}
                                className="p-1.5 rounded-full hover:bg-neutral-50 text-neutral-400 hover:text-red-500 transition-colors"
                              >
                                <Heart className={`w-4 h-4 ${isWish ? 'fill-red-500 text-red-500' : ''}`} />
                              </button>
                            </div>

                            <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                              {product.description}
                            </p>

                            <div className="flex items-center space-x-4 text-xs font-semibold text-neutral-600">
                              <span className="bg-neutral-100 px-2.5 py-0.5 rounded">Sizes: {product.sizes.join(', ')}</span>
                              <span>Stock: {product.stock} available</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-neutral-50 pt-3 mt-4">
                            <div>
                              {product.discountPrice ? (
                                <div className="space-x-2">
                                  <span className="text-base font-bold text-red-500">${product.discountPrice}</span>
                                  <span className="text-xs text-neutral-400 line-through">${product.price}</span>
                                </div>
                              ) : (
                                <span className="text-base font-bold text-neutral-900">${product.price}</span>
                              )}
                            </div>
                            <button
                              id={`list-view-btn-${product.id}`}
                              className="px-4.5 py-2 bg-neutral-900 hover:bg-neutral-950 text-white font-semibold text-xs rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer"
                            >
                              <span>View Details</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )
          ) : (
            /* Empty State */
            <div id="catalog-empty-state" className="bg-neutral-50 rounded-2xl p-12 text-center border border-dashed border-neutral-200">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mx-auto mb-4">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="font-display font-medium text-lg text-neutral-700">No Shoes Found</h3>
              <p className="text-xs text-neutral-450 mt-1 max-w-sm mx-auto">
                No products match your active filters or query. Try resetting your color selections, raising the price limit, or clearing the search bar.
              </p>
              <button
                id="reset-empty-catalog-btn"
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
