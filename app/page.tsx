"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { getProducts } from "@/data/products";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

/* ======================================================================
   HERO SLIDES DATA (ADS STYLE)
====================================================================== */

const heroSlides = [
  {
    image: "/hero/header-bg.jpg",
    title: "Men's Fashion",
    subtitle: "Premium styles for everyday confidence",
    cta: "Shop Men",
    link: "/men",
  },
  {
    image: "/hero/womens.png",
    title: "Women's Collection",
    subtitle: "Elegant looks made to turn heads",
    cta: "Shop Women",
    link: "/women",
  },
  {
    image: "/hero/kids.png",
    title: "Kids Wear",
    subtitle: "Comfortable • Colorful • Fun",
    cta: "Shop Kids",
    link: "/kids",
  },
  {
    image: "/hero/shoes.png",
    title: "Trending Shoes",
    subtitle: "Step into style & comfort",
    cta: "Shop Shoes",
    link: "/shoes",
  },
  {
    image: "/hero/kitchen.png",
    title: "Home & Kitchen",
    subtitle: "Upgrade your everyday living",
    cta: "Explore",
    link: "/home-kitchen",
  },
];

/* ======================================================================
   HOME PAGE
====================================================================== */

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const scrollVelocityRef = useRef(0);
  const isScrollingRef = useRef(false);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  /* ================= HERO AUTO SLIDE ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[currentSlide];

  /* ================= FEATURED PRODUCTS LOGIC ================= */
  useEffect(() => {
    let mounted = true;
    void getProducts().then((data) => {
      if (mounted) setAllProducts(data ?? []);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const featuredProducts = useMemo(() => {
    if (allProducts.length === 0) return [];

    const categories = Array.from(new Set(allProducts.map((p) => p.category)));

    const mixed = categories.flatMap((category) =>
      allProducts.filter((p) => p.category === category).slice(0, 4),
    );

    return mixed.slice(0, 20);
  }, [allProducts]);

  /* ================= ULTRA-OPTIMIZED AUTO SCROLL ================= */
  useEffect(() => {
    const el = sliderRef.current;
    if (!el || featuredProducts.length === 0) return;

    let rafId: number;
    const speed = 0.5;

    const scroll = () => {
      if (!isScrollingRef.current && el) {
        scrollVelocityRef.current += speed;

        if (scrollVelocityRef.current >= el.scrollWidth - el.clientWidth) {
          scrollVelocityRef.current = 0;
        }

        el.scrollLeft = scrollVelocityRef.current;
      }
      rafId = requestAnimationFrame(scroll);
    };

    const handleInteractionStart = () => {
      isScrollingRef.current = true;
    };

    const handleInteractionEnd = () => {
      if (el) {
        scrollVelocityRef.current = el.scrollLeft;
      }
      isScrollingRef.current = false;
    };

    el.addEventListener("pointerdown", handleInteractionStart);
    el.addEventListener("pointerup", handleInteractionEnd);
    el.addEventListener("pointerleave", handleInteractionEnd);

    rafId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("pointerdown", handleInteractionStart);
      el.removeEventListener("pointerup", handleInteractionEnd);
      el.removeEventListener("pointerleave", handleInteractionEnd);
    };
  }, [featuredProducts.length]);

  /* ================= RENDER ================= */
  return (
    <main className="bg-gradient-to-b from-gray-50 via-white to-blue-50/30 text-gray-900">
      {/* ======================================================
         HERO SECTION - OPTIMIZED IMAGE SIZING
      ====================================================== */}
      <section className="relative h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-100 to-blue-50 pt-16 md:pt-20 lg:pt-24">
        {/* Background Image - Properly Sized */}
        <Link href={slide.link} className="absolute inset-0">
          {!imageLoaded[currentSlide] && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-blue-100 animate-pulse" />
          )}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            quality={90}
            sizes="100vw"
            className={`object-cover object-center transition-opacity duration-700 ${
              imageLoaded[currentSlide] ? "opacity-100" : "opacity-0"
            }`}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmQ/9k="
            onLoadingComplete={() =>
              setImageLoaded((prev) => ({ ...prev, [currentSlide]: true }))
            }
          />
        </Link>

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />

        {/* Hero Content - Left aligned for desktop, centered for mobile */}
        <div
          key={currentSlide}
          className="relative z-10 w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16 mx-auto animate-fadeIn"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
            {/* Left Side - Product Info */}
            <div className="text-center md:text-left">
              <div className="inline-block mb-3 sm:mb-4 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm">
                <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Premium Collection
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-white drop-shadow-2xl">
                {slide.title}
              </h1>

              <p className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 max-w-md mx-auto md:mx-0 drop-shadow-lg font-medium">
                {slide.subtitle}
              </p>

              <div className="mt-6 sm:mt-7 md:mt-8 flex gap-3 sm:gap-4 justify-center md:justify-start flex-wrap">
                <Link
                  href={slide.link}
                  className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base font-bold shadow-xl shadow-blue-200 hover:shadow-2xl hover:shadow-blue-300 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  {slide.cta}
                </Link>

                <Link
                  href="/cart"
                  className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-full bg-white border-2 border-white text-gray-900 text-sm sm:text-base font-semibold hover:bg-gray-100 active:scale-95 transition-all duration-200"
                >
                  View Cart
                </Link>
              </div>
            </div>

            {/* Right Side - Welcome Message (All screens) */}
            <div className="text-center md:text-right">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-2xl border border-gray-200 max-w-md mx-auto md:ml-auto md:mr-0">
                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-gray-900 mb-2 sm:mb-3">
                  Welcome to
                </h2>
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black">
                    DKS Handloom
                  </h3>
                </div>
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium leading-relaxed">
                    Your trusted destination for premium fashion & lifestyle
                    products
                  </p>
                </div>
                <div className="mt-3 sm:mt-4 flex items-center justify-center md:justify-end gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-white"></div>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                  </div>
                  <span className="text-xs font-semibold text-gray-500">
                    10,000+ Happy Customers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? "w-8 bg-white shadow-lg"
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ======================================================
         CATEGORIES - Premium Light Design
      ====================================================== */}
      <section className="py-16 sm:py-20 md:py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Browse Categories
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-3"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            <CategoryCard title="Men" image="/man.jpg" link="/men" emoji="👔" />
            <CategoryCard
              title="Women"
              image="/women.jpg"
              link="/women"
              emoji="👗"
            />
            <CategoryCard
              title="Watches"
              image="/watch.jpg"
              link="/watches"
              emoji="⌚"
            />
            <CategoryCard
              title="Shoes"
              image="/shoes.jpg"
              link="/shoes"
              emoji="👟"
            />
            <CategoryCard
              title="Home & Kitchen"
              image="/homeKitchen.jpg"
              link="/home-kitchen"
              emoji="🏠"
            />
            <CategoryCard
              title="Kids"
              image="/child.jpg"
              link="/kids"
              emoji="👶"
            />
          </div>
        </div>
      </section>
      {/* ======================================================
         FEATURED PRODUCTS - Clean & Fast
      ====================================================== */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex items-end justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                Featured Products
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Handpicked for you
              </p>
            </div>

            <Link
              href="/men"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              View All
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Products Slider */}
          <div
            ref={sliderRef}
            className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] flex-none"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="mt-6 sm:hidden text-center">
            <Link
              href="/men"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              View All Products
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TRUST SECTION - Premium Light ================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Box */}
          <div className="bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 p-6 sm:p-8 md:p-12">
            {/* Heading */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <div className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-semibold mb-4 shadow-sm">
                Trusted Shopping Experience
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Why Shop With Us?
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                Trusted by customers across India for quality products and
                reliable service
              </p>
            </div>

            {/* Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <TrustPoint text="Cash on Delivery Available" icon="💰" />
              <TrustPoint text="100% Original Products" icon="✨" />
              <TrustPoint text="Fast Shipping All Over India" icon="🚚" />
              <TrustPoint text="Easy Return & Exchange" icon="🔄" />
              <TrustPoint text="Direct WhatsApp Support" icon="💬" />
              <TrustPoint text="Trusted by 10,000+ Happy Customers" icon="⭐" />
            </div>

            {/* CTA Button */}
            <div className="mt-8 sm:mt-10 text-center">
              <Link
                href="/men"
                className="inline-flex items-center gap-2 px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <span>Start Shopping Now</span>
                <span className="text-lg">🛍️</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Add scrollbar-hide utility */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </main>
  );
}

