"use client";
import React from "react";
import { AadharVerificationForm } from "@/components/aadhar-verification-form";

function page() {
  const state = "initial" as "initial" | "loading" | "success" | "failure";

  if (state === "loading") {
    return <p>Loading...</p>;
  }

  if (state === "success") {
    return <p>Verification successful!</p>;
  }

  if (state === "failure") {
    return <p>Verification failed. Please try again.</p>;
  }

  const handleVerificationSuccess = () => {
    // Handle success
  };

  return (
    <div className="flex justify-center items-center mt-28">
      <div className="max-w-[350px]">
        <AadharVerificationForm
          addharNumber="123456789012"
          onSuccess={handleVerificationSuccess}
          onCancel={() => {
            /* Handle cancel */
          }}
        />
      </div>
    </div>
  );
}

export default page;
