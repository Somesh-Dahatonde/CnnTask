"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Download, Send } from "lucide-react";

interface RegistrationSuccessProps {
  data: any;
  onClose: () => void;
}

export function RegistrationSuccess({
  data,
  onClose,
}: RegistrationSuccessProps) {
  const [sending, setSending] = useState<boolean>(true);

  // Simulate sending emails and WhatsApp messages
  useEffect(() => {
    const timer = setTimeout(() => {
      setSending(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        <div className="rounded-full bg-green-100 p-3">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-medium">Registration Successful</h3>
        <p className="text-sm text-muted-foreground">
          Thank you for registering for our demo batch!
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border p-4 space-y-2">
          <p className="text-sm font-medium">Registration Details:</p>
          <ul className="text-sm space-y-1">
            <li>
              <span className="text-muted-foreground">Name:</span> {data.name}
            </li>
            <li>
              <span className="text-muted-foreground">Email:</span> {data.email}
            </li>
            <li>
              <span className="text-muted-foreground">Mobile:</span>{" "}
              {data.mobile}
            </li>
            <li>
              <span className="text-muted-foreground">Transaction ID:</span>{" "}
              {data.payment?.transactionId}
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Documents:</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="text-sm justify-start"
              size="sm"
            >
              <Download className="mr-2 h-4 w-4" />
              Invoice
            </Button>
            <Button
              variant="outline"
              className="text-sm justify-start"
              size="sm"
            >
              <Download className="mr-2 h-4 w-4" />
              Registration Form
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {sending ? (
            <div className="flex items-center justify-center gap-2 py-2">
              <Send className="h-4 w-4 animate-pulse" />
              <p className="text-sm">Sending confirmation...</p>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 py-2 text-green-600">
              <Check className="h-4 w-4" />
              <p className="text-sm">Confirmation sent via Email & WhatsApp</p>
            </div>
          )}
        </div>
      </div>

      <Button onClick={onClose} className="w-full">
        Close
      </Button>
    </div>
  );
}
