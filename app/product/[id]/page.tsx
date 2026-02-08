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
  const [imageLoaded, setImageLoaded] = useState(false);

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
      // Optional: Show success message
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 text-gray-900">
      {/* ================= PRODUCT SECTION ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* ================= IMAGE GALLERY ================= */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative w-full aspect-[3/4] rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-lg group">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-blue-100 animate-pulse" />
              )}
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                className={`object-cover transition-all duration-500 ${
                  imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                } group-hover:scale-105`}
                priority
                onLoadingComplete={() => setImageLoaded(true)}
              />

              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
                {activeImage + 1} / {images.length}
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1,
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
                    aria-label="Previous image"
                  >
                    <span className="text-xl">←</span>
                  </button>
                  <button
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1,
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
                    aria-label="Next image"
                  >
                    <span className="text-xl">→</span>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImage(idx);
                      setImageLoaded(false);
                    }}
                    className={`relative h-20 w-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === idx
                        ? "border-blue-600 ring-2 ring-blue-200 scale-105"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================= PRODUCT DETAILS ================= */}
          <div className="flex flex-col gap-6">
            {/* Product Name */}
            <div>
              <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
                <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {product.category}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ₹{product.price.toLocaleString()}
              </p>
              {product.originalPrice && (
                <p className="text-xl text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <p className="mb-3 text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Select Size{" "}
                  {!selectedSize && <span className="text-red-500">*</span>}
                </p>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                        selectedSize === size
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-lg scale-105"
                          : "border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <p className="mb-3 text-sm font-bold text-gray-900 uppercase tracking-wide">
                Quantity
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-12 h-12 rounded-xl border-2 border-gray-300 font-bold text-xl hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  −
                </button>
                <span className="text-2xl font-bold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  disabled={quantity >= 10}
                  className="w-12 h-12 rounded-xl border-2 border-gray-300 font-bold text-xl hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-base sm:text-lg font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isAddingToCart ? "Adding..." : "🛒 Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white text-base sm:text-lg font-bold shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                ⚡ Buy Now
              </button>
            </div>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full px-8 py-4 rounded-xl border-2 border-green-500 bg-white text-green-600 text-base sm:text-lg font-bold hover:bg-green-50 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span className="text-2xl">💬</span>
              Order on WhatsApp
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              <div className="flex items-center gap-2 bg-white rounded-xl p-3 border border-gray-200">
                <span className="text-2xl">✅</span>
                <span className="text-xs font-semibold text-gray-700">
                  100% Original
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl p-3 border border-gray-200">
                <span className="text-2xl">🚚</span>
                <span className="text-xs font-semibold text-gray-700">
                  Fast Delivery
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl p-3 border border-gray-200">
                <span className="text-2xl">💰</span>
                <span className="text-xs font-semibold text-gray-700">
                  Cash on Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      {relatedProducts.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-8">
              <div className="inline-block mb-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
                <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  You May Also Like
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Related Products
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-8">
              <div className="inline-block mb-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
                <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Popular Choices
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
