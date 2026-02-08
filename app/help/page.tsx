import Link from "next/link";

export default function HelpPage() {
  return (
    <main className="bg-gray-50 text-gray-900 min-h-screen">
      {/* ================= PAGE HEADER ================= */}
      <section className="pt-24 pb-16 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">
              <span className="text-sm font-semibold text-blue-600">
                Support
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Help Center
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions and learn how to shop with us
            </p>
          </div>
        </div>
      </section>

      {/* ================= QUICK LINKS ================= */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickLinkCard icon="📦" label="How to Order" href="#order" />
            <QuickLinkCard icon="💳" label="Payment" href="#payment" />
            <QuickLinkCard icon="🚚" label="Delivery" href="#delivery" />
            <QuickLinkCard icon="↩️" label="Returns" href="#returns" />
          </div>
        </div>
      </section>

      {/* ================= HELP SECTIONS ================= */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <HelpCard
            id="order"
            icon="📦"
            title="How to Order"
            items={[
              "Browse products from our home page by category",
              "Click on any product to view details and sizes",
              "Select your size and add the product to cart",
              "Review your cart and proceed to checkout",
              "Fill in your delivery details",
              "Place your order directly on WhatsApp",
              "Confirm your order with our team",
            ]}
          />

          <HelpCard
            id="payment"
            icon="💳"
            title="Payment Information"
            items={[
              "Cash on Delivery (COD) available for all orders",
              "UPI payment accepted via WhatsApp",
              "Bank transfer option available",
              "Payment details shared after order confirmation",
              "Pay securely when you receive your order",
              "No hidden charges or extra fees",
            ]}
          />

          <HelpCard
            id="delivery"
            icon="🚚"
            title="Delivery & Shipping"
            items={[
              "Free shipping on orders above ₹1000",
              "Delivery within 5-7 business days",
              "Shipping charges: ₹50 for orders below ₹1000",
              "Order tracking updates via WhatsApp",
              "Delivery time varies by location",
              "Express delivery available on request",
              "Any delays will be communicated promptly",
            ]}
          />

          <HelpCard
            id="returns"
            icon="↩️"
            title="Returns & Refunds"
            items={[
              "Returns accepted for damaged or defective products",
              "Issues must be reported within 48 hours of delivery",
              "Product must be in original condition with tags",
              "Contact us on WhatsApp with photos of the issue",
              "Refund processed within 7-10 business days",
              "Replacement option available for defective items",
              "Return shipping charges may apply in some cases",
            ]}
          />

          <HelpCard
            icon="💬"
            title="Customer Support"
            items={[
              "24/7 support available via WhatsApp",
              "Quick response time (usually within 1 hour)",
              "Track your order status anytime",
              "Get product recommendations and sizing help",
              "Resolve any issues directly with our team",
              "Friendly and professional assistance",
            ]}
          />

          <HelpCard
            icon="🔒"
            title="Privacy & Security"
            items={[
              "Your personal information is kept confidential",
              "Secure WhatsApp communication",
              "We never share your data with third parties",
              "Safe and secure payment processing",
              "All product images are original and accurate",
            ]}
          />
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-16 sm:py-20 bg-white border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="space-y-4">
            <FAQItem
              question="Do I need to create an account?"
              answer="No! You can shop and order directly without any signup or login."
            />
            <FAQItem
              question="How do I track my order?"
              answer="We'll send you tracking updates directly on WhatsApp once your order is shipped."
            />
            <FAQItem
              question="Can I change my order after placing it?"
              answer="Yes, contact us immediately on WhatsApp and we'll help you modify your order if it hasn't been processed yet."
            />
            <FAQItem
              question="Are all products original?"
              answer="Yes, we guarantee 100% original and authentic products from trusted brands."
            />
            <FAQItem
              question="What if the product doesn't fit?"
              answer="Please refer to our size guide before ordering. For exchanges due to sizing issues, contact us within 48 hours."
            />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-6">💬</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Still Need Help?
          </h2>

          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Our support team is ready to assist you directly on WhatsApp
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://wa.me/918741803589"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <span>💬</span>
              <span>WhatsApp Support</span>
            </a>

            <Link
              href="/"
              className="px-8 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:border-black hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= QUICK LINK CARD ================= */

function QuickLinkCard({
  icon,
  label,
  href,
}: {
  icon: string;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-white transition-all"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-semibold text-gray-700 text-center">
        {label}
      </span>
    </a>
  );
}

/* ================= HELP CARD ================= */

function HelpCard({
  id,
  icon,
  title,
  items,
}: {
  id?: string;
  icon: string;
  title: string;
  items: string[];
}) {
  return (
    <div
      id={id}
      className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{icon}</span>
        <h3 className="text-xl sm:text-2xl font-bold">{title}</h3>
      </div>

      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-700">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
              <span className="text-blue-600 text-xs font-bold">✓</span>
            </span>
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ================= FAQ ITEM ================= */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group bg-white border border-gray-200 rounded-lg overflow-hidden">
      <summary className="px-6 py-4 cursor-pointer list-none flex items-center justify-between font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
        <span>{question}</span>
        <span className="text-gray-400 group-open:rotate-180 transition-transform">
          ▼
        </span>
      </summary>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-gray-700">
        {answer}
      </div>
    </details>
  );
}
