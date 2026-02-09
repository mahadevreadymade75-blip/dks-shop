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

      /* ================= GA4 ADD TO CART TRACKING ================= */
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "add_to_cart", {
          currency: "INR",
          value: product.price,
          items: [
            {
              item_id: product.id,
              item_name: product.name,
              price: product.price,
              quantity: 1,
            },
          ],
        });
      }

      setTimeout(() => setIsAddingToCart(false), 500);
    },
    [addToCart, product],
  );

  return (
    <div className="group h-full flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      {/* ================= IMAGE SECTION ================= */}
      <Link
        href={`/product/${product.id}`}
        className="relative block bg-gray-50 overflow-hidden"
      >
        <div className="relative w-full aspect-square">
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
              transition-all duration-300
              ${imageLoaded ? "opacity-100" : "opacity-0"}
              group-hover:scale-105
            `}
            loading="lazy"
            quality={80}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <div className="absolute top-2 left-2 z-10">
              <div className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-md">
                {discountPercent}% OFF
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* ================= CONTENT SECTION ================= */}
      <div className="flex flex-col flex-1 p-3">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          {product.category && (
            <span className="px-2 py-0.5 rounded bg-gray-100 text-xs font-medium text-gray-600 capitalize">
              {product.category}
            </span>
          )}

          {typeof product.rating === "number" && (
            <div className="flex items-center gap-1">
              <Rating value={product.rating} />
              <span className="text-xs text-gray-500">
                {product.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Product Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm leading-tight text-gray-900 line-clamp-2 mb-2 hover:text-blue-600 transition-colors h-10">
            {product.name}
          </h3>
        </Link>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price Section */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {savings > 0 && (
            <p className="text-xs font-semibold text-green-600 mt-0.5">
              Save ₹{savings.toLocaleString()}
            </p>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="
            w-full py-2.5
            bg-gray-900 hover:bg-gray-800
            text-white
            rounded-lg
            text-sm font-semibold
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
    </div>
  );
}
