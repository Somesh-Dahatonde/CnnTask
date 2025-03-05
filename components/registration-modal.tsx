"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RegistrationForm } from "@/components/registration-form";
import { PaymentForm } from "@/components/payment-form";
import { AadharVerificationForm } from "@/components/aadhar-verification-form";
import { RegistrationSuccess } from "@/components/registration-success";

export function RegistrationModal({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<
    "register" | "payment" | "verification" | "success"
  >("register");
  const [formData, setFormData] = useState<any>({});
  const [open, setOpen] = useState(false);

  const handleFormSubmit = (data: any) => {
    setFormData({ ...formData, ...data });
    setStep("payment");
  };

  const handlePaymentSuccess = (data: any) => {
    setFormData({ ...formData, payment: data });
    setStep("verification");
  };

  const handleVerificationSuccess = (data: any) => {
    setFormData({ ...formData, verification: data });
    setStep("success");
  };

  const handleClose = () => {
    setOpen(false);
    // Reset after animation completes
    setTimeout(() => {
      setStep("register");
      setFormData({});
    }, 300);
  };

  const titles = {
    register: "Register for Demo Batch",
    payment: "Complete Payment",
    verification: "Verify Aadhar",
    success: "Registration Successful",
  };

  const descriptions = {
    register: "Fill in your details to register for our demo batch.",
    payment: "Complete the payment process to secure your seat.",
    verification: "Verify your identity to complete the registration.",
    success: "Your registration has been successfully completed.",
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{titles[step]}</DialogTitle>
          <DialogDescription>{descriptions[step]}</DialogDescription>
        </DialogHeader>

        {step === "register" && (
          <RegistrationForm onSubmit={handleFormSubmit} />
        )}
        {step === "payment" && (
          <PaymentForm
            amount={100}
            onSuccess={handlePaymentSuccess}
            onCancel={() => setStep("register")}
          />
        )}
        {step === "verification" && (
          <AadharVerificationForm
            onSuccess={handleVerificationSuccess}
            onCancel={() => setStep("payment")}
          />
        )}
        {step === "success" && (
          <RegistrationSuccess data={formData} onClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}
