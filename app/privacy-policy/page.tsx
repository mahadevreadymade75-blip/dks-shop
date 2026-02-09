"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-indigo-50/30 text-gray-900">
      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm">
            <span className="text-xs sm:text-sm font-semibold text-white">
              Legal Information
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Privacy Policy
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
            Last updated: February 9, 2026
          </p>
        </div>

        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8 md:p-10 lg:p-12">
            {/* Introduction */}
            <div className="mb-8 sm:mb-10">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                At <strong className="text-gray-900">DKS Handloom</strong>, we
                are committed to protecting your privacy and ensuring the
                security of your personal information. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you visit our website or make a purchase from
                us.
              </p>
            </div>

            {/* Section 1 */}
            <PolicySection
              number="1"
              title="Information We Collect"
              content={
                <>
                  <p className="mb-4">
                    We collect information that you provide directly to us when
                    you:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Create an account or place an order</li>
                    <li>
                      Sign up for our newsletter or marketing communications
                    </li>
                    <li>Contact us through our website, email, or WhatsApp</li>
                    <li>Participate in surveys, contests, or promotions</li>
                    <li>Leave reviews or feedback on our products</li>
                  </ul>

                  <p className="mt-6 mb-4">
                    <strong>Personal Information may include:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Billing and shipping addresses</li>
                    <li>
                      Payment information (processed securely through payment
                      gateways)
                    </li>
                    <li>Order history and preferences</li>
                    <li>Communication history with our customer support</li>
                  </ul>
                </>
              }
            />

            {/* Section 2 */}
            <PolicySection
              number="2"
              title="How We Use Your Information"
              content={
                <>
                  <p className="mb-4">We use your information to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Process and fulfill your orders</li>
                    <li>Send order confirmations and shipping updates</li>
                    <li>Provide customer support and respond to inquiries</li>
                    <li>
                      Send promotional emails about new products, special
                      offers, and updates (with your consent)
                    </li>
                    <li>Improve our website, products, and services</li>
                    <li>Prevent fraud and enhance security</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </>
              }
            />

            {/* Section 3 */}
            <PolicySection
              number="3"
              title="Information Sharing and Disclosure"
              content={
                <>
                  <p className="mb-4">
                    We do not sell, trade, or rent your personal information to
                    third parties. We may share your information with:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Service Providers:</strong> Trusted third-party
                      companies that help us operate our business (shipping
                      companies, payment processors, email service providers)
                    </li>
                    <li>
                      <strong>Legal Requirements:</strong> When required by law
                      or to protect our rights and safety
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> In connection with
                      any merger, sale, or transfer of our business
                    </li>
                  </ul>
                </>
              }
            />

            {/* Section 4 */}
            <PolicySection
              number="4"
              title="Data Security"
              content={
                <p>
                  We implement appropriate technical and organizational security
                  measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                  However, no method of transmission over the Internet or
                  electronic storage is 100% secure, and we cannot guarantee
                  absolute security.
                </p>
              }
            />

            {/* Section 5 */}
            <PolicySection
              number="5"
              title="Cookies and Tracking Technologies"
              content={
                <>
                  <p className="mb-4">
                    We use cookies and similar tracking technologies to enhance
                    your browsing experience, analyze website traffic, and
                    understand user behavior. You can control cookies through
                    your browser settings.
                  </p>
                  <p className="mt-4">
                    <strong>Types of cookies we use:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>
                      Essential cookies (required for website functionality)
                    </li>
                    <li>
                      Analytics cookies (to understand how visitors use our
                      site)
                    </li>
                    <li>
                      Marketing cookies (to deliver relevant advertisements)
                    </li>
                  </ul>
                </>
              }
            />

            {/* Section 6 */}
            <PolicySection
              number="6"
              title="Your Rights and Choices"
              content={
                <>
                  <p className="mb-4">You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access and review your personal information</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent for data processing</li>
                  </ul>
                  <p className="mt-4">
                    To exercise these rights, please contact us at{" "}
                    <a
                      href="https://wa.me/919950388083"
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      WhatsApp
                    </a>
                    .
                  </p>
                </>
              }
            />

            {/* Section 7 */}
            <PolicySection
              number="7"
              title="Children's Privacy"
              content={
                <p>
                  Our services are not directed to individuals under the age of
                  18. We do not knowingly collect personal information from
                  children. If you believe we have collected information from a
                  child, please contact us immediately.
                </p>
              }
            />

            {/* Section 8 */}
            <PolicySection
              number="8"
              title="Changes to This Privacy Policy"
              content={
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date. We encourage
                  you to review this Privacy Policy periodically.
                </p>
              }
            />

            {/* Section 9 */}
            <PolicySection
              number="9"
              title="Contact Us"
              content={
                <>
                  <p className="mb-4">
                    If you have any questions or concerns about this Privacy
                    Policy, please contact us:
                  </p>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <p className="font-semibold text-gray-900 mb-3">
                      DKS Handloom
                    </p>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <strong>Phone:</strong>{" "}
                        <a
                          href="tel:+918741803589"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          +91 9950388083
                        </a>
                      </p>
                      <p>
                        <strong>WhatsApp:</strong>{" "}
                        <a
                          href="https://wa.me/919950388083"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Chat with us
                        </a>
                      </p>
                      <p>
                        <strong>Location:</strong> Dhanau, Barmer - Rajasthan
                      </p>
                    </div>
                  </div>
                </>
              }
            />

            {/* Footer Navigation */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/terms"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Terms & Conditions →
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Contact Us →
                </Link>
                <Link
                  href="/"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Back to Home →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= POLICY SECTION COMPONENT ================= */
function PolicySection({
  number,
  title,
  content,
}: {
  number: string;
  title: string;
  content: React.ReactNode;
}) {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex items-start gap-3 sm:gap-4 mb-4">
        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-md">
          {number}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
          {title}
        </h2>
      </div>
      <div className="ml-11 sm:ml-14 text-sm sm:text-base text-gray-700 leading-relaxed">
        {content}
      </div>
    </div>
  );
}
