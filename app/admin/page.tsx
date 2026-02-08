"use client";

import { useState, useEffect } from "react";
import { ProductList } from "./components/ProductList";
import { AddProduct } from "./components/AddProduct";
import { EditProduct } from "./components/EditProduct";
import { ProductPreview } from "./components/ProductPreview";
import { Sidebar } from "./components/Sidebar";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  subCategory?: string;
  description: string;
  image: string;
  images: string[];
  sizes?: string[];
  rating: number;
  reviews: number;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentView, setCurrentView] = useState<
    "list" | "add" | "edit" | "preview"
  >("list");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load from database on mount
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/products");
        if (!res.ok) return;
        const data = await res.json();
        if (active && Array.isArray(data.products)) {
          setProducts(data.products as Product[]);
        }
      } catch (err) {
        console.error("Failed to load products from DB", err);
      } finally {
        if (active) setIsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    const product: Product = {
      ...newProduct,
      id: Math.max(...products.map((p) => p.id), 0) + 1,
    };
    // Optimistically update UI
    setProducts([...products, product]);
    setCurrentView("list");

    // Show success message
    showNotification("Product added successfully!", "success");

    // Persist to database (fire-and-forget)
    void fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          console.error(
            "Failed to save product:",
            data?.error || res.statusText,
          );
          showNotification("Failed to save product to database", "error");
        }
      })
      .catch((err) => {
        console.error("Network error saving product:", err);
        showNotification(
          "Network error - please check your connection",
          "error",
        );
      });
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    // Optimistic update
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
    setSelectedProduct(null);
    setCurrentView("list");

    // Show success message
    showNotification("Product updated successfully!", "success");

    // Persist to database
    void fetch(`/api/products/${updatedProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: updatedProduct.id,
        name: updatedProduct.name,
        price: updatedProduct.price,
        category: updatedProduct.category,
        subCategory: updatedProduct.subCategory,
        description: updatedProduct.description,
        image: updatedProduct.image,
        images: updatedProduct.images,
        sizes: updatedProduct.sizes,
        rating: updatedProduct.rating,
        reviews: updatedProduct.reviews,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          console.error(
            "Failed to update product:",
            data?.error || res.statusText,
          );
          showNotification("Failed to update product in database", "error");
        }
      })
      .catch((err) => {
        console.error("Network error updating product:", err);
        showNotification(
          "Network error - please check your connection",
          "error",
        );
      });
  };

  const handleDeleteProduct = (id: number) => {
    const productToDelete = products.find((p) => p.id === id);
    if (!productToDelete) return;

    if (
      confirm(
        `Delete "${productToDelete.name}"?\n\nThis action cannot be undone.`,
      )
    ) {
      // Optimistic removal
      setProducts(products.filter((p) => p.id !== id));

      // Show success message
      showNotification("Product deleted successfully!", "success");

      // Persist deletion to database
      void fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            console.error(
              "Failed to delete product:",
              data?.error || res.statusText,
            );
            showNotification("Failed to delete product from database", "error");
          }
        })
        .catch((err) => {
          console.error("Network error deleting product:", err);
          showNotification(
            "Network error - please check your connection",
            "error",
          );
        });
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView("edit");
  };

  const handlePreviewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView("preview");
  };

  const showNotification = (message: string, type: "success" | "error") => {
    // Simple notification - you can enhance this with a toast library
    console.log(`[${type.toUpperCase()}] ${message}`);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map((p) => p.category))];

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          setSelectedProduct={setSelectedProduct}
          totalProducts={products.length}
          totalCategories={categories.length}
        />

        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Breadcrumb */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span
                    className="hover:text-gray-900 cursor-pointer"
                    onClick={() => setCurrentView("list")}
                  >
                    Dashboard
                  </span>
                  <span>/</span>
                  <span className="text-gray-900 font-medium capitalize">
                    {currentView === "list"
                      ? "Products"
                      : currentView === "add"
                        ? "Add Product"
                        : currentView === "edit"
                          ? "Edit Product"
                          : "Preview Product"}
                  </span>
                </div>
              </div>

              {/* Main Content */}
              {currentView === "list" && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Products
                      </h1>
                      <p className="text-gray-600 text-sm mt-1">
                        Manage your product inventory
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentView("add")}
                      className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                    >
                      <span>+</span>
                      <span className="hidden sm:inline">Add Product</span>
                    </button>
                  </div>
                  <ProductList
                    products={filteredProducts}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    categories={categories}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                    onPreview={handlePreviewProduct}
                  />
                </>
              )}

              {currentView === "add" && (
                <AddProduct
                  onAdd={handleAddProduct}
                  onCancel={() => setCurrentView("list")}
                />
              )}

              {currentView === "edit" && selectedProduct && (
                <EditProduct
                  product={selectedProduct}
                  onUpdate={handleUpdateProduct}
                  onCancel={() => {
                    setSelectedProduct(null);
                    setCurrentView("list");
                  }}
                />
              )}

              {currentView === "preview" && selectedProduct && (
                <ProductPreview
                  product={selectedProduct}
                  onClose={() => {
                    setSelectedProduct(null);
                    setCurrentView("list");
                  }}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
