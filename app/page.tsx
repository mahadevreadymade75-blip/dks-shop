"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { getProducts } from "@/data/products";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

/* ======================================================================
   HERO SLIDES DATA (ADS STYLE)
====================================================================== */

const heroSlides = [
  {
    image: "/hero/DKS.jpg",
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
    const speed = 0.5; // Constant speed

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
    <main className="bg-gray-50 text-gray-900">
      {/* ======================================================
         HERO SECTION
      ====================================================== */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <Link href={slide.link} className="absolute inset-0">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            quality={75}
            sizes="100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmQ/9k="
          />
        </Link>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/20" />

        {/* Hero Content */}
        <div
          key={currentSlide}
          className="relative z-10 w-full max-w-5xl px-6 md:px-16 ml-auto text-right animate-fadeIn"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
            {slide.title}
          </h1>

          <p className="mt-6 text-base md:text-xl text-gray-200 max-w-xl ml-auto">
            {slide.subtitle}
          </p>

          <div className="mt-8 flex gap-4 justify-end flex-wrap">
            <Link
              href={slide.link}
              className="px-8 py-3 md:px-10 md:py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform duration-200"
            >
              {slide.cta}
            </Link>

            <Link
              href="/cart"
              className="px-8 py-3 md:px-10 md:py-4 rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors duration-200"
            >
              Cart
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-sm opacity-80 animate-bounce">
          ↓ Scroll
        </div>
      </section>

      {/* ======================================================
         CATEGORIES
      ====================================================== */}
      <section className="-mt-20 pt-28 pb-24 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-12">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-10">
            <CategoryCard title="Men" image="/man.jpg" link="/men" />
            <CategoryCard title="Women" image="/women.jpg" link="/women" />
            <CategoryCard title="Watches" image="/watch.jpg" link="/watches" />
            <CategoryCard title="Shoes" image="/shoes.jpg" link="/shoes" />
            <CategoryCard
              title="Home & Kitchen"
              image="/homeKitchen.jpg"
              link="/home-kitchen"
            />
            <CategoryCard
              title="Kids Clothing"
              image="/child.jpg"
              link="/kids"
            />
          </div>
        </div>
      </section>

      {/* ======================================================
         FEATURED PRODUCTS
      ====================================================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">
            Featured Products
          </h2>

          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto pb-6 cursor-grab active:cursor-grabbing scrollbar-hide scroll-smooth"
          >
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="w-[220px] sm:w-[260px] h-[520px] md:h-[560px] flex-none transform hover:scale-105 transition-transform duration-200 will-change-transform"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRUST SECTION ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Box */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">
            {/* Heading */}
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
              Why Shop With Us?
            </h2>

            <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
              Trusted by customers across India for quality products and
              reliable service
            </p>

            {/* Points */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <TrustPoint text="Cash on Delivery Available" />
              <TrustPoint text="100% Original Products" />
              <TrustPoint text="Fast Shipping All Over India" />
              <TrustPoint text="Easy Return & Exchange" />
              <TrustPoint text="Direct WhatsApp Support" />
              <TrustPoint text="Trusted by 460+ Happy Customers" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ======================================================================
   CATEGORY CARD COMPONENT
====================================================================== */

const CategoryCard = ({
  title,
  image,
  link,
}: {
  title: string;
  image: string;
  link: string;
}) => {
  return (
    <Link
      href={link}
      className="relative group h-[190px] sm:h-[210px] md:h-[230px] rounded-2xl overflow-hidden bg-gray-200 shadow-md hover:shadow-xl transition-shadow duration-200"
    >
      <Image
        src={image}
        alt={title}
        fill
        quality={75}
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
        className="object-cover group-hover:scale-105 transition-transform duration-300 will-change-transform"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

      <div className="absolute bottom-0 w-full p-5">
        <h3 className="text-base md:text-lg font-semibold text-white text-center">
          {title}
        </h3>
      </div>
    </Link>
  );
};

const TrustPoint = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-150">
      {/* Check Icon */}
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
        ✓
      </div>

      <p className="text-gray-800 font-medium">{text}</p>
    </div>
  );
};
