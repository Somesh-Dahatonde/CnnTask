import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { type, value, otp } = body

    if (!type || !value || !otp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real implementation, you would call your OTP verification service
    // For demo purposes, we'll simulate a successful verification if OTP is "123456"
    if (otp !== "123456") {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
    }

    return NextResponse.json(
      {
        message: "OTP verified successfully",
        verified: true,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 })
  }
}

