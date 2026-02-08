"use client";

import { getProducts } from "@/data/products";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect, useCallback } from "react";

/* ================= FILTER MAP ================= */

const WOMEN_FILTERS: Record<string, (p: any) => boolean> = {
  All: (p) => p.category === "women",

  // Existing filters...
  Kurti: (p) =>
    p.category === "women" && p.subCategory?.toLowerCase() === "kurti",
  Dress: (p) =>
    p.category === "women" && p.subCategory?.toLowerCase() === "dress",
  Top: (p) => p.category === "women" && p.subCategory?.toLowerCase() === "tops",
  Ethnic: (p) =>
    p.category === "women" && p.subCategory?.toLowerCase() === "ethnic",
  Footwear: (p) =>
    p.category === "women" && p.subCategory?.toLowerCase() === "footwear",
  Jewellery: (p) =>
    p.category === "women" && p.subCategory?.toLowerCase() === "jewellery",

  // New filters (if needed)
  Sarees: (p) =>
    p.category === "women" && p.subCategory?.toLowerCase() === "sarees",
  Lehenga: (p) =>
    p.category === "women" && p.subCategory?.toLowerCase() === "lehenga",
  Salwar: (p) =>
    p.category === "women" && p.subCategory?.toLowerCase() === "salwar",
  Western: (p) =>
    p.category === "women" && p.subCategory?.toLowerCase() === "western",
  Bags: (p) =>
    p.category === "women" && p.subCategory?.toLowerCase() === "bags",
  Accessories: (p) =>
    p.category === "women" && p.subCategory?.toLowerCase() === "accessories",
};

// Don't forget to add emojis
const FILTER_EMOJIS: Record<string, string> = {
  All: "✨",
  Kurti: "👘",
  Dress: "👗",
  Top: "👚",
  Ethnic: "🪷",
  Footwear: "👠",
  Jewellery: "💍",
  Sarees: "🥻",
  Lehenga: "👘",
  Salwar: "🧥",
  Western: "👖",
  Bags: "👜",
  Accessories: "🎀",
};

export default function WomenPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    void getProducts().then((data) => {
      if (mounted) {
        setAllProducts(data ?? []);
        setIsLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  /* ================= FILTERED PRODUCTS (FIXED + FAST) ================= */

  const womenProducts = useMemo(() => {
    const filterFn = WOMEN_FILTERS[activeFilter];
    return allProducts.filter(filterFn as any);
  }, [activeFilter, allProducts]);

  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  return (
    <main className="bg-gradient-to-b from-white via-pink-50/30 to-purple-50/30 text-gray-900">
      {/* ================= HERO - PREMIUM LIGHT ================= */}
      <section className="relative h-[55vh] sm:h-[65vh] md:h-[75vh] flex items-center overflow-hidden bg-gradient-to-br from-pink-50/30 to-purple-50/30">
        {/* Optimized Background Image */}
        <div className="absolute inset-0">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 animate-pulse" />
          )}
          <Image
            src="/womenHome.jpg"
            alt="Women Collection"
            fill
            priority
            quality={90}
            sizes="100vw"
            className={`object-cover object-center transition-opacity duration-700 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmQ/9k="
            onLoadingComplete={() => setImageLoaded(true)}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-2xl ml-auto text-right">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-pink-200 shadow-sm">
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Premium Women's Collection
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Women Collection
            </h1>

            <p className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-gray-700 font-medium">
              Elegant Fashion • Modern Styles • Stand Out 👗
            </p>

            <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
              <Link
                href="/cart"
                className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                View Cart
              </Link>

              <Link
                href="/"
                className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-full bg-white border-2 border-gray-200 text-gray-700 font-semibold text-sm sm:text-base hover:border-gray-300 hover:bg-gray-50 active:scale-95 transition-all duration-200 shadow-sm"
              >
                Explore More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FILTER BAR - PREMIUM LIGHT ================= */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-5 sm:space-y-6">
          {/* Category Filters */}
          <div className="overflow-x-auto scrollbar-hide pb-1 -mb-1">
            <div className="flex gap-2 sm:gap-2.5 min-w-max sm:min-w-0 sm:flex-wrap">
              {Object.keys(WOMEN_FILTERS).map((label) => (
                <FilterBadge
                  key={label}
                  label={label}
                  emoji={FILTER_EMOJIS[label]}
                  active={activeFilter === label}
                  onClick={() => handleFilterChange(label)}
                />
              ))}
            </div>
          </div>

          {/* Product Count */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {activeFilter === "All" ? "All Products" : activeFilter}
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mt-2"></div>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-br from-pink-50/50 to-purple-50/50 px-6 py-3.5 rounded-2xl border border-pink-100/50 shadow-sm">
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {womenProducts.length}
                </span>
                <span className="text-xs font-semibold text-gray-600 -mt-1">
                  Products
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS GRID ================= */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gradient-to-br from-pink-100 to-purple-50 aspect-square rounded-2xl mb-3 border border-pink-100"></div>
                  <div className="h-4 bg-gradient-to-r from-pink-100 to-purple-50 rounded mb-2"></div>
                  <div className="h-4 bg-gradient-to-r from-pink-100 to-purple-50 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : womenProducts.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <div className="text-6xl sm:text-7xl mb-5 opacity-20">👗</div>
              <p className="text-xl sm:text-2xl text-gray-700 font-bold mb-2">
                No products found
              </p>
              <p className="text-sm sm:text-base text-gray-500">
                Try selecting a different category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {womenProducts.map((p) => (
                <div
                  key={p.id}
                  className="group transform hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= CTA - PREMIUM LIGHT ================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-5 py-2 rounded-full bg-gray-50 border border-gray-200 shadow-sm">
            <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Shop with Confidence
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 text-gray-900 leading-tight">
            Loved the Collection? 💕
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium mb-8 sm:mb-10">
            Order easily via WhatsApp • Fast Delivery • Premium Quality
          </p>

          <Link
            href="https://wa.me/918741803589?text=Hi! I want to order women's products"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg shadow-pink-100 hover:shadow-xl hover:shadow-pink-200 hover:scale-105 active:scale-95 transition-all duration-200 text-sm sm:text-base md:text-lg"
          >
            <span>Order on WhatsApp</span>
            <span className="text-lg sm:text-xl">💬</span>
          </Link>
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
      `}</style>
    </main>
  );
}

/* ================= FILTER BADGE - PREMIUM LIGHT ================= */

function FilterBadge({
  label,
  emoji,
  active,
  onClick,
}: {
  label: string;
  emoji: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5
        rounded-full text-xs sm:text-sm
        font-semibold whitespace-nowrap 
        transition-all duration-200
        ${
          active
            ? "bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white shadow-md shadow-pink-200 scale-105"
            : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 active:scale-95"
        }
      `}
    >
      <span className="text-base">{emoji}</span>
      <span>{label}</span>
    </button>
  );
}
