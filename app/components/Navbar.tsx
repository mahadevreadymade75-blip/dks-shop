"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { getProducts } from "@/data/products";
import type { Product } from "@/types/product";
import { useEffect, useState, useRef, useMemo } from "react";

/* ================= TRENDING ================= */

const TRENDING = [
  { label: "Men Fashion", path: "/men", icon: "👔" },
  { label: "Women Collection", path: "/women", icon: "👗" },
  { label: "Shoes", path: "/shoes", icon: "👟" },
  { label: "Watches", path: "/watches", icon: "⌚" },
  { label: "Kids Wear", path: "/kids", icon: "👶" },
  { label: "Home & Kitchen", path: "/home-kitchen", icon: "🏠" },
];

export default function Navbar() {
  const router = useRouter();
  const { cart } = useCart();
  const totalItems = useMemo(
    () => cart.reduce((sum, i) => sum + i.qty, 0),
    [cart],
  );

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /* ADMIN COOKIE */
  useEffect(() => {
    const hasAdminCookie = document.cookie.includes("admin_auth=true");
    setIsAdmin(hasAdminCookie);
  }, []);

  /* ADMIN LOGIN (hidden use) */
  const openAdmin = async () => {
    const pass = prompt("Enter Admin Password");
    if (!pass) return;

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pass }),
    });

    if (res.ok) {
      location.reload();
      router.push("/admin");
    } else {
      alert("Wrong password");
    }
  };

  /* ================= OPTIMIZED EFFECTS ================= */

  // Debounce search query
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Load products once
  useEffect(() => {
    let mounted = true;
    void getProducts().then((data) => {
      if (mounted) setAllProducts(data ?? []);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [router]);

  // Memoized suggestions
  const suggestions = useMemo(() => {
    if (!debouncedQuery) return [];
    return allProducts
      .filter((p) =>
        p.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
      )
      .slice(0, 6);
  }, [debouncedQuery, allProducts]);

  const handleSearch = (value?: string) => {
    const q = value ?? query;
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setShowDropdown(false);
    setMobileOpen(false);
    setQuery("");
  };

  const clearSearch = () => {
    setQuery("");
    setDebouncedQuery("");
    setShowDropdown(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 py-3 md:py-4 flex items-center gap-3 md:gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors whitespace-nowrap"
        >
          DKSHANDLOOM
        </Link>

        {/* ================= SEARCH (DESKTOP) ================= */}
        <div
          className="hidden md:block flex-1 max-w-lg relative"
          ref={dropdownRef}
        >
          <div className="relative">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search products, brands, categories…"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />

            {/* Search Icon */}
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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

            {/* Clear Button */}
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
              >
                ✕
              </button>
            )}
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-2xl z-[9999] overflow-hidden">
              {!debouncedQuery && (
                <>
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                      🔥 Trending Searches
                    </p>
                  </div>
                  {TRENDING.map((item) => (
                    <div
                      key={item.label}
                      onClick={() => {
                        router.push(item.path);
                        setShowDropdown(false);
                      }}
                      className="px-4 py-3 text-sm cursor-pointer hover:bg-blue-50 transition-colors flex items-center gap-3 group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <span className="text-gray-700 font-medium group-hover:text-blue-600">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </>
              )}

              {debouncedQuery &&
                (suggestions.length === 0 ? (
                  <div className="px-4 py-6 text-center">
                    <p className="text-sm text-gray-500">
                      No results found for "{debouncedQuery}"
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Try a different search term
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                      <p className="text-xs font-semibold text-gray-600">
                        {suggestions.length} result
                        {suggestions.length > 1 ? "s" : ""} found
                      </p>
                    </div>
                    {suggestions.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          router.push(`/product/${p.id}`);
                          setShowDropdown(false);
                          clearSearch();
                        }}
                        className="px-4 py-3 text-sm cursor-pointer hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0"
                      >
                        <div className="font-medium text-gray-900">
                          {p.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          ₹{p.price.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </>
                ))}
            </div>
          )}
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-gray-700">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About" />
          <NavLink href="/help" label="Help" />
          <NavLink href="/support" label="Support" />

          {isAdmin && (
            <Link
              href="/admin"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-xs font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Cart & Mobile Menu */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link
            href="/cart"
            className="relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            <span className="hidden sm:inline">Cart</span>
            <span className="sm:hidden">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-red-500 text-white text-[10px] sm:text-xs flex items-center justify-center font-bold shadow-lg animate-pulse">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative w-9 h-9 sm:w-10 sm:h-10 flex flex-col items-center justify-center gap-1 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-0.5 bg-current transition-all ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-current transition-all ${mobileOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-current transition-all ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU - PREMIUM UI */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-4 sm:space-y-5">
            {/* MOBILE SEARCH - PREMIUM UI */}
            <div className="relative" ref={dropdownRef}>
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search products…"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />

                {/* Search Icon */}
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
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

                {/* Clear Button */}
                {query && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-900"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* MOBILE DROPDOWN - PREMIUM UI */}
              {showDropdown && (
                <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-2xl z-[9999] overflow-hidden max-h-[60vh] overflow-y-auto">
                  {!debouncedQuery && (
                    <>
                      <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                        <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                          🔥 Trending
                        </p>
                      </div>
                      {TRENDING.map((item) => (
                        <div
                          key={item.label}
                          onClick={() => {
                            router.push(item.path);
                            setMobileOpen(false);
                            setShowDropdown(false);
                          }}
                          className="px-4 py-3 text-sm cursor-pointer hover:bg-blue-50 active:bg-blue-100 transition-colors flex items-center gap-3"
                        >
                          <span className="text-xl">{item.icon}</span>
                          <span className="text-gray-700 font-medium">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </>
                  )}

                  {debouncedQuery &&
                    (suggestions.length === 0 ? (
                      <div className="px-4 py-6 text-center">
                        <p className="text-sm text-gray-500">
                          No results found
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Try a different search
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                          <p className="text-xs font-semibold text-gray-600">
                            {suggestions.length} result
                            {suggestions.length > 1 ? "s" : ""}
                          </p>
                        </div>
                        {suggestions.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => {
                              router.push(`/product/${p.id}`);
                              setMobileOpen(false);
                              setShowDropdown(false);
                            }}
                            className="px-4 py-3 text-sm cursor-pointer hover:bg-blue-50 active:bg-blue-100 transition-colors border-b border-gray-100 last:border-0"
                          >
                            <div className="font-medium text-gray-900">
                              {p.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              ₹{p.price.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </>
                    ))}
                </div>
              )}
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-2">
              <MobileNavLink
                href="/"
                label="🏠 Home"
                onClick={() => setMobileOpen(false)}
              />
              <MobileNavLink
                href="/about"
                label="ℹ️ About"
                onClick={() => setMobileOpen(false)}
              />
              <MobileNavLink
                href="/help"
                label="❓ Help"
                onClick={() => setMobileOpen(false)}
              />
              <MobileNavLink
                href="/support"
                label="💬 Support"
                onClick={() => setMobileOpen(false)}
              />

              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-sm font-bold text-center shadow-md"
                >
                  🔐 Admin Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="hover:text-blue-600 transition-colors relative group"
    >
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
    >
      {label}
    </Link>
  );
}
