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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm font-light tracking-wide">
            Loading
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* ================= PRODUCT SECTION ================= */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* ================= IMAGE GALLERY ================= */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden group">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse" />
              )}
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={95}
                className={`object-cover transition-all duration-700 ${
                  imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                } group-hover:scale-[1.02]`}
                priority
                onLoadingComplete={() => setImageLoaded(true)}
              />

              {/* Discount Badge - Minimal */}
              {discount && (
                <div className="absolute top-6 left-6">
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-2 border border-gray-200">
                    <span className="text-xs font-medium text-gray-900 tracking-wider">
                      -{discount}%
                    </span>
                  </div>
                </div>
              )}

              {/* Navigation Arrows - Minimal */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1,
                      )
                    }
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <span className="text-sm text-gray-900">←</span>
                  </button>
                  <button
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1,
                      )
                    }
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <span className="text-sm text-gray-900">→</span>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails - Minimal */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImage(idx);
                      setImageLoaded(false);
                    }}
                    className={`relative h-24 w-20 flex-shrink-0 overflow-hidden transition-all ${
                      activeImage === idx
                        ? "opacity-100 border border-gray-900"
                        : "opacity-40 hover:opacity-70 border border-gray-200"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================= PRODUCT DETAILS ================= */}
          <div className="flex flex-col gap-8 lg:pt-4">
            {/* Category */}
            <div className="space-y-1">
              <p className="text-xs tracking-[0.2em] uppercase text-gray-500 font-light">
                {product.category}
              </p>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 leading-[1.1] tracking-tight">
              {product.name}
            </h1>

            {/* Price - Ultra Clean */}
            <div className="space-y-2 pb-6 border-b border-gray-200">
              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-light text-gray-900">
                  ₹{product.price.toLocaleString()}
                </p>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <p className="text-xl font-light text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </p>
                  )}
              </div>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <p className="text-sm text-gray-600 font-light">
                    Save ₹
                    {(product.originalPrice - product.price).toLocaleString()}
                  </p>
                )}
              <p className="text-xs text-gray-400 font-light">
                Inclusive of all taxes
              </p>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-gray-600 font-light">
                {product.description}
              </p>
            </div>

            {/* Size Selection - Minimal */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs tracking-[0.15em] uppercase text-gray-900 font-medium">
                    Select Size
                  </p>
                  {selectedSize && (
                    <p className="text-xs text-gray-500 font-light">
                      {selectedSize}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[60px] px-5 py-3 border text-sm font-light transition-all ${
                        selectedSize === size
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-900 border-gray-300 hover:border-gray-900"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector - Minimal */}
            <div className="space-y-4">
              <p className="text-xs tracking-[0.15em] uppercase text-gray-900 font-medium">
                Quantity
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 border border-gray-300 font-light text-lg hover:border-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  −
                </button>
                <span className="text-lg font-light w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  disabled={quantity >= 10}
                  className="w-10 h-10 border border-gray-300 font-light text-lg hover:border-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons - Premium Minimal */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full px-8 py-4 bg-gray-900 text-white text-sm tracking-[0.1em] uppercase font-medium hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full px-8 py-4 border border-gray-900 bg-white text-gray-900 text-sm tracking-[0.1em] uppercase font-medium hover:bg-gray-50 active:scale-[0.98] transition-all duration-200"
              >
                Buy Now
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full px-8 py-4 border border-gray-300 bg-white text-gray-700 text-sm tracking-[0.1em] uppercase font-light hover:border-gray-900 active:scale-[0.98] transition-all duration-200"
              >
                Order via WhatsApp
              </button>
            </div>

            {/* Trust Badges - Minimal */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
              <div className="text-center space-y-2">
                <p className="text-xs text-gray-500 font-light">
                  Free Shipping
                </p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-xs text-gray-500 font-light">
                  Secure Payment
                </p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-xs text-gray-500 font-light">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      {relatedProducts.length > 0 && (
        <section className="py-20 border-t border-gray-200">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <div className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-light text-gray-900 tracking-tight">
                You May Also Like
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= CUSTOMERS ALSO BOUGHT ================= */}
      {customersAlsoBought.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <div className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-light text-gray-900 tracking-tight">
                Customers Also Bought
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
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
