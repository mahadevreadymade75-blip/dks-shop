"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getProducts } from "@/data/products";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

/* ================= FILTER CONFIG ================= */

const WATCH_FILTERS: Record<string, string> = {
  All: "all",
  Luxury: "luxury",
  "Smart Watches": "smart",
  Analog: "analog",
  Digital: "digital",
  Sports: "sports",
};

export default function WatchesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeType, setActiveType] = useState(
    searchParams.get("type") || "All",
  );
  const [priceRange, setPriceRange] = useState(
    Number(searchParams.get("price")) || 20000,
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "none");
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

  /* ================= OPTIMIZED FILTERED PRODUCTS ================= */

  const filteredProducts = useMemo(() => {
    let data = allProducts.filter((p) => p.category === "watches");

    if (activeType !== "All") {
      const typeValue = WATCH_FILTERS[activeType];
      data = data.filter((p) => p.watchType === typeValue);
    }

    data = data.filter((p) => p.price <= priceRange);

    if (sort === "low") {
      data = [...data].sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      data = [...data].sort((a, b) => b.price - a.price);
    }

    return data;
  }, [activeType, priceRange, sort, allProducts]);

  /* ================= OPTIMIZED URL SYNC ================= */

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeType !== "All") params.set("type", activeType);
    if (priceRange !== 20000) params.set("price", String(priceRange));
    if (sort !== "none") params.set("sort", sort);

    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;
    router.replace(newUrl, { scroll: false });
  }, [activeType, priceRange, sort, router]);

  /* ================= OPTIMIZED HANDLERS ================= */

  const handleTypeChange = useCallback((type: string) => {
    setActiveType(type);
  }, []);

  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPriceRange(Number(e.target.value));
    },
    [],
  );

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSort(e.target.value);
    },
    [],
  );

  return (
    <main className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 text-gray-900">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden">
        {/* Optimized Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 md:top-20 left-10 md:left-20 w-64 md:w-96 h-64 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-64 md:w-96 h-64 md:h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 text-center">
          <div className="inline-block mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs md:text-sm font-medium">
            Premium Collection
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 md:mb-6 leading-tight">
            Timeless
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Elegance
            </span>
          </h1>

          <p className="mt-3 md:mt-4 text-base md:text-xl text-slate-300 max-w-2xl mx-auto px-4">
            Crafted with Precision • Handpicked for You • Designed to Last
          </p>

          <div className="mt-8 md:mt-12 flex justify-center gap-3 md:gap-4 flex-wrap px-4">
            <Link
              href="/cart"
              className="px-6 md:px-10 py-3 md:py-4 rounded-full bg-white text-slate-900 text-sm md:text-base font-semibold hover:scale-105 active:scale-95 transition-transform duration-200 shadow-xl"
            >
              View Cart
            </Link>
            <Link
              href="/"
              className="px-6 md:px-10 py-3 md:py-4 rounded-full border-2 border-white/30 text-white text-sm md:text-base backdrop-blur-sm hover:bg-white/10 active:scale-95 transition-all duration-200"
            >
              Back Home
            </Link>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* ================= FILTER BAR ================= */}
      <section className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 md:px-4 py-4 md:py-6 space-y-4 md:space-y-5">
          {/* Type Filters - Horizontal scroll on mobile */}
          <div className="overflow-x-auto pb-2 -mx-3 px-3 md:mx-0 md:px-0 scrollbar-hide">
            <div className="flex gap-2 md:gap-3 min-w-max md:min-w-0 md:flex-wrap">
              {Object.keys(WATCH_FILTERS).map((label) => (
                <FilterBadge
                  key={label}
                  label={label}
                  active={activeType === label}
                  onClick={() => handleTypeChange(label)}
                />
              ))}
            </div>
          </div>

          {/* Price & Sort Controls */}
          <div className="space-y-3">
            {/* Price Range - Full Width Mobile */}
            <div className="w-full">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs md:text-sm font-medium text-slate-600">
                  Price Range
                </span>
                <span className="text-sm md:text-base font-bold text-slate-900">
                  ₹{priceRange.toLocaleString()}
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min={1000}
                  max={20000}
                  step={500}
                  value={priceRange}
                  onChange={handlePriceChange}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                  style={{
                    background: `linear-gradient(to right, #0f172a 0%, #0f172a ${((priceRange - 1000) / (20000 - 1000)) * 100}%, #e2e8f0 ${((priceRange - 1000) / (20000 - 1000)) * 100}%, #e2e8f0 100%)`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1 px-1">
                <span>₹1,000</span>
                <span>₹20,000</span>
              </div>
            </div>

            {/* Sort & Count Row */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <select
                value={sort}
                onChange={handleSortChange}
                className="flex-1 px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs md:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-shadow"
              >
                <option value="none">Sort by</option>
                <option value="low">Price: Low → High</option>
                <option value="high">Price: High → Low</option>
              </select>

              {/* Product Count */}
              <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-slate-600 bg-slate-50 px-3 md:px-4 py-2.5 md:py-3 rounded-xl border border-slate-200 whitespace-nowrap">
                <span className="font-bold text-lg md:text-xl text-slate-900">
                  {filteredProducts.length}
                </span>
                <span className="hidden sm:inline">Found</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS GRID ================= */}
      <section className="py-10 md:py-20 px-3 md:px-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            // Loading State
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-slate-200 aspect-square rounded-xl mb-3"></div>
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="transform hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 md:py-20">
              <div className="text-5xl md:text-6xl mb-4">⌚</div>
              <p className="text-lg md:text-xl text-slate-600 font-medium">
                No watches found
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-2xl md:blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Ready to Find Your Perfect Watch?
          </h2>
          <p className="text-base md:text-xl text-slate-300 mb-8 md:mb-10">
            Premium Quality • Fast Delivery • Secure Payments
          </p>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 md:gap-3 px-8 md:px-12 py-4 md:py-5 rounded-full bg-white text-slate-900 text-base md:text-lg font-bold hover:scale-105 active:scale-95 transition-transform duration-200 shadow-2xl"
          >
            <span>Order Now</span>
            <span className="text-xl md:text-2xl">⌚</span>
          </Link>
        </div>
      </section>

      {/* Add custom scrollbar hide utility */}
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

/* ================= OPTIMIZED FILTER BADGE ================= */

const FilterBadge = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold 
        transition-all duration-200 whitespace-nowrap
        ${
          active
            ? "bg-slate-900 text-white shadow-lg scale-105"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95"
        }
      `}
    >
      {label}
    </button>
  );
};
