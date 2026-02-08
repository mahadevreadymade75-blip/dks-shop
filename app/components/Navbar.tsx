"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { getProducts } from "@/data/products";
import type { Product } from "@/types/product";
import { useEffect, useState, useRef } from "react";

/* ================= TRENDING ================= */

const TRENDING = [
  { label: "Men Fashion", path: "/men" },
  { label: "Women Collection", path: "/women" },
  { label: "Shoes", path: "/shoes" },
  { label: "Watches", path: "/watches" },
  { label: "Kids Wear", path: "/kids" },
  { label: "Home & Kitchen", path: "/home-kitchen" },
];

export default function Navbar() {
  const router = useRouter();
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

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

  /* ================= ORIGINAL EFFECTS ================= */

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    let mounted = true;
    void getProducts().then((data) => {
      if (mounted) setAllProducts(data ?? []);
    });
    return () => {
      mounted = false;
    };
  }, []);

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

  const suggestions = debouncedQuery
    ? allProducts
        .filter((p) =>
          p.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
        )
        .slice(0, 6)
    : [];

  const handleSearch = (value?: string) => {
    const q = value ?? query;
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setShowDropdown(false);
    setMobileOpen(false);
  };

  const clearSearch = () => {
    setQuery("");
    setDebouncedQuery("");
    setShowDropdown(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-5 py-4 flex items-center gap-4">
        <Link href="/" className="text-xl font-semibold text-gray-900">
          DKSHANDLOOM
        </Link>

        {/* ================= SEARCH (DESKTOP) ================= */}
        <div
          className="hidden md:block flex-1 max-w-md relative"
          ref={dropdownRef}
        >
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search products, brands, categories…"
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-900 outline-none"
          />

          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            >
              ✕
            </button>
          )}

          {showDropdown && (
            <div className="absolute mt-2 w-full bg-black text-white rounded-md shadow-xl z-[9999] overflow-hidden">
              {!debouncedQuery && (
                <>
                  <p className="px-4 py-2 text-xs font-semibold text-gray-400">
                    Trending Searches
                  </p>
                  {TRENDING.map((item) => (
                    <div
                      key={item.label}
                      onClick={() => {
                        router.push(item.path);
                        setShowDropdown(false);
                      }}
                      className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-800"
                    >
                      {item.label}
                    </div>
                  ))}
                </>
              )}

              {debouncedQuery &&
                (suggestions.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-gray-400">
                    No results found
                  </p>
                ) : (
                  suggestions.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        router.push(`/product/${p.id}`);
                        setShowDropdown(false);
                      }}
                      className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-800"
                    >
                      {p.name}
                    </div>
                  ))
                ))}
            </div>
          )}
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About" />
          <NavLink href="/help" label="Help" />
          <NavLink href="/support" label="Support" />

          {isAdmin && (
            <Link
              href="/admin"
              className="px-4 py-2 bg-black text-white rounded-md"
            >
              Admin Dashboard
            </Link>
          )}
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/cart"
            className="relative px-4 py-2 rounded-md bg-black text-white text-sm font-medium"
          >
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-black"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-5 py-4 space-y-6">
          {/* MOBILE SEARCH */}
          <div className="relative" ref={dropdownRef}>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search products, brands, categories…"
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-sm text-black"
            />

            {showDropdown && (
              <div className="absolute mt-2 w-full bg-black text-white rounded-md shadow-xl z-[9999] overflow-hidden">
                {!debouncedQuery && (
                  <>
                    <p className="px-4 py-2 text-xs font-semibold text-gray-400">
                      Trending Searches
                    </p>
                    {TRENDING.map((item) => (
                      <div
                        key={item.label}
                        onClick={() => {
                          router.push(item.path);
                          setMobileOpen(false);
                          setShowDropdown(false);
                        }}
                        className="px-4 py-2 text-sm hover:bg-gray-800"
                      >
                        {item.label}
                      </div>
                    ))}
                  </>
                )}

                {debouncedQuery &&
                  (suggestions.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-gray-400">
                      No results found
                    </p>
                  ) : (
                    suggestions.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          router.push(`/product/${p.id}`);
                          setMobileOpen(false);
                          setShowDropdown(false);
                        }}
                        className="px-4 py-2 text-sm hover:bg-gray-800"
                      >
                        {p.name}
                      </div>
                    ))
                  ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 text-sm font-medium text-gray-700">
            <NavLink href="/" label="Home" />
            <NavLink href="/about" label="About" />
            <NavLink href="/help" label="Help" />
            <NavLink href="/support" label="Support" />

            {isAdmin && (
              <Link
                href="/admin"
                className="px-4 py-2 bg-black text-white rounded-md text-center"
              >
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="hover:text-black transition">
      {label}
    </Link>
  );
}
