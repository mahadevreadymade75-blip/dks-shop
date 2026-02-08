"use client";

import { useState } from "react";
import { Product } from "../page";

interface ProductPreviewProps {
  product: Product;
  onClose: () => void;
}

export function ProductPreview({ product, onClose }: ProductPreviewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.images.length > 0 ? product.images : [product.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400 text-lg">
          ★
        </span>,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-lg">
          ☆
        </span>,
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 text-lg">
          ☆
        </span>,
      );
    }

    return stars;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Preview</h2>
          <p className="text-sm text-gray-600 mt-1">Customer-facing view</p>
        </div>
        <button
          onClick={onClose}
          className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <span>✕</span>
          <span>Close</span>
        </button>
      </div>

      {/* Preview Card */}
      <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Carousel */}
          <div className="relative bg-gray-50">
            <div className="aspect-square relative">
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.jpg";
                }}
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center transition-all shadow-lg"
                  >
                    ←
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center transition-all shadow-lg"
                  >
                    →
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
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
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-black ring-2 ring-gray-300"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg";
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 lg:p-8 space-y-6">
            {/* Category Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg capitalize">
                {product.category}
              </span>
              {product.subCategory && (
                <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg capitalize">
                  {product.subCategory}
                </span>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="text-lg font-bold text-gray-900">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-gray-500 text-sm">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-green-600">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-gray-500 text-sm">
                inclusive of all taxes
              </span>
            </div>

            {/* Sizes */}
            {Array.isArray(product.sizes) && product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase">
                  Available Sizes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                <span>🛒</span>
                <span>Add to Cart</span>
              </button>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                <span>❤️</span>
                <span>Add to Wishlist</span>
              </button>
            </div>

            {/* Product Information */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase">
                Product Information
              </h4>
              <div className="space-y-2 text-sm">
                <InfoRow label="Product ID" value={`#${product.id}`} />
                <InfoRow label="Category" value={product.category} capitalize />
                {product.subCategory && (
                  <InfoRow
                    label="Subcategory"
                    value={product.subCategory}
                    capitalize
                  />
                )}
                <InfoRow label="Average Rating" value={`${product.rating}/5`} />
                <InfoRow
                  label="Total Reviews"
                  value={product.reviews.toLocaleString()}
                />
                <InfoRow
                  label="Total Images"
                  value={images.length.toString()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <div className="flex gap-3">
          <div className="text-2xl">ℹ️</div>
          <div className="flex-1">
            <h4 className="font-bold text-blue-900 mb-1">Preview Mode</h4>
            <p className="text-blue-800 text-sm leading-relaxed">
              This is how the product will appear to customers. The actual
              frontend design may have slight variations based on your theme
              settings.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

/* ================= HELPER COMPONENT ================= */

function InfoRow({
  label,
  value,
  capitalize = false,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-gray-600 font-medium">{label}:</span>
      <span
        className={`text-gray-900 font-semibold ${capitalize ? "capitalize" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
