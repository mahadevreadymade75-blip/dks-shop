"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { getProducts } from "@/data/products";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

/* ======================================================================
   HERO SLIDES DATA
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

  /* ================= ULTRA-SMOOTH AUTO SCROLL ================= */
  useEffect(() => {
    const el = sliderRef.current;
    if (!el || featuredProducts.length === 0) return;

    let rafId: number;
    const speed = 0.3; // Slower, smoother speed
    let isPaused = false;
    let pauseTimeout: NodeJS.Timeout;
    let currentPosition = 0;

    const scroll = () => {
      if (!isPaused && el) {
        // Smooth increment
        currentPosition += speed;

        // Loop back to start smoothly
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (currentPosition >= maxScroll) {
          currentPosition = 0;
        }

        // Apply smooth scroll
        el.scrollLeft = currentPosition;
      }
      rafId = requestAnimationFrame(scroll);
    };

    // Pause on user interaction
    const pauseScroll = () => {
      isPaused = true;
      currentPosition = el.scrollLeft; // Save current position
      clearTimeout(pauseTimeout);

      // Resume after 3 seconds
      pauseTimeout = setTimeout(() => {
        isPaused = false;
      }, 3000);
    };

    // Event listeners - passive for better performance
    el.addEventListener("mouseenter", pauseScroll, { passive: true });
    el.addEventListener("touchstart", pauseScroll, { passive: true });
    el.addEventListener("wheel", pauseScroll, { passive: true });

    // Start scrolling
    rafId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(pauseTimeout);
      el.removeEventListener("mouseenter", pauseScroll);
      el.removeEventListener("touchstart", pauseScroll);
      el.removeEventListener("wheel", pauseScroll);
    };
  }, [featuredProducts.length]);

  /* ================= RENDER ================= */
  return (
    <main className="bg-gradient-to-b from-gray-50 via-white to-blue-50/30 text-gray-900">
      {/* ======================================================
         HERO SECTION - UNIVERSAL RESPONSIVE
      ====================================================== */}
      <section className="relative min-h-[480px] h-[calc(100vh-4rem)] max-h-[800px] flex items-center overflow-hidden bg-gradient-to-br from-gray-100 to-blue-50 pt-16 md:pt-20 lg:pt-24">
        {/* Background Image */}
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

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />

        {/* Hero Content */}
        <div
          key={currentSlide}
          className="relative z-10 w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-16 mx-auto animate-fadeIn"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-8">
            {/* Left Side */}
            <div className="text-center md:text-left max-w-2xl mx-auto md:mx-0">
              <div className="inline-block mb-2 sm:mb-3 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm">
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Premium Collection
                </span>
              </div>

              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-white drop-shadow-2xl mb-2 sm:mb-3 md:mb-4">
                {slide.title}
              </h1>

              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-100 max-w-md mx-auto md:mx-0 drop-shadow-lg font-medium mb-4 sm:mb-5 md:mb-6">
                {slide.subtitle}
              </p>

              <div className="flex gap-2 sm:gap-3 justify-center md:justify-start flex-wrap">
                <Link
                  href={slide.link}
                  className="px-5 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm md:text-base font-bold shadow-xl shadow-blue-200 hover:shadow-2xl hover:shadow-blue-300 hover:scale-105 active:scale-95 transition-all duration-200 touch-manipulation"
                >
                  {slide.cta}
                </Link>

                <Link
                  href="/cart"
                  className="px-5 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-full bg-white border-2 border-white text-gray-900 text-xs sm:text-sm md:text-base font-semibold hover:bg-gray-100 active:scale-95 transition-all duration-200 touch-manipulation"
                >
                  View Cart
                </Link>
              </div>
            </div>

            {/* Right Side - Welcome */}
            <div className="text-center md:text-right">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-2xl border border-gray-200 max-w-sm mx-auto md:ml-auto md:mr-0">
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-extrabold text-gray-900 mb-1 sm:mb-2">
                  Welcome to
                </h2>
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black">
                    DKS Handloom
                  </h3>
                </div>
                <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200">
                  <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-600 font-medium leading-relaxed">
                    Your trusted destination for premium fashion & lifestyle
                    products
                  </p>
                </div>
                <div className="mt-2 sm:mt-3 flex items-center justify-center md:justify-end gap-1.5 sm:gap-2">
                  <div className="flex -space-x-1 sm:-space-x-1.5 md:-space-x-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-white"></div>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                  </div>
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-gray-500">
                    10,000+ Happy Customers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 sm:h-1.5 md:h-2 rounded-full transition-all duration-300 touch-manipulation ${
                idx === currentSlide
                  ? "w-5 sm:w-6 md:w-8 bg-white shadow-lg"
                  : "w-1 sm:w-1.5 md:w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ======================================================
         CATEGORIES - UNIVERSAL RESPONSIVE
      ====================================================== */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <div className="inline-block mb-2 sm:mb-3 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Browse Categories
              </span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <div className="h-0.5 sm:h-1 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-2 sm:mt-3"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
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
         FEATURED PRODUCTS - UNIVERSAL RESPONSIVE
      ====================================================== */}
      <section className="py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-4 sm:mb-5 md:mb-6 lg:mb-8">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-0.5 sm:mb-1">
                Featured Products
              </h2>
              <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-600">
                Handpicked for you
              </p>
            </div>

            <Link
              href="/men"
              className="hidden sm:inline-flex items-center gap-1 sm:gap-2 text-xs md:text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              View All
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
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

          <div
            ref={sliderRef}
            className="flex gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 overflow-x-auto pb-3 sm:pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "auto",
            }}
          >
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="w-[140px] xs:w-[150px] sm:w-[170px] md:w-[200px] lg:w-[230px] xl:w-[260px] flex-none"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-4 sm:mt-5 md:mt-6 sm:hidden text-center">
            <Link
              href="/men"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gray-900 text-white text-xs sm:text-sm font-semibold hover:bg-gray-800 active:scale-95 transition-all duration-200 touch-manipulation"
            >
              View All Products
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
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

      {/* ================= TRUST SECTION - UNIVERSAL RESPONSIVE ================= */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              <div className="inline-block px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-700 text-[10px] sm:text-xs md:text-sm font-semibold mb-3 sm:mb-4 shadow-sm">
                Trusted Shopping Experience
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900">
                Why Shop With Us?
              </h2>
              <p className="mt-2 sm:mt-3 md:mt-4 text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-600 max-w-2xl mx-auto">
                Trusted by customers across India for quality products and
                reliable service
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
              <TrustPoint text="Cash on Delivery Available" icon="💰" />
              <TrustPoint text="100% Original Products" icon="✨" />
              <TrustPoint text="Fast Shipping All Over India" icon="🚚" />
              <TrustPoint text="Easy Return & Exchange" icon="🔄" />
              <TrustPoint text="Direct WhatsApp Support" icon="💬" />
              <TrustPoint text="Trusted by 10,000+ Happy Customers" icon="⭐" />
            </div>

            <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-10 text-center">
              <Link
                href="/men"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm md:text-base font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:scale-105 active:scale-95 transition-all duration-200 touch-manipulation"
              >
                <span>Start Shopping Now</span>
                <span className="text-sm sm:text-base md:text-lg">🛍️</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

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

        /* Universal touch optimization */
        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        /* Extra small devices breakpoint */
        @media (min-width: 375px) {
          .xs\\:text-3xl {
            font-size: 1.875rem;
            line-height: 2.25rem;
          }
          .xs\\:w-\\[150px\\] {
            width: 150px;
          }
        }
      `}</style>
    </main>
  );
}

/* ======================================================================
   COMPONENTS - UNIVERSAL RESPONSIVE
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
      className="relative group h-[110px] xs:h-[120px] sm:h-[130px] md:h-[150px] lg:h-[170px] xl:h-[190px] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-blue-50 shadow-md hover:shadow-xl ring-1 ring-gray-200 hover:ring-blue-300 transition-all duration-300 touch-manipulation"
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

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-2.5 sm:pb-3 md:pb-4 px-2">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-1.5 md:mb-2 transform group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </div>
        <h3 className="text-[11px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-white text-center drop-shadow-lg">
          {title}
        </h3>
        <div className="mt-1 sm:mt-1.5 w-8 sm:w-10 md:w-12 h-0.5 bg-white/70 rounded-full group-hover:w-10 sm:group-hover:w-12 md:group-hover:w-16 transition-all duration-300" />
      </div>
    </Link>
  );
};

const TrustPoint = ({ text, icon }: { text: string; icon: string }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-2.5 sm:p-3 md:p-4 lg:p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group touch-manipulation">
      <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-base sm:text-lg md:text-xl lg:text-2xl shadow-sm group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>

      <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-800 font-semibold leading-tight">
        {text}
      </p>
    </div>
  );
};
