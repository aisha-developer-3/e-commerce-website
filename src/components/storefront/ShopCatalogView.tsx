import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { QuickViewModal } from '../common/QuickViewModal';

export const ShopCatalogView: React.FC = () => {
  const {
    products,
    categories,
    filteredProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly,
    sortBy,
    setSortBy,
    setSelectedProductId,
    setRoute,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange([0, 1500]);
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-10 bg-[#fdfbf7]">
      {/* Breadcrumb & Title */}
      <div className="flex flex-col gap-4 mb-10 pb-6 border-b border-[#ede4d8]">
        <nav className="flex items-center gap-2 text-sm text-[#61564d]">
          <button onClick={() => setRoute('home')} className="hover:text-[#b86b43] transition-colors">
            Home
          </button>
          <span className="text-[#9e9187]">/</span>
          <span className="text-[#26201c] font-semibold">Shop Catalog</span>
        </nav>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#26201c] font-semibold tracking-tight">
              Curated Shop Catalog
            </h1>
            <p className="text-base text-[#61564d] mt-2 max-w-2xl leading-relaxed">
              Tactile, architectural silhouettes constructed with vegetable-tanned Tuscan leather, solid unfilled Roman travertine, and unbleached Belgian flax linen.
            </p>
          </div>
          <span className="text-xs uppercase tracking-wider text-[#b86b43] font-bold bg-[#faf6f0] border border-[#ede4d8] px-4 py-2 rounded-xl self-start md:self-auto shadow-xs">
            Volume: {filteredProducts.length} Curated Artifacts
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Filters */}
        <aside className="lg:col-span-3 flex flex-col gap-7 bg-[#faf6f0] p-6 rounded-2xl border border-[#ede4d8] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#ede4d8]">
            <span className="text-sm uppercase tracking-wider text-[#26201c] font-bold">Filters & Curation</span>
            <button
              onClick={clearAllFilters}
              className="text-xs uppercase tracking-wider text-[#b86b43] font-bold hover:underline"
            >
              Clear All
            </button>
          </div>

          {/* Search Box in Sidebar */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#26201c]">Search Catalog</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name, material..."
                className="w-full h-11 px-4 pr-9 bg-white border border-[#ede4d8] rounded-xl text-sm text-[#26201c] focus:outline-none focus:border-[#b86b43]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs text-[#9e9187] hover:text-[#26201c]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-[#26201c]">Departments</span>
            <div className="flex flex-col gap-1.5 text-sm">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`text-left px-3.5 py-2.5 rounded-xl transition-all flex justify-between items-center ${
                  selectedCategory === 'all'
                    ? 'bg-[#26201c] text-white font-semibold shadow-xs'
                    : 'text-[#61564d] hover:bg-white hover:text-[#26201c]'
                }`}
              >
                <span>All Departments</span>
                <span className="text-xs opacity-80">({products.length})</span>
              </button>
              {categories.map((cat) => {
                const count = products.filter((p) => p.categoryId === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-left px-3.5 py-2.5 rounded-xl transition-all flex justify-between items-center ${
                      selectedCategory === cat.id
                        ? 'bg-[#26201c] text-white font-semibold shadow-xs'
                        : 'text-[#61564d] hover:bg-white hover:text-[#26201c]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-3 pt-4 border-t border-[#ede4d8]">
            <div className="flex justify-between items-center text-sm font-semibold text-[#26201c]">
              <span>Max Price</span>
              <span className="text-[#b86b43] font-bold text-base">${priceRange[1]} USD</span>
            </div>
            <input
              type="range"
              min="50"
              max="1500"
              step="25"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-[#b86b43] cursor-pointer h-2 bg-[#ede4d8] rounded-lg"
            />
            <div className="flex justify-between text-xs text-[#9e9187]">
              <span>$50</span>
              <span>$1,500</span>
            </div>
          </div>

          {/* Stock Filter */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#ede4d8]">
            <input
              type="checkbox"
              id="in-stock-checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="h-4 w-4 accent-[#b86b43] rounded"
            />
            <label htmlFor="in-stock-checkbox" className="text-sm font-medium text-[#26201c] cursor-pointer select-none">
              In Stock & Ready to Ship
            </label>
          </div>
        </aside>

        {/* Right Main Product Catalog Grid */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          {/* Sorting & Result bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#faf6f0] p-4 rounded-2xl border border-[#ede4d8] shadow-xs">
            <span className="text-sm text-[#61564d]">
              Showing <strong className="text-[#26201c] font-bold">{filteredProducts.length}</strong> of {products.length} curated objects
            </span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-[#26201c]">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#ede4d8] rounded-xl px-3.5 py-2 text-sm text-[#26201c] focus:outline-none focus:border-[#b86b43] shadow-xs"
              >
                <option value="featured">Featured Curation</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Releases</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="p-16 text-center bg-[#faf6f0] rounded-2xl border border-[#ede4d8] flex flex-col items-center justify-center gap-4">
              <span className="material-symbols-outlined text-[54px] text-[#9e9187]">search_off</span>
              <h3 className="font-serif text-2xl text-[#26201c] font-semibold">No matching curated artifacts found</h3>
              <p className="text-base text-[#61564d] max-w-md">
                Try adjusting your search criteria, price range, or department filter to discover available pieces.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-2 px-6 py-3 bg-[#26201c] text-white text-sm font-semibold uppercase tracking-wider rounded-xl hover:bg-[#b86b43] transition-colors shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const isSaved = isInWishlist(product.id);
                return (
                  <div
                    key={product.id}
                    className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#ede4d8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(184,107,67,0.12)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <div
                      className="relative aspect-[4/5] overflow-hidden bg-[#f3ece1] cursor-pointer"
                      onClick={() => {
                        setSelectedProductId(product.id);
                        setRoute('product-detail');
                      }}
                    >
                      <img
                        src={product.imageUrls[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer-when-downgrade"
                        loading="lazy"
                      />
                      {product.isBestseller && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-3.5 py-1.5 bg-[#b86b43] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                            Bestseller
                          </span>
                        </div>
                      )}
                      {product.isNewArrival && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-3.5 py-1.5 bg-[#26201c] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                            New Arrival
                          </span>
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                        className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center transition-all shadow-sm ${
                          isSaved ? 'text-[#b86b43] font-bold scale-110' : 'text-[#61564d] hover:text-[#b86b43]'
                        }`}
                        title="Save to Wishlist"
                      >
                        <span className="material-symbols-outlined text-[20px]" style={isSaved ? { fontVariationSettings: "'FILL' 1" } : {}}>
                          favorite
                        </span>
                      </button>

                      {/* Quick Add Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#26201c]/80 via-[#26201c]/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(product);
                          }}
                          className="flex-1 py-3 bg-white text-[#26201c] text-sm font-semibold uppercase tracking-wider rounded-xl hover:bg-[#b86b43] hover:text-white transition-colors text-center shadow-md"
                        >
                          Quick View
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, 1);
                          }}
                          className="w-12 h-12 bg-[#26201c] text-white rounded-xl flex items-center justify-center hover:bg-[#b86b43] transition-colors shadow-md"
                          title="Add to Bag"
                        >
                          <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs uppercase tracking-wider font-semibold text-[#9e9187]">
                            {product.categoryName}
                          </span>
                          <span className="text-base sm:text-lg text-[#26201c] font-bold">${product.price.toFixed(2)}</span>
                        </div>
                        <h3
                          onClick={() => {
                            setSelectedProductId(product.id);
                            setRoute('product-detail');
                          }}
                          className="font-serif text-xl sm:text-2xl font-medium text-[#26201c] group-hover:text-[#b86b43] transition-colors cursor-pointer"
                        >
                          {product.name}
                        </h3>
                      </div>
                      <div className="mt-5 pt-3 border-t border-[#ede4d8] flex items-center justify-between text-xs sm:text-sm text-[#61564d]">
                        <span className="truncate max-w-[150px]">{product.materials?.[0] || 'Handcrafted Artisan piece'}</span>
                        <span className="text-xs font-bold text-[#b86b43] shrink-0">
                          {product.stockQuantity <= 5 ? `Only ${product.stockQuantity} Left` : 'In Stock'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
};
