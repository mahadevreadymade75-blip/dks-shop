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
    <div className="group rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
        {/* LEFT - Image & Info */}
        <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
          {/* IMAGE */}
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
            <Image
              src={imageSrc}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 80px, 96px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              quality={75}
            />
          </div>

          {/* INFO */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2">
              {item.name}
            </h3>

            {item.size && (
              <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                Size: {item.size}
              </span>
            )}

            <p className="text-sm text-gray-600 mt-1.5">
              ₹{item.price.toLocaleString()} each
            </p>

            {/* MOBILE: Total Price */}
            <div className="sm:hidden mt-2">
              <p className="text-lg font-bold text-gray-900">
                ₹{totalPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* MIDDLE - Quantity Controls */}
        <div className="flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
            <button
              onClick={handleDecrease}
              className="h-8 w-8 rounded hover:bg-gray-100 text-gray-700 transition-colors flex items-center justify-center font-semibold"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span className="text-base font-semibold text-gray-900 min-w-[2ch] text-center px-2">
              {item.qty}
            </span>

            <button
              onClick={handleIncrease}
              className="h-8 w-8 rounded hover:bg-gray-100 text-gray-700 transition-colors flex items-center justify-center font-semibold"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* MOBILE: Remove Button */}
          <button
            onClick={handleRemove}
            className="sm:hidden text-red-600 hover:text-red-700 font-medium text-sm"
            aria-label="Remove item"
          >
            Remove
          </button>
        </div>

        {/* RIGHT - Desktop Price & Remove */}
        <div className="hidden sm:flex items-center gap-6">
          <div className="text-lg font-bold text-gray-900 min-w-[100px] text-right">
            ₹{totalPrice.toLocaleString()}
          </div>

          <button
            onClick={handleRemove}
            className="text-red-600 hover:text-red-700 font-medium text-sm"
            aria-label="Remove item"
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
