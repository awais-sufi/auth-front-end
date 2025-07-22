/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { LogOut, User, BarChart2 } from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  if (!token) return router.push("/login");

  api
    .get("/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log("User data:", res.data);
      setUser(res.data);
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      router.push("/login");
    });
}, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3">
          <svg
            className="animate-spin h-6 w-6 text-emerald-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <p className="text-gray-600 text-lg font-medium">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6 border border-gray-200">
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="text-blue-600" size={32} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {user.email}
            </h2>
            <p className="text-gray-500">Logged in successfully</p>
          </div>
        </div>

        {/* Dummy Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
            <h3 className="text-gray-500 text-sm mb-1">Total Posts</h3>
            <p className="text-2xl font-bold text-gray-800">12</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
            <h3 className="text-gray-500 text-sm mb-1">Notifications</h3>
            <p className="text-2xl font-bold text-gray-800">4</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
            <h3 className="text-gray-500 text-sm mb-1">Account Age</h3>
            <p className="text-2xl font-bold text-gray-800">3 months</p>
          </div>
        </div>

        {/* Analytics Placeholder */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100 text-center text-gray-500">
          <BarChart2 className="mx-auto mb-2 text-gray-400" size={32} />
          <p>Analytics coming soon...</p>
        </div>
      </div>
    </main>
  );
}