/* ======================================================================
   CATEGORY CARD COMPONENT - Premium Light
====================================================================== */

const CategoryCard = ({
  title,
  image,
  link,
  emoji,
}: {
  title: string;
  image: string;
  link: string;
  emoji: string;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      href={link}
      className="relative group h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-blue-50 shadow-md hover:shadow-xl ring-1 ring-gray-200 hover:ring-blue-300 transition-all duration-300"
    >
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-blue-100 animate-pulse" />
      )}

      <Image
        src={image}
        alt={title}
        fill
        quality={85}
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
        className={`object-cover transition-all duration-500 ${
          imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        } group-hover:scale-110 will-change-transform`}
        loading="lazy"
        onLoadingComplete={() => setImageLoaded(true)}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70 transition-all duration-300" />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 sm:pb-5 px-3">
        <div className="text-3xl sm:text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </div>
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-white text-center drop-shadow-lg">
          {title}
        </h3>
        <div className="mt-1.5 w-12 h-0.5 bg-white/70 rounded-full group-hover:w-16 transition-all duration-300" />
      </div>
    </Link>
  );
};

/* ======================================================================
   TRUST POINT COMPONENT - Premium Light
====================================================================== */

const TrustPoint = ({ text, icon }: { text: string; icon: string }) => {
  return (
    <div className="flex items-center gap-3 sm:gap-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group">
      {/* Icon */}
      <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>

      <p className="text-xs sm:text-sm md:text-base text-gray-800 font-semibold leading-tight">
        {text}
      </p>
    </div>
  );
};
