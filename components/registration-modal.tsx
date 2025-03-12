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
// import { AadharVerificationForm } from "@/components/aadhar-verification-form";

export function RegistrationModal({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<
    "register" | "payment" | "addharVerification"
  >("register");
  const [formData, setFormData] = useState<any>({});
  const [open, setOpen] = useState(false);

  console.log(formData, "formData");

  const handleFormSubmit = (data: any) => {
    setFormData({ ...formData, ...data });
    console.log(data, "data from form submit");
    setStep("payment");
  };

  console.log(formData, "formData");

  // const handleClose = () => {
  //   setOpen(false);
  //   // Reset after animation completes
  //   setTimeout(() => {
  //     setStep("register");
  //     setFormData({});
  //   }, 300);
  // };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>
              {step === "register"
                ? "Register for Demo Batch"
                : "Complete Payment"}
            </DialogTitle>
            <DialogDescription>
              {step === "register"
                ? "Fill in your details to register for our demo batch."
                : "Complete the payment process to secure your seat."}
            </DialogDescription>
            <hr />
          </DialogHeader>

          {step === "register" && (
            <RegistrationForm onSubmit={handleFormSubmit} />
          )}
          {step === "payment" && (
            <PaymentForm
              amount={100}
              studentId={formData.user.id}
              phoneNumber={formData.user.mobile}
              onCancel={() => setStep("register")}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* {step === "addharVerification" && (
        <AadharVerificationForm
          addharNumber={formData.user.addharNumber}
          onCancel={() => setStep("payment")}
        />
      )} */}
    </>
  );
}
