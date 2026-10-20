import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export const ProductDetailView: React.FC = () => {
  const { products, selectedProductId, addToCart, toggleWishlist, isInWishlist, setRoute, setSelectedProductId, showToast } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.variants?.colorways?.[0]?.name);
  const [selectedHw, setSelectedHw] = useState(product?.variants?.hardwareFinishes?.[0]);
  const [qty, setQty] = useState(1);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({ 'acc-1': true });

  if (!product) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-serif text-[#26201c]">Product not found</h2>
        <button
          onClick={() => setRoute('shop')}
          className="mt-6 px-8 py-3 bg-[#26201c] text-white text-sm uppercase font-semibold rounded-xl"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);

  const toggleAcc = (id: string) => {
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAdd = () => {
    addToCart(product, qty, selectedColor, selectedHw);
  };

  return (
    <div className="w-full bg-[#fdfbf7]">
      {/* Breadcrumb & Monograph Marker */}
      <section className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 py-6 border-b border-[#ede4d8]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-sm text-[#61564d]">
            <button onClick={() => setRoute('home')} className="hover:text-[#b86b43] transition-colors">
              Home
            </button>
            <span className="text-[#9e9187]">/</span>
            <button onClick={() => setRoute('shop')} className="hover:text-[#b86b43] transition-colors">
              Shop
            </button>
            <span className="text-[#9e9187]">/</span>
            <span className="text-[#26201c] font-semibold">{product.name}</span>
          </nav>
          <div className="flex items-center gap-2 text-xs uppercase text-[#b86b43] tracking-widest bg-[#faf6f0] border border-[#ede4d8] px-3.5 py-1.5 rounded-full font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#b86b43]"></span>
            <span>Archival Lot · Edition of 75</span>
          </div>
        </div>
      </section>

      {/* Main PDP Grid */}
      <section className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative w-full aspect-[4/3] md:aspect-[5/4] bg-[#f3ece1] rounded-3xl overflow-hidden shadow-md border border-[#ede4d8] group">
              <img
                src={product.imageUrls[activeImgIndex] || product.imageUrls[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold text-[#26201c] shadow-sm">
                  Handcrafted in Florence
                </span>
                <span className="bg-[#26201c] text-white px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold self-start shadow-sm">
                  Certified Vachetta
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {product.imageUrls.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.imageUrls.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative aspect-[4/3] bg-[#f3ece1] rounded-xl overflow-hidden transition-all ${
                      activeImgIndex === idx ? 'ring-2 ring-[#b86b43] shadow-sm' : 'opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Provenance Card */}
            <div className="mt-4 p-6 bg-[#faf6f0] border border-[#ede4d8] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#ede4d8] flex items-center justify-center text-[#b86b43] shadow-xs">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-[#26201c] font-bold">
                    Consorzio Vera Pelle Italiana Conciata al Vegetale
                  </span>
                  <span className="text-xs text-[#61564d] mt-0.5">
                    Tuscan Tannery Registry No. IT-FL-28941 · 100% Traceable
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Purchase Stack */}
          <div className="lg:col-span-5 flex flex-col gap-7">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#b86b43] uppercase tracking-widest font-bold">
                  {product.categoryName} · Edition 04
                </span>
                <div className="flex items-center gap-1.5 text-[#b86b43]">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span className="text-sm font-bold text-[#26201c]">
                    {product.rating || '4.9'}
                  </span>
                  <span className="text-sm text-[#61564d]">({product.reviewCount || 42} reviews)</span>
                </div>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#26201c] font-semibold tracking-tight pt-1">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4 pt-2">
                <span className="text-3xl font-bold text-[#26201c]">${product.price.toFixed(2)} USD</span>
                <span className="text-xs text-[#61564d] uppercase font-semibold">Taxes & Duties Included</span>
              </div>
            </div>

            <p className="text-base text-[#61564d] leading-relaxed">{product.description}</p>

            {/* Variants */}
            {product.variants?.colorways && product.variants.colorways.length > 0 && (
              <div className="flex flex-col gap-2.5 pt-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#61564d]">
                    Colorway: <strong className="text-[#26201c] font-semibold">{selectedColor || product.variants.colorways[0].name}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.variants.colorways.map((cw) => (
                    <button
                      key={cw.name}
                      onClick={() => setSelectedColor(cw.name)}
                      className={`relative w-10 h-10 rounded-full p-0.5 transition-all ${
                        selectedColor === cw.name ? 'ring-2 ring-[#b86b43] ring-offset-2 ring-offset-[#fdfbf7]' : ''
                      }`}
                      title={cw.name}
                    >
                      <span className="block w-full h-full rounded-full shadow-inner" style={{ backgroundColor: cw.hex }}></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.variants?.hardwareFinishes && product.variants.hardwareFinishes.length > 0 && (
              <div className="flex flex-col gap-2.5 pt-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#61564d]">
                    Hardware Finish: <strong className="text-[#26201c] font-semibold">{selectedHw}</strong>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {product.variants.hardwareFinishes.map((hw) => (
                    <button
                      key={hw}
                      onClick={() => setSelectedHw(hw)}
                      className={`py-3 px-4 text-center rounded-xl transition-all font-semibold flex items-center justify-center gap-2 border ${
                        selectedHw === hw
                          ? 'bg-[#26201c] text-white border-[#26201c] shadow-sm'
                          : 'bg-white text-[#26201c] border-[#ede4d8] hover:bg-[#faf6f0]'
                      }`}
                    >
                      <span>{hw}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Scarcity Notice */}
            <div className="p-4 bg-[#faf6f0] border border-[#ede4d8] rounded-xl flex items-center gap-3 text-sm text-[#61564d]">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b86b43] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#b86b43]"></span>
              </span>
              <div>
                <strong className="text-[#26201c]">Limited Inventory: </strong>
                <span>Only {product.stockQuantity} handcrafted units remaining in this run.</span>
              </div>
            </div>

            {/* Actions & Quantity */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-stretch gap-3">
                <div className="flex items-center bg-[#faf6f0] border border-[#ede4d8] rounded-xl px-3 min-w-[120px] justify-between shadow-xs">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-2 text-[#26201c] hover:text-[#b86b43] font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="text-base font-bold text-[#26201c] px-2">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="p-2 text-[#26201c] hover:text-[#b86b43] font-bold text-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-[#26201c] text-white hover:bg-[#b86b43] text-sm font-semibold uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99]"
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  <span>Add to Atelier Bag</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 bg-white border border-[#ede4d8] hover:border-[#b86b43] rounded-xl transition-all flex items-center justify-center shadow-xs ${
                    isSaved ? 'text-[#b86b43] font-bold' : 'text-[#61564d] hover:text-[#b86b43]'
                  }`}
                  title="Save to Wishlist"
                >
                  <span className="material-symbols-outlined text-[24px]" style={isSaved ? { fontVariationSettings: "'FILL' 1" } : {}}>
                    favorite
                  </span>
                </button>
              </div>

              <button
                onClick={() => {
                  handleAdd();
                  setRoute('checkout');
                }}
                className="w-full bg-[#faf6f0] hover:bg-[#f3ece1] border border-[#ede4d8] text-[#26201c] text-sm font-semibold uppercase tracking-wider py-3.5 rounded-xl transition-colors text-center"
              >
                Instant Bespoke Checkout →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Accordion */}
      <section className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 py-12 border-t border-[#ede4d8]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest text-[#b86b43] font-bold">Documentation & Care</span>
            <h3 className="font-serif text-3xl text-[#26201c] font-semibold">Technical Archival Record</h3>
            <p className="text-base text-[#61564d] leading-relaxed">
              Complete dimensional schematics, ingredient provenance, and custodial practices designed to sustain the artifact across decades.
            </p>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Accordion 1 */}
            <div className="bg-white border border-[#ede4d8] rounded-2xl overflow-hidden shadow-xs">
              <button
                onClick={() => toggleAcc('acc-1')}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-[#faf6f0] transition-colors"
              >
                <span className="text-base font-semibold text-[#26201c]">Dimensions & Architectural Weight</span>
                <span className="material-symbols-outlined text-[20px] text-[#9e9187]">
                  {openAccordions['acc-1'] ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openAccordions['acc-1'] && (
                <div className="px-5 pb-5 text-sm text-[#61564d] leading-relaxed border-t border-[#ede4d8]/60 pt-4 flex flex-col gap-2">
                  <p>
                    <strong>Length:</strong> {product.dimensions?.width || 38} {product.dimensions?.unit || 'cm'} · 
                    <strong> Height:</strong> {product.dimensions?.height || 28} {product.dimensions?.unit || 'cm'} · 
                    <strong> Depth:</strong> {product.dimensions?.depth || 12} {product.dimensions?.unit || 'cm'}
                  </p>
                  <p>Archival dry tare weight: 1.15 kg calibrated balance.</p>
                </div>
              )}
            </div>

            {/* Accordion 2 */}
            <div className="bg-white border border-[#ede4d8] rounded-2xl overflow-hidden shadow-xs">
              <button
                onClick={() => toggleAcc('acc-2')}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-[#faf6f0] transition-colors"
              >
                <span className="text-base font-semibold text-[#26201c]">Materials & Raw Provenance</span>
                <span className="material-symbols-outlined text-[20px] text-[#9e9187]">
                  {openAccordions['acc-2'] ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openAccordions['acc-2'] && (
                <div className="px-5 pb-5 text-sm text-[#61564d] leading-relaxed border-t border-[#ede4d8]/60 pt-4">
                  <p>
                    Full grain vegetable-tanned bovine leather barrel-dyed in small batches with mimosa and chestnut tannins. Solid machined brass hardware with natural microcrystalline protective wax sealant.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 3 */}
            <div className="bg-white border border-[#ede4d8] rounded-2xl overflow-hidden shadow-xs">
              <button
                onClick={() => toggleAcc('acc-3')}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-[#faf6f0] transition-colors"
              >
                <span className="text-base font-semibold text-[#26201c]">Care & Heirloom Maintenance</span>
                <span className="material-symbols-outlined text-[20px] text-[#9e9187]">
                  {openAccordions['acc-3'] ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openAccordions['acc-3'] && (
                <div className="px-5 pb-5 text-sm text-[#61564d] leading-relaxed border-t border-[#ede4d8]/60 pt-4">
                  <p>
                    Condition bi-annually with natural beeswax balm. Avoid prolonged direct moisture exposure. Included organic cotton dustbag provided for temperature-moderated seasonal storage.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
