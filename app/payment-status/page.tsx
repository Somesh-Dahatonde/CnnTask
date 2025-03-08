"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/utils/api";

export default function PaymentStatusValidator() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("merchantTransactionId");

  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!transactionId) {
      setError("Transaction ID not found.");
      setLoading(false);
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const response = await api.get(
          `/payments/request/status/${transactionId}`
        );
        setStatus(response.data.status);
      } catch (err) {
        setError("Failed to fetch payment status. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [transactionId]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Payment Status</h2>

        {loading && <p>Checking payment status...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {status && (
          <div className="mt-4 p-4 border rounded">
            <p>
              <strong>Transaction ID:</strong> {transactionId}
            </p>
            <p>
              <strong>Status:</strong>
              <span
                className={
                  status === "SUCCESS" ? "text-green-500" : "text-red-500"
                }
              >
                {status}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
