"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import api from "@/utils/api";

interface OTPVerificationProps {
  type: "email" | "mobile";
  contactValue: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function OTPVerification({
  type,
  contactValue,
  onSuccess,
  onCancel,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);

  const otpType = type === "email" ? "/verify-email" : "/verify-number";

  // Handle countdown timer for OTP resend
  useEffect(() => {
    if (timeLeft <= 0) {
      setResendDisabled(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleResendOTP = () => {
    setResendDisabled(true);
    setTimeLeft(60);

    const data =
      otpType === "/verify-email"
        ? { email: contactValue }
        : { phoneNumber: contactValue };

    const apiUrl =
      otpType === "/verify-email" ? `/auth/resend-email` : `/auth/resend-sms`;

    try {
      api
        .post(apiUrl, data)
        .then((response) => {
          console.log("OTP resend successful:", response.data);
          toast({
            title: `OTP Resent`,
            description: `A new OTP has been sent to your ${type}.`,
          });
        })
        .catch((error) => {
          console.error("OTP resend failed:", error);
          toast({
            title: "Resend Failed",
            description: "Failed to resend OTP. Please try again.",
            variant: "destructive",
          });
        });
    } catch (error) {
      console.error("OTP resend failed:", error);
      toast({
        title: "Resend Failed",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive",
      });
    }

    // Simulating API call to resend OTP
    toast({
      title: `OTP Resent`,
      description: `A new OTP has been sent to your ${type}.`,
    });
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const data =
      otpType === "/verify-email"
        ? {
            otp: otp,
            email: contactValue,
          }
        : {
            otp: otp,
            phoneNumber: contactValue,
          };

    try {
      api
        .post(`/auth${otpType}`, data)
        .then((response) => {
          console.log("OTP verification successful:", response.data);
          toast({
            title: "OTP Verified",
            description: `Your ${type} has been successfully verified.`,
          });
          setOtp("");
          onSuccess();
        })
        .catch((error) => {
          console.error("OTP verification failed:", error);
          toast({
            title: "Verification Failed",
            description: "Invalid OTP. Please try again.",
            variant: "destructive",
          });
        });
    } catch (error) {
      console.error("OTP verification failed:", error);
      toast({
        title: "Verification Failed",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h3 className="text-lg font-medium">
          Verify Your {type === "email" ? "Email" : "Mobile"}
        </h3>
        <p className="text-sm text-muted-foreground">
          We've sent a 6-digit code to{" "}
          {type === "email" ? contactValue : `+91 ${contactValue}`}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp">Enter OTP</Label>
          <Input
            id="otp"
            placeholder="6-digit code"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, "").substring(0, 6))
            }
            maxLength={6}
          />
        </div>

        <div className="text-sm text-center">
          {resendDisabled ? (
            <p className="text-muted-foreground">
              Resend OTP in {timeLeft} seconds
            </p>
          ) : (
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={handleResendOTP}
            >
              Resend OTP
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onCancel}
            disabled={loading}
          >
            Back
          </Button>
          <Button
            type="button"
            className="rounded-lg  bg-transparent border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 flex-1"
            onClick={handleVerify}
            disabled={loading || otp.length !== 6}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
