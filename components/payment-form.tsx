"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import api from "@/utils/api";

interface PaymentFormProps {
  amount: number;
  studentId: string;
  phoneNumber: string;
  onCancel: () => void;
}

export function PaymentForm({
  amount,
  studentId,
  phoneNumber,
  onCancel,
}: PaymentFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  console.log(amount, studentId, phoneNumber, "payment form");
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
      const response = await api.post("/payments/request", {
        amount,
        studentId,
        phoneNumber,
      });

      const paymentData = response.data;

      if (paymentData.code === "PAYMENT_INITIATED") {
        window.location.href =
          paymentData.data.instrumentResponse.redirectInfo.url;
      } else {
        throw new Error("Payment initiation failed");
      }
    } catch (error) {
      console.error("Payment failed:", error);
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
        <div className="rounded-lg bg-muted p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Registration Fee
              </h3>
              <p className="text-2xl font-bold">₹{amount}.00</p>
              <p className="text-xs text-muted-foreground">
                This is a one-time fee to confirm your demo batch seat
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked! as boolean)}
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="terms">
              I agree to the{" "}
              <a href="#" className="underline underline-offset-2">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-2">
                Privacy Policy
              </a>
            </Label>
          </div>
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
          className="rounded-lg bg-transparent border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 flex-1"
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
