"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { getProducts } from "@/data/products";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import Rating from "@/components/Rating";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { addToCart } = useCart();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [customersAlsoBought, setCustomersAlsoBought] = useState<Product[]>([]);

  useEffect(() => {
    let mounted = true;
    void getProducts().then((data) => {
      if (!mounted) return;
      const items = data ?? [];
      setAllProducts(items);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const product = allProducts.find((p) => String(p.id) === id);
  const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (!product) return;

    setRelatedProducts(
      shuffle(
        allProducts.filter(
          (p) =>
            p.id !== product.id &&
            p.category === product.category &&
            p.subCategory === product.subCategory,
        ),
      ).slice(0, 6),
    );

    setCustomersAlsoBought(
      shuffle(
        allProducts.filter(
          (p) => p.id !== product.id && p.category === product.category,
        ),
      ).slice(0, 6),
    );
  }, [product, allProducts]);

  // Calculate discount
  const discountInfo = useMemo(() => {
    if (!product?.originalPrice || product.originalPrice <= product.price) {
      return null;
    }

    const discount = product.originalPrice - product.price;
    const discountPercent = Math.round(
      (discount / product.originalPrice) * 100,
    );

    return { discount, discountPercent };
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600 bg-gray-50 gap-4">
        <div className="text-6xl">📦</div>
        <p className="text-xl font-semibold">Product not found</p>
        <Link
          href="/"
          className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Go to Homepage
        </Link>
      </div>
    );
  }

  const images: string[] = Array.isArray(product.images)
    ? product.images
    : product.images
      ? [product.images]
      : product.image
        ? [product.image]
        : ["/placeholder.jpg"];

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("⚠️ Please select a size first");
      return;
    }

    setIsAddingToCart(true);

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      size: selectedSize ?? undefined,
      images,
    });

    setTimeout(() => setIsAddingToCart(false), 500);
  };

  const handleWhatsAppOrder = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("⚠️ Please select a size first");
      return;
    }

    // Create WhatsApp message
    const message = `Hi! I want to order:\n\n*${product.name}*\nPrice: ₹${product.price.toLocaleString()}\n${selectedSize ? `Size: ${selectedSize}` : ""}\n\nProduct Link: ${window.location.href}`;

    const whatsappNumber = "918741803589"; // Your WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <span>›</span>
            <Link
              href={`/${product.category}`}
              className="hover:text-gray-900 capitalize"
            >
              {product.category}
            </Link>
            <span>›</span>
            <span className="text-gray-900 font-medium line-clamp-1">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ================= LEFT: IMAGE GALLERY ================= */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full aspect-square rounded-2xl bg-white border border-gray-200 overflow-hidden group">
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                quality={90}
              />

              {/* Discount Badge on Image */}
              {discountInfo && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-red-500 text-white px-4 py-2 rounded-xl shadow-lg">
                    <div className="text-2xl font-bold">
                      {discountInfo.discountPercent}%
                    </div>
                    <div className="text-xs font-semibold">OFF</div>
                  </div>
                </div>
              )}

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === activeImage
                            ? "bg-white w-6"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative h-20 w-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImage === idx
                        ? "border-gray-900 ring-2 ring-gray-300"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                      quality={75}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================= RIGHT: PRODUCT DETAILS ================= */}
          <div className="space-y-6">
            {/* Category Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg capitalize">
                {product.category}
              </span>
              {product.subCategory && (
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg capitalize">
                  {product.subCategory}
                </span>
              )}
              {discountInfo && (
                <span className="px-3 py-1.5 bg-red-100 text-red-700 text-sm font-bold rounded-lg">
                  🔥 Limited Time Deal
                </span>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {typeof product.rating === "number" && (
              <div className="flex items-center gap-3">
                <Rating value={product.rating} />
                <span className="text-lg font-bold text-gray-900">
                  {product.rating.toFixed(1)}
                </span>
                {typeof product.reviews === "number" && (
                  <span className="text-gray-500 text-sm">
                    ({product.reviews.toLocaleString()} reviews)
                  </span>
                )}
              </div>
            )}

            {/* Price Section */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl font-bold text-green-600">
                  ₹{product.price.toLocaleString()}
                </span>

                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <>
                      <span className="text-2xl text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-lg font-bold text-red-600">
                        ({discountInfo?.discountPercent}% OFF)
                      </span>
                    </>
                  )}
              </div>

              {discountInfo && (
                <p className="text-green-700 font-semibold mt-3 text-lg">
                  💰 You save: ₹{discountInfo.discount.toLocaleString()}
                </p>
              )}

              <p className="text-gray-500 text-sm mt-2">
                inclusive of all taxes
              </p>
            </div>

            {/* Description */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description ||
                  "Premium quality product with excellent craftsmanship. Perfect for everyday use and special occasions. Made with high-quality materials to ensure long-lasting durability and comfort."}
              </p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
                  Select Size{" "}
                  {!selectedSize && <span className="text-red-500">*</span>}
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-3 rounded-xl border-2 font-semibold transition-all ${
                        selectedSize === size
                          ? "bg-gray-900 text-white border-gray-900"
                          : "border-gray-300 hover:border-gray-900 text-gray-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingToCart ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Adding to Cart...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    🛒 Add to Cart
                  </span>
                )}
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-colors"
              >
                <span className="flex items-center justify-center gap-2">
                  💬 Order on WhatsApp
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      {relatedProducts.length > 0 && (
        <section className="py-12 sm:py-16 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">
              Related Products
            </h2>

            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  className="w-[160px] sm:w-[200px] md:w-[240px] flex-none"
                >
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= CUSTOMERS ALSO BOUGHT ================= */}
      {customersAlsoBought.length > 0 && (
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">
              Customers Also Bought
            </h2>

            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
              {customersAlsoBought.map((item) => (
                <div
                  key={item.id}
                  className="w-[160px] sm:w-[200px] md:w-[240px] flex-none"
                >
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
