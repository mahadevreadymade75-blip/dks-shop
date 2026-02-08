"use client";

import { CartItem as CartItemType } from "@/types/cart";
import { useCart } from "@/context/CartContext";
import { memo, useMemo, useCallback, useState } from "react";
import Image from "next/image";

interface Props {
  item: CartItemType;
}

function CartItem({ item }: Props) {
  const { increaseQty, decreaseQty, removeFromCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  // 🔥 OPTIMIZED IMAGE RESOLUTION - Memoized
  const imageSrc = useMemo(() => {
    // case 1: item.image exists
    if ((item as any).image) {
      return (item as any).image;
    }

    // case 2: item.images exists
    if (
      Array.isArray((item as any).images) &&
      (item as any).images.length > 0
    ) {
      return (item as any).images[0];
    }

    return "/placeholder.jpg";
  }, [item]);

  // ✅ Memoized total price and savings calculation
  const { totalPrice, itemSavings, itemOriginalTotal, discountPercent } =
    useMemo(() => {
      const totalPrice = item.qty * item.price;
      const itemSavings = item.originalPrice
        ? item.qty * (item.originalPrice - item.price)
        : 0;
      const itemOriginalTotal = item.originalPrice
        ? item.qty * item.originalPrice
        : totalPrice;
      const discountPercent = item.originalPrice
        ? Math.round(
            ((item.originalPrice - item.price) / item.originalPrice) * 100,
          )
        : 0;

      return { totalPrice, itemSavings, itemOriginalTotal, discountPercent };
    }, [item.qty, item.price, item.originalPrice]);

  // Memoized callbacks for performance
  const handleDecrease = useCallback(() => {
    decreaseQty(item.id, item.size);
  }, [decreaseQty, item.id, item.size]);

  const handleIncrease = useCallback(() => {
    increaseQty(item.id, item.size);
  }, [increaseQty, item.id, item.size]);

  const handleRemove = useCallback(() => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(item.id, item.size);
    }, 300);
  }, [removeFromCart, item.id, item.size]);

  return (
    <div
      className={`group rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 ${isRemoving ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-5">
        {/* LEFT - Image & Info */}
        <div className="flex items-start gap-4 flex-1 w-full sm:w-auto">
          {/* IMAGE - WHITE BACKGROUND */}
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-xl overflow-hidden bg-white flex-shrink-0 border-2 border-gray-200 shadow-sm">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse" />
            )}
            <Image
              src={imageSrc}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 96px, 112px"
              className={`object-contain p-2 transition-all duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              } group-hover:scale-105`}
              loading="lazy"
              quality={85}
              onLoadingComplete={() => setImageLoaded(true)}
            />

            {/* Discount Badge on Image */}
            {discountPercent > 0 && (
              <div className="absolute top-1 right-1 bg-red-500 text-white px-2 py-0.5 rounded-md text-xs font-bold">
                -{discountPercent}%
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2 mb-2">
              {item.name}
            </h3>

            {item.size && (
              <span className="inline-block mb-2 px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                Size: {item.size}
              </span>
            )}

            {/* ✅ PRICE WITH ORIGINAL PRICE */}
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-base sm:text-lg font-bold text-gray-900">
                ₹{item.price.toLocaleString()}
                <span className="text-sm font-normal text-gray-500">
                  {" "}
                  /each
                </span>
              </p>

              {item.originalPrice && (
                <p className="text-sm text-gray-400 line-through">
                  ₹{item.originalPrice.toLocaleString()}
                </p>
              )}
            </div>

            {/* MOBILE: Total Price & Savings */}
            <div className="sm:hidden mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <div className="flex items-baseline gap-2 mb-1">
                <p className="text-xl font-bold text-gray-900">
                  ₹{totalPrice.toLocaleString()}
                </p>
                {item.originalPrice && (
                  <p className="text-sm text-gray-400 line-through">
                    ₹{itemOriginalTotal.toLocaleString()}
                  </p>
                )}
              </div>
              {itemSavings > 0 && (
                <p className="text-xs text-green-600 font-semibold">
                  💰 You save ₹{itemSavings.toLocaleString()} on this item
                </p>
              )}
            </div>
          </div>
        </div>

        {/* MIDDLE - Quantity Controls */}
        <div className="flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-1 border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
            <button
              onClick={handleDecrease}
              className="h-10 w-10 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all flex items-center justify-center font-bold text-lg active:scale-90"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span className="text-lg font-bold text-gray-900 min-w-[3ch] text-center px-3 bg-gray-50">
              {item.qty}
            </span>

            <button
              onClick={handleIncrease}
              className="h-10 w-10 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all flex items-center justify-center font-bold text-lg active:scale-90"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* MOBILE: Remove Button */}
          <button
            onClick={handleRemove}
            disabled={isRemoving}
            className="sm:hidden px-4 py-2 text-red-600 hover:text-white hover:bg-red-600 border border-red-600 rounded-lg font-semibold text-sm transition-all active:scale-95 disabled:opacity-50"
            aria-label="Remove item"
          >
            Remove
          </button>
        </div>

        {/* RIGHT - Desktop Price & Remove */}
        <div className="hidden sm:flex flex-col items-end gap-2 min-w-[140px]">
          {/* ✅ DESKTOP PRICE WITH SAVINGS */}
          <div className="text-right">
            <div className="flex items-baseline gap-2 justify-end mb-1">
              <div className="text-xl font-bold text-gray-900">
                ₹{totalPrice.toLocaleString()}
              </div>
            </div>
            {item.originalPrice && (
              <div className="text-sm text-gray-400 line-through">
                ₹{itemOriginalTotal.toLocaleString()}
              </div>
            )}
          </div>

          {/* ✅ SAVINGS TEXT */}
          {itemSavings > 0 && (
            <div className="px-3 py-1 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-green-600 font-bold">
                Save ₹{itemSavings.toLocaleString()}
              </p>
            </div>
          )}

          <button
            onClick={handleRemove}
            disabled={isRemoving}
            className="px-4 py-2 text-red-600 hover:text-white hover:bg-red-600 border border-red-600 rounded-lg font-semibold text-sm transition-all mt-2 active:scale-95 disabled:opacity-50"
            aria-label="Remove item"
          >
            {isRemoving ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Export memoized version for performance
export default memo(CartItem, (prevProps, nextProps) => {
  // ✅ Updated comparison to include originalPrice
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.qty === nextProps.item.qty &&
    prevProps.item.size === nextProps.item.size &&
    prevProps.item.price === nextProps.item.price &&
    prevProps.item.originalPrice === nextProps.item.originalPrice
  );
});
