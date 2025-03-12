"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  //   const onSubmit = async (data: ContactFormData) => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(
  //         "https://script.google.com/macros/s/AKfycbxKTvderhTfj0lA-QkHK25MB5Ntw2ZoQ__epmopQfAlMvndwgXrZ1vTtypeEqY6RB5Q/exec", // Replace with your Google Apps Script URL
  //         {
  //           method: "post",
  //           headers: {
  //             "Content-Type": "application/x-www-form-urlencoded", // Change to x-www-form-urlencoded
  //             "Access-Control-Allow-Origin": "*",
  //           },
  //           body: new URLSearchParams(data).toString(), // Convert data to URL-encoded format
  //         }
  //       );

  //       const result = await response.json();
  //       if (result.result === "success") {
  //         toast({ title: "Success", description: "Your message has been sent!" });
  //       } else {
  //         throw new Error(result.error || "An error occurred");
  //       }
  //     } catch (error: any) {
  //       console.error("Error submitting form:", error);
  //       toast({ title: "Error", description: error.message });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 w-full">
      <Card className="shadow-lg w-full max-w-5xl ">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">Contact Us</CardTitle>
          <div className="border-b border-gray-200 w-full mt-2" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info & Map */}
            <div className="flex flex-col items-center md:items-start">
              <div className="w-full h-80 md:h-120 mt-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4078.946126894607!2d72.84941147545713!3d19.12028885058018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c596e404d5%3A0x93217d705f48072f!2sConnecting%20Cyber%20Networks%20(CCN)!5e1!3m2!1sen!2sin!4v1741505421228!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  className="rounded-lg border shadow-md"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <form
              id="my-form"
              className="space-y-5"
              action={
                "https://script.google.com/macros/s/AKfycbxXE82uXNihWdqbNK0bxK-eO9JwpwQSOTaGN7Q5pYNmvseB-HSUPpreXxOltsvyDvSZ/exec"
              }
              method="post"
            >
              <p className="text-muted-foreground text-center md:text-left">
                <br /> Drop us a message.
              </p>
              {/* Name */}
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="John Doe"
                  name="name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  {...register("email")}
                  type="email"
                  placeholder="john@example.com"
                  name="email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Your message..."
                  name="message"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                onClick={() => setLoading(true)}
                className="w-full rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
