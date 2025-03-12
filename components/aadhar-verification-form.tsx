"use client";

import { Suspense, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
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
import api from "@/utils/api";
import { RegistrationSuccess } from "./registration-success";
import { Dialog, DialogContent } from "./ui/dialog";

// Form schema with validation
const formSchema = z.object({
  aadharNumber: z.string().regex(/^\d{12}$/, {
    message: "Please enter a valid 12-digit Aadhar number.",
  }),
});

function AadharVerificationContent({ onCancel }: { onCancel: () => void }) {
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const studentId = searchParams.get("studentId");
  const transactionId = searchParams.get("transactionId");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aadharNumber: "",
    },
  });

  const [user, setUser] = useState<any>();
  const getUserData = async () => {
    if (!studentId) return;
    try {
      const response = await api.get(`/students/user?id=${studentId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [studentId, transactionId]);

  const [aadharVerified, setAadharVerified] = useState<boolean>(false);

  const handleVerify = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const verificationData = {
        aadharNumber: data.aadharNumber,
        verificationId: `VRF${Math.floor(Math.random() * 1000000)}`,
        timestamp: new Date().toISOString(),
        transactionId,
        status: "VERIFIED",
      };
      setUser((prev: any) => ({ ...prev, verificationData }));
      setAadharVerified(true);
      toast({
        title: "Aadhar Number Verified",
        description: "Your Aadhar number has been successfully verified.",
      });
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

  return (
    <>
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
                    type="text"
                    maxLength={14}
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
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Verify"}
            </Button>
          </div>
        </form>
      </Form>

      <Dialog open={aadharVerified} onOpenChange={onCancel}>
        <DialogContent className="sm:max-w-[500px]">
          <RegistrationSuccess data={user} onClose={onCancel} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function AadharVerificationForm({
  onCancel,
}: {
  onCancel: () => void;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AadharVerificationContent onCancel={onCancel} />
    </Suspense>
  );
}
