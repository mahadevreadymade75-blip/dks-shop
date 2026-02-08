"use client";

import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import Link from "next/link";

export default function CartPage() {
    const { cart } = useCart();

    const total = cart.reduce(
        (sum, i) => sum + i.qty * i.price,
        0
    );

    /* ================= EMPTY CART ================= */
    if (cart.length === 0) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#f6f7f9] px-6">
                <div className="text-center bg-white border border-gray-200 rounded-3xl p-10 shadow-xl max-w-md w-full">
                    <p className="text-2xl mb-4 font-semibold text-gray-900">
                        Your cart is empty 😢
                    </p>
                    <p className="text-gray-500 mb-8">
                        Looks like you haven’t added anything yet
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-10 py-4 rounded-full bg-black text-white font-semibold hover:scale-105 transition"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f6f7f9] px-4 sm:px-6 py-16 text-gray-900">
            <div className="max-w-7xl mx-auto">

                {/* ================= HEADER ================= */}
                <div className="mb-12 text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold">
                        Your Cart
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Review selected items, sizes & quantities
                    </p>
                </div>

                {/* ================= CONTENT GRID ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* ================= CART ITEMS ================= */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map(item => (
                            <CartItem
                                key={`${item.id}-${item.size ?? "nosize"}`}
                                item={item}
                            />
                        ))}
                    </div>

                    {/* ================= ORDER SUMMARY ================= */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        <div className="rounded-3xl bg-white border border-gray-200 p-8 shadow-xl">

                            <h2 className="text-xl font-semibold mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-4 text-sm text-gray-600">
                                {cart.map(item => (
                                    <div
                                        key={`${item.id}-summary-${item.size}`}
                                        className="flex justify-between gap-4 border-b border-gray-200 pb-3"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {item.name}
                                            </p>

                                            {item.size && (
                                                <p className="text-gray-500 text-xs">
                                                    Size: {item.size}
                                                </p>
                                            )}

                                            <p className="text-gray-500 text-xs">
                                                Qty: {item.qty}
                                            </p>
                                        </div>

                                        <div className="font-semibold whitespace-nowrap text-gray-900">
                                            ₹{item.qty * item.price}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>

                            <p className="mt-2 text-xs text-gray-500">
                                * Each size variant is treated as a separate item
                            </p>

                            {/* ================= ACTIONS ================= */}
                            <div className="mt-8 space-y-4">
                                <Link
                                    href="/checkout"
                                    className="block text-center py-4 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow hover:scale-[1.02] transition"
                                >
                                    Proceed to Checkout →
                                </Link>

                                <Link
                                    href="/"
                                    className="block text-center py-4 rounded-full border border-gray-400 hover:bg-black hover:text-white transition"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= TRUST ================= */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-500 text-center">
                    <div>🔒 Secure Checkout</div>
                    <div>⚡ Fast Order</div>
                    <div>💬 WhatsApp Support</div>
                    <div>↩ Easy Return</div>
                </div>

            </div>
        </main>
    );
}
