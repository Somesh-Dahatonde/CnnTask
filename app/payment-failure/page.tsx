"use client";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PaymentFailure() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <XCircle className="text-red-500 w-16 h-16" />
      <h1 className="text-2xl font-bold">Payment Failed</h1>
      <p>Something went wrong with your transaction. Please try again.</p>
      <Button onClick={() => router.push("/")}>Retry Payment</Button>
    </div>
  );
}
