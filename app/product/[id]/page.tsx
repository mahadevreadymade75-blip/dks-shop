"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProducts } from "@/data/products";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { addToCart } = useCart();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 bg-gray-50">
        Product not found
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900 px-4 sm:px-6 py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* IMAGE */}
        <div className="flex flex-col gap-5">
          <div className="relative w-full max-h-[620px] aspect-[3/4] rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm">
            <Image
              src={images[activeImage]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex gap-3 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative h-20 w-16 rounded-xl overflow-hidden border transition ${
                  activeImage === idx
                    ? "border-black ring-2 ring-gray-300"
                    : "border-gray-300 hover:border-gray-500"
                }`}
              >
                <Image
                  src={img}
                  alt="thumb"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex flex-col gap-7">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            {product.name}
          </h1>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <p className="text-green-600 text-3xl font-bold">
              ₹{product.price}
            </p>
            <p className="text-gray-500 text-sm mt-1">inclusive of all taxes</p>
          </div>

          <p className="text-gray-600 max-w-xl leading-relaxed">
            {product.description}
          </p>

          {product.sizes && (
            <div>
              <p className="mb-3 text-sm font-semibold">Select Size</p>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-full border transition ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 flex-wrap mt-2">
            <button
              onClick={() => {
                if (product.sizes && !selectedSize) return;
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  qty: 1,
                  size: selectedSize ?? undefined,
                  images,
                });
              }}
              className="px-10 py-3.5 rounded-full bg-black text-white font-semibold hover:scale-105 transition"
            >
              Add to Cart
            </button>

            <button className="px-10 py-3.5 rounded-full border border-gray-400 hover:bg-gray-100 transition font-medium">
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* RELATED */}
      {relatedProducts.length > 0 && (
        <section className="mt-32">
          <h2 className="text-2xl sm:text-3xl font-bold mb-7">
            Related Products
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-4">
            {relatedProducts.map((item) => (
              <div key={item.id} className="min-w-[220px] sm:min-w-[260px]">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </section>
      )}

      {customersAlsoBought.length > 0 && (
        <section className="mt-28">
          <h2 className="text-2xl sm:text-3xl font-bold mb-7">
            Customers Also Bought
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-4">
            {customersAlsoBought.map((item) => (
              <div key={item.id} className="min-w-[220px] sm:min-w-[260px]">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
