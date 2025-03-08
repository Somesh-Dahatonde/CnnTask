"use client";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/verifyAddhar");
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
