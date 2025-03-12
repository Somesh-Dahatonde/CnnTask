import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Download } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { RegistrationPDF } from "./RegistrationPDF";
import Image from "next/image";
import api from "@/utils/api";
import { pdf } from "@react-pdf/renderer";

interface RegistrationSuccessProps {
  data: any;
  onClose: () => void;
}

export function RegistrationSuccess({
  data,
  onClose,
}: RegistrationSuccessProps) {
  const [sending, setSending] = useState<boolean>(true);

  async function generatePDFBlob(data: any): Promise<Blob> {
    const doc = <RegistrationPDF data={data} />;
    const pdfBlob = await pdf(doc).toBlob();
    return pdfBlob;
  }

  async function convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64Data = reader.result?.toString().split(",")[1]; // Remove data prefix
        resolve(base64Data || "");
      };
      reader.onerror = reject;
    });
  }

  console.log(data, "data");

  useEffect(() => {
    async function sendConfirmation() {
      try {
        const pdfBlob = await generatePDFBlob(data);
        const base64PDF = await convertBlobToBase64(pdfBlob);
        await api.post("/invoice/send", {
          pdfBase64: base64PDF,
          customerEmail: data.email,
          customerPhone: data.mobile,
        });

        setSending(false);
      } catch (error) {
        console.error("Error sending confirmation", error);
      }
    }

    sendConfirmation();
  }, [data]);

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
          <div className="flex justify-center items-center">
            <Image
              src={data.photoUrl}
              alt={data.name}
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <p className="text-sm font-medium">Registration Details:</p>
          <ul className="text-sm space-y-1">
            <li>
              <span className="text-muted-foreground">Registration ID:</span>{" "}
              {data.id}
            </li>
            <li>
              <span className="text-muted-foreground">Course:</span>{" "}
              {data.course}
            </li>

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
              {data.verificationData?.transactionId}
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Download Documents:</p>
          <div className="grid grid-cols-1 gap-2 items-center">
            <PDFDownloadLink
              document={<RegistrationPDF data={data} />}
              fileName="registration-confirmation.pdf"
              className="w-full flex justify-center items-center"
            >
              {({ loading }) => (
                <Button
                  variant="outline"
                  className="text-sm justify-start"
                  size="sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {loading ? "Generating PDF..." : "Download Invoice"}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>

        <div className="space-y-2">
          {sending ? (
            <div className="flex items-center justify-center gap-2 py-2">
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

      <Button
        onClick={onClose}
        className="rounded-lg bg-transparent border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 w-full"
      >
        Close
      </Button>
    </div>
  );
}
