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
              DKS Handloom
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xs">
              Smart shopping made simple.
              <br />
              Order directly on WhatsApp with trust & ease.
            </p>

            {/* SOCIAL - Real social media links with proper icons */}
            <div className="flex gap-2.5 sm:gap-3 pt-1 sm:pt-2">
              <SocialIconSVG
                type="facebook"
                label="Facebook - DKS Handloom"
                link="https://www.facebook.com/profile.php?id=61554928177647&mibextid=LQQJ4d"
              />
              <SocialIconSVG
                type="instagram"
                label="Instagram - Main Store"
                link="https://instagram.com/d.k.s._handloom_dhanau"
              />
              <SocialIconSVG
                type="instagram"
                label="Instagram - Fateh Khan"
                link="https://instagram.com/fateh_khan_halepoto_"
              />
              <SocialIconSVG
                type="whatsapp"
                label="WhatsApp"
                link="https://wa.me/919950388083"
              />
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
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms & Conditions</FooterLink>
            <FooterLink href="https://wa.me/919950388083">
              Customer Support
            </FooterLink>
            <FooterLink href="https://wa.me/919950388083">
              Help Center
            </FooterLink>
            <FooterLink href="https://wa.me/919950388083">
              Track Order
            </FooterLink>
          </FooterColumn>

          {/* CONTACT */}
          <FooterColumn title="Contact">
            <ContactItem icon="📍" text="Dhanau, Rajasthan, India" />
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
            <ContactItem icon="⏰" text="10 AM – 8 PM (Mon-Sat)" />
            <ContactItem
              icon="📸"
              text="Instagram DM"
              link="https://instagram.com/d.k.s._handloom_dhanau"
            />
            <ContactItem
              icon="📘"
              text="Facebook Page"
              link="https://www.facebook.com/profile.php?id=61554928177647"
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
            © {new Date().getFullYear()} DKS Handloom. All rights reserved.
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
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 group"
      >
        <span className="flex items-center gap-2">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </span>
          <span>{children}</span>
        </span>
      </a>
    );
  }

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

function SocialIconSVG({
  type,
  label,
  link,
}: {
  type: "facebook" | "instagram" | "whatsapp";
  label: string;
  link: string;
}) {
  const getIcon = () => {
    switch (type) {
      case "facebook":
        return (
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case "instagram":
        return (
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case "whatsapp":
        return (
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        );
    }
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600"
      title={label}
    >
      {getIcon()}
    </a>
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
