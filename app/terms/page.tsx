"use client";

import Link from "next/link";

export default function TermsConditionsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-indigo-50/30 text-gray-900">
      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm">
            <span className="text-xs sm:text-sm font-semibold text-white">
              Legal Agreement
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Terms & Conditions
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
                Welcome to{" "}
                <strong className="text-gray-900">DKS Handloom</strong>. These
                Terms and Conditions govern your use of our website and the
                purchase of products from us. By accessing our website or making
                a purchase, you agree to be bound by these terms.
              </p>
              <p className="mt-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                Please read these terms carefully before using our services. If
                you do not agree with any part of these terms, you should not
                use our website.
              </p>
            </div>

            {/* Section 1 */}
            <TermsSection
              number="1"
              title="General Terms"
              content={
                <>
                  <p className="mb-4">
                    By using our website and services, you confirm that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>You are at least 18 years of age</li>
                    <li>
                      You have the legal capacity to enter into binding
                      contracts
                    </li>
                    <li>
                      All information you provide is accurate and complete
                    </li>
                    <li>
                      You will comply with all applicable laws and regulations
                    </li>
                    <li>
                      You will not use our services for any illegal or
                      unauthorized purpose
                    </li>
                  </ul>
                </>
              }
            />

            {/* Section 2 */}
            <TermsSection
              number="2"
              title="Product Information and Pricing"
              content={
                <>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      We strive to display product colors and images as
                      accurately as possible, but we cannot guarantee that your
                      device's display will accurately reflect the actual
                      product colors
                    </li>
                    <li>
                      All prices are listed in Indian Rupees (INR) and are
                      inclusive of applicable taxes unless stated otherwise
                    </li>
                    <li>
                      We reserve the right to modify prices at any time without
                      prior notice
                    </li>
                    <li>
                      Prices are subject to change, but orders placed before a
                      price change will be honored at the original price
                    </li>
                    <li>
                      Product availability is subject to change without notice
                    </li>
                  </ul>
                </>
              }
            />

            {/* Section 3 */}
            <TermsSection
              number="3"
              title="Orders and Payment"
              content={
                <>
                  <p className="mb-4">
                    <strong>Order Placement:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                    <li>
                      All orders are subject to acceptance and availability
                    </li>
                    <li>We reserve the right to refuse or cancel any order</li>
                    <li>
                      Order confirmation does not guarantee product availability
                    </li>
                    <li>
                      You will receive an order confirmation via email/WhatsApp
                      after successful order placement
                    </li>
                  </ul>

                  <p className="mb-4">
                    <strong>Payment Methods:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Cash on Delivery (COD)</li>
                    <li>Online payment via secure payment gateways</li>
                    <li>UPI, Credit/Debit Cards, Net Banking</li>
                    <li>
                      All online payments are processed through secure,
                      third-party payment gateways
                    </li>
                  </ul>
                </>
              }
            />

            {/* Section 4 */}
            <TermsSection
              number="4"
              title="Shipping and Delivery"
              content={
                <>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      We ship across India through trusted courier partners
                    </li>
                    <li>
                      Standard delivery time is 3-7 business days (may vary
                      based on location)
                    </li>
                    <li>
                      Shipping charges may apply based on order value and
                      location
                    </li>
                    <li>
                      We are not responsible for delays caused by courier
                      services or unforeseen circumstances
                    </li>
                    <li>
                      You will receive tracking information once your order is
                      shipped
                    </li>
                    <li>
                      Please ensure the delivery address is accurate and
                      complete
                    </li>
                  </ul>
                </>
              }
            />

            {/* Section 5 */}
            <TermsSection
              number="5"
              title="Returns and Refunds"
              content={
                <>
                  <p className="mb-4">
                    <strong>Return Policy:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                    <li>Returns accepted within 7 days of delivery</li>
                    <li>
                      Products must be unused, unwashed, and in original
                      packaging
                    </li>
                    <li>Tags and labels must be intact</li>
                    <li>Return shipping costs may apply</li>
                    <li>
                      Certain products (intimate wear, personalized items) are
                      non-returnable
                    </li>
                  </ul>

                  <p className="mb-4">
                    <strong>Refund Process:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Refunds will be processed within 7-10 business days after
                      receiving the returned product
                    </li>
                    <li>
                      Refunds will be credited to the original payment method
                    </li>
                    <li>For COD orders, refunds will be via bank transfer</li>
                    <li>Shipping charges are non-refundable</li>
                  </ul>
                </>
              }
            />

            {/* Section 6 */}
            <TermsSection
              number="6"
              title="Cancellation Policy"
              content={
                <>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Orders can be cancelled before shipping via WhatsApp or
                      phone
                    </li>
                    <li>
                      Once shipped, orders cannot be cancelled but can be
                      returned as per our return policy
                    </li>
                    <li>
                      Full refund will be provided for cancelled orders (if
                      applicable)
                    </li>
                    <li>
                      We reserve the right to cancel orders due to product
                      unavailability or other reasons
                    </li>
                  </ul>
                </>
              }
            />

            {/* Section 7 */}
            <TermsSection
              number="7"
              title="Intellectual Property"
              content={
                <p>
                  All content on this website, including but not limited to
                  text, images, logos, graphics, and software, is the property
                  of DKS Handloom and is protected by copyright and trademark
                  laws. You may not reproduce, distribute, or use any content
                  without our prior written permission.
                </p>
              }
            />

            {/* Section 8 */}
            <TermsSection
              number="8"
              title="User Conduct"
              content={
                <>
                  <p className="mb-4">You agree not to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Use our website for any unlawful or fraudulent purpose
                    </li>
                    <li>
                      Interfere with the security or functionality of our
                      website
                    </li>
                    <li>Submit false or misleading information</li>
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe upon the rights of others</li>
                    <li>Upload viruses or malicious code</li>
                  </ul>
                </>
              }
            />

            {/* Section 9 */}
            <TermsSection
              number="9"
              title="Limitation of Liability"
              content={
                <p>
                  To the maximum extent permitted by law, DKS Handloom shall not
                  be liable for any indirect, incidental, special, or
                  consequential damages arising from your use of our website or
                  products. Our total liability shall not exceed the amount paid
                  for the product in question.
                </p>
              }
            />

            {/* Section 10 */}
            <TermsSection
              number="10"
              title="Indemnification"
              content={
                <p>
                  You agree to indemnify and hold harmless DKS Handloom, its
                  officers, directors, employees, and agents from any claims,
                  damages, losses, or expenses arising from your violation of
                  these Terms and Conditions or your use of our services.
                </p>
              }
            />

            {/* Section 11 */}
            <TermsSection
              number="11"
              title="Governing Law"
              content={
                <p>
                  These Terms and Conditions shall be governed by and construed
                  in accordance with the laws of India. Any disputes arising
                  under these terms shall be subject to the exclusive
                  jurisdiction of the courts in Jaipur, Rajasthan.
                </p>
              }
            />

            {/* Section 12 */}
            <TermsSection
              number="12"
              title="Changes to Terms"
              content={
                <p>
                  We reserve the right to modify these Terms and Conditions at
                  any time. Changes will be effective immediately upon posting
                  on this page. Your continued use of our website after changes
                  are posted constitutes your acceptance of the modified terms.
                </p>
              }
            />

            {/* Section 13 */}
            <TermsSection
              number="13"
              title="Contact Information"
              content={
                <>
                  <p className="mb-4">
                    If you have any questions about these Terms and Conditions,
                    please contact us:
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
                          +91 8741803589
                        </a>
                      </p>
                      <p>
                        <strong>WhatsApp:</strong>{" "}
                        <a
                          href="https://wa.me/918741803589"
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

            {/* Acceptance */}
            <div className="mt-10 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <p className="text-sm sm:text-base text-gray-800 font-medium">
                <strong>
                  By using our website and services, you acknowledge that you
                  have read, understood, and agree to be bound by these Terms
                  and Conditions.
                </strong>
              </p>
            </div>

            {/* Footer Navigation */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/privacy-policy"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Privacy Policy →
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

/* ================= TERMS SECTION COMPONENT ================= */
function TermsSection({
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
