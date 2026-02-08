"use client";

import { useState, useMemo, useEffect } from "react";
import { getProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

const CATEGORY_MAP: Record<string, string[]> = {
  All: [],
  "Kitchen Tools": ["kitchen", "tool"],
  Cookware: ["pan", "cooker", "cook"],
  Storage: ["storage", "box"],
  "Home Decor": ["decor", "curtain", "clock", "cover"],
  Cleaning: ["clean", "vacuum", "mop"],
  "Daily Essentials": ["mat", "bedsheet", "daily"],
};

export default function HomeKitchenPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    void getProducts().then((data) => setProducts(data ?? []));
  }, []);

  /* ================= FAST FILTER ================= */
  const items = useMemo(() => {
    return products.filter((p) => {
      // ✅ FIXED: Product type only has "kitchen", not "home-kitchen"
      if (p.category !== "kitchen") return false;

      if (activeCategory === "All") return true;

      const keywords = CATEGORY_MAP[activeCategory];
      const name = p.name.toLowerCase();
      return keywords.some((k) => name.includes(k));
    });
  }, [products, activeCategory]);

  return (
    <main className="bg-gradient-to-b from-gray-50 via-white to-amber-50 text-gray-900 min-h-screen">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="/homeKitchen.jpg"
          alt="Home & Kitchen"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-16 ml-auto text-right">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold">
            Home & Kitchen
          </h1>

          <p className="mt-4 sm:mt-6 text-gray-700 max-w-xl ml-auto">
            Essentials • Decor • Daily Comfort
          </p>

          <div className="mt-8 sm:mt-10 flex gap-4 sm:gap-6 justify-end flex-wrap">
            <Link
              href="/cart"
              className="px-8 sm:px-10 py-4 rounded-full bg-black text-white font-semibold hover:scale-105 transition-transform duration-200"
            >
              View Cart
            </Link>

            <Link
              href="/"
              className="px-8 sm:px-10 py-4 rounded-full border border-black font-semibold hover:bg-black hover:text-white transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY CARDS ================= */}
      <section className="py-14 sm:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
            {Object.keys(CATEGORY_MAP).map((title) => (
              <CategoryCard
                key={title}
                title={title}
                image={`/${title.toLowerCase().replace(/ /g, "-")}.jpg`}
                active={activeCategory === title}
                onClick={() => setActiveCategory(title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS GRID ================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10">
            {activeCategory === "All"
              ? "Popular Home & Kitchen Products"
              : activeCategory}
          </h2>

          {items.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No products found in this category
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="pb-16 sm:pb-24 text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Upgrade Your Home Today 🏡
        </h2>
      </section>
    </main>
  );
}

/* ================= CATEGORY CARD ================= */

function CategoryCard({
  title,
  image,
  active,
  onClick,
}: {
  title: string;
  image: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative h-[120px] sm:h-[140px] rounded-xl overflow-hidden border transition-all duration-200
                ${active ? "border-black shadow-lg" : "border-gray-200 hover:border-gray-400"}
            `}
    >
      <Image
        src={image}
        alt={title}
        fill
        quality={75}
        sizes="(max-width:768px) 50vw, 16vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-white/55 group-hover:bg-white/30 transition-colors duration-200" />

      <div className="relative z-10 h-full flex items-center justify-center px-2">
        <span className="text-xs sm:text-sm font-semibold text-gray-900 text-center">
          {title}
        </span>
      </div>
    </button>
  );
}
