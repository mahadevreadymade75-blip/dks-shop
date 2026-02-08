"use client";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Rating from "@/components/Rating";
import Image from "next/image";
import { useState, useMemo, useCallback } from "react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  /* ================= OPTIMIZED IMAGE SOURCE ================= */
  const imageSrc = useMemo(() => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0];
    }
    if (product.images && typeof product.images === "string") {
      return product.images;
    }
    if (product.image) {
      return product.image;
    }
    return "/placeholder.jpg";
  }, [product.images, product.image]);

  /* ================= DISCOUNT CALCULATION ================= */
  const discountPercent = useMemo(() => {
    return product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;
  }, [product.originalPrice, product.price]);

  const savings = useMemo(() => {
    return product.originalPrice ? product.originalPrice - product.price : 0;
  }, [product.originalPrice, product.price]);

  /* ================= OPTIMIZED ADD TO CART ================= */
  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setIsAddingToCart(true);

      const images = Array.isArray(product.images)
        ? product.images
        : product.images
          ? [product.images as string]
          : product.image
            ? [product.image]
            : ["/placeholder.jpg"];

      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
        images,
      });

      setTimeout(() => setIsAddingToCart(false), 500);
    },
    [addToCart, product],
  );

  return (
    <div className="group h-full flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300">
      {/* ================= IMAGE SECTION ================= */}
      <Link
        href={`/product/${product.id}`}
        className="relative block bg-gray-50 overflow-hidden"
      >
        <div className="relative w-full h-64 sm:h-72">
          {/* Loading State */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
          )}

          {/* Product Image */}
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`
              object-cover object-center
              transition-all duration-500
              ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}
              group-hover:scale-105
            `}
            loading="lazy"
            quality={85}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <div className="absolute top-3 left-3 z-10">
              <div className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                {discountPercent}% OFF
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* ================= CONTENT SECTION ================= */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          {product.category && (
            <span className="px-2 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-700 capitalize">
              {product.category}
            </span>
          )}

          {typeof product.rating === "number" && (
            <div className="flex items-center gap-1">
              <Rating value={product.rating} />
              <span className="text-xs text-gray-500 font-medium">
                {product.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Product Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold text-base sm:text-lg text-gray-900 line-clamp-2 mb-2 hover:text-blue-600 transition-colors min-h-[3rem]">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3 min-h-[2.5rem]">
            {product.description}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price Section */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-base text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {savings > 0 && (
            <p className="text-sm font-semibold text-green-600">
              Save ₹{savings.toLocaleString()}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          {/* View Details */}
          <Link
            href={`/product/${product.id}`}
            className="
              w-full py-2.5 px-4
              border-2 border-gray-900
              bg-white text-gray-900
              rounded-lg
              text-sm font-bold text-center
              hover:bg-gray-900 hover:text-white
              transition-colors duration-200
            "
          >
            View Details
          </Link>

          {/* Add to Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="
              w-full py-2.5 px-4
              bg-blue-600 hover:bg-blue-700
              text-white
              rounded-lg
              text-sm font-bold
              transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {isAddingToCart ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Adding...
              </span>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-600">🚚 Free Shipping</span>
          <span className="text-gray-300">•</span>
          <span className="text-xs text-gray-600">✓ Verified</span>
          <span className="text-gray-300">•</span>
          <span className="text-xs text-gray-600">💯 Original</span>
        </div>
      </div>
    </div>
  );
}
