"use client";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Rating from "@/components/Rating";
import Image from "next/image";
import { useState } from "react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  /* ================= IMAGE NORMALIZATION (SAFE) ================= */
  const images: string[] = Array.isArray(product.images)
    ? product.images
    : product.images
      ? [product.images]
      : product.image
        ? [product.image]
        : [];

  const imageSrc = images[0] || "/placeholder.jpg";

  /* ================= DISCOUNT CALCULATION ================= */
  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  /* ================= HANDLE ADD TO CART ================= */
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAddingToCart(true);

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      images: images.length ? images : ["/placeholder.jpg"],
    });

    // Reset button state after animation
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 600);
  };

  return (
    <div
      className="
        group
        bg-white
        border border-gray-200
        rounded-2xl
        overflow-hidden
        flex flex-col
        transition-all
        duration-300
        hover:shadow-2xl
        hover:shadow-blue-100
        hover:border-blue-300
        hover:-translate-y-1
        h-full
        touch-manipulation
      "
    >
      {/* ================= IMAGE SECTION ================= */}
      <Link
        href={`/product/${product.id}`}
        className="block relative touch-manipulation active:opacity-90 transition-opacity"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div className="relative w-full bg-gradient-to-br from-gray-100 via-blue-50/30 to-indigo-50/30 overflow-hidden flex-shrink-0 h-56 sm:h-64 md:h-72">
          {/* Loading Placeholder */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-blue-100 to-indigo-100 animate-pulse" />
          )}

          {/* Image */}
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover object-center transition-all duration-700 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
            } group-hover:scale-110 group-hover:rotate-1`}
            priority={false}
            loading="lazy"
            quality={90}
            onLoadingComplete={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <div className="absolute top-3 right-3 z-10 animate-bounce">
              <div className="bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-xl shadow-red-200 ring-2 ring-white">
                -{discountPercent}%
              </div>
            </div>
          )}

          {/* Quick View Badge on Hover */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200">
              <span className="text-xs font-semibold text-gray-900">
                👁️ Quick View
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* ================= CONTENT SECTION ================= */}
      <div className="p-4 sm:p-5 flex flex-col gap-3 text-gray-900 flex-1">
        {/* Category Badge */}
        {product.category && (
          <div className="inline-block self-start">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-xs font-semibold text-blue-700">
              {product.category}
            </span>
          </div>
        )}

        {/* Rating */}
        {typeof product.rating === "number" && (
          <div className="flex items-center gap-2">
            <Rating value={product.rating} />
            <span className="text-xs text-gray-500 font-medium">
              ({product.rating.toFixed(1)})
            </span>
          </div>
        )}

        {/* Product Name */}
        <Link
          href={`/product/${product.id}`}
          className="touch-manipulation"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <h3 className="font-bold text-base sm:text-lg leading-snug line-clamp-2 hover:text-blue-600 transition-colors duration-200 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        {product.description && (
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {product.description}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price Section */}
        <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl p-3 border border-blue-100">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-gray-900 text-xl sm:text-2xl font-bold">
              ₹{product.price.toLocaleString()}
            </p>

            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <p className="text-gray-400 text-sm sm:text-base line-through font-medium">
                  ₹{product.originalPrice.toLocaleString()}
                </p>
              </>
            )}
          </div>

          {product.originalPrice && product.originalPrice > product.price && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-green-600 text-xs font-bold bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                💰 Save ₹
                {(product.originalPrice - product.price).toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Buttons Container */}
        <div className="flex flex-col gap-2.5 mt-2">
          {/* View Details Button */}
          <Link
            href={`/product/${product.id}`}
            className="
              w-full text-center
              py-3
              border-2 border-gray-900
              bg-white
              rounded-xl
              text-sm
              font-bold
              text-gray-900
              hover:bg-gray-900
              hover:text-white
              active:scale-95
              transition-all
              duration-200
              touch-manipulation
              shadow-md
              hover:shadow-lg
            "
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            View Full Details
          </Link>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="
              w-full py-3
              bg-gradient-to-r from-blue-600 to-indigo-600
              text-white
              rounded-xl
              font-bold
              text-sm
              shadow-lg shadow-blue-200
              hover:shadow-xl hover:shadow-blue-300
              hover:scale-105
              active:scale-95
              transition-all
              duration-200
              touch-manipulation
              disabled:opacity-50
              disabled:cursor-not-allowed
              disabled:hover:scale-100
            "
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {isAddingToCart ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                🛒 Add to Cart
              </span>
            )}
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-3 mt-2 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <span className="text-xs">🚚</span>
            <span className="text-xs text-gray-600 font-medium">Free Ship</span>
          </div>
          <div className="w-px h-3 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <span className="text-xs">✅</span>
            <span className="text-xs text-gray-600 font-medium">Verified</span>
          </div>
          <div className="w-px h-3 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <span className="text-xs">💯</span>
            <span className="text-xs text-gray-600 font-medium">Original</span>
          </div>
        </div>
      </div>
    </div>
  );
}
