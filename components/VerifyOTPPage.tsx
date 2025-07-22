/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      await api.post("/verify-otp", { email, otp });
      alert("Email verified! You can now log in.");
      router.push("/login");
    } catch (err: any) {
      alert(err.response?.data?.msg || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 mt-10 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Enter OTP</h1>
      <p className="mb-2 text-gray-600">
        We sent a 6-digit code to: <strong>{email}</strong>
      </p>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter 6-digit code"
        maxLength={6}
        className="p-2 border w-full rounded mb-4"
      />
      <button
        onClick={handleVerify}
        disabled={loading}
        className="bg-blue-600 text-white w-full py-2 rounded"
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
    </div>
  );
}
