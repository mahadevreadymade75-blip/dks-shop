"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async () => {
    if (!password.trim()) return;

    setLoading(true);

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full
            border border-gray-300
            rounded-xl
            px-4 py-3
            text-gray-900
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-black
            transition
          "
        />

        <button
          onClick={login}
          disabled={loading}
          className="
            w-full
            bg-black
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:bg-gray-800
            transition
            disabled:opacity-60
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Authorized access only
        </p>
      </div>
    </div>
  );
}
