"use client";

import type React from "react";

import { useState, useRef } from "react";
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
import { useToast } from "@/hooks/use-toast";
import api from "@/utils/api";
import axios from "axios";

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
  countryCode: z.string().optional(),
});

interface RegistrationFormProps {
  onSubmit: (data: any) => void;
}

export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const { toast } = useToast();
  const [step, setStep] = useState<"form" | "emailOTP" | "mobileOTP">("form");
  const [formValues, setFormValues] = useState<any>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const countryCodes = ["+91", "+1", "+44", "+61", "+81"];
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [isMobileVerified, setIsMobileVerified] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<any>(null);
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      email: "",
      mobile: "",
      countryCode: "+91",
      photo: undefined,
    },
  });

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

  console.log("formValues", isEmailVerified, isMobileVerified);
  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    // Check if all fields are filled
    if (!data.name || !data.location || !data.email || !data.mobile) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill all the fields!",
      });
      return;
    }

    // Check if a photo is uploaded
    if (!data.photo) {
      toast({
        variant: "destructive",
        title: "Photo Required",
        description: "Please upload a photo!",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("location", data.location);
    formData.append("email", data.email);
    formData.append("mobile", `${data.countryCode}${data.mobile}`);
    formData.append("photo", data.photo);

    console.log("Submitting formData:", formData);

    try {
      const response = await api.post("/students/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response:", response.data);

      setUser(response.data);
      // Handle User Already Exists case
      if (response.data.message?.includes("User already exists")) {
        toast({
          variant: "warning",
          title: "User Exists",
          description:
            "A user with this email or mobile number already exists!",
        });
      }

      // If user registration is successful, check verification state
      if (response.data.user) {
        let state: "form" | "emailOTP" | "mobileOTP";
        if (!response.data.user.isMobileVerified) {
          setIsMobileVerified(response.data.user.isMobileVerified);
          state = "mobileOTP";
          toast({
            variant: "warning",
            title: "Mobile Verification Required",
            description:
              "OTP has been sent to your mobile number for verification.",
          });
        } else if (!response.data.user.isEmailVerified) {
          setIsEmailVerified(response.data.user.isEmailVerified);
          state = "emailOTP";
          toast({
            variant: "warning",
            title: "Email Verification Required",
            description:
              "OTP has been sent to your email address for verification.",
          });
        } else {
          onSubmit({
            ...data,
            ...response.data,
            photo: photoPreview,
          });

          return;
        }

        setFormValues(data);
        setStep(state);
      } else {
        setFormValues(data);
        setStep("emailOTP");
        toast({
          title: "Registration Successful",
          description: "Please verify your email to complete registration.",
        });
      }
    } catch (err) {
      console.error("Error:", err);

      toast({
        variant: "destructive",
        title: "Registration Failed",
        description:
          axios.isAxiosError(err) && err.response?.data?.message
            ? err.response.data.message
            : "Something went wrong!",
      });
    }
  };

  const handleEmailOTPSuccess = () => {
    setIsEmailVerified(true);

    setIsMobileVerified((prevMobileVerified) => {
      if (!prevMobileVerified) {
        setStep("mobileOTP");
      } else {
        // If mobile is already verified, proceed to submission
        onSubmit({
          ...formValues,
          user: user.user,
          photo: photoPreview,
        });
      }
      return prevMobileVerified; // Keep the previous state
    });
  };

  const handleMobileOTPSuccess = () => {
    setIsMobileVerified(true);

    setIsEmailVerified((prevEmailVerified) => {
      if (!prevEmailVerified) {
        setStep("emailOTP");
      } else {
        // If email is already verified, proceed to submission
        onSubmit({
          ...formValues,
          user: user.user,
          photo: photoPreview,
        });
      }
      return prevEmailVerified; // Keep the previous state
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
        contactValue={formValues.countryCode + formValues.mobile}
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
          <div className="flex flex-col items-center gap-4">
            {photoPreview ? (
              <div className="relative w-32 h-32 rounded-full overflow-hidden border">
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
                  onClick={() => {
                    setPhotoPreview(null);
                    form.setValue("photo", undefined);
                  }}
                >
                  Change
                </Button>
              </div>
            ) : (
              <div className="flex gap-4 flex-col justify-center items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border">
                  <img
                    src="/images/logo.png"
                    alt="Default profile"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-row gap-4">
                  {/* Camera input for mobile devices */}
                  <input
                    type="file"
                    accept="image/*"
                    capture="user"
                    id="camera-input"
                    ref={cameraInputRef}
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => cameraInputRef.current?.click()}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Take Photo
                  </Button>

                  {/* File upload input */}
                  <input
                    type="file"
                    accept="image/*"
                    id="file-input"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>
              </div>
            )}
            <FormLabel>Profile Photo</FormLabel>
          </div>
        </div>

        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
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

          {/* Mobile Number Input */}
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Mobile Number</FormLabel>
                <div className="relative flex justify-center gap-1">
                  <select
                    {...form.register("countryCode")}
                    className="block appearance-none bg-white border  hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline h-9"
                  >
                    {countryCodes.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="10-digit mobile number"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                </div>
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
