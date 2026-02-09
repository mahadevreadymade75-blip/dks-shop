"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { getProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

const KITCHEN_FILTERS = [
  { id: "All", label: "All Products", icon: "🏠" },
  { id: "Cookware", label: "Cookware", icon: "🍳" },
  { id: "Dinnerware", label: "Dinnerware", icon: "🍽️" },
  { id: "Storage", label: "Storage", icon: "📦" },
  { id: "Appliances", label: "Appliances", icon: "⚡" },
  { id: "Tools", label: "Tools", icon: "🔪" },
  { id: "Cutlery", label: "Cutlery", icon: "🥄" },
  { id: "Containers", label: "Containers", icon: "🫙" },
  { id: "Utensils", label: "Utensils", icon: "🥢" },
  { id: "Bakeware", label: "Bakeware", icon: "🧁" },
  { id: "Glassware", label: "Glassware", icon: "🥤" },
];

export default function HomeKitchenPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    void getProducts().then((data) => {
      if (mounted) {
        setProducts(data ?? []);
        setIsLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  /* ================= FAST FILTER ================= */
  const items = useMemo(() => {
    return products.filter((p) => {
      if (p.category !== "kitchen") return false;

      if (activeCategory === "All") return true;

      // Check subCategory field
      if (p.subCategory) {
        return p.subCategory.toLowerCase() === activeCategory.toLowerCase();
      }

      // Fallback: check in product name
      const productName = (p as any).name || "";
      return productName.toLowerCase().includes(activeCategory.toLowerCase());
    });
  }, [products, activeCategory]);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  return (
    <main className="bg-gradient-to-b from-white via-amber-50/30 to-orange-50/30 text-gray-900 min-h-screen">
      {/* ================= HERO - PREMIUM LIGHT ================= */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-amber-50/20 to-orange-50/20">
        {/* Optimized Background Image with Loading State */}
        <div className="absolute inset-0">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 animate-pulse" />
          )}
          <Image
            src="/homeKitchen.jpg"
            alt="Home & Kitchen Collection"
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
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-2xl ml-auto text-right">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-amber-200 shadow-sm">
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Premium Home Collection
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Home & Kitchen
            </h1>

            <p className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-gray-700 font-medium">
              Premium Essentials • Beautiful Decor • Daily Comfort 🏡
            </p>

            <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
              <Link
                href="/cart"
                className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-amber-200 hover:shadow-xl hover:shadow-amber-300 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                View Cart
              </Link>

              <Link
                href="/"
                className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-full bg-white border-2 border-gray-200 text-gray-700 font-semibold text-sm sm:text-base hover:border-gray-300 hover:bg-gray-50 active:scale-95 transition-all duration-200 shadow-sm"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY FILTER - PREMIUM LIGHT ================= */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <div className="flex items-center gap-2 bg-gradient-to-br from-amber-50/50 to-orange-50/50 px-4 py-2 rounded-full border border-amber-100/50">
              <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {items.length}
              </span>
              <span className="text-xs font-semibold text-gray-600">
                Products
              </span>
            </div>
          </div>

          {/* Category Pills - Scrollable on Mobile */}
          <div className="overflow-x-auto scrollbar-hide pb-1 -mb-1">
            <div className="flex gap-2 sm:gap-2.5 min-w-max sm:min-w-0 sm:flex-wrap">
              {KITCHEN_FILTERS.map((filter) => (
                <CategoryPill
                  key={filter.id}
                  title={filter.label}
                  icon={filter.icon}
                  active={activeCategory === filter.id}
                  onClick={() => handleCategoryChange(filter.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS GRID ================= */}
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-3xl sm:text-4xl">
                {KITCHEN_FILTERS.find((f) => f.id === activeCategory)?.icon ||
                  "🏠"}
              </span>
              <span>
                {activeCategory === "All" ? "All Products" : activeCategory}
              </span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-3"></div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gradient-to-br from-amber-100 to-orange-50 aspect-square rounded-2xl mb-3 border border-amber-100"></div>
                  <div className="h-4 bg-gradient-to-r from-amber-100 to-orange-50 rounded mb-2"></div>
                  <div className="h-4 bg-gradient-to-r from-amber-100 to-orange-50 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <div className="text-6xl sm:text-7xl mb-5 opacity-20">🏠</div>
              <p className="text-xl sm:text-2xl text-gray-700 font-bold mb-2">
                No products found
              </p>
              <p className="text-sm sm:text-base text-gray-500">
                Try selecting a different category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {items.map((p) => (
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
            <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Premium Quality Products
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 text-gray-900 leading-tight">
            Upgrade Your Home Today 🏡
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium mb-8 sm:mb-10">
            Order easily via WhatsApp • Fast Delivery • Premium Quality
          </p>

          <Link
            href="https://wa.me/919950388083?text=Hi! I want to order home & kitchen products"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-xl shadow-amber-200 hover:shadow-2xl hover:shadow-amber-300 hover:scale-105 active:scale-95 transition-all duration-200 text-sm sm:text-base md:text-lg"
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

/* ================= CATEGORY PILL - PREMIUM LIGHT ================= */

function CategoryPill({
  title,
  icon,
  active,
  onClick,
}: {
  title: string;
  icon: string;
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
            ? "bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white shadow-md shadow-amber-200 scale-105"
            : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 active:scale-95"
        }
      `}
    >
      <span className="text-base">{icon}</span>
      <span>{title}</span>
    </button>
  );
}

/* ================= CATEGORY CARD - PREMIUM LIGHT ================= */

function CategoryCard({
  title,
  icon,
  image,
  active,
  onClick,
}: {
  title: string;
  icon: string;
  image: string;
  active: boolean;
  onClick: () => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <button
      onClick={onClick}
      className={`group relative h-[140px] sm:h-[160px] rounded-2xl overflow-hidden transition-all duration-300
                ${
                  active
                    ? "ring-2 ring-amber-500 shadow-xl shadow-amber-200 scale-105"
                    : "ring-1 ring-gray-200 hover:ring-gray-300 hover:shadow-lg active:scale-95"
                }
            `}
    >
      {/* Loading Placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 animate-pulse" />
      )}

      {/* Image */}
      <Image
        src={image}
        alt={title}
        fill
        quality={75}
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 14vw"
        className={`object-cover transition-all duration-500 ${
          imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        } ${active ? "scale-110" : "group-hover:scale-110"}`}
        loading="lazy"
        onLoadingComplete={() => setImageLoaded(true)}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          active
            ? "bg-gradient-to-t from-amber-900/80 via-amber-600/40 to-transparent"
            : "bg-white/60 group-hover:bg-white/40"
        }`}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-4 px-3">
        <div
          className={`text-2xl sm:text-3xl mb-2 transition-transform duration-300 ${
            active ? "scale-110" : "group-hover:scale-110"
          }`}
        >
          {icon}
        </div>
        <span
          className={`text-xs sm:text-sm font-bold text-center transition-colors duration-300 ${
            active ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </span>
      </div>

      {/* Active Indicator */}
      {active && (
        <div className="absolute top-3 right-3 w-3 h-3 bg-white rounded-full shadow-lg animate-pulse" />
      )}
    </button>
  );
}
