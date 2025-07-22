import { Suspense } from "react";
import VerifyOTPPage from "@/components/VerifyOTPPage ";

export default function VerifyLoginPageWrapper() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <VerifyOTPPage />
    </Suspense>
  );
}
