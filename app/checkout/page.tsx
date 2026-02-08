"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Image from "next/image";

export default function Checkout() {
  const { cart, totalPrice, isEmpty } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shipping = totalPrice > 1000 ? 0 : 50;
  const total = totalPrice + shipping;

  const placeOrder = async (formData: FormData) => {
    if (isEmpty) return;

    setIsSubmitting(true);

    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const address = formData.get("address");
    const city = formData.get("city");
    const pincode = formData.get("pincode");

    // ORDER NUMBER
    const orderNumber = "DKS-" + Math.floor(100000 + Math.random() * 900000);

    // DATE TIME
    const now = new Date();
    const dateTime = now.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const items = cart
      .map((i) => {
        const sizeText = i.size ? ` (${i.size})` : "";
        return `• ${i.name}${sizeText} × ${i.qty} = ₹${(i.qty * i.price).toLocaleString()}`;
      })
      .join("\n");

    /* ================= WHATSAPP MESSAGE ================= */
    const message = encodeURIComponent(`
🛍️ *NEW ORDER - DKS Handloom*

📦 *Order Number:* ${orderNumber}
📅 *Date:* ${dateTime}

━━━━━━━━━━━━━━━━━━━━━
👤 *CUSTOMER DETAILS*
━━━━━━━━━━━━━━━━━━━━━

*Name:* ${name}
*Phone:* ${phone}
${email ? `*Email:* ${email}` : ""}

🏠 *DELIVERY ADDRESS*
${address}
${city}, ${pincode}

━━━━━━━━━━━━━━━━━━━━━
🛒 *ORDER ITEMS*
━━━━━━━━━━━━━━━━━━━━━

${items}

━━━━━━━━━━━━━━━━━━━━━
💰 *PAYMENT DETAILS*
━━━━━━━━━━━━━━━━━━━━━

Subtotal: ₹${totalPrice.toLocaleString()}
Shipping: ${shipping === 0 ? "FREE" : `₹${shipping}`}
*Total Amount: ₹${total.toLocaleString()}*

Payment Method: Cash on Delivery

━━━━━━━━━━━━━━━━━━━━━

Thank you for shopping with us! 🙏
We'll contact you shortly to confirm your order.
    `);

    // Delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    window.open(`https://wa.me/+918741803589?text=${message}`);
    setIsSubmitting(false);
  };

  if (isEmpty) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="text-center bg-white rounded-2xl p-10 shadow-lg max-w-md w-full">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl mb-3 font-bold text-gray-900">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add items to cart before checkout
          </p>
          
            href="/"
            className="inline-block px-8 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition"
          >
            Continue Shopping
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 sm:px-6 py-12 sm:py-16 text-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Checkout
          </h1>
          <p className="text-gray-600 mt-1">
            Complete your order in just a few steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ================= LEFT : FORM ================= */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md">
              <h2 className="text-xl font-bold mb-6">Shipping Details</h2>

              <form action={placeOrder} className="space-y-5">
                {/* Full Name */}
                <Input
                  label="Full Name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                />

                {/* Phone */}
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  required
                />

                {/* Email */}
                <Input
                  label="Email Address (Optional)"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                />

                {/* Address */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Street Address *
                  </label>
                  <textarea
                    name="address"
                    required
                    rows={3}
                    placeholder="House no, building name, street, area"
                    className="px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none resize-none transition"
                  />
                </div>

                {/* City & Pincode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="City"
                    name="city"
                    placeholder="Your city"
                    required
                  />
                  <Input
                    label="Pincode"
                    name="pincode"
                    placeholder="6-digit pincode"
                    required
                  />
                </div>

                {/* Payment Method Info */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="font-semibold text-green-900 text-sm">
                        Cash on Delivery Available
                      </p>
                      <p className="text-green-700 text-xs mt-1">
                        Pay when you receive your order at your doorstep
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-base sm:text-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Place Order on WhatsApp</span>
                      <span>💬</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By placing order, you agree to our Terms & Conditions
                </p>
              </form>
            </div>
          </div>

          {/* ================= RIGHT : ORDER SUMMARY ================= */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Items with Images */}
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto scrollbar-thin">
                {cart.map((item) => {
                  const imageSrc = Array.isArray((item as any).images)
                    ? (item as any).images[0]
                    : (item as any).image || "/placeholder.jpg";

                  return (
                    <div
                      key={`${item.id}-${item.size ?? "nosize"}`}
                      className="flex gap-3 pb-4 border-b border-gray-100 last:border-0"
                    >
                      {/* Product Image */}
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                        <Image
                          src={imageSrc}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                          loading="eager"
                          quality={60}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 line-clamp-1">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                          {item.size && (
                            <span className="px-2 py-0.5 bg-gray-100 rounded">
                              {item.size}
                            </span>
                          )}
                          <span>×{item.qty}</span>
                        </div>
                        <p className="text-sm font-bold text-gray-900 mt-1">
                          ₹{(item.qty * item.price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 py-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <TrustItem icon="✅" text="Order Number Generated" />
                <TrustItem icon="🔒" text="Secure Checkout" />
                <TrustItem icon="🚚" text="Fast Delivery" />
                <TrustItem icon="💬" text="WhatsApp Support" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
      `}</style>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function Input({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition"
      />
    </div>
  );
}

function TrustItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <span className="text-lg">{icon}</span>
      <span>{text}</span>
    </div>
  );
}