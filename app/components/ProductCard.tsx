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

  /* ================= IMAGE NORMALIZATION (SAFE) ================= */
  const images: string[] = Array.isArray(product.images)
    ? product.images
    : product.images
      ? [product.images]
      : product.image
        ? [product.image]
        : [];

  const imageSrc = images[0] || "/placeholder.jpg";

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
                duration-200
                hover:shadow-xl
                hover:border-blue-300
                h-full
                touch-manipulation
            "
    >
      {/* ================= IMAGE (✅ OPTIMIZED WITH LOADING STATE) ================= */}
      <Link
        href={`/product/${product.id}`}
        className="block relative touch-manipulation active:opacity-80 transition-opacity"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div className="relative w-full bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden flex-shrink-0 h-48 sm:h-56 md:h-60">
          {/* Loading Placeholder */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse" />
          )}

          {/* Image */}
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover object-center transition-all duration-500 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } group-hover:scale-110`}
            priority={false}
            loading="lazy"
            quality={85}
            onLoadingComplete={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* ================= CONTENT ================= */}
      <div className="p-4 flex flex-col gap-2.5 text-gray-900 flex-1">
        {/* Rating */}
        {typeof product.rating === "number" && (
          <div className="mb-1">
            <Rating value={product.rating} />
          </div>
        )}

        {/* Product Name */}
        <Link
          href={`/product/${product.id}`}
          className="touch-manipulation"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <h3 className="font-bold text-sm sm:text-base leading-snug line-clamp-2 hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          <p className="text-gray-900 text-lg font-bold">
            ₹{product.price.toLocaleString()}
          </p>
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Spacer to push buttons to bottom */}
        <div className="flex-1" />

        {/* Buttons Container */}
        <div className="flex flex-col gap-2.5 mt-2">
          {/* Full Details Button */}
          <Link
            href={`/product/${product.id}`}
            className="
                            w-full text-center
                            py-2.5
                            border-2 border-gray-200
                            rounded-xl
                            text-sm
                            font-semibold
                            text-gray-700
                            hover:border-blue-500
                            hover:bg-blue-50
                            hover:text-blue-700
                            active:scale-95
                            transition-all
                            duration-200
                            touch-manipulation
                        "
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            View Details
          </Link>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                qty: 1,
                images: images.length ? images : ["/placeholder.jpg"],
              });
            }}
            className="
                            w-full py-2.5
                            bg-gradient-to-r from-blue-600 to-indigo-600
                            text-white
                            rounded-xl
                            font-bold
                            text-sm
                            shadow-md shadow-blue-200
                            hover:shadow-lg hover:shadow-blue-300
                            hover:scale-105
                            active:scale-95
                            transition-all
                            duration-200
                            touch-manipulation
                        "
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
