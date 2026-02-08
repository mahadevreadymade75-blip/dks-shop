import Link from "next/link";

export default function SupportPage() {
  return (
    <main className="bg-gray-50 text-gray-900 min-h-screen">
      {/* ================= PAGE HEADER ================= */}
      <section className="pt-24 pb-16 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-green-50 border border-green-100">
              <span className="text-sm font-semibold text-green-600">
                Customer Support
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Support Center
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Get help with your orders, products, and shopping experience
            </p>
          </div>
        </div>
      </section>

      {/* ================= QUICK SUPPORT LINKS ================= */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickSupportCard
              icon="📦"
              label="Order Status"
              href="#order-status"
            />
            <QuickSupportCard icon="🔄" label="Returns" href="#returns" />
            <QuickSupportCard icon="🚚" label="Delivery" href="#delivery" />
            <QuickSupportCard icon="💬" label="Contact Us" href="#contact" />
          </div>
        </div>
      </section>

      {/* ================= SUPPORT CATEGORIES ================= */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <SupportSection
            id="order-status"
            icon="📦"
            title="Order Related Support"
            items={[
              {
                title: "Track Your Order",
                desc: "Get real-time updates on your order status via WhatsApp",
              },
              {
                title: "Order Confirmation",
                desc: "Receive instant confirmation after placing your order",
              },
              {
                title: "Modify Your Order",
                desc: "Change delivery address, items, or cancel before shipping",
              },
              {
                title: "Order History",
                desc: "View all your past orders and reorder easily",
              },
              {
                title: "Payment Issues",
                desc: "Resolve payment failures or pending transactions",
              },
              {
                title: "Invoice & Receipt",
                desc: "Get detailed invoices for all your purchases",
              },
            ]}
          />

          <SupportSection
            icon="👕"
            title="Product Queries"
            items={[
              {
                title: "Size Guide",
                desc: "Find the perfect fit with our detailed size charts",
              },
              {
                title: "Product Availability",
                desc: "Check stock status and get restock notifications",
              },
              {
                title: "Color & Material",
                desc: "Get accurate product descriptions and material details",
              },
              {
                title: "Product Care",
                desc: "Learn how to wash and maintain your products",
              },
              {
                title: "Product Authenticity",
                desc: "100% original products with quality guarantee",
              },
              {
                title: "Custom Requests",
                desc: "Special size or color requests? We'll try to help",
              },
            ]}
          />

          <SupportSection
            id="delivery"
            icon="🚚"
            title="Delivery & Shipping"
            items={[
              {
                title: "Delivery Timeline",
                desc: "Standard delivery within 5-7 business days",
              },
              {
                title: "Shipping Charges",
                desc: "Free shipping above ₹1000, ₹50 for smaller orders",
              },
              {
                title: "Address Change",
                desc: "Update delivery address before order is shipped",
              },
              {
                title: "Delivery Delays",
                desc: "Track delays and get estimated delivery updates",
              },
              {
                title: "Express Delivery",
                desc: "Urgent order? Request faster shipping options",
              },
              {
                title: "Failed Delivery",
                desc: "Reschedule delivery if you missed the courier",
              },
            ]}
          />

          <SupportSection
            id="returns"
            icon="↩️"
            title="Returns & Refunds"
            items={[
              {
                title: "Return Policy",
                desc: "48-hour return window for damaged or defective items",
              },
              {
                title: "Initiate Return",
                desc: "Contact us with photos of the issue via WhatsApp",
              },
              {
                title: "Refund Process",
                desc: "Refunds processed within 7-10 business days",
              },
              {
                title: "Exchange Option",
                desc: "Get replacement for defective or wrong items",
              },
              {
                title: "Return Shipping",
                desc: "Return pickup arranged for eligible returns",
              },
              {
                title: "Refund Status",
                desc: "Track your refund from initiation to completion",
              },
            ]}
          />

          <SupportSection
            icon="💳"
            title="Payment Support"
            items={[
              {
                title: "Payment Methods",
                desc: "COD, UPI, bank transfer - multiple options available",
              },
              {
                title: "Payment Security",
                desc: "Safe and secure transactions with privacy protection",
              },
              {
                title: "Failed Payments",
                desc: "Retry payment or get refund for failed transactions",
              },
              {
                title: "COD Charges",
                desc: "No extra charges for cash on delivery orders",
              },
              {
                title: "Payment Confirmation",
                desc: "Instant payment confirmation via WhatsApp",
              },
              {
                title: "Billing Issues",
                desc: "Resolve incorrect charges or billing disputes",
              },
            ]}
          />

          <SupportSection
            icon="🔐"
            title="Account & Privacy"
            items={[
              {
                title: "No Account Needed",
                desc: "Shop without signup - order directly via WhatsApp",
              },
              {
                title: "Data Privacy",
                desc: "Your personal information is kept confidential",
              },
              {
                title: "Secure Communication",
                desc: "All conversations through encrypted WhatsApp",
              },
              {
                title: "Update Details",
                desc: "Change phone number, address, or personal info anytime",
              },
              {
                title: "Delete Data",
                desc: "Request complete data deletion from our records",
              },
              {
                title: "Privacy Policy",
                desc: "Transparent data handling and usage practices",
              },
            ]}
          />
        </div>
      </section>

      {/* ================= COMMON ISSUES ================= */}
      <section className="py-16 sm:py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              Common Issues & Solutions
            </h2>
            <p className="text-gray-600">
              Quick fixes for the most common problems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IssueCard
              icon="❌"
              issue="Order Not Received"
              solution="Check tracking status on WhatsApp. If delayed beyond 7 days, contact support for immediate assistance."
            />
            <IssueCard
              icon="📱"
              issue="Not Getting Updates"
              solution="Ensure you've saved our WhatsApp number and check your message requests folder."
            />
            <IssueCard
              icon="💰"
              issue="Payment Deducted But Order Failed"
              solution="Your money is safe. Contact us with transaction details and we'll process your order or refund within 24 hours."
            />
            <IssueCard
              icon="📦"
              issue="Wrong Item Received"
              solution="Send us photos of the item received within 48 hours. We'll arrange replacement or refund immediately."
            />
            <IssueCard
              icon="📏"
              issue="Size Doesn't Fit"
              solution="Refer to our size guide before ordering. For unused items with tags, contact us within 48 hours for exchange."
            />
            <IssueCard
              icon="🏠"
              issue="Change Delivery Address"
              solution="Contact us immediately if order isn't shipped yet. We can update the address for you."
            />
          </div>
        </div>
      </section>

      {/* ================= CONTACT CTA ================= */}
      <section id="contact" className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-6">💬</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Need Immediate Help?
          </h2>

          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Our support team is ready to assist you 24/7 on WhatsApp
          </p>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
              <div className="text-center sm:text-left">
                <div className="text-4xl mb-2">⚡</div>
                <div className="font-semibold text-gray-900">Fast Response</div>
                <div className="text-sm text-gray-600">
                  Usually within 1 hour
                </div>
              </div>
              <div className="hidden sm:block w-px h-16 bg-green-200"></div>
              <div className="text-center sm:text-left">
                <div className="text-4xl mb-2">🎯</div>
                <div className="font-semibold text-gray-900">
                  Direct Support
                </div>
                <div className="text-sm text-gray-600">Talk to real people</div>
              </div>
              <div className="hidden sm:block w-px h-16 bg-green-200"></div>
              <div className="text-center sm:text-left">
                <div className="text-4xl mb-2">✅</div>
                <div className="font-semibold text-gray-900">
                  Problem Solved
                </div>
                <div className="text-sm text-gray-600">Quick resolution</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://wa.me/918741803589"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <span className="text-xl">💬</span>
              <span>Chat on WhatsApp</span>
            </a>

            <Link
              href="/help"
              className="px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:border-black hover:bg-gray-50 transition-all"
            >
              Visit Help Center
            </Link>

            <Link
              href="/"
              className="px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:border-black hover:bg-gray-50 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SUPPORT HOURS ================= */}
      <section className="py-12 bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl mb-2">🕐</div>
              <div className="font-semibold text-gray-900 mb-1">
                24/7 Availability
              </div>
              <div className="text-sm text-gray-600">
                Support available anytime
              </div>
            </div>
            <div>
              <div className="text-2xl mb-2">📞</div>
              <div className="font-semibold text-gray-900 mb-1">
                WhatsApp Only
              </div>
              <div className="text-sm text-gray-600">
                All support via WhatsApp
              </div>
            </div>
            <div>
              <div className="text-2xl mb-2">⭐</div>
              <div className="font-semibold text-gray-900 mb-1">
                Customer First
              </div>
              <div className="text-sm text-gray-600">
                Your satisfaction is our priority
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= QUICK SUPPORT CARD ================= */

function QuickSupportCard({
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

/* ================= SUPPORT SECTION ================= */

function SupportSection({
  id,
  icon,
  title,
  items,
}: {
  id?: string;
  icon: string;
  title: string;
  items: { title: string; desc: string }[];
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
              <span className="text-green-600 text-xs font-bold">✓</span>
            </span>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 mb-1">
                {item.title}
              </div>
              <div className="text-sm text-gray-600">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= ISSUE CARD ================= */

function IssueCard({
  icon,
  issue,
  solution,
}: {
  icon: string;
  issue: string;
  solution: string;
}) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0">{icon}</div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">{issue}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{solution}</p>
        </div>
      </div>
    </div>
  );
}
