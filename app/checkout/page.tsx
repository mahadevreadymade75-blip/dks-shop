"use client";

import { useCart } from "@/context/CartContext";

export default function Checkout() {
  const { cart } = useCart();

  const placeOrder = (formData: FormData) => {
    if (cart.length === 0) return;

    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const address = formData.get("address");

    // ORDER NUMBER
    const orderNumber = "DKS-" + Math.floor(100000 + Math.random() * 900000);

    // DATE TIME
    const now = new Date();
    const dateTime = now.toLocaleString();

    const items = cart
      .map((i) => {
        const sizeText = i.size ? ` | Size: ${i.size}` : "";
        return `- ${i.name}${sizeText} × ${i.qty} = ₹${i.qty * i.price}`;
      })
      .join("\n");

    const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

    /* ================= WHATSAPP ================= */

    const message = encodeURIComponent(`
🛍️ *NEW ORDER RECEIVED*

📦 Order Number: ${orderNumber}
🕒 Date & Time: ${dateTime}

👤 Name: ${name}
📞 Phone: ${phone}
📧 Email: ${email || "N/A"}

🏠 Address:
${address}

🛒 Items:
${items}

💰 Total: ₹${total}

Please save the Order Number for future reference.
        `);

    window.open(`https://wa.me/+918741803589?text=${message}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 px-4 py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
        {/* ================= LEFT : FORM ================= */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-10 shadow-xl">
          <h1 className="text-3xl font-extrabold mb-2">Checkout</h1>
          <p className="text-gray-600 mb-8">
            Enter your details & place order instantly
          </p>

          <form action={placeOrder} className="space-y-6">
            <Input label="Full Name" name="name" required />
            <Input label="Phone Number" name="phone" required />
            <Input label="Email (optional)" name="email" />

            {/* ADDRESS */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">
                Complete Delivery Address
              </label>
              <textarea
                name="address"
                required
                rows={4}
                placeholder="House no, street, area, city, pincode"
                className="
                  px-4 py-3 rounded-2xl
                  bg-white
                  border border-gray-300
                  focus:border-green-500
                  outline-none
                  resize-none
                  transition
                "
              />
            </div>

            <button
              type="submit"
              className="
                w-full py-4 rounded-full
                bg-gradient-to-r from-green-500 to-emerald-600
                text-white font-bold text-lg
                shadow-lg hover:scale-[1.03]
                transition
              "
            >
              Place Order on WhatsApp 💬
            </button>
          </form>
        </div>

        {/* ================= RIGHT : SUMMARY ================= */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-10 shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-5 text-sm">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.size ?? "nosize"}`}
                className="flex justify-between gap-4 border-b border-gray-200 pb-4"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  {item.size && (
                    <p className="text-xs text-gray-500">Size: {item.size}</p>
                  )}
                  <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                </div>
                <p className="font-semibold text-green-600">
                  ₹{item.qty * item.price}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center text-xl font-extrabold">
            <span>Total</span>
            <span className="text-green-600">
              ₹{cart.reduce((s, i) => s + i.qty * i.price, 0)}
            </span>
          </div>

          {/* TRUST */}
          <div className="mt-10 grid grid-cols-2 gap-4 text-xs text-gray-600">
            <Trust text="📦 Order Number Generated" />
            <Trust text="🔒 Secure Order" />
            <Trust text="🚚 Fast Delivery" />
            <Trust text="💬 WhatsApp Support" />
          </div>
        </div>
      </div>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function Input({
  label,
  name,
  required = false,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        name={name}
        required={required}
        className="
          px-4 py-3 rounded-2xl
          bg-white
          border border-gray-300
          focus:border-green-500
          outline-none
          transition
        "
      />
    </div>
  );
}

function Trust({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-gray-200 py-3 px-2 text-center bg-gray-50">
      {text}
    </div>
  );
}
