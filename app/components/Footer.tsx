"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-100 via-white to-gray-100 text-gray-700 border-t border-gray-200">
      {/* TOP SOFT DIVIDER */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
          {/* BRAND */}
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              DKSHANDLOOM
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Smart shopping made simple.
              <br />
              Order directly on WhatsApp with trust & ease.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4 pt-3 text-lg">
              <span className="hover:text-black cursor-pointer transition">
                📘
              </span>
              <span className="hover:text-black cursor-pointer transition">
                📸
              </span>
              <span className="hover:text-black cursor-pointer transition">
                💬
              </span>
            </div>
          </div>

          {/* SHOP */}
          <FooterColumn title="Shop">
            <FooterLink href="/men">Men</FooterLink>
            <FooterLink href="/women">Women</FooterLink>
            <FooterLink href="/watches">Watches</FooterLink>
            <FooterLink href="/shoes">Shoes</FooterLink>
            <FooterLink href="/kids">Kids</FooterLink>
            <FooterLink href="/home-kitchen">Home & Kitchen</FooterLink>
          </FooterColumn>

          {/* SUPPORT */}
          <FooterColumn title="Support">
            <FooterLink href="/help">Help Center</FooterLink>
            <FooterLink href="/support">Customer Support</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms & Conditions</FooterLink>
          </FooterColumn>

          {/* CONTACT */}
          <FooterColumn title="Contact">
            <p className="text-sm text-gray-600">📍 India</p>
            <p className="text-sm text-gray-600">📞 +91 8741803589</p>
            <p className="text-sm text-gray-600">💬 WhatsApp Orders</p>
            <p className="text-sm text-gray-600">⏰ 10 AM – 8 PM</p>
          </FooterColumn>
        </div>

        {/* ================= TRUST STRIP ================= */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-gray-600 text-center">
          <TrustItem text="🔒 Secure Orders" />
          <TrustItem text="📦 Tracking ID" />
          <TrustItem text="💬 Direct WhatsApp Support" />
          <TrustItem text="🚚 Fast Delivery" />
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="border-t border-gray-200 my-12" />

        {/* ================= BOTTOM ================= */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} DKSHANDLOOM. All rights reserved.</p>
          <p className="text-sm text-gray-400">
            Crafted with <span className="text-red-500">❤</span> by
            <a
              href="https://hightechmg.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent hover:opacity-80 ml-1"
            >
              MG Tech Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ================= COMPONENTS ================= */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-5">{title}</h3>
      <div className="space-y-3 text-sm">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block text-gray-600 hover:text-black transition"
    >
      {children}
    </Link>
  );
}

function TrustItem({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-gray-200 py-3 bg-white shadow-sm">
      {text}
    </div>
  );
}
