"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getProducts } from "@/data/products";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";

/* ================= FILTER CONFIG ================= */

const SHOE_FILTERS = [
  { id: "All", label: "All Shoes", emoji: "👟" },
  { id: "Casual", label: "Casual", emoji: "👞" },
  { id: "Formal", label: "Formal", emoji: "👔" },
  { id: "Sports", label: "Sports", emoji: "⚽" },
  { id: "Running", label: "Running", emoji: "🏃" },
  { id: "Sneakers", label: "Sneakers", emoji: "👟" },
  { id: "Loafers", label: "Loafers", emoji: "🥿" },
  { id: "Boots", label: "Boots", emoji: "🥾" },
  { id: "Sandals", label: "Sandals", emoji: "🩴" },
  { id: "Slippers", label: "Slippers", emoji: "🥿" },
  { id: "Flip-flops", label: "Flip-flops", emoji: "🩴" },
];

export default function ShoesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParam = searchParams.get("type") || "All";
  const sortParam = searchParams.get("sort") || "none";
  const priceParam = Number(searchParams.get("price")) || 5000;

  const [activeType, setActiveType] = useState(typeParam);
  const [priceRange, setPriceRange] = useState(priceParam);
  const [sort, setSort] = useState(sortParam);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  /* ================= LOAD PRODUCTS ================= */
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

  /* ================= SHOES FILTER (OPTIMIZED) ================= */

  const filteredProducts = useMemo(() => {
    let data = allProducts.filter((p) => p.category === "shoes");

    if (activeType !== "All") {
      data = data.filter((p) => {
        // First check subCategory field
        if (p.subCategory) {
          return p.subCategory.toLowerCase() === activeType.toLowerCase();
        }
        // Fallback: check in product name
        return p.name.toLowerCase().includes(activeType.toLowerCase());
      });
    }
    data = data.filter((p) => p.price <= priceRange);

    if (sort === "low") {
      data = [...data].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      data = [...data].sort((a, b) => b.price - a.price);
    }

    return data;
  }, [activeType, priceRange, sort, allProducts]);

  /* ================= SANDALS (MEMOIZED) ================= */

  const sandalsProducts = useMemo(
    () => allProducts.filter((p) => p.category === "sandals"),
    [allProducts],
  );

  /* ================= CALLBACKS ================= */

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

  /* ================= URL SYNC ================= */

  useEffect(() => {
    const params = new URLSearchParams();

    if (activeType !== "All") params.set("type", activeType);
    if (priceRange !== 5000) params.set("price", String(priceRange));
    if (sort !== "none") params.set("sort", sort);

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [activeType, priceRange, sort, router]);

  return (
    <main className="bg-gradient-to-b from-white via-orange-50/30 to-yellow-50/30 text-gray-900">
      {/* ================= HERO - PREMIUM LIGHT ================= */}
      <section className="relative h-[55vh] sm:h-[65vh] md:h-[75vh] flex items-center overflow-hidden bg-gradient-to-br from-orange-50/30 to-yellow-50/30">
        {/* Optimized Background Image */}
        <div className="absolute inset-0">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-yellow-100 animate-pulse" />
          )}
          <Image
            src="/heroShoes.jpg"
            alt="Shoes Collection"
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
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-orange-200 shadow-sm">
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent">
                Premium Footwear Collection
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Shoes Collection
            </h1>

            <p className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-gray-700 font-medium">
              Comfort • Performance • Style 👟
            </p>

            <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
              <Link
                href="/cart"
                className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 hover:scale-105 active:scale-95 transition-all duration-200"
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
          {/* Type Filters */}
          <div className="overflow-x-auto scrollbar-hide pb-1 -mb-1">
            <div className="flex gap-2 sm:gap-2.5 min-w-max sm:min-w-0 sm:flex-wrap">
              {SHOE_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => handleTypeChange(filter.id)}
                  className={`
                    flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5
                    rounded-full text-xs sm:text-sm
                    font-semibold whitespace-nowrap 
                    transition-all duration-200
                    ${
                      activeType === filter.id
                        ? "bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 text-white shadow-md shadow-orange-200 scale-105"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 active:scale-95"
                    }
                  `}
                >
                  <span className="text-base">{filter.emoji}</span>
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range & Sort */}
          <div className="flex flex-col md:flex-row gap-5 sm:gap-6 md:items-center md:justify-between">
            {/* Price Range Slider */}
            <div className="flex-1 max-w-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">
                  Maximum Price
                </span>
                <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  ₹{priceRange.toLocaleString()}
                </span>
              </div>
              <div className="relative px-1">
                <input
                  type="range"
                  min={500}
                  max={5000}
                  step={100}
                  value={priceRange}
                  onChange={handlePriceChange}
                  className="w-full h-2.5 bg-gray-100 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #f97316 0%, #f97316 ${((priceRange - 500) / (5000 - 500)) * 100}%, #f3f4f6 ${((priceRange - 500) / (5000 - 500)) * 100}%, #f3f4f6 100%)`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs font-medium text-gray-500 mt-2 px-1">
                <span>₹500</span>
                <span>₹5,000</span>
              </div>
            </div>

            {/* Sort & Count */}
            <div className="flex items-center gap-4">
              <select
                value={sort}
                onChange={handleSortChange}
                className="px-4 py-2.5 rounded-xl text-sm bg-white border-2 border-gray-200 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all font-medium text-gray-700"
              >
                <option value="none">Sort By</option>
                <option value="low">Price: Low → High</option>
                <option value="high">Price: High → Low</option>
              </select>

              <div className="flex items-center gap-3 bg-gradient-to-br from-orange-50/50 to-red-50/50 px-6 py-3.5 rounded-2xl border border-orange-100/50 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-2xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {filteredProducts.length}
                  </span>
                  <span className="text-xs font-semibold text-gray-600 -mt-1">
                    Products
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SHOES GRID ================= */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-3xl sm:text-4xl">👟</span>
              <span>Shoes Collection</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-3"></div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gradient-to-br from-orange-100 to-red-50 aspect-square rounded-2xl mb-3 border border-orange-100"></div>
                  <div className="h-4 bg-gradient-to-r from-orange-100 to-red-50 rounded mb-2"></div>
                  <div className="h-4 bg-gradient-to-r from-orange-100 to-red-50 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <div className="text-6xl sm:text-7xl mb-5 opacity-20">👟</div>
              <p className="text-xl sm:text-2xl text-gray-700 font-bold mb-2">
                No shoes found
              </p>
              <p className="text-sm sm:text-base text-gray-500">
                Try adjusting your filters or price range
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="group transform hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  <ProductCard
                    product={{
                      ...p,
                      images: Array.isArray(p.images)
                        ? p.images
                        : p.images
                          ? [p.images]
                          : [],
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= SANDALS SECTION ================= */}
      {sandalsProducts.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-6 bg-gradient-to-br from-yellow-50/50 via-orange-50/50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-10 md:mb-12 text-center">
              <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-white border border-orange-200 shadow-sm">
                <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  Comfort Collection
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Sandals Collection
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-600">
                Comfort • Outdoor • Everyday Wear 🩴
              </p>
              <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mt-3 mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {sandalsProducts.map((p) => (
                <div
                  key={p.id}
                  className="group transform hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  <ProductCard
                    product={{
                      ...p,
                      images: Array.isArray(p.images)
                        ? p.images
                        : p.images
                          ? [p.images]
                          : [],
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= CTA - PREMIUM LIGHT ================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-5 py-2 rounded-full bg-gray-50 border border-gray-200 shadow-sm">
            <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Premium Quality Footwear
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 text-gray-900 leading-tight">
            Step into Comfort Today! 👟
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium mb-8 sm:mb-10">
            Order easily via WhatsApp • Fast Delivery • Premium Quality
          </p>

          <Link
            href="https://wa.me/919950388083?text=Hi! I want to order shoes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg shadow-orange-100 hover:shadow-xl hover:shadow-orange-200 hover:scale-105 active:scale-95 transition-all duration-200 text-sm sm:text-base md:text-lg"
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
