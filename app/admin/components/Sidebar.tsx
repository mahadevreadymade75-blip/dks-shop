"use client";

import { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  currentView: "list" | "add" | "edit" | "preview";
  setCurrentView: Dispatch<SetStateAction<"list" | "add" | "edit" | "preview">>;
  setSelectedProduct: Dispatch<SetStateAction<any>>;
  totalProducts?: number;
  totalCategories?: number;
}

export function Sidebar({
  currentView,
  setCurrentView,
  setSelectedProduct,
  totalProducts = 0,
  totalCategories = 6,
}: SidebarProps) {
  const menuItems = [
    {
      id: "list",
      label: "Product List",
      icon: "📋",
      description: "View & manage products",
    },
    {
      id: "add",
      label: "Add Product",
      icon: "➕",
      description: "Create new product",
    },
  ];

  const handleMenuClick = (viewId: "list" | "add" | "edit" | "preview") => {
    setCurrentView(viewId);
    if (viewId === "list" || viewId === "add") {
      setSelectedProduct(null);
    }
  };

  return (
    <div className="w-full md:w-72 bg-white border-b md:border-b-0 md:border-r border-gray-200 shadow-sm">
      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-lg">
              🏪
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DKS Handloom</h1>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
            Navigation
          </div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id as any)}
              className={`w-full group relative overflow-hidden rounded-lg transition-all ${
                currentView === item.id
                  ? "bg-black text-white shadow-md"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-3 px-4 py-3.5">
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-sm">{item.label}</div>
                  <div
                    className={`text-xs mt-0.5 ${
                      currentView === item.id
                        ? "text-gray-300"
                        : "text-gray-500"
                    }`}
                  >
                    {item.description}
                  </div>
                </div>
                {currentView === item.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                )}
              </div>
            </button>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📊</span>
            <h3 className="text-sm font-bold text-gray-900">Quick Stats</h3>
          </div>
          <div className="space-y-3">
            <StatItem
              icon="📦"
              label="Total Products"
              value={totalProducts}
              color="blue"
            />
            <StatItem
              icon="🏷️"
              label="Categories"
              value={totalCategories}
              color="green"
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>🔒</span>
            <span>Secure Admin Access</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= STAT ITEM COMPONENT ================= */

function StatItem({
  icon,
  label,
  value,
  color = "gray",
}: {
  icon: string;
  label: string;
  value: number | string;
  color?: "blue" | "green" | "gray";
}) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    gray: "bg-gray-50 text-gray-700 border-gray-200",
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <div
        className={`px-2.5 py-1 rounded-lg font-bold text-sm border ${colorClasses[color]}`}
      >
        {value}
      </div>
    </div>
  );
}
