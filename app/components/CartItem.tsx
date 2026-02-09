"use client";

import { CartItem as CartItemType } from "@/types/cart";
import { useCart } from "@/context/CartContext";
import { memo, useMemo, useCallback } from "react";
import Image from "next/image";
import { resolvePrimaryImage } from "@/utils/image";

interface Props {
  item: CartItemType;
}

function CartItem({ item }: Props) {
  const { increaseQty, decreaseQty, removeFromCart } = useCart();

  // /* 🔥 FIXED IMAGE RESOLUTION */
  // const imageSrc = useMemo(() => {
  //   const images = [
  //     (item as any).image,
  //     ...(((item as any).images || []) as string[]),
  //   ].filter(Boolean);

  //   return images.length > 0 ? images[0] : "/placeholder.jpg";
  // }, [item]);

  /* 🔥 FIXED IMAGE RESOLUTION */
  const imageSrc = resolvePrimaryImage(item);

  // ✅ Memoized total price and savings calculation
  const { totalPrice, itemSavings, itemOriginalTotal } = useMemo(() => {
    const totalPrice = item.qty * item.price;
    const itemSavings = item.originalPrice
      ? item.qty * (item.originalPrice - item.price)
      : 0;
    const itemOriginalTotal = item.originalPrice
      ? item.qty * item.originalPrice
      : totalPrice;

    return { totalPrice, itemSavings, itemOriginalTotal };
  }, [item.qty, item.price, item.originalPrice]);

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

            {/* ✅ PRICE WITH ORIGINAL PRICE */}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <p className="text-sm font-semibold text-gray-900">
                ₹{item.price.toLocaleString()} each
              </p>

              {item.originalPrice && (
                <>
                  <p className="text-xs text-gray-400 line-through">
                    ₹{item.originalPrice.toLocaleString()}
                  </p>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                    {Math.round(
                      ((item.originalPrice - item.price) / item.originalPrice) *
                        100,
                    )}
                    % off
                  </span>
                </>
              )}
            </div>

            {/* MOBILE: Total Price & Savings */}
            <div className="sm:hidden mt-2">
              <div className="flex items-baseline gap-2">
                <p className="text-lg font-bold text-gray-900">
                  ₹{totalPrice.toLocaleString()}
                </p>
                {item.originalPrice && (
                  <p className="text-sm text-gray-400 line-through">
                    ₹{itemOriginalTotal.toLocaleString()}
                  </p>
                )}
              </div>
              {itemSavings > 0 && (
                <p className="text-xs text-green-600 font-medium">
                  Saving ₹{itemSavings.toLocaleString()} on this item
                </p>
              )}
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
        <div className="hidden sm:flex flex-col items-end gap-2">
          {/* ✅ DESKTOP PRICE WITH SAVINGS */}
          <div className="flex items-baseline gap-2">
            <div className="text-lg font-bold text-gray-900">
              ₹{totalPrice.toLocaleString()}
            </div>
            {item.originalPrice && (
              <div className="text-sm text-gray-400 line-through">
                ₹{itemOriginalTotal.toLocaleString()}
              </div>
            )}
          </div>

          {/* ✅ SAVINGS TEXT */}
          {itemSavings > 0 && (
            <p className="text-xs text-green-600 font-medium">
              Save ₹{itemSavings.toLocaleString()}
            </p>
          )}

          <button
            onClick={handleRemove}
            className="text-red-600 hover:text-red-700 font-medium text-sm mt-1"
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
  // ✅ Updated comparison to include originalPrice
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.qty === nextProps.item.qty &&
    prevProps.item.size === nextProps.item.size &&
    prevProps.item.price === nextProps.item.price &&
    prevProps.item.originalPrice === nextProps.item.originalPrice
  );
});
