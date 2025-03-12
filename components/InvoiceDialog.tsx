"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function InvoiceDialog({
  open,
  onClose,
  formData,
}: {
  open: boolean;
  onClose: () => void;
  formData: any;
}) {
  const [digitalSignature, setDigitalSignature] = useState("");

  useEffect(() => {
    if (open) {
      // Simulate a digital signature
      setDigitalSignature(`SIGN-${Math.random().toString(36).substr(2, 10)}`);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invoice</DialogTitle>
          <DialogDescription>
            Your registration is complete. Below is your digitally signed
            invoice.
          </DialogDescription>
        </DialogHeader>

        <div className="border p-4 rounded-md">
          <p>
            <strong>Name:</strong> {formData.user?.name}
          </p>
          <p>
            <strong>Student ID:</strong> {formData.user?.id}
          </p>
          <p>
            <strong>Amount Paid:</strong> ₹100
          </p>
          <p>
            <strong>Aadhar Number:</strong> {formData.user?.addharNumber}
          </p>
          <p className="text-green-600 font-semibold">
            <strong>Digital Signature:</strong> {digitalSignature}
          </p>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
