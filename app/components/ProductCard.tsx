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

    setTimeout(() => {
      setIsAddingToCart(false);
    }, 600);
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:border-blue-400 h-full">
      {/* ================= IMAGE SECTION - CLICKABLE ================= */}
      <Link
        href={`/product/${product.id}`}
        className="block relative cursor-pointer"
      >
        <div className="relative w-full bg-white overflow-hidden h-64 sm:h-72">
          {/* Loading Placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}

          {/* Image */}
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-contain p-4 transition-all duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } group-hover:scale-105`}
            priority={false}
            loading="lazy"
            quality={85}
            onLoadingComplete={() => setImageLoaded(true)}
          />

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <div className="absolute top-3 right-3 z-10">
              <div className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-md">
                -{discountPercent}%
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* ================= CONTENT SECTION ================= */}
      <div className="p-4 flex flex-col gap-3 text-gray-900 flex-1">
        {/* Category Badge */}
        {product.category && (
          <span className="inline-block self-start px-2.5 py-1 rounded-md bg-blue-50 text-xs font-semibold text-blue-600">
            {product.category}
          </span>
        )}

        {/* Rating */}
        {typeof product.rating === "number" && (
          <div className="flex items-center gap-2">
            <Rating value={product.rating} />
            <span className="text-xs text-gray-500">
              ({product.rating.toFixed(1)})
            </span>
          </div>
        )}

        {/* Product Name - CLICKABLE */}
        <Link href={`/product/${product.id}`} className="cursor-pointer">
          <h3 className="font-semibold text-base leading-snug line-clamp-2 hover:text-blue-600 transition-colors min-h-[3rem]">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        {product.description && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-gray-900 text-2xl font-bold">
              ₹{product.price.toLocaleString()}
            </p>

            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-gray-400 text-base line-through">
                ₹{product.originalPrice.toLocaleString()}
              </p>
            )}
          </div>

          {product.originalPrice && product.originalPrice > product.price && (
            <span className="inline-block text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded-md">
              Save ₹{(product.originalPrice - product.price).toLocaleString()}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-3">
          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-sm shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAddingToCart ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </span>
            ) : (
              "Add to Cart"
            )}
          </button>

          {/* View Details Button - FIXED LINK */}
          <Link
            href={`/product/${product.id}`}
            className="w-full text-center py-3 border border-gray-300 bg-white rounded-lg text-sm font-semibold text-gray-700 hover:border-blue-600 hover:text-blue-600 active:scale-95 transition-all block"
          >
            View Full Details
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
          <span>🚚 Free Ship</span>
          <span>✅ Verified</span>
          <span>↩️ Easy Return</span>
        </div>
      </div>
    </div>
  );
}
