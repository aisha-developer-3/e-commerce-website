import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { QuickViewModal } from '../common/QuickViewModal';

export const HomeView: React.FC = () => {
  const {
    products,
    categories,
    setRoute,
    setSelectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedCategory,
  } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const featuredProducts = products.slice(0, 6);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <div className="flex flex-col w-full bg-[#fdfbf7]">
      {/* Top Editorial Hero Section with Warm Ambient Glow */}
      <section className="w-full relative px-4 sm:px-6 md:px-12 lg:px-16 py-12 lg:py-20 max-w-[1440px] mx-auto overflow-hidden">
        {/* Soft Ambient decorative gradients */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col justify-center z-10">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#b86b43] animate-pulse"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#b86b43] font-bold">
                The New Collection — Vol. IV
              </span>
            </div>
            
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#26201c] font-semibold tracking-tight leading-[1.08] mb-6">
              Elevate Your Everyday.
            </h1>
            
            <p className="text-base sm:text-lg text-[#61564d] font-normal leading-relaxed max-w-xl mb-8">
              Thoughtfully selected objects and garments designed with architectural proportion, archival weight, and tactile warmth.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={() => setRoute('shop')}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#26201c] text-white text-sm font-semibold uppercase tracking-wider rounded-xl shadow-md hover:bg-[#b86b43] hover:shadow-lg transition-all duration-300"
              >
                Explore Curated Collection
              </button>
              <button
                onClick={() => setRoute('shop')}
                className="inline-flex items-center gap-2 text-base font-semibold text-[#26201c] hover:text-[#b86b43] group transition-colors px-2 py-2"
              >
                <span>Discover What's New</span>
                <span className="material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:translate-x-1.5 text-[#b86b43]">
                  arrow_forward
                </span>
              </button>
            </div>
            
            <div className="pt-6 border-t border-[#ede4d8] flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-2 bg-white/80 border border-[#ede4d8] rounded-xl text-[#26201c] shadow-xs">
                <span className="material-symbols-outlined text-[18px] text-[#b86b43]">verified</span>
                <span className="text-xs font-semibold uppercase tracking-wider">Curated Quality</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 bg-white/80 border border-[#ede4d8] rounded-xl text-[#26201c] shadow-xs">
                <span className="material-symbols-outlined text-[18px] text-[#b86b43]">architecture</span>
                <span className="text-xs font-semibold uppercase tracking-wider">Timeless Design</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 bg-white/80 border border-[#ede4d8] rounded-xl text-[#26201c] shadow-xs">
                <span className="material-symbols-outlined text-[18px] text-[#b86b43]">handshake</span>
                <span className="text-xs font-semibold uppercase tracking-wider">Master Artisans</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="relative overflow-hidden bg-[#eae1d3] aspect-[16/11] rounded-3xl shadow-2xl border border-[#ede4d8]/80 group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9wFKDie5qtT2R7suEaHWPwzJVOpDq0xCWYdSNaAkeMN9lk4iYeTDeUJNZrblWioJcsDUvWS6RfnJfpACzMWW1sMOJMHVMOrw36DWeg4N2734xk8LHKf0NBmx1bZ2udTBMAmDMhJ1TNTcThCnb8JQmRJEO1KS9smisSCUSZO8Qi54bc0dxP9PSh4hZESPI5UETfGq6cL4MuRLmcxLZqdKLsPPDYYBeG_8zyaiHQR6xj8H-fsaWFFNFuw"
                alt="Travertine table with rustic vessel"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer-when-downgrade"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#26201c]/40 via-transparent to-transparent pointer-events-none"></div>
              
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-[#ede4d8] flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-[#b86b43] font-bold">
                    Edition 04 Featured Artifact
                  </span>
                  <p className="font-serif text-xl sm:text-2xl text-[#26201c] font-semibold leading-tight mt-1">
                    Travertine Plinth & Vessel
                  </p>
                  <span className="text-xs text-[#61564d] mt-1 font-medium">
                    Limited Studio Release · 24 of 50 Pieces
                  </span>
                </div>
                <button
                  onClick={() => {
                    const found = products.find((p) => p.name.includes('Travertine'));
                    if (found) {
                      setSelectedProductId(found.id);
                      setRoute('product-detail');
                    }
                  }}
                  className="w-12 h-12 flex-shrink-0 bg-[#f8f4ec] hover:bg-[#b86b43] text-[#26201c] hover:text-white rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm"
                  title="View Details"
                >
                  <span className="material-symbols-outlined text-[22px]">north_east</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Collections Grid */}
      <section className="w-full bg-[#faf6f0] py-20 mt-6 border-y border-[#ede4d8]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase text-[#b86b43] tracking-widest font-bold block mb-1">Departments</span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#26201c] font-semibold">Explore Collections</h2>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setRoute('shop');
              }}
              className="mt-4 md:mt-0 text-sm font-semibold uppercase tracking-wider text-[#26201c] hover:text-[#b86b43] flex items-center gap-1.5 transition-colors"
            >
              <span>View All Departments</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setRoute('shop');
                }}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#ede4d8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(184,107,67,0.12)] hover:-translate-y-1 transition-all duration-300 text-left"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f3ece1]">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs uppercase tracking-widest font-semibold bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[#26201c] shadow-xs">
                      0{idx + 1} / {cat.name.split(' ')[0]}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between bg-white">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#26201c] group-hover:text-[#b86b43] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-[#61564d] mt-1">{cat.description}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#f8f4ec] flex items-center justify-center text-[#61564d] group-hover:bg-[#b86b43] group-hover:text-white transition-all ml-2 shrink-0">
                    <span className="material-symbols-outlined text-[20px]">east</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Considered Essentials Grid */}
      <section className="w-full py-20 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase text-[#b86b43] tracking-widest font-bold block mb-1">Curation 01</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#26201c] font-semibold">Considered Essentials</h2>
            <p className="text-base text-[#61564d] mt-1">Our selection of timeless favorites, engineered for tactile distinction.</p>
          </div>
          <button
            onClick={() => setRoute('shop')}
            className="mt-4 md:mt-0 text-sm font-semibold uppercase tracking-wider text-[#26201c] hover:text-[#b86b43] underline underline-offset-4"
          >
            Explore Full Catalog →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => {
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
                    referrerPolicy="no-referrer"
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
                    <span className="truncate max-w-[160px]">{product.materials?.[0] || 'Handcrafted Artisan piece'}</span>
                    <span className="text-xs font-bold text-[#b86b43] shrink-0">
                      {product.stockQuantity <= 5 ? `Only ${product.stockQuantity} Left` : 'In Stock'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Editorial Brand Philosophy Banner */}
      <section id="manifesto-section" className="w-full bg-[#f8f4ec] my-12 border-y border-[#ede4d8]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 min-h-[420px] lg:min-h-[580px] relative overflow-hidden bg-[#eae1d3]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRSrGHlri0dNBbxf7ezOynltS_nR9YHILFl-63_DVjUVL1Js3u8jfvDfgpC-a-AkkSCk2j6SqwiWdTQNWRx80y11NWx_bAvvNwigpGMDv2KemvDxu1bJYEmtNf85rK1QBfdVwI8XCwSkDF_dN2yG8Jv51yx7FgZnTDsdm8qEeBsVfg_PUkGoZp3MktmJMoJgSJVZp-CBP6NuJ5GDb7lIYE9i5WZgo1A1-IeI_1BCawl5bV_e0_1z4rmw"
              alt="Craftsman hands burnishing fine leather"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute bottom-8 left-8 right-8 sm:right-auto bg-white/95 backdrop-blur-sm p-5 rounded-2xl max-w-sm shadow-lg border border-[#ede4d8]">
              <p className="text-xs uppercase tracking-wider text-[#b86b43] font-bold">Atelier Provenance</p>
              <p className="text-sm font-medium text-[#26201c] mt-1">Master workshops across Florence, Kyoto, and Zurich.</p>
            </div>
          </div>
          <div className="lg:col-span-6 p-8 md:p-14 lg:p-20 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#b86b43]"></span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#b86b43] font-bold">Our Manifesto</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#26201c] font-semibold tracking-tight leading-tight mb-6">
              Designed to Last.<br />Chosen to Matter.
            </h2>
            <p className="text-base sm:text-lg text-[#61564d] leading-relaxed mb-8">
              In an era of disposable abundance, we create an enclave for the permanent. Every object curated by ATELIER is commissioned from master craftsmen who respect the integrity of natural raw matter.
            </p>
            
            <div className="grid grid-cols-3 gap-4 py-4 mb-8 bg-white border border-[#ede4d8] rounded-2xl p-5 shadow-xs">
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-[#26201c] font-bold">100%</span>
                <p className="text-xs uppercase font-semibold text-[#61564d] mt-1">Traceable Origins</p>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-[#26201c] font-bold">50</span>
                <p className="text-xs uppercase font-semibold text-[#61564d] mt-1">Limited Batches</p>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-[#26201c] font-bold">Life</span>
                <p className="text-xs uppercase font-semibold text-[#61564d] mt-1">Repair Guarantee</p>
              </div>
            </div>
            
            <div>
              <button
                onClick={() => setRoute('shop')}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#26201c] hover:bg-[#b86b43] text-white text-sm font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Discover Our Curation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Experience Perks / Pillars */}
      <section id="about-section" className="w-full py-16 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-[#ede4d8] rounded-2xl p-6 shadow-xs flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#f8f4ec] text-[#b86b43] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">local_shipping</span>
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#26201c]">White-Glove Delivery</h3>
            <p className="text-sm text-[#61564d] leading-relaxed">
              Complimentary expedited insured courier packaging for all archival consignments worldwide.
            </p>
          </div>

          <div className="bg-white border border-[#ede4d8] rounded-2xl p-6 shadow-xs flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#f8f4ec] text-[#b86b43] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">workspace_premium</span>
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#26201c]">Heirloom Warranty</h3>
            <p className="text-sm text-[#61564d] leading-relaxed">
              Every artifact is backed by complimentary restoration and craftsmanship authentication certificates.
            </p>
          </div>

          <div className="bg-white border border-[#ede4d8] rounded-2xl p-6 shadow-xs flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#f8f4ec] text-[#b86b43] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">spa</span>
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#26201c]">Certified Materials</h3>
            <p className="text-sm text-[#61564d] leading-relaxed">
              Only vegetable-tanned Tuscan leathers, sustainably quarried stones, and pure grade raw fibers.
            </p>
          </div>

          <div className="bg-white border border-[#ede4d8] rounded-2xl p-6 shadow-xs flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#f8f4ec] text-[#b86b43] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">support_agent</span>
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#26201c]">Dedicated Concierge</h3>
            <p className="text-sm text-[#61564d] leading-relaxed">
              Private design consultation and customized order fulfillment with our master curators.
            </p>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
};
