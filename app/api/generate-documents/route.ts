import { type NextRequest, NextResponse } from "next/server";
import { createConnection } from "mysql2/promise";

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { leadId } = body;

    if (!leadId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to the database
    const connection = await createConnection(dbConfig);

    // Get lead details
    const [rows] = await connection.execute(
      "SELECT * FROM leads WHERE id = ?",
      [leadId]
    );

    const lead = (rows as any[])[0];

    if (!lead) {
      await connection.end();
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Get payment details
    const [paymentRows] = await connection.execute(
      'SELECT * FROM payments WHERE lead_id = ? AND status = "SUCCESS" LIMIT 1',
      [leadId]
    );

    const payment = (paymentRows as any[])[0];

    if (!payment) {
      await connection.end();
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // In a real implementation, you would generate PDF files for invoice and registration form
    // For demo purposes, we'll just return mock document URLs
    const invoiceUrl = `/api/document/invoice/${leadId}`;
    const registrationFormUrl = `/api/document/registration/${leadId}`;

    // Update lead with document URLs
    await connection.execute(
      "UPDATE leads SET invoice_url = ?, registration_form_url = ?, registration_complete = ? WHERE id = ?",
      [invoiceUrl, registrationFormUrl, true, leadId]
    );

    await connection.end();

    // In a real implementation, you would send emails and WhatsApp messages here

    return NextResponse.json(
      {
        message: "Documents generated successfully",
        invoiceUrl,
        registrationFormUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating documents:", error);
    return NextResponse.json(
      { error: "Failed to generate documents" },
      { status: 500 }
    );
  }
}
