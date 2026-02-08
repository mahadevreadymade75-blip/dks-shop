import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-gray-50 text-gray-900">
      {/* ================= PAGE HEADER ================= */}
      <section className="pt-24 pb-16 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">
              <span className="text-sm font-semibold text-blue-600">
                About Us
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Welcome to DKS Handloom
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your trusted destination for premium fashion & lifestyle products
            </p>
          </div>
        </div>
      </section>

      {/* ================= ABOUT CONTENT ================= */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {/* WHO WE ARE */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🏪</span>
                <h2 className="text-2xl sm:text-3xl font-bold">Who We Are</h2>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We are a WhatsApp-based eCommerce platform built for people
                  who prefer simplicity over complexity. No accounts, no long
                  forms, and no confusing checkout processes.
                </p>

                <p>
                  Our goal is to make online shopping as easy as chatting.
                  Browse products, add items to cart, and place your order
                  directly on WhatsApp with a real person.
                </p>
              </div>
            </div>

            {/* WHY CHOOSE US */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">✨</span>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  Why Choose Us
                </h2>
              </div>

              <ul className="space-y-4">
                <FeatureItem text="WhatsApp-first ordering" />
                <FeatureItem text="No login or signup required" />
                <FeatureItem text="Direct seller communication" />
                <FeatureItem text="Fast replies & personal support" />
                <FeatureItem text="Clean and transparent experience" />
                <FeatureItem text="Cash on Delivery available" />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-16 sm:py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              Our Core Values
            </h2>
            <p className="text-gray-600">What drives us every day</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ValueCard
              icon="⚡"
              title="Simplicity"
              desc="No unnecessary steps. Just shop and order with ease."
            />

            <ValueCard
              icon="🚀"
              title="Speed"
              desc="Fast checkout and quick WhatsApp response times."
            />

            <ValueCard
              icon="🤝"
              title="Trust"
              desc="Real people, clear communication, honest service."
            />

            <ValueCard
              icon="💰"
              title="Affordability"
              desc="Quality products at competitive prices for everyone."
            />

            <ValueCard
              icon="📦"
              title="Quality"
              desc="100% original products from trusted brands."
            />

            <ValueCard
              icon="💬"
              title="Support"
              desc="24/7 customer support via WhatsApp."
            />
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard number="10,000+" label="Happy Customers" />
            <StatCard number="500+" label="Products" />
            <StatCard number="6" label="Categories" />
            <StatCard number="100%" label="Original Products" />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-6">🛍️</div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h3>

          <p className="text-gray-600 mb-8 text-lg">
            Explore our collection and order instantly via WhatsApp
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/"
              className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Browse Products
            </Link>

            <Link
              href="/cart"
              className="px-8 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:border-black hover:bg-gray-50 transition-colors"
            >
              View Cart
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= FEATURE ITEM ================= */

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
        <span className="text-green-600 text-sm">✓</span>
      </div>
      <span className="text-gray-700 font-medium">{text}</span>
    </li>
  );
}

/* ================= VALUE CARD ================= */

function ValueCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-md transition-all">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-gray-300 transition-colors">
      <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
        {number}
      </div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
    </div>
  );
}
