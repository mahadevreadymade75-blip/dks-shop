"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // WhatsApp message
    const message = `
*New Contact Form Submission*
    
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}
    `.trim();

    const whatsappUrl = `https://wa.me/919950388083?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    setSubmitStatus("success");
    setIsSubmitting(false);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-indigo-50/30 text-gray-900">
      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm">
            <span className="text-xs sm:text-sm font-semibold text-white">
              We're Here to Help
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Get in Touch
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="py-12 sm:py-16 md:py-20 relative -mt-12 sm:-mt-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* CONTACT FORM */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8 md:p-10">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Send us a Message
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">
                    Fill out the form below and we'll get back to you shortly
                  </p>
                  <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-3"></div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 sm:space-y-6"
                >
                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone & Subject */}
                  <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200"
                        placeholder="Product Inquiry"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-base shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>

                  {/* Success Message */}
                  {submitStatus === "success" && (
                    <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-medium">
                      ✓ Message sent successfully! We'll get back to you soon.
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* CONTACT INFO SIDEBAR */}
            <div className="space-y-6">
              {/* Contact Details */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>

                <div className="space-y-5">
                  {/* Phone */}
                  <a
                    href="tel:+918741803589"
                    className="flex items-start gap-4 group hover:bg-blue-50 p-3 rounded-xl transition-all duration-200"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      📞
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Phone
                      </p>
                      <p className="text-sm font-bold text-gray-900 mt-1">
                        +91 9950388083
                      </p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/919950388083"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group hover:bg-green-50 p-3 rounded-xl transition-all duration-200"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      💬
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        WhatsApp
                      </p>
                      <p className="text-sm font-bold text-gray-900 mt-1">
                        Chat with us
                      </p>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-start gap-4 p-3 rounded-xl">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-xl">
                      📍
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Location
                      </p>
                      <p className="text-sm font-bold text-gray-900 mt-1">
                        Dhanau, Barmer - Rajasthan
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-4 p-3 rounded-xl">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center text-xl">
                      🕐
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Business Hours
                      </p>
                      <p className="text-sm font-bold text-gray-900 mt-1">
                        Mon - Sat: 9 AM - 8 PM
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Sunday: 10 AM - 6 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 sm:p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Need Quick Help?</h3>
                <p className="text-sm text-blue-100 mb-6">
                  Get instant support through WhatsApp
                </p>
                <Link
                  href="https://wa.me/919950388083?text=Hi! I need help"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-4 rounded-xl bg-white text-blue-600 font-bold text-center hover:bg-blue-50 active:scale-95 transition-all duration-200"
                >
                  Chat on WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Common Questions
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-4 mx-auto"></div>
          </div>

          <div className="space-y-4">
            <FAQItem
              question="Do you offer Cash on Delivery?"
              answer="Yes! We offer Cash on Delivery (COD) on all orders across India."
            />
            <FAQItem
              question="What is your return policy?"
              answer="We offer easy returns within 7 days of delivery. Products should be unused and in original packaging."
            />
            <FAQItem
              question="How long does shipping take?"
              answer="We deliver within 3-7 business days across India. Metro cities usually receive orders within 3-5 days."
            />
            <FAQItem
              question="Are your products original?"
              answer="Yes, we guarantee 100% original and authentic products from trusted brands."
            />
            <FAQItem
              question="How can I track my order?"
              answer="Once your order is shipped, you'll receive a tracking link via WhatsApp/SMS to track your delivery in real-time."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= FAQ ITEM COMPONENT ================= */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-blue-50/50 transition-colors duration-200"
      >
        <span className="text-base sm:text-lg font-bold text-gray-900 pr-4">
          {question}
        </span>
        <svg
          className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-5 text-sm sm:text-base text-gray-600 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}
