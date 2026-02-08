"use client";

import { CartItem as CartItemType } from "@/types/cart";
import { useCart } from "@/context/CartContext";
import { memo, useMemo, useCallback } from "react";
import Image from "next/image";

interface Props {
  item: CartItemType;
}

function CartItem({ item }: Props) {
  const { increaseQty, decreaseQty, removeFromCart } = useCart();

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

  // Memoized total price calculation
  const totalPrice = useMemo(
    () => item.qty * item.price,
    [item.qty, item.price],
  );

  // Memoized callbacks for performance
  const handleDecrease = useCallback(() => {
    decreaseQty(item.id, item.size);
  }, [decreaseQty, item.id, item.size]);

  const handleIncrease = useCallback(() => {
    increaseQty(item.id, item.size);
  }, [increaseQty, item.id, item.size]);

  const handleRemove = useCallback(() => {
    removeFromCart(item.id, item.size);
  }, [removeFromCart, item.id, item.size]);

  return (
    <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 p-4 sm:p-5">
        {/* LEFT - Image & Info */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 w-full sm:w-auto">
          {/* IMAGE - OPTIMIZED with Next.js Image */}
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
            <Image
              src={imageSrc}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 80px, 96px"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              quality={75}
            />
          </div>

          {/* INFO */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 truncate">
              {item.name}
            </h3>

            {item.size && (
              <p className="text-xs text-gray-500 mt-1">
                Size:{" "}
                <span className="font-medium text-gray-700">{item.size}</span>
              </p>
            )}

            <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">
              ₹{item.price.toLocaleString()} / item
            </p>

            {/* MOBILE: Total Price */}
            <div className="sm:hidden mt-2">
              <p className="text-lg font-bold text-green-600">
                ₹{totalPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* MIDDLE - Quantity Controls */}
        <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-5 w-full sm:w-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleDecrease}
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 transition-colors duration-150 flex items-center justify-center font-bold text-lg sm:text-xl shadow-sm"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span className="text-base sm:text-lg font-bold text-gray-900 min-w-[2ch] text-center">
              {item.qty}
            </span>

            <button
              onClick={handleIncrease}
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 transition-colors duration-150 flex items-center justify-center font-bold text-lg sm:text-xl shadow-sm"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* MOBILE: Remove Button */}
          <button
            onClick={handleRemove}
            className="sm:hidden px-4 py-1.5 rounded-full bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-600 transition-colors duration-150 font-medium text-sm border border-red-200"
            aria-label="Remove item from cart"
          >
            Remove
          </button>
        </div>

        {/* RIGHT - Desktop Price & Remove */}
        <div className="hidden sm:flex items-center gap-4 md:gap-6">
          <div className="text-lg md:text-xl font-bold text-green-600 whitespace-nowrap">
            ₹{totalPrice.toLocaleString()}
          </div>

          <button
            onClick={handleRemove}
            className="px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-600 transition-colors duration-150 font-medium text-sm border border-red-200 whitespace-nowrap"
            aria-label="Remove item from cart"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

// Export memoized version for performance
export default memo(CartItem, (prevProps, nextProps) => {
  // Custom comparison for better performance
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.qty === nextProps.item.qty &&
    prevProps.item.size === nextProps.item.size &&
    prevProps.item.price === nextProps.item.price
  );
});
