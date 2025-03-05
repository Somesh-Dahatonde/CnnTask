"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface PaymentFormProps {
  amount: number;
  onSuccess: (data: any) => void;
  onCancel: () => void;
}

export function PaymentForm({ amount, onSuccess, onCancel }: PaymentFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const handlePayment = async () => {
    if (!termsAccepted) {
      toast({
        title: "Terms & Conditions",
        description: "Please accept the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // In a real implementation, integrate with PhonePe API
      // This is a placeholder for the payment gateway integration
      // Simulating payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful payment
      const paymentData = {
        transactionId: `TXN${Math.floor(Math.random() * 1000000)}`,
        amount: amount,
        timestamp: new Date().toISOString(),
        status: "SUCCESS",
      };

      onSuccess(paymentData);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description:
          "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-xl">Payment Details</CardTitle>
        <CardDescription>Secure your seat in the demo batch</CardDescription>
      </CardHeader>
      <CardContent className="p-0 pb-4 space-y-6">
        <div className="rounded-lg border p-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Registration Fee</span>
              <span className="font-medium">₹{amount}.00</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span className="text-sm">GST (Included)</span>
              <span className="text-sm">₹{(amount * 0.18).toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{amount}.00</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Payment Methods</p>
            <div className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-50">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
                      fill="#3E2D86"
                    />
                    <path
                      d="M12 8L16 10.25V14.75L12 17L8 14.75V10.25L12 8Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">PhonePe</p>
                  <p className="text-xs text-muted-foreground">
                    UPI, Cards, Netbanking
                  </p>
                </div>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="10" cy="10" r="10" fill="#3E2D86" />
                <path
                  d="M6 10L9 13L14 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            className=" h-4 w-4 border-blue-500 data-[state=checked]:bg-blue-500 data-[state=checked]:text-primary-foreground"
            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
          />
          <Label
            htmlFor="terms"
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the terms and conditions, including the refund policy.
          </Label>
        </div>
      </CardContent>
      <CardFooter className="p-0 flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={onCancel}
          disabled={loading}
        >
          Back
        </Button>
        <Button
          className="rounded-lg  bg-transparent border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 flex-1"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            `Pay ₹${amount}`
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
