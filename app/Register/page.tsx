"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera } from "lucide-react";
// import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import OtpVerification from "@/components/otp-verification"
// import PaymentForm from "@/components/payment-form"
// import AadharVerification from "@/components/aadhar-verification"
// import SuccessPage from "@/components/success-page"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  mobile: z.string().regex(/^[6-9]\d{9}$/, {
    message: "Please enter a valid 10-digit mobile number.",
  }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." }),
  course: z.string({ required_error: "Please select a course." }),
  message: z.string().optional(),
  photo: z.instanceof(File).optional(),
});

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  // const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      location: "",
      course: "",
      message: "",
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("photo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setFormData({ ...formData, ...values });
    setStep(2); // Move to OTP verification
  };

  // const handleOtpVerified = () => {
  //   setStep(3); // Move to payment
  // };

  // const handlePaymentComplete = () => {
  //   setStep(4); // Move to Aadhar verification
  // };

  // const handleAadharVerified = () => {
  //   setStep(5); // Move to success page
  // };

  return (
    <div>
      {step === 1 && (
        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50 p-2">
                      {photoPreview ? (
                        <img
                          src={photoPreview || "/placeholder.svg"}
                          alt="Preview"
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Camera className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <Label
                      htmlFor="photo"
                      className="mt-2 cursor-pointer rounded-md bg-primary px-3 py-1 text-sm text-white hover:bg-primary/90"
                    >
                      Upload Photo
                    </Label>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Upload a clear photo of yourself
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
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
                            placeholder="Enter your email"
                            type="email"
                            {...field}
                          />
                        </FormControl>
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
                            placeholder="Enter your 10-digit mobile number"
                            {...field}
                          />
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
                          <Input
                            placeholder="Enter your city/location"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="web-development">Web Development Bootcamp</SelectItem>
                            <SelectItem value="data-science">Data Science Fundamentals</SelectItem>
                            <SelectItem value="mobile-app">Mobile App Development</SelectItem>
                            <SelectItem value="cloud-computing">Cloud Computing</SelectItem>
                            <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any specific requirements or questions?"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>

                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
      {/* 
      {step === 2 && <OtpVerification email={formData.email} mobile={formData.mobile} onVerified={handleOtpVerified} />}

      {step === 3 && (
        <PaymentForm
          amount={100}
          name={formData.name}
          email={formData.email}
          mobile={formData.mobile}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {step === 4 && <AadharVerification onVerified={handleAadharVerified} />}

      {step === 5 && (
        <SuccessPage name={formData.name} email={formData.email} mobile={formData.mobile} course={formData.course} />
      )} */}
    </div>
  );
}
