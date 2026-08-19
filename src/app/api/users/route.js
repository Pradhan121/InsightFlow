import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/mongodb";
import Auth from "@/models/Auth";

export async function GET() {
  try {
    await ConnectDB();

    const users = await Auth.find()
      .select("-password -otp -otpExpiry")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        message: "Users fetched successfully",
        users,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET USERS ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}