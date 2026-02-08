"use client";

import { useState, useEffect } from "react";
import { Product } from "../page";

interface EditProductProps {
  product: Product;
  onUpdate: (product: Product) => void;
  onCancel: () => void;
}

export function EditProduct({ product, onUpdate, onCancel }: EditProductProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    originalPrice: 0, // ✅ ADDED
    category: "",
    subCategory: "",
    description: "",
    image: "",
    images: [""],
    sizes: [] as string[],
    rating: 4.0,
    reviews: 0,
  });

  const [sizesInput, setSizesInput] = useState("");
  const [isUploadingMain, setIsUploadingMain] = useState(false); // ✅ ADDED
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null); // ✅ ADDED

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = ["shoes", "watches", "men", "women", "kids", "kitchen"];

  // ✅ ADDED: Cloudinary config
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // ✅ ADDED: Upload function
  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      console.error(
        "Cloudinary env vars missing: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME or NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET",
      );
      setErrors((prev) => ({
        ...prev,
        image:
          "Image upload is not configured. Please set Cloudinary env vars.",
      }));
      return null;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }
      const data = await res.json();
      return data.secure_url as string;
    } catch (err) {
      console.error("Cloudinary upload failed", err);
      setErrors((prev) => ({
        ...prev,
        image: "Failed to upload image. Please try again.",
      }));
      return null;
    }
  };

  // ✅ ADDED: Main image file handler
  const handleMainImageFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingMain(true);
    const url = await uploadToCloudinary(file);
    setIsUploadingMain(false);
    if (url) {
      setFormData((prev) => ({ ...prev, image: url }));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  // ✅ ADDED: Extra image file handler
  const handleExtraImageFile = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingIndex(index);
    const url = await uploadToCloudinary(file);
    setUploadingIndex(null);
    if (url) {
      const newImages = [...formData.images];
      newImages[index] = url;
      setFormData((prev) => ({ ...prev, images: newImages }));
    }
  };

  useEffect(() => {
    setFormData({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice ?? 0, // ✅ ADDED
      category: product.category,
      subCategory: product.subCategory ?? "",
      description: product.description,
      image: product.image,
      images: product.images.length > 0 ? product.images : [""],
      sizes: Array.isArray(product.sizes) ? product.sizes : [],
      rating: product.rating,
      reviews: product.reviews,
    });
    setSizesInput(Array.isArray(product.sizes) ? product.sizes.join(", ") : "");
  }, [product]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";

    // ✅ ADDED: Original price validation
    if (formData.originalPrice > 0 && formData.originalPrice < formData.price) {
      newErrors.originalPrice =
        "Original price must be greater than or equal to current price";
    }

    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.image.trim()) newErrors.image = "Main image is required";
    if (formData.rating < 0 || formData.rating > 5)
      newErrors.rating = "Rating must be between 0 and 5";
    if (formData.reviews < 0)
      newErrors.reviews = "Reviews count cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const updatedProduct: Product = {
        ...formData,
        ID: String(product.id),
        id: product.id,
        // ✅ ADDED: Only include originalPrice if > 0
        originalPrice:
          formData.originalPrice > 0 ? formData.originalPrice : undefined,
        images: formData.images.filter((img) => img.trim() !== ""),
        subCategory: formData.subCategory?.trim()
          ? formData.subCategory.trim()
          : undefined,
        sizes: Array.isArray(formData.sizes)
          ? formData.sizes
              .filter((s) => s && s.trim() !== "")
              .map((s) => s.trim())
          : [],
      };
      onUpdate(updatedProduct);
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  // ✅ ADDED: Calculate discount percentage
  const discountPercentage =
    formData.originalPrice > 0 && formData.price > 0
      ? Math.round(
          ((formData.originalPrice - formData.price) / formData.originalPrice) *
            100,
        )
      : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Edit Product</h2>
          <p className="text-gray-600 text-sm mt-1">ID: {product.id}</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
      >
        <div className="p-6 sm:p-8 space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-xl">📦</span>
              <span>Basic Information</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Product Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter product name"
                error={errors.name}
              />

              {/* ✅ ADDED: Original Price Input */}
              <FormInput
                label="Original Price (₹)"
                type="number"
                value={formData.originalPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    originalPrice: Number(e.target.value),
                  })
                }
                placeholder="Leave 0 if no discount"
                min="0"
                error={errors.originalPrice}
              />

              <FormInput
                label="Current Price (₹)"
                required
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                placeholder="0"
                min="0"
                error={errors.price}
              />

              {/* ✅ ADDED: Discount Preview */}
              {discountPercentage > 0 && (
                <div className="md:col-span-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🎉</div>
                    <div>
                      <p className="text-sm font-semibold text-green-900">
                        Discount Applied: {discountPercentage}% OFF
                      </p>
                      <p className="text-xs text-green-700">
                        Customer saves ₹
                        {(
                          formData.originalPrice - formData.price
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="capitalize">
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <span>⚠️</span>
                    {errors.category}
                  </p>
                )}
              </div>

              <FormInput
                label="Subcategory"
                value={formData.subCategory}
                onChange={(e) =>
                  setFormData({ ...formData, subCategory: e.target.value })
                }
                placeholder="e.g. shirts, tshirts"
              />

              <FormInput
                label="Sizes (comma-separated)"
                value={sizesInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setSizesInput(val);
                  setFormData({
                    ...formData,
                    sizes: val
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  });
                }}
                placeholder="e.g. S, M, L, XL"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-xl">📝</span>
              <span>Product Description</span>
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition resize-none"
                placeholder="Enter detailed product description"
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <span>⚠️</span>
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Images */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-xl">🖼️</span>
              <span>Product Images</span>
            </h3>

            {/* Main Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Image <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageFile}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition"
                />
                {isUploadingMain && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Uploading image...</span>
                  </div>
                )}
                {formData.image && (
                  <div className="relative inline-block">
                    <img
                      src={formData.image}
                      alt="Main preview"
                      className="h-32 w-32 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                    />
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                      <span className="text-xs">✓</span>
                    </div>
                  </div>
                )}
              </div>
              {errors.image && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <span>⚠️</span>
                  {errors.image}
                </p>
              )}
            </div>

            {/* Additional Images */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Additional Images
                </label>
                <button
                  type="button"
                  onClick={addImageField}
                  className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
                >
                  <span>+</span>
                  <span>Add Image</span>
                </button>
              </div>
              <div className="space-y-3">
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex-1 space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleExtraImageFile(index, e)}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition"
                      />
                      {uploadingIndex === index && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          <span>Uploading...</span>
                        </div>
                      )}
                      {image && (
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="h-24 w-24 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                        />
                      )}
                    </div>
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rating & Reviews */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-xl">⭐</span>
              <span>Rating & Reviews</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Rating (0-5)"
                type="number"
                step="0.1"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: Number(e.target.value) })
                }
                min="0"
                max="5"
                error={errors.rating}
              />

              <FormInput
                label="Reviews Count"
                type="number"
                value={formData.reviews}
                onChange={(e) =>
                  setFormData({ ...formData, reviews: Number(e.target.value) })
                }
                min="0"
                error={errors.reviews}
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="bg-gray-50 px-6 sm:px-8 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <span>Update Product</span>
            <span>✓</span>
          </button>
        </div>
      </form>
    </div>
  );
}

/* ================= REUSABLE INPUT COMPONENT ================= */

interface FormInputProps {
  label: string;
  required?: boolean;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: string;
  max?: string;
  step?: string;
  error?: string;
}

function FormInput({
  label,
  required = false,
  type = "text",
  value,
  onChange,
  placeholder,
  min,
  max,
  step,
  error,
}: FormInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
      />
      {error && (
        <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
          <span>⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
}
