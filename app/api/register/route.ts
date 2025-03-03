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
    const { name, email, mobile, location, photo } = body

    if (!name || !email || !mobile || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Connect to the database
    const connection = await createConnection(dbConfig)

    // Insert lead into database
    const [result] = await connection.execute(
      "INSERT INTO leads (name, email, mobile, location, photo, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
      [name, email, mobile, location, photo],
    )

    await connection.end()

    return NextResponse.json(
      {
        message: "Registration successful",
        leadId: (result as any).insertId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error registering lead:", error)
    return NextResponse.json({ error: "Failed to register lead" }, { status: 500 })
  }
}

