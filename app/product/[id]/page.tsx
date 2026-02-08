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

  /* ================= DISCOUNT CALCULATION ================= */
  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <div className="group bg-white flex flex-col h-full transition-all duration-300">
      {/* ================= IMAGE ================= */}
      <Link
        href={`/product/${product.id}`}
        className="block relative touch-manipulation"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div className="relative w-full bg-gray-50 overflow-hidden aspect-[3/4]">
          {/* Loading Placeholder */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}

          {/* Image */}
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-700 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } group-hover:scale-[1.02]`}
            priority={false}
            loading="lazy"
            quality={90}
            onLoadingComplete={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />

          {/* Minimal Discount Badge */}
          {discountPercent > 0 && (
            <div className="absolute top-3 left-3">
              <div className="bg-white/95 backdrop-blur-sm px-3 py-1 border border-gray-200">
                <span className="text-xs font-medium text-gray-900 tracking-wide">
                  -{discountPercent}%
                </span>
              </div>
            </div>
          )}

          {/* Quick Add - Shows on Hover (Desktop only) */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden sm:block">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  qty: 1,
                  images: images.length ? images : ["/placeholder.jpg"],
                });
              }}
              className="w-full py-3 bg-white/95 backdrop-blur-sm border-t border-gray-200 text-xs tracking-[0.1em] uppercase font-medium text-gray-900 hover:bg-white transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>

      {/* ================= CONTENT ================= */}
      <div className="pt-4 flex flex-col gap-2 flex-1">
        {/* Category */}
        <p className="text-xs tracking-[0.15em] uppercase text-gray-400 font-light">
          {product.category}
        </p>

        {/* Product Name */}
        <Link
          href={`/product/${product.id}`}
          className="touch-manipulation"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <h3 className="font-light text-sm leading-snug line-clamp-2 text-gray-900 hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating - Minimal */}
        {typeof product.rating === "number" && (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Rating value={product.rating} />
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price */}
        <div className="pt-2 space-y-1">
          <div className="flex items-baseline gap-2">
            <p className="text-base font-light text-gray-900">
              ₹{product.price.toLocaleString()}
            </p>
            {product.originalPrice && (
              <p className="text-sm font-light text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </p>
            )}
          </div>
          {product.originalPrice && (
            <p className="text-xs text-gray-500 font-light">
              Save ₹{(product.originalPrice - product.price).toLocaleString()}
            </p>
          )}
        </div>

        {/* Mobile Add to Cart */}
        <button
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
          className="w-full py-2.5 mt-3 border border-gray-900 bg-white text-gray-900 text-xs tracking-[0.1em] uppercase font-medium hover:bg-gray-900 hover:text-white transition-all sm:hidden"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
