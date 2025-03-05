"use client";

import type React from "react";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Camera, Upload } from "lucide-react";
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
import { OTPVerification } from "@/components/otp-verification";

// Form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  mobile: z.string().regex(/^[6-9]\d{9}$/, {
    message: "Please enter a valid 10-digit mobile number.",
  }),
  photo: z.any().optional(),
});

interface RegistrationFormProps {
  onSubmit: (data: any) => void;
}

export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [step, setStep] = useState<"form" | "emailOTP" | "mobileOTP">("form");
  const [formValues, setFormValues] = useState<any>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      email: "",
      mobile: "",
      photo: undefined,
    },
  });

  const handlePhotoCapture = () => {
    // In a real implementation, you would integrate with device camera
    // This is a placeholder for the camera functionality
    alert("Camera functionality would be implemented here in production");
    const randomPhoto = "https://picsum.photos/200";
    setPhotoPreview(randomPhoto);
    form.setValue("photo", "photo_data_here");
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhotoPreview(e.target.result as string);
          form.setValue("photo", file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    setFormValues(data);
    setStep("emailOTP");
  };

  const handleEmailOTPSuccess = () => {
    setStep("mobileOTP");
  };

  const handleMobileOTPSuccess = () => {
    onSubmit({
      ...formValues,
      photo: photoPreview,
    });
  };

  if (step === "emailOTP") {
    return (
      <OTPVerification
        type="email"
        contactValue={formValues.email}
        onSuccess={handleEmailOTPSuccess}
        onCancel={() => setStep("form")}
      />
    );
  }

  if (step === "mobileOTP") {
    return (
      <OTPVerification
        type="mobile"
        contactValue={formValues.mobile}
        onSuccess={handleMobileOTPSuccess}
        onCancel={() => setStep("emailOTP")}
      />
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        {/* Photo Upload */}
        <div className="space-y-2">
          <FormLabel>Photo</FormLabel>
          <div className="flex flex-col items-center gap-4">
            {photoPreview ? (
              <div className="relative w-32 h-32 rounded-full overflow-hidden border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoPreview || "/placeholder.svg"}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                  onClick={() => setPhotoPreview(null)}
                >
                  Change
                </Button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePhotoCapture}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    id="photo-upload"
                    className="hidden"
                    capture="user" // Enables camera capture
                    onChange={handlePhotoUpload}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("photo-upload")?.click()
                    }
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="City, State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john.doe@example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  We'll send you an OTP to verify this email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="10-digit mobile number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  We'll send you an OTP to verify this number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="rounded-lg  bg-transparent border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 w-full"
        >
          Continue
        </Button>
      </form>
    </Form>
  );
}
