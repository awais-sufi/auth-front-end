import { Suspense } from "react";
import VerifyLoginPage from "@/components/VerifyLoginPage ";

export default function VerifyLoginPageWrapper() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <VerifyLoginPage />
    </Suspense>
  );
}
