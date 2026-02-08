"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { getProducts } from "@/data/products";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";

/* ================= FILTER LOGIC ================= */

const MEN_FILTERS = [
  { id: "All", label: "All Products" },
  { id: "Tshirts", label: "T-Shirts" },
  { id: "Shirts", label: "Shirts" },
  { id: "Jeans", label: "Jeans" },
  { id: "Trousers", label: "Trousers" },
  { id: "Jackets", label: "Jackets" },
  { id: "Casual", label: "Casual" },
  { id: "Formal", label: "Formal" },
  { id: "Ethnic", label: "Ethnic" },
];

export default function MenPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [priceRange, setPriceRange] = useState(50000);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  /* ================= FILTERED PRODUCTS (OPTIMIZED) ================= */

  const menProducts = useMemo(() => {
    return allProducts.filter((p) => {
      // Filter by category
      if (p.category !== "men") return false;

      // Filter by price
      if (p.price > priceRange) return false;

      // Filter by subcategory
      if (activeFilter === "All") return true;

      // Check subCategory field (primary)
      if (p.subCategory) {
        return p.subCategory.toLowerCase() === activeFilter.toLowerCase();
      }

      // Fallback: check in product name (safe access)
      const productName = (p as any).name || "";
      return productName.toLowerCase().includes(activeFilter.toLowerCase());
    });
  }, [activeFilter, priceRange, allProducts]);

  // Memoized filter handler
  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  // Memoized price handler
  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPriceRange(Number(e.target.value));
    },
    [],
  );

  return (
    <main className="bg-gradient-to-b from-slate-50 to-white text-gray-900">
      {/* ================= HERO - PREMIUM LIGHT ================= */}
      <section className="relative h-[55vh] sm:h-[65vh] md:h-[75vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Optimized Background Image */}
        <div className="absolute inset-0 opacity-90">
          <Image
            src="/manHome.jpg"
            alt="Men's Collection"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmQ/9k="
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-2xl ml-auto text-right">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm">
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Premium Collection
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Men's Collection
            </h1>

            <p className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-gray-700 font-medium">
              Bold Fashion • Premium Essentials • Built for Confidence
            </p>

            <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
              <Link
                href="/cart"
                className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:scale-105 active:scale-95 transition-all duration-200"
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
          {/* Category Filters - Clean horizontal scroll */}
          <div className="overflow-x-auto scrollbar-hide pb-1 -mb-1">
            <div className="flex gap-2 sm:gap-2.5 min-w-max sm:min-w-0 sm:flex-wrap">
              {MEN_FILTERS.map((filter) => (
                <FilterBadge
                  key={filter.id}
                  label={filter.label}
                  active={activeFilter === filter.id}
                  onClick={() => handleFilterChange(filter.id)}
                />
              ))}
            </div>
          </div>

          {/* Price Range & Count */}
          <div className="flex flex-col md:flex-row gap-5 sm:gap-6 md:items-center md:justify-between">
            {/* Price Range Slider - Premium Design */}
            <div className="flex-1 max-w-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">
                  Maximum Price
                </span>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ₹{priceRange.toLocaleString()}
                </span>
              </div>
              <div className="relative px-1">
                <input
                  type="range"
                  min={500}
                  max={50000}
                  step={500}
                  value={priceRange}
                  onChange={handlePriceChange}
                  className="w-full h-2.5 bg-gray-100 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((priceRange - 500) / (50000 - 500)) * 100}%, #f3f4f6 ${((priceRange - 500) / (50000 - 500)) * 100}%, #f3f4f6 100%)`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs font-medium text-gray-500 mt-2 px-1">
                <span>₹500</span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* Product Count - Premium Badge */}
            <div className="flex items-center gap-3 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-6 py-3.5 rounded-2xl border border-blue-100 shadow-sm">
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {menProducts.length}
                </span>
                <span className="text-xs font-semibold text-gray-600 -mt-1">
                  Products
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS GRID - PREMIUM LIGHT ================= */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              {activeFilter === "All" ? "All Men's Products" : activeFilter}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3"></div>
          </div>

          {isLoading ? (
            // Loading Skeleton - Lighter
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-50 aspect-square rounded-2xl mb-3 border border-gray-100"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded mb-2"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : menProducts.length === 0 ? (
            // Empty State - Lighter
            <div className="text-center py-20 sm:py-24">
              <div className="text-6xl sm:text-7xl mb-5 opacity-20">👔</div>
              <p className="text-xl sm:text-2xl text-gray-700 font-bold mb-2">
                No products found
              </p>
              <p className="text-sm sm:text-base text-gray-500">
                Try adjusting your filters or price range
              </p>
            </div>
          ) : (
            // Products Grid
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {menProducts.map((p) => (
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
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Background Pattern - Lighter */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm">
            <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Limited Time Offer
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 text-gray-900 leading-tight">
            Ready to Upgrade Your Style?
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium mb-8 sm:mb-10">
            Premium Quality • Fast Delivery • Secure Payments
          </p>

          <Link
            href="/cart"
            className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-xl shadow-blue-200 hover:shadow-2xl hover:shadow-blue-300 hover:scale-105 active:scale-95 transition-all duration-200 text-sm sm:text-base md:text-lg"
          >
            <span>Order Now</span>
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
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-5 sm:px-6 py-2 sm:py-2.5
        rounded-full text-xs sm:text-sm
        font-semibold whitespace-nowrap 
        transition-all duration-200
        ${
          active
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md shadow-blue-200 scale-105"
            : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 active:scale-95"
        }
      `}
    >
      {label}
    </button>
  );
}
