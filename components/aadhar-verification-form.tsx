"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

// Form schema with validation
const formSchema = z.object({
  aadharNumber: z.string().regex(/^\d{12}$/, {
    message: "Please enter a valid 12-digit Aadhar number.",
  }),
});

export function AadharVerificationForm({
  addharNumber,
  onSuccess,
  onCancel,
}: {
  addharNumber: string;
  onSuccess: (data: any) => void;
  onCancel: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize form
  console.log("formSchema", addharNumber);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aadharNumber: "",
    },
  });

  const handleVerify = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      // In a real implementation, integrate with Aadhar verification API
      // This is a placeholder for the actual verification
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful verification
      const verificationData = {
        aadharNumber: data.aadharNumber,
        verificationId: `VRF${Math.floor(Math.random() * 1000000)}`,
        timestamp: new Date().toISOString(),
        status: "VERIFIED",
      };

      onSuccess(verificationData);
    } catch (error) {
      console.error("Aadhar verification failed:", error);
      toast({
        title: "Verification Failed",
        description:
          "Unable to verify Aadhar number. Please check and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Format Aadhar number with spaces for better readability
  const formatAadharNumber = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "");
    const formattedValue = digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formattedValue;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleVerify)} className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Please provide your Aadhar number for identity verification. This
            information is securely processed and stored.
          </p>
        </div>

        <FormField
          control={form.control}
          name="aadharNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aadhar Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="XXXX XXXX XXXX"
                  {...field}
                  type="number"
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\s/g, "");
                    const formattedValue = formatAadharNumber(rawValue);
                    e.target.value = formattedValue;
                    field.onChange(rawValue);
                  }}
                  maxLength={14} // 12 digits + 2 spaces
                />
              </FormControl>
              <FormDescription>
                Your 12-digit Aadhar number as provided by UIDAI.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
            type="submit"
            className="rounded-lg  bg-transparent border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 flex-1"
            disabled={loading || !form.formState.isValid}
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
      </form>
    </Form>
  );
}
