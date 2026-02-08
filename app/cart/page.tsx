"use client";

import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import Link from "next/link";
import { useMemo } from "react";

export default function CartPage() {
  const { cart, totalItems, totalPrice, isEmpty, clearCart } = useCart();

  /* ================= CALCULATIONS ================= */
  const { subtotal, shipping, total } = useMemo(() => {
    const subtotal = totalPrice;
    const shipping = subtotal > 1000 ? 0 : 50; // Free shipping above ₹1000
    const total = subtotal + shipping;

    return { subtotal, shipping, total };
  }, [totalPrice]);

  /* ================= EMPTY CART ================= */
  if (isEmpty) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="text-center bg-white rounded-2xl p-10 shadow-lg max-w-md w-full">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl mb-3 font-bold text-gray-900">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything yet
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 sm:px-6 py-12 sm:py-16 text-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Shopping Cart
            </h1>
            <p className="text-gray-600 mt-1">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            onClick={() => {
              if (confirm("Clear all items from cart?")) {
                clearCart();
              }
            }}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Clear Cart
          </button>
        </div>

        {/* ================= CONTENT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ================= CART ITEMS ================= */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <CartItem
                key={`${item.id}-${item.size ?? "nosize"}`}
                item={item}
              />
            ))}
          </div>

          {/* ================= ORDER SUMMARY ================= */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-xl bg-white p-6 shadow-md">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm mb-4 pb-4 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>

                {/* Free Shipping Info */}
                {shipping > 0 && (
                  <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700">
                    Add ₹{(1000 - subtotal).toLocaleString()} more for FREE
                    shipping
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-green-600">
                  ₹{total.toLocaleString()}
                </span>
              </div>

              {/* ================= ACTION BUTTONS ================= */}
              <div className="space-y-3">
                <Link
                  href="/checkout"
                  className="block text-center py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition"
                >
                  Proceed to Checkout →
                </Link>

                <Link
                  href="/"
                  className="block text-center py-3 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold transition"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Trust Info */}
              <div className="mt-6 pt-6 border-t grid grid-cols-2 gap-3 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <span>🔒</span>
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>💰</span>
                  <span>COD Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TRUST BADGES ================= */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-white rounded-lg">
            <div className="text-2xl mb-1">🔒</div>
            <p className="text-sm font-medium text-gray-700">Secure Checkout</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="text-2xl mb-1">⚡</div>
            <p className="text-sm font-medium text-gray-700">Fast Delivery</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="text-2xl mb-1">💬</div>
            <p className="text-sm font-medium text-gray-700">24/7 Support</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="text-2xl mb-1">↩️</div>
            <p className="text-sm font-medium text-gray-700">Easy Returns</p>
          </div>
        </div>
      </div>
    </main>
  );
}
