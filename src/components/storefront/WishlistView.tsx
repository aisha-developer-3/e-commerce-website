import React from 'react';
import { useStore } from '../../context/StoreContext';

export const WishlistView: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, setRoute, setSelectedProductId } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-6 bg-[#fdfbf7]">
        <div className="w-20 h-20 rounded-full bg-[#faf6f0] border border-[#ede4d8] flex items-center justify-center text-[#b86b43]">
          <span className="material-symbols-outlined text-[44px]">favorite</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#26201c] font-semibold">Your Wishlist is Empty</h2>
        <p className="text-base text-[#61564d] max-w-md">
          Save your favorite architectural objects and leather pieces to your personal curation list.
        </p>
        <button
          onClick={() => setRoute('shop')}
          className="px-8 py-4 bg-[#26201c] text-white text-sm uppercase tracking-wider font-semibold rounded-xl hover:bg-[#b86b43] transition-colors shadow-md"
        >
          Explore Catalog →
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 bg-[#fdfbf7]">
      <div className="flex flex-col gap-2 mb-10 pb-6 border-b border-[#ede4d8]">
        <nav className="flex items-center gap-2 text-sm text-[#61564d]">
          <button onClick={() => setRoute('home')} className="hover:text-[#b86b43] transition-colors">
            Home
          </button>
          <span className="text-[#9e9187]">/</span>
          <span className="text-[#26201c] font-semibold">Personal Wishlist</span>
        </nav>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#26201c] font-semibold">
          Curated Wishlist ({wishlist.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.wishlistItemId}
            className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#ede4d8] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(184,107,67,0.12)] hover:-translate-y-1 transition-all duration-300"
          >
            <div
              className="relative aspect-[4/5] overflow-hidden bg-[#f3ece1] cursor-pointer"
              onClick={() => {
                setSelectedProductId(item.product.id);
                setRoute('product-detail');
              }}
            >
              <img
                src={item.product.imageUrls[0]}
                alt={item.product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(item.product);
                }}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-[#b86b43] font-bold shadow-sm hover:scale-110 transition-transform"
                title="Remove from Wishlist"
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  favorite
                </span>
              </button>
            </div>

            <div className="p-6 flex flex-col flex-1 justify-between bg-white">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#9e9187]">
                  {item.product.categoryName}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#26201c] mt-1 truncate">
                  {item.product.name}
                </h3>
                <span className="text-base sm:text-lg font-bold text-[#26201c] mt-2 block">
                  ${item.product.price.toFixed(2)} USD
                </span>
              </div>
              <div className="mt-5 pt-4 border-t border-[#ede4d8]">
                <button
                  onClick={() => addToCart(item.product, 1)}
                  className="w-full py-3 bg-[#26201c] text-white text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-[#b86b43] transition-colors text-center shadow-xs"
                >
                  Move to Atelier Bag
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
