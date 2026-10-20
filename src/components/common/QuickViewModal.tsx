import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, setRoute, setSelectedProductId } = useStore();
  const [selectedColor, setSelectedColor] = useState(product?.variants?.colorways?.[0]?.name);
  const [selectedHw, setSelectedHw] = useState(product?.variants?.hardwareFinishes?.[0]);
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, qty, selectedColor, selectedHw);
    onClose();
  };

  const handleViewDetails = () => {
    setSelectedProductId(product.id);
    setRoute('product-detail');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#26201c]/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#fdfbf7] p-6 md:p-8 rounded-3xl shadow-2xl border border-[#ede4d8] flex flex-col md:flex-row gap-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#61564d] hover:text-[#26201c] w-9 h-9 rounded-full bg-[#faf6f0] flex items-center justify-center focus:outline-none transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>

        {/* Image */}
        <div className="w-full md:w-1/2 aspect-square bg-[#f3ece1] overflow-hidden rounded-2xl border border-[#ede4d8]">
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-[#b86b43] font-bold">
              {product.categoryName}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#26201c] font-semibold">{product.name}</h2>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#26201c]">${product.price.toFixed(2)} USD</span>
              {product.compareAtPrice && (
                <span className="text-sm text-[#9e9187] line-through">${product.compareAtPrice.toFixed(2)}</span>
              )}
            </div>
            <p className="text-sm text-[#61564d] leading-relaxed">{product.description}</p>

            {/* Variants */}
            {product.variants?.colorways && product.variants.colorways.length > 0 && (
              <div className="flex flex-col gap-2 pt-2">
                <span className="text-sm text-[#61564d]">
                  Colorway: <strong className="text-[#26201c]">{selectedColor || product.variants.colorways[0].name}</strong>
                </span>
                <div className="flex items-center gap-2.5">
                  {product.variants.colorways.map((cw) => (
                    <button
                      key={cw.name}
                      onClick={() => setSelectedColor(cw.name)}
                      className={`w-8 h-8 rounded-full p-0.5 transition-all ${
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
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#ede4d8] mt-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[#faf6f0] border border-[#ede4d8] rounded-xl px-3 h-12 justify-between min-w-[110px]">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="text-[#26201c] hover:text-[#b86b43] font-bold text-base px-2"
                >
                  -
                </button>
                <span className="text-sm font-bold text-[#26201c] px-2">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="text-[#26201c] hover:text-[#b86b43] font-bold text-base px-2"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 h-12 bg-[#26201c] hover:bg-[#b86b43] text-white text-sm font-semibold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                Add to Bag
              </button>
            </div>

            <button
              onClick={handleViewDetails}
              className="w-full text-center py-2.5 text-xs uppercase tracking-wider font-semibold text-[#b86b43] hover:underline"
            >
              View Full Archival Monograph →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
