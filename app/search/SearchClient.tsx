"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { getProducts } from "@/data/products";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { useEffect, useMemo, useState } from "react";

const CATEGORIES = [
  { id: "all", label: "All", emoji: "🔍" },
  { id: "men", label: "Men", emoji: "👔" },
  { id: "women", label: "Women", emoji: "👗" },
  { id: "shoes", label: "Shoes", emoji: "👟" },
  { id: "watches", label: "Watches", emoji: "⌚" },
];

export default function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [category, setCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  /* ================= DEBOUNCE ================= */
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(t);
  }, [query]);

  /* ================= URL → STATE SYNC ================= */
  useEffect(() => {
    setQuery(initialQuery);
    setDebouncedQuery(initialQuery);
  }, [initialQuery]);

  const [allProducts, setAllProducts] = useState<Product[]>([]);

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

  /* ================= FILTER PRODUCTS ================= */
  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    if (!q && category === "all") return [];

    return allProducts.filter((p) => {
      const matchName = q ? p.name.toLowerCase().includes(q) : true;

      const matchCategory = category === "all" || p.category === category;

      return matchName && matchCategory;
    });
  }, [debouncedQuery, category, allProducts]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50/30 via-white to-indigo-50/30 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* ================= HEADER SECTION ================= */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
            <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Search Products
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            {debouncedQuery
              ? `Search Results for "${debouncedQuery}"`
              : "Find Your Perfect Product"}
          </h1>

          {debouncedQuery && results.length > 0 && (
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Found{" "}
              <span className="font-bold text-blue-600">{results.length}</span>{" "}
              {results.length === 1 ? "product" : "products"}
            </p>
          )}
        </div>

        {/* ================= SEARCH INPUT ================= */}
        <div className="mb-6 sm:mb-8">
          <div className="relative max-w-2xl">
            {/* Search Icon */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                router.replace(
                  `/search?q=${encodeURIComponent(e.target.value)}`,
                );
              }}
              placeholder="Search products, brands, categories…"
              className="w-full rounded-2xl pl-12 pr-12 py-3 sm:py-4 border-2 border-gray-200 bg-white text-sm sm:text-base outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm hover:shadow-md"
              autoFocus
            />

            {/* Clear Button */}
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  router.replace("/search");
                }}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors touch-manipulation"
                aria-label="Clear search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* ================= CATEGORY FILTER ================= */}
        {debouncedQuery && (
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-semibold text-gray-700">
                Filter by:
              </span>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            <div className="overflow-x-auto scrollbar-hide pb-1 -mb-1">
              <div className="flex gap-2 sm:gap-3 min-w-max sm:min-w-0 sm:flex-wrap">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`
                      flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5
                      rounded-full text-xs sm:text-sm font-semibold
                      whitespace-nowrap transition-all duration-200
                      ${
                        category === c.id
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200 scale-105"
                          : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-md active:scale-95"
                      }
                    `}
                  >
                    <span className="text-base">{c.emoji}</span>
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= LOADING STATE ================= */}
        {isLoading && debouncedQuery && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-50 aspect-square rounded-2xl mb-3 border border-blue-100"></div>
                <div className="h-4 bg-gradient-to-r from-blue-100 to-indigo-50 rounded mb-2"></div>
                <div className="h-4 bg-gradient-to-r from-blue-100 to-indigo-50 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        )}

        {/* ================= RESULTS ================= */}
        {!isLoading && debouncedQuery && (
          <>
            {results.length === 0 ? (
              <div className="text-center py-16 sm:py-20">
                <div className="text-6xl sm:text-7xl mb-5 opacity-20">🔍</div>
                <p className="text-xl sm:text-2xl text-gray-700 font-bold mb-2">
                  No products found
                </p>
                <p className="text-sm sm:text-base text-gray-500 mb-8">
                  Try searching with different keywords or categories
                </p>

                <button
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
                    router.replace("/search");
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <span>Clear Search</span>
                  <span className="text-lg">✨</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="group transform hover:scale-105 active:scale-95 transition-transform duration-200"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ================= EMPTY STATE ================= */}
        {!debouncedQuery && (
          <div className="text-center py-16 sm:py-20 md:py-24">
            <div className="max-w-lg mx-auto">
              <div className="text-6xl sm:text-7xl md:text-8xl mb-6 opacity-30">
                🔍
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Start Your Search
              </h2>
              <p className="text-sm sm:text-base text-gray-500 mb-8">
                Type in the search box above to find your favorite products
              </p>

              {/* Quick Search Suggestions */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-700">
                  Popular Searches:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Shirt", "Shoes", "Watch", "Dress", "T-shirt"].map(
                    (term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setQuery(term);
                          router.replace(
                            `/search?q=${encodeURIComponent(term)}`,
                          );
                        }}
                        className="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        {term}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

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
