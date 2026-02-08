"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProducts } from "@/data/products";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const { addToCart } = useCart();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  /* ================= FETCH PRODUCTS ================= */
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

  const product = useMemo(
    () => allProducts.find((p) => String(p.id) === id),
    [allProducts, id],
  );

  // Calculate discount
  const discount = useMemo(() => {
    if (!product?.originalPrice || product.originalPrice <= product.price) {
      return null;
    }
    return Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100,
    );
  }, [product]);

  /* ================= SHUFFLE HELPER ================= */
  const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

  /* ================= RECOMMENDATIONS ================= */
  const { relatedProducts, customersAlsoBought } = useMemo(() => {
    if (!product) return { relatedProducts: [], customersAlsoBought: [] };

    const related = shuffle(
      allProducts.filter(
        (p) =>
          p.id !== product.id &&
          p.category === product.category &&
          p.subCategory === product.subCategory,
      ),
    ).slice(0, 8);

    const alsoBought = shuffle(
      allProducts.filter(
        (p) => p.id !== product.id && p.category === product.category,
      ),
    ).slice(0, 8);

    return { relatedProducts: related, customersAlsoBought: alsoBought };
  }, [product, allProducts]);

  /* ================= IMAGE NORMALIZE ================= */
  const images: string[] = useMemo(() => {
    if (!product) return ["/placeholder.jpg"];
    return Array.isArray(product.images)
      ? product.images
      : product.images
        ? [product.images]
        : product.image
          ? [product.image]
          : ["/placeholder.jpg"];
  }, [product]);

  /* ================= HANDLERS ================= */
  const handleAddToCart = () => {
    if (!product) return;

    if (product.sizes && !selectedSize) {
      alert("Please select a size before adding to cart");
      return;
    }

    setIsAddingToCart(true);

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
        size: selectedSize ?? undefined,
        images,
      });
    }

    setTimeout(() => {
      setIsAddingToCart(false);
    }, 300);
  };

  const handleBuyNow = () => {
    if (!product) return;

    if (product.sizes && !selectedSize) {
      alert("Please select a size before proceeding");
      return;
    }

    handleAddToCart();
    router.push("/cart");
  };

  const handleWhatsAppOrder = () => {
    if (!product) return;

    if (product.sizes && !selectedSize) {
      alert("Please select a size before ordering");
      return;
    }

    const message = `Hi, I want to order:\n\n*${product.name}*\nPrice: ₹${product.price}\nQuantity: ${quantity}${selectedSize ? `\nSize: ${selectedSize}` : ""}\n\nProduct Link: ${window.location.href}`;

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  /* ================= LOADING STATE ================= */
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30 pt-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-base font-medium">
            Loading Product...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50/30 text-gray-900 pt-16 md:pt-20">
      {/* ================= BREADCRUMB ================= */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => router.push("/")}
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              Home
            </button>
            <span className="text-gray-400">›</span>
            <button
              onClick={() => router.push(`/${product.category.toLowerCase()}`)}
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              {product.category}
            </button>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* ================= PRODUCT SECTION ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* ================= IMAGE GALLERY ================= */}
          <div className="flex flex-col gap-4">
            {/* Main Image - WHITE BACKGROUND */}
            <div className="relative w-full aspect-square bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200 group">
              {!imageLoaded[activeImage] && (
                <div className="absolute inset-0 bg-white flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={95}
                priority
                className={`object-contain p-8 transition-all duration-700 ${
                  imageLoaded[activeImage]
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                } group-hover:scale-105`}
                onLoadingComplete={() =>
                  setImageLoaded((prev) => ({ ...prev, [activeImage]: true }))
                }
              />

              {/* Discount Badge */}
              {discount && (
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-xl">
                    <span className="text-sm sm:text-base font-bold">
                      -{discount}% OFF
                    </span>
                  </div>
                </div>
              )}

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      const newIndex =
                        activeImage === 0 ? images.length - 1 : activeImage - 1;
                      setActiveImage(newIndex);
                      setImageLoaded((prev) => ({
                        ...prev,
                        [newIndex]: false,
                      }));
                    }}
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all z-10 border border-gray-200"
                    aria-label="Previous image"
                  >
                    <svg
                      className="w-6 h-6 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      const newIndex =
                        activeImage === images.length - 1 ? 0 : activeImage + 1;
                      setActiveImage(newIndex);
                      setImageLoaded((prev) => ({
                        ...prev,
                        [newIndex]: false,
                      }));
                    }}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all z-10 border border-gray-200"
                    aria-label="Next image"
                  >
                    <svg
                      className="w-6 h-6 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold border border-gray-200 shadow-md">
                  {activeImage + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnails - WHITE BACKGROUND */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImage(idx);
                      setImageLoaded((prev) => ({ ...prev, [idx]: false }));
                    }}
                    className={`relative h-20 sm:h-24 w-20 sm:w-24 flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 bg-white border-2 ${
                      activeImage === idx
                        ? "border-blue-600 scale-105 shadow-lg"
                        : "border-gray-200 hover:border-blue-400 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="96px"
                      className="object-contain p-2"
                      quality={70}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================= PRODUCT DETAILS ================= */}
          <div className="flex flex-col gap-6">
            {/* Category Badge */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">
                  {product.category}
                </span>
              </div>
              {discount && (
                <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                  <span className="text-xs sm:text-sm font-semibold text-green-700">
                    🎉 Limited Time Deal
                  </span>
                </div>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Price Section */}
            <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl p-5 sm:p-6 border border-blue-100 shadow-sm">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </p>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <>
                      <p className="text-xl sm:text-2xl font-medium text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </p>
                      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md">
                        <span className="text-sm font-bold">
                          {discount}% OFF
                        </span>
                      </div>
                    </>
                  )}
              </div>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <p className="text-sm sm:text-base text-green-600 font-semibold">
                    💰 You save ₹
                    {(product.originalPrice - product.price).toLocaleString()}
                  </p>
                )}
              <p className="text-xs text-gray-500 mt-2">
                Inclusive of all taxes
              </p>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>📋</span>
                Product Details
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span>📏</span>
                    Select Size
                  </h3>
                  {selectedSize && (
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {selectedSize}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[60px] sm:min-w-[70px] px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200 scale-105"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔢</span>
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-12 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 font-bold text-xl flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  −
                </button>
                <span className="text-2xl font-bold w-16 text-center text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  disabled={quantity >= 10}
                  className="w-12 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 font-bold text-xl flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  +
                </button>
                <span className="text-sm text-gray-500 ml-2">
                  (Max: 10 items)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full px-6 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-base sm:text-lg font-bold rounded-xl shadow-xl shadow-blue-200 hover:shadow-2xl hover:shadow-blue-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isAddingToCart ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding to Cart...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    🛒 Add to Cart
                  </span>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full px-6 py-4 sm:py-5 bg-white border-2 border-gray-900 text-gray-900 text-base sm:text-lg font-bold rounded-xl hover:bg-gray-50 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                ⚡ Buy Now
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full px-6 py-4 sm:py-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                <span className="flex items-center justify-center gap-2">
                  💬 Order via WhatsApp
                </span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4">
              <TrustBadge icon="🚚" text="Free Delivery" />
              <TrustBadge icon="🔒" text="Secure Payment" />
              <TrustBadge icon="↩️" text="Easy Returns" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      {relatedProducts.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 sm:mb-12">
              <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Similar Products
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                You May Also Like
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-3"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= CUSTOMERS ALSO BOUGHT ================= */}
      {customersAlsoBought.length > 0 && (
        <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 sm:mb-12">
              <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Trending Together
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Customers Also Bought
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-3"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {customersAlsoBought.map((item) => (
                <ProductCard key={item.id} product={item} />
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

/* ================= TRUST BADGE COMPONENT ================= */
const TrustBadge = ({ icon, text }: { icon: string; text: string }) => {
  return (
    <div className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-100">
      <span className="text-2xl sm:text-3xl">{icon}</span>
      <p className="text-xs sm:text-sm text-gray-700 font-semibold text-center">
        {text}
      </p>
    </div>
  );
};
