/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/axios";

export default function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(email);
      const res = await api.post("/verify-login-otp", { email, otp });

      // Save token and redirect to dashboard
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard"); // ✅ Fixed
    } catch (err: any) {
      alert(err.response?.data?.msg || "OTP verification failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-md w-full"
      >
        <h2 className="text-xl font-bold text-center">Enter OTP</h2>
        <p className="text-sm text-gray-600 text-center">
          Enter the 6-digit code sent to your email
        </p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          maxLength={6}
          className="w-full px-4 py-2 border text-green-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
        >
          Verify OTP
        </button>
      </form>
    </main>
  );
}
