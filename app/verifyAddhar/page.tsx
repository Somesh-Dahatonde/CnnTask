"use client";
import React from "react";
import AadharVerificationForm from "@/components/aadhar-verification-form";

export default function verifyAddhar() {
  return (
    <div className="flex justify-center items-center mt-28">
      <div className="max-w-[350px]">
        <AadharVerificationForm
          onCancel={() => {
            /* Handle cancel */
          }}
        />
      </div>
    </div>
  );
}
