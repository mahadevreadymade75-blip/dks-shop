"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 text-gray-700 border-t border-gray-200">
      {/* Decorative top border */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* BRAND */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              DKSHANDLOOM
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xs">
              Smart shopping made simple.
              <br />
              Order directly on WhatsApp with trust & ease.
            </p>

            {/* SOCIAL - Enhanced with real links */}
            <div className="flex gap-2.5 sm:gap-3 pt-1 sm:pt-2">
              <SocialIcon icon="📘" label="Facebook" />
              <SocialIcon icon="📸" label="Instagram" />
              <SocialIcon icon="💬" label="WhatsApp" />
              <SocialIcon icon="🐦" label="Twitter" />
            </div>
          </div>

          {/* SHOP */}
          <FooterColumn title="Shop">
            <FooterLink href="/men">Men's Fashion</FooterLink>
            <FooterLink href="/women">Women's Collection</FooterLink>
            <FooterLink href="/watches">Watches</FooterLink>
            <FooterLink href="/shoes">Shoes</FooterLink>
            <FooterLink href="/kids">Kids Wear</FooterLink>
            <FooterLink href="/home-kitchen">Home & Kitchen</FooterLink>
          </FooterColumn>

          {/* SUPPORT */}
          <FooterColumn title="Support">
            <FooterLink href="/help">Help Center</FooterLink>
            <FooterLink href="/support">Customer Support</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms & Conditions</FooterLink>
            <FooterLink href="/about">About Us</FooterLink>
          </FooterColumn>

          {/* CONTACT */}
          <FooterColumn title="Contact">
            <ContactItem icon="📍" text="India" />
            <ContactItem
              icon="📞"
              text="+91 9950388083"
              link="tel:+919950388083"
            />
            <ContactItem
              icon="💬"
              text="WhatsApp Orders"
              link="https://wa.me/919950388083"
            />
            <ContactItem icon="⏰" text="10 AM – 8 PM" />
            <ContactItem
              icon="✉️"
              text="support@dkshandloom.com"
              link="mailto:support@dkshandloom.com"
            />
          </FooterColumn>
        </div>

        {/* ================= TRUST STRIP ================= */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          <TrustItem icon="🔒" text="Secure Orders" />
          <TrustItem icon="📦" text="Order Tracking" />
          <TrustItem icon="💬" text="WhatsApp Support" />
          <TrustItem icon="🚚" text="Fast Delivery" />
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="border-t border-gray-200 my-6 sm:my-8" />

        {/* ================= BOTTOM ================= */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between items-center text-xs">
          <p className="text-gray-600 text-center sm:text-left">
            © {new Date().getFullYear()} DKSHANDLOOM. All rights reserved.
          </p>
          <p className="text-gray-600 text-center sm:text-right">
            Crafted with <span className="text-red-500">❤</span> by
            <a
              href="https://hightechmg.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity ml-1"
            >
              MG Tech Studio
            </a>
          </p>
        </div>

        {/* Payment & Security Badges */}
        <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-600">
            <span className="flex items-center gap-1.5">
              <span>💳</span>
              <span>Cash on Delivery</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <span>🔐</span>
              <span>SSL Secured</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <span>✅</span>
              <span>100% Original</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <span>↩️</span>
              <span>Easy Returns</span>
            </span>
          </div>
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
      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
        <span className="h-0.5 w-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        {title}
      </h3>
      <div className="space-y-2 text-xs sm:text-sm">{children}</div>
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
      className="block text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 group"
    >
      <span className="flex items-center gap-2">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
          →
        </span>
        <span>{children}</span>
      </span>
    </Link>
  );
}

function ContactItem({
  icon,
  text,
  link,
}: {
  icon: string;
  text: string;
  link?: string;
}) {
  const content = (
    <span className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
      <span className="text-sm">{icon}</span>
      <span>{text}</span>
    </span>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-600 transition-colors"
      >
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}

function SocialIcon({ icon, label }: { icon: string; label: string }) {
  return (
    <div
      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center text-base sm:text-lg cursor-pointer transition-all hover:scale-110 active:scale-95 border border-gray-200 hover:border-blue-300"
      title={label}
    >
      {icon}
    </div>
  );
}

function TrustItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="group rounded-lg sm:rounded-xl border border-gray-200 bg-white py-2.5 sm:py-3 px-2 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md transition-all duration-300">
      <div className="flex flex-col items-center gap-1">
        <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform">
          {icon}
        </span>
        <span className="text-[9px] sm:text-[10px] font-medium text-gray-600 group-hover:text-blue-600 transition-colors text-center leading-tight">
          {text}
        </span>
      </div>
    </div>
  );
}
