"use client";
import { CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const studentId = searchParams.get("studentId");
  const transactionId = searchParams.get("transactionId");

  useEffect(() => {
    setTimeout(() => {
      router.push(
        `/verifyAddhar?studentId=${studentId}&transactionId=${transactionId}`
      );
    }, 5000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <CheckCircle className="text-green-500 w-16 h-16" />
      <h1 className="text-2xl font-bold">Payment Successful!</h1>
      <p>Your transaction has been completed successfully.</p>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
