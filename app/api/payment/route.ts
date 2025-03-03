import { type NextRequest, NextResponse } from "next/server"
import { createConnection } from "mysql2/promise"

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
  },
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { leadId, amount, paymentMethod } = body

    if (!leadId || !amount || !paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real implementation, you would integrate with PhonePe API
    // For demo purposes, we'll simulate a successful payment
    const transactionId = `TXN${Math.floor(Math.random() * 1000000)}`

    // Connect to the database
    const connection = await createConnection(dbConfig)

    // Insert payment record into database
    await connection.execute(
      "INSERT INTO payments (lead_id, amount, transaction_id, payment_method, status, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
      [leadId, amount, transactionId, paymentMethod, "SUCCESS"],
    )

    // Update lead status in database
    await connection.execute("UPDATE leads SET payment_status = ? WHERE id = ?", ["PAID", leadId])

    await connection.end()

    return NextResponse.json(
      {
        message: "Payment processed successfully",
        transactionId,
        amount,
        status: "SUCCESS",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing payment:", error)
    return NextResponse.json({ error: "Failed to process payment" }, { status: 500 })
  }
}

