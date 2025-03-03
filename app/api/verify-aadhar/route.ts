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
    const { leadId, aadharNumber } = body

    if (!leadId || !aadharNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate Aadhar number format (12 digits)
    if (!/^\d{12}$/.test(aadharNumber)) {
      return NextResponse.json({ error: "Invalid Aadhar number format" }, { status: 400 })
    }

    // In a real implementation, you would integrate with the Aadhar verification API
    // For demo purposes, we'll simulate a successful verification
    const verificationId = `VRF${Math.floor(Math.random() * 1000000)}`

    // Connect to the database
    const connection = await createConnection(dbConfig)

    // Update lead with Aadhar details
    await connection.execute(
      "UPDATE leads SET aadhar_number = ?, aadhar_verified = ?, aadhar_verification_id = ? WHERE id = ?",
      [aadharNumber, true, verificationId, leadId],
    )

    await connection.end()

    return NextResponse.json(
      {
        message: "Aadhar verified successfully",
        verificationId,
        status: "VERIFIED",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error verifying Aadhar:", error)
    return NextResponse.json({ error: "Failed to verify Aadhar" }, { status: 500 })
  }
}

